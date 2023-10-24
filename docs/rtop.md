---
title: rtop
---

`rtop` is a REPL (Read, Evaluate, Print, and Loop) to interact with Reason.

Comes from the [`rtop`](https://opam.ocaml.org/packages/rtop) package in opam https://opam.ocaml.org/packages/rtop/.

Inspired by [utop](https://github.com/ocaml-community/utop)

## Installation

```sh
opam install rtop
```

## Usage

```sh
rtop
─────────────┬─────────────────────────────────────────────────────────────┬──────────────
             │ Welcome to utop version 2.13.1 (using OCaml version 5.0.0)! │
             └─────────────────────────────────────────────────────────────┘

                   ___  _______   ________  _  __
                  / _ \/ __/ _ | / __/ __ \/ |/ /
                 / , _/ _// __ |_\ \/ /_/ /    /
                /_/|_/___/_/ |_/___/\____/_/|_/

  Execute statements/let bindings. Hit <enter> after the semicolon. Ctrl-d to quit.

        >   let myVar = "Hello Reason!";
        >   let myList: list(string) = ["first", "second"];
        >   #use "./src/myFile.re"; /* loads the file into here */

Type #utop_help for help about using utop.

Reason #
┌──────────────┬──────────────┬───────────────┬─────┬────┬───┬──────────┬─────┬──────────┐
│Afl_instrument│Alias_analysis│Allocated_const│Annot│Arch│Arg│Arg_helper│Array│ArrayLabel│
└──────────────┴──────────────┴───────────────┴─────┴────┴───┴──────────┴─────┴──────────┘
```
