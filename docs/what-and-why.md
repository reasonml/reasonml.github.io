---
title: What & Why
---

# Overview

Reason is a user-friendly programming language built on the robust type system of [OCaml](http://ocaml.org), providing a comfortable transition for developers familiar with JavaScript or C-family languages. It offers a powerful blend of functional programming capabilities, such as pattern matching and variants, with optional support for mutation and side-effects, enhancing its practicality.

The language's strength lies in its seamless integration with the reliable OCaml ecosystem, allowing for smooth refactoring aided by the compiler's speed and intelligent type inference.

Notably versatile, Reason serves as an excellent choice for a range of applications, particularly excelling in web development. Its adaptability extends to the creation of visually appealing UIs for browsers, aided by its capability to compile to native, bytecode, and JavaScript, with plans for WebAssembly support.

## Why Use Reason?

![Jordan Walke - Keynote ReasonConf US 2019](https://www.youtube.com/watch?v=5fG_lyNuEAw&t=3s&ab_channel=ReasonConf)

**Functional Programming**
ReasonML is a practical functional programming language. Offers a powerful blend of functional programming capabilities, with optional support for mutation and side-effects, enhancing its practicality.

**OCaml's type system**
OCaml offers an industrial-strength state-of-the-art type system and provides strong type inference. It is a sound type system which means it is guaranteed there will be no runtime type errors after type checking.

**Type inference**
No need to specify types, types are inferred by the compiler and are guaranteed to be correct. Adding types helps the compiler give better error messages.

**Fast compiler**
ReasonML compilation times are super fast which translates to fast and safe iteration cycles.

**First-class JSX support**
JSX is part of the language. JSX is an embeddable XML-like syntax, used to describe what the UI should look like, and composes with the rest of the language. (Link to JSX)

**Portability/Universal code**
Reason can compile to native, bytecode, and JavaScript, with plans for WebAssembly support.

## Different Environments

There are several projects that allow Reason (and OCaml) to be used in different environments.

- **JavaScript**: Compile Reason to equivalent JavaScript code that can be run in the browser, or any other JavaScript environment.
  - [Melange](https://melange.re) is a backend for the OCaml compiler that emits JavaScript. Melange strives to provide the best integration with both the OCaml and JavaScript ecosystems. It is the recommended way to compile Reason to JavaScript, since it compiles 1 module to 1 file, has a very good interop with JavaScript and integrates well with modern frontend development tooling.
  - [Js_of_ocaml](https://ocsigen.org/js_of_ocaml) is a compiler from OCaml bytecode programs to JavaScript. Since it compiles from the bytecode, it can compile all OCaml programs, but makes the whole process more opaque, generates bigger bundles and has a worse interop with JavaScript.
- **Native**: Using the OCaml compiler to produce native executables that can run directly on your machine. [dune](https://dune.build) is the defacto build system for native OCaml projects, but it's also possible to use [ocamlc (OCaml's compiler)](https://ocaml.org/docs/compiling-ocaml-projects) directly

## Where do I start?

The [getting started](getting-started.md) page will set you up

## Alternatives

Here are some alternatives that share similar concepts with Reason:

- [Rust](http://rust-lang.org). Inspired by the ML family of languages, but not garbage collected. Has excellent parallelism support.
- [Elm](http://elm-lang.org). Another great language in the ML family. Focuses on building web applications. See the widely praised talk on Elm, [Let's Be Mainstream](https://www.youtube.com/watch?v=oYk8CKH7OhE).
- [PureScript](http://www.purescript.org). Inspired by Haskell, compiles to the JavaScript.
- [Fable](http://fable.io/). Based on F#, which is closely related to OCaml.
- [ClojureScript](https://clojurescript.org). Dynamically typed language that prioritizes simplicity & great interop.
- [Swift](https://www.apple.com/swift/). Language built by Apple, and interoperates with Objective-C well.
- [Haxe](https://haxe.org). Compiles to basically anything with a focus on game development.
- [ReScript](rescript-lang.org). Fast, Simple, Fully Typed JavaScript from the Future.
