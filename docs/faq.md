---
title: Frequently Asked Questions
---

### I'm not sure what to do with Reason

You can do all the things you'd usually do with OCaml! OCaml is an incredible useful language for systems programming, while still being able to compile to pretty type safe JS with the aid of the `js_of_ocaml` compiler.

Natively compiled CLI's are also known to be really fast (like... C-like fast), and since the language is garbage collected, you will find yourself in a very nice spot of not having to worry about borrow-checking like in Rust and you don't have to deal with verbose non-ML languages like Go. 

### What is BuckleScript and ReScript, and why is it mentioned in so many Reason related resources?

Reason used to be tightly coupled to "BuckleScript", which used to be a OCaml-to-JS compiler like JSOO, but with different tweaks to get different JS output.

On [July 1st](https://rescript-lang.org/blog/bucklescript-8-1-new-syntax), the Reason and BuckleScript leadership decided to part in different directions due to lack of common goals, and ReScript implemented its own syntax (also called ReScript) to cater a more fine-tuned experience to their JS developers. More infos on the BuckleScript -> ReScript rebranding can be found in the [official announcement](https://rescript-lang.org/blog/bucklescript-is-rebranding).

Reason continues its promise to be 100% compatible with OCaml semantics, therefore will change its focus on `js_of_ocaml` centered workflows for a streamlined JS compilation story.

ReScript will continue to support Reason `v3.6` for backwards compatibility, but will not ship any other future Reason versions.

If you are already using BuckleScript + Reason, we recommend to either upgrade to the ReScript syntax, or alternatively, consider migrating your codebase to `js_of_ocaml` to keep 100% compatibility with the OCaml platform and runtime semantics. 

ReScript kept the [`< 8.2.0` docs](https://rescript-lang.org/docs/manual/v8.0.0/introduction) in Reason syntax to allow easy reading during the Reason -> ReScript transition.
