---
title: Frequently Asked Questions
---

### I'm not sure what to do with Reason

You can do all the things you'd usually do with OCaml! OCaml is an incredible useful language for systems programming, while still being able to compile to pretty type safe JS with the aid of the `js_of_ocaml` compiler.

Natively compiled CLI's are also known to be really fast (like... C-like fast), and since the language is garbage collected, you will find yourself in a very nice spot of not having to worry about borrow-checking like in Rust and you don't have to deal with verbose non-ML languages like Go. 

### What is BuckleScript and ReScript, and why is it mentioned in so many Reason related resources?

Reason originally shipped as the user-facing syntax for BuckleScript (ReScript), a compiler toolchain to compile OCaml to efficient JS code.

On [July 1st](https://rescript-lang.org/blog/bucklescript-8-1-new-syntax), the Reason and BuckleScript teams decided to split up due to different goals / roadmaps. BuckleScript was renamed to ReScript and shipped its own syntax (also called ReScript) to provide a more fine-tuned experience for their JS focused users (while dropping native compilation support). More infos on the BuckleScript -> ReScript rebrand can be found in the [official rebranding announcement](https://rescript-lang.org/blog/bucklescript-is-rebranding).

Reason continues its promise to be 100% compatible with OCaml semantics, therefore will change its focus on `js_of_ocaml` centered workflows for a streamlined cross-platform compilation story (native / js).

ReScript will continue to support Reason `v3.6` for backwards compatibility, but will not ship any other future Reason versions. The ReScript website also kept the [`< 8.2.0` docs](https://rescript-lang.org/docs/manual/v8.0.0/introduction) in Reason syntax to allow easy usage during the Reason -> ReScript migration.

If you are already using BuckleScript + Reason, we recommend to either upgrade your existing code to ReScript syntax, or alternatively, consider migrating to a `js_of_ocaml` based setup to keep 100% compatibility with the OCaml platform and runtime semantics.
