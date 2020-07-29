---
title: Types
---

Types describe what kind of thing values are. Is this value a string, integer,
or some complex structure? The type of that value will give a direct answer.
Having a strict type system is a powerful tool that removes large classes of
bugs and catches many others when compiling.

In Reason almost all types can be inferred. The compiler will figure out the
types of everything in your program and ensure they make sense. This means you
get the benefits of a strict type system without the drawbacks of writing down
the type of every value.

## The Basics

This is a [let binding](let-binding.md). The binding is named `count`, is of
type `int`, and has a value of `42`. Its type was inferred, we did not
explicitly write down that it is an `int`.

_Everything_ in Reason has a type, even if you do not write it down.

```reason
let count = 42;
```

Types can be explicitly added with an annotation:

```reason
let count: int = 42;
```

Because `count` has a type the compiler knows what we are and are not allowed
to do with its value:

```reason
/* Allowed: addition */
let nextCount = count + 1;

/* Error: count is not a list */
let x = List.map(fn, count);
```

## Annotations

Type annotations can appear almost anywhere. They are not often necessary due to
Reason's type inference, but they can be helpful to confirm your own
understanding of the program's types.

`int` and `string` are annotations used throughout these examples:

```reason
let five: int = 5;
let nine = (five: int) + (4: int);
let add = (x: int, y: int): int => x + y;
let drawCircle = (~radius: int): string => "hi";
```

## Aliases

Aliases can be defined for types. This is helpful to attach meaning to simple
types and when working with complex types that become long to write down.

```reason
type seconds = int;
type timeInterval = (seconds, seconds);
```

Using the alias `seconds` it is clear how the `sleep` function works. If `int`
were used it might not be obvious:

```reason
let sleep = (time: seconds) => { ... }
```

Type aliases are required in some cases, such as working with
[variants](variant.md) or [records](record.md).

## Type Arguments

Types can have arguments. This is useful when defining structures that work
with many types of values. Having a single `list` type with an argument that can
be `int`, `float`, or `string`, is better than having three concrete `intList`,
`floatList`, and `stringList` types.

Arguments are prefixed with a single `'` when defining the type:

```reason
type list('item) = ...
```

When using this type as an annotation the argument must be filled in with a
concrete type:

```reason
let x: list(int) = [1, 2, 3];
let y: list(string) = ["one", "two", "three"];
```

Types can have multiple arguments and be nested:

```reason
type pair('a, 'b) = ('a, 'b);

let x: pair(int, string) = (1, "one");
let y: pair(string, list(int)) = ("123", [1, 2, 3]);
```

- Note: It is common convention for type arguments to be named `'a`, `'b`,
`'c`, etc.
- Note: Type arguments can still be inferred!

## Opaque Types

Opaque types are a powerful tool that limits the implementation details that
are exposed to users. This makes it easier and safer to modify implementations
to suit changing needs.

_Note: In these examples module types are used for simplicity, but opqaue types
are more often created using interface files._

### Setup

`Duration.t` is an opaque type. Its concrete type is hidden and it can only be
interacted with using a limited set of functions:

_(Writing `type t;` is what makes `t` opaque. `t` would not be opaque and would
still have a concrete type if `type t = int;` was written instead.)_

```reason
module type Duration = {
  /* This is an opaque type. */
  type t;
  let fromSeconds: int => t;
  let add: (t, t) => t;
};

module Duration: Duration = {
  /* Duration in seconds */
  type t = int;
  let fromSeconds = value => value;
  let add = (x, y) => x + y;
};
```

Normal integer functions intentionally have errors with `Duration.t`:

```reason
let oneMinute = Duration.fromSeconds(60);
let twoMinutes = Duration.add(oneMinute, oneMinute);

/* Error: expected int, but got Duration.t */
let twoMinutes = oneMinute + oneMinute;
```

### Changing implementation

Now if we want the duration to be more precise and allow millisecond precision
we can confidently change the implementation and be sure that nothing breaks:

```reason
module type Duration = {
  type t;
  let fromSeconds: int => t;
  let fromMS: int => t;
  let add: (t, t) => t;
};

module Duration: Duration = {
  /* Duration in milliseconds */
  type t = int;
  let fromSeconds = value => value * 1000;
  let fromMS = value => value;
  let add = (x, y) => x + y;
};
```

This works the exact same:

```reason
let oneMinute = Duration.fromSeconds(60);
let twoMinutes = Duration.add(oneMinute, oneMinute);
```

But now we also support durations less than one second:

```reason
let halfSecond = Duration.fromMS(500);
let longerThanOneMinute = Duration.add(oneMinute, halfSecond);
```

This is a helpful technique that can make code easier to maintain and safer to
change.
