---
title: Императивные циклы
order: 9
---

#### Циклы for

Циклы for производят итерацию с начального и по конечное (включительно) значения.

```reason
for myBinding in (startValue) to (endValue) {
  /* использование myBinding */
};
```

Скобки вокруг `startValue` и `endValue` могут быть опущены:

```reason
let xStart = 1;
let xEnd = 3;
/* напечатает: 1 2 3 */
for x in xStart to xEnd {
  print_int x;
  print_string " ";
};
```

Можно изменить направление перебора цикла `for` на обратное, используя
ключевое слово `downto`.

```reason
for myBinding in (startValue) downto (endValue) {
  statements
};
```

```reason
let xStart = 3;
let xEnd = 1;
/* напечатает: 3 2 1 */
for x in xStart downto xEnd {
  print_int x;
  print_string " ";
};
```

#### Циклы while

Циклы while исполняют блок кода, пока некоторое условие является истинным.

```reason
while (testCondition) {
  statements;
};
```

Скобки вокруг `testCondition` могут быть опущены:

```reason
while true {
  print_endline "hello";
};
```

#### Выход из цикла

В языке нет ключевого слава `break` для завершения цикла. И нет возможности использовать
`return` для выхода из функции. В большинстве случаев лучше использовать
map/filter/reduce вместо императивных циклов. Однако, мы можем использовать
[изменяемые переменные](#diving-deeper-mutation) для выхода из цикла.
Пример без использования `ref`:

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
