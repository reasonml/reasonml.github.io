---
title: Let Binding
---

A "let binding", in other languages, might be called a "variable declaration". `let` _binds_ values to names. They can be seen and referenced by code that comes _after_ them.

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

## Block Scope

Bindings can be scoped through `{}`.

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let message = {
  let part1 = "hello";
  let part2 = "world";
  part1 ++ " " ++ part2
};
/* `part1` and `part2` not accessible here! */
```
<!--Output-->
```js
var message = "hello world";
```
<!--END_DOCUSAURUS_CODE_TABS-->

The value of the last line of a scope is implicitly returned.

### Design Decisions

Reason's `if`, `while` and functions all use the same block scoping. The code below works **not** because of some special "if scope"; but simply because it's the same scope syntax and feature you just saw:

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
if (displayGreeting) {
  let message = "Enjoying the docs so far?";
  Js.log(message)
};
/* `message` not accessible here! */
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Bindings Are Immutable

Reason let bindings are "immutable", aka "cannot change/vary". This helps Reason's type system to deduce and optimize much more than other languages (and in turn, help you more).

## Binding Shadowing

The above restriction might sound unpractical at first. How are would you change a value then? Usually, 2 ways:

The first is to realize that many times, what you want isn't to mutate a variable's value. For example, in JavaScript:

<!--DOCUSAURUS_CODE_TABS-->
<!--JS-->
```javascript
var result = 10;
result = Math.random() + result;
result = Math.floor(result);
```
<!--END_DOCUSAURUS_CODE_TABS-->

What you're really doing is just to name intermediate steps. You didn't need to mutate `result` at all! You could have just written this:

<!--DOCUSAURUS_CODE_TABS-->
<!--JS-->
```javascript
var result1 = 10;
var result2 = Math.random() + result1;
var result3 = Math.floor(result2);

```
<!--END_DOCUSAURUS_CODE_TABS-->

In Reason, this obviously works too:

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let result1 = 10.;
let result2 = Js.Math.random() +. result1;
let result3 = Js.Math.floor_float(result2);
```
<!--Output-->
```js
var result1 = 10;
var result2 = Math.random() + 10;
var result3 = Math.floor(result2);
```
<!--END_DOCUSAURUS_CODE_TABS-->

Anyway, in Reason, we support let binding "shadowing". So you can write this too:

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let result = 10.;
let result = Js.Math.random() +. result;
let result = Js.Math.floor_float(result);
```
<!--Output-->
```js
var result = Math.random() + 10;
var result$1 = Math.floor(result);
```
<!--END_DOCUSAURUS_CODE_TABS-->

As a matter of fact, even this is fine:

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let result = "hello";
Js.log(result); // prints "hello"
let result = 1;
Js.log(result); // prints 1
```
<!--Output-->
```js
console.log("hello");
console.log(1);
```
<!--END_DOCUSAURUS_CODE_TABS-->

The binding you refer to is whatever's the closest upward. No mutation here!

If you need _real_ mutation, e.g. passing a value around, have it modified by many pieces of code, we provide a slightly heavier [mutation feature](mutation.md).
