---
title: Format (refmt)
---

`refmt` stands by Reason Formatter and it formats Reason programs, is a parser and pretty-printer for Reason.

`refmt` can easily convert Reason code to OCaml code and vice versa, since Reason and OCaml are compatible on the AST-level.

Comes inside the [`reason`](https://opam.ocaml.org/packages/reason) package from the [opam repository](https://opam.ocaml.org/packages/reason/).

## Installation

```bash
opam install reason
```

## Usage

It comes integrated automatically in `dune`, so you don't need to do anything to use it, but you can use it directly from the command line via `refmt` directly or via dune.

```bash
dune build @fmt
# or
refmt
```

## Help

```bash
REFMT(1)                         Refmt Manual                         REFMT(1)

NAME
       refmt - Reason´s Parser & Pretty-printer

SYNOPSIS
       refmt [OPTION]... [FILENAMES]...

DESCRIPTION
       refmt lets you format Reason files, parse them, and convert them
       between OCaml syntax and Reason syntax.

ARGUMENTS
       FILENAMES
           input files; if empty, assume stdin

OPTIONS
       -e, --assume-explicit-arity
           if a constructor´s argument is a tuple, always interpret it as
           multiple arguments

       -h VAL, --heuristics-file=VAL
           load path as a heuristics file to specify which constructors carry
           a tuple rather than multiple arguments. Mostly used in removing
           [@implicit_arity] introduced from OCaml conversion. example.txt:
           Constructor1 Constructor2

       --help[=FMT] (default=pager)
           Show this help in format FMT (pager, plain or groff).

       -i VAL, --interface=VAL (absent=false)
           parse AST as an interface

       --in-place
           reformat a file in-place

       -p FORM, --print=FORM (absent=re)
           print AST in FORM, which is one of: (ml | re (default) | binary
           (for compiler input) | binary_reason (for interchange between
           Reason versions) | ast (print human readable AST directly) | none)

       --parse=FORM
           parse AST in FORM, which is one of: (ml | re | binary (for compiler
           input) | binary_reason (for interchange between Reason versions))

       -r, --recoverable
           enable recoverable parser

       --version
           Show version information.

       -w COLS, --print-width=COLS (absent=80 or REFMT_PRINT_WIDTH env)
           wrapping width for printing the AST

ENVIRONMENT VARIABLES
       REFMT_PRINT_WIDTH
           wrapping width for printing the AST

Refmt Reason 3.10.0 @ 747c8c3                                         REFMT(1)
```
