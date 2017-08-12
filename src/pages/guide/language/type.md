---
title: Type!
order: 15
---

Types are the highlight of Reason! Here, you get a glimpse of why so many are excited about them.

This section briefly introduces the types syntax so that you can power through the subsequent sections without getting confused. More advanced topics on types can be found in the [More On Types](/guide/language/more-on-type) section.

### Annotations

This let-binding doesn't contain any written type:

```reason
let score = 10;
```

Reason knows that `score` is an `int`, judging by the value `10`. This is called **inference**.

But types can also be explicitly written down by choice:

```reason
let score: int = 10;
```

You can also wrap any expression in parentheses and annotate it:

```reason
let myInt = 5;
let myInt = (5: int);
let myInt = (5: int) + (4: int);
let add (x: int) (y: int) :int => x + y;
let drawCircle radius::(r: int) :unit => ...;
```

Note: in the last line, `radius::(r: int)` is a labeled argument. More on this [here](/guide/language/function).

### Aliases

You can refer to a type by a different name. They'll be equivalent:

```reason
type scoreType = int;
let x: scoreType = 10;
```

### Design Decisions

Reason is backed by OCaml, whose type system has received decades of engineering. Here are a few highlights:

- **Types can be inferred**. The type system deduces the types for you even if you don't manually write them down. This speeds up the prototyping phase. Additionally, editor features like [VSCode's codelens](https://github.com/reasonml-editor/vscode-reasonml) show you all the types while you write code.

- **The type coverage is always 100%**. We don't need a "type coverage" tool! Every piece of Reason code has a type.

- **The type system is completely "sound"**. This means that, as long as your code compiles fine, every type guarantees that it's not lying about itself. In a conventional, best-effort type system, just because the type says it's e.g. "an integer that's never null", doesn't mean it's actually never null. In contrast, a pure Reason program has no null bugs.
