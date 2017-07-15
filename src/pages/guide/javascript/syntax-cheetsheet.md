---
title: Syntax cheetsheet
order: 1
---

Reason resembles a typed subset of modern JavaScript (the good parts).

`Reason`'s syntax is easy to learn, and if you know modern
`JavaScript` you can usually read and make sense of `Reason` code without
actually learning `Reason`.
The OCaml language that `Reason` uses provides many new concepts that
deliver a much more expressive, yet often more constrained experience. `Reason`
helps you learn those new concepts more quickly and reap the benefits of the
`OCaml` compiler sooner.


The end result is that `Reason`:

- Allows writing code that a wide range of developers can **easily read**.
- Can be **mastered quickly**.
- Delivers the true **"if it compiles, it works"** experience pioneered by the `ML` language.
- Compiles to **bare metal** native binaries, *or* to `JavaScript`.

### Basic Language Primitives

JavaScript                |   Reason
--------------------------|--------------------------------
<pre>3</pre>                         |  <pre>3</pre>
<pre>3.1415 </pre>                   |  <pre> 3.1415 </pre>
<pre>"Hello world!" </pre>           |  <pre>"Hello world!" </pre>
<pre>'Hello world!' </pre>           |  Strings must use "
Characters are strings               |  <pre>'a'  </pre>
<pre>true</pre>                      |  <pre>true </pre>
`[1,2,3]`                            |  `[1,2,3]`
<pre>null</pre>                      |  <pre>()</pre>
<pre>const x = y;</pre>              |  <pre>let x = y;</pre>
<pre>let x = y;</pre>                |  <pre>reference cells</pre>
<pre>var x = y;</pre>                |  No equivalent (thankfully)
`[x, ...lst] (linear time)`          | `[x, ...lst] (constant time)`
`[...lst, x] (linear time)`          | <pre>Not supported</pre>
<pre>{...obj, x: y}</pre>            | <pre>{...obj, x: y}</pre>


### Basic Operations on Primitives

JavaScript                         |   Reason
-----------------------------------|--------------------------------
<pre>1 + 2</pre>                   |  <pre>1 + 2</pre>
<pre>1.0 + 2.0 </pre>              |  <pre>1.0 +. 2.0 </pre>
<pre>"hello " + "world" </pre>     |  <pre>"hello " ^ "world" </pre>

### Objects and Records
JavaScript                |   Reason
--------------------------|--------------------------------
"Objects"                 |  "Records"
no static types           |  <pre>type point = {x: int, mutable y: int};</pre>
<pre>{x: 30, y: 20}</pre>          |  <pre>{x: 30, y: 20}</pre>
<pre>point.x</pre>                 |  <pre>point.x</pre>
<pre>point.y = 30;</pre>           |  <pre>point.y = 30;</pre>
<pre>{...point, x: 30}</pre>       |  <pre>{...point, x: 30}</pre>

### Blocks
In `Reason`, "sequence expressions" are created with `{}` and evaluate to their
last statement. In `JavaScript`, this can be simulated via a temporary variable
which must be created in an invalid state, then later mutated.

> <table>
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


### Lambdas

`JavaScript` has two different kinds of functions, whereas `Reason` only has one.

> JavaScript                            |   Reason
> --------------------------------------|--------------------------------
> <pre>arg => retVal  </pre>            |  <pre>fun arg => retVal</pre>
> <pre>function named(arg) {...}        |
> <pre>let f = function named(arg) {...}|



The primary difference between modern (ES6) `JavaScript` and `Reason` lambdas is that
`Reason` lambdas begin with the word `fun`. This is simply to assist in visual
understanding of the meaning of a function when it has a very large destructured
argument.

> JavaScript                        |   Reason
> ----------------------------------|--------------------------------
> <pre>const incr = x => x + 1;</pre>        |  <pre>let incr = fun x => x + 1;</pre>
> <pre>const five = incr(4);</pre>           |  <pre>let five = incr 4;</pre>
> <pre>const add = (x, y) => x+y;</pre>      |  <pre>let add = fun x y => x+y;</pre>
> <pre>const x = add(3, 4);</pre>            |  <pre>let x = add 3 4;</pre>
> <pre>const y = add(3, add(0, 1));</pre>    |  <pre>let y = add 3 (add 0 1);</pre>


Like `JavaScript`, `Reason` allows any expression on the right hand side of the
lambda `=>`.

> <table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
const add = (x, y) =>
  x + x + y + y;
      </pre>
    </td>
    <td>
      <pre>
let add = fun (x, y) =>
  x + x + y + y;
      </pre>
    </td>
  </tr>
</table>


However, `JavaScript` allows lambdas to return `{}` blocks *instead* of expressions, by way of a `return`
statement wrapped in `{}` braces. With `Reason`, `{}` blocks are *already* expressions, so `Reason` doesn't
require two modes for lambda - all lambdas in `Reason` have expressions on the right hand side of the `=>`,
and some of those expressions coincidentally resemble "function bodies" in `{}` braces.

> <table>
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
let myFun = fun (x, y) => {
  let doubleX = x + x;
  let doubleY = y + y;
  doubleX + doubleY
};</pre>
    </td>
  </tr>
</table>


When using `Reason` every function accepts a single argument. In this example,
that single argument happens to be a destructured tuple. This appears very
similar to the `JavaScript` arguments. However, the difference is apparent
when supplying those arguments as first class. In `JavaScript`, arguments
are an array, and supplying *all* of the arguments requires `.apply`.
In `Reason`, you may simply supply the tuple.

> <table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let add = (x, y) =>
  x + x + y + y;
let result = add (1, 2);
let myArgs = [1, 2];
let result = add.apply(null, myArgs);</pre>
    </td>
    <td>
      <pre>
let add = fun (x, y) =>
  x + x + y + y;
let result = add (1, 2);
let myArgs = (1, 2);
let result = add myArgs;</pre>
    </td>
  </tr>
</table>

### Function Application

In `Reason`, parentheses are typically optional in places where it is obvious
they aren't needed. This means that when invoking functions, parentheses
aren't always required around the argument. `Reason` will let you add the
parentheses if you really want them, but it's good to know why some samples
you read have omitted them. See how in this example, arguments that are clearly
single words, or that have balanced "bookends" (such as `{ }`) do not need
the parentheses.

> <table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let result = aFunc (oneArg);</pre>
    </td>
    <td>
      <pre>
let result = aFunc (oneArg);
let result = aFunc oneArg;</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
let result = aFunc ({x:0});
      </pre>
    </td>
    <td>
      <pre>let result = aFunc ({x:0});
let result = aFunc {x:0};</pre>
    </td>
  </tr>
</table>

### Currying

Both `JavaScript` and `Reason` support currying, but with `Reason`, when using
the native compiler (or even a `JavaScript` backend), currying is optimized.
(Specifically, you are not penalized for currying in `Reason`, whenever you
happen to supply all the arguments). The main syntactic difference when defining
curried functions is that `Reason` lambdas always begin with the `fun` keyword.

> <table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td><pre>let add = a => b => a + b;</pre></td>
    <td><pre>let add = fun a => fun b => a + b;</pre></td>
  </tr>
</table>

When invoking curried functions, the syntax is the same, but with `Reason`,
supplying the parenthesis is optional.

> <table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>let result = add(10)(20);</pre>
    </td>
    <td>
      <pre>let result = add(10)(20);</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre></pre>
    </td>
    <td>
      <pre>let result = add 10 20;</pre>
    </td>
  </tr>
</table>

Because `Reason` lambdas include the `fun` keyword, curried functions don't
appear as clean as they do in `JavaScript`. To remedy this, `Reason` includes a
syntactic sugar to help with curried function definitions. The two forms
are *exactly* equivalent and nothing changes about how you would invoke these
functions.

> <table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>let add = a => b => a + b;</pre>
    </td>
    <td>
      <pre>let add = fun a => fun b => a + b;</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>// No syntactic sugar needed</pre>
    </td>
    <td>
      <pre>let add = fun a b => a + b;</pre>
    </td>
  </tr>
</table>


### Record Fields

In `Reason`, you must ensure your record literal has an unambiguous type if you
want to create records or access record fields. In the simplest case, the record
type is already in scope and you can unambiguously create values just by using
the standard `{ key: value }` syntax.

> <table>
  <thead>
    <tr>
      <th scope="col"><p>JavaScript</p></th>
      <th scope="col"><p>Reason</p></th>
    </tr>
  </thead>
  <tr>
    <td>
      <pre>function make(
  id, name) {
  return {
    id: id,
    name: name
  };
}</pre>
    </td>
    <td>
      <pre>module Person = {
  type t = {
    id: int, name: string
  };
  let make id name => { id: id, name: name };
  /&ast;
  Alternatively, using field name punning,
  let make id name => { id, name };
  &ast;/
};</pre>
    </td>
  </tr>
</table>

When the record type is declared in a different module, you have to give Reason
a little guidance on which exact type you mean, because different record types
in different modules can share field names.

In order of safety, it's preferred to either (1) prefix at least one record
field with the module name to uniquely identify the record type (safest), (2)
prefix the record literal with a temporary module open to bring the record type
into scope (slightly less safe--brings all names from the opened module into
scope for the rest of the expression), or (3) open the entire module to bring
the record type into scope (least safe--brings all names from the opened module
into scope for the rest of the block).

> <table>
  <thead>
    <tr>
      <th scope="col"><p>JavaScript</p></th>
      <th scope="col"><p>Reason</p></th>
    </tr>
  </thead>
  <tr>
    <td>
      <pre>const bob =
  { id: 1, name: "Bob" };</pre>
    </td>
    <td>
      <pre>let bob = {
  Person.id: 1, name: "Bob"
};</pre>
    </td>
  </tr>
  <tr>
    <td><pre></pre></td>
    <td>
      <pre>let bob = Person.{
  id: 1, name: "Bob"
};</pre>
    </td>
  </tr>
  <tr>
    <td><pre></pre></td>
    <td>
      <pre>open Person;
let bob = {
  id: 1, name: "Bob"
};</pre>
    </td>
  </tr>
</table>

### Expressions

If it wasn't already clear, in Reason, almost everything is an expression. For
example, in `Reason`, the `switch` statement *evaluates* to a value, which makes
programming less error prone. Notice how in the `JavaScript` version, there is
some time when the program is in an invalid state.  The switch statement in
`Reason` also provides many more super powers, discussed in [Pattern
Matching](./index.html#diving-deeper-expressive-pattern-matching).

> <table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>login ? "hi" : "bye" </pre>
    </td>
    <td>
      <pre>login ? "hi" : "bye" </pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
let res = undefined;
switch (thing) {
  case first:
     res = "first";
     break;
  case second:
     res = "second";
     break;
};
      </pre>
    </td>
    <td>
      <pre>
let res = switch thing {
  | first => "first"
  | second => "second"
};
      </pre>
    </td>
  </tr>
</table>
