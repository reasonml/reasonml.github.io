---
title: Frequently Asked Questions
order: 40
---
Frequently Asked Questions
=======

#### Should I learn Reason or OCaml first?
There's no need to pick! Reason and OCaml share the exact same semantics (i.e. how the code runs). Only the syntax differ. Carry [Reason-tools](https://github.com/reasonml/reason-tools) around so that you can freely convert between the two syntaxes. A Reason tutorial is an OCaml tutorial, vice-versa.

#### I'm not sure what to do with Reason
[We compile to JS very well](/guide/javascript). Think of what project you'd usually make if it was pure JavaScript; try porting/writing that in Reason + BuckleScript instead! We recommend trying to make concrete, end-user projects (e.g. a little command line util) rather than infra-level projects (e.g. a boilerplate generator). The latter category requires expertise and understanding idiomatic Reason code.

#### What's the relation between Reason, BuckleScript and OCaml?
See [here](/guide/javascript). Reason's a syntax for OCaml and supports all its features. BuckleScript compiles OCaml/Reason code into JavaScript.

#### Where do all these `print_endline`, `string_of_int` functions come from?
They're from the standard library, pre-`open`ed during the compilation of your file. This is why you see them in scope.

#### What's the server-side story? Should I compile to native or to JS and use node.js?
We do compile to native, but the native workflow is currently work-in-progress. At this time, we recommend compiling to JS through BuckleScript and use the bindings at [reasonml-community](https://github.com/reasonml-community) or somewhere else.

#### What's the `.merlin` file at the root of my project?
That's the metadata file for [Merlin](/guide/editor-tools/extra-goodies#merlin), the shared editor integration backend for autocomplete, jump-to-definition, etc. For the [JavaScript Workflow](/guide/javascript), `bsb` the build system generates the `.merlin` for you; You don't need to check that into your version control and don't have to manually modify it.

#### I don't see any `import` or `require` in my file; how does module resolution work?
Reason/OCaml doesn't require you to write any import; modules being referred to in the file are automatically searched in the project. Specifically, a module `Hello` asks the compiler to look for the file `hello.re` or `hello.ml` (and their corresponding [interface file](/guide/language/module#signatures), `hello.rei` or `hello.mli`, if available).

A module name is the file name, capitalized. It has to be unique per project; this abstracts away the file system and allows you to move files around without changing code.

#### BuckleScript: Is there a generic way to transform a record into a JS object?
Not currently. You'd have to do the manual translation. Alternatively, try [using JS objects directly](http://bucklescript.github.io/bucklescript/Manual.html#_create_js_objects_using_bs_obj)

Generally speaking, we recommend binding to the JS library thinly rather than thickly and idiomatically; better stay lightweight and catch conversion mistakes.

See also our [JS interop guide](/guide/javascript/interop).

#### Bsb: is there a way to configure the output directory?
Not currently. We'd like to keep the configuration minimal.

#### The compiler says the module can't be found.
Are you using a third-party module? If you're compiling to JS, did you add the dependency in your [`bsconfig.json`](http://bucklescript.github.io/bucklescript/Manual.html#_get_started)'s `bs-dependencies` field? Also, did you do `bsb -make-world`? `bsb` by default only build the root project itself for performance.

Additionally, don't forget to add the source folders into your `bsconfig.json`! For performance, `bsb` doesn't automatically and recursively build nested folders.

#### Is `Some | None`, `contents`, `Array`, `List` and all of these special? Where do they come from?
They're ordinary variants/records/module definitions that comes with the [standard library](/api/index.html), `open`ed by default during compilation out of convenience.

#### What does an argument with a prepended underscore (e.g. `_` or `_foo`) mean?
Say you have `List.map (fun item => 1) myList`. The argument `item` isn't used and will generate a compiler warning. Using `fun _ => 1` instead indicates that you're intentionally receiving and ignoring the argument, therefore bypassing the warning. Alternatively, `fun _item => 1` has the same effect, but indicates more descriptively what you're ignoring.

#### What's this `MyModule.t` I keep seeing?
Assuming `MyModule` is a module's name, `t` is a community convention that indicates "the type that represents that module, whatever that means". For example, for the [`Js.String`](http://bucklescript.github.io/bucklescript/api/Js.String.html) module, [`String.t`](http://bucklescript.github.io/bucklescript/api/Js.String.html#TYPEt) is the type carried around and representing "a string".

#### Why is there a [`Js_promise`](http://bucklescript.github.io/bucklescript/api/Js_promise.html) and then a [`Js.Promise`](http://bucklescript.github.io/bucklescript/api/Js.Promise.html)? What about [`Js_array`](http://bucklescript.github.io/bucklescript/api/Js_array.html), [`Js_string`](http://bucklescript.github.io/bucklescript/api/Js_string.html) and whatever else?
As a convention, `Js_foo` is the actual module, and `Js.Foo` is just an alias for it. They're [equivalent](https://github.com/bloomberg/bucklescript/blob/7bc37f387a726ba1ae4afeefe02b9c82577d9e10/jscomp/runtime/js.ml#L124-L138). Prefer `Js.Foo`, because that's the official, public module name.

#### When will modular implicit & multicore & algebraic effects be ready?
They will one day. In the meantime, help us ship more Reason code! The popularity will help funnel more OCaml contributions. The less the OCaml folks need to worry about low-hanging fruits, the more they can focus on great research and execution!

#### Why are BuckleScript and bsb so fast? How can I slow it down?
BuckleScript is optimized for performance across the whole stack. You can try slowing it down by adding a dozen layers of indirections and metaprogramming. Try:

- Adding a few infinite loops here and there.
- Stuffing a JavaScript build tool in the pipeline.
- Dragging in more dependencies for writing a hello world.
