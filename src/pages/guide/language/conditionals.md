---
title: Conditionals
order: 110
---

```reason
if (showMenu) {
  displayMenu ();
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

We also have ternary sugar.

```reason
let message = isMorning ? "Good morning!" : "Hello!";
```
