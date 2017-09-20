---
title: Модуль
order: 180
---

### Базовые сведения

**Модели похожи на мини файлы**! Они могут содержать объявления типов, `let` привязки,
вложенные модули и так далее.

#### Создание

Для создания используйте ключевое слово `module`. Имя модуля должно начинаться с заглавной
буквы. Все что вы обычно можете поместить в файл `.re`, вы можете поместить и в тело
модуля внутри фигурных скобок.

```reason
module School = {
  type profession = Teacher | Director;

  let person1 = Teacher;
  let getProfession person =>
    switch person {
    | Teacher => "A teacher"
    | Director => "A director"
    };
};
```

Содержимое модуля (включая типы) может быть доступно с использованием точки. Это делает
модули удобным инструментом для создания пространства имен.

```reason
let anotherPerson: School.profession = School.Teacher;
print_endline (School.getProfession anotherPerson); /* "A teacher" */
```

Вложенные модули работают так же:

```reason
module MyModule = {
  module NestedModule = {
     let message = "hello";
  };
};

let message = MyModule.NestedModule.message;
```

#### Открытие (`open`) модуля

Иногда неудобно постоянно ссылаться на имя модуля при обращении к типу/переменной.
Мы можем открыть модуль и начать ссылаться на содержимое напрямую. Есть два способа это
сделать.

Локальное открытие:

```reason
let message =
  School.(
    switch person1 {
    | Teacher => "Hello teacher!"
    | Director => "Hello director!"
    }
  );
```

Глобальное открытие. **Используйте аккуратно, потому как это уменьшает удобство чтения**:

```reason
open School;
let anotherPerson: profession = Teacher;
printProfession anotherPerson;
```

#### Расширение моделей

Используя `include` можно добавить содержимое одного модуля к другому. Это часто играет роль
наследования или миксинов.

```reason
module BaseComponent = {
  let defaultGreeting = "Hello";
  let getAudience ::excited => excited ? "world!" : "world";
};

module ActualComponent = {
  /* the content is copied over */
  include BaseComponent;
  /* overrides BaseComponent.defaultGreeting */
  let defaultGreeting = "Hey";
  let render () => defaultGreeting ^ " " ^ getAudience excited::true;
};
```

**Важно**: `include` и `open` совершенно различны. Первый буквально копирует содержимое внутрь
нового модуля, а второй позволяет ссылаться на содержимое открываемого модуля без указания
имени (то есть `foo` вместо `MyModule.foo`).

#### Каждый `.re` файл является модулем

В OCaml/Reason файл является модулем, что дает интересную выразительность, которая требовала
бы генерации кода в других языках. Файл `react.re` неявно формирует модуль `React`, который
может использоваться в других файлах.

```reason
/* fileA.re. This typically compiles to module FileA below */
let a = 1;
let b = 2;

/* fileB.re */
/* Maps fileA's implementation to a new API */
let alpha = FileA.a;
let beta = FileA.b;
```

Пример "копирования файла":

```reason
/* fileA.re. This typically compiles to module FileA below */
let a = 1;
let b = 2;

/* fileB.re */
/* compiles to exactly fileA.re's content with no runtime overhead! */
include FileA;
```

Сигнатуры
----------------------------------

Тип модуля называет сигнатурой и может быть записан явно.

#### Создание

Для создания сигнатуры используйте ключевое слово `module type`. Имя сигнатуры должно начинаться
с заглавной буквы.

```reason
/* Picking up previous section's example */
module type EstablishmentType = {
  type profession;
  let getProfession: profession => string;
};
```

Сигнатура определяет список требований, которым модуль должен соответствовать для того, чтобы
подходить под сигнатуру. Эти требования бывают следующих видов:

- `let x: int;` требует `let` привязку с именем `x` типа `int`.

- `type t = someType;` требует, чтобы тип `t` был равен типу `someType`.

- `type t;` требует наличия типа `t`, но без указания что это за тип конкретно.
  Мы используем `t` для того, чтобы описать взаимодействия, например`let makePair: t -> (t, t)`. Но мы не предполагаем, что `t` это `int`. Это дает нам хорошие возможности для абстракции.

Для демонстрации различных элементов сигнатуры, возьмем следующую сигнатуру
`EstablishmentType` которая требует от модуля:

- Объявить тип `profession`
- Иметь функцию, которая принимает тип `profession` и возвращает строку

**Важно**:

Модули типа `EstablishmentType` могут содержать больше полей, чем указано в
сигнатуре, как в случае с модулем `School` в предыдущей секции (если бы мы
указали ему тип `EstablishmentType`, в обратном случае модуль `School`
делал все поля доступными снаружи). Это эффективно делает поле `person1`
деталью реализации. Внешний код не имеет у к нему доступ, так как его описания
нет в сигнатуре. Сигнатура **ограничивает** доступ из вне.

Тип `EstablishmentType.profession` является **абстрактным**: он не является
конкретным типом. Он говорит "мне не важно какой это тип, но именно он используется
как входной параметр в `getProfession`". Это удобно для реализации нескольких
модулей под одним интерфейсом.

```reason
module Company: EstablishmentType = {
  type profession = CEO | Designer | Engineer | ...;

  let getProfession person => ...
  let person1 = ...;
  let person2 = ...;
};
```

Это также полезно для того, чтобы спрятать внутренний тип как делать реализации
от внешнего кода. Если вы спросите систему типов, что за тип у
`Company.profession` то вместо того, чтобы показать вариант, она скажет только
"это `Company.profession`".

#### Каждый `.rei` файл является сигнатурой

Так же как `react.re` неявно объявляет модуль `React`, файл
`react.rei` неявно объявляет сигнатуру для `React`. Если `react.rei` не
предоставлен, то сигнатура `react.re` по умолчанию делает видимыми все поля
модуля. Так как они не содержат деталей реализации, то файлы `.rei`
используются как документация к публичным API соответствующих модулей.

```reason
/* файл react.re (реализация. Комрилируется в модуль React) */
type state = int;
let render = fun str => str;
```

```reason
/* file react.rei (интерфейс. Компилируется в сигнатуру модуля React) */
type state = int;
let render: str => str;
```

Функции модулей (функторы)
----------------------------------

Модули могут быть переданы в функции! Однако модули представляют собой
отдельный "слой" языка, поэтому мы не можем передавать их в *обычные*
функции. И вместо этого мы передаем их в специальные функции, называемые
"функторами".

Синтаксис для объявления и использования функторов поход на синтаксис
обычных функций. Основные отличия:

- Функторы используют ключевое слово`module` вместо `let` и `fun`
  (в данном случае fun можно читать как functor)
- Функтор принимает модуль как аргумент и возвращает модуль
- Функторы *требуют* аннотации аргументов
- Имя функтора должно начинаться с заглавной буквы

Фот пример функтора `MakeSet` который получаем модуль типа `Comparable`
и возвращает набор (set) который может содержать элементы типа-аргумента.

```reason
module type Comparable = {
  type t;
  let equal: t => t => bool;
};

module MakeSet = fun (Item: Comparable) => {
  /* список используется как структура для хранения */
  type backingType = list Item.t;
  let empty = [];
  let add (currentSet: backingType) (newItem: Item.t) :backingType =>
    /* если элемент существует */
    if (List.exists (fun x => Item.equal x newItem) currentSet) {
      currentSet /* возвращаем тот же список */
    } else {
      [newItem, ...currentSet]; /* добавляем в начало и возвращаем */
    }
};
```

Функторы применяются с помощью с помощью синтаксиса похожего на применение
функции.

```reason
module IntPair = {
  type t = (int, int);
  let equal (x1, y1) (x2, y2) => x1 == x2 && y1 == y2;
  let create x y => (x, y);
};

module SetOfIntPairs = MakeSet IntPair;
```

#### Типы функторов

Как и с типами модулей, типы функторов так же нужны для ограничения
того, что мы можем знать о внутренностях функтора. Тип похож на типы
функций, только с заглавными именами, представляющими сигнатуры модулей,
который функтор принимает и возвращаемого модуля. В предыдущем примере
мы выставляли на показ внутренний тип (List). Дав `MakeSet` сигнатуру,
мы можем спрятать внутреннюю структуру.


```reason
module type Comparable = ...

module type MakeSetType = (Item: Comparable) => {
  type backingType;
  let empty: backingType;
  let add: backingType => Item.t => backingType;
};

module MakeSet: MakeSetType = fun (Item: Comparable) => {
  ...
};
```

Недостатки
----------------------------------

Модули и функторы являются отдельным "слоем" языка, в отличии от остальных
частей (функций, биндингов, структур данных, и так далее). Например, вы
не можете передать их в кортеж или запись. Используйте их с умом. В
большинстве случаев просто записи или функции будет достаточно.

```reason
module School = {...};

/* Ошибка синтаксиса! */
let schools = (School, School);
```
