---
title: Примеры
order: 60
---

Пример стоит тысячи слов.

Этот раздел рассчитан на тех, кто только рассматривать Reason и хочет
понять основные идиомы и конвенции языка. Если вы знаете хороший пример
запросите изменение в этом файле.

### Использование типа `option`

`option` это [вариант](../../guide/language/variant) который идет со
[стандартной библиотекой](/api/index.html). Он убирает необходимость в null типе.

```reason
let possiblyNullValue1 = None;
let possiblyNullValue2 = Some "Hello@";

switch possiblyNullValue2 {
| None => print_endline "Nothing to see here."
| Some message => print_endline message
};
```

### Создание параметризированного типа

```reason
type universityStudent = {gpa: float};

type response 'studentType = {status: int, student: 'studentType};

let result: response universityStudent = fetchDataFromServer ();
```

### Создание JS объекта

Само собой это только для [компиляции в JS](../../guide/javascript).

```reason
let obj1 = {
  "name": "John",
  "age": 30
};
/* компилируется в точно такой же JS объект */
```

Объект выше — это не запись, обратите внимание на кавычки у ключей.
Это синтаксический сахар для
[bs.obj](http://bucklescript.github.io/bucklescript/Manual.html#_create_js_objects_using_bs_obj).
Тип выводится. Следующий пример указывает тип явно.

### Тип JS объекта

```reason
type payload = Js.t {.
  name: string,
  age: int
};
let obj1: payload = {"name": "John", "age": 30};
```

`{. name: string, age: int}` это синтаксис Reason/OCaml типа объекта (не записи!).
Он использует тип  `Js.t`, поэтому BuckleScript корректно комплириуется.
Обычные OCaml объекты компилируются в нечто другое.

### Биндинг JS модуля с экспортом по умолчанию

Допустим у вас есть модуль, называемый `store.js`, и у него есть
экспорт по умолчанию `getDate`.

```reason
type store = Js.t {. getDate : (unit => float) [@bs.meth]};
external store : store = "./store" [@@bs.module];
Js.log store;
Js.log (store##getDate ());
```
