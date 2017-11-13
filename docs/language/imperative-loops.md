---
title: Imperative Loops
order: 150
---

### For Loops

For loops iterate from a starting value up to (and including) the ending value.

```reason
for (myBinding in startValue to endValue) {
  /* use myBinding here */
};
```

The parenthesis around `startValue` and `endValue` may be omitted if they are
unnecessary.

```reason
let xStart = 1;
let xEnd = 3;

/* prints: 1 2 3 */
for (x in xStart to xEnd) {
  print_int(x);
  print_string(" ")
};
```

You can make the `for` loop count in the opposite direction by using `downto`.

```reason
for (myBinding in startValue downto endValue) {
  statements
};
```

```reason
let xStart = 3;
let xEnd = 1;

/* prints: 3 2 1 */
for (x in xStart downto xEnd) {
  print_int(x);
  print_string(" ")
};
```

### While Loops

While loops execute a code block while some condition is true. The form of a `while` loop includes a single expression, the condition to test.

```reason
while (testCondition) {
  statements
};
```

### Tips & Tricks

There's no loop-breaking `break` keyword (nor early `return` from functions, for that matter) in Reason. In general, prefer `map`/`filter`/`reduce` over imperative loops. However, we can break out of a while loop easily through using a [mutable binding](/guide/language/mutation).

```reason
Random.self_init();

let break = ref(false);

while (! break^) {
  if (Random.int(10) === 3) {
    break := true
  } else {
    print_endline("hello")
  }
};
```
