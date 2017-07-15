---
title: Types
order: 1
---

#### Type Annotations

Types can be inferred or explicitly written down by choice.

```reason
let score: int = 10;
```

You can also wrap an expression in parentheses and annotate it:

```reason
let myInt = 5;
let myInt = (5 : int);
let myInt = (5 : int) + (4 : int);
let add (x: int) (y: int) :int => x + y;
let drawCircle radius::(r: int) :unit => ...; /* radius::(r: int) is a labeled argument. More on this [here](https://reasonml.github.io/guide/language/functions) */
```

#### Type Aliases

You can refer to a type by a different name:

```reason
type scoreType = int;
let x: scoreType = 10;
```
