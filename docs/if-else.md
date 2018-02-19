---
title: If-Else
---

```reason
if (showMenu) {
  displayMenu()
};
```

Reason `if`s are expressions; they're evaluated to their body's content:

```reason
let message = if (isMorning) {
  "Good morning!"
} else {
  "Hello!"
};
```

**NOTE:** if you care about the returned expression (like above), you need to provide expressions _of the same type_ for both the `if` and `else` branches. If you forget the `else` branch, you'll get a type error, like [this one](https://github.com/reasonml-community/error-message-improvement/issues/30).

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
