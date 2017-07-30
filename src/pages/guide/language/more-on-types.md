---
title: More on Types
order: 120
---

#### Mutually Recursive Types

Just like functions, types can be mutually recursive through `and`:

```reason
type student = {taughtBy: teacher}
and teacher = {students: list student};
```

**Note** that there's no semicolon ending the first line and no `type` on the second line.

#### Type Arguments

Types can be "parameterized" (akin to generics in other languages). It's as if a type is a function that takes in arguments and returns a new type. The parameters need to start with `'`.

Types with parameters allow us to kill duplications. Before:

```reason
/* this is a tuple of 3 items, explained next */
type intCoordinates = (int, int, int);
type floatCoordinates = (float, float, float);

let buddy: intCoordinates = (10, 20, 20);
```

After:

```reason
type coordinates 'a = ('a, 'a, 'a);

/* apply the coordinates "type function" and return the type (int, int, int) */
type intCoordinatesAlias = coordinates int;
let buddy: intCoordinatesAlias = (10, 20, 20);

/* or, more commonly, write it inline */
let buddy: coordinates float = (10.5, 20.5, 20.5);
```

In practice, types are inferred for you. So the more concise version of the above example would be nothing but:

```reason
let buddy = (10, 20, 20);
```

The type system infers that it's a `(int, int, int)`. Nothing else needed to be written down.

Type arguments appear everywhere.

```reason
/* inferred as `list string` */
let greetings = ["hello", "world", "how are you"];
```

If types didn't accept parameters (aka, if we didn't have "type functions"), the standard library will need to define the types `listOfString`, `listOfInt`, `listOfTuplesOfInt`, etc.

Types can receive more arguments, and be composable.

```reason
type result 'a 'b =
| Ok 'a
| Error 'b;

type myPayload = {data: string};

type myPayloadResults 'errorType = list (result myPayload 'errorType);

let payloadResults: myPayloadResults string = [
  Ok {data: "hi"},
  Ok {data: "bye"},
  Error "Something wrong happened!"
];
```

Exceptions
----------

Exceptions are just a special kind of [variant](/guide/language/variant), "thrown" in **exceptional** cases (don't abuse them!). When you have ordinary variants, you often don't **need** exceptions, since you can just use variants types such as `type result` above.

```reason
try (somethingThatThrows ()) {
| Not_found => print_endline "Item not found!"
| Invalid_argument message => print_endline message
};
```

You can make your own exceptions like you'd make a variant (exceptions need to be capitalized too).

```
exception InputClosed string;
...
raise (InputClosed "the stream has closed!");
```

Objects
----------------------------------
Although functions are the preferred way of working within Reason, it's also possible to use
objects.

An object encapsulates data that it stores within fields, and has methods that can be invoked
against the data it has.

##### Declaring an object type
An object can have an object type to define its structure.

```reason
type tesla = {
  .
  color: string
};
```
The extra dot at the beginning is to indicate that this is a closed object type, which means that
an object based on this type must have exactly this public structure.

```reason
type car 'a = {
  ..
  color: string
} as 'a;
```
Two dots, also called an elision, indicate that this is an open object type, and therefore
can also contain other values and methods. An open object is also polymorphic and therefore
requires a parameter.

An object type is not required to create an object.

##### Creating an object
```reason
type tesla = {
  .
  drive: int => int
};

let obj:tesla = {
  val hasEnvy = {contents: false};
  pub drive speed => {
    this#enableEnvy true;
    speed
  };
  pri enableEnvy envy => {
    hasEnvy.contents = envy
  };
};
```
This object is of object type tesla and has a public method `drive`. It also contains a
private method `enableEnvy` that is only accesible from within the object.

The following example shows an open object type which uses a type as parameter. The
object type parameter is required to implement all the methods of the open object
type.

```reason
type tesla 'a = {
  ..
  drive: int => int
} as 'a;

let obj:
  tesla {. drive: int => int, doYouWant: unit => bool}
  = {
  val hasEnvy = {contents: false};
  pub drive speed => {
    this#enableEnvy true;
    speed
  };
  pub doYouWant () => hasEnvy.contents;
  pri enableEnvy envy => {
    hasEnvy.contents = envy
  };
};
```
