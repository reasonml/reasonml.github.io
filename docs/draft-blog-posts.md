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
