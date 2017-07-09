---
title: Let Bindings
order: 2
---

`let` bindings give names to values. They can be seen and referenced by code that comes after them.

```reason
let greeting = "hello!";
let score = 10;
let newScore = 10 + score;
...
```

#### Block Scope

Bindings can be scoped through `{}`.

```reason
let message = {
  let part1 = "hello";
  let part2 = "world";
  part1 ^ " " ^ part2
};
/* `part1` and `part2` not accessible here! */
```

#### Bindings Are Immutable

Once a binding refers to a value, it cannot refer to anything else (unless it
explicitly contains a mutable value, discussed later). However, you may create a
new binding of the same name which *shadows* the previous binding; from that
point onward, the binding will refer to the newly assigned value.

```reason
let message = "hello";
print_endline message; /* Prints "hello" */
let message = "bye";
print_endline message; /* Prints "bye" */
```
