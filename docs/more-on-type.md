---
title: More on Type
---

## Type Argument!

Types can accept parameters, akin to generics in other languages. It's as if a type is a function that takes in arguments and returns a new type! The parameters **need** to start with `'`.

The use-case of a parameterized type is to kill duplications. Before:

```reason
/* this is a tuple of 3 items, explained next */
type intCoordinates = (int, int, int);
type floatCoordinates = (float, float, float);

let buddy: intCoordinates = (10, 20, 20);
```

After:

```reason
type coordinates('a) = ('a, 'a, 'a);

/* apply the coordinates "type function" and return the type (int, int, int) */
type intCoordinatesAlias = coordinates(int);

let buddy: intCoordinatesAlias = (10, 20, 20);

/* or, more commonly, write it inline */
let buddy: coordinates(float) = (10.5, 20.5, 20.5);
```

In practice, types are inferred for you. So the more concise version of the above example would be nothing but:

```reason
let buddy = (10, 20, 20);
```

The type system infers that it's a `(int, int, int)`. Nothing else needed to be written down.

Type arguments appear everywhere.

```reason
/* inferred as `list(string)` */
let greetings = ["hello", "world", "how are you"];
```

If types didn't accept parameters (ie, if we didn't have "type functions"), the standard library would need to define the types `listOfString`, `listOfInt`, `listOfTuplesOfInt`, etc.

Types can receive more arguments, and be composable.

```reason
type result('a, 'b) =
  | Ok('a)
  | Error('b);

type myPayload = {data: string};

type myPayloadResults('errorType) = list(result(myPayload, 'errorType));

let payloadResults: myPayloadResults(string) = [
  Ok({data: "hi"}),
  Ok({data: "bye"}),
  Error("Something wrong happened!")
];
```

## Mutually Recursive Types

Just like functions, types can be mutually recursive through `and`:

```reason
type student = {taughtBy: teacher}
and teacher = {students: list(student)};
```

**Note** that there's no semicolon ending the first line and no `type` on the second line.

## Design Decisions

A type system allowing type argument is basically allowing type-level functions. `list(int)` is really the `list` type function taking in the `int` type, and returning the final, concrete type you'd use in some places. You might have noticed that in other languages, this is more or less called "generics". For example, `ArrayList<Integer>` in Java.

[The principle of least power](https://en.wikipedia.org/wiki/Rule_of_least_power) applies when you're trying to "Get Things Done". If the problem domain allows, definitely pick the least abstract (aka, the most concrete) solution available, so that the solution is reached faster and has fewer unstable indirections you'd have to traverse. For example, prefer types over free-form data, prefer data-driven configuration over turing-complete function calls, prefer function calls over macros, prefer macros over project forks, etc. When you constrain your domain and power, things become easier to analyze. That is, _if_ the domain is constrained enough to allow it.

When a type system is an all-encompassing aspect of your program, we need to make sure we leave enough power in order not to overly constrain your expressiveness; without "type functions", you'd end up with quite a bit of boilerplate, e.g. hard-coded `listOfInt`, `listOfString`, `listOfArrayOfFloat`, their respective helper functions, etc. However, please also make sure you don't overly abuse the power given to you through a rather powerful type system. Sometimes, it's fine to write a _little_ bit of boilerplate to reduce the need for otherwise extra powerful types. If anything, tasteful tradeoffs might show your pragmatism and judgement more than fancy types!
