---
title: Frequently Asked Questions
---

### I'm not sure what to do with Reason

You can do all the things you'd usually do with JavaScript or OCaml! OCaml is an incredible useful language for general programming, while still being able to compile to pretty type safe JS with the aid of the [`Melange`](https://melange.re/v2.0.0/) compiler.

Natively compiled CLI's are also known to be really fast (like... C-like fast), and since the language is garbage collected, you will find yourself in a very nice spot of not having to worry about borrow-checking like in Rust and you don't have to deal with verbose non-ML languages like Go.

Reason also gives access to the declarative UI framework [revery-ui](https://github.com/revery-ui/revery) to build native applications with a ReactJS like paradigm (+ JSX).

### What is BuckleScript and ReScript, and why is it mentioned in so many Reason related resources?

Reason was originally integrated with BuckleScript to provide a single toolchain for JavaScript and React.js development.

In July 2020, BuckleScript released its own syntax and rebranded to ReScript to be its own language. More infos can be found in their [official rebranding announcement](https://rescript-lang.org/blog/bucklescript-is-rebranding).

### Where do all these `print_endline`, `string_of_int` functions come from?
They're from the standard library, pre-`open`ed during the compilation of your file. This is why you see them in scope.

You can read more about the Pervasives library in the api documentation:

https://reasonml.github.io/api/Pervasives.html

### Why is there a + for adding ints and +. for adding floats, etc.?
See [here](integer-and-float.md#design-decisions).

### What's the `.merlin` file at the root of my project?
That's the metadata file for [editor support](editor-plugins.md). This is usually generated for you; You don't need to check that into your version control and don't have to manually modify it.

### I don't see any `import` or `require` in my file; how does module resolution work?
Reason/OCaml doesn't require you to write any import; modules being referred to in the file are automatically searched in the project. Specifically, a module `Hello` asks the compiler to look for the file `hello.re` or `hello.ml` (and their corresponding [interface file](module.md#signatures), `hello.rei` or `hello.mli`, if available).

### Is `Some | None`, `contents`, `Array`, `List` and all of these special? Where do they come from?
They're ordinary variants/records/module definitions that come with the [standard library](/api/index.html), `open`ed by default during compilation out of convenience.

### What's this `MyModule.t` I keep seeing?
Assuming `MyModule` is a module's name, `t` is a community convention that indicates "the type that represents that module, whatever that means". For example, for the [`Js.String`](http://bucklescript.github.io/bucklescript/api/Js.String.html) module, [`String.t`](http://bucklescript.github.io/bucklescript/api/Js.String.html#TYPEt) is the type carried around and representing "a string".

### What does an argument with a prepended underscore (e.g. `_` or `_foo`) mean?
Say you have `List.map(item => 1, myList);`. The argument `item` isn't used and will generate a compiler warning. Using `_ => 1` instead indicates that you're intentionally receiving and ignoring the argument, therefore bypassing the warning. Alternatively, `_item => 1` has the same effect, but indicates more descriptively what you're ignoring.
