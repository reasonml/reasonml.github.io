---
title: Let Binding
order: 10
---

A "let binding", in other languages, might be called a "variable declaration/assignment". `let` gives names to values. They can be seen and referenced by code that comes after them.

```reason
let greeting = "hello!";
let score = 10;
let newScore = 10 + score;
...
```

### Block Scope

Bindings can be scoped through `{}`.

```reason
if (displayGreeting) {
  let message = "Enjoying the docs so far?";
  print_endline message;
};
/* `message` not accessible here! */
```

### Bindings Are Immutable

"Immutable" as in, "doesn't change". Once a binding refers to a value, it cannot refer to anything else (unless it
explicitly contains a mutable value, discussed later). However, you may create a new binding of the same name which *shadows* the previous binding; from that point onward, the binding will refer to the newly assigned value.

```reason
let message = "hello";
print_endline message; /* Prints "hello" */
let message = "bye";
print_endline message; /* Prints "bye" */
```

### Tips & Tricks

Since bindings are scoped through `{}`, you can create an anonymous scope around them:

```reason
let message = {
  let part1 = "hello";
  let part2 = "world";
  part1 ^ " " ^ part2
};
/* `part1` and `part2` not accessible here! */
```

This prevents misuse of the bindings after these lines.

### Design Decisions

Reason is backed by OCaml under the hood. A let binding, in OCaml syntax, looks like this:

```ocaml
let a = 1 in
let b = 2 in
a + b
```

This could be conceptually read in this format instead:

```ocaml
let a = 1 in
  let b = 2 in
    a + b
```

Which is the following in Reason:

```reason
let a = 1;
let b = 2;
a + b;
```

Which might remind you of:

```reason
/* Reason syntax */
fun a =>
  fun b =>
    a + b;
```

Though they're not strictly the same, hopefully you can see that `let` is just an expression and akin to a function! In Reason, we've turned `in` into `;` for visual familiarity; but don't let that hide the underlying elegance of expressions.
