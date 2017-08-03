---
title: Integer & Float
order: 40
---

### Integers

32-bits, truncated when necessary. Reason provides the usual operations on them: `+`, `-`, `*`, `/`, etc.

#### Usage

See the [Int32 module](/api/Int32.html) in the standard library. For JS compilation, see [Js.Int](https://bucklescript.github.io/bucklescript/api/Js.Int.html).

#### Tips & Tricks

**Careful when you bind to JavaScript numbers**! Long ones might be truncated. Bind JS number as float instead.

### Floats

Float requires other operators: `+.`, `-.`, `*.`, `/.`, etc. Like `0.5 +. 0.6`.

#### Usage

There's no Float module in the current standard library. For JS compilation, see [Js.Float](https://bucklescript.github.io/bucklescript/api/Js.Float.html).

#### Design Decisions

"Why the heck can't I just use an overloaded `+` for both int and float? Why is it that each time I find a performant language with great types and interop and community, I find these kind of flaws?"

There there. Polymorphic operators, under the current type system, would need to be hard-coded into the compiler. The physical polymorphic equal, `==` is such operator, `+` and the rest aren't. [Improvements are under way](https://www.reddit.com/r/ocaml/comments/2vyk10/modular_implicits/) to make them work as desired. In the meantime, let's keep shipping =).

Additionally, floats are rather special in Reason/OCaml native. [Check here](http://www.lexifi.com/blog/unboxed-floats-ocaml) if you're interested in learning some rather interesting optimizations!
