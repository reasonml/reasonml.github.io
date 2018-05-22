---
title: Pattern Matching!
---

_Make sure you've read up on [Variant](variant.md) first_.

**We're finally here**! Pattern matching is one of _the_ best features of the language. It's like destructuring, but comes with even more help from the type system.

## Usage

Consider a variant:

```reason
type payload =
  | BadResult(int)
  | GoodResult(string)
  | NoResult;
```

While using the `switch` expression on it, you can "destructure" it:

```reason
let data = GoodResult("Product shipped!");

let message =
  switch (data) {
  | GoodResult(theMessage) => "Success! " ++ theMessage
  | BadResult(errorCode) => "Something's wrong. The error code is: " ++ string_of_int(errorCode)
  };
```

Notice how we've destructured `data` while handling each different case. The above `switch` will give you a compiler warning:

```
Warning 8: this pattern-matching is not exhaustive.
Here is an example of a value that is not matched:
NoResult
```

Isn't that great? While matching on the shape of your data, the type system warned of an unhandled case. This **conditional** aspect is what makes it pattern matching rather than plain destructuring. Most data structures with an "**if this then that**" aspect work with it:

```reason
switch (myList) {
| [] => print_endline("Empty list")
| [a, ...theRest] => print_endline("list with the head value " ++ a)
};

switch (myArray) {
| [|1, 2|] => print_endline("This is an array with item 1 and 2")
| [||] => print_endline("This array has no element")
| _ => print_endline("This is an array")
};
```

The `_` case is a special fall-through case that allows all unmatched conditions to go to that branch.

You can even switch on string, int and others. You can even have many patterns going to the same result!

```reason
let reply =
  switch (message) {
  | "Reason's pretty cool" => "Yep"
  | "good night" => "See ya!"
  | "hello" | "hi" | "heya" | "hey" => "hello to you too!"
  | _ => "Nice to meet you!"
  };
```

Combined with other data structures, pattern matching can produce extremely concise, compiler-verified, performant code:

```reason
let message =
  switch (data) {
  | GoodResult(theMessage) => "Success! " ++ theMessage
  | BadResult(0 | 1 | 5) => "Something's wrong. It's a server side problem."
  | BadResult(errorCode) => "Unknown error occurred. Code: " ++ string_of_int(errorCode)
  | NoResult => "Things look fine"
  };
```

**Note**: you can only pass literals (i.e. concrete values) as a pattern, not let-binding names or other things. The following doesn't work as expected:

```reason
let myMessage = "Hello";
switch (greeting) {
| myMessage => print_endline("Hi to you")
};
```

Instead, it'd assume you're matching on any string, and binding that to the name `myMessage` in that `switch` case, which is not what you wanted.

### When clauses

When you really need to use arbitrary logic with an otherwise clean pattern match, you can slip in some `when` clauses, which are basically `if` sugar:

```reason
let message =
  switch (data) {
  | GoodResult(theMessage) => ...
  | BadResult(errorCode) when isServerError(errorCode) => ...
  | BadResult(errorCode) => ... /* otherwise */
  | NoResult => ...
  };
```

### Match on Exceptions

If the function throws an exception (covered later), you can also match on _that_, in addition to the function's normally returned values.

```reason
switch (List.find((i) => i === theItem, myItems)) {
| item => print_endline(item)
| exception Not_found => print_endline("No such item found!")
};
```

### Nested Patterns

Nested `|` work as intended:

```reason
switch (student) {
| {name: "Jane" | "Joe"} => ...
| {name: "Bob", Job: Programmer({fullTime: Yes | Maybe})} => ...
};
```

### Patterns Everywhere

You can put a pattern anywhere you'd put a normal "variable declaration":

```reason
type leftOrRight =
  | Left(int)
  | Right(int);

let i = Left(1);

/* magic! */
let Left(v) | Right(v) = i;
```

## Tips & Tricks

**Flatten your pattern-match whenever you can**. This is a real bug remover. Example below.

Do not abuse the fall-through `_` case too much. This prevents the compiler from telling you that you've forgotten to cover a case (exhaustiveness check), which would be especially helpful after a refactoring where you add a new case to a variant. Try only using `_` against infinite possibilities, e.g. string, int, etc.

Here's a series of examples, from worst to best:

```reason
let optionBoolToBool = opt =>
  if (opt == None) {
    false;
  } else if (opt == Some(true)) {
    true;
  } else {
    false;
  };
```

Now that's just silly =). Let's turn it into pattern-matching:

```reason
let optionBoolToBool = opt =>
  switch (opt) {
  | None => false
  | Some(a) => a ? true : false
  };
```

Slightly better, but still nested. Pattern-matching allows you to do this:

```reason
let optionBoolToBool = opt =>
  switch (opt) {
  | None => false
  | Some(true) => true
  | Some(false) => false
  };
```

Much more linear-looking! Now, you might be tempted to do this:

```reason
let optionBoolToBool = opt =>
  switch (opt) {
  | Some(true) => true
  | _ => false
  };
```

Which is much more concise, but kills the exhaustiveness check mentioned above. This is the best:

```reason
let optionBoolToBool = opt =>
  switch (opt) {
  | Some((true | false) as trueOrFalse) => trueOrFalse
  | None => false
  };
```

Pretty darn hard to make a mistake in this code at this point! Whenever you'd like to use an if-else with many branches, prefer pattern matching instead. It's more concise and [performant](variant.md#design-decisions) too.

See another example, with switch + tuple [here](tuple.md#tips-tricks).

## Design Decisions

The notorious [fizzbuzz problem](https://en.wikipedia.org/wiki/Fizz_buzz#Programming_interviews) strangely trips up some people, partially due its nature of paralyzing the programmer who hopes to simplify/unify the few condition branches in search of elegance where there's none. Hopefully you can see that usually, pattern-matching's visual conciseness [allows us to overcome decision paralysis](/try.html?reason=PQKgBAQghgzgpgEzAewHZgBYBcsAcYBcwwATsvDlAMbIJwB0yJA5sAO4CWA1h8AGIcAXoIgBXYQGIA8gGEoAWwA2YEMABQiuFjAAzIYIBG4wWAC8YABQcAlGYB8asGBicsVDJY5h5tMAGYAGjAvHyQAVlsAb0cwAB9LAAYghNtTOzAAIgFhMWEMmPiLJLAAfVT0rP18p0KS5PLM3MFquNL7ZywSDlRmEuQdEu6sK2sYgF8AbjU1HSZPYPQARjAsZDBFhJSwaKcAKRh6RWRmCz1hI2ER0cmgA), while keeping all the benefits (and more, as you've seen) of a bunch of brute-forced `if-else`s. There's really nothing wrong with explicitly listing out all the possibilities; Pattern matching corresponds to **case analysis** in math, a valid problem-solving technique that proves to be extremely convenient.

Using a Reason `switch` for the first time might make you feel like you've been missing out all these years. Careful, for it might ruin other languages for you =).

If you've tried to refactor a big, nested if-else logic, you might realize it's very hard to get the logic right. On the other hand, pattern matching + tuple conceptually maps to a 2D table, where each cell can be independently filled. This ensures that whenever you need to add a case in the `switch`, you can target that and only that table cell, without messing other cells up.

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
