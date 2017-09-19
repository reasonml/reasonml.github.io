---
title: Frequently Asked Questions
order: 40
---
Frequently Asked Questions
=======

#### Should I learn Reason or OCaml first?
There's no need to pick! Reason and OCaml share the exact same semantics (i.e. how the code runs). Only the syntax differ. Carry [Reason-tools](https://github.com/reasonml/reason-tools) around so that you can freely convert between the two syntaxes. A Reason tutorial is an OCaml tutorial, vice-versa. In the terminal, you can have these alises:

```sh
# converts ocaml code into reason
alias mlre="pbpaste | refmt --parse ml --print re --interface false | pbcopy"
# converts reason code into ocaml
alias reml="pbpaste | refmt --parse re --print ml --interface false | pbcopy"
```

They'll take your code from the (macOS) clipboard, convert it, and paste it back into your clipboard! Swap out pbpaste/pbcopy with your system's clipboard functions.

#### I'm not sure what to do with Reason
[We compile to JS very well](/guide/javascript). Think of what project you'd usually make if it was pure JavaScript; try porting/writing that in Reason + BuckleScript instead! We recommend trying to make concrete, end-user projects (e.g. a little command line util) rather than infra-level projects (e.g. a boilerplate generator). The latter category requires expertise and understanding idiomatic Reason code.

#### What's the relation between Reason, BuckleScript and OCaml?
See [here](/guide/javascript). Reason's a syntax for OCaml and supports all its features. BuckleScript compiles OCaml/Reason code into JavaScript.

#### Where do all these `print_endline`, `string_of_int` functions come from?
They're from the standard library, pre-`open`ed during the compilation of your file. This is why you see them in scope.

#### Can I have a function to print arbitrary data structures?
If you're compiling to JavaScript through BuckleScript, you can use the JS `console.log` through [`Js.log`](https://bucklescript.github.io/bucklescript/api/Js.html#VALlog). If you're compiling to native, you'll need something like [ppx_show](https://github.com/diml/ppx_show). A future OCaml feature (called modular implicit) will solve this directly in the language.

#### Why is there a + for adding ints and +. for adding floats, etc.?
See [here](/guide/language/integer-and-float#design-decisions).

#### Does library ___ work with Reason?
Most JS libraries should easily work under Reason + BuckleScript. On the native side, since Reason's just a syntax transform: yes, they work with Reason too. But the native workflow is currently work-in-progress and needs polish.

#### What's the server-side story? Should I compile to native or to JS and use node.js?
We do compile to native, but the native workflow is currently work-in-progress. At this time, we recommend compiling to JS through BuckleScript and use the bindings at [reasonml-community](https://github.com/reasonml-community) or somewhere else.

#### What's BuckleScript's async story?
First, if you're not interfacing with any library that uses promises, you can simply use callbacks. Everyone gets them and they're performant.

If you need to bind to a JS library that uses promises, or communicate with such library, you can use BS's [bindings to promises](http://bucklescript.github.io/bucklescript/api/Js.Promise.html). There's also potential to have some syntactic sugar in the future. In the long run, we'd like to implement a spec-compliant promises implementation in OCaml/Reason proper, so that the compiler optimizations could kick in.

For a more idiomatic OCaml solution: on the native OCaml side, we have [lwt](http://ocsigen.org/lwt/) and [Async](https://ocaml.janestreet.com/ocaml-core/111.03.00/doc/async/#Std). We don't use them in web right now, but we might in the future.

#### What's the (unit) test story?
Some of OCaml's language features (not just types) might be able to defer the need for unit testing until later. In the meantime, for compilation to JS, we're working on [Jest bindings](https://github.com/BuckleTypes/bs-jest). We'll look into using Jest for native too, if Jest is written using Reason in the future (no concrete plan yet). [OUnit](http://ounit.forge.ocamlcore.org) is a good, small native OCaml testing library right now.

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
Not currently. We're keeping the configuration minimal. We'll add it later based on popular demands.

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

#### I'm seeing a weird .cmi/.cmx/.cmj/.cma file referenced in a compiler error. Where do these files come from?

The OCaml community frequently uses file extensions to distinguish between types of source, artifacts, and metadata, depending on your build target (native/bytecode/JavaScript). The following is a overview of some of the file extensions you may come across:

##### Source files

- `.ml`: OCaml source file
- `.mli`: OCaml interface file; determines which parts of the matching `.ml` file are visible to the outside world
- `.re`: Reason source file. Like `.ml`, but for Reason
- `.rei`: Reason interface file. Like `.mli`, but for Reason

##### Compiled files

- `.cmi`: Compiled interface (.rei/mli) file
- `.cmx`: Compiled object file for native output (via ocamlopt)
- `.cmo`: Compiled object file for bytecode output
- `.cmj`: Compiled object file for web (via BuckleScript)
- `.cma`: Library file for bytecode output (equivalent to C's .a files)
- `.cmxa`: Library file for native output
- `.cmt`: Contains a "Typedtree" – basically the AST with all type info
- `.cmti`: Just like a .cmt file, but for interface files
- `.cmxs`: Dynamically loaded plugin (for native compilation)
- `.o`: Compiled native object file
- `.out`: Conventional name/extension for final output produced by ocamlc/ocamlopt (e.g. `ocamlc -o myExecutable.out`)

##### Other OCaml ecosystem files

- `.mll`: ocamllex lexical analyzer definition file
- `.mly`: ocamlyacc parser generator definition file
- `.mldylib`: Contains a list of module paths that will be compiled and archived together to build a corresponding `.cmxs` target (native plugin)
- `.mliv`: Batteries-specific files for some [custom preprocessing](https://github.com/ocaml-batteries-team/batteries-included/blob/f019927b9503ec65ef816f02315de78d4bae3481/src/batArray.mliv).
- `.mllib`: Ocaml library (cma and cmxa)
- `.mlpack`: Ocaml package (cmo built with the -pack flag)
- `.mlpp`: [Extlib](https://github.com/ygrek/ocaml-extlib)-specific files for some custom preprocessing
- `.mltop`: [OCamlbuild top-level file](https://shonkychef.wordpress.com/2009/07/28/making-an-ocaml-toplevel-with-ocamlbuild/), used by OCamlbuild to generate a .top file
- `.odocl`: OCaml documentation file

If some of those explanations are still a bit cryptic, here are expansions on some of the terms used above:
- [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree): Abstract Syntax Tree. The data structure coming from the source code, that the compiler operates on.
- [Linking](https://en.wikipedia.org/wiki/Linker_(computing)): The step where the compiler takes many intermediate compiled files and assembles them together. E.g. linking A with B, because A's original source file referred to B.
- Native: Builds that run on bare metal assembly instructions of the platform in question.
- [Bytecode](https://en.wikipedia.org/wiki/Bytecode): Like native code, but more portable and less performant
- [Object file](https://en.wikipedia.org/wiki/Object_file): Contains machine code that is not directly runnable.

There is more information and context for many of these file extensions [on the OCaml site](https://ocaml.org/learn/tutorials/filenames.html) and in [this mailing list post](http://caml.inria.fr/pub/ml-archives/caml-list/2008/09/2bc9b38171177af5dc0d832a365d290d.en.html). There are also deeper dives on [native](https://caml.inria.fr/pub/docs/manual-ocaml/native.html) and [bytecode](http://caml.inria.fr/pub/docs/manual-ocaml/comp.html) compilation that contain more detailed descriptions in the OCaml manual.

