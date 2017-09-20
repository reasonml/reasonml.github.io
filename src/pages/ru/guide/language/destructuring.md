---
title: Деструктурирование
order: 130
---

"Деструктурирование" — это визуально короткий способ извлечения полей из структур данных.
Вы можете использовать деструктурирование там, где обычно используете переменную.

### Использование

Следующий код делает привязки `ten = 10`, `twenty = 20`:

```reason
let someInts = (10, 20);
let (ten, twenty) = someInts;
```

А этот привязки `name = "Guy"`, `age = 30`:

```reason
type person = {name: string, age: int};
let somePerson = {name: "Guy", age: 30};
let {name, age} = somePerson;
```

Можно переименовывать переменные `n = "Guy"`, `a = 30`:

```reason
let {name: n, age: a} = somePerson;
```

Деструктурирование позволяет делать аннотации типоы:

```reason
let (ten: int, twenty: int) = someInts;
let {name: (n: string), age: (a: int)} = somePerson;
```

Возможно деструктурирование именованных аргументов:

```reason
type person = {name: string, age: int};

let someFunction person::{name} => {
  /* можно использовать `name` тут */
}

let otherFunction person::({name} as thePerson) => {
  /* можно использовать как `name` так и всю запись `thePerson`*/
}
```

### Советы и трюки

Деструктурирование может сделать ваш код намного более кратким, не требуя от вас названия
промежуточных переменных. Используйте их! Но не злоупотребляйте ими и не делайте свой код
чрезмерно вложенным и кратким.

Если вы делаете деструктурирование записи или вариант, чье объявление не в текущем файле, то
вам нужно явно указать это. Подробнее [тут](../../guide/language/record#record-needs-an-explicit-definition) и [тут](../../guide/language/variant#variant-needs-an-explicit-definition).


