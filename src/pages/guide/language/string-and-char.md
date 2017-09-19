---
title: String & Char
order: 20
---

### String

Reason strings are delimited using **double** quotes (single quotes are reserved for the character type below).

```reason
let greeting = "Hello world!";
let multilineGreeting = "Hello
 world!";
```

Special characters in the string need to be escaped:

```reason
let oneSlash = "\\";
```

To concatenate strings, use `^`:

```reason
let greetings = "Hello " ^ "world!";
```

#### Quoted String

There's a special syntax for string that allows

- multiline string just like before
- no special character escaping
- hooks for special pre-processors

```reason
let greetingAndOneSlash = {|Hello
World
\
Hehe...
|};
```

Analogically speaking, it's like JavaScript's backtick string interpolation, except without needing to escape special chars, and without built-in interpolation of variables. Though you can trivially restore the latter functionality, [as BuckleScript has done](http://bucklescript.github.io/bucklescript/Manual.html#_unicode_support_with_string_interpolation_since_1_7_0):

```reason
let world = {js|世界|js}; /* Supports Unicode characters */
let helloWorld = {j|你好，$world|j}; /* Supports Unicode and interpolation variables */
```

BuckleScript's special pre-processor can then look for such `js` and `j` markers around the string and transforms it into something else.

#### Usage

[More string operations can be found in the standard library](/api/String.html). For JS compilation, see the familiar `JS.String` API bindings in the [BuckleScript API docs](http://bucklescript.github.io/bucklescript/api/Js_string.html). Since a Reason string maps to a JavaScript string, you can mix & match the string operations in both standard libraries.

#### Tips & Tricks

https://twitter.com/jusrin00/status/875238742621028355

**You have an expressive type system now**! In an untyped language, you'd often overload the meaning of string by using it as:

- a unique id: `var BLUE_COLOR = "blue"`
- an identifier into a data structure: `var BLUE = "blue"; var RED = "red"; var colors = [BLUE, RED]`
- the name of an object field: `person["age"] = 24`
- an enum: `if (audio.canPlayType() === 'probably') {...}` [(ಠ_ಠ)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canPlayType#Return_value)
- other crazy patterns you'll soon find horrible, after getting used to Reason's alternatives.

The more you overload the poor string type, the less the type system can help you! Reason provides concise, fast and maintainable types & data structures alternatives to the use-cases above (e.g. variants, in a later section).

Under native compilation, Reason strings compile to a simple representation whose performance is straightforward to analyze, at the expense of sometimes requiring manual performance tuning. For example, naively concatenating strings like `"hi " ^ "how " ^ "are " ^ "you?"` unnecessarily allocates the intermediate strings `"are you?"` and `"how are you?"`. In this case, prefer [`String.concat`](/api/String.html). In a way, it's somewhat nice that the traditional runtime analysis we've learned in school can finally be useful again.

Under JavaScript compilation, a Reason string maps to a JavaScript string and vice-versa, so no such above concern or analysis opportunities.

#### Design Decisions

Quoted string's feature of not escaping special characters enables neat DSLs like [regular expression](/api/Str.html):

```reason
let r = Str.regexp {|hello \([A-Za-z]+\)|};
```

as opposed to

```reason
let r = Str.regexp "hello \\([A-Za-z]+\\)";
```

Though for JS compilation, you'd use [`[%bs.re]`](http://bucklescript.github.io/bucklescript/Manual.html#_regex_support) and [`Js.Re`](https://bucklescript.github.io/bucklescript/api/Js.Re.html) instead, since `Str` is not available.

Reason/OCaml's emphasis on simplicity over cleverness can be seen here through its straightforward native string implementation. An overly sophisticated string implementation can sometimes [backfire](http://mrale.ph/blog/2016/11/23/making-less-dart-faster.html).

### Char

Reason has a type for a string with a single letter:

```reason
let firstLetterOfAlphabet = 'a';
```

**Note**: Char doesn't support Unicode or UTF-8.

#### Tips & Tricks

A character [compiles to an integer ranging from 0 to 255](/try/?reason=DYUwLgBAhhC8EHIoKA), for extra speed. You can also pattern-match (covered later) on it:

```reason
fun isVowel theChar => switch theChar {
| 'a' | 'e' | 'i' | 'o' | 'u' | 'y' => true
| _ => false
};
```
