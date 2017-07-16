---
title: Principes de base du langage
order: 1
---

# What Is Reason

Reason is an umbrella project that provides a curated layer for [OCaml](http://ocaml.org). It offers:

- A new, familiar syntax for the battle-tested language that is OCaml.
- A workflow for compiling to JavaScript and native code.
- A set of friendly documentations, libraries and utilities.

# Why Reason

#### Worry-free

Reason leverages OCaml's language design and type system to give immediate feedback in the form of compile-time errors and avoided anti-patterns.

#### Low Overhead

Reason keeps things simple and lean. Thanks to this, integrating Reason into your existing JavaScript/OCaml project is [hassle-free](./gettingStarted.html#javascript-workflow). Do more with less; reduce your future burden!

#### Performant & predictable

Let the compiler and the type system nudge you toward writing code that's fast and easy to think about.

How Reason Works
=========================

The OCaml compiler is organized into several stages, which are exposed as
libraries. `Reason` replaces part of the compiler toolchain with a completely
new syntax parser that is more approachable, while still fully compatible with
the rest of the compiler.  `Reason` also implements a new source printer which
integrates into your IDE and the new custom [`REPL`](./tools.html#repl).

###### Why OCaml?

OCaml is a great tool for writing highly expressive, functional
*or* imperative code, with type inference and fast runtime performance.
Because of these properties, OCaml has helped
Facebook quickly build scalable infrastructure such as
[Hack](http://hacklang.org/), [Flow](http://flowtype.org/), and
[Infer](http://fbinfer.com/). It is also used for other performance sensitive
applications in the financial industry (Jane Street, Bloomberg). At the same
time, OCaml has a very mature (*and still growing*) ecosystem for targeting
browser and `JavaScript` environments with a focus on language interoperability
and integration with existing `JavaScript` code.


`Reason`'s non-invasive approach to the `OCaml` compiler allows `Reason` code
to take advantage of all of the existing `OCaml` compiler
optimizations/backends such as bare metal `ARM`, `x86`, and even `JavaScript`
compilation.
