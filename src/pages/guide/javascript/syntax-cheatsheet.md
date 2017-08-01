---
title: Syntax Cheatsheet
order: 1
---

We've worked very hard to make Reason look like JS while preserving OCaml's great semantics & types. Hope you enjoy it!

### Let Binding

JavaScript                |   Reason
--------------------------|--------------------------------
`const x = 5;`              |  `let x = 5;`
`var x = y;`                |  No equivalent (thankfully)
`let x = 5; x = 6;`         |  `let x = ref 5; x := 6;`

### String & Char

JavaScript                |   Reason
--------------------------|--------------------------------
`"Hello world!"`            |  Same
`'Hello world!'`            |  Strings must use `"`
Characters are strings      |  `'a'`
`"hello " + "world"`        |  `"hello " ^ "world"`

### Boolean

JavaScript                |   Reason
--------------------------|--------------------------------
`true`, `false`                      |  `true`, `false` \*
`!true`                              |  `not true`
`||`, `&&`, `<=`, `>=`, `<`, `>`     |  Same
`a === b`, `a !== b`                 |  Same
No deep equality (recursive compare) |  `a == b`, `a != b`
`a == b`                             |  No equality with implicit casting (thankfully)

\* This is the Reason spiritual equivalent; it doesn't mean it compiles to JS' `true`/`false`! To compile to the latter, use `Js.true_`/`Js.false_`. See [here](/guide/language/boolean#usage).

### Number

JavaScript                |   Reason
--------------------------|--------------------------------
`3`                         |  Same \*
`3.1415`                    |  Same
`3 + 4`                     |  Same
`3.0 + 4.5`                 |  `3.0 +. 4.5`

\* JS has no distinction between integer and float.

### Object/Record

JavaScript                |   Reason
--------------------------|--------------------------------
no static types           |  `type point = {x: int, mutable y: int};`
`{x: 30, y: 20}`          |  Same \*
`point.x`                 |  Same
`point.y = 30;`           |  Same
`{...point, x: 30}`       |  Same

\* This is the Reason spiritual equivalent; it doesn't mean it compiles to JS' object! To compile to the latter, see [here](/guide/language/object#tip--tricks).

### Array

JavaScript                |   Reason
--------------------------|--------------------------------
`[1, 2, 3]`               |  `[|1, 2, 3|]`
`myArray[1] = 10`         |  `myArray.(1) = 10`
No tuple                  |  `(1, 2, 3)`
No immutable list         |  `[1, 2, 3]`

### Null

JavaScript                |   Reason
--------------------------|--------------------------------
`null`, `undefined`       |  `None` \*

\* Again, only a spiritual equivalent; Reason doesn't have nulls, nor null bugs!

### Function

JavaScript                            |   Reason
--------------------------------------|--------------------------------
`arg => retVal`                       |  `fun arg => retVal`
`function named(arg) {...}`           |  `fun named arg => ...`
`const f = function named(arg) {...}` |  `let f = fun named arg => ...`
`add(4, add(5, 6))`                   |  `add 4 (add 5 6)`

#### Blocks

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
const myFun = (x, y) => {
  const doubleX = x + x;
  const doubleY = y + y;
  return doubleX + doubleY
};</pre>
    </td>
    <td>
      <pre>
let myFun = fun x y => {
  let doubleX = x + x;
  let doubleY = y + y;
  doubleX + doubleY
};</pre>
    </td>
  </tr>
</table>

#### Currying

JavaScript                |   Reason
--------------------------|--------------------------------
`let add = a => b => a + b`       |  `let add a b => a + b`

Both JavaScript and Reason support currying, but Reason currying is **built-in and optimized to avoids intermediate function allocation & calls**, whenever possible.

### If-else

JavaScript                |   Reason
--------------------------|--------------------------------
`if (a) {b} else {c}`     |  Same \*
`a ? b : c`               |  Same
`switch`                  |  `switch` but [not the same at all](/guide/language/pattern-matching)

\* Reason conditionals are always expressions!

### Destructuring

JavaScript                |   Reason
--------------------------|--------------------------------
`const {a, b} = data`             |  `let {a, b} = data`
`const [a, b] = data`             |  `let [|a, b|] = data` \*
`const {a: aa, b: bb} = data`     |  `let {a: aa, b: bb} = data`

\* Gives good compiler warning that `data` might not be of length 2. Switch to pattern-matching instead.

### Loop

JavaScript                |   Reason
--------------------------|--------------------------------
`for (let i = 0; i <= 10; i++) {...}`             |  `for i in 0 to 10 {...}`
`for (let i = 10; i >- 0; i--) {...}`             |  `for i in 10 downto 0 {...}`
`while (true) {...}`                              |  Same

### JSX

JavaScript                |   Reason
--------------------------|--------------------------------
`<Foo bar=1 baz="hi" onClick={bla} />`  |  `<Foo bar=1 baz="hi" onClick=(bla) />`
`<Foo bar=bar />`                       |  `<Foo bar />`
`<input checked />`                     |  `<input checked=true />`

### Exception

JavaScript                |   Reason
--------------------------|--------------------------------
`throw new SomeError(...)`  |  `raise (SomeError ...)`
`try (a) {...} catch (Err) {...} finally {...}`   |  `try (a) { | Err => ...}` \*

\* No finally.

### Blocks

In Reason, "sequence expressions" are created with `{}` and evaluate to their last statement. In JavaScript, this can be simulated via a temporary variable which must be created in an invalid state, then later mutated.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let res = undefined;
{
  const x = 23;
  const y = 34;
  res = x + y;
};</pre>
    </td>
    <td>
      <pre>
let res = {
  let x = 23;
  let y = 34;
  x + y
};</pre>
    </td>
  </tr>
</table>

