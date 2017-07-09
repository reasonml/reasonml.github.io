---
title: More on Functions
order: 6
---

#### Recursive Functions

By default, values can't see a binding that points to it, but including the
`rec` keyword in a `let` binding makes this possible. This allows functions
to see and call themselves, giving us the power of recursion.

```reason
let rec neverTerminate = fun () => neverTerminate ();
```

#### Mutually Recursive Functions

Mutually recursive functions start like a single recursive function using the
`rec` keyword, and then are chained together with `and`:

```reason
let rec callSecond = fun () => callFirst ()
and callFirst = fun () => callSecond ();
```

**Note** that there's no semicolon ending the first line and no `let` on the second line.

#### Currying

Reason functions can automatically be **partially** called:

```reason
let add = fun x y => x + y;
let addFive = add 5;
let eleven = addFive 6;
let twelve = addFive 7;
```

Actually, the above `add` is nothing but syntactic sugar for this:

```reason
let add = fun x => fun y => x + y;
```

OCaml optimizes this to avoid the unnecessary function allocation (2 functions here, naively speaking) whenever it can! This way, we get

- Nice syntax
- Currying for free (every function takes a single argument, actually!)
- No performance cost
