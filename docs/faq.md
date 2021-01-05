---
title: Frequently Asked Questions
---

### I'm not sure what to do with Reason

You can do all the things you'd usually do with OCaml! OCaml is an incredible useful language for systems programming, while still being able to compile to pretty type safe JS with the aid of the `js_of_ocaml` compiler.

Natively compiled CLI's are also known to be really fast (like... C-like fast), and since the language is garbage collected, you will find yourself in a very nice spot of not having to worry about borrow-checking like in Rust and you don't have to deal with verbose non-ML languages like Go. 

Reason also gives access to the declarative UI framework [revery-ui](https://github.com/revery-ui/revery) to build native applications with a ReactJS like paradigm (+ JSX).

### What is BuckleScript and ReScript, and why is it mentioned in so many Reason related resources?

Reason was originally bundled with BuckleScript (JS compiler) to provide a single toolchain for JS / ReactJS development.

In July 2020, BuckleScript released its own syntax and rebranded to ReScript to be its own language. More infos can be found in their [official rebranding announcement](https://rescript-lang.org/blog/bucklescript-is-rebranding).
