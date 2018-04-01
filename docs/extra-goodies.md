---
title: Extra Goodies
---

## Browser Extension: Reason-tools

[Reason-tools](https://github.com/reasonml/reason-tools) lets you quickly toggle between OCaml syntax and Reason syntax when you're browsing tutorials and documentations written in either syntax.

## BuckleScript

You'll be seeing [BuckleScript](https://bucklescript.github.io) extensively throughout the rest of this documentation, since it's the engine that powers our JS compilation. Its global binaries are installed through `npm install -g bs-platform`.

## Other Utilities

The global installation you've done in the [past section](global-installation.md) comes with a few extra useful tools, described here.

### Refmt

`refmt` ("Reason format") is the binary that powers our editors' auto-formatting feature. It takes in your code and spits it out, nicely formatted. It also serves to convert to/from Reason/OCaml syntax. The Reason community uses it to achieve a consistent code style throughout different projects, and to avoid time-consuming manual formatting & stylistic debates.

It **responsively** formats the code based on the editor width. In other words, it doesn't just naively break to the next line at a certain characters limit; it solves the layout constraints and arranges your code accordingly.

`refmt` can be used directly in the terminal. For example, to format your code outside of the editor, do `refmt --in-place myFile.re`. **See `refmt --help` for all the options**.

### Merlin

[Merlin](https://github.com/ocaml/merlin) is the underlying engine powering type hint, refactor, real-time errors, jump to definitions, etc. to our editors. Its command line name is called `ocamlmerlin`, though you wouldn't call it manually (editors start it themselves and query it).

To configure Merlin to understand your project, you'd write a `.merlin` file at the root (documentation [here](https://github.com/ocaml/merlin/wiki/project-configuration)). **For the JS workflow, this configuration is generated for you automatically by BuckleScript's `bsb`.**

### REPL

Reason comes with a REPL called `rtop` which, once invoked, lets you interactively evaluate code. It features intelligent, type-driven autocompletion.

Use `#quit;` to close your REPL session.

**Note that `rtop` currently doesn't work easily with packages and `external`s**. We recommend evaluating code inside our [Try](/try.html) playground.

### re:bench

[re:bench](https://rebench.github.io) is an online benchmarking playground. It supports test cases written in Reason, OCaml and JavaScript, and allows sharing of benchmarks through unique URLs. It's compiled to JS using BuckleScript.

### Redex

[Redex](https://redex.github.io): the Reason packages registry.

### ocamlc, ocamlopt, ocamlrun, rebuild

`ocamlc` and `ocamlopt` are the bare ocaml compilers.
