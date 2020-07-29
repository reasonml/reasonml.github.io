---
title: More on Type
---

This page has moved to: [types](type.md)

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
