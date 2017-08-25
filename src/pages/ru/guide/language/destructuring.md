---
title: Деструктурирование и паттерн матчинг
order: 5
---

"Деструктурирование (Деструктурирующее присваивание)" — визуально лаконичный спобоб
извлекать поля из структуры данных, присваивая их переменным. Вы можете использовать
деструктурирование везде, где используете переменные. Для этого вместо имени переменной
напишите форму объекта.

Следующий код присваивает переменные: `ten = 10`, `twenty = 20`

```reason
let someInts = (10, 20);
let (ten, twenty) = someInts;
```

Следующий код присваивает переменные: `n = "Guy"`, `a = 30`

```reason
type person = {name: string, age: int};
let somePerson = {name: "Guy", age: 30};
let {name: n, age: a} = somePerson;
```

Деструктурирование позволяет использовать аннотации типов.
```reason
let (ten: int, twenty: int) = someInts;
let {name: (n:string), age: (a:int)} = somePerson;
```

Можно работать с именованными аргументами.

```reason
type person = {name: string, age: int};

let someFunction person::{name} => {
  /* переменную `name` можно использовать */
}

let otherFunction person::({name} as thePerson) => {
  /* можно использовать как `name` так и всю запись `thePerson` */
}
```

Более продвинутая версия деструктурирования называется **паттерн матчинг (pattern matching)**. Система типов очень помогает с этим подходом. Возьмем такой вариант:

```reason
type payload =
| BadResult int
| GoodResult string
| NoResult;
```

Используя `switch` можно "деструктурировать" вариант:

```reason
let data = GoodResult "Product shipped!";

let message =
  switch data {
  | GoodResult theMessage => "Success! " ^ theMessage
  | BadResult errorCode =>
    "Something's wrong. The error code is: " ^ (string_of_int errorCode)
  };
```

Заметьте как мы деструктурировали значение `data` в каждом отдельном случае. При попытке
скомпилировать код выше, компилятор выдаст предупреждение:

```
Warning 8: this pattern-matching is not exhaustive.
Here is an example of a value that is not matched:
NoResult
```

Перевод:
```
Предупреждение 8: этот паттерн не исчерпывающий.
Вот пример значения, которое не соответствует:
NoResult
```

Разве это не здорово? Проверяя форму данных, система типов указывает на необработанные случаи.
Этот **условный** аспект является сущностью паттерн матчинга. Большая часть структур
данных работает с ним:

```reason
switch myList {
| [] => print_endline "Пустой список"
| [a, ...theRest] =>
  print_endline ("Список со значением в начале " ^ a)
};

switch myArray {
| [|1, 2|] => print_endline "Массив с двумя значениями: 1 и 2"
| _ => print_endline "Массив"
}
```

Вы даже можете использовать `switch` на строках, целых числах и других типах.
Вы можете определить несколько шаблонов, которые приводят к одному результату!

```reason
let reply =
  switch message {
  | "Reason's pretty cool" => "Yep"
  | "good night" => "See ya!"
  | "hello"
  | "hi"
  | "heya"
  | "hey" => "hello to you too!"
  | _ => "Nice to meet you!"
  };
```

В совокупности с другими структурами данных, патерн матчинг может порождать крайне
лаконичный, проверенный компилятором, производительный код:

```reason
let message =
  switch data {
  | GoodResult theMessage => "Success! " ^ theMessage
  | BadResult (0 | 1 | 5) => "Something's wrong. It's a server side problem."
  | BadResult errorCode => "Unknown error occurred. Code: " ^ string_of_int errorCode
  | NoResult => "Things look fine"
  };
```

Если вам нужна произвольную логику срабатывания паттерна, то вы можете использовать
условие `when` (по сути это сахар для `if`):

```reason
let message =
  switch data {
  | GoodResult theMessage => ...
  | BadResult errorCode when isServerError errorCode => ...
  | BadResult errorCode => ... /* otherwise */
  | NoResult => ...
  };
```
