---
title: Variant!
---

Behold, the crown jewel of Reason data structures!

Most data structures in most languages are about "this **and** that". A variant allows us to express "this **or** that".

```reason
type myResponseVariant =
  | Yes
  | No
  | PrettyMuch;

let areYouCrushingIt = Yes;
```

`Yes`, `No` and `PrettyMuch` aren't strings, nor references, nor some special data type. They're called "constructors" (or "tag"). The `|` bar separates each constructor.

**Note**: a variant's constructors need to be capitalized.

## Usage

Along with a variant comes one of the most important features of Reason, the `switch` expression.

A Reason `switch` is visually similar to other languages' `switch` (aka a large `if/elseif/elseif...`). It allows you to check every possible case of a variant. To use it, enumerate every variant constructor of the particular variant you'd like to use, each followed by an `=>` and the expression corresponding to that case.

```reason
let message =
  switch (areYouCrushingIt) {
  | No => "No worries. Keep going!"
  | Yes => "Great!"
  | PrettyMuch => "Nice!"
  };
/* message is "Great!" */
```

A variant has an extremely rich amount of type system assistance. For example, we'll give you a type error if you've forgotten to cover a case of your variant, or if two cases are redundant. Be sure to check out switch and pattern-matching in a [later section](pattern-matching.md)!

### Variant Needs an Explicit Definition

If the variant you're using is in a different file, bring it into scope like you'd do [for a record](record.md#record-needs-an-explicit-definition):

```reason
/* Zoo.re */

type animal = Dog | Cat | Bird;
```

```reason
/* example.re */

let pet: Zoo.animal = Dog; /* preferred */
/* or */
let pet = Zoo.Dog;
```

### Constructor Arguments

A variant's constructors can hold extra data separated by comma.

```reason
type account =
  | None
  | Instagram(string)
  | Facebook(string, int);
```

Here, `Instagram` holds a `string`, and `Facebook` holds a `string` and an `int`. Usage:

```reason
let myAccount = Facebook("Josh", 26);
let friendAccount = Instagram("Jenny");
```

**Notice how using a constructor is like calling a function**? It's as if `Facebook` was a function that accepts two arguments. This isn't a coincidence; there's a reason why a constructor's data is called "constructor argument".

Using `switch`, you can pattern-match (again, described in a later section) a constructor's arguments:

```reason
let greeting =
  switch (myAccount) {
  | None => "Hi!"
  | Facebook(name, age) => "Hi " ++ name ++ ", you're " ++ string_of_int(age) ++ "-year-old."
  | Instagram(name) => "Hello " ++ name ++ "!"
  };
```

### Honorable Mentions

The [standard library](/api/index.html) exposes two important variants you'll come to hear a lot.

#### `option`

```reason
type option('a) = None | Some('a);
```

This is the convention used to simulate a "nullable" (aka `undefined` or `null`) value in other languages. Thanks to this convenience type definition, Reason can default every value to be non-nullable. An `int` will always be an int, never "`int` **or** `null` **or** `undefined`". If you do want to express a "nullable int", you'd use `option(int)`, whose possible values are `None` or `Some(int)`. `switch` forces you to handle both cases; therefore, **a pure Reason program doesn't have null errors**.

#### `list`

```reason
type list('a) = Empty | Head('a, list('a));
```

_Not the actual type definition. Just an illustration_.

This says: "a list that holds a value of type `a` (whatever it is) is either empty, or holds that value plus another list".

Reason gave `list` a syntax sugar. `[1, 2, 3]` is conceptually equivalent to `Head(1, Head(2, Head(3, Empty)))`. Once again, `switch` forces you to handle every case of this variant, including `Empty` (aka `[]`). **This eliminates another big category of access bugs**.

#### Other Variant-like Types

Did you know that you can use `switch` on string, int, float, array, and most other data structures? Try it!

## Tips & Tricks

**Be careful** not to confuse a constructor carrying 2 arguments with a constructor carrying a single tuple argument:

```reason
type account =
  | Facebook(string, int) /* 2 arguments */;
type account2 =
  | Instagram((string, int)) /* 1 argument - happens to be a 2-tuple */;
```
### Variants Must Have constructors

If you come from an untyped language, you might be tempted to try `type foo = int | string`. This isn't possible in Reason; you'd have to give each branch a constructor: `type foo = Int(int) | String(string)`. Though usually, needing this might be an anti-pattern. The Design Decisions section below explains more.

### Interop with JavaScript

_This section assumes knowledge about BuckleScript's [FFI](https://bucklescript.github.io/docs/en/interop-overview.html). Skip this if you haven't felt the itch to use variants for wrapping JS functions yet_.

Quite a few JS libraries use functions that can accept many types of arguments. In these cases, it's very tempting to model them as variants. For example, suppose there's a `myLibrary.draw` JS function that takes in either a `number` or a `string`. You might be tempted to bind it like so:

```reason
/* reserved for internal usage */
[@bs.module "myLibrary"] external draw : 'a => unit = "draw";

type animal =
  | MyFloat(float)
  | MyString(string);

let betterDraw = (animal) =>
  switch (animal) {
  | MyFloat(f) => draw(f)
  | MyString(s) => draw(s)
  };
```

You could definitely do that, but there are better ways! For example, simply two `external`s that both compile to the same JS call:

```reason
[@bs.module "myLibrary"] external drawFloat : float => unit = "draw";
[@bs.module "myLibrary"] external drawString : string => unit = "draw";
```

BuckleScript also provides [a few other ways](https://bucklescript.github.io/docs/en/function.html#modeling-polymorphic-function) to do this.

### Variant Types Are Found By Field Name

Please refer to this [record section](record.md#record-types-are-found-by-field-name). Variants are the same: a function can't accept an arbitrary constructor shared by two different variants. Again, such feature exists, it's called a polymorphic variant. We'll talk about this in the future =).

## Design Decisions

Variants, in their many forms (polymorphic variant, open variant, GADT, etc.), are likely _the_ feature of a type system such as Reason's. The aforementioned `option` variant, for example, obliterates the need for nullable types, a major source of bugs in other languages. Philosophically speaking, a problem is composed of many possible branches/conditions. Mishandling these conditions is the majority of what we call bugs. **A type system doesn't magically eliminate bugs; it points out the unhandled conditions and asks you to cover them**\*. The ability to model "this or that" correctly is crucial.

For example, some folks wonder how the type system can safely eliminate badly formatted JSON data from propagating into their program. They don't, not by themselves! But if the parser returns the `option` type `None | Some(actualData)`, then you'd have to handle the `None` case explicitly in later call sites. That's all there is.

Performance-wise, a variant can potentially tremendously speed up your program's logic. Here's a piece of JavaScript:

```js
let data = 'dog';
if (data === 'dog') {
  ...
} else if (data === 'cat') {
  ...
} else if (data === 'bird') {
  ...
}
```

There's a linear amount of branch checking here (`O(n)`). Compare this to using a Reason variant:

```reason
type animal = Dog | Cat | Bird;
let data = Dog;
switch (data) {
| Dog => ...
| Cat => ...
| Bird => ...
}
```

The compiler sees the variant, then

1. conceptually turns them into `type animal = 0 | 1 | 2`
2. compiles `switch` to a constant-time format (`O(1)`).

You might wonder why typed functional languages are used so often for parsing; switching on a large tree efficiently and safely is pretty much the best-case scenario for variants.

<!-- TODO: playground link -->

Mind blown yet? Variants have a deep connection to other fields of mathematics; [See here](https://codewords.recurse.com/issues/three/algebra-and-calculus-of-algebraic-data-types) for an interesting exploration.

\* It's always nicer to design away the problem rather than resorting to a type system to cover the pitfalls; In reality, it's unrealistic to do so for every problem, or even just to understand every problem fully in order to design a solution. A type system allows you to safely make a big category of changes to codebases without needing to understand the whole thing upfront. This is great for guided exploration. In this regard, types also allow us not needing to overly design an API just to circumvent callers' simple pitfalls. They reduce the layers of abstractions needed to "get things done", which in return reduces callers' cognitive burden.
