---
title: If-Else
---

Reason `if`s are expressions; they're evaluated to their body's content:

```reason
let message = if (isMorning) {
  "Good morning!"
} else {
  "Hello!"
};
```

**Note:** an `if-else` expression without the final `else` branch implicitly gives `()`. So this:

```reason
if (showMenu) {
  displayMenu()
};
```

is basically the same as:

```reason
if (showMenu) {
  displayMenu()
} else {
  ()
};
```

Which is usually what you'd expect; `displayMenu()` should return unit too.

Here's another way to look at it. This is clearly wrong:

```reason
let result = if (showMenu) {
  1 + 2
};
```

It'll give a type error, saying basically that the implicit `else` branch has the type `unit` while the `if` branch has type `int`. Intuitively, this makes sense: what would `result`'s value be, if `showMenu` was `false`?

We also have ternary sugar.

```reason
let message = isMorning ? "Good morning!" : "Hello!";
```

## Usage

**`if-else` and ternary are much less used** in Reason than in other languages; [Pattern-matching](pattern-matching.md) kills a whole category of code that previously required conditionals. Prefer `if-else` if you only have, say, 2 branches.

## Design Decisions

Reason ternary is just a sugar for the `bool` variant and a switch:

```reason
switch (isMorning) {
| true => "Good morning!"
| false => "Hello!"
}
```

If you pass that through [`refmt`](extra-goodies.md#refmt), you'd get:

```reason
isMorning ? "Good morning!" : "Hello!";
```

Interested? Here's a [blog post](https://medium.com/@chenglou/cool-things-reason-formatter-does-9e1f79e25a82) about the spirit of our `refmt`.
