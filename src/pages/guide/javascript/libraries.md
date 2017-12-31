---
title: Libraries
order: 2
---

The main source of libraries and bindings is the [Reason Package Index (redex)](https://redex.github.io/), which keeps a curated list of available packages, and is both searchable and browsable. It also has a section for unpublished packages, which usually means they're unfinished or experimental but might still serve your need.

Packages that have not been picked up by redex yet might be found by searching NPM or GitHub. Libraries that have already been wrapped with BuckleScript bindings are customarily prefixed with `bs-`, e.g. `bs-director`. [Here's a search](https://www.npmjs.com/search?q=keywords:bucklescript) for all of the BS related libraries on NPM.

If you can't find what you're looking for: sometimes you don't need a binding to use a JS library. Most JS data types, such as array and objects, [map over cleanly to Reason and vice-versa](https://bucklescript.github.io/docs/en/common-data-types.html#cheat-sheet). You also have access to the familiar [JS API](https://bucklescript.github.io/bucklescript/api/Js.html). Be sure to also check the "Interop" and "Converting from JS" sections here!
