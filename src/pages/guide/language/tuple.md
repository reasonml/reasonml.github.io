---
title: Tuple
order: 50
---

Tuples are

- immutable
- ordered
- fix-sized at creation time
- heterogeneous (can contain different types of values)

```reason
let ageAndName = (24, "Lil' Reason");
let my3dCoordinates = (20.0, 30.5, 100.0);
```

Tuples' types can be used in type annotations as well. Tuple types visually resemble tuples values.

```reason
let ageAndName: (int, string) = (24, "Lil' Reason");
/* a tuple type alias */
type coord3d = (float, float, float);
let my3dCoordinates: coord3d = (20.0, 30.5, 100.0);
```

**Note**: there's no tuple of size 1. You'd just use the value itself.

### Usage

The standard library provides `fst` and `snd` ([here](/api/Pervasives.html), under "Pair operations"), convenience functions that allow you to access the first and second element of a 2-tuple. Generally, you'd access n-tuple members through destructuring (described later in the sidebar):

```reason
let (_, y, _) = my3dCoordinates; /* now you've retrieved y */
```

The `_` means you're ignoring the indicated members of the tuple.

Tuples aren't meant to be updated mutatively; you'd create new ones by destructuring the old ones.

### Tips & Tricks

You'd use tuples in handy situations that pass around multiple values without too much ceremony. For example, to return many values:

```reason
let getCenterCoordinates () => {
  let x = doSomeOperationsHere ();
  let y = doSomeMoreOperationsHere ();
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

### Design Decisions

Tuple's existence might seem odd for those coming from untyped languages. "Why not just use a list/array?"

A type system isn't all-powerful, nor should it be; some tasteful trade-offs need to be applied in order to keep the language simple, performant (both compilation and running speed) and easy to understand. Reason lists, for example, are more flexible in size; they can be concatenated, appended, sliced, etc. In return, they need to be homogenous (can only contain a single type of value per list), and random index access on them might not always be valid*. Tuple, on the other hand, through its constraint on size, is faster, gives the type system the leeway to exhaustively track all its items' types, and guarantees safe access. In general, you'll notice a few prominent, tasteful tradeoffs in a type system: record fields are fixed but can be heterogenous, while a map's fields are flexible but homogenous, etc.

A Reason tuple is typed "structurally". This means that even if you don't annotate your data with an explicit type, the compiler can still deduce it by looking at its content, its usage, etc. As long as the declarations and the usages' inferred shapes match up, you're all good!

\* It's not that the Reason type system cannot accept heterogenous, dynamically-sized lists; it actually can (hint: GADT)! But making such feature the default increases both the first-time learning overhead and the understandability of code. Just because the types can accomplish it doesn't mean it's always a good idea to let some pieces of code grow unboundedly complex!
