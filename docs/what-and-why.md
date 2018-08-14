---
title: What & Why
---

## What Is Reason?

Reason is not a new language; it's a new syntax and toolchain powered by the battle-tested language, [OCaml](http://ocaml.org). Reason gives OCaml a familiar syntax geared toward JavaScript programmers, and caters to the existing NPM/Yarn workflow folks already know.

In that regard, Reason can almost be considered as a solidly statically typed, faster and simpler cousin of JavaScript, minus the historical crufts, plus the features of ES2030 you can use today, and with access to both the JS and the OCaml ecosystem!

Reason compiles to JavaScript thanks to our partner project, [BuckleScript](https://bucklescript.github.io), which compiles OCaml/Reason into readable JavaScript with smooth interop. Reason also compiles to fast, barebone assembly, thanks to OCaml itself.

## Why Reason?

> "Why bother learning an **entire** new language?"

This isn't what Reason's about.

The realization is that 80% of OCaml's semantics (aka how it runs) already straightforwardly maps over to modern JavaScript and vice-versa\*; if one has the luxury of leaving out a few corners of JavaScript and add a few nice things, one can actually achieve something that compiles to pretty readable JS and directly use 80% of its ecosystem & tooling. That is, on top of being able to compile to barebone assembly, iOS, Android and even [microcontrollers](http://www.algo-prog.info/ocapic/web/index.php?id=ocapic)!

However, it's unclear which features of JS to reshape, in order to fit it into the mold of a language with fast semantics and 100% sound typing. But we can _work backward_, from an already sound language with performance and simplicity taken into account, and give it a few tweaks so that it looks and acts a bit more like the better part of the familiar web language we've come to know.

All these decisions made it so that, for common use-cases, the learning curve of Reason isn't really higher than learning JS + a gradual type system; in return, you get:

- **A rock solid type system**. OCaml types have 100% coverage (every line of code), inference (types can be deduced and aren't required to be written manually), and soundness (once it compiles, the types are guaranteed to be accurate).
- **An eye for simplicity & pragmatism**. We allow opt-in side-effect, mutation and object for familiarity & interop, while keeping the rest of the language pure, immutable and functional.
- **A focus on performance & size**. Reason's build system, [`bsb`](https://bucklescript.github.io/docs/en/build-overview.html), finishes building in less than 100ms (incremental). Our produced output is also [tiny](https://twitter.com/bobzhang1988/status/827562467148623875).
- **Incremental learning & codebase conversion**. Reap the benefits of a fully typed file from day one. If everything else fails, [paste some raw JavaScript snippets right in your Reason file](interop.md).
- **Great ecosystem & tooling**. Use [your favorite editor](editor-plugins.md), [your favorite NPM package](libraries.md), and any of your [favorite](https://github.com/reasonml/reason-react) [existing](https://github.com/reasonml-community/bs-jest) [stack](https://webpack.js.org).

\* Don't believe us? Check our [JS -> Reason cheat sheet](syntax-cheatsheet.md) or try a few snippets of Reason in [the playground](/try.html) and observe the output at the right!

## Why OCaml As The Backing Language? Why Not [My Favorite Language]?

First of all, please understand that no matter which language we choose, we'd get this question from most of you! =)

Many backing languages would satisfy the previous section's points; the points below, however, have been deal-breakers in our considerations.

- **The ability to render to native code**. OCaml's native (assembly) startup time is in **single digit milliseconds**. We have big plans to use Reason on native one day; meanwhile, we're focusing on adoption through great JavaScript compatibility.
- **Side-effects, mutation & other escape hatches**. These aren't usually the shiny selling points of a language; but being able to bridge toward a part of a codebase without an elaborate interop/rewrite is crucial for us at Facebook. OCaml defaults to immutable and functional code, but having the escape hatches makes the initial adoption sometimes simply possible.
- **Implementation polish matters**. OCaml's been refined over two decades and gets better every year. If we propose a new syntax & toolchain, we'd like it not to have deal-breaking semantics & type "gotchas" and/or diminishing return, 80% onto the writing of a codebase.
- **The language for writing React**. Reason's [creator](https://twitter.com/jordwalke) also created [ReactJS](https://facebook.github.io/react/), whose first prototypes were written in SML, a distant cousin of OCaml. We've transcribed ReactML into ReactJS for wide adoption. A few years later, we're now iterating on the future of ReactJS through [ReasonReact](//reasonml.github.io/reason-react/).
- **Nice, growing community**. I mean, we're really nice. I'm Canadian. We have members all over the world. If everything fails, ask in the Discord channel and [at least a few of our members in your timezone will answer](https://twitter.com/ken_wheeler/status/894298052705615872).

## Don't Like Reason?

Make sure you talk to us in [Discord](https://discord.gg/reasonml) first, to clear any misunderstanding/misconception! But if you _still_ don't like Reason, here are some alternatives:

- [OCaml](http://ocaml.org). Reason's just a syntax and toolchain layer on top of OCaml. The OCaml<->Reason interop should be seamless since we share the same abstract syntax tree. BuckleScript works fine in OCaml, naturally. [Js_of_ocaml](http://ocsigen.org/js_of_ocaml/) too.
- [Rust](http://rust-lang.org). Close cousin of ours. Not garbage collected, focused on speed & safety.
- [Elm](http://elm-lang.org). Another cousin of ours! Make clean, fun webapps.
- [PureScript](http://www.purescript.org). Inspired by Haskell, compiles to the web.
- [Fable](http://fable.io/). Based on F#, which is closely related to OCaml.
- [ClojureScript](https://clojurescript.org). Nothing in common with us on the surface, but prioritizes simplicity & great interop too.
- [Swift](https://www.apple.com/swift/). Fruit-flavored OCaml!
- [Haxe](https://haxe.org). Compiles to basically anything.

Hope that helps! Want to know more? Strike a conversation with any of us in the [community](community.md)!

_Reason is an open source community project from Facebook_.
