---
title: Functions
---

_Quick overview: [Functions](overview.md#functions)_

Functions are a core part of any language. They perform logic and return values
based on the arguments provided.

There is a comprehensive [Cheat-sheet](#cheat-sheet) at the end.

## The Basics

Define named functions with a [let binding](let-binding.md), parenthesis `()`,
and an arrow `=>`:

```reason
let add = (x, y) => {
  x + y;
};
```

Short function bodies can leave out the surrounding block:

```reason
let add = (x, y) => x + y;
```

Call functions using their name and a comma separated list of arguments:

```reason
let twentyThree = add(10, 13);
```

- Note: There is no `return` keyword. See
[implicit return](overview.md#implicit) for details.

## No Arguments

Use a [`unit`](overview.md#unit) argument when writing a function that should
have "no arguments". This is commonly used when a function has side-effects.
The unit argument looks like `()`:

```reason
let launchMissle = () => {
  someSideEffects();
  print_endline("Missles have been launched!");
};

launchMissle();
```

## Named Arguments

Arguments can be named using a `~` prefix. This can be helpful when dealing with
many function arguments, or arguments with the same types.

```reason
let makeCircle = (~x, ~y, ~radius) => { ... };
```

Call functions with named arguments using an `=`:

```reason
makeCircle(~x=5, ~y=5, ~radius=10);
```

Because the arguments are named, the calling order can be changed:

```reason
makeCircle(~radius=10, ~y=5, ~x=5);
```

## Inline Functions

Functions can be created inline, they do not have to have a name and let
binding. This is helpful when working with functions that accept other functions
as arguments.

```reason
/* Not inline */
let double = value => value * 2;
let x = List.map(double, x);

/* Inline function */
let x = List.map(value => value * 2, x);
```

## Recursive Functions

See [Recursion](recursion.md) for details on defining recursive functions.

```reason
let rec infiniteRecursion = () => infiniteRecursion();
```

## Advanced

### Partial application

Reason functions can be partially called. This is like creating a new function
with some of the arguments already set as a particular value.

```reason
let add = (x, y) => x + y;
let addFive = add(5);
let eleven = addFive(6);
let twelve = addFive(7);
```

If you want to partially call a function with an argument that is not the first
argument use a `_` to skip arguments:

```reason
let divide = (a, b) => a / b;
let half = divide(_, 2);
let five = half(10);
```

### Default Argument Values

When defining a function with named arguments default values can be provided:

```reason
let makeCircle = (~x=0, ~y=0, ~radius=10, ()) => { ... };

/* Position (0, 0) with radius 10 */
makeCircle();

/* Position (10, 0) with radius 2 */
makeCircle(~x=10, ~radius=2, ());
```

Notice that an extra unit argument was added after the `radius` argument. This
has to do with the partial application feature. Now that some arguments have
default values and can be left out the compiler needs some indication of when
you are "done" calling a function.

There must be a positional argument after all optional arguments so the compiler
knows whether to partially apply a function or to use the default values.

Consider if there were no final unit argument, what should this do:

```reason
makeCircle(~radius=1);
```

It is not clear if that should return a function waiting for `x` and `y`
coordinates, or if should default the `x` and `y` coordinates to zeroes. With
the final unit argument these cases are disambiguated:

```reason
/* Function waiting for x and y coordinates. */
let makeUnitCircle = makeCircle(~radius=1);
let c = makeUnitCircle(~x=5, ~y=5, ());

/* Creates a circle at (0, 0) with radius 1 */
let c = makeCircle(~radius=1, ());
```

### Optional Arguments

Similar to default argument values, named arguments can be marked as optional.
This is just syntax around making the default value `None`.

```reason
let next = (~value=?, ()) => {
  switch (value) {
  | Some(value) => value + 1
  | None => 1
  };
};

next(); /* 1 */
next(~value=11, ()); /* 12 */
```

Sometimes you will have an option that needs to be passed to a function with an
optional argument. Passing it normally will not work:

```reason
let x = Some(11);

/* Error: Incorrect type */
next(~value=x, ());
```

Instead prefix the variable name with a `?`:

```reason
next(~value=?x, ()); /* 12 */
```

### Referencing Previous Arguments

When defining default values previous arguments may be used:

```reason
let add = (a, ~b, ~c=a+1, ~d=b+1, ()) => a + b + c + d;

add(1, ~b=1, ()); /* 6 */
add(1, ~b=1, ~c=10, ()); /* 14 */
```

## No Var-args

This is no way to define a function that accepts a variable number of arguments
in Reason. A workaround can be to accept a list as the final argument.

## Cheat-sheet

#### Creating functions:

Feature                               | Example
--------------------------------------|----------
Anonymous function                    | `(x, y) => x + y`
Named function                        | `let add = (x, y) => x + y;`
Named arguments                       | `let add = (~x, ~y) => x + y;`
Default values                        | `let add = (~x=1, ~y=1, ()) => x + y;`
Optional values                       | `let add = (~x=?, ~y=?, ()) => { ... };`

#### Creating functions with annotations:

Feature                               | Example
--------------------------------------|----------
Anonymous function                    | `(x: int, y: int): int => x + y`
Named function                        | `let add = (x: int, y: int): int => x + y;`
Named arguments                       | `let add = (~x: int, ~y: int): int => x + y;`
Default values                        | `let add = (~x: int=1, ~y: int=1, ()): int => x + y;`
Optional values                       | `let add = (~x: option(int)=?, ~y: option(int)=?, ()): int => { ... };`

#### Function Application

Feature                               | Example
--------------------------------------|----------
Normal arguments                      | `add(1, 2)`
Named arguments                       | `add(~x=1, ~y=2, ())`
Named argument punning                | `add(~x, ~y, ())`
Partial application                   | `let addTen = add(10);`
Partial application out of order      | `let half = divide(_, 2);`
Explicit optional application         | `add(~x=?Some(1), ~y=?Some(2), ())`
Default values                        | `let add = (~x=1, ~y=1, ()) => x + y;`
Optional values                       | `let add = (~x=?, ~y=?, ()) => { ... };`

#### Function Types

Feature                               | Example
--------------------------------------|----------
Normal function                       | `type f = (int, int) => int;`
Named arguments                       | `type f = (~x: int, ~y: int) => int;`
Optional arguments                    | `type f = (~x: int=?, ~y: int=?, unit) => int;`
