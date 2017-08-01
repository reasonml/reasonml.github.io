---
title: External
order: 170
---

`external`, or "FFI" (foreign function interface), or simply "interop" (for "interoperability") is how Reason communicates with other languages, like C or JavaScript.

Imagine writing a let binding, but with its body omitted and its type mandatorily written down:

```reason
external myCFunction: int => string = "theCFunction";
```

```reason
external getElementsByClassName : string => array Dom.element =
  "document.getElementsByClassName" [@@bs.val];
```

(The above is a [BuckleScript](https://bucklescript.github.io/bucklescript/Manual.html)-specific external that binds to a JavaScript function of the same name.)

### Usage

You'd use an external value/function as if it was a normal let binding.

### Tips & Tricks

If you come from a JavaScript background: **do take some time to learn about the [BuckleScript externals](http://bucklescript.github.io/bucklescript/Manual.html#_binding_to_simple_js_functions_values)**! In the beginning, you'll likely encounter quite a few `external`s before you get to write 100% pure idiomatic Reason code.

### Design Decisions

Reason takes interoperating with existing code very seriously. Our type system has very strong guarantees. However, such strong feature also means that, without a great interop system, it'd be very hard to gradually convert a codebase over to Reason. Fortunately, the FFI allows us to cooperate very well with existing, dirty code (/guide/javascript/converting). The combination of a sound type system + great interop means that we get the benefits of a traditional gradual type system regarding incremental codebase coverage & conversion, without the downside of such gradual type system: complex features to support existing patterns, slow analysis, diminishing return in terms of type coverage, etc. In a gradual
