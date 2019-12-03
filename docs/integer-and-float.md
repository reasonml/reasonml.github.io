---
title: Integer & Float
---

## Integers

32-bits, truncated when necessary. Reason provides the usual operations on them: `+`, `-`, `*`, `/`, etc.

### Usage

See the [Int32 module](/api/Int32.html) in the standard library. For JS compilation, see [Js.Int](https://bucklescript.github.io/bucklescript/api/Js.Int.html).

### Tips & Tricks

**Careful when you bind to JavaScript numbers**! Long ones might be truncated. Bind JS number as float instead.

## Floats

Float requires other operators: `+.`, `-.`, `*.`, `/.`, etc. Like `0.5 +. 0.6`.

### Usage

There's no Float module in the current standard library. For JS compilation, see [Js.Float](https://bucklescript.github.io/bucklescript/api/Js.Float.html).

### Design Decisions

"Why the heck can't I just use an overloaded `+` for both int and float?"

There's a lot of history to this, but one day we'll be able to. Let's hang in there =)

Additionally, floats are rather special in Reason/OCaml native. [Check here](https://www.lexifi.com/ocaml/unboxed-floats-ocaml/) if you're interested in learning some rather interesting optimizations!
