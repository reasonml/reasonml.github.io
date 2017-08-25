---
title: Типы
order: 1
---

#### Аннотации типов

По выбору, типы могу быть выведены или указаны в явной форме.

```reason
let score: int = 10;
```

Также вы можете оборачивать выражения в скобки и аннотировать их:

```reason
let myInt = 5;
let myInt = (5 : int);
let myInt = (5 : int) + (4 : int);
let add (x: int) (y: int) :int => x + y;
let drawCircle radius::(r: int) :unit => ...; /* radius::(r: int) — это именованный аргумент. Подробнее [тут](https://reasonml.github.io/guide/language/functions) */
```

#### Псевдонимы типов

Вы можете ссылаться на тип, используя другое имя:

```reason
type scoreType = int;
let x: scoreType = 10;
```
