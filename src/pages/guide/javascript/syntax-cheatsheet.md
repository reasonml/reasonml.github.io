---
title: Syntax Cheatsheet
order: 1
---

### Basic Language Primitives

JavaScript                |   Reason
--------------------------|--------------------------------
<pre>3</pre>                         |  <pre>3</pre>
<pre>3.1415 </pre>                   |  <pre> 3.1415 </pre>
<pre>"Hello world!" </pre>           |  <pre>"Hello world!" </pre>
<pre>'Hello world!' </pre>           |  Strings must use "
Characters are strings               |  <pre>'a'  </pre>
<pre>true</pre>                      |  <pre>true </pre>
<pre>!true</pre>                     |  <pre>not true </pre>
`[1,2,3]`                            |  `[1,2,3]`
<pre>null</pre>                      |  <pre>()</pre>
<pre>const x = y;</pre>              |  <pre>let x = y;</pre>
<pre>let x = y;</pre>                |  <pre>reference cells</pre>
<pre>var x = y;</pre>                |  No equivalent (thankfully)
`[x, ...lst] (linear time)`          | `[x, ...lst] (constant time)`
`[...lst, x] (linear time)`          | Not supported
<pre>{...obj, x: y}</pre>            | <pre>{...obj, x: y}</pre>


### Basic Operations on Primitives

JavaScript                         |   Reason
-----------------------------------|--------------------------------
<pre>1 + 2</pre>                   |  <pre>1 + 2</pre>
<pre>1.0 + 2.0 </pre>              |  <pre>1.0 +. 2.0 </pre>
<pre>"hello " + "world" </pre>     |  <pre>"hello " ^ "world" </pre>

### Object and Record

JavaScript                |   Reason
--------------------------|--------------------------------
Objects                 |  Records/BuckleScript Object
no static types           |  <pre>type point = {x: int, mutable y: int};</pre>
<pre>{x: 30, y: 20}</pre>          |  <pre>{x: 30, y: 20}</pre>
<pre>point.x</pre>                 |  <pre>point.x</pre>
<pre>point.y = 30;</pre>           |  <pre>point.y = 30;</pre>
<pre>{...point, x: 30}</pre>       |  <pre>{...point, x: 30}</pre>


### Function

JavaScript                            |   Reason
--------------------------------------|--------------------------------
<pre>arg => retVal  </pre>            |  <pre>fun arg => retVal</pre>
<pre>function named(arg) {...}        |
<pre>let f = function named(arg) {...}|

JavaScript                        |   Reason
----------------------------------|--------------------------------
<pre>const incr = x => x + 1;</pre>        |  <pre>let incr = fun x => x + 1;</pre>
<pre>const five = incr(4);</pre>           |  <pre>let five = incr 4;</pre>
<pre>const add = (x, y) => x + y;</pre>      |  <pre>let add = fun x y => x + y;</pre>
<pre>const x = add(3, 4);</pre>            |  <pre>let x = add 3 4;</pre>
<pre>const y = add(3, add(0, 1));</pre>    |  <pre>let y = add 3 (add 0 1);</pre>

#### Function Expression

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
const add = (x, y) => x + x + y + y;
      </pre>
    </td>
    <td>
      <pre>
let add = fun x y => x + x + y + y;
      </pre>
    </td>
  </tr>
</table>

#### Function blocks

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

### Function Application

In Reason, parentheses are typically optional in places where it is obvious
they aren't needed. This means that when invoking functions, parentheses
aren't always required around the argument. Reason will let you add the
parentheses if you really want them, but it's good to know why some samples
you read have omitted them. See how in this example, arguments that are clearly
single words, or that have balanced "bookends" (such as `{ }`) do not need
the parentheses.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let result = aFunc(oneArg);</pre>
    </td>
    <td>
      <pre>
let result = aFunc oneArg;</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
let result = aFunc({x:0});
      </pre>
    </td>
    <td>
      <pre>let result = aFunc {x:0};</pre>
    </td>
  </tr>
</table>

### Currying

Both JavaScript and Reason support currying, but with Reason, when using
the native compiler (or even a JavaScript backend), currying is optimized.
(Specifically, you are not penalized for currying in Reason, whenever you
happen to supply all the arguments). The main syntactic difference when defining
curried functions is that Reason lambdas always begin with the `fun` keyword.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td><pre>let add = a => b => a + b;</pre></td>
    <td><pre>let add = fun a => fun b => a + b;</pre></td>
  </tr>
</table>

#### Syntactic sugar

Because Reason lambdas include the `fun` keyword, curried functions don't
appear as clean as they do in JavaScript. To remedy this, Reason includes a
syntactic sugar to help with curried function definitions. The two forms
are *exactly* equivalent and nothing changes about how you would invoke these
functions.

<table>
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
      <pre>// No syntactic sugar</pre>
    </td>
    <td>
      <pre>let add = fun a b => a + b;</pre>
    </td>
  </tr>
</table>


### Expressions

In Reason, almost everything is an expression. For example, in Reason, the `switch` statement *evaluates* to a value, which makes programming less error prone. Notice how in the JavaScript version, there is some time when the program is in an invalid state.  The switch statement in Reason also provides many more super powers, discussed in [Pattern Matching](/guide/language/pattern-matching).

<table>
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

### Blocks

In Reason, "sequence expressions" are created with `{}` and evaluate to their
last statement. In JavaScript, this can be simulated via a temporary variable
which must be created in an invalid state, then later mutated.

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
