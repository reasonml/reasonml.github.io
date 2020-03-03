---
title: String & Character
---

## String

Reason strings are delimited using **double** quotes. They transform into regular JavaScript strings.
This also means **you can directly use a string declared from another JavaScript file**, without back-and-forth conversions!

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

To concatenate strings, use `++`:

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

- Multiline string just like before
- No special character escaping
- Variable interpolation
- Better unicode support than the current default string type

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

### Usage

If you're coming from JavaScript, we **strongly recommend** you to use the [`Js.String`](http://bucklescript.github.io/bucklescript/api/Js.String.html) API in the standard library. It's brings no extra runtime code, and frees you from learning other String APIs in the ecosystem.

### Tips & Tricks

You probably don't need to use strings as much as you did! https://twitter.com/jusrin00/status/875238742621028355

In other languages, you'd often overload the meaning of string by using it as:

- a unique id: `var BLUE_COLOR = "blue"`
- an identifier into a data structure: `var BLUE = "blue"; var RED = "red"; var colors = [BLUE, RED]`
- the name of an object field: `person["age"] = 24`
- an enum: `if (audio.canPlayType() === 'probably') {...}` [(ಠ_ಠ)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canPlayType#Return_value)
- other crazy patterns you'll soon find horrible, after getting used to Reason's alternatives.

The more you overload the poor string type, the less the type system (or a teammate) can help you! Reason provides concise, fast and maintainable types & data structures alternatives to the use-cases above (e.g. variants, in a later section).

Under native compilation, Reason strings compile to a simple representation whose performance is straightforward to analyze, at the expense of sometimes requiring manual performance tuning. For example, naively concatenating strings like `"hi " ++ "how " ++ "are " ++ "you?"` unnecessarily allocates the intermediate strings `"are you?"` and `"how are you?"` (though it might be optimized into a single string in these simple cases). In this case, prefer [`String.concat`](/api/String.html). In a way, it's somewhat nice that the traditional runtime analysis we've learned in school can finally be useful again.

Under JavaScript compilation, a Reason string maps to a JavaScript string and vice-versa, so no such above concern or analysis opportunities apply.

## Char

Reason has a **legacy** type for a string with a single letter:

```reason
let firstLetterOfAlphabet = 'a';
```

**Don't use it**. Char doesn't support proper internationalization (unicode or UFT-8), and most of the time you've better served by either a string or a [variant](variant.md).

### Tips & Tricks

To convert a String to a Char (hopefully you won't need to do that), use `"a".[0]`. To convert a Char to a String, use `String.make(1, 'a')`.
