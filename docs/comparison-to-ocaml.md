---
title: Comparison to OCaml
---

If you come from OCaml or are a newcomer reading a tutorial written on OCaml, this guide's for you! But don't forget that [reason-tools](https://github.com/reasonml/reason-tools) can convert between OCaml and Reason syntax on the fly.

## Comments

OCaml | Reason
------|-------
`(* OCaml (*nest*) *)` | `/* Reason /*nest*/  */`

## Operator Renaming

Reason has all of OCaml's infix operators, but a couple of operators are expressed differently. In Reason, structural equality is written as `==`, and reference (physical) equality is written as `===`. In Reason, to achieve the corresponding inequality, simply swap the first character with a `!` character. (`!=` for structural inequality, and `!==` for reference inequality).

Equality | OCaml | Reason
---------|-------|-------
Structural | `x = y` | `x == y`
Reference | `x == y` | `x === y`

Inequality | OCaml | Reason
---------|-------|-------
Structural | `x <> y` | `x != y`
Reference | `x != y` | `x !== y`

## Local Scope

Reason's lexical scoping is exactly the same as OCaml's, but let bindings syntactically resemble "block scope" which is more familiar to many developers. In Reason, they are created with `{}` braces, which may contain both `let` bindings and imperative commands, separated by `;`. All blocks evaluate to the last line and the semicolon on the last line is optional. `{}` braces are only needed if you have more than one item to chain together via `;`.

<table>
  <thead>
    <tr>
      <th>OCaml</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      <pre><code>let _ =
  let msg = "Hello" in
  print_string msg;
  let msg2 = "Goodbye" in
  print_string msg2</code></pre>
    </td>
    <td>
      <pre><code>{
  let msg = "Hello";
  print_string(msg);
  let msg2 = "Goodbye";
  print_string(msg2)
};</code></pre>
    </td>
  </tr>
</tbody>
</table>

Reason's `{}` syntax removes many commonly reported pain points in OCaml's syntax:

- Double semicolons are removed entirely.
- `begin`/`end` is removed entirely.
- Infamous imperative parsing [issues](https://github.com/ocaml/ocaml/pull/278) are gone.
- Module bodies and local scope are unified.

## Local Scope Vs. Module Body

In Reason, everything that can go between the `{}` in [Local Scopes](#local-scope) and in module bodies. You can usually even cut/paste code between the two contexts. In OCaml, the syntaxes for the two contexts are very different. Local scope requires trailing `in`, but module bodies do not and some imperative statements must be assigned to `_` or `()`, or else use double `;;`.

<table>
  <thead>
    <tr>
      <th>OCaml Module Body</th>
      <th>Reason Module Body</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre><code>let ten = 10
let () = imperativeFunc ten ten
let () = imperativeFunc 0 0</code></pre>
      </td>
      <td>
        <pre><code>let ten = 10;
imperativeFunc(ten, ten);
imperativeFunc(0, 0);</code></pre>
      </td>
    </tr>
    <tr>
      <td>
        <pre><code>let ten = 10;;
imperativeFunc ten ten;;
imperativeFunc 0 0;;</code></pre>
      </td>
      <td>
        Same as above
      </td>
    </tr>
  </tbody>

  <thead>
    <tr>
      <th>OCaml Local Scope</th>
      <th>Reason Local Scope</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre><code>let ten = 10 in
let _ = imperativeFunc ten ten in
imperativeFunc 0 0</code></pre>
      </td>
      <td>
        Same as above
      </td>
    </tr>
    <tr>
      <td>
        <pre><code>let ten = 10 in begin
  imperativeFunc ten ten;
  imperativeFunc 0 0
end</code></pre>
      </td>
      <td>
        Same as above
      </td>
    </tr>
    <tr>
      <td>
        <pre><code>let ten = 10 in (
  imperativeFunc ten ten;
  imperativeFunc 0 0
)</code></pre>
      </td>
      <td>
        Same as above
      </td>
    </tr>
  </tbody>
</table>

## Tuple and Record

In Reason, tuples always require parentheses.

OCaml | Reason
------|-------
`let tup = 4, 5` | `let tup = (4, 5);`
`let tup = ((1: int), (2:int))` | `let tup = (1: int, 2:int);`
`fun ((a: int), (b: int)) -> a ` | `((a: int, b: int)) => a;`

In Reason, record values resemble JavaScript, using `:` instead of `=`.

<table>
  <thead>
    <tr>
      <th>OCaml</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre><code>let myRec = {x = 0; y = 10}</code></pre>
      </td>
      <td>
        <pre><code>let myRec = {x: 0, y: 10};</code></pre>
      </td>
    </tr>
    <tr>
      <td>
        <pre><code>let myFuncs = {
    myFun = (fun x -> x + 1);
    your = (fun a b -> a + b);
  }</code></pre>
      </td>
      <td>
        <pre><code>let myFuncs = {
    myFun: (x) => x + 1,
    your: (a, b) => a + b
  };</code></pre>
      </td>
    </tr>
  </tbody>
</table>

## Lists

OCaml | Reason
------|-------
`let list = [1; 2; 3]` | `let list = [1, 2, 3]`
`let list = hd :: tl` | `let list = [hd, ...tl];`

## Type Definitions

OCaml Tuple | Reason Tuple
------|-------
`type tuple = int * int` | `type tuple = (int, int);`
`let tup: tuple = (10, 30)` | `let tup: tuple = (10, 30);`

OCaml Record | Reason Record
------|-------
`type r = {x: int; y: int}` | `type r = {x: int, y: int};`
`let myRec: r = {x = 0; y = 10}` | `let myRec: r = {x: 0, y: 10};`

OCaml Function | Reason Function
------|-------
`type func = int -> int` | `type func = int => int;`
`let x: func = fun a -> a + 1` | `let x: func = (a) => a + 1;`

## Functions

OCaml | Reason
------|-------
`let x a b = e` | `let x = (a, b) => e`
`let x = fun a b -> e` | `let x = (a, b) => e`
`let x = fun a -> fun b -> e` | `let x = (a, b) => e`

### Single argument match functions

OCaml has a function definition (`function |`) which is considered to be
equivalent of `function a -> match a with ...`. Reason has the same, but
the syntax makes it clear how it is actually an extension of a single argument
function. The single case match is a natural extension of the simple lambda,
and the multicase lambda is a natural extension of the single case lambda.

<table>
  <thead>
    <tr>
      <th>Form</th>
      <th>OCaml</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Lambda
      </td>
      <td>
        <pre><code>fun pat -> e</code></pre>
      </td>
      <td>
        <pre><code>fun pat => e</code></pre>
      </td>
    </tr>
    <tr>
      <td>
        One match case
      </td>
      <td>
        <pre><code>function | pat -> e</code></pre>
      </td>
      <td>
        <pre><code>fun | pat => e</code></pre>
      </td>
    </tr>
    <tr>
      <td>
        Many cases
      </td>
      <td>
        <pre><code>function | pat -> e
           | pat2 -> e</code></pre>
      </td>
      <td>
        <pre><code>fun | pat => e
      | pat2 => e</code></pre>
      </td>
    </tr>
  </tbody>
</table>

### Annotating Arguments

In both Reason and OCaml, arguments are annotated with types by (as with
everything else), wrapping them in parenthesis after appending
`:typeAnnotation`.

```reason
(arg: argType) => returnValue;
```

```reason
(arg: argType) => (arg2: arg2Type) => returnValue;
```

```reason
(arg: argType, arg2: arg2Type) => returnValue;
```

Both Reason and OCaml allow annotating the return type, when using the
"super sugared let binding" form.

```ocaml
(* OCaml *)
let myFunc (a:int) (b:int) :int * int = (a, b)
let myFunc (a:int) (b:int) :int list = [1]
let myFunc (a:int) (b:int) :int -> int = fun x -> x + a + b
```

```reason
/* Reason */
let myFunc = (a: int, b: int) :(int, int) => (a, b);
let myFunc = (a: int, b: int) :list(int) => [1];
let myFunc = (a: int, b: int): (int => int) => (x) => x + a + b;
```

Because we're using `=>` for all functions everywhere in Reason, there's one case where we need to add extra parens around a return type that is itself a function type.

### Type Parameters

#### OCaml

OCaml's type applications (think "generics"), are applied in reverse order.

With OCaml, there are some unintuitive consequences of this.


```ocaml
let x: int list = [2]

type listOfListOfInts = int list list

(* Parsed as: *)
type listOfListOfInts = (int list) list
```


Things get even more strange when type constructors accept multiple parameters.
Multiple arguments require parenthesis and commas to separate type parameters,
but those parentheses don't represent tuples. The parentheses/comma form must
also be given when constructing type instances such as `(int, string) tuple`.


```ocaml
type ('a, 'b) tuple = 'a * 'b

type listOfTuplesOfStringAndInt = (string, int) tuple list

(* Which is parsed as: *)
type listOfTuplesOfStringAndInt = ((string, int) tuple) list

(* Which allows a list of (tuples of (string and int)) *)
let tuples: listOfTuplesOfStringAndInt = [("asdf", 3)]
```

#### Reason

In summary, Reason unifies almost all of the syntax into simple "function application" style meaning that type parameters follow the same comma-separated pattern seen everywhere else in the syntax. This results in fewer syntactic patterns to learn.

For example, you can imagine `list` being a "function" for types that accepts a
type and returns a new type.

<table>
  <thead>
    <tr>
      <th>OCaml</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre><code>let x: int list = [2]
type listOfListOfInts = int list list
type ('a, 'b) tup = ('a * 'b)
type pairs = (int, int) tup list
let tuples: pairs = [(2, 3)]</code></pre>
      </td>
      <td>
        <pre><code>let x: list(int) = [2];
type listOfListOfInts = list(list(int));
type tup('a, 'b) = ('a, 'b);
type pairs = list(tup(int, int));
let tuples: pairs = [(2, 3)];</code></pre>
      </td>
    </tr>
  </tbody>
</table>

## Tuples as Type Parameters

Because OCaml uses parens and commas to represent multiple arguments to type
constructors, it's confusing when one of the arguments to a type constructor is
itself a tuple. In OCaml, it's difficult to remember the difference between a
type constructor accepting multiple arguments and a type constructor accepting
a single argument which happens to be a tuple.

The following examples shows the difference between passing *two* type
parameters to `pair`, and a *single* type parameter that happens to be a tuple.

OCaml | Reason
------|-------
`type intPair = (int, int) pair` | `type intPair = pair(int, int)`
`type pairList = (int * int) list` | `type pairList = list((int, int))`

- In Reason, syntax that represent tuple or tuple types, always looks like
  tuples.
- In Reason, syntax that represent records or record types, always look like
  records.
- Just about everything else uses the syntactic pattern of function application
  (comma separated arguments).


## Variants

##### OCaml
- OCaml already expects constructor argument types to be specified in tuple
  form, so it's confusing when a single constructor expects a single argument
  that *happens* to be a tuple type.
- What's even more confusing is that the constructors don't *actually* accept
  tuples, yet the syntax appear to resemble tuples.
- Sometimes the syntax for instantiating a constructor with multiple arguments
  overlaps the syntax for constructing a variant with a single argument that
  happens to be a tuple - so it looks *exactly* like you *are* supplying a
  tuple when you are not actually supplying a tuple.

##### Reason

- Variant constructor types are expected to be listed as comma separated lists,
  using parenthesis to group precedence (as with **everything** else).
- Constructing instances of the variant (as you would have guessed) follows
  function application style (comma separated lists).
- Tuples **always** *look* like tuples, and anything that looks like a tuple
  *is* a tuple.

<table>
  <thead>
    <tr>
      <th>OCaml</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre><code>type myVariant =
    | HasNothing
    | HasSingleInt of int
    | HasSingleTuple of (int * int)
    | HasMultipleInts of int * int
    | HasMultipleTuples of (int * int) * (int * int)</code></pre>
      </td>
      <td>
        <pre><code>type myVariant =
    | HasNothing
    | HasSingleInt(int)
    | HasSingleTuple((int, int))
    | HasMultipleInts(int, int)
    | HasMultipleTuples((int, int), (int, int));</code></pre>
      </td>
    </tr>
    <tr>
      <td>
        <pre><code>let a = HasSingleInt 10
  let a = HasSingleTuple (10, 10)
  let a = HasMultipleInts (10, 10)
  let a = HasMultipleTuples ((10, 10), (10, 10))</code></pre>
      </td>
      <td>
        <pre><code>let a = HasSingleInt(10);
  let a = HasSingleTuple((10, 10));
  let a = HasMultipleInts(10, 10);
  let a = HasMultipleTuples((10, 10), (10, 10));</code></pre>
      </td>
    </tr>
    <tr>
      <td>
        <pre><code>let res x = match x with
    | HasNothing -> 0
    | HasSingleInt x -> 0
    | HasSingleTuple (x, y) -> 0
    | HasMultipleInts (x, y) -> 0
    | HasMultipleTuples ((x, y), (q, r)) -> 0</code></pre>
      </td>
      <td>
        <pre><code>let res = (x) =>
    switch (x) {
    | HasNothing => 0
    | HasSingleInt(x) => 0
    | HasSingleTuple((x, y)) => 0
    | HasMultipleInts(x, y) => 0
    | HasMultipleTuples((x, y), (q, r)) => 0
    };</code></pre>
      </td>
    </tr>
  </tbody>
</table>

## Pattern Matching

<table>
  <thead>
    <tr>
      <th>OCaml</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre><code>let res = match x with
    | A (x, y) -> match y with
      | None -> 0
      | Some i -> 10
    | B (x, y) -> 0</code></pre>
      </td>
      <td>
        <pre><code>let res = switch (x) {
    | A((x, y)) => switch (y) {
        | None => 0
        | Some(i) => 10
      }
    | B((x, y)) => 0
  };</code></pre>
      </td>
    </tr>
  </tbody>
</table>

Can you spot the error in the OCaml example? This is one of the most common mistakes among OCaml programmers. The nested `match` *must* be wrapped in parentheses, otherwise the `Some` case is parsed as belonging to the outer `match`. Visually, it's actually:

```ocaml
let res = match x with
  | A (x, y) -> match y with
    | None -> 0
    | Some i -> 10
    | B (x, y) -> 0
```

Reason's mandatory `{}` around `switch` cases prevents this issue.

## Modules and Signatures

### Definition

<table>
  <thead>
    <tr>
      <th>OCaml</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre><code>module type MySig = sig
    type t = int
    val x: int
  end
  module MyModule: MySig = struct
    type t = int
    let x = 10
  end
  module MyModule = struct
    module NestedModule = struct
       let msg = "hello";
    end
  end</code></pre>
      </td>
      <td>
        <pre><code>module type MySig = {
    type t = int;
    let x: int;
  };
  module MyModule: MySig = {
    type t = int;
    let x = 10;
  };
  module MyModule = {
    module NestedModule = {
      let msg = "hello";
    };
  };</code></pre>
      </td>
    </tr>
  </tbody>
</table>

### Functors Types

<table>
  <thead>
    <tr>
      <th>OCaml</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre><code>module type FType =
    functor (A: ASig) ->
    functor (B: BSig) -> Result</code></pre>
      </td>
      <td>
        <pre><code>module type FType =
    (A: ASig) =>
    (B: BSig) => Result;</code></pre>
      </td>
    </tr>
  </tbody>
</table>

## Functors

<table>
  <thead>
    <tr>
      <th>OCaml</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre><code>module F =
    functor (A: ASig) ->
    functor (B: BSig) -> struct end</code></pre>
      </td>
      <td>
        <pre><code>module F =
    (A: ASig) =>
    (B: BSig) => {};</code></pre>
      </td>
    </tr>
    <tr>
      <td>
        <pre><code>module F = functor (A: ASig) (B: BSig) -> struct end</code></pre>
      </td>
      <td>
        <pre><code>module F = (A: ASig, B: BSig) => {};</code></pre>
      </td>
    </tr>
    <tr>
      <td>
        <pre><code>module F (A: ASig) (B: BSig) = struct end</code></pre>
      </td>
      <td>
        <pre><code>module F = (A: ASig, B: BSig) => {};</code></pre>
      </td>
    </tr>
    <tr>
      <td>
        <pre><code>module Res = F(A)(B)</code></pre>
      </td>
      <td>
        <pre><code>module Res = F(A, B);</code></pre>
      </td>
    </tr>
  </tbody>
</table>

## Various Improvements

OCaml doesn't require parens around sequences `(a;b;c;d)` or tuples `(x,y)`, so
that ends up ruling out a bunch of other very convenient syntax rules.  Since
Reason always uses `{}` to enclose sequences or let bindings, and Reason
always requires `()` around tuples, many other syntax constructs are expressed
more intuitively, without requiring extra wrapping in parenthesis.

### Lambdas as record fields no longer need extra parens

This is a welcomed improvement because the OCaml type errors the user would
see were very confusing when it would believe the function's return value
was a tuple with infix `,` comma.

<table>
  <thead>
    <tr>
      <th>OCaml</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre><code>let myFuncs = {
    myFun = (fun x -> x + 1);
    your = (fun a b -> a + b);
  }</code></pre>
      </td>
      <td>
        <pre><code>let myFuncs = {
    myFun: (x) => x + 1,
    your: (a, b) => a + b
  };</code></pre>
      </td>
    </tr>
  </tbody>
</table>


### Lambdas as match results no longer need extra parens

<table>
  <thead>
    <tr>
      <th>OCaml</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre><code>let x = match prnt with
    | None -> fun a -> blah
    (* Extra () required ! *)
    | Some "_" -> (fun a -> ())
    | Some "ml" -> blah</code></pre>
      </td>
      <td>
        <pre><code>let x =
    switch (prnt) {
    | None => (a) => blah
    | Some("_") => (a) => ()
    | Some("ml") => blah
    };</code></pre>
      </td>
    </tr>
  </tbody>
</table>

### Lambdas and type annotations in tuples no longer require extra parens

OCaml | Reason
------|-------
`let tuple = ((fun x -> x), 20)` | `let tuple = ((x) => x, 20);`
`let tuple = (("hi": string), (20: int))` | `let tuple = ("hi": string, 20: int);`

## Various Differences

### `as` precedence

With Reason, `as` has a higher precedence than `|` bar. This allows creating `as` aliases
for entire rows in pattern matching.

<table>
  <thead>
    <tr>
      <th>OCaml</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre><code>let ppp = match MyThing 20 with
    | (MyThing x as ppp)
    | (YourThing x as ppp) -> ppp;</code></pre>
      </td>
      <td>
        <pre><code>let ppp =
    switch (MyThing(20)) {
    | MyThing(x) as ppp
    | YourThing(x) as ppp => ppp
    };</code></pre>
      </td>
    </tr>
  </tbody>
</table>

### Mutable Record Field Updates

Because equalities and their negations have been made more consistent in Reason,
the `=` operator is available for mutable field update.

OCaml | Reason
------|-------
`myRec.field <- "next"` | `myRec.field = "next"`

### Prefix operators

Reason's `!` is used for boolean `not`. Deferencing uses the postfix `^`.

OCaml                                 | Reason
--------------------------------------|--------------------------------
`let x = !(foo.bar)`    | `let x = foo.bar^;`
`let x = !(foo#bar)`    | `let x = foo#bar^;`
`let x = !(!foo.bar)`   | `let x = foo^.bar^;`
`let x = !(!foo#bar)`   | `let x = (foo^)#bar^;`
`let x = !(!(foo.bar))` | `let x = foo.bar^ ^;`
`let x = !(!(foo#bar))` | `let x = foo#bar^ ^;`
`let x = !!(foo.bar)`   | `let x = !!foo.bar;`
`let x = !!(foo#bar)`   | `let x = !!foo#bar;`
`let x = !~(foo.bar)`   | `let x = !~foo.bar;`
`let x = !~(foo#bar)`   | `let x = !~foo#bar;`


### Comment Escaping
Because Reason uses C-style comments, some obscure custom prefix/infix
operators must be written differently.  The rules for prefix/infix operators
are the same as in OCaml syntax, but with the following exceptions:

Specifically, if any character except the first in an prefix/infix operator is
a star or forward slash, that must be first escaped with a backslash. These will
be parsed *without* the backslash when added to the AST. When reprinted, the
escape backslashes are added back in automatically.


OCaml                                        | Reason
---------------------------------------------|--------------------------------
`let (/*) a b = a + b`      |  `let (/\*) a b => a + b;`
`let x = 12 /-* 23 /-* 12`   |  `let x = 12 /-* 23 /-* 12;`
`let y = (/*) a b`           |  `let y = a /\* b;`
`let (!=*) q r = q + r`     |  `let ( !=* ) = (q, r) => q + r;`
`let res = q (!=*) r`        |  `let res = q(( !=* ), r);`
`let (!=/*) q r = q + r`    |  `let ( !=/\* ) = (q, r) => q + r;`
`let res = q (!=/*) r`       |  `let res = q(( !=/\* ), r);`

### Operator Renaming

If Reason uses `==` to represent OCaml's `=`, and uses `===` to represent OCaml's `==`, then how would Reason represent OCaml's `===` symbol (if it were defined)? Reason provides a way! "Escape" the triple equals symbol!

Identifier | Meaning | OCaml | Reason
-----------|---------|-------|-------
`"==="` | Custom value | `x === y` | `x \=== y`

### REPL

In Reason's repl [`rtop`](extra-goodies.md#repl) (a customized [`utop`](https://github.com/diml/utop)), each input is submitted via a single `;` semicolon. OCaml's repl requires two semicolons `;;`.

OCaml | Reason
------|-------
`;;` | `;`
