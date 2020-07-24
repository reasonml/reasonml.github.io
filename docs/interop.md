---
title: Interop
---

## Output Overview

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
Float Exponentiation            | `2.0 ** 3.0`                         | `Math.pow(3, 4)`
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

## Let Bindings

_Details: [Let Bindings](let-binding.md)_

A let binding transforms into a regular JavaScript variable declaration. As much as possible, we preserve the same name after transformation, for easier debugging and communication with JavaScript libraries.

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let greeting = "hello!";
let score = 10;
let newScore = 10 + score;
```
<!--Output-->
```js
var greeting = "hello!";
var score = 10;
var newScore = 20;
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Strings & Character

_Details: [Strings](primitives.md#strings)_

Reason strings are delimited using double quotes. They transform into
regular JavaScript strings. You can directly use a string declared from another
JavaScript file without back-and-forth conversions.

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let greeting = "Hello world!";
let multilineGreeting = "Hello
 world!";
```
<!--Output-->
```js
var greeting = "Hello world!";
var multilineGreeting = "Hello\n world!";
```
<!--END_DOCUSAURUS_CODE_TABS-->

In some cases the compiler can optimize concatenations:

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let greetings = "Hello " ++ "world!";
```
<!--Output-->
```js
var greetings = "Hello world!";
```
<!--END_DOCUSAURUS_CODE_TABS-->

### String Interpolation & Unicode

There's a special syntax for string that allows

- Multiline string
- No special character escaping
- Variable interpolation
- Better unicode support

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let name = "John"
let greetingAndOneSlash = {j|Hello, $name
I'm 奥巴马|j};
```
<!--Output-->
```js
var name = "John";
var greetingAndOneSlash = "Hello, " + (String(name) + "\nI\'m 奥巴马");
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Integer & Float

_Details: [Integer](primitives.md#integer)_

Reason integers are 32-bits, **truncated when necessary**. They usually compile to JavaScript numbers, but you should **not** rely on that. For example, if you're receiving a JavaScript date number, you should type it in Reason as a **float**, since using integers would cause date truncation.

(More on types and JavaScript interop in a later section.)

BuckleScript has some helpers to work with Integers and Floats:

- [`module Js.Int`](https://bucklescript.github.io/bucklescript/api/Js.Int.html)
- [`module Js.Float`](https://bucklescript.github.io/bucklescript/api/Js.Float.html)

## Boolean

_Details: [Boolean](primitives.md#boolean)_

Reason booleans and their operations compile to the same JavaScript code you'd expect.

## Regular Expression

Reason's regular expression directly transforms to JavaScript's regular expression.
Because of that, You can also directly use a JS regular expression in Reason.

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let f = [%re "/(0-9)+/g"];
```
<!--Output-->
```js
var f = (/(0-9)+/g);
```
<!--END_DOCUSAURUS_CODE_TABS-->


## Records

_Details: [Records](record.md)_

Records compiles to a straightforward JS object, you can directly model incoming JS objects as Reason records, **no conversion functions needed**. This is extremely convenient when interoperating with existing JS libraries, since most of them use objects in their APIs and you wouldn't need to wrap those with a layer of Reason APIs.

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
type person = {
  age: int,
  name: string
};
```
<!--Output-->
```js
/* Nothing. Types disappear in the output */
```
<!--END_DOCUSAURUS_CODE_TABS-->

To use it (this will be inferred to be of type `person`):

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let me = {
  age: 5,
  name: "Big Reason"
};
```
<!--Output-->
```js
var me = {
  age: 5,
  name: "Big Reason"
};
```
<!--END_DOCUSAURUS_CODE_TABS-->

New records can be created from old records with the `...` spread operator. The original record isn't mutated.

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let meNextYear = {
  ...me,
  age: me.age + 1
};
```
<!--Output-->
```js
var meNextYear = {
  age: me.age + 1 | 0,
  name: "Big Reason"
};
```
<!--END_DOCUSAURUS_CODE_TABS-->

This update is very efficient! **Check the output tab**. Because we know the whole type shape of the record you're updating, we can avoid the JavaScript way of iterating over all the object fields and stuffing them into a new one. Instead, a new record is directly created.

## List & Array

Reason **arrays** map straightforwardly to JavaScript arrays, and vice-versa. Thus, even though arrays are fix-sized on native, you can still use the `Js.Array` API to resize them. This is fine.

- [`module Js.Array`](https://bucklescript.github.io/bucklescript/api/Js.Array.html)
- [`module Js.List`](https://bucklescript.github.io/bucklescript/api/Js.List.html)

## Tuples

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let ageAndName = (16, "Lil' Reason");
let my3dCoordinates = (20.0, 30.5, 100.0);
```
<!--Output-->
```js
var ageAndName = /* tuple */[16, "Lil' Reason"];
var my3dCoordinates = /* tuple */[20.0, 30.5, 100.0];
```
<!--END_DOCUSAURUS_CODE_TABS-->

Because tuples turn into JavaScript arrays, when you receive an existing JS array from the JS side of your codebase, you can also model it as a tuple on the Reason side, providing that said array has the characteristics of a tuple (fixed-sized, potentially heterogenous, etc.).

## Just dumping JavaScript in the middle of your Reason code

If you're just hacking things together, this can be very nice, but you also have all of the unsafety of JavaScript code 😄.

```reason
Js.log("this is reason");

[%bs.raw {| console.log('here is some javascript for you') |}];
```

> `{|` and `|}` are the delimiters of a multi-line string in OCaml. You can also put a tag in there e.g. `{something|` and then it will look for a matching `|something}` to close.

And here's the resulting javascript:

```js
// Generated by BUCKLESCRIPT VERSION 1.7.4, PLEASE EDIT WITH CARE
'use strict';
console.log("this is reason");
console.log('here is some javascript for you');
```

## Dumping in some JavaScript, and making it accessible from Reason

What if you want a value that can be used from your Reason code?

```reason
Js.log("this is reason");
let x = [%bs.raw {| 'here is a string from javascript' |}];
Js.log(x ++ " back in reason land"); /* ++ is the operator for string concat */
```

Now you might be wondering "what magic is this?? How did ocaml know that `x` was a string?" **It doesn't**. The type of `x` in this code is a magic type that will unify with anything! This is quite dangerous and can have cascading effects in OCaml's type inference algorithm.

```reason
let y = [%bs.raw {| 'something' |}];
Js.log(("a string" ++ y, 10 + y));
/* danger!! ocaml won't stop you from using y as 2 totally different types */
```

To fix this, you should **always** provide a concrete type for the result of `bs.raw`.

```reason
let x: string = [%bs.raw {| 'well-typed' |}];
Js.log(x ++ " back in reason land");
/* ocaml will error out if you try to use x as anything other than a string */
```

And here's the output!

```js
// Generated by BUCKLESCRIPT VERSION 1.7.4, PLEASE EDIT WITH CARE
'use strict';
console.log("this is reason");
var x = ( 'here is a string from javascript' );
console.log(x + " back in reason land");
var y = ( 'something' );
console.log(/* tuple */[
      "a string" + y,
      10 + y | 0
    ]);
var x$1 = ( 'well-typed' );
console.log(x$1 + " back in reason land");
```

> The difference between the 2 `%%` from the previous section and the 1 `%` here is important! `[%%something ...]` is an OCaml "extension point" that represents a *top-level* statement (it can't show up inside a function or value, for example). `[%something ...]` is an extension point that stands in for an *expression*, and can be put just about anywhere -- but make sure that the JavaScript you put inside is actually an expression! E.g. don't put a semicolon after it, or you'll get a syntax error when you try to run the resulting JavaScript.

## Dumping in a function & passing values

We'll need a little knowledge about Bucklescript's runtime representation of various values for this to work.

- `strings` are strings, `ints` and `floats` are just numbers
- an [Array](list-and-array.md#array) is a mutable fixed-length list in OCaml, and is represented as a plain javascript array.
- a [List](list-and-array.md#list) is an immutable functional-style linked list, and is definitely the more idiomatic one to use in most cases. However, its representation is more complicated (try `Js.log([1,2,3,4])` to check it out). Because of this, I generally convert to & from `Array`s when I'm talking to javascript, via `Array.of_list` and `Array.to_list`.
- If you want to go deeper, there's a list [in the BuckleScript documentation](https://bucklescript.github.io/docs/en/common-data-types.html#cheat-sheet)

Knowing that, we can write a function in JavaScript that just accepts an array and returns a number, without much trouble at all.

```reason
let jsCalculate: (array(int), int) => int = [%bs.raw
  {|
 function (numbers, scaleFactor) {
   var result = 0;
   numbers.forEach(number => {
     result += number;
   });
   return result * scaleFactor;
 }
|}
];

let calculate = (numbers, scaleFactor) => jsCalculate(Array.of_list(numbers), scaleFactor);

Js.log(calculate([1, 2, 3], 10)); /* -> 60 */
```

Of course, this function that I wrote in JavaScript could be ported over to Reason without much hassle.

**Remember** that this is an escape hatch that's very useful for learning so you can jump in quickly and make something, but it's a good exercise to go back through and convert things back into nice type safe reason code.

I've run into more than a few bugs because of raw JavaScript that I added to save time 😅.

## Settling down and getting disciplined about things

So far we've been using `bs.raw`, which is a very fast and loose way to do it, and **not** suitable for production.

But what if we actually need to call a function that's in JavaScript? It's needed for interacting with the DOM, or using node modules. In BuckleScript, you use an `external` declaration ([docs](https://bucklescript.github.io/docs/en/intro-to-external.html)).

Getting a value and getting a function are both pretty easy:

```reason
[@bs.val] external pi : float = "Math.PI";
let tau = pi *. 2.0;
[@bs.val] external alert : string => unit = "alert";
alert("hello");
```

But what about when we want something more complicated? Here's how we could call `getContext` on a Canvas DOM node:

```reason
type canvas;

type context;

/* we're leaving these types abstract, because we won't
 * be using them directly anywhere */
[@bs.send] external getContext : (canvas, string) => context = "getContext";

let myCanvas: canvas = [%bs.raw {| document.getElementById("mycanvas") |}];

let ctx = getContext(myCanvas, "2d");
```

So let's unpack what's going on. We created some abstract types for the Canvas DOM node and the associated RenderingContext object.

Then we made a `getContext` function, but instead of `@bs.val` we used `@bs.send`, and we used an empty string for the text of the external. `@bs.send` means "we're calling a method on the first argument", which in this case is the canvas. Given the above, BuckleScript will translate `getContext(theFirstArgument, theSecondArgument)` into `theFirstArgument.getContext(theSecondArgument, ...)`.

The empty string means "the JS name is the same as the name we're giving the external in BuckleScript-land" – in this case `getContext`. If we wanted to name it something else (like `getRenderingContext`), then we'd have to supply the string `"getContext"` so that BuckleScript calls the right function.

Let's add one more function just so it's interesting.

```reason
[@bs.send] external fillRect : (context, float, float, float, float) => unit = "fillRect";
```

And now we can draw something!

```reason
fillRect(ctx, 0.0, 0.0, 100.0, 100.0);
```

It's not much, but adding other canvas methods is similar, and then you can start doing some [really fun things](https://twitter.com/jaredforsyth/status/871062358076030976).

So what does the compiled JavaScript look like?

```js
'use strict';
var tau = Math.PI * 2.0;
alert("hello");
var myCanvas = ( document.getElementById("mycanvas") );
var ctx = myCanvas.getContext("2d");
ctx.fillRect(0.0, 0.0, 100.0, 100.0);
```

Wow! Notice how BuckleScript just inlined our `pi` variable for us? And the output looks almost exactly like it was written by hand.

## Using existing JavaScript libraries

When folks write wrappers for a particular JavaScript library, they'd usually publish it to npm. Head over to the [Libraries](libraries.md) to find out how to find these.

To use a library that does not have existing wrappers, however, you'll want to first install the npm package as usual, e.g. using `npm install --save <package-name>`, then just go ahead and write your wrapper. You'll probably find the [`bs.module`](https://bucklescript.github.io/docs/en/import-export.html#import) FFI feature particularly useful; it emits the right `import`s or `require`s, depending on the JS compilation target's module format.

As an example, here's the entire source code of the [`bs.glob`](https://github.com/reasonml-community/bs-glob) wrapper (converted to Reason, the original is OCaml):

```reason
type error;

[@bs.module] external glob : (string, (Js.nullable(error), array(string)) => unit) => unit = "glob";

[@bs.val] [@bs.module "glob"] external sync : string => array(string) = "glob";
```

And the relevant parts of `package.json`:

```json
{
  "name": "bs-glob",
  "version": "0.1.0",
  ...
  "devDependencies": {
    "bs-platform": "^1.9.1"
  },
  "dependencies": {
    "glob": "^7.1.2"
  }
}
```
