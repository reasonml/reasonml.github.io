---
title: Подробнее о типах
order: 7
---

#### Взаимно рекурсивные типы

Как и функции типы могут быть взаимно рекурсивными, если использовать `and`:

```reason
type student = {taughtBy: teacher}
and teacher = {students: list student};
```

**Заметте** что точка запятой есть только после второй строки.

#### Аргументы типов

Типы могут быть "параметризованы" (представьте себе генерики в других языках).
Это как если бы тип был функцией, которая принимает аргумент и возвращает новый тип.
Имена параметров должны начинаться с `'`.

Типы с параметрами позволяют избежать дублирования кода. До:

```reason
/* кортеж из трех элементов */
type intCoordinates = (int, int, int);
type floatCoordinates = (float, float, float);

let buddy: intCoordinates = (10, 20, 20);
```

После:

```reason
type coordinates 'a = ('a, 'a, 'a);

/* применить "тип-функцию" и вернуть новый тип (int, int, int) */
type intCoordinatesAlias = coordinates int;
let buddy: intCoordinatesAlias = (10, 20, 20);

/* или более удобный инлайн стиль */
let buddy: coordinates float = (10.5, 20.5, 20.5);
```

На практике типа выводятся за вас. Вот более краткая версия кода:

```reason
let buddy = (10, 20, 20);
```

Система типов выведет, что это `(int, int, int)`. Не нужно писать ничего более.

Аргументы типов могут во многих местах:

```reason
/* тип `list string` */
let greetings = ["hello", "world", "how are you"];
```

Если тип не принимает параметры (то есть у нас нет "типа-функции"), то стандартной
библиотеке нужно определить типы `listOfString`, `listOfInt`, `listOfTuplesOfInt`,
и так далее.

Типы могут принимать несколько аргументов. Также типы можно компоновать.

```reason
type result 'a 'b =
| Ok 'a
| Error 'b;

type myPayload = {data: string};

type myPayloadResults 'errorType = list (result myPayload 'errorType);

let payloadResults: myPayloadResults string = [
  Ok {data: "hi"},
  Ok {data: "bye"},
  Error "Something wrong happened!"
];
```

Исключения
----------

Исключения — это лишь специальный вид [варианта](#built-in-data-types-variant),
которые можно "выбросить" в **исключительных** случаях (не злоупотребляйте ими!).
Учитывая наличие вариантов, исключения вам **не нужны**. Вы просто можете возвращать
`type result`, как показано ниже.

```reason
try (somethingThatThrows ()) {
| Not_found => print_endline "Item not found!"
| Invalid_argument message => print_endline message
};
```

Вы можете создать свое собственно исключение, так же как делаете варианты
(исключения должны начинаться с заглавной буквы).

```
exception InputClosed string;
...
raise (InputClosed "the stream has closed!");
```

Объекты
----------------------------------
Не смотря на но, что функции являются предпочтительным способом работы с Reason,
вы также можете использовать объекты.

Объект инкапсулирует данные и имеет методы, которые можно вызвать на этих данных.

##### Объявление типа объекта

Объект может иметь тип, которые определяет его структуру.

```reason
type tesla = {
  .
  color: string
};
```

Точка в начале означает, что это закрытий тип объекта. Любой объект этого типа должен
иметь точно такую же структуру полей.

```reason
type car 'a = {
  ..
  color: string
} as 'a;
```

Две точки показывают, что тип открытый. Объекты такого типа могут содержать другие
поля и методы. Открытый объект полиморфичен и потому нуждается в параметре.

Для того, чтобы создать объект не обязательно иметь тип.

##### Создание объекта
```reason
type tesla = {
  .
  drive: int => int
};

let obj:tesla = {
  val hasEnvy = {contents: false};
  pub drive speed => {
    this#enableEnvy true;
    speed
  };
  pri enableEnvy envy => {
    hasEnvy.contents = envy
  };
};
```
Это объект типа tesla и имеет публичный метод `drive`. Он так же содержит приватный
метод `enableEnvy` который доступен только из объекта.

The following example shows an open object type which uses a type as parameter. The
object type parameter is required to implement all the methods of the open object
type.
Следующий пример показывает открытый тип, который использует другой тип как параметр.
Параметр необходим, чтобы реализовать все методы открытого типа.

```reason
type tesla 'a = {
  ..
  drive: int => int
} as 'a;

let obj:
  tesla {. drive: int => int, doYouWant: unit => bool}
  = {
  val hasEnvy = {contents: false};
  pub drive speed => {
    this#enableEnvy true;
    speed
  };
  pub doYouWant () => hasEnvy.contents;
  pri enableEnvy envy => {
    hasEnvy.contents = envy
  };
};
```
