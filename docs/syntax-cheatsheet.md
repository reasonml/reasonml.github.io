---
title: Syntax Cheatsheet
---

Here is the cheat sheet with some equivalents between JavaScript and Reason syntaxes:

### Variable

| JavaScript              | Reason                         |
|-------------------------|--------------------------------|
| `const x = 5;`          | `let x = 5;`                   |
| `var x = y;`            | No equivalent                  |
| `let x = 5; x = x + 1;` | `let x = ref(5); x := x^ + 1;` |

### String & Character

| JavaScript             | Reason                |
|------------------------|-----------------------|
| `"Hello world!"`       | Same                  |
| `'Hello world!'`       | Strings must use `"`  |
| Characters are strings | `'a'`                 |
| `"hello " + "world"`   | `"hello " ++ "world"` |

### Boolean

| JavaScript                                            | Reason                            |
|-------------------------------------------------------|-----------------------------------|
| `true`, `false`                                       | Same                              |
| `!true`                                               | Same                              |
| `&&`, `<=`, `>=`, `<`, `>`, <code>&#124;&#124;</code> | Same                              |
| `a === b`, `a !== b`                                  | Same                              |
| No deep equality (recursive compare)                  | `a == b`, `a != b`                |
| `a == b`                                              | No equality with implicit casting |

### Number

| JavaScript  | Reason                |
|-------------|-----------------------|
| `3`         | Same \*               |
| `3.1415`    | Same                  |
| `3 + 4`     | Same                  |
| `3.0 + 4.5` | `3.0 +. 4.5`          |
| `5 % 3`     | `5 mod 3`             |

\* JavaScript has no distinction between integer and float.

### Object/Record

| JavaScript          | Reason                                  |
|---------------------|-----------------------------------------|
| no static types     | `type point = {x: int, mutable y: int}` |
| `{x: 30, y: 20}`    | Same                                    |
| `point.x`           | Same                                    |
| `point.y = 30;`     | Same                                    |
| `{...point, x: 30}` | Same                                    |

### Array

| JavaScript            | Reason                             |
|-----------------------|------------------------------------|
| `[1, 2, 3]`           | <code>[&#124;1, 2, 3&#124;]</code>           |
| `myArray[1] = 10`     | Same                               |
| `[1, "Bob", true]` \* | `(1, "Bob", true)`                 |
| No immutable list     | `[1, 2, 3]`                        |

\* Tuples can be simulated in JavaScript with arrays, as JavaScript arrays can
contain multiple types of elements.

### Null

| JavaScript          | Reason                |
|---------------------|-----------------------|
| `null`, `undefined` | `None` \*             |

\* There are no nulls, nor null bugs in OCaml. But it does have [an option type](https://reasonml.github.io/docs/en/option) for when you actually need nullability.

### Function

| JavaScript                      | Reason                     |
|---------------------------------|----------------------------|
| `arg => retVal`                 | `(arg) => retVal`          |
| `function named(arg) {...}`     | `let named = (arg) => ...` |
| `const f = function(arg) {...}` | `let f = (arg) => ...`     |
| `add(4, add(5, 6))`             | Same                       |

#### Blocks

<table>
  <thead>
    <tr>
      <th>JavaScript</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
  <pre><code>const myFun = (x, y) => {
  const doubleX = x + x;
  const doubleY = y + y;
  return doubleX + doubleY
};</code></pre>
      </td>
      <td>
  <pre><code>let myFun = (x, y) => {
  let doubleX = x + x;
  let doubleY = y + y;
  doubleX + doubleY
};</code></pre>
      </td>
    </tr>
  </tbody>
</table>

#### Currying

| JavaScript                  | Reason                      |
|-----------------------------|-----------------------------|
| `let add = a => b => a + b` | `let add = (a, b) => a + b` |

Both JavaScript and Reason support currying, but Reason currying is **built-in and
optimized to avoid intermediate function allocation and calls**, whenever
possible.

### If-else

| JavaScript            | Reason                                                                                    |
|-----------------------|-------------------------------------------------------------------------------------------|
| `if (a) {b} else {c}` | Same                                                                                      |
| `a ? b : c`           | Same                                                                                      |
| `switch`              | `switch` but [with pattern matching](pattern-matching.md)                                 |

### Destructuring

| JavaScript                    | Reason                                        |
|-------------------------------|-----------------------------------------------|
| `const {a, b} = data`         | `let {a, b} = data`                           |
| `const [a, b] = data`         | <code>let [&#124;a, b&#124;] = data</code> \* |
| `const {a: aa, b: bb} = data` | `let {a: aa, b: bb} = data`                   |

\* This will cause the compiler to warn that not all cases are handled, because
`data` could be of length other than 2. Better switch to pattern-matching
instead.

### Loop

| JavaScript                            | Reason                         |
|---------------------------------------|--------------------------------|
| `for (let i = 0; i <= 10; i++) {...}` | `for (i in 0 to 10) {...}`     |
| `for (let i = 10; i >= 0; i--) {...}` | `for (i in 10 downto 0) {...}` |
| `while (true) {...}`                  | Same                           |

### JSX

| JavaScript                             | Reason                   |
|----------------------------------------|--------------------------|
| `<Foo bar=1 baz="hi" onClick={bla} />` | Same                     |
| `<Foo bar=bar />`                      | `<Foo bar />` \*         |
| `<input checked />`                    | `<input checked=true />` |
| No children spread                     | `<Foo>...children</Foo>` |

\* Note the argument punning when creating elements.

### Exception

| JavaScript                                | Reason                                       |
|-------------------------------------------|----------------------------------------------|
| `throw new SomeError(...)`                | `raise(SomeError(...))`                      |
| `try {a} catch (Err) {...} finally {...}` | <code>try (a) { &#124; Err =\> ...}</code> \*|

\* No finally.

### Blocks

In Reason, "sequence expressions" are created with `{}` and evaluate to their
last statement. In JavaScript, this can be simulated via an immediately-invoked
function expression (since function bodies have their own local scope).

<table>
  <thead>
    <tr>
      <th>JavaScript</th>
      <th>Reason               th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
  <pre><code>let res = (function() {
  const x = 23;
  const y = 34;
  return x + y;
})();</code></pre>
      </td>
      <td>
  <pre><code>let res = {
  let x = 23;
  let y = 34;
  x + y
};</code></pre>
      </td>
    </tr>
  </tbody>
</table>

### Comments

| JavaScript        | Reason                |
|-------------------|-----------------------|
| `/* Comment */`   | Same                  |
| `// Line comment` | Same                  |
