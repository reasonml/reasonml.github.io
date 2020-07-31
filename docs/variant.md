---
title: Variants
---

_Quick overview: [Variants](overview.md#variants)_

Variant types model values that may assume one of many known variations. This
feature is similar to "enums" in other languages, but each variant form may
optionally specify data that is carried along with it.

This is a very powerful feature of the Reason language when used with
[pattern matching](pattern-matching.md).

## Creation

Variants require a type definition that specifies all of the "constructors",
or "tags", for that variant. Constructors must start with an uppercase letter.

Here the constructors for the `animal` variant are `Cat`, `Dog`, `Horse`,
and `Snake`:

```reason
type animal =
  | Cat
  | Dog
  | Horse
  | Snake;
```

To create a value of type `animal` use one of the constructors:

```reason
let fluffy = Cat;
let spot = Dog;
```

## Constructor Arguments

Variant constructors can have data associated with them:

```reason
type linkedList =
  | Node(int, linkedList)
  | Empty;
```

The constructors can now accept their data as arguments. Creating a linked
list `[1, 2, 3]` looks like:

```reason
let x = Node(1, Node(2, Node(3, Empty)));
```

_Note: This is how the core [`list`](basic-structures.md#list) structure is
actually implemented. The constructors are just hidden behind some syntax._

## Usage

The primary way to interact with variants is through
[pattern matching](pattern-matching.md). When pattern matching over a variant
the compiler can ensure that all cases are covered exhaustively so that there
is no undefined behavior. This is also helpful when adding new cases to a
variant later, because the compiler will present a clear list of code that needs
to be updated.

```reason
let interact = (animal) => {
  switch (animal) {
  | Cat => "pet"
  | Dog => "throw ball"
  | Horse => "ride"
  | Snake => "run away"
  };
};
```

It is possible to interact with a constructor's data while pattern matching:

```reason
let checkFirst = (linkedList) => {
  switch (linkedList) {
  | Node(value, _) => "First is:" ++ string_of_int(value)
  | Empty => "The list is empty"
  };
};
```

## Option

Options are a commonly used variant built into the Reason language. They
represent the presence or absence of a value. It is similar to the concept of
"nullable" values in other languages.

Details: [Options](option.md)

## Inline Records

Often times variants will hold a single predefined record type:

```reason
type cat = {
  name: string,
};

type dog = {
  breed: string,
};

type animal =
  | Cat(cat)
  | Dog(dog);

let x = Cat({name: "Fluffy"});
```

If that record type is only ever used within that single variant, it can be
more concise to define the variant and record type at the same time using
inline records:

```reason
type animal =
  | Cat({name: string})
  | Dog({breed: string});

let x = Cat({name: "Fluffy"});
```

_Note: This is a somewhat recent language feature and not all online REPL's
will support this syntax. Any recent version of Reason will support inline
records though._

## Tips

### Unbound Constructor Error

The variant type needs to be in scope when referencing any constructor of that
variant. An easy way to fix this error is with an explicit type annotation:

```reason
module Animal = {
  type t =
    | Cat
    | Dog
    | Horse
    | Snake;
};

/* Error: Unbound constructor */
let x = Cat;

/* No error */
let y: Animal.t = Cat;
```

### Tuples as Arguments

There is a subtle difference between constructors that accept two arguments and
constructors that accept one argument that is a 2-tuple. Pay close attention
to which kind of variant you are dealing with:

```reason
type oneArgument =
  | OneArg((int, string));

type twoArguments =
  | TwoArgs(int, string);

let x = OneArg((1, "one"));
let y = TwoArgs(2, "two");
```

Using a one-argument variant that accepts a 2-tuple is common when dealing with
structures that use [type parameters](type.md#type-parameters).
`list((int, int))` is used because `list(int, int)` is not valid.

### Variants Must Have Constructors

In some cases it can be tempting to write a variant that is "un-tagged":

```reason
type t =
  | int
  | string;

let x: t = 100;
let x: t = "one";
```

The Reason language **does not** support this feature. All variants **must**
have constructors. The above code is actually a syntax error. Instead write:

```reason
type t =
  | Int(int)
  | String(string);

let x: t = Int(100);
let x: t = String("one");
```
