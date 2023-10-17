---
title: Compiling to JavaScript with Melange
---

After the installation page, we have a CLI application written in Reason, running a native executable, but one of the best usages of Reason is to compile it to JavaScript an run it in the browser or any JavaScript platform such as Node, Deno Cloudflare Workers,

To do so, we need to introduce [Melange](https://melange.re).

## Melange

[Melange](https://melange.re) is a backend for the OCaml compiler that emits readable, modular and highly performant JavaScript code. It's not the only option, there are other alternatives such as [Js_of_ocaml](compiling-to-js-with-jsoo.md).

If you have experience with JavaScript and it's ecosystem we recommend Melange.

<!-- Turn it into a quote -->
From their docs
> Melange strives to provide the best integration with both the OCaml and JavaScript ecosystems. To learn all about melange go to their documentation.

## Template
<!-- To get started with Reason and Melange, there's an official template

```
git clone https://github.com/melange-re/melange-esy-template
cd melange-esy-template
esy

npm install
npm run webpack
```
-->

## Manual

If you prefer to do all the steps manually, here is a step by step.

#### Install melange
```sh
esy add @opam/melange
```

#### Create dune-project
```clojure
; dune-project
(dune lang 3.8)
(use melange 0.1)
```

#### Emit JavaScript
- Create a dune file
- Add melange.emit stanza
```clojure
; dune
(melange.emit
  (target ???)
  ()
)
```
<!-- Link to all options in Melange -->
