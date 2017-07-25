---
title: Mutation
order: 140
---

Reason/OCaml exposes mutable features through [array](#built-in-data-types-array) and [mutable record fields](#built-in-data-types-record). They're sometimes great for performance and expressing certain familiar programming patterns.

For a single mutable reference (e.g. assigning a value to `let`), the standard library comes with syntax sugar for a [record type called `ref`](/api/Pervasives.html#TYPEref). You'd use it like so:

```reason
let myValue = ref 10;
if (...) {
  myValue := 20;
};
print_int !myValue;
```

In reality, this is just:

```reason
let myValue = {contents: 10};
if (...) {
  myValue.contents = 20;
};
print_int myValue.contents;
```

There's nothing special about this record, beside the fact that it comes inside the standard library.

You can also achieve lightweight, local "mutations" through overriding let bindings:

```reason
let foo = 10;
let foo = someCondition ? foo + 5 : foo; /* either 15 or 10 */
let foo = "hello";
print_endline foo; /* "hello" */
```

Notice we've assigned a new type to `foo` in the before-last line. This is type-safe since, as documented [here](#basics-let-binding), the lines afterward can only see the last assignment of `foo`.
