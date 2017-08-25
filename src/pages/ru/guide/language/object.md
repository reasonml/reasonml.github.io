---
title: Объект
order: 175
---

Большую часть времени вы будете использовать записи для пар ключ-значение. Однако, в некоторых
ситуациях вы возможно захотите использовать объекты. Они немного более гибкие, но приносят
свои компромиссы.

**If you come from JavaScript**, you're mostly likely **not** looking for plain Reason objects. Skip right to the Tip & Tricks section below.

### Использование

#### Декларация типа

Объектам **не требуется обязательная декларация типа**, но они могут ее иметь. Это выглядит
похоже на тип записи только с точкой `.`:

```reason
type tesla = {
  .
  color: string
};
```

Точка в начале означает, что это "закрытый" тип. Объекты, основанные на этом типе должны иметь
точно такую же форму.

```reason
type car 'a = {
  ..
  color: string
} as 'a;
```

Две точки означают, что тип "открытый", а его объекты могут содержать другие поля и методы.
Открытый объект полиморфичен и требует параметра.

#### Создание

```reason
type tesla = {
  .
  drive: int => int
};

let obj :tesla = {
  val hasEnvy = ref false;
  pub drive speed => {
    this#enableEnvy true;
    speed
  };
  pri enableEnvy envy => {
    hasEnvy := envy
  };
};
```

Это объект типа tesla, имеющий публичный метод `drive`. Он так же содержит приватный метод
`enableEnvy`, который доступен только из других методов.

Как вы видите, объекты Reason имеют доступ к `this`, который всегда ссылается на объект
(в отличии от JavaScript).

Следующий пример демонстрирует объект открытого типа, который требует параметр. Объект должен
реализовывать все методы типа-параметра.

```reason
type tesla 'a = {
  ..
  drive: int => int
} as 'a;

let obj:
  tesla {. drive: int => int, doYouWant: unit => bool}
  = {
  val hasEnvy = ref false;
  pub drive speed => {
    this#enableEnvy true;
    speed
  };
  pub doYouWant () => !hasEnvy;
  pri enableEnvy envy => {
    hasEnvy := envy
  };
};
```

### Советы и трюки

Если вы пришли из JavaScript, вам скорее всего не нужны Reason объекты, а нужны BuckleScript [специальные объекты] (https://bucklescript.github.io/bucklescript/Manual.html#_binding_to_js_objects). Они отличаются следующим:

- доступ к полям через `##`
- присваивание полей через `#=`
- всегда используются как параметр-тип в типе `Js.t`
- компилируются в настоящие JS объекты

Так как они встречаются часто, то Reason дает таким BS объектам `[%bs.obj {foo: bar}]` специальный
синтаксически сахар: `{"foo": bar}`. Выглядит как запись с кавычками.
