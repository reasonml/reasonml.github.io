---
title: Externals
order: 170
---

`external`, or "FFI" (foreign function interface), or simply "interop" is how Reason/OCaml communicates with other languages, like C or JavaScript. It's like mandatorily typing a let-binding.

```reason
external myCFunction: int -> string = "theCFunction";
```

```reason
external getElementsByClassName : string => array Dom.element =
  "document.getElementsByClassName" [@@bs.val];
```

You'd often see `external`s when working with BuckleScript, since we're interoping with existing JavaScript libraries a lot. More info on BS externals [here](http://bucklescript.github.io/bucklescript/Manual.html#_binding_to_simple_js_functions_values).