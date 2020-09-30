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
let launchMissile = () => {
  someSideEffects();
  print_endline("Missiles have been launched!");
};

launchMissile();
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

### Non-Mandatory Arguments

When defining a function, named arguments can be marked as non-mandatory.
This means they do not need to be supplied as arguments by the caller.
You may simultaneously mark a named argument as non-mandatory, and specify a
default value (in the event it was not supplied by the caller).

#### Defining Non-Mandatory Arguments

Use `=?` after a named argument to mark it as non-mandatory. Inside the function
this value will be wrapped in an option based on whether or not the caller
provided the value.

_Notice: The caller provides an `int`, but inside the function `value` is
`option(int)`._

```reason
let addOne = (~value=?, ()) => {
  switch (value) {
  | Some(value) => value + 1
  | None => 1
  };
};

addOne(); /* 1 */
addOne(~value=11, ()); /* 12 */
```

#### Default Values

Default values can be provided to named arguments using `=value`.

```reason
let makeCircle = (~x=0, ~y=0, ~radius=10, ()) => { ... };

/* Position (0, 0) with radius 10 */
makeCircle();

/* Position (10, 0) with radius 2 */
makeCircle(~x=10, ~radius=2, ());
```

#### Final Unit Argument

In the above examples a final unit argument was added to the function
definitions. This is related to the partial application feature. When using
non-mandatory arguments that can be omitted at call sites, the compiler needs
some indication of when you are "done" calling a function.

Specifically, there must be a positional argument after all non-mandatory
arguments so the compiler can determine whether to partially apply the provided
arguments or evaluate the function using default values.

Consider if there were no final unit argument to `makeCircle`, what
should this do:

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

#### Passing Options to Non-Mandatory Arguments

Sometimes you will want to provide a non-mandatory argument based on whether
a variable is `Some(data)` or `None`.

```reason
let fn = (~data=?, ()) => { ... };

let x = Some(100);

/* Provide data based on whether x is Some or None */
switch (x) {
| Some(data) => fn(~data, ());
| None => fn();
};
```

Passing `x` directly to `~data` will not work because the callsite does not
expect an option type.

```reason
/* Error: Incorrect type */
fn(~data=x, ());
```

Reason provides a shorthand syntax for the pattern above. Prefixing a named
argument's value with a question mark at the call site, will pass whatever is
inside of the `Some()`, but if the value is `None`, then the named argument
will not be supplied at all.

```reason
let a = Some(100);
let b = None;

/* fn is called like `fn(~data=100, ())` */
fn(~data=?a, ());

/* fn is called like `fn()` */
fn(~data=?b, ());
```

_Note: This shorthand works with non-mandatory arguments that have default
values too._

#### Referencing Previous Arguments

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
Non-mandatory arguments               | `let add = (~x=?, ~y=?, ()) => { ... };`
Non-mandatory with default            | `let add = (~x=1, ~y=1, ()) => x + y;`

#### Creating functions with annotations:

Feature                               | Example
--------------------------------------|----------
Anonymous function                    | `(x: int, y: int): int => x + y`
Named function                        | `let add = (x: int, y: int): int => x + y;`
Named arguments                       | `let add = (~x: int, ~y: int): int => x + y;`
Non-mandatory arguments               | `let add = (~x: option(int)=?, ~y: option(int)=?, ()): int => { ... };`
Non-mandatory with default            | `let add = (~x: int=1, ~y: int=1, ()): int => x + y;`

#### Function Application

Feature                               | Example
--------------------------------------|----------
Normal arguments                      | `add(1, 2)`
Named arguments                       | `add(~x=1, ~y=2, ())`
Named argument punning                | `add(~x, ~y, ())`
Partial application                   | `let addTen = add(10);`
Partial application out of order      | `let half = divide(_, 2);`
Options to Non-mandatory arguments    | `add(~x=?Some(1), ~y=?foo, ())`

#### Function Types

Feature                               | Example
--------------------------------------|----------
Normal function                       | `type f = (int, int) => int;`
Named arguments                       | `type f = (~x: int, ~y: int) => int;`
Non-mandatory arguments               | `type f = (~x: int=?, ~y: int=?, unit) => int;`
