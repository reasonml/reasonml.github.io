---
title: Integer & Float
---

Unlike JavaScript, which only has a number type, Reason has a proper integer type and a floating point number type. This clear separation helps code to e.g. not accidentally return a number when an integer is expected.

## Integers

Reason integers are 32-bits, **truncated when necessary**. They usually compile to JavaScript numbers, but you should **not** rely on that. For example, if you're receiving a JavaScript date number, you should type it in Reason as a **float**, since using integers would cause date truncation.

(More on types and JavaScript interop in a later section.)

### Usage

Reason provides the usual operations on integers: `+`, `-`, `*`, `/`, etc.

We provide [a few helpers in the standard library](https://bucklescript.github.io/bucklescript/api/Js.Int.html) to work with ints.

## Floats

Floats compile into regular JavaScript numbers. If you receive a JavaScript number, you can use them directly in Reason as floats.

### Usage

Float requires other operators: `+.`, `-.`, `*.`, `/.`, etc. Like `0.5 +. 0.6`.

We provide [a few helpers in the standard library](https://bucklescript.github.io/bucklescript/api/Js.Float.html) to work with floats.

### Tips & Tricks

`let a = 5` declares an integer. To declare a floating point 5, use `let a = 5.0`

### Design Decisions

"Why the heck can't I just use `+` for both int and float?"

This is due to some unfortunate constraints in the language's type system. They can be worked out in the future.
