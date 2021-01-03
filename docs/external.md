---
title: External
---

`external`, or "FFI" (foreign function interface), or simply "interop" (for "interoperability") is how Reason communicates with other languages, like C or JavaScript.

Imagine writing a let binding, but with its body omitted and its (mandatory) type written down:

```reason
external myCFunction: int => string = "theCFunction";
```

**Note**: `external`s can only be at the top level, or inside a module definition. You can't declare them in e.g. a function body.

## Usage

You'd use an external value/function as if it was a normal let binding.

For more infos on how to link up your C functions within your Reason application, have a look at the [Dealing with foreign libraries](https://dune.readthedocs.io/en/stable/foreign-code.html?highlight=foreign) section in the `dune` build system docs. 
