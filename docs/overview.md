---
title: Overview
---

This is an overview of most language features in Reason. It does not explain
them in detail, but should serve as a quick reference. Please see the guides
on the left for additional details about each feature.

## Let Bindings

Feature                         | Example
--------------------------------|----------
String value                    | `let hi = "Hello World";`
Int value                       | `let count = 42;`
Type annotation on binding      | `let count: int = 42;`

## Built In Types

Feature                         | Example
--------------------------------|----------
Int                             | `let x: int = 10;`
Float                           | `let x: float = 10.0;`
Boolean                         | `let x: bool = false;`
String                          | `let x: string = "ten";`
Char                            | `let x: char = 'c';`
Unit                            | `let x: unit = ();`
Option                          | `let x: option(int) = Some(10);`
Tuple                           | `let x: (int, string) = (10, "ten");`
List                            | `let x: list(int) = [1, 2, 3];`
Array                           | <code>let x: array(int) = [&#124;1, 2, 3&#124;];</code>
Functions                       | `let x: (int, int) => int = (a, b) => a + b;`

## Strings

Feature                         | Example
--------------------------------|----------
String                          | `"Hello"`
String concatenation            | `"Hello " ++ "World"`
Character                       | `'x'`
Character at index              | `let x = "Hello"; x.[2];`

- String Functions: [`module String`](https://reasonml.github.io/api/String.html)

## Numbers

Feature                         | Example
--------------------------------|----------
Integer                         | `23`, `-23`
Integer operations              | `23 + 1 - 7 * 2 / 5`
Integer modulo                  | `13 mod 2`
Float                           | `23.0`, `-23.0`
Float operations                | `23.0 +. 1.0 -. 7.0 *. 2.0 /. 5.0`
Float exponentiation            | `2.0 ** 3.0`

## Boolean Values And Logical Operations

Feature                         | Example
--------------------------------|----------
Boolean Values                  | `true`, `false`
Comparison                      | `>`, `<`, `>=`, `<=`
Boolean operations              | `!`, `&&`, <code>&#124;&#124;</code>
Reference equality              | `===`, `!==`
Structural equality             | `==`, `!=`
If-Else expressions             | `if (condition) { a; } else { b; }`
Ternary expressions             | `condition ? a : b;`

## Functions

Feature                         | Example
--------------------------------|----------
Function definition             | `let divide = (a, b) => a / b;`
Function calls                  | `divide(6, 2); // 3`
Named arguments                 | `let divide = (~a, ~b) => a / b;`
Calling named arguments         | `divide(~a=6, ~b=2); // 3`
Recursive functions             | `let rec infinite = () => infinite();`

## Advanced Functions

Feature                         | Example
--------------------------------|----------
Partial application             | `let divideTen = divide(10); divideTen(5); // 2`
Partially applying out of order | `let half = divide(_, 2); half(10); // 5`
Optional arguments              | `let print = (~prefix=?, text) => {...};`
Optional arguments with default | `let divide = (~a=100, ~b) => a / b;`
Function chaining (pipe)        | <code>32 &#124;> half &#124;> half; // 8</code>

## Function Types

Feature                         | Example
--------------------------------|----------
Inline typing                   | `let divide = (a: int, b: int): int => a / b;`
Standalone type                 | `type intFn = (int, int) => int;`
Using standalone type           | `let divide: intFn = (a, b) => a / b;`
Typing optional arguments       | `let print = (~prefix: option(string)=?, text) => {...};`

## Basic Structures

Feature                         | Example
--------------------------------|----------
List (Immutable)                | `[1, 2, 3]`
List add to front               | `[a1, a2, ...theRest]`
List concat                     | `[a1, a2] @ theRest`
Array (Mutable)                 | <code>[&#124;1, 2, 3&#124;]</code>
Array access                    | <code>let arr = [&#124;1, 2, 3&#124;]; arr[1];</code>

- List Functions: [`module List`](https://reasonml.github.io/api/List.html)
- Array Functions: [`module Array`](https://reasonml.github.io/api/Array.html)

## Maps and Sets

There are several different ways to interact with Maps and Sets depending on the
specific environment being used. In standard Reason code there are `Map` and
`Set` modules:

- [`module Map.Make`](https://reasonml.github.io/api/Map.Make.html)
- [`module Set.Make`](https://reasonml.github.io/api/Set.Make.html)

When using BuckleScript `belt` exposes these modules:

- [`module Belt.Map`](https://bucklescript.github.io/bucklescript/api/Belt.Map.html)
- [`module Belt.Set`](https://bucklescript.github.io/bucklescript/api/Belt.Set.html)

There are also other libraries that will provide their own implementation of
these data structures. Check the style guide of the project you are
working in to determine which module to use.

## Type Annotations

Any expression or argument may include a "type annotation". In most cases, type annotations
are not necessary and the compiler will infer the types automatically. You may include
type annotations to verify your own understanding against what the compiler infers.

Feature                         | Example
--------------------------------|----------
Expression type annotation      | `let x = (expression: int)`
Annotation on let binding       | `let x: int = expression;`
Argument/return value annotation| `let addOne = (a: int): int => a + 1;`

## Type Parameters

Types can be made generic with type parameters.

Feature                         | Example
--------------------------------|----------
Type parameters                 | `type pair('a, 'b) = ('a, 'b);`
Annotation with parameters      | `let x: pair(int, string) = (10, "ten");`
String list                     | `let x: list(string) = ["Hello", "World"];`

## Records

Feature                         | Example
--------------------------------|----------
Record definition               | `type t = {foo: int, bar: string};`
Record creation                 | `let x = {foo: 10, bar: "hello"};`
Record access                   | `x.foo;`
Record spread                   | `let y = {...x, bar: "world"};`
Destructuring                   | `let {foo, bar} = x;`
Mutable record fields           | `type t = {mutable baz: int}; let z = {baz: 10};`
Mutable record updates          | `z.baz = 23;`
With type parameters            | `type t('a) = {foo: 'a, bar: string};`

- Note: Record types are [nominal](https://en.wikipedia.org/wiki/Nominal_type_system). This means that two different record definitions (`type x = {...};`) with the exact same fields are not compatible. They cannot be used interchangeably and cannot be spread into each other.

## Variants

Variant types model values that may assume one of many known variations. This
feature is similar to "enums" in other languages, but each variant form may
optionally specify data that is carried along with it.

Feature                         | Example
--------------------------------|----------
Variant definition              | <code>type t = &#124; Foo &#124; Bar;</code>
Variants with args              | <code>type t = &#124; Foo(string) &#124; Bar(int);</code>
With type parameters            | <code>type t('a) = &#124; One('a) &#124; Two('a, 'a);</code>
Using a variant                 | `let x = Two("Hello", "World");`

## Options

Options are a built-in variant that represent the presence or absence of a
value. It is similar to the concept of "nullable" values in other languages. Options
are used often.

Feature                         | Example
--------------------------------|----------
Definition (already defined)    | <code>type option('a) = &#124; None &#124; Some('a);</code>
Value that is present           | `let x = Some("Hello World");`
Value that is absent            | `let y = None;`

## Pattern Matching

Pattern matching is a very powerful feature in Reason. It matches against variants
and ensures all cases are covered. Start matching using the `switch` keyword:

```re
switch (foo) {
| Some(value) => doSomething(value)
| None => error()
}
```

Feature                         | Example
--------------------------------|----------
Basic case                      | <code>&#124; Some(value) => doSomething(value)</code>
When conditions                 | <code>&#124; Some(value) when value > 10 => doSomething(value)</code>
Catch-all case                  | <code>&#124; _ => doSomething()</code>
Matching lists                  | <code>&#124; [a, b, ...rest] => doSomething(rest)</code>
Matching records                | <code>&#124; {foo: value} => doSomething(value)</code>
Matching literals               | <code>&#124; "Hello" => handleHello()</code>

## Unit

The special "unit" value (written `()`) represents something that never has any
meaningful value (this is distinct from options which may have a value).
Functions usually indicate that they perform a side effect by returning a unit
value.

Feature                         | Example
--------------------------------|----------
Creating a unit                 | `let x = ();`
Passing to a function           | `fn(a, b, ());`
Unit as only argument           | `let fn = () => 1; fn();`

## Refs

Refs are a way to have a mutable "variable" in your program. It is a thin wrapper
around a record with a mutable field called `contents`.

Feature                         | Example
--------------------------------|----------
Type (already defined)          | `type ref('a) = {mutable contents: 'a};`
Ref creation                    | `let x = ref(10);` or `let x = {contents: 10};`
Ref access                      | `x^;` or `x.contents;`
Ref update                      | `x := 20;` or `x.contents = 20;`

## Loops

Loops are discouraged in most cases. Instead functional programming patterns
like `map`, `filter`, or `reduce` can usually be used in their place.

Feature                         | Example
--------------------------------|----------
While                           | `while (condition) {...}`
For (incrementing)              | `for (i in 0 to 9) {...}` (inclusive)
For (decrementing)              | `for (i in 9 downto 0) {...}` (inclusive)

- Note: There is no `break` or early returns in Reason. Use a ref containing a
bool for break-like behavior: `let break = ref(false); while (!break^ && condition) {...};`

## Modules

Modules are a way to group types and values. Each Reason file implicitly
creates a module of the same name. Each `type` definition and `let` binding in
a module automatically becomes a "member" of that module which can be accessed
by other modules.  Modules can also be nested using the `module` keyword.

Feature                         | Example
--------------------------------|----------
Module creation                 | `module Foo = { let bar = 10; };`
Module member access            | `Foo.bar;`
Module types                    | `module type Foo = { let bar: int; };`

## Functors

Functors are like functions that create modules. This is an advanced topic
that can be very powerful. Here is a basic example:

```reason
module type Stringable = {
  type t;
  let toString: (t) => string;
};

module Printer = (Item: Stringable) => {
  let print = (t: Item.t) => {
    print_endline(Item.toString(t));
  };

  let printList = (list: list(Item.t)) => {
    list
    |> List.map(Item.toString)
    |> String.concat(", ")
    |> print_endline;
  };
};

module IntPrinter = Printer({
  type t = int;
  let toString = string_of_int;
});

IntPrinter.print(10); // 10
IntPrinter.printList([1, 2, 3]); // 1, 2, 3
```

## Comments

Feature                         | Example
--------------------------------|----------
Multiline Comment               | `/* Comment here */`
Single line Comment             | `// Comment here`
