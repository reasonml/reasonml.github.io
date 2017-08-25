---
title: Условные выражения
order: 4
---

```reason
if (showMenu) {
  displayMenu ();
};
```

`if` в Reason является выражением. Его значение равно вычисленному значению блока:

```reason
let message = if (isMorning) {
  "Good morning!"
} else {
  "Hello!"
};
```

Можно использовать тернарный оператор:

```reason
let message = isMorning ? "Good morning!" : "Hello!";
```
