---
title: Type!
---

Types are the highlight of Reason! Here, you get a glimpse of why so many are excited about them.

This page briefly introduces the types syntax so that you can power through the subsequent sections without getting confused. More advanced topics on types can be found in the [More On Type](more-on-type.md) section.

## Annotations

This let-binding doesn't contain any written type:

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let score = 10;
```
<!--Output-->
```js
var score = 10;
```
<!--END_DOCUSAURUS_CODE_TABS-->

Reason deducted that `score` is an `int`, judging by the value `10`. This is called **inference**.

But types can also be explicitly written down by choice:

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let score: int = 10;
```
<!--Output-->
```js
var score = 10;
```
<!--END_DOCUSAURUS_CODE_TABS-->

You can also wrap any expression in parentheses and annotate it:

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let myInt1 = 5;
let myInt2: int = 5;
let myInt3 = (5: int) + (4: int);
let add = (x: int, y: int): int => x + y;
let drawCircle = (~radius as r: int) : string => "hi";
```
<!--Output-->
```js
var myInt1 = 5;
var myInt2 = 5;
var myInt3 = 9;
function addInts(x, y) {
  return x + y | 0;
}
function drawCircle(r) {
  return "hi";
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

Note: in the last line, `(~radius as r: int)` is a labeled argument. More on this [here](function.md).

## Aliases

You can refer to a type by a different name. They'll be equivalent:

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
type scoreType = int;
let x: scoreType = 10;

```
<!--Output-->
```js
var x = 10;
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Design Decisions

Reason's type system is the crystallization of decades of research and engineering. Here are a few highlights:

- **Types can be inferred**. The type system deduces the types for you even if you don't manually write them down. This speeds up the prototyping phase. Additionally, editor features like [VSCode's codelens](https://github.com/jaredly/reason-language-server) in our editor integrations show you all the types while you write code.

- **The type coverage is always 100%**. We don't need a "type coverage" tool! Every piece of Reason code has a type.

- **The type system is completely "sound"**. This means that, as long as your code compiles fine, every type guarantees that it's not lying about itself. In a conventional, best-effort type system, just because the type says it's e.g. "an integer that's never null", doesn't mean it's actually never null. In contrast, a pure Reason program has no null bugs.

Many folks who come from a gradually typed community (for example, having experienced using a type system on top of JavaScript, Ruby, Python, etc.) don't understand the fuss about Reason's types "soundness". In reality, there's a big difference between these type systems that are "best effort", aka 99.9% correct, and our type system that's "sound", aka 100% correct.

Many claim that "99% is good enough". While this could be true in other domains, such claim isn't very valid for code. **Naive probability**: If your code has 100 types, 99.9% probability of correctness per type means that overall, that code's correctness is `99.9% ^ 100 = 90.4%`

Oops. That's potentially lots of false positives in the system's reported types now. Which ones are wrong though? That type system sure isn't telling you ¯\\\_(ツ)\_/¯.

