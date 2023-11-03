---
title: Melange
---

ne of the best ways to use Reason is by compiling it to JavaScript and running it in a web browser or on any other environment with a JavaScript runtime, such as [Node.js](https://nodejs.org), [Deno](https://deno.com), [Cloudflare Workers](https://workers.cloudflare.com).

Reason source code can be compiled to JavaScript through our partner project, [Melange](https://melange.re).

## What's Melange?

[Melange](https://melange.re) is a backend for the OCaml compiler that emits readable, modular and highly performant JavaScript code.

> Melange strives to provide the best integration with both the OCaml and JavaScript ecosystems

If you have experience with JavaScript and the ecosystem we recommend Melange, over other alternatives such as Js_of_ocaml.

## Getting started

The install guide on the Melange website shares a lot of common steps with [our installation](installation.md), check it out: [melange.re/v2.0.0/getting-started](https://melange.re/v2.0.0/getting-started).

Since [Melange v1](https://buttondown.email/anmonteiro/archive/melange-hits-v10/), Melange integrates with dune. This means that you can use dune to compile your Reason code to JavaScript and also to bytecode or native.

## Template

To get started with Reason and Melange, there's an official template:

```bash
git clone https://github.com/melange-re/melange-opam-template
cd melange-opam-template

# Create opam switch and install dependencies
make init

# In separate terminals:

make watch # Watch for reason file changes and recompile
make serve # Run the development server
```

## Manual

If you prefer to do all the steps manually, here is a step by step. Assuming you have an opam switch with OCaml 5.1.0. If not, check the [installation](installation.md#setup-a-new-environment-manually) guide.

#### Install melange

```bash
opam install melange
```

#### Create dune-project

If you don't have a `dune-project` file, create one with the following content:

```lisp
; dune-project
(dune lang 3.8)
(use melange 0.1) ; Here we enable melange to work with dune
```

#### Emit JavaScript

In your `dune` file, add a `melange.emit` stanza to emit JavaScript.

The `melange.emit` stanza tells dune to generate JavaScript files from a set of libraries and modules. In-depth documentation about this stanza can be found in the [build-system on the Melange documentation](https://melange.re/v2.0.0/build-system/#entry-points-with-melangeemit).

```lisp
; dune
(melange.emit
 (target app))
```

#### Libraries

`dune` allows to define libraries by creating a `dune` file inside a folder and adding a [`library` stanza](https://dune.readthedocs.io/en/stable/concepts/package-spec.html#libraries).

To compile a library with melange, add the `(modes melange)` stanza to the library `dune` file.

```diff
(library
  (name ui_library)
+ (modes melange)
)
```

Once you have a melange library, you can add it to the `melange.emit` stanza:
```lisp
; dune
(melange.emit
 (target app)
 (libraries ui_library))
```

#### Compile

Each time you compile the project, dune will emit JavaScript files under `_build/default/app/` (`app` comes from the `(target app)` defined under `melange.emit`).

To compile the project, run:

```bash
dune build # Compile the entire project
# or compile the melange alias (only melange.emit stanzas)
dune build @melange
```
