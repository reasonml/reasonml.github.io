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

## Pattern matching Design Decisions

The notorious [fizzbuzz problem](https://en.wikipedia.org/wiki/Fizz_buzz#Programming_interviews) strangely trips up some people, partially due its nature of paralyzing the programmer who hopes to simplify/unify the few condition branches in search of elegance where there's none. Hopefully you can see that usually, pattern-matching's
 visual conciseness [allows us to overcome decision paralysis](/try.html?reason=PQKgBAQghgzgpgEzAewHZgBYBcsAcYBcwwATsvDlAMbIJwB0yJA5sAO4CWA1h8AGIcAXoIgBXYQGIA8gGEoAWwA2YEMABQiuFjAAzIYIBG4wWAC8YABQcAlGYB8asGBicsVDJY5h5tMAGYAGjAvHyQAVlsAb0cwAB9LAAYghNtTOzAAIgFhMWEMmPiLJLAAfVT0rP18p0KS5PLM3MFquNL7ZywSDlRmEuQdEu6sK2sYgF8AbjU1HSZPYPQARjA
sZDBFhJSwaKcAKRh6RWRmCz1hI2ER0cmgA), while keeping all the benefits (and more, as you've seen) of a bunch of brute-forced `if-else`s. There's really nothing wrong with explicitly listing out all the possibilities; Pattern matching corresponds to **case analysis** in math, a valid problem-solving technique that proves to be extremely
 convenient.

Using a Reason `switch` for the first time might make you feel like you've been missing out all these years. Careful, for it might ruin other languages for you =).

If you've tried to refactor a big, nested if-else logic, you might realize it's very hard to get the logic right. On the other hand, pattern matching + tuple conceptually maps to a 2D table, where each cell can be independently filled. This ensures that whenever you need to add a case in the `switch`, you can target that and only th
at table cell, without messing other cells up.

```reason
type animal = Dog | Cat | Bird;
let result = switch (isBig, myAnimal) {
| (true, Dog) => 1
| (true, Cat) => 2
| (true, Bird) => 3
| (false, Dog | Cat) => 4
| (false, Bird) => 5
};
```

isBig \ myAnimal | Dog | Cat | Bird
-----------------|-----|-----|------
true             |  1  |  2  |  3
false            |  4  |  4  |  5

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

## Type Design Decisions

Reason's type system is the crystallization of decades of research and engineering. Here are a few highlights:

- **Types can be inferred**. The type system deduces the types for you even if you don't manually write them down. This speeds up the prototyping phase. Additionally, editor features like [VSCode's codelens](https://github.com/jaredly/reason-language-server) in our editor integrations show you all the types while you write code.

- **The type coverage is always 100%**. We don't need a "type coverage" tool! Every piece of Reason code has a type.

- **The type system is completely "sound"**. This means that, as long as your code compiles fine, every type guarantees that it's not lying about itself. In a conventional, best-effort type system, just because the type says it's e.g. "an integer that's never null", doesn't mean it's actually never null. In contrast, a pure Reason program has no null bugs.

Many folks who come from a gradually typed community (for example, having experienced using a type system on top of JavaScript, Ruby, Python, etc.) don't understand the fuss about Reason's types "soundness". In reality, there's a big difference between these type systems that are "best effort", aka 99.9% correct, and our type system that's "sound", aka 100% correct.

Many claim that "99% is good enough". While this could be true in other domains, such claim isn't very valid for code. **Naive probability**: If your code has 100 types, 99.9% probability of correctness per type means that overall, that code's correctness is `99.9% ^ 100 = 90.4%`

Oops. That's potentially lots of false positives in the system's reported types now. Which ones are wrong though? That type system sure isn't telling you ¯\\\_(ツ)\_/¯.

### Part 2

A type system allowing type argument is basically allowing type-level functions. `list(int)` is really the `list` type function taking in the `int` type, and returning the final, concrete type you'd use in some places. You might have noticed that in other languages, this is more or less called "generics". For example, `ArrayList<Integer>` in Java.

[The principle of least power](https://en.wikipedia.org/wiki/Rule_of_least_power) applies when you're trying to "Get Things Done". If the problem domain allows, definitely pick the least abstract (aka, the most concrete) solution available, so that the solution is reached faster and has fewer unstable indirections you'd have to traverse. For example, prefer types over free-form data, prefer data-driven configuration over turing-complete function calls, prefer function calls over macros, prefer macros over project forks, etc. When you constrain your domain and power, things become easier to analyze. That is, _if_ the domain is constrained enough to allow it.

When a type system is an all-encompassing aspect of your program, we need to make sure we leave enough power in order not to overly constrain your expressiveness; without "type functions", you'd end up with quite a bit of boilerplate, e.g. hard-coded `listOfInt`, `listOfString`, `listOfArrayOfFloat`, their respective helper functions, etc. However, please also make sure you don't overly abuse the power given to you through a rather powerful type system. Sometimes, it's fine to write a _little_ bit of boilerplate to reduce the need for otherwise extra powerful types. If anything, tasteful tradeoffs might show your pragmatism and judgement more than fancy types!
