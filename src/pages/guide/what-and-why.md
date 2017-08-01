---
title: What & Why
order: 0
---

### What Is Reason?

Reason is not a new language; it's a new syntax and toolchain powered by the battle-tested language, [OCaml](https://ocaml.org). Reason gives OCaml a familiar syntax geared toward JavaScript programmers, and caters to the existing NPM/Yarn workflow folks already know.

In that regard, Reason can almost be considered as a solidly statically typed, faster and simpler cousin of JavaScript, minus the historical crufts, plus the features of ES2030 you can use today, and with access to both the JS and the OCaml ecosystem!

Reason compiles to JavaScript thanks to our partner project, [BuckleScript](https://bucklescript.github.io/bucklescript/Manual.html), which compiles OCaml/Reason into readable JavaScript with smooth interop. Reason also compiles to fast, barebone assembly, thanks to OCaml itself.

### Why Reason?

> "Why bother learning an **entire** new language?"

This isn't what Reason's about.

The realization is that 80% of OCaml's semantics (aka how it runs) already straightforwardly maps over to modern JavaScript and vice-versa\*; if one has the luxury of leaving out a few corners of JavaScript and add a few nice things, one can actually achieve something that compiles to pretty readable JS and directly use 80% of its ecosystem & tooling. That is, on top of being able to compile to barebone assembly, iOS, Android and even [microcontrollers](http://www.algo-prog.info/ocapic/web/index.php?id=ocapic)!

However, it's unclear which features of JS to reshape, in order to fit it into the mold of a language with fast semantics and 100% sound typing. But we can _work backward_, from an already sound language with performance and simplicity taken into account, and give it a few tweaks so that it looks and acts a bit more like the better part of the familiar web language we've come to know.

All these decisions made it so that, for common use-cases, the learning curve of Reason isn't really higher than learning JS + a gradual type system; in return, you get:

- **A rock solid type system**. OCaml types have 100% coverage (every line of code), inference (types can be deduced and aren't required to be written manually), and soundness (once it compiles, the types are guaranteed to be accurate).
- **An eye for simplicity & pragmatism**. We allow opt-in side-effect, mutation and object for familiary & interop, while keeping the rest of the language pure, immutable and functional.
- **A focus on performance**. Reason's build system, [`bsb`](http://bucklescript.github.io/bucklescript/Manual.html#_bucklescript_build_system_code_bsb_code), finishes building in less than 100ms (incremental).
- **Great ecosystem & tooling**. Use [your favorite editor](/guide/editor-tools/editors-plugins), [your favorite NPM package](/guide/javascript/libraries), and any of your [favorite](https://github.com/reasonml/reason-react) [existing](https://github.com/reasonml-community/bs-jest) [stack](https://webpack.js.org).

\* Don't believe us? Check our [JS -> Reason cheat sheet](/guide/javascript/syntax-cheatsheet) or try a few snippets of Reason in [the playground](/try/) and observe the output at the right!

_Reason is a open source community project from Facebook_.

