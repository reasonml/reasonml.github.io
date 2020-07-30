---
title: Options and nullability
---

_Quick overview: [Options](overview.md#options)_

Options are a built-in variant that represent the presence or absence of a
value. It is similar to the concept of "nullable" values in other languages.
Options are used often.

In Reason there is no "null" value that any type might assume. Instead if a
value needs to communicate that it might (or might not) be available, then the
`option` type is used.

## Definition

The option type is a [variant](variant.md) with two constructors:

- `Some` represents the presence of a value and accepts that value as an argument
- `None` represents the absence of a value and acceps no arguments

```reason
type option('value) =
  | None
  | Some('value);
```

_Note: It is not necessary to define this type, it is already defined._

## Examples

It is common for `None` to be the default value before something is setup.

```reason
type person = {
  name: string,
  age: int,
};

let nobody: option(person) = None;
```

Logging in can set up the user's data:

```reason
let login = () =>
  Some({
    name: "Alice",
    age: 42,
  });

let alice = login();
```

Now when writing functions that deal with users we can make sure that there is
actually a user present:

```reason
let happyBirthday = (user) => {
  switch (user) {
  | Some(person) => "Happy birthday " ++ person.name
  | None => "Please login first"
  };
};
```
