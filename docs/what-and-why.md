---
title: What & Why
---

## What Is Reason?

Reason is a programming language powered by [OCaml](http://ocaml.org)'s
strong type system, and has a syntax designed to feel familiar to people
coming from JavaScript or C-family languages.

<!-- Explain better the compatibility, remove the mention to refmt -->
_Note: Reason can be translated back and forth to OCaml using `refmt`. Anything
possible in Reason is also possible with OCaml and vice versa._

## Why Use Reason?

<!-- Link jordan's video -->

<!-- Explain why is a syntax layer on top of ocaml, problems with OCaml syntax -->
<!-- Link to "Comparision with OCaml" if there's any -->
<!-- To make it a great fit for web development, RReason has first-class support for JSX -->

<!-- OCaml is a wonderful language, awarded, robust, fast and growing -->
<!-- Write down some features of the language from Excesim.io -->

The powerful typesystem underlying Reason will reduce bugs, increase
maintainability, and improve the refactorabilty of your code.

## Different Environments

<!-- Explain different "envs" in good detail -->

There are several projects that allow Reason (and OCaml) to be used in different
environments.

<!-- Reason + OCaml = Reason Native -->
- **Native**: Using the OCaml compiler native executables can be built and run directly on your machine.
  - Tools: [dune](https://dune.build/), [esy](https://github.com/esy/esy)
<!-- Reason + Melange = JavaScript -->
- **JavaScript**: There are several projects that will compile Reason to equivalent JavaScript code that can be run in the browser.
  - [Melange](https://melange.re/)
  - [Js_of_ocaml](https://ocsigen.org/js_of_ocaml/)

<!-- Mention universal code

Reason can be used to target both environtment at the same time

- It's experimental
- Thanks to dune

-->

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
