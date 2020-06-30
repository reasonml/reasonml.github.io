---
title: Records
---

_Quick overview: [Records](overview.md#records)_

Records are structures used for storing data in named fields. They are similar
to objects or structs in other languages. Records are very performant and can be
used in hot code paths.

_Note: Record types are [nominal](https://en.wikipedia.org/wiki/Nominal_type_system). This has some important consequences
that we will explore [later on](#nominal-typing)._

## Defining a Record

In order to use a record, you must first declare a type for it:

```reason
type person = {
  name: string,
  age: int,
};
```

From this point on the `person` record can be created and the correct type will
be inferred. It does not have to be annotated:

```reason
let alice = {
  name: "Alice",
  age: 42,
};
```

## Accessing Fields

Access fields on a record by using a `.` followed by the field name:

```reason
print_endline("Hello " ++ alice.name);
```

## Updating Records & Spreading

Record fields are **immutable** by default and cannot be changed. To "update" 
a record, you will typically start with some existing record and use the spread
syntax to update the desired set of fields:

```reason
let happyBirthday = (person) => {
  {...person, age: person.age + 1};
};
```

## Mutable Records

Records do support mutable fields, and this is how [Mutable Bindings](overview.md#refs)
are implemented:

```reason
type mutablePerson = {
  name: string,
  mutable age: int,
};

let happyBirthday = (person) => {
  person.age = person.age + 1;
};
```

## Nominal Typing

Records use nominal typing, which means that only records that have exactly
the same type are compatible with each other. Two different record types with 
the exact same fields cannot be used in place of one another. This behavior is 
similar to classes in C++, Java, and Swift.

This comes up most often when trying to spread one record that has a subset
of fields into another record:

```reason
type baby = {
  name: string,
  age: int,
};

type adult = {
  name: string,
  age: int,
  job: string,
};

let hire = (baby: baby, job): adult => {
  /* Error: Unexpected type */
  {...baby, job: job};
};
```

Instead, the conversion has to be done manually and cover all fields:

```reason
let hire = (baby: baby, job): adult => {
  {
    name: baby.name,
    age: baby.age,
    job: job,
  };
};
```

## Tips

### Shorthand Notation

Fields of records are often constructed using bindings with the exact
same name. A shorthand notation can be used:

```reason
let name = "Alice";
let age = 42;

/* With shorthand */
let alice = {name, age};

/* Without shorthand */
let alice = {name: name, age: age};
```

_Warning: There is a "gotcha" when working with only one field, see
[Single Field Records](#single-field-records) below._

### Providing All Fields

When working with large records it can be annoying to provide all fields when
there are sensible defaults. Two ways to work around this are by using a default
record everywhere:

```reason
let defaultPerson = {
  name: "Unknown",
  age: 0,
};

let alice = {
  ...defaultPerson,
  name: "Alice",
};
```

Or by creating a builder function:

```reason
let makePerson = (
  ~name="Unknown",
  ~age=0,
  _: unit,
) => {
  {name, age};
};

/* The final unit is important. It lets the compiler know you're "done". */
let alice = makePerson(~name="Alice", ());
```

## Troubleshooting

### Add an Explicit Annotation

There are quite a few different issues that can come up when using records and
it can feel like you are fighting the type system. A general approach to
figuring out what the type system wants you to do is to add explicit annotations
and see if that fixes, moves, or changes the error.

This approach can be used to fix or diagnose all of the following issues.

### Unbound Record Field

The record type must be in scope to build records of that type; otherwise, there
will be an "Unbound Record Field" error.

```reason
module Person = {
  type t = {
    name: string,
    age: int,
  };
};

let alice = {
  /* Error: Unbound record field */
  name: "Alice",
  age: 42,
};
```

Fix this by adding an explicit type:

```reason
let alice: Person.t = {
  name: "Alice",
  age: 42,
};
```

Or by opening the module:

```reason
open Person;

let alice = {
  name: "Alice",
  age: 42,
};
```

There is also an odd syntax that you might come across when working with records
with the type out of scope. Fields can be referenced by `Module.field` instead
of just `.field`. This is discouraged in favor of the prior approaches, but is
something to be aware of:

```reason
let alice = {
  Person.name: "Alice",
  Person.age: 42,
};

let getName = (person) => {
  person.Person.name;
};
```

### Disambiguating Record Types

If records have any field names in common the type system can get confused. The
type inference will pick one of the types that matches the first field it sees
and use that as the type, even if later fields are incompatible.

```reason
type person = {
  age: int,
  name: string,
};

type wine = {
  age: int,
  kind: string,
};

let happyBirthday = person => {
  let next = {...person, age: person.age + 1};
  /* Error: The field name does not belong to type wine */
  print_endline("Happy Birthday " ++ person.name);
  next;
};
```

Fix this by adding an explicit type:

```reason
let happyBirthday = (person: person) => {
  let next = {...person, age: person.age + 1};
  print_endline("Happy Birthday " ++ person.name);
  next;
};
```

Or, a less reliable fix is to reorder the usage of fields so an unambiguous
field is seen first:

```reason
let happyBirthday = (person: person) => {
  print_endline("Happy Birthday " ++ person.name);
  let next = {...person, age: person.age + 1};
  next;
};
```

### Single Field Records

There is an uncommon edge-case when using [Shorthand Notation](#shorthand-notation)
with records containing only one field. In the following example, taking into
account shorthand notation, try to determine:

- Does the function return a person with the name field set as name?
- Does the function return the name argument?

```reason
type person = {
  name: string,
};

let fn = (name) => {
  name
};
```

If single-field records are allowed to use shorthand notation this is ambiguous.
That is not okay in a language! To avoid this ambiguity single-field records
always have to have both field and value written:

```reason
let fnName = (name): string => {
  name
};

let fnPerson = (name): person => {
  name: name
};
```

This is an uncommon case because single-field records are uncommon. Typically
instead of having a record type you would use the type of the single field
directly (a notable exception is the [`ref` record type](overview.md#refs)).
