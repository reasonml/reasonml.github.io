---
title: Record
order: 60
---

Records are a set of named values. They resemble "objects" but are

- lighter
- immutable by default
- fixed in field names and types
- veeeery fast

```reason
type person = {age: int, name: string}; /* type */
let me = {age: 30, name: "Jordan"}; /* value */
print_string me.name; /* field access */
```

**Note**: Records must have a type definition.

New records can be created from old records with the `...` spread operator. The
original record isn't mutated.

```reason
let meNextYear = {...me, age: me.age + 1};
```

**Note**: spread cannot add new fields.

### Syntax shorthand (sugar)

To reduce redundancy, we provide **punning** for a record's types and values. You can use it when the name of a record field matches the name of its value/type.

```reason
type horsePower = {power: int, metric: bool};

let metric = true;
let someHorsePower = {power: 10, metric};
/* same as the value {power: 10, metric: metric}; */

type car = {name: string, horsePower};
/* same as the type {name: string, horsePower: horsePower}; */
```

**Note**: there's no punning for a single record field! `{foo}` doesn't do what you expect (it's a block that returns the value `foo`).

### Mutable Fields

Record fields can optionally be mutable. This allows you to update those fields in-place with the `=` operator.

```reason
type person = {
  name: string,
  mutable age: int
};
let me = {name: "Jordan", age: 30};
me.age = me.age + 1; /* alter `me`. Happy birthday! */
```
