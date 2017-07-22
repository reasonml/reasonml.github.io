---
title: Мутации
order: 8
---


Reason/OCaml предоставляет возможности мутации данных при помощи
[массивов](#built-in-data-types-array) и [изменяемых полей записи](#built-in-data-types-record).
Иногда они хороши для производительности и некоторых паттернов программирования.

Для отдельной изменяемой ссылки (то есть присваивания переменной в `let`),
стандартная библиотека предлагает синтаксический сахар для
записи — [`ref`](http://caml.inria.fr/pub/docs/manual-ocaml/libref/Pervasives.html#TYPEref).
Используется следующим образом:

```reason
let myValue = ref 10;
if (...) {
  myValue := 20;
};
print_int !myValue;
```

Под капотом это работает так:

```reason
let myValue = {contents: 10};
if (...) {
  myValue.contents = 20;
};
print_int myValue.contents;
```

В этой записи нет ничего особенного, кроме того, что она предоставлена стандартной
библиотекой.

Вы также можете добиться легких локальных "мутаций" просто переопределяя let:

```reason
let foo = 10;
let foo = someCondition ? foo + 5 : foo; /* either 15 or 10 */
let foo = "hello";
print_endline foo; /* "hello" */
```

Заметьте, что мы переопределили `foo` в предпоследней строке. Это разрешено системой
типов, так как строки кода после видят только последнюю привязку. [Подробнее](#basics-let-binding).
