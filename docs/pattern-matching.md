---
title: Pattern Matching
---

_Quick overview: [Pattern matching](overview.md#pattern-matching)_

Pattern matching provides a way to execute code when the shape of some data matches a particular pattern. It's similar to switch-case statements in other languages, but it can be more expressive and includes some extra safeguards.

## Defining a pattern match statement

Use the `switch` keyword to make a pattern matching statement:

```reason
switch (input) {
| pattern1 => code1
| pattern2 => code2
| pattern3 => code3
};
```

The switch finds the first pattern that matches the input, and then executes the code that the pattern points to (the code after the `=>`). Code for a pattern can be a single expression, or a block of statements.

```reason
let y =
  switch (x) {
  | 0 => "zero"
  | 1 =>
    f();
    "one";
  | _ => "another number"
  };
```

If `x` were `1`, then the second pattern is matched, causing `f(); "one";` to be executed, which causes `y` to be set to `"one"`. Note that each code block in the switch must evaluate to the same type (`string` in this example).

## Patterns

### Primitives 

The simplest patterns are primitive values, which are checked for equality.

```reason
switch (x) {
| true => f("t")
| false => g("f")
};

switch (x) {
| "a" => 4.0
| "tree" => 1.23
| _ => 77.5
};
```

### Variables 

Variables can be created from patterns. In the last few examples, the `_` variable acted as a catch-all, matching all remaining values. You could instead create a variable without a leading underscore to use it later in the block.

```reason
switch (f()) {
| 0 => "zero"
| 1 => "one"
| k => "another number " ++ string_of_int(k)
};
```

Note that if a variable with the same name already exists in the scope of the switch, then it is not used in the pattern, and is instead shadowed by the pattern's variable. Variables in patterns are declarations of new variables, not references to existing ones.

```reason
let k = 60;
let y =
  switch (3) {
  | 0 => "zero"
  | 1 => "one"
  | k => "another number " ++ string_of_int(k)
  };
/* y is "another number 3", k is still 60 */
```

### Variants

Patterns can also include variants and data held by variant tags.

```reason
type t =
  | A
  | B(int);
let x = B(42);
let y =
  switch (x) {
  | A => "a"
  | B(0) => "b_zero"
  | B(k) => "b_" ++ string_of_int(k)
  };
/* y is now "b_42" */
```

This can be useful when working with the option variant.

```reason
let x: option(int) = Some(3);
let value =
  switch (x) {
  | None => 0
  | Some(v) => v
  };
```

### More data structures

Patterns can include other data structures, like tuples, records, lists, arrays, and any nested combination of those structures.

```reason
type point = {
  x: int,
  y: int,
};
type t =
  | A((string, int))
  | B(r)
  | C(array(int))
  | D(list(r));

let x = D([{x: 2, y: 1.2}]);
switch (x) {
| A(("hi", num)) => num
| B({x, y: 1.2}) => x
| C([|x|]) => x
| C([|2, 3, x|]) => x
| D([]) => 2
| D([{x: x1, _}, {x: x2, _}, ..._]) => x1 + x2
| _ => 42
};
```

### Extracting parts of patterns

`as` can be used to assign part of a pattern to a variable. This is convenient if you need to match on a certain value, but need to reference something that encompasses that value.

```reason
switch (x) {
| A(("hi", num)) as v => f(v)
| B({x: _, y: 1.2} as r) => g(r)
| D([{x: _, y: 1.2} as r, ..._]) => g(r)
| _ => 42
};
```

### Matching multiple inputs

Passing multiple input to the switch statement is identical to passing in a tuple.

```reason
switch (k1, k2) {
| (1, "a") => 0
| (_, "b") => 1
| _ => 3
};
```

### Combining patterns

A single block of code can be run for multiple patterns by listing them together. The `|` character can also be used inside patterns to list multiple possibilities.

```reason
let li: list(int) = [1, 2, 3, 4];
switch (li) {
| [1, 2] 
| [3, 4] => "is 1,2 or 3,4"
| [5, 6 | 7, ..._] => "starts with 5, then has 6 or 7"
| _ => ""
};
```

## Safeguards

### Exhaustive warning

The compiler returns a warning if patterns do not cover all possible values of the input. An exception will be thrown at runtime for unmatched inputs.

```reason
let f = x =>
  switch (x) {
  /* Warning: this pattern-matching is not exhaustive. */
  | 0 => "zero"
  };
f(2); /* Exception: Match_failure */
```

The warning can be fixed by using a variable like `_` to match the remaining values:

```reason
switch (x) {
| 0 => "zero"
| _ => "another number"
};
```

Using catch-all variable like `_` is useful when handling many values, such as with ints and strings. But if there are fewer possibilities, such as with variants, it's usually better to match each explicitly to ensure that all cases are handled and guard against future changes.

### Unused warning

The compiler also returns a warning if patterns are repeated.

```reason
let x = 3;
switch (x) {
| 0 => "zero"
| 0 => "nil" /* Warning: this match case is unused. */
| k => "another number " ++ string_of_int(k)
};
```

More generally, this warning detects when a pattern will never be matched due to the patterns above it.

```reason
switch (x) {
| k => "another number " ++ string_of_int(k)
| 0 => "zero" /* Warning: this match case is unused. */
};
```

Since patterns are matched sequentially, this warning can sometimes be resolved by changing the order in which they're listed. 

```reason
/* no warning */
switch (x) {
| 0 => "zero" 
| k => "another number " ++ string_of_int(k)
};
```

## Using patterns outside of switch statements

Patterns can also be used outside of switch statements to "unpack" data whenever variables are declared.

```reason
let data = (1, ("red", true));
let (a, (b, _) as c) = data;
/* a is 1, b is "red", c is ("red", true) */

type point = {
  x: int,
  y: int,
};
let f = ({x, y} as p) => x + y + p.x + p.y;
```

Declarations can combine patterns with `|` if the same variables are declared in each pattern.

```reason
type t = A(int) | B(int);
let data = B(3);
let A(v) | B(v) = data; 
/* v is 3 */
```

## Other pattern matching features

### when

`when` can add extra conditions to patterns. The condition must be satisfied in order to execute the pattern's code, otherwise the pattern is skipped. Note that `when` should be used carefully since the exhaustive and unused pattern warnings do not analyze their conditions.

```reason
let k =
  switch (p) {
  | {x, y: 0} when x * x <= 4
  | {x, y: 0} when f(x)
  | {x: 2, y} when y < 10 => 1
  | {x: 2, y} when y < 2 => 2 /* never executed, but no warning */
  | _ => 3
  };
/* k is 1 */
```

### Matching exceptions

If executing an input raises an exception, it can be matched alongside the other values of the input:

```reason
let y =
  switch (List.find(x => x == 0, [1, 2, 3])) {
  | 0 => "zero"
  | n => string_of_int(n)
  | exception Not_found => "not found"
  };
/* y is "not found" */
```

### fun

A function that only matches a parameter can be written with `fun`.

```reason
let f = x =>
  switch (x) {
  | Some(x) => x
  | None => ""
  };

/* equivalent */
let f =
  fun
  | Some(x) => x
  | None => "";
```
