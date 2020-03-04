---
title: Boolean
---

A boolean has the type `bool` and can be either `true` or `false`. Common operations:

- `&&`: logical and
- `||`: logical or
- `!`: logical not
- `<=`, `>=`, `<`, `>`
- `==`: physical equal, compares data structures deeply: `(1, 2) == (1, 2)` is `true`. Convenient, but use with caution
- `===`: referential equal, compares shallowly. `(1, 2) === (1, 2)` is `false`. `let myTuple = (1, 2); myTuple === myTuple` is `true`.
- `!=`: physical unequal
- `!==`: referential unequal

Reason booleans and their operations compile to the same JavaScript code you'd expect.

## Tips & Tricks

**Careful with physical equal**. They:

- Compare 2 values deeply, so incur accidental performance cost if not used carefully.
- Don't actually work intuitively in many cases, e.g. 2 floating numbers that look the same but have miniscule precision difference will look different for the physical equal, and 2 sets that have the same items might be physically different because of the items' order difference in the implementation.

Whenever possible, we suggest writing and using your own comparison function for custom data types to get full control over how the content of that data is compared.
