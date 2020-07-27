---
title: Basic Structures
---

_Quick overview: [Basic Structures](overview.md#basic-structures)_

## List

Lists are immutable, dynamically sized, homogeneous, and ordered collections
of items. It is fast to add or remove elements from the front of a list, but
random access is slow.

Reason lists have a very basic singly-linked implementation.

```reason
let listA = [1, 2, 3];
```

Add to the front using the spread operator `...`:

```reason
let listB = [0, ...listA];
let listC = [-1, 0, ...listA];
```

Concatenate lists with the `@` operator:

```reason
let listD = listA @ listB @ [7, 8];
```

### Common Functions

- List Functions: [`module List`](https://reasonml.github.io/api/List.html)

#### Map

Map over a list to change items according to some function:

```reason
let doubled = List.map(i => i * 2, list);
```

#### Fold / Reduce

Fold over a list to reduce it to one value (which may be another collection):

```reason
let max = List.fold_left(
  (result, item) => item > result ? item : result,
  initialValue,
  list,
);
```

#### Reverse

```reason
let reversed = List.rev(list);
```

#### Length

- **Important:** This is an O(n) operation, be careful when using this function.
It is not constant time.

```reason
let n = List.length(list);
```

#### Is Empty

```reason
let isEmpty = list == [];
```

### Pattern Matching

[Pattern matching](pattern-matching.md) works with lists:

```reason
switch (list) {
| [first, second, ...rest] => "at least two"
| [first, ...rest] => "at least one"
| [] => "empty"
}
```

## Array

Arrays are a mutable, fixed sized, homogeneous, and ordered collection of items.
Random access on an array is fast, but changing the size of an array requires
recreating the entire structure.

```reason
let arrayA = [| 1, 2, 3 |];
```

Access elements using square brackets:

```reason
let first = arrayA[0];
let second = arrayA[1];
```

Update elements using assignment:

```reason
arrayA[2] = 23;
```

### Common Functions

- Array Functions: [`module Array`](https://reasonml.github.io/api/Array.html)

#### Map

Map over an array to change items according to some function:

```reason
let doubled = Array.map(i => i * 2, array);
```

#### Fold / Reduce

Fold over an array to reduce it to one value (which may be another collection):

```reason
let max = Array.fold_left(
  (result, item) => item > result ? item : result,
  initialValue,
  array,
);
```

#### Concatenate

```reason
let combined = Array.append(arrayA, arrayB);
let combined = Array.concat([arrayA, arrayB, arrayC]);
```

#### Length

- Unlike lists this is a constant time operation. It is safe to use anywhere.

```reason
let n = Array.length(array);
```

#### Dynamic Creation

```reason
let zeroes = Array.make(length, 0);
let squares = Array.init(length, i => i * i);
```

#### Conversion to List

```reason
let list = Array.to_list(array);
let array = Array.of_list(list);
```

### Pattern Matching

[Pattern matching](pattern-matching.md) works with arrays, but there is no
`...rest` syntax like lists have:

```reason
switch (array) {
| [||] => "empty"
| [| first |] => "exactly one"
| [| first, second |] => "exactly two"
| _ => "at least three"
};
```

## Tuple

Tuples are an immutable, constant sized, and heterogeneous collection of items.
They provide a way to group values together quickly.

```reason
let pair = (1, "hello");
let triple = ("seven", 8, '9');
```

Access specific items in a tuple using destructuring:

```reason
let (_, second) = pair;
let (first, _, third) = triple;
```

Or [pattern matching](pattern-matching.md) over a tuple:

```reason
switch (pair) {
| ("hello", name) => print_endline("Hello " ++ name);
| ("bye", name) => print_endline("Goodbye " ++ name);
| (command, _) => print_endline("Unknown command: " ++ command);
};
```

- _Note: If a tuple will have many items or be passed around often, then records
should be preferred._

## Records

Records are another basic structure that has named fields and heterogeneous
values. There is a dedicated article on records: [Records](record.md).
