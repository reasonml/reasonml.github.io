---
title: Converting from OCaml
---

Since Reason is just another syntax for OCaml, converting an OCaml project over is straightforward and doesn't require semantic changes. However, there are a few build setup and miscellaneous changes required.

## OCamlBuild -> Rebuild

Reason comes with a drop in replacement for `ocamlbuild` called `rebuild`, that
will automatically build any Reason file along with your OCaml files, with
no additional configuration. This allows you to add Reason files to your existing
OCaml project bit by bit. Wherever your script refers to `ocamlbuild`, just replace
it with `rebuild`.

## Makefile

If your build system executes explicit build commands, then the easiest way to
use Reason with `ocamlopt/ocamlc` is by adding the following flags to each
compilation step:

```sh
# intf-suffix tells the compiler where to look for corresponding interface files
ocamlopt -pp refmt -intf-suffix rei -impl myFile.re
ocamlopt -pp refmt -intf myFile.rei
```

If you are using `ocamlbuild` without `rebuild`, add the following to your
`_tags` file, but this likely won't be enough because `ocamlc`/`ocamlopt` will
need the `-intf/-impl/-intf-suffix` flags:

```
<**/*.{re,.rei}>: package(reason), syntax(utf8)
```

## Constructor Syntax Fix

The converted Reason code may attach `[@implicit_arity]` to variant constructors, like so: `C 1 2 [@implicit_arity]`.
This is due to the fact that OCaml has the ambiguous syntax where a multi-arguments
constructor is expecting argument in a tuple form. So at parsing time we don't
know if `C (1, 2)` in OCaml should be translated to `C (1, 2)` or `C 1 2` in Reason.
By default, we will convert it to `C 1 2 [@implicit_arity]`, which tells the compiler
this can be either `C 1 2` or `C (1, 2)`.

To prevent `[@implicit_arity]` from being generated, one can supply `--assume-explicit-arity`
to `refmt`. This forces the formatter to generate `C 1 2` instead of `C 1 2 [@implicit_arity]`.

However, since `C 1 2` requires multiple arguments, it may fail the compilation if it is actually
a constructor with a single tuple as an argument (e.g., `Some`).
We already have some internal exception rules to cover the common constructors who requires a single tuple
as argument so that they will be converted correctly (e.g., `Some (1, 2)` will be converted
to `Some (1, 2)` instead of `Some 1 2`, which doesn't compile).

To provide your own exception list, create a line-separated file that contains all constructors (without module prefix)
in your project that expects a single tuple as argument, and use `--heuristics-file <filename>`
to tell `refmt` that all constructors
listed in the file will be treated as constructor with a single tuple as argument:

```sh
> cat heuristics.txt
  TupleConstructor
  And
  Or
```

```sh
> cat test.ml
```

```ocaml
type tm =
  TupleConstructor of (int * int)
| MultiArgumentsConstructor of int * int
let x = TupleConstructor(1, 2)
let y = MultiArgumentsConstructor(1, 2)
module Test = struct
  type a = | And of (int * int) | Or of (int * int)
end;;
let a = Test.And (1, 2)
let b = Test.Or (1, 2)
let c = Some (1, 2)
```

Then only the constructor identifiers that were listed will be assumed to accept tuples instead of multiple arguments.

```sh
> refmt --heuristics-file \
    ./heuristics.txt --assume-explicit-arity \
    --parse ml --print re test.ml
```


```reason
type tm =
  | TupleConstructor((int, int))
  | MultiArgumentsConstructor(int, int);

let x = TupleConstructor((1, 2));

let y = MultiArgumentsConstructor(1, 2);

module Test = {
  type a =
    | And((int, int))
    | Or((int, int));
};

let a = Test.And((1, 2));

let b = Test.Or((1, 2));

let c = Some((1, 2));
```
