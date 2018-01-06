---
title: Native
---

We currently use the default OCaml workflow to compile to native, although [there's work underway](https://github.com/bsansouci/bsb-native) to bring native compilation support to the BuckleScript builder.

> **Note**: some parts of the native workflow likely don't work on Windows. The native workflow is currently **work in progress**, as we're currently focusing on polishing the JS workflow. Contribution welcome!

Reason integrates well into existing toolchains such as `ocamlbuild`, and ships
with a binary called `rebuild`, a thin wrapper around [`ocamlbuild`](http://ocaml.org/learn/tutorials/ocamlbuild/)
that ensures the right flags to be passed to the compiler for any files ending
in `.re`.

For native compilation, we use [OPAM](https://opam.ocaml.org).
