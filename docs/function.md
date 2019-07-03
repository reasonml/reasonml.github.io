---
title: Function
---

_Cheat sheet for the full function syntax at the end_

Can you believe we haven't covered function until now?

Functions are declared with an arrow and return the expression.

```reason
let greet = (name) => "Hello " ++ name;
```

This declares a function and assigns to it the name `greet`, which you can call like so:

```reason
greet("world!"); /* "Hello world!" */
```

Multi-arguments functions have arguments separated by comma:

```reason
let add = (x, y, z) => x + y + z;
add(1, 2, 3); /* 6 */
```

For longer functions, you'd surround the body with a block:

```reason
let greetMore = (name) => {
  let part1 = "Hello";
  part1 ++ " " ++ name
};
```

## No Argument

A function always takes an argument; but sometimes, we'd use it for e.g. side-effects, and don't have anything to pass to it. In other languages, we'd conceptually pass "no argument". In Reason, every function takes an argument; here we'd conventionally pass it the value `()`, called "unit".

```reason
/* receive & destructure the unit argument */
let logSomething = () => {
  print_endline("hello");
  print_endline("world")
};

/* call the function with the value of type unit */
logSomething();
```

`()` is a totally normal value, the single possible value in `unit`. Reason gave it a special syntax out of convenience.

## Labeled Arguments

Multi-arguments functions, especially those whose arguments are of the same type, can be confusing to call.

```reason
let addCoordinates = (x, y) => {
  /* use x and y here */
};
/* ... */
addCoordinates(5, 6); /* which is x, which is y? */
```

In OCaml/Reason, you can attach labels to an argument by prefixing the name with the `~` symbol:

```reason
let addCoordinates = (~x, ~y) => {
  /* use x and y here */
};
/* ... */
addCoordinates(~x=5, ~y=6);
```

Since we have currying (more on that below), we can provide the arguments in **any order**:

```reason
addCoordinates(~y=6, ~x=5);
```

The `~x` part in the declaration means the function accepts an argument labeled `x` and can refer to it in the function body by the same name. You can also refer to the arguments inside the function body by a different name for conciseness:

```reason
let drawCircle = (~radius as r, ~color as c) => {
  setColor(c);
  startAt(r, r);
  /* ... */
};

drawCircle(~radius=10, ~color="red");
```

As a matter of fact, `(~radius)` is just a shorthand (called **punning**) for `(~radius as radius)`.

Here's the syntax for typing the arguments:

```reason
let drawCircle = (~radius as r: int, ~color as c: string) => ...;
```

### Currying

Reason functions can automatically be **partially** called:

```reason
let add = (x, y) => x + y;
let addFive = add(5);
let eleven = addFive(6);
let twelve = addFive(7);
```

Actually, the above `add` is nothing but syntactic sugar for this:

```reason
let add = (x) => (y) => x + y;
```

OCaml optimizes this to [avoid the unnecessary function allocation](https://reasonml.github.io/en/try.html?reason=DYUwLgBAhgJjEF4IAoAeBKRA+FBPTCOqEA1BLgNwBQVA9AFQTAD2zA1tJGABYgTMBXMAAchAQmhwAYgEsAbnxkBnaBAD6SmQDsA5qDUQAZgK0BjMDOZaIpqMGAT6tKqEiwYshYkkxkAVnRqF3AITWIkd08QZABGQKA) (2 functions here, naively speaking) whenever it can! This way, we get

- Nice syntax
- Currying for free (every function takes a single argument, actually!)
- No performance cost

## Optional Labeled Arguments

Labeled function arguments can be made optional during declaration. You can then omit them when calling the function.

```reason
/* radius can be omitted */
let drawCircle = (~color, ~radius=?, ()) => {
  setColor(color);
  switch (radius) {
  | None => startAt(1, 1)
  | Some(r_) => startAt(r_, r_)
  }
};
```

When given in this syntax, `radius` is **wrapped** in the standard library's `option` type, defaulting to `None`. If provided, it'll be wrapped with a `Some`. So `radius`'s type value is either `None` or `Some(int)` here.

**Note**: `None | Some(foo)` is a data structure type called variant, described [earlier](variant.md). This particular variant type is provided by the standard library. It's called `option`. Its definition: `type option('a) = None | Some('a)`.

**Note** the unit `()` at the end of `drawCircle`. Writing this particular function without the unit `()` would lead to the following problem. Because `radius` and `color` are both labeled, the function can be curried, and it can be applied out-of-order, it's unclear what the following means:

```reason
let whatIsThis = drawCircle(~color);
```

Is `whatIsThis` a curried `drawCircle` function, waiting for the optional `radius` to be applied? Or did it finish applying because the `radius` is optional? To address this confusion, append a positional (aka non-labeled) argument to `drawCircle` (conventionally `()`), and OCaml will, as a rule of thumb, presume the optional labeled argument is omitted when the positional argument is provided.

If we don't supply the unit, OCaml knows we want to curry the function.
```reason
let curriedFunction = drawCircle(~color);
```

If we _do_ supply the unit, OCaml knows we deliberately omit the `radius` parameter, and the function is executed.
```reason
let circle = drawCircle(~color, ());
```

### Explicitly Passed Optional

Sometimes, you might want to forward a value to a function without knowing whether the value is `None` or `Some(a)`. Naively, you'd do:

```reason
let result =
  switch (payloadRadius) {
  | None => drawCircle(~color, ())
  | Some(r) => drawCircle(~color, ~radius=r, ())
  };
```

This quickly gets tedious. We provide a shortcut:

```reason
let result = drawCircle(~color, ~radius=?payloadRadius, ());
```

This means "I understand `radius` is optional, and that when I pass it a value it needs to be an `int`, but I don't know whether the value I'm passing is `None` or `Some(val)`, so I'll pass you the whole `option` wrapper".

### Optional with Default Value

Optional labeled arguments can also be provided a default value. In this case, they aren't wrapped in an `option` type.

```reason
let drawCircle = (~radius=1, ~color, ()) => {
  setColor(color);
  startAt(radius, radius)
};
```

### Recursive Functions

By default, a value can't see a binding that points to it, but including the `rec` keyword in a `let` binding makes this possible. This allows functions to see and call themselves, giving us the power of recursion.

```reason
let rec neverTerminate = () => neverTerminate();
```

### Mutually Recursive Functions

Mutually recursive functions start like a single recursive function using the
`rec` keyword, and then are chained together with `and`:

```reason
let rec callSecond = () => callFirst()
and callFirst = () => callSecond();
```

**Note** that there's no semicolon ending the first line and no `let` on the second line.

## Tips & Tricks

Cheat sheet for the function syntaxes:

### Declaration

```reason
/* anonymous function. Listed for completeness only */
(x) => (y) => 1;
/* sugar for the above */
(x, y) => 1;
/* assign to a name */
let add = (x, y) => 1;

/* labeled */
let add = (~first as x, ~second as y) => x + y;
/* with punning sugar */
let add = (~first, ~second) => first + second;

/* labeled with default value */
let add = (~first as x=1, ~second as y=2) => x + y;
/* with punning */
let add = (~first=1, ~second=2) => first + second;

/* optional */
let add = (~first as x=?, ~second as y=?) => switch (x) {...};
/* with punning */
let add = (~first=?, ~second=?) => switch (first) {...};
```

#### With Type Annotation

```reason
/* anonymous function */
(x: int) => (y: int): int => 1;
/* sugar for the above */
(x: int, y: int): int => 1;
/* assign to a name */
let add = (x: int, y: int): int => 1;

/* labeled */
let add = (~first as x: int, ~second as y: int) : int => x + y;
/* with punning sugar */
let add = (~first: int, ~second: int) : int => first + second;

/* labeled with default value */
let add = (~first as x: int=1, ~second as y: int=2) : int => x + y;
/* with punning sugar */
let add = (~first: int=1, ~second: int=2) : int => first + second;

/* optional */
let add = (~first as x: option(int)=?, ~second as y: option(int)=?) : int => switch (x) {...};
/* with punning sugar */
/* note that the caller would pass an `int`, not `option int` */
/* Inside the function, `first` and `second` are `option int`. */
let add = (~first: option(int)=?, ~second: option(int)=?) : int => switch (first) {...};
```

### Application

```reason
/* anonymous application. Listed for completeness only */
add(x)(y);
/* sugar for the above */
add(x, y);

/* labeled */
add(~first=1, ~second=2);
/* with punning sugar */
add(~first, ~second);

/* application with default value. Same as normal application */
add(~first=1, ~second=2);

/* explicit optional application */
add(~first=?Some(1), ~second=?Some(2));
/* with punning */
add(~first?, ~second?);
```

#### With Type Annotation

```reason
/* anonymous application */
add(x: int)(y: int);

/* labeled */
add(~first=1: int, ~second=2: int);
/* with punning sugar */
add(~first: int, ~second: int);

/* application with default value. Same as normal application */
add(~first=1: int, ~second=2: int);

/* explicit optional application */
add(~first=?Some(1): option(int), ~second=?Some(2): option(int));
/* with punning sugar */
add(~first: option(int)?, ~second: option(int)?);
```

### Standalone Type Signature

```reason
/* first arg type, second arg type, return type */
type foo = int => int => int;
/* sugar for the above */
type foo = (int, int) => int;

/* labeled */
type foo = (~first: int, ~second: int) => int;

/* labeled */
type foo = (~first: int=?, ~second: int=?, unit) => int;
```

#### In Interface Files

To annotate a function from the implementation file (`.re`):

```reason
let add: int => int => int;
/* sugar for the above */
let add: (int, int) => int;
```

Same rules as the previous section, except replacing `type foo = bar` with `let add: bar`.

**Don't** confuse this with actually exporting a type in the interface file. `let add: bar` annotates an existing value `bar` from the implementation file. `type foo = bar` exports a type of the same shape from the implementation file.
