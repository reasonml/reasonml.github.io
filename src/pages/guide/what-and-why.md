---
title: What & Why
order: 0
---

### What Is Reason?

Reason is not a new language; it's a new syntax and toolchain powered by the battle-tested language, [OCaml](https://ocaml.org). Reason gives OCaml a familiar syntax geared toward JavaScript programmers, and caters to the existing NPM/Yarn workflow folks already know.

In that regard, Reason can almost be considered as a solidly statically typed, faster and simpler "JavaScript", with the historical crufts removed, and with the features of ES2030 you can use today!

Reason compiles to JavaScript thanks to our partner project, [BuckleScript](https://bucklescript.github.io/bucklescript/Manual.html), which compiles OCaml to readable JavaScript with smooth interop. Reason also compiles to fast, barebone assembly, thanks to OCaml itself.

### Why Reason?

> "Why bother learning a **entire** new language?"

This isn't what Reason's about. The realization is that 80% of OCaml's semantics (aka how it runs) straightforwardly maps over to modern JavaScript and vice-versa\*; if one has the luxury of leaving out a few corners of JavaScript and add a few nice things, one can actually achieve something that compiles to pretty readable JS and directly use 80% of its ecosystem & tooling. That is, on top of being able to compile to barebone assembly, iOS, Android and even [microcontrollers](http://www.algo-prog.info/ocapic/web/index.php?id=ocapic)!

In reality, for common usages, the learning curve of JS + a gradual type system isn't much lower than that of Reason. Type-wise, we aggressively say no to dangerous patterns, and yes to a few new ones. As a result, we obtain OCaml/Reason, though again, not through explicit curation of semantics, but through simply realizing that such a language already exists and is ready to be used.

OCaml's highlights are:

- An extremely solid type system
- An eye for simplicity & pragmatism
- A focus on performance

tooling great

\* Don't believe us? Check our [JS -> Reason cheat sheet](/guide/javascript/syntax-cheatsheet) or try a few snippets of Reason in [the playground](/try/) and observe the output at the right!
