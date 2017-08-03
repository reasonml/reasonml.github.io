---
title: Boolean
order: 30
---

A boolean has the type `bool` and can be either `true` or `false`. Common operations:

- `&&`: logical and
- `||`: logical or
- `not`: logical not. **Note that ! is reserved for something else**
- `<=`, `>=`, `<`, `>`
- `==`: physical equal, compares data structures deeply: `(1, 2) == (1, 2)` is `true`. Convenient, but use with caution
- `===`: referential equal, compares shallowly. `(1, 2) === (1, 2)` is `false`. `let myTuple = (1, 2); myTuple === myTuple` is `true`.
- `!=`: physical unequal
- `!==`: referential unequal

### Usage

**Note: BuckleScript provides bindings to the JavaScript** `true` and `false`, which [aren't the same as the Reason/OCaml `true` and `false`](http://bucklescript.github.io/bucklescript/Manual.html#_boolean)! Don't use them interchangeably without proper conversion (`Js.to_bool` and `Js.Boolean.to_js_boolean`).

### Tips & Tricks

**Use physical equal tastefully**. It's convenient, but might accidentally make you compare two deeply nested data structures and incur a big performance hit. It's also not always clear what counts as "equal". For example, is a piece of data `foo` equal to a lazy `foo`? Ideally, it'd have been pluggable. Future changes are coming to make this possible and reliable; if you're interested, check [modular implicit](https://www.reddit.com/r/ocaml/comments/2vyk10/modular_implicits/).

### Design Decisions

_This section assumes knowledge with [variants](/guide/language/variant). If it's your first time reading this guide, feel free to come back to this later_!

Boolean is (only conceptually) a special case of a variant: `type bool = True | False`. Design-wise, this elegantly removes the need to hard-code a boolean type in the type system. The drawback is that, just like variants, the constructors are [compiled into a less readable but faster representation](https://bucklescript.github.io/bucklescript/js-demo/?gist=fa7c72e81d7ac31977da1500ee4fa6d4). This is why BuckleScript lacks information, at a later stages, to compile Reason true/false into JavaScript's true/false.
