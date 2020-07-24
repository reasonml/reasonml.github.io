---
title: Draft Blog Posts
---

This article captures thoughts on design decisons from our old documentation.
These may find their way into a blog post at some point in the future, for now
they will live on this page.

## Record Design Decisions

After reading the constraints in the previous sections, and if you're coming from a dynamic language background, you might be wondering why one would bother with record in the first place instead of imitating JS and use a catch-all object concept for everything.

The reason is that JavaScript objects can be _really_ slow. Some code might add fieds, remove fields, iterate over them, pass the keys themselves somewhere else, etc. The JS engines nowadays try to "guess" your object's usage patterns and sometime optimize that into a solid C++ struct, but some other time fail to do so and convert your overly dynamic object into a hash map, with a sudden >100x performance degradation (imagine an object field access needing to hash the key and traverse the hashmap to find it).

We love simplicify, but a single all-powerful data structure that is the JS object is a bit too naive. This is why Reason separates the above use-cases into record, and proper hashmap (documented later). This way, you get to leverage the consistently fast record experience, like in the above immutable update section. Field access is also guaranteed to be super fast.

"But doesn't a Reason record compile to a JS object anyway"? Yes, but those records will trigger the JS engines' optimistic object optimizations, since they see that you never tried to e.g. add or remove record fields, iterate through the keys, etc., and therefore they'll never transform your those compiled JS objects into C++ hash maps or other slow data structures. Basically, Reason's type system enforced the disciplined usage of this data structure so that you can guarantee that it will never be accidentally slow.

(And yes, we're aware that it's comical for a language feature to transform into a dynamic-looking JS object, then transformed again by the JS engines into a C++ struct, then end up where we started in the first place. Such is modern engineering.)


## Block Scope Design Decisions

Bindings can be scoped through `{}`.

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let message = {
  let part1 = "hello";
  let part2 = "world";
  part1 ++ " " ++ part2
};
/* `part1` and `part2` not accessible here! */
```
<!--Output-->
```js
var message = "hello world";
```
<!--END_DOCUSAURUS_CODE_TABS-->

The value of the last line of a scope is implicitly returned.

### Design Decisions

Reason's `if`, `while` and functions all use the same block scoping. The code below works **not** because of some special "if scope"; but simply because it's the same scope syntax and feature you just saw:

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
if (displayGreeting) {
  let message = "Enjoying the docs so far?";
  Js.log(message)
};
/* `message` not accessible here! */
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Strings Tips & Tricks

You probably don't need to use strings as much as you did! https://twitter.com/jusrin00/status/875238742621028355

In other languages, you'd often overload the meaning of string by using it as:

- a unique id: `var BLUE_COLOR = "blue"`
- an identifier into a data structure: `var BLUE = "blue"; var RED = "red"; var colors = [BLUE, RED]`
- the name of an object field: `person["age"] = 24`
- an enum: `if (audio.canPlayType() === 'probably') {...}` [(ಠ_ಠ)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canPlayType#Return_value)
- other crazy patterns you'll soon find horrible, after getting used to Reason's alternatives.

The more you overload the poor string type, the less the type system (or a teammate) can help you! Reason provides concise, fast and maintainable types & data structures alternatives to the use-cases above (e.g. variants, in a later section).

Under native compilation, Reason strings compile to a simple representation whose performance is straightforward to analyze, at the expense of sometimes requiring manual performance tuning. For example, naively concatenating strings like `"hi " ++ "how " ++ "are " ++ "you?"` unnecessarily allocates the intermediate strings `"are you?"` and `"how are you?"` (though it might be optimized into a single string in these simple cases). In this case, prefer [`String.concat`](/api/String.html). In a way, it's somewhat nice that the traditional runtime analysis we've learned in school can finally be useful again.

Under JavaScript compilation, a Reason string maps to a JavaScript string and vice-versa, so no such above concern or analysis opportunities apply.

## Tuples

### Tips & Tricks

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

### Design Decisions

The existence of tuples might seem odd for those coming from untyped languages. "Why not just use an array?"

A type system isn't all-powerful, nor should it be; some tasteful trade-offs need to be applied in order to keep the language simple, performant (both compilation and running speed) and easy to understand. Reason lists, for example, are more flexible in size; they can be concatenated, appended, sliced, etc. In return, they need to be homogenous (can only contain a single type of value per list), and random index access on them might not always be valid*. Tuple, on the other hand, through its constraint on size, is faster, gives the type system the leeway to exhaustively track all its items' types, and guarantees safe access. In general, you'll notice a few prominent, tasteful tradeoffs in a type system: record fields are fixed but can be heterogenous, while a map's fields are flexible but homogenous, etc.

A Reason tuple is typed "structurally". This means that even if you don't annotate your data with an explicit type, the compiler can still deduce it by looking at its content, its usage, etc. As long as the declarations and the usages' inferred shapes match up, you're all good!

\* It's not that the Reason type system cannot accept heterogenous, dynamically-sized lists; it actually can in some circumstances, but making such feature the default increases both the first-time learning overhead and the understandability of code. Just because the types can accomplish it doesn't mean it's always a good idea to let some pieces of code grow unboundedly complex!
