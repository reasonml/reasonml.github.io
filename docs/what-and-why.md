---
title: What & Why
---

## What Is Reason?

Reason is not a new language; it's a new syntax and toolchain powered by the battle-tested language, [OCaml](http://ocaml.org). Reason gives OCaml a familiar syntax geared toward JavaScript programmers, and caters to the existing NPM/Yarn workflow folks already know.

In that regard, Reason can be considered as a solidly, statically typed, faster and simpler cousin of JavaScript, minus the historical crufts, plus the features of ES2030 you can use today, and with access to both the OCaml and JS ecosystem!

Reason / OCaml can either be compiled to barebone assembly (native executables) or to JavaScript code via [Js_of_OCaml](https://ocsigen.org/js_of_ocaml/3.7.0/manual/overview). 

## Why Reason?

> "Why bother learning an **entire** new language?"

This isn't what Reason is about.

The core runtime semantics of OCaml (how it behaves at runtime) feels a whole lot like JavaScript, which not only makes it easier to learn, but also gives users access to a set of tools to compile to barebone assembly, iOS, Android and even [microcontrollers](http://www.algo-prog.info/ocapic/web/index.php?id=ocapic)!

For common use-cases, the learning curve of Reason isn't really higher than learning JS + a gradual type system; in return, you get:

- **A rock solid type system**. OCaml types have 100% coverage (every line of code), inference (types can be deduced and aren't required to be written manually), and soundness (once it compiles, the types are guaranteed to be accurate).
- **A focus on simplicity & pragmatism**. Reason allows opt-in side-effect, mutation and objects for familiarity & interop, while keeping the rest of the language pure, immutable and functional.
- **Great Native ecosystem & tooling**. Use [your favorite editor](editor-plugins.md), [your favorite NPM package](libraries.md), and a set of [native libraries](https://reason-native.com) to help you build great native applications!

## Why OCaml As The Backing Language? Why Not [My Favorite Language]?

Many backing languages would satisfy the previous section's points; the points below, however, are important features of the OCaml language that make it particularly well suited as a foundation for Reason.

- **The ability to compile to native code**. OCaml's native (assembly) startup time is in **single digit milliseconds**. People are already starting to use Reason for native use cases today; meanwhile, we're focusing on adoption through great JavaScript compatibility.
- **Side-effects, mutation & other escape hatches**. These aren't usually the shiny selling points of a language; but being able to bridge toward a part of a codebase without an elaborate interop/rewrite is crucial for us at Facebook. OCaml defaults to immutable and functional code, but having the escape hatches makes the initial adoption sometimes simply possible.
- **Implementation polish matters**. OCaml has been refined over two decades and gets better every year.
- **The language for writing React**. [ReasonReact](//reasonml.github.io/reason-react/) demonstrates how naturally React patterns play to the strengths of OCaml/Reason, and ReactJS itself was inspired by the functional, yet pragmatic philosophy of the ML family of languages (as described in the [React To The Future](https://www.youtube.com/watch?v=5fG_lyNuEAw) talk by [jordwalke](https://twitter.com/jordwalke)).
- **Welcoming, growing community**. The Reason community is welcoming of newcomers. The community has members from all over the world. Join [the Discord channel](https://discord.gg/reasonml) and ask for help. Stick around to share what you've learned with other newcomers.

## Reason isn't for you?

Here are some alternatives that share some similar concepts/lineage with Reason/OCaml, but often with a different focus:

- [OCaml](http://ocaml.org). Reason is a syntax and toolchain built on top of the OCaml language, so you can leverage the whole OCaml ecosystem. It's also a good learning tool to get into plain OCaml as well, in case you or your team mates prefer ML over C-like syntax.
- [ReScript](https://rescript-lang.org). Originally coming from the Reason community, ReScript is a JS focused derivate of ReasonML. Its core selling points are easy integration in existing JS codebases, almost seamless JS interoperability and a JS compiler that outperforms any gradual type system / compiler toolchain in the JS ecosystem. 
- [Rust](http://rust-lang.org). Inspired by the ML family of langauges, but not garbage collected. Has excellent parallelism support.
- [Elm](http://elm-lang.org). Another great language in the ML family. Focuses on building web applications. See the widely praised talk on Elm, [Let's Be Mainstream](https://www.youtube.com/watch?v=oYk8CKH7OhE).
- [PureScript](http://www.purescript.org). Inspired by Haskell, compiles to the JavaScript.
- [Fable](http://fable.io/). Based on F#, which is closely related to OCaml.
- [Swift](https://www.apple.com/swift/). Language built by Apple, and interoperates with Objective-C well. Uses reference counted collection (but without automatic cycle breaking).
- [Haxe](https://haxe.org). Compiles to basically anything with a focus on game development.

Want to know more? Strike a conversation with anyone in the [community](community.md)!

_Reason is an open source project that started at Facebook but that is heavily community built/organized_.
