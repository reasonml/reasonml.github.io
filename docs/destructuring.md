---
title: Destructuring
---

Destructuring is a concise way to extract data from a structure. Destructuring
can be used anywhere a variable name might appear.

## Tuples

```reason
let pair = (1, "Hello");

/* Destructuring */
let (one, hello) = pair;

/* Prints: Hello */
print_endline(hello);
```

## Records

Destructuring is very commonly used with [records](record.md).

```reason
type person = {
  name: string,
  age: int,
};

let alice = {
  name: "Alice",
  age: 42,
};

/* Destructuring */
let {name, age} = alice;

/* Prints: Alice */
print_endline(name);
```

- Note: When destructuring a record the type needs to be in scope or the
record needs to be explicitly annotated.

### Renaming Record Fields

While destructuring record fields, it is possible to bind variable names that
are different than the record field names:

```reason
let {name: legalName, age} = alice;

/* Prints: Alice */
print_endline(legalName);
```

## Function Arguments

```reason
/* Without destructuring */
let hello = (person) => {
  print_endline("Hello " ++ person.name);
};

/* With destructuring */
let hello = ({name}) => {
  print_endline("Hello " ++ name);
};

/* With destructuring and aliasing */
let hello = ({name: legalName}) => {
  print_endline("Hello " ++ legalName);
};
```
