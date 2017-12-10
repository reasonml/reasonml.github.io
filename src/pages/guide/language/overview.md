---
title: Overview
order: 0
---

```playground:reason
let rec hanoi n a b c =>
  if (n > 0) {
    hanoi (n - 1) a c b;
    Js.log {j|Move disk from pole $a to pole $b|j};
    hanoi (n - 1) c b a
  };
  
let () =
  hanoi 4 1 2 3;
```

Primitive                             | Example
--------------------------------------|--------------------------------
Strings                               |  `"Hello"`
Characters                            |  `'x'`
Integers                              |  `23`, `-23`
Floats                                |  `23.0`, `-23.0`
Integer Addition                      |  `23 + 1`
Float Addition                        |  `23.0 +. 1.0`
Integer Division/Multiplication       |  `2 / 23 * 1`
Float Division/Multiplication         |  `2.0 /. 23.0 *. 1.0`
Float Exponentiation                  |  `2.0 ** 2.0`
String Concatenation                  |  `"Hello " ++ "World"`
Comparison                            |  `>`, `<`, `>=`, `=<`
Boolean operations                    |  `!`, `&&`, `||`
Reference, Physical (deep) Equality   |  `===`, `==`
Immutable Lists                       |  `[1, 2, 3]`
Immutable Prepend                     |  `[item1, item2, ...theRest]`
Arrays                                |  `[|1, 2, 3|]`
Records                               |  `type player = {score: int}; {score: 100}`
Comments                              |  `/* Comment here */`
