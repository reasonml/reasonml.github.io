---
title: Compiling to JavaScript with Js_of_ocaml
---

<!-- Rewrite this because jsoo and node? deno? workers? not entirely sure if it applies -->
<!-- There should be a more humble intro -->
After the installation page, we have a CLI application written in Reason, running a native executable, but one of the best usages of Reason is to compile it to JavaScript an run it in the browser or any JavaScript platform such as Node, Deno Cloudflare Workers,

To do so, we need to introduce [Js_of_ocaml](https://ocsigen.org/js_of_ocaml/3.7.0/manual/overview)

<!-- Write a small intro for jsoo -->
<!-- ## Js_of_ocaml -->

## Template

To get started check out this [`hello-jsoo-esy`](https://github.com/jchavarri/hello-jsoo-esy) template:

```
git clone https://github.com/jchavarri/hello-jsoo-esy.git
cd hello-jsoo-esy
esy

npm install
npm run webpack
```
