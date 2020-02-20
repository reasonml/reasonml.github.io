---
title: Overview
---

Feature                         | Example                              | JavaScript Output
--------------------------------|--------------------------------------|----------------------
String                          | `"Hello"`                            | `"Hello"`
Character                       | `'x'`                                | `"x"`
Integer                         | `23`, `-23`                          | `23`, `-23`
Float                           | `23.0`, `-23.0`                      | `23.0`, `-23.0`
Integer Addition                | `23 + 1`                             | `23 + 1`
Float Addition                  | `23.0 +. 1.0`                        | `23.0 + 1.0`
Integer Division/Multiplication | `2 / 23 * 1`                         | `2 / 23 * 1`
Float Division/Multiplication   | `2.0 /. 23.0 *. 1.0`                 | `2.0 / 23.0 * 1.0`
Float Exponentiation            | `2.0 ** 3.0`                         | `Math.pow(2, 3)`
String Concatenation            | `"Hello " ++ "World"`                | `"Hello " + "World"`
Comparison                      | `>`, `<`, `>=`, `<=`                 | `>`, `<`, `>=`, `<=`
Boolean operation               | `!`, `&&`, <code>&#124;&#124;</code> | `!`, `&&`, <code>&#124;&#124;</code>
Shallow and deep Equality       | `===`, `==`                          | `===`, `==`
List                            | `[1, 2, 3]`                          | `[1, [2, [3, 0]]]`
List Prepend                    | `[a1, a2, ...theRest]`               | `[a1, [a2, theRest]]`
Array                           | <code>[&#124;1, 2, 3&#124;]</code>   | <code>[1, 2, 3]</code>
Record                          | `type t = {b: int}; let a = {b: 10}` | `var a = {b: 10}`
Multiline Comment               | `/* Comment here */`                 | Not in output
Single line Comment             | `// Comment here`                    | Not in output
