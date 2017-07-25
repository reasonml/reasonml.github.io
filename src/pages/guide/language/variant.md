---
title: Variant
order: 70
---

Behold, the crown jewel of Reason data structures!

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
| Instagram string
| Facebook string int;
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
