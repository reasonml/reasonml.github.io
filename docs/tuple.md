---
title: Tuple
---

Tuples are like JavaScript arrays:

- ordered collection of items
- **compile to JavaScript arrays**

But on the Reason side, they're also different than JS arrays. They're:

- immutable
- fix-sized at creation time
- heterogeneous (can contain different types of values)

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let ageAndName = (16, "Lil' Reason");
let my3dCoordinates = (20.0, 30.5, 100.0);
```
<!--Output-->
```js
var ageAndName = /* tuple */[16, "Lil' Reason"];
var my3dCoordinates = /* tuple */[20.0, 30.5, 100.0];
```
<!--END_DOCUSAURUS_CODE_TABS-->

Because tuples turn into JavaScript arrays, when you receive an existing JS array from the JS side of your codebase, you can also model it as a tuple on the Reason side, providing that said array have the characterics above (fixed-sized, potentially heterogenous, etc.).

Like most of Reason, you don't have to write down the tuple's type signature. If you want to, here's the syntax:

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let ageAndName: (int, string) = (24, "Lil' Reason");

type coord3d = (float, float, float); /* a type alias for a tuple */
let my3dCoordinates: coord3d = (20.0, 30.5, 100.0);
```
<!--Output-->
```js
var ageAndName = /* tuple */[16, "Lil' Reason"];
var my3dCoordinates = /* tuple */[20.0, 30.5, 100.0];
```
<!--END_DOCUSAURUS_CODE_TABS-->


**Note**: there's no tuple of size 1. You'd just use the value itself.

## Usage

Unlike Reason and JS Arrays, you don't access a tuple through the indexing operator, e.g. `myTuple[0]`. Generally, you'd access the items through destructuring (described later in the sidebar):

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let my3dCoordinates = (20.0, 30.5, 100.0);
let (_, y, _) = my3dCoordinates; /* now you've retrieved y */
```
<!--Output-->
```js
var my3dCoordinates = /* tuple */[20.0, 30.5, 100.0];
var y = 30.5;
```
<!--END_DOCUSAURUS_CODE_TABS-->

The `_` means you're ignoring those other members of the tuple.

This is slightly inconvenient if you constantly access a tuple's nth item (which should be rare). You can write your own helper function for accessing the nth item of a tuple in that case.

Tuples aren't meant to be updated mutatively; you'd instead pull out the old one's relevant values and stuff them into a new tuple.

## Tips & Tricks

You'd use tuples in handy situations that pass around multiple values without too much ceremony. For example, to return many values:

```reason
let getCenterCoordinates = () => {
  let x = doSomeOperationsHere();
  let y = doSomeMoreOperationsHere();
  (x, y)
};
```

Or to "pattern-match" (covered later) on the conjunction of possibilities:

```reason
switch (isWindowOpen, isDoorOpen) { /* this is a 2-tuple */
| (true, true) => ...
| (true, false) => ...
| (false, true) => ...
| (false, false) => ...
}
```

Try to keep the usage of tuple **local**. For data structures that are long-living and passed around often, prefer a **record**, which has named fields.

A tuple type might also be called a "product type", and `(string, int)` is written as `string * int` in some places. The idea is that a tuple is really a "cartesian product"; imagine a 2D grid, with `string` on the x axis and `int` on the y axis!

The combination of tuple + `switch` is very powerful and concise, and **wipes out an entire category of bugs**. Together, they cleanly list out all the possible combinations of values. A tuple of type `(bool, bool)` indeed has `2 * 2 = 4` possibilities, and the type system asks you to cover all 4. This lends itself well to code refactors; instead of informally adding a few if-else on arbitrary values here and there, you can directly pinpoint the exact `switch` branch you need to alter, no more and no less.

## Design Decisions

The existence of tuples might seem odd for those coming from untyped languages. "Why not just use an array?"

A type system isn't all-powerful, nor should it be; some tasteful trade-offs need to be applied in order to keep the language simple, performant (both compilation and running speed) and easy to understand. Reason lists, for example, are more flexible in size; they can be concatenated, appended, sliced, etc. In return, they need to be homogenous (can only contain a single type of value per list), and random index access on them might not always be valid*. Tuple, on the other hand, through its constraint on size, is faster, gives the type system the leeway to exhaustively track all its items' types, and guarantees safe access. In general, you'll notice a few prominent, tasteful tradeoffs in a type system: record fields are fixed but can be heterogenous, while a map's fields are flexible but homogenous, etc.

A Reason tuple is typed "structurally". This means that even if you don't annotate your data with an explicit type, the compiler can still deduce it by looking at its content, its usage, etc. As long as the declarations and the usages' inferred shapes match up, you're all good!

\* It's not that the Reason type system cannot accept heterogenous, dynamically-sized lists; it actually can in some circumstances, but making such feature the default increases both the first-time learning overhead and the understandability of code. Just because the types can accomplish it doesn't mean it's always a good idea to let some pieces of code grow unboundedly complex!
