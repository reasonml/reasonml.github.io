---
title: Императивные циклы
order: 150
---

### Циклы for

Циклы for позволяют итерироваться от начального до конечного (включительно) значений.

```reason
for myBinding in (startValue) to (endValue) {
  /* используйте myBinding тут */
};
```

Скобки вокруг `startValue` и `endValue` могут быть пропущены, если необязательны:

```reason
let xStart = 1;
let xEnd = 3;
/* prints: 1 2 3 */
for x in xStart to xEnd {
  print_int x;
  print_string " ";
};
```

Вы можете итерировать `for` в обратную сторону, используя `downto`.

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

### Циклы while

Такие циклы исполняют блок кода, пока условие равно true.

```reason
while (testCondition) {
  statements;
};
```

### Советы и трюки

В Reason нет способа остановить цикл в середине (`break` в других языках) и нет способа
сделать возврат из середины функции (`return`). Вместо циклов используйте
`map`/`filter`/`reduce` где возможно. Однако вы можете легко выйти из цикла,
используя [мутабельные привязки](../../guide/language/mutation).

```reason
Random.self_init ();
let break = ref false;
while (not !break) {
  if (Random.int 10 === 3) {
    break := true
  } else {
    print_endline "hello"
  }
};
```
