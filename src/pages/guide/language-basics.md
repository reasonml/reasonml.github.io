---
title: Language basics
order: 1
---

# What Is Reason

Reason is an umbrella project that provides a curated layer for [OCaml](http://ocaml.org). It offers:

- A new, familiar syntax for the battle-tested language that is OCaml.
- A workflow for compiling to JavaScript and native code.
- A set of friendly documentations, libraries and utilities.

# Why Reason

#### Worry-free

Reason leverages OCaml's language design and type system to give immediate feedback in the form of compile-time errors and avoided anti-patterns.

#### Low Overhead

Reason keeps things simple and lean. Thanks to this, integrating Reason into your existing JavaScript/OCaml project is [hassle-free](./gettingStarted.html#javascript-workflow). Do more with less; reduce your future burden!

#### Performant & predictable

Let the compiler and the type system nudge you toward writing code that's fast and easy to think about.


Basics
=======

Primitives / Operations
----------

Primitive                             | Example
--------------------------------------|--------------------------------
Strings                               |  <pre>"Hello"</pre>
Characters                            |  <pre>'x'</pre>
Integers                              |  <pre>23</pre>
Floats                                |  <pre>23.0</pre>
Negative Integers                     |  <pre>-23</pre>
Integer Addition                      |  <pre>23 + 1</pre>
Float Addition                        |  <pre>23.0 +. 1.0</pre>
Integer Division/Multiplication       |  <pre>2 / 23 * 1</pre>
Float Division/Multiplication         |  <pre>2.0 /. 23.0 \*. 1.0</pre>
String Concatenation                  |  <pre>"Hello " ^ "World"</pre>
Immutable Lists                       |  <pre>[1, 2, 3]</pre>
Immutable Prepend                     |  <pre>[item1, item2, ...theRest]</pre>
Reference Equality                    |  <pre>thisThing === thatThing</pre>
Records                               |  <pre>{score: 100}</pre>


Let Binding
------------
`let` bindings give names to values. They can be seen and referenced by code that comes after them.

```reason
let greeting = "hello!";
let score = 10;
let newScore = 10 + score;
...
```

#### Block Scope

Bindings can be scoped through `{}`.

```reason
let message = {
  let part1 = "hello";
  let part2 = "world";
  part1 ^ " " ^ part2
};
/* `part1` and `part2` not accessible here! */
```

#### Bindings Are Immutable

Once a binding refers to a value, it cannot refer to anything else (unless it
explicitly contains a mutable value, discussed later). However, you may create a
new binding of the same name which *shadows* the previous binding; from that
point onward, the binding will refer to the newly assigned value.

```reason
let message = "hello";
print_endline message; /* Prints "hello" */
let message = "bye";
print_endline message; /* Prints "bye" */
```

Conditionals
---------

```reason
if (showMenu) {
  displayMenu ();
};
```

Reason `if`s are expressions; they're evaluated to their body's content:

```reason
let message = if (isMorning) {
  "Good morning!"
} else {
  "Hello!"
};
```

We also have ternary sugar.

```reason
let message = isMorning ? "Good morning!" : "Hello!";
```

Function
---------

Functions are declared with `fun` and return the expression.

```reason
let greet = fun name => "Hello " ^ name;
```

This declares a function and assigns to it the name `greet`, which you can call like so:

```reason
greet "world!"; /* "Hello world!" */
```

Multi-arguments functions have arguments separated by space:

```reason
let add = fun x y z => x + y + z;
add 1 2 3; /* 6 */
```

For longer functions, you'd surround the body with a block:

```reason
let greetMore = fun name => {
  let part1 = "Hello";
  part1 ^ " " ^ name
};
```

**Since function definitions occur often**, we gave `let + fun` a shorthand:

```reason
let add x y z => x + y + z;
/* same as: let add = fun x y z => x + y + z; */
```

**Be mindful of function's precedence**! You need to wrap the call with parentheses in some situations:

```reason
let increment x => x + 1;
let double x => x + x;

let eleven = increment (double 5);
```

If you forget to wrap `double 5` in parentheses, you'd get `increment double 5`, as if the `increment` function wrongly takes two arguments.

#### No Argument

A function always takes an argument; but sometimes, we'd use it for e.g. side-effects, and don't have anything to pass to it. In other languages, we'd conceptually pass "no argument". In Reason, every function takes an argument; here we'd conventionally pass it the value `()`, called "unit".

```reason
/* receive & destructure the unit argument */
let logSomething () => {
  print_endline "hello";
  print_endline "world";
};

/* call the function with the value of type unit */
logSomething ();
```

`()` is a totally normal value, the single possible value in `unit`. Reason/OCaml gave it a special syntax out of convenience.

#### Labeled Arguments
Multi-arguments functions, especially those whose arguments are of the same type, can be confusing to call.

```reason
let addCoordinates x y => {
  /* use x and y here */
};
...
addCoordinates 5 6; /* which is x, which is y? */
```

In OCaml/Reason, you can attach labels to an argument:

```reason
let addCoordinates x::x y::y => {
  /* use x and y here */
};
...
addCoordinates x::5 y::6;
```

Since we have currying (more on that [here](#diving-deeper-more-on-function)), we can provide the arguments in any order:

```reason
addCoordinates y::6 x::5;
```

The `x::x` part during declaration means the function accepts an argument labeled `x` and can refer to it in the function body as the variable `x`. This is so that we can have the following pattern, where labeled arguments are renamed inside the function for conciseness:

```reason
let drawCircle radius::r color::c => {
  setColor c;
  startAt r r;
  ...
};

drawCircle radius::10 color::"red";
```

For the common case of `radius::radius` (where the label is the same as the local variable name), we have the syntax shorthand `::x`:

```reason
let drawCircle ::radius ::color => {
  setColor color;
  startAt radius radius;
  ...
}
```

Here's the syntax for typing the arguments:

```reason
let drawCircle radius::(r: int) color::(c: string) => ...;
```

#### Optional Labeled Arguments

Labeled function arguments can be made optional during declaration. You can then omit them when calling the function.

```reason
/* radius can be omitted */
let drawCircle ::color ::radius=? () => {
  setColor color;
  switch radius {
  | None => startAt 1 1;
  | Some r_ => startAt r_ r_;
  }
};
```

If omitted, `radius` is **wrapped** in the standard library's `option` type, defaulting to `None`. If provided, it'll be wrapped with a `Some`. So `radius`'s type value is either `None` or `Some int` here.

**Note**: `None | Some foo` is a data structure type called variant, described [below](./#built-in-data-types-variant). This particular variant type is provided by the standard library. It's called `option`. Its definition: `type option 'a = None | Some 'a`.

**Note** the unit `()` at the end of `drawCircle`. Without it, since `radius` and `color` are both labeled, can be curried, and can be applied out-of-order, it's unclear what the following mean:

```reason
let whatIsThis = drawCircle ::color;
```

Is `whatIsThis` a curried `drawCircle` function, waiting for the optional `radius` to be applied? Or did it finish applying? To address this confusion, append a positional (aka non-labeled) argument to `drawCircle` (conventionally `()`), and OCaml will, as a rule of thumb, presume the optional labeled argument is omitted when the positional argument is provided.

```reason
let curriedFunction = drawCircle ::color;
let actualResultWithoutProvidingRadius = drawCircle ::color ();
```

##### Explicitly Passed Optional

Sometimes, you might want to forward a value to a function without knowing whether the value is `None` or `Some a`. Naively, you'd do:

```reason
let result = switch payloadRadius {
| None => drawCircle ::color ()
| Some r => drawCircle ::color radius::r ()
};
```

This quickly gets tedious. We provide a shortcut:

```reason
let result = drawCircle ::color radius::?payloadRadius ();
```

This means "I understand `radius` is optional, and that when I pass it a value it needs to be an `int`, but I don't know whether the value I'm passing is `None` or `Some val`, so I'll pass you the whole `option` wrapper".

##### Optional with Default Value

Optional labeled arguments can also be provided a default value. They aren't wrapped in an `option` type.

```reason
let drawCircle ::radius=1 ::color () => {
  setColor color;
  startAt r r;
};
```

Type
--------------------------

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
let drawCircle radius::(r: int) :unit => ...;
```

#### Type Aliases

You can refer to a type by a different name:

```reason
type scoreType = int;
let x: scoreType = 10;
```

Built-in Data Types
=======

Tuple
--------------------------

Tuples are

- immutable
- ordered
- fixed-sized
- heterogeneous

```reason
let myThreeFloats = (20.0, 30.0, 100.0);
let myIntAndString = (20, "totallyNotAnInteger");
```

Tuples' types can be used in type annotations as well. Tuple types visually resemble tuples values.

```reason
let myThreeFloats: (float, float, float) = (20.0, 30.0, 100.0);
/* a tuple type alias */
type myPair = (int, string);
let myIntAndString: myPair = (20, "totallyNotAnInteger");
```

**Note**: there's no tuple of size 1.

Record
-------

Records are a set of named values. They resemble "objects" but are

- lighter
- immutable by default
- less flexible
- much faster

```reason
type person = {age: int, name: string}; /* type */
let me = {age: 30, name: "Jordan"}; /* value */
print_string me.name; /* field access */
```

**Note**: Records must have a type definition.

New records can be created from old records with the `...` spread operator. The
original record isn't mutated.

```reason
let meNextYear = {...me, age: me.age + 1};
```

**Note**: spread cannot add new fields.

##### Sugar

To reduce redundancy, we provide **punning** for a record's types and values. You can use it when the name of a record field matches the name of its value/type.

```reason
type horsePower = {power: int, metric: bool};

let metric = true;
let horsePower1 = {power: 10, metric};
/* same as the value {power: 10, metric: metric}; */

type car = {name: string, horsePower};
/* same as the type {name: string, horsePower: horsePower}; */
```

**Note**: there's no punning for a single record field! `{foo}` doesn't do what you expect (it's a block that returns the value `foo`).

##### Mutable Fields

Record fields can optionally be mutable. This allows you to update those fields in-place with the `=` operator.

```reason
type person = {
  name: string,
  mutable age: int
};
let me = {name: "Jordan", age: 30};
me.age = me.age + 1; /* alter `me`. Happy birthday! */
```

Variant
--------

Most data structures are about "this **and** that". A variant allows us to express "this **or** that".

```reason
type response =
| Yes
| No
| PrettyMuch;

let areYouCrushingIt = Yes;
```

`Yes`, `No` and `PrettyMuch` aren't strings, nor references, nor some special data type. They're called "constructors" (or "tag"). The `|` bar separates each constructor.

**Note**: variant constructors need to be capitalized.

A `switch` expression is like a large `if/elseif/elseif..` allows you to check every possible case of a variant. To use it, enumerate every variant constructor, each followed by an `=>` and the expression corresponding to that case.

```reason
let message = switch (areYouCrushingIt) {
| No => "No worries. Keep going!"
| Yes => "Great!"
| PrettyMuch => "Nice!"
};
/* message is "Great!" */
```

The compiler will raise a type error if you've forgotten to cover a case of your
variant, or if two cases are redundant!

##### Constructor Arguments

Constructors can carry extra data in a space-separated list.

```reason
type account =
| None
| Instagram string
| Facebook string int;
```

Here, `Instagram` carries a `string` and `Facebook` carries a `string` and an `int`. Usage:

```reason
let myAccount = Facebook "Josh" 26;
let friendAccount = Instagram "Jenny";
```

**Note** how using a constructor is like calling a function! It's as if `Facebook` was a function that accepts two arguments. This isn't a coincidence; there's a reason why a constructor's data is called "argument".

**Note**: careful not to confuse a constructor with e.g. 2 arguments with a constructor carrying a single tuple argument:

```reason
type account =
| Facebook string int /* 2 arguments */
type account2 =
| Instagram (string, int) /* 1 argument - happens to be a 2-tuple */
```

##### Using Switch with Constructors Arguments

The `switch` expression can also let you "open up" a variant and bind its arguments to names you can refer to.

```reason
type account =
| None
| Instagram string;
| Facebook string int
let myAccount = Facebook "Josh" 26;
...
let greeting = switch (myAccount) {
| None => "Hi!"
| Facebook name age =>
  "Hi " ^ name ^ ", you're " ^ (string_of_int age) ^ "-year-old."
| Instagram name => "Hello " ^ name ^ "!"
}
```

This is called pattern-matching. It's a stronger version of destructuring, often found in other languages.


(Linked) List
-------------

Lists are homogeneous, immutable, and support fast `O(1)` append at the head of the list.

```reason
let myList = [1, 2, 3];
let anotherList = [0, ...myList]; /* myList didn't mutate */
```

Under the hood, a list is just a normal variant with a neat syntax. To illustrate this, here's how you'd declare your own int list type, without the nice syntax:

```reason
type myListType = Empty | NonEmpty int myListType;
let myList = NonEmpty 1 (NonEmpty 2 (NonEmpty 3 Empty));
/* basically [1, 2, 3] */
```

Array
-------------

Arrays are like lists, except mutable and support fast random access, for performance-sensitive scenarios.

```reason
let myArray = [|"hello", "world", "how are you"|];
let world = myArray.(1);
Array.set myArray 0 "hey";
/* now [|"hey", "world", "how are you"|] */
```

# Diving Deeper

## External

`external`, or "FFI" (foreign function interface), or simply "interop" is how Reason/OCaml communicates with other languages, like C or JavaScript. It's like mandatorily typing a let-binding.

```reason
external myCFunction: int -> string = "theCFunction";
```

```reason
external getElementsByClassName : string => array Dom.element =
  "document.getElementsByClassName" [@@bs.val];
```

You'd often see `external`s when working with BuckleScript, since we're interoping with existing JavaScript libraries a lot. More info on BS externals [here](http://bucklescript.github.io/bucklescript/Manual.html#_binding_to_simple_js_functions_values).

Destructuring & Pattern Matching
-------------

"Destructuring" is a visually concise way of extracting fields from a data structure while binding them to variables. You can use destructuring anywhere you'd normally use a variable. To destructure, instead
of writing the variable name as usual, write out the shape of the object.

The following binds variables: `ten = 10`, `twenty = 20`

```reason
let someInts = (10, 20);
let (ten, twenty) = someInts;
```

he following binds variables: `n = "Guy"`, `a = 30`

```reason
type person = {name: string, age: int};
let somePerson = {name: "Guy", age: 30};
let {name: n, age: a} = somePerson;
```

Destructuring also allows type annotations.
```reason
let (ten: int, twenty: int) = someInts;
let {name: (n:string), age: (a:int)} = somePerson;
```

Destructuring labeled arguments is also possible.

```reason
type person = {name: string, age: int};

let someFunction person::{name} => {
  /* you can use `name` here */
}

let otherFunction person::({name} as thePerson) => {
  /* you can use both `name` and the whole record as `thePerson` here */
}
```

A more advanced form of destructuring is called **pattern matching**. The latter looks like destructuring, but comes with even more help from the type system. Consider a variant:

```reason
type payload =
| BadResult int
| GoodResult string
| NoResult;
```

While using the `switch` expression on it, you can "destructure" it:

```reason
let data = GoodResult "Product shipped!";

let message =
  switch data {
  | GoodResult theMessage => "Success! " ^ theMessage
  | BadResult errorCode =>
    "Something's wrong. The error code is: " ^ (string_of_int errorCode)
  };
```

Notice how we've destructured `data` while handling each different case. The above `switch` will give you a compiler warning:

```
Warning 8: this pattern-matching is not exhaustive.
Here is an example of a value that is not matched:
NoResult
```

Isn't that great? While matching on the shape of your data, the type system warned of an unhandled case. This **conditional** aspect is the essence of pattern matching. Most data structures with a "if this then that" aspect works with it:

```reason
switch myList {
| [] => print_endline "Empty list"
| [a, ...theRest] =>
  print_endline ("list with the head value " ^ a)
};

switch myArray {
| [|1, 2|] => print_endline "This is an array with item 1 and 2"
| _ => print_endline "This is an array"
}
```

You can even switch on string, int and others. You can even have many patterns going to the same result!

```reason
let reply =
  switch message {
  | "Reason's pretty cool" => "Yep"
  | "good night" => "See ya!"
  | "hello"
  | "hi"
  | "heya"
  | "hey" => "hello to you too!"
  | _ => "Nice to meet you!"
  };
```

Combined with other data structures, pattern matching can produce extremely concise, compiler-verified, performant code:

```reason
let message =
  switch data {
  | GoodResult theMessage => "Success! " ^ theMessage
  | BadResult (0 | 1 | 5) => "Something's wrong. It's a server side problem."
  | BadResult errorCode => "Unknown error occurred. Code: " ^ string_of_int errorCode
  | NoResult => "Things look fine"
  };
```

When you really need to use arbitrary logic with an otherwise clean pattern match, you can slip in some `when` clauses, which are basically `if` sugar:

```reason
let message =
  switch data {
  | GoodResult theMessage => ...
  | BadResult errorCode when isServerError errorCode => ...
  | BadResult errorCode => ... /* otherwise */
  | NoResult => ...
  };
```

More on Function
-------------------------

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


Mutation
---------------
Reason/OCaml exposes mutable features through [array](#built-in-data-types-array) and [mutable record fields](#built-in-data-types-record). They're sometimes great for performance and expressing certain familiar programming patterns.

For a single mutable reference (e.g. assigning a value to `let`), the standard library comes with syntax sugar for a [record type called `ref`](http://caml.inria.fr/pub/docs/manual-ocaml/libref/Pervasives.html#TYPEref). You'd use it like so:

```reason
let myValue = ref 10;
if (...) {
  myValue := 20;
};
print_int !myValue;
```

In reality, this is just:

```reason
let myValue = {contents: 10};
if (...) {
  myValue.contents = 20;
};
print_int myValue.contents;
```

There's nothing special about this record, beside the fact that it comes inside the standard library.

You can also achieve lightweight, local "mutations" through overriding let bindings:

```reason
let foo = 10;
let foo = someCondition ? foo + 5 : foo; /* either 15 or 10 */
let foo = "hello";
print_endline foo; /* "hello" */
```

Notice we've assigned a new type to `foo` in the before-last line. This is type-safe since, as documented [here](#basics-let-binding), the lines afterward can only see the last assignment of `foo`.


Imperative Loops
---------------

#### For Loops

For loops iterate from a starting value up to (and including) the ending value.

```reason
for myBinding in (startValue) to (endValue) {
  /* use myBinding here */
};
```

The parenthesis around `startValue` and `endValue` may be omitted if they are
unnecessary.

```reason
let xStart = 1;
let xEnd = 3;
/* prints: 1 2 3 */
for x in xStart to xEnd {
  print_int x;
  print_string " ";
};
```

You can make the `for` loop count in the opposite direction by using `downto`.

```reason
for myBinding in (startValue) downto (endValue) {
  statements
};
```

```reason
let xStart = 3;
let xEnd = 1;
/* prints: 3 2 1 */
for x in xStart downto xEnd {
  print_int x;
  print_string " ";
};
```

#### While Loops

While loops execute a code block while some condition is true. The form of a `while` loop includes a single expression, the condition to test.

```reason
while (testCondition) {
  statements;
};
```

The parenthesis around `testCondition` may be omitted if they are unnecessary.

```reason
while true {
  print_endline "hello";
};
```

#### Breaking Out of Loop

There's no loop-breaking `break` keyword (nor early `return` from functions, for that matter) in Reason/OCaml. In general, prefer map/filter/reduce over imperative loops. However, we can break out of a while loop easily through using a [mutable binding](#diving-deeper-mutation). Example without the `ref` syntax sugar:

```reason
Random.self_init ();
let break = {contents: false};
while (not break.contents) {
  if (Random.int 10 === 3) {
    break.contents = true
  } else {
    print_endline "hello"
  }
};
```

## More on Type

#### Mutually Recursive Types

Just like functions, types can be mutually recursive through `and`:

```reason
type student = {taughtBy: teacher}
and teacher = {students: list student};
```

**Note** that there's no semicolon ending the first line and no `type` on the second line.

#### Type Arguments

Types can be "parameterized" (akin to generics in other languages). It's as if a type is a function that takes in arguments and returns a new type. The parameters need to start with `'`.

Types with parameters allow us to kill duplications. Before:

```reason
/* this is a tuple of 3 items, explained next */
type intCoordinates = (int, int, int);
type floatCoordinates = (float, float, float);

let buddy: intCoordinates = (10, 20, 20);
```

After:

```reason
type coordinates 'a = ('a, 'a, 'a);

/* apply the coordinates "type function" and return the type (int, int, int) */
type intCoordinatesAlias = coordinates int;
let buddy: intCoordinatesAlias = (10, 20, 20);

/* or, more commonly, write it inline */
let buddy: coordinates float = (10.5, 20.5, 20.5);
```

In practice, types are inferred for you. So the more concise version of the above example would be nothing but:

```reason
let buddy = (10, 20, 20);
```

The type system infers that it's a `(int, int, int)`. Nothing else needed to be written down.

Type arguments appear everywhere.

```reason
/* inferred as `list string` */
let greetings = ["hello", "world", "how are you"];
```

If types didn't accept parameters (aka, if we didn't have "type functions"), the standard library will need to define the types `listOfString`, `listOfInt`, `listOfTuplesOfInt`, etc.

Types can receive more arguments, and be composable.

```reason
type result 'a 'b =
| Ok 'a
| Error 'b;

type myPayload = {data: string};

type myPayloadResults 'errorType = list (result myPayload 'errorType);

let payloadResults: myPayloadResults string = [
  Ok {data: "hi"},
  Ok {data: "bye"},
  Error "Something wrong happened!"
];
```

Exceptions
----------

Exceptions are just a special kind of [variant](#built-in-data-types-variant), "thrown" in **exceptional** cases (don't abuse them!). When you have ordinary variants, you often don't **need** exceptions, since you can just use variants types such as `type result` above.

```reason
try (somethingThatThrows ()) {
| Not_found => print_endline "Item not found!"
| Invalid_argument message => print_endline message
};
```

You can make your own exceptions like you'd make a variant (exceptions need to be capitalized too).

```
exception InputClosed string;
...
raise (InputClosed "the stream has closed!");
```

Objects
----------------------------------
Although functions are the preferred way of working within Reason, it's also possible to use
objects.

An object encapsulates data that it stores within fields, and has methods that can be invoked
against the data it has.

##### Declaring an object type
An object can have an object type to define its structure.

```reason
type tesla = {
  .
  color: string
};
```
The extra dot at the beginning is to indicate that this is a closed object type, which means that
an object based on this type must have exactly this public structure.

```reason
type car 'a = {
  ..
  color: string
} as 'a;
```
Two dots, also called an elision, indicate that this is an open object type, and therefore
can also contain other values and methods. An open object is also polymorphic and therefore
requires a parameter.

An object type is not required to create an object.

##### Creating an object
```reason
type tesla = {
  .
  drive: int => int
};

let obj:tesla = {
  val hasEnvy = {contents: false};
  pub drive speed => {
    this#enableEnvy true;
    speed
  };
  pri enableEnvy envy => {
    hasEnvy.contents = envy
  };
};
```
This object is of object type tesla and has a public method `drive`. It also contains a
private method `enableEnvy` that is only accesible from within the object.

The following example shows an open object type which uses a type as parameter. The
object type parameter is required to implement all the methods of the open object
type.

```reason
type tesla 'a = {
  ..
  drive: int => int
} as 'a;

let obj:
  tesla {. drive: int => int, doYouWant: unit => bool}
  = {
  val hasEnvy = {contents: false};
  pub drive speed => {
    this#enableEnvy true;
    speed
  };
  pub doYouWant () => hasEnvy.contents;
  pri enableEnvy envy => {
    hasEnvy.contents = envy
  };
};
```

JSX
----------------------------------
Reason supports the JSX syntax, with some slight differences compared to the one in [ReactJS](https://facebook.github.io/react/docs/introducing-jsx.html). JSX tags translate to function calls as shown in these examples:

Capitalized tag:

```reason
<MyComponent foo=bar />
```

becomes

```reason
MyComponent.createElement foo::bar children::[] () [@JSX]
```

Lowercase tag:

```reason
<div foo=bar>child1 child2</div>
```

becomes

```reason
div foo::bar children::[child1, child2] () [@JSX]
```

The `[@JSX]` syntax attribute can be safely ignored; it's a hook for potential
ppx macros to spot them and syntactically transform the preceeding expression
into something else. This way, everyone gets to benefit the JSX syntax without
needing to opt into a specific library using it, e.g. React.

Some departures from JS JSX: Children text require double quote. Attributes
don't mandate curly braces, unless they're complex expressions (in which case
they're formatted to parentheses).

```reason
<NoCurlyBraces
  booleanAttribute=true
  stringAttribute="string"
  intAttribute=1
  floatAttribute=0.1
  forcedOptional=?(Some "hello")
  onClick={updater handleClick}
  thisWorksToo=(updater handleClick)>
  "foo bar"
</NoCurlyBraces>
```

There is also support for punning!

```reason
<div foo /> /* same as <div foo=foo /> */
```

Note that this would translate to `foo=true` within JSX in JS code.

There is no support for JSX spread attributes.

JSX calls supports the features of [labeled functions](#basics-function): optional, explicitly passed optional and optional with default.

Automatic Printer Generation
---------------------------

**IN BETA! Please only use this on the native side**.

In JS, it's common to use `console.log` or `JSON.stringify` to print an object
or convert it to a string. This is not possible in OCaml. Because Reason is a
front-end to OCaml, however, we've added the functionality to convert any of
your types to a string -- for free.

```reason
type tree = Leaf | Tree tree int tree;
```

Normally, you would have to write your own stringification function to print a
`tree`, as shown below.

```reason
/* Don't you just love writing boilerplate code? */
let rec show_tree = fun
| Leaf => "Leaf"
| Tree a i b =>
  "Tree (" ^
  show_tree a ^
  ", " ^
  string_of_int i ^
  ", " ^
  show_tree b ^
  ")";
```

With Reason, however, there is no need for that. You can just assume that
`show_tree` exists (it is generated for you) and be on your merry way!

```reason
/* Golly gee! No string nonsense here! */
let myTree = Tree Leaf 4 (Tree Leaf 0 Leaf);
print_endline (show_tree myTree);
```

If you would prefer a different look for your output, feel free to override the
generated function -- simply define a function of the same name `show_tree` and
it will shadow the generated one.

Currently, this is an opt-in feature. Here's how to enable it:

* If you are using `refmt` manually, it requires adding the `--add-printers`
  flag.
* If you would like to attach the `ppx_deriving` runtime, add the
  `--add-runtime` option.
* If you are using `rebuild`, add the Ocamlbuild tag `reason.add_printers` to
  your `_tags` file for the files for which you would like printers generated.
  This implies `--add-printers --add-runtime`.

Last, please note that this will not work with polymorphic types. That is, if
you have code with a `'a` in it, Reason can't generate an automatic printer for
the generalized type.

```reason
/* Sorry, you're out of luck. */
type mytype 'a = SomeSadVariant 'a;
```


Modules
-------

See [Modules](./modules.html)


Community
=======

Come say hi!

- [Discord](https://discord.gg/reasonml)
- [Twitter](https://twitter.com/reasonml)
- [Reddit](https://www.reddit.com/r/reasonml/)
- [Stack Overflow](http://stackoverflow.com/questions/tagged/reason)
- IRC (freenode #reasonml)

We also maintain [BuckleTypes](https://github.com/BuckleTypes), where community members submit Reason/OCaml JavaScript bindings.

There are a few Reason meetups around the world, among others:

- [Vienna](https://www.meetup.com/en-AU/Reason-Vienna/)
- [San Francisco](https://www.meetup.com/sv-ocaml/)
- [Singapore](https://www.meetup.com/SG-OCaml/)
- [Göteborg](https://www.meetup.com/got-lambda/)
- [New York](https://www.meetup.com/ReasonML-NYC/)
- [Sydney](https://www.meetup.com/reason-sydney/)
- [Paris](https://www.meetup.com/ReasonML-Paris/)
- [Montreal](https://www.meetup.com/ReasonMTL/)
- [London](https://www.meetup.com/ReasonLDN/)

How Reason Works
=========================

The OCaml compiler is organized into several stages, which are exposed as
libraries. `Reason` replaces part of the compiler toolchain with a completely
new syntax parser that is more approachable, while still fully compatible with
the rest of the compiler.  `Reason` also implements a new source printer which
integrates into your IDE and the new custom [`REPL`](./tools.html#repl).

###### Why OCaml?

OCaml is a great tool for writing highly expressive, functional
*or* imperative code, with type inference and fast runtime performance.
Because of these properties, OCaml has helped
Facebook quickly build scalable infrastructure such as
[Hack](http://hacklang.org/), [Flow](http://flowtype.org/), and
[Infer](http://fbinfer.com/). It is also used for other performance sensitive
applications in the financial industry (Jane Street, Bloomberg). At the same
time, OCaml has a very mature (*and still growing*) ecosystem for targeting
browser and `JavaScript` environments with a focus on language interoperability
and integration with existing `JavaScript` code.


`Reason`'s non-invasive approach to the `OCaml` compiler allows `Reason` code
to take advantage of all of the existing `OCaml` compiler
optimizations/backends such as bare metal `ARM`, `x86`, and even `JavaScript`
compilation.


###### In the Wild

[Infer](https://github.com/facebook/infer/tree/master/infer) is a Facebook open
source project for statically analyzing source code in order to find errors.
You can see `Infer`'s use of `Reason`
[here](https://github.com/facebook/infer/tree/master/infer/src/IR).
The `Infer` team along with other members of industry are major contributors to
`Reason`.
