---
title: Record
order: 60
---

Records are like JavaScript objects but are

- lighter
- immutable by default
- fixed in field names and types
- veeery fast
- veeeery nicely typed

### Usage

Type (mandatory):

```reason
type person = {
  age: int,
  name: string
};
```

Value (this will be inferred to be of type `person`):

```reason
let me = {
  age: 5,
  name: "Big Reason"
};
```

Access (the familiar dot notation):

```reason
let name = me.name;
```

#### Record Needs an Explicit Definition

If you only write `{age: 5, name: "Baby Reason"}` without an explicit declaration somewhere above, the type system will give you an error. If the type definition resides in another file, you need to explicitly indicate which file it is:

```reason
/* School.re */

type person = {age: int, name: string};
```

```reason
/* example.re */

let me: School.person = {age: 20, name: "Big Reason"};
/* or */
let me = School.{age: 20, name: "Big Reason"};
/* or */
let me = {School.age: 20, name: "Big Reason"};
```

Either of the above 3 says "this record's definition is found in the School file". The first one, the regular type annotation, is preferred.

#### Immutable Update

New records can be created from old records with the `...` spread operator. The original record isn't mutated.

```reason
let meNextYear = {...me, age: me.age + 1};
```

This update is very efficient! Try a few in our [playground](/try) to see how records are compiled.

**Note**: spread cannot add new fields, as a record's shape is fixed by its type.

#### Mutable Update

Record fields can optionally be mutable. This allows you to update those fields in-place with the `=` operator.

```reason
type person = {
  name: string,
  mutable age: int
};
let baby = {name: "Baby Reason", age: 5};
baby.age = baby.age + 1; /* alter `baby`. Happy birthday! */
```

### Syntax shorthand

To reduce redundancy, we provide **punning** for a record's types and values. You can use it when the name of a record field matches the name of its value/type.

```reason
type horsePower = {power: int, metric: bool};

let metric = true;
let someHorsePower = {power: 10, metric};
/* same as the value {power: 10, metric: metric}; */

type car = {name: string, horsePower};
/* same as the type {name: string, horsePower: horsePower}; */
```

**Note that there's no punning for a single record field**! `{foo}` doesn't do what you expect (it's a block that returns the value `foo`).

### Tips & Tricks

#### Interop with JavaScript

If you're working with JavaScript, the record syntax & operations should feel familiar, and you might be tempted to interop with JS by converting a JS object to a record, and vice-versa. This is fine, but we have an **even better way without conversion overhead**! See [here](https://bucklescript.github.io/bucklescript/Manual.html#_binding_to_js_objects) which talks about **[Reason objects](/guide/language/object)**. Here's an example:

```reason
type payload = Js.t {
    .
    name: string
};
external sendQuery: payload => unit = "sendQuery" [@@bs.module "myAjaxLibrary"];
sendQuery {"name": "Reason"};
```

Notice the dot in the type definiton. That's is an object type notation, and has nothing to do with a record! Objects will be described in a later section.

#### Record Types Are Found By Field Name

With records, you **cannot** say "I'd like this function to take any record type, as long as they have the field `age`". The following _works_, but not as expected:

```reason
type person = {age: int, name: string};
type monster = {age: int, hasTentacles: bool};

let getAge entity => entity.age;
```

The last line's function will infer that the parameter `entity` must be of type `monster`. So the follow code's last line fails:

```reason
let kraken = {age: 9999, hasTentacles: true};
let me = {age: 5, name: "Baby Reason"};

getAge kraken;
getAge me;
```

The type system will complain that `me` is a `person`, and that `getAge` only works on `monster`. If you need such capability, use Reason objects, mentioned in the previous section.

### Design Decisions

After reading the constraints in the previous sections, and if you're coming from a dynamic language background, you might be wondering why one would bother with record in the first place instead of straight using object, since the former needs explicit typing and doesn't allow different records with the same field name to be passed to the same function, etc.

1. The truth is that most of the times in your app, your data's shape is actually fixed, and if it's not, it can potentially be better represented as a combination of variant (introduced next) + record instead*.

2. Record, since its fields are fixed, is compiled to an array with array index accesses instead of JS object (try it in the playground!). On native, it compiles to basically a region of memory where a field access is just one field lookup + one actual access, aka **2 assembly instructions**. The good old days where folks measured in nanoseconds...

<!--TODO: sharable playground  -->

3. Finally, since a record type is resolved through finding that single explicit type declaration (we call this "nominal typing"), the type error messages end up better than the counterpart ("structural typing", like for tuples). This makes refactoring easier; changing a record type's fields naturally allows the compiler to know that it's still the same record, just misused in some places. Otherwise, under structural typing, it might get hard to tell whether the definition site or the usage site is wrong.

\* And we're not just finding excuses for ourselves! Reason objects do support these features.
