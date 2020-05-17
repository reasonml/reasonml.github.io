---
title: What & Why
---

## What Is Reason?

Reason is not a new language; it's a new syntax and toolchain powered by the battle-tested language, [OCaml](http://ocaml.org). Reason gives OCaml a familiar syntax geared toward JavaScript programmers, and caters to the existing NPM/Yarn workflow folks already know.

In that regard, Reason can be considered as a solidly, statically typed, faster and simpler cousin of JavaScript, minus the historical crufts, plus the features of ES2030 you can use today, and with access to both the JS and the OCaml ecosystem!

Reason compiles to JavaScript thanks to our partner project, [BuckleScript](https://bucklescript.github.io), which compiles OCaml/Reason into readable JavaScript with smooth interop. Reason also compiles to fast, barebone assembly, thanks to OCaml itself.

## Why Reason?

> "Why bother learning an **entire** new language?"

This isn't what Reason is about.

The core runtime semantics of OCaml (how it behaves at runtime) maps straightforwardly to JavaScript\*. If one leaves out a few corners of JavaScript and adds a few nice features, one can actually compile to pretty readable JS and directly use 80% of JavaScript's ecosystem & tooling. On top of that, you can use that same language to compile to barebone assembly, iOS, Android and even [microcontrollers](http://www.algo-prog.info/ocapic/web/index.php?id=ocapic)!

However, it's unclear which features of JS to reshape, in order to fit it into the mold of a language designed around fast semantics and sound typing. But we can _work backward_, from a language that has been designed from the ground up around performance and safety, and make some adjustments so that it looks and acts a bit more like the better part of the familiar web language we've come to know.

All these decisions made it so that, for common use-cases, the learning curve of Reason isn't really higher than learning JS + a gradual type system; in return, you get:

- **A rock solid type system**. OCaml types have 100% coverage (every line of code), inference (types can be deduced and aren't required to be written manually), and soundness (once it compiles, the types are guaranteed to be accurate).
- **A focus on simplicity & pragmatism**. Reason allows opt-in side-effect, mutation and objects for familiarity & interop, while keeping the rest of the language pure, immutable and functional.
- **A focus on performance & size**. Reason is used to compile to JavaScript using the build system, [`bsb`](https://bucklescript.github.io/docs/en/build-overview.html), which finishes incremental builds in less than 100ms. The resulting output is also [tiny](https://twitter.com/bobzhang1988/status/827562467148623875).
- **Incremental learning & codebase conversion**. Reap the benefits of a fully typed file from day one. If everything else fails, [paste some raw JavaScript snippets right in your Reason file](interop.md).
- **Great ecosystem & tooling**. Use [your favorite editor](editor-plugins.md), [your favorite NPM package](libraries.md), and any of your [favorite](https://github.com/reasonml/reason-react) [existing](https://github.com/reasonml-community/bs-jest) [stack](https://webpack.js.org).

\* Don't believe it? Check our [JS -> Reason cheat sheet](syntax-cheatsheet.md) or try a few snippets of Reason in [the playground](/try.html) and observe the output at the right!

## Why OCaml As The Backing Language? Why Not [My Favorite Language]?

Many backing languages would satisfy the previous section's points; the points below, however, are important features of the OCaml language that make it particularly well suited as a foundation for Reason.

- **The ability to compile to native code**. OCaml's native (assembly) startup time is in **single digit milliseconds**. People are already starting to use Reason for native use cases today; meanwhile, we're focusing on adoption through great JavaScript compatibility.
- **Side-effects, mutation & other escape hatches**. These aren't usually the shiny selling points of a language; but being able to bridge toward a part of a codebase without an elaborate interop/rewrite is crucial for us at Facebook. OCaml defaults to immutable and functional code, but having the escape hatches makes the initial adoption sometimes simply possible.
- **Implementation polish matters**. OCaml has been refined over two decades and gets better every year.
- **The language for writing React**. [ReasonReact](//reasonml.github.io/reason-react/) demonstrates how naturally React patterns play to the strengths of OCaml/Reason, and ReactJS itself was inspired by the functional, yet pragmatic philosophy of the ML family of languages (as described in the [React To The Future](https://www.youtube.com/watch?v=5fG_lyNuEAw) talk by [jordwalke](https://twitter.com/jordwalke)).
- **Welcoming, growing community**. The Reason community is welcoming of newcomers. The community has members from all over the world. Join [the Discord channel](https://discord.gg/reasonml) and ask for help. Stick around to share what you've learned with other newcomers.

## Reason isn't for you?

Here are some alternatives that share some similar concepts/lineage with Reason/OCaml, but often with a different focus:

- [OCaml](http://ocaml.org). Reason is a syntax and toolchain built on top of the OCaml language. OCaml and Reason interoperate with each other. You can compile plain OCaml with BuckleScript, and [Js_of_ocaml](http://ocsigen.org/js_of_ocaml/) can work with Reason as well.
- [Rust](http://rust-lang.org). Inspired by the ML family of langauges, but not garbage collected. Has excellent parallelism support.
- [Elm](http://elm-lang.org). Another great language in the ML family. Focuses on building web applications. See the widely praised talk on Elm, [Let's Be Mainstream](https://www.youtube.com/watch?v=oYk8CKH7OhE).
- [PureScript](http://www.purescript.org). Inspired by Haskell, compiles to the JavaScript.
- [Fable](http://fable.io/). Based on F#, which is closely related to OCaml.
- [ClojureScript](https://clojurescript.org). Dynamically typed language that prioritizes simplicity & great interop as well. Doesn't appear to have much in common with ReasonML. Shares some functional roots with the ML family of languages.
- [Swift](https://www.apple.com/swift/). Language built by Apple, and interoperates with Objective-C well. Uses reference counted collection (but without automatic cycle breaking).
- [Haxe](https://haxe.org). Compiles to basically anything with a focus on game development.

Want to know more? Strike a conversation with anyone in the [community](community.md)!

_Reason is an open source project that started at Facebook but that is heavily community built/organized_.
