---
title: Pipe First
---

Pipe first is the operator to apply a function to a value where data is passed as the first argument. `->` is a convenient operator that allows you to "flip" your code inside-out. `a(b)` becomes `b->a`.

```reason
let result = value->function;
```

Imagine you have the following:

```reason
validateAge(getAge(parseData(person)))
```

This is slightly hard to read, since you need to read the code from the innermost part, to the outer parts. Use Pipe First to streamline it

```reason
person
  ->parseData
  ->getAge
  ->validateAge
```

Basically, `parseData(person)` is transformed into `person->parseData`, and `getAge(person->parseData)` is transformed into `person->parseData->getAge`, etc.

**This works when the function takes more than one argument too**.

```reason
a(one, two, three)
```

is the same as

```reason
one->a(two, three)
```

This works with labeled arguments too.

This section is documented under Melange's documentation as well: [Pipe first](https://melange.re/v2.0.0/communicate-with-javascript/#pipe-first).
