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

### Renaming Record Fields

While destructuring it is possible to bind to variables different than the field
names:

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
```
