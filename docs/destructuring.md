---
title: Destructuring
---

"Destructuring" is a visually concise way of extracting fields from a data structure. You can use destructuring anywhere you'd normally use a variable.

## Usage

The following binds variables: `ten = 10`, `twenty = 20`

```reason
let someInts = (10, 20);
let (ten, twenty) = someInts;
```

The following binds variables: `name = "Guy"`, `age = 30`

```reason
type person = {name: string, age: int};
let somePerson = {name: "Guy", age: 30};
let {name, age} = somePerson;
```

When you pull out fields, you can optionally rename the fields. The following binds these instead: `n = "Guy"`, `a = 30`.

```reason
let {name: n, age: a} = somePerson;
```

Destructuring also allows type annotations.

```reason
let (ten: int, twenty: int) = someInts;
let {name: (n: string), age: (a: int)} = somePerson;
```

Destructuring a function's labeled arguments is also possible.

```reason
type person = {
  name: string,
  age: int
};

let someFunction = (~person as {name}) => {
  /* you can use `name` here */
};

let otherFunction = (~person as {name} as thePerson) => {
  /* you can use both `name` and the whole record as `thePerson` here */
};
```

**Keep reading the section, pattern matching, for a crazier form of destructuring**!

## Tips & Tricks

Destructuring can make your code much more concise without requiring you to name intermediate variables. Do use them! But don't abuse them and make your code overly nested & terse.

If you're destructuring a record or a variant whose definition isn't in the current file, you need to explicitly annotate it. See [here](record.md#record-needs-an-explicit-definition) and [here](variant.md#variant-needs-an-explicit-definition).
