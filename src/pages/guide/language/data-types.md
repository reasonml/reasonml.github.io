---
title: Built-in Data Types
order: 2
---

### Tuple

Tuples are

- immutable
- ordered
- fixed-sized
- heterogeneous

```reason
let myThreeFloats = (20.0, 30.0, 100.0);
let myIntAndString = (20, "totallyNotAnInteger");
```

Tuples' types can be used in type annotations as well. Tuple types visually resemble tuples values.

```reason
let myThreeFloats: (float, float, float) = (20.0, 30.0, 100.0);
/* a tuple type alias */
type myPair = (int, string);
let myIntAndString: myPair = (20, "totallyNotAnInteger");
```

**Note**: there's no tuple of size 1.

### Record

Records are a set of named values. They resemble "objects" but are

- lighter
- immutable by default
- less flexible
- much faster

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

##### Sugar

To reduce redundancy, we provide **punning** for a record's types and values. You can use it when the name of a record field matches the name of its value/type.

```reason
type horsePower = {power: int, metric: bool};

let metric = true;
let horsePower1 = {power: 10, metric};
/* same as the value {power: 10, metric: metric}; */

type car = {name: string, horsePower};
/* same as the type {name: string, horsePower: horsePower}; */
```

**Note**: there's no punning for a single record field! `{foo}` doesn't do what you expect (it's a block that returns the value `foo`).

##### Mutable Fields

Record fields can optionally be mutable. This allows you to update those fields in-place with the `=` operator.

```reason
type person = {
  name: string,
  mutable age: int
};
let me = {name: "Jordan", age: 30};
me.age = me.age + 1; /* alter `me`. Happy birthday! */
```

### Variant

Most data structures are about "this **and** that". A variant allows us to express "this **or** that".

```reason
type response =
| Yes
| No
| PrettyMuch;

let areYouCrushingIt = Yes;
```

`Yes`, `No` and `PrettyMuch` aren't strings, nor references, nor some special data type. They're called "constructors" (or "tag"). The `|` bar separates each constructor.

**Note**: variant constructors need to be capitalized.

A `switch` expression is like a large `if/elseif/elseif..` that allows you to check every possible case of a variant. To use it, enumerate every variant constructor, each followed by an `=>` and the expression corresponding to that case.

```reason
let message = switch (areYouCrushingIt) {
| No => "No worries. Keep going!"
| Yes => "Great!"
| PrettyMuch => "Nice!"
};
/* message is "Great!" */
```

The compiler will raise a type error if you've forgotten to cover a case of your
variant, or if two cases are redundant!

##### Constructor Arguments

Constructors can carry extra data in a space-separated list.

```reason
type account =
| None
| Instagram string
| Facebook string int;
```

Here, `Instagram` carries a `string` and `Facebook` carries a `string` and an `int`. Usage:

```reason
let myAccount = Facebook "Josh" 26;
let friendAccount = Instagram "Jenny";
```

**Note** how using a constructor is like calling a function! It's as if `Facebook` was a function that accepts two arguments. This isn't a coincidence; there's a reason why a constructor's data is called "argument".

**Note**: be careful not to confuse a constructor carrying 2 arguments with a constructor carrying a single tuple argument:

```reason
type account =
| Facebook string int /* 2 arguments */
type account2 =
| Instagram (string, int) /* 1 argument - happens to be a 2-tuple */
```

##### Using Switch with Constructors Arguments

The `switch` expression can also let you "open up" a variant and bind its arguments to names you can refer to.

```reason
type account =
| None
| Instagram string;
| Facebook string int
let myAccount = Facebook "Josh" 26;
...
let greeting = switch (myAccount) {
| None => "Hi!"
| Facebook name age =>
  "Hi " ^ name ^ ", you're " ^ (string_of_int age) ^ "-year-old."
| Instagram name => "Hello " ^ name ^ "!"
}
```

This is called pattern-matching. It's a stronger version of destructuring, often found in other languages.


### (Linked) List

Lists are homogeneous, immutable, and support fast `O(1)` append at the head of the list.

```reason
let myList = [1, 2, 3];
let anotherList = [0, ...myList]; /* myList didn't mutate */
```

Under the hood, a list is just a normal variant with a neat syntax. To illustrate this, here's how you would declare your own int list type, without the nice syntax:

```reason
type myListType = Empty | NonEmpty int myListType;
let myList = NonEmpty 1 (NonEmpty 2 (NonEmpty 3 Empty));
/* basically [1, 2, 3] */
```

### Array

Arrays are like lists, except they are mutable and support fast random access for performance-sensitive scenarios.

```reason
let myArray = [|"hello", "world", "how are you"|];
let world = myArray.(1);
Array.set myArray 0 "hey";
/* now [|"hey", "world", "how are you"|] */
```
