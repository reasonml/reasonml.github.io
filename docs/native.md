---
title: Native
---

[Bsb-native](https://github.com/bsansouci/bsb-native) is a fork of BuckleScript's bsb that compiles to native OCaml instead.

[Esy](https://esy.sh) is a project package manager for native Reason.
- Esy can install packages from [opam](https://opam.ocaml.org/packages/).
- Esy lets you install esy packages from npm and publish `esy` packages to npm..

> **Note**: Esy works on all three platforms (OSX, Linux, Windows) but Windows support is still
> considered "beta".

There is not much support for combining these two workflows. `esy` begins with a "native-first" workflow, and `bsb-native` begins with a "bucklescript first" workflow - the main difference being that `esy` has tighter integration with the existing native ecosystem, and `bsb-native` has tighter integration with the bucklescript ecosystem.
