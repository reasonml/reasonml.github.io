---
title: What & Why
---

# Overview

Reason is a user-friendly programming language built on [OCaml](http://ocaml.org)'s robust type system, making it a comfortable choice for developers familiar with JavaScript or C-family languages.

Not only does Reason leverage the OCaml type system, but it also seamlessly integrates with its reliable ecosystem, providing access to all the tools of OCaml, including the Language Server, the de facto build system [dune](https://dune.build), and the package manager [opam](https://opam.ocaml.org).

Notably versatile, Reason serves as an excellent choice for a range of applications, particularly excelling in web development. Its adaptability extends to the creation of visually appealing UIs for browsers, aided by its capability to compile to native, bytecode, and JavaScript, with plans for WebAssembly support.

## Why Use Reason?

<iframe
  width="784"
  height="432"
  src="https://www.youtube.com/embed/5fG_lyNuEAw?si=HPFaMIMIX0Krn2wK"
  title="Jordan Walke - Keynote ReasonConf US 2019"
  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>

**Functional Programming**

Reason is a practical functional programming language. Offers a powerful blend of functional programming capabilities, with optional support for mutation and side-effects, enhancing its practicality.

**An eye for simplicity & pragmatism**

We allow opt-in side-effect, mutation and object for familiarity & interop, while keeping the rest of the language pure, immutable and functional.

**Rock solid type system**

The type system offers a state-of-the-art sound type system, soundness  which means it is guaranteed there will be no runtime type errors after type checking and provides strong type inference, types are rarely required to be written manually, while maintaining soundness.

**Fast compiler**

Compilation times are super fast which translates to fast and safe iteration cycles. The compiler won't compile twice the same code, and will only compile the necessary files each run.

**First-class JSX support**

JSX is part of the language. JSX is an embeddable XML-like syntax, used to describe what the UI should look like, and composes with the rest of the language. More into [JSX](jsx.md).

**Portability/Universal code**

Reason can be compiled to native, bytecode, and JavaScript, with an ongoing plan for WebAssembly.

## Different Environments

Reason compiles to JavaScript thanks to our partner project, [Melange](compiling-to-js-with-melange.md), which compiles OCaml/Reason into JavaScript with smooth interoperability with JavaScript. Reason also compiles to fast, barebone assembly, thanks to OCaml itself.

There's a clear distinction between the two environments, one runs JavaScript in the browser while the other runs assembly on the machine. But the language constructors and tooling is the same, so you can write code for the two environments.

**Compile to JavaScript**

[Melange](compiling-to-js-with-melange.md) is a backend for the OCaml compiler that emits JavaScript. Melange strives to provide the best integration with both the OCaml and JavaScript ecosystems. It is the recommended way to compile Reason to JavaScript, since it compiles 1 module to 1 file, has a very good interop with JavaScript and integrates well with modern frontend development tooling. Take a closer look at our page [Compiling to JavaSCript with Melange](compiling-to-js-with-melange.md).

**Compile to Native**

Native means using the OCaml compiler to produce native executables that can run directly on your machine. It's recommended to use [dune](https://dune.build) which is the defacto build system for native OCaml projects, but it's also possible to use [ocamlc (OCaml's compiler)](https://ocaml.org/docs/compiling-ocaml-projects) directly.

## Where do I start?

The [getting started](getting-started.md) page will set you up.

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
