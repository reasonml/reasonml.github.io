---
title: Record
---

Records are like JavaScript objects but are

- lighter
- immutable by default
- fixed in field names and types
- very fast
- a bit more rigidly typed
- still compiled to JavaScript objects

Because a record compiles to a straightforward JS object, you can directly model incoming JS objects as Reason records, **no conversion functions needed**. This is extremely convenient when interoperating with existing JS libraries, since most of them use objects in their APIs and you wouldn't need to wrap those with a layer of Reason APIs.

## Usage

To make a record value, you have to first declare its type:

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
type person = {
  age: int,
  name: string
};
```
<!--Output-->
```js
/* Nothing. Types disappear in the output */
```
<!--END_DOCUSAURUS_CODE_TABS-->

To use it (this will be inferred to be of type `person`):

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let me = {
  age: 5,
  name: "Big Reason"
};
```
<!--Output-->
```js
var me = {
  age: 5,
  name: "Big Reason"
};
```
<!--END_DOCUSAURUS_CODE_TABS-->

Access a field:

```reason
let name = me.name;
```

### Record Needs an Explicit Definition

For various performance and type checking reasons, records are one of the very few features in Reason where we require you to pre-declare a type before using it. In the above example, if you only write `let me = {age: 5, name: "Baby Reason"}` without an explicit type declaration somewhere above, the type system will give you an error. If the type definition resides in another file or module, you need to indicate it:

```reason
/* file School.re */

type person = {age: int, name: string};
```

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
/* file Example.re */

let me: School.person = {age: 5, name: "Big Reason"};
/* or */
let me = School.{age: 5, name: "Big Reason"};
/* or */
let me = {School.age: 5, name: "Big Reason"};
```
<!--Output-->
```js
var me = {
  age: 5,
  name: "Big Reason"
};
```
<!--END_DOCUSAURUS_CODE_TABS-->

Any of the three examples above says "this record's definition is found in the School file/module". The first one, the regular type annotation, is preferred.

### Immutable Update

New records can be created from old records with the `...` spread operator. The original record isn't mutated.

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let meNextYear = {
  ...me,
  age: me.age + 1
};
```
<!--Output-->
```js
var meNextYear = {
  age: me.age + 1 | 0,
  name: "Big Reason"
};
```
<!--END_DOCUSAURUS_CODE_TABS-->

This update is very efficient! **Check the output tab**. Because we know the whole type shape of the record you're updating, we can avoid the JavaScript way of iterating over all the object fields and stuffing them into a new one. Instead, a new record is directly created.

**Note**: spread cannot add new fields, as a record's shape is fixed by its type.

### Mutable Update

Record fields can optionally be mutable. This allows you to update those fields in-place with the `=` operator.

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
type person = {
  name: string,
  mutable age: int
};
let baby = {name: "Baby Reason", age: 5};
baby.age = baby.age + 1; /* alter `baby`. Happy birthday! */
```
<!--Output-->
```js
var baby = {name: "Baby Reason", age: 5};

baby.age = baby.age + 1 | 0;
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Syntax shorthand

To reduce redundancy, we provide **punning** for a record's types and values. Punning refers to the syntax shorthand you can use when the name of a field matches the name of its value/type:

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
type horsePower = {power: int, metric: bool};

let metric = true;
let someHorsePower = {power: 10, metric};
/* same as the value {power: 10, metric: metric}; */

type car = {name: string, horsePower};
/* same as the type {name: string, horsePower: horsePower}; */
```
<!--Output-->
```js
var metric = true;
var someHorsePower = {
  power: 10,
  metric: true
};
```
<!--END_DOCUSAURUS_CODE_TABS-->

**Note that there's no punning for a single record field!** `{foo}` doesn't do what you expect; it's a block that returns the value `foo`.

## Tips & Tricks

### Record Types Are Found By Field Name

With records, you **cannot** say "I'd like this function to take any record type, as long as they have the field `age`". The following does **not** work as expected:

```reason
type person = {age: int, name: string};
type monster = {age: int, hasTentacles: bool};

let getAge = (entity) => entity.age;
```

The last line's function will infer that the parameter `entity` must be of type `monster`. The following code's last line fails:

```reason
let kraken = {age: 9999, hasTentacles: true};
let me = {age: 5, name: "Baby Reason"};

getAge(kraken);
getAge(me);
```

The type system will complain that `me` is a `person`, and that `getAge` only works on `monster`. If you need this capability, use Reason objects, described [here](object.md).

## Design Decisions

If you're coming from a dynamic language background, you might be wondering why one would bother with records in the first place instead of imitating JS and using a catch-all object concept for everything.

The reason is that JavaScript objects can be _really_ slow. Code can add fields, remove fields, iterate over them, or pass the keys themselves somewhere else. JS engines nowadays try to "guess" your object's usage patterns and optimize it into a solid C++ struct. Sometimes they fail to do so and convert your overly dynamic object into a hash map, with a sudden >100x performance degradation: every field access is forced to hash the field name and traverse the hash map to find it.

We love simplicify, but the single all-powerful data structure that is the JS object is too simplistic. Reason separates the known and unknown key use cases into record and proper hash map (documented later). This way, you can leverage the consistently fast record experience, as shown in the immutable update section above. Field access is also guaranteed to be super fast.

"But doesn't a Reason record compile to a JS object anyway?" Yes, but those records will trigger the JS engines' optimistic object optimizations, since they see that you never tried to, say, add or remove record fields or iterate through the keys, and therefore they'll never transform your compiled JS objects into C++ hash maps or other slow data structures. Basically, Reason's type system enforced the disciplined usage of this data structure so that you can guarantee that it will never be accidentally slow.

(And yes, we're aware that it's comical for a language feature to transform into a dynamic-looking JS object, then be transformed again by the JS engines into a C++ struct, only to end up where we started in the first place. Such is modern engineering.)
