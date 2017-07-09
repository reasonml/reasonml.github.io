---
title: Automatic Printer Generation
order: 20
---

(update: this doesn't seem to be a thing anymore, as of july 2017)

**IN BETA! Please only use this on the native side**.

In JS, it's common to use `console.log` or `JSON.stringify` to print an object
or convert it to a string. This is not possible in OCaml. Because Reason is a
front-end to OCaml, however, we've added the functionality to convert any of
your types to a string -- for free.

```reason
type tree = Leaf | Tree tree int tree;
```

Normally, you would have to write your own stringification function to print a
`tree`, as shown below.

```reason
/* Don't you just love writing boilerplate code? */
let rec show_tree = fun
| Leaf => "Leaf"
| Tree a i b =>
  "Tree (" ^
  show_tree a ^
  ", " ^
  string_of_int i ^
  ", " ^
  show_tree b ^
  ")";
```

With Reason, however, there is no need for that. You can just assume that
`show_tree` exists (it is generated for you) and be on your merry way!

```reason
/* Golly gee! No string nonsense here! */
let myTree = Tree Leaf 4 (Tree Leaf 0 Leaf);
print_endline (show_tree myTree);
```

If you would prefer a different look for your output, feel free to override the
generated function -- simply define a function of the same name `show_tree` and
it will shadow the generated one.

Currently, this is an opt-in feature. Here's how to enable it:

* If you are using `refmt` manually, it requires adding the `--add-printers`
  flag.
* If you would like to attach the `ppx_deriving` runtime, add the
  `--add-runtime` option.
* If you are using `rebuild`, add the Ocamlbuild tag `reason.add_printers` to
  your `_tags` file for the files for which you would like printers generated.
  This implies `--add-printers --add-runtime`.

Last, please note that this will not work with polymorphic types. That is, if
you have code with a `'a` in it, Reason can't generate an automatic printer for
the generalized type.

```reason
/* Sorry, you're out of luck. */
type mytype 'a = SomeSadVariant 'a;
```
