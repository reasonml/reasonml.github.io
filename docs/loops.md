---
title: Loops
---

_Quick overview: [Loops](overview.md#loops)_

Loops are discouraged in most cases. Instead functional programming patterns
like `map`, `filter`, or `reduce` can usually be used in their place.

## For Loops

For loops use the `for`, `in`, and `to` keywords. The increment cannot be
changed. Use while loops for more control over the increment.

```reason
let x = 1;
let y = 5;

for (i in x to y) {
  print_int(i);
  print_string(" ");
};
/* Prints: 1 2 3 4 5 */
```

The reverse direction is also possible using the `downto` keyword:

```reason
for (i in y downto x) {
  print_int(i);
  print_string(" ");
};
/* Prints: 5 4 3 2 1 */
```

## While Loops

While loops allw executing code until a certain condition is met. It is not
restricted to counting between two integers like for loops.

It is common to use [`ref`s](mutable-bindings.md) with while loops.

```reason
let i = ref(1);

while (i^ <= 5) {
  print_int(i^);
  print_string(" ");
  i := i^ + 2;
};
/* Prints: 1 3 5 */
```

### Break

There is no `break` or early return behavior in Reason. In order to achieve
something similar create a boolean `ref`:

```reason
let break = ref(false);

while (!break^ && condition) {
  if (shouldBreak()) {
    break := true;
  } else {
    /* normal code */
  };
};
```
