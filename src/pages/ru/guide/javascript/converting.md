---
title: Перенос JS кода
order: 5
---

Подготовка
-------

**Прежде чем начать**, пожалуйста, убедитесь, что Reason именно то,
что нужно вашей команде. Мы очень рады популярности Reason и Bucklescript,
но не хотим, чтобы люди получали плохое первое впечатление. Это сложно
потом исправить.

Это пошаговое руководство, которое поможет сконвертировать кодовую базу
быстро и эффективно. Оно не покрывает FFI фичи. Требуется базовое понимание
Reason/Bucklescript.

Синтаксис
-------

**Цель**: первое и важное, **сделать файл синтаксически корректным**.
Не беспокойтесь о неправильных типах, пропущенных модулях, плохой
организации файлов, большому количеству внешних сущностей и так далее.
Позже мы почистим все это, когда у нас будет возможность проверять
регрессии.

Так как синтаксис Reason напоминает JavaScript, вместо старта нового файла,
просто скопируйте существующий js файл и работайте с этим.

*Совет*: не забудьте использовать `refmt` в редакторе/терминале!
Если вы не знаете, например, порядок операторов, оберните их во столько
скобок сколько считаете нужным, а потом запустите форматирование. Останутся
только необходимые. Точно так же не нужно тратить время на расстановку
отступов и пробелов: `refmt` сделает это за вас.

```reason
/* Оригинальный JS код, который был скопирован */
const school = require('school');

const defaultId = 10;

function queryResult(usePayload, payload) {
  if (usePayload) {
    return payload.student
  }
  return school.getStudentById(defaultId);
}
```

На этом этапе вы можете:

- Перевести вызовы функций
- Перевести все `var`/`const` в `let`
- Спрятать `require`
- Сделать другие подобные изменения.
  Для сущностей, не имеющих BuckleScript эквивалента, используйте
  `bs.raw` ([документация](http://bucklescript.github.io/bucklescript/Manual.html#_embedding_arbitrary_js_code_as_an_expression)).

Главное **сделать файл синтаксически корректным**. Пытаться изучать сразу синтаксис,
типы и семантику, может сильно снизить вашу скорость.

```reason
/* Синтаксически валидны, но семантически неверный */
/* const school = require('school'); */

let defaultId = 10;

let queryResult usePayload payload => {
  if (usePayload) {
    payload.student
  } else {
    /* no need for early return in Reason; if-else is an expression */
    school.getStudentById defaultId;
  }
};
```

Типы, проход первый
-------

**Цель**: скорректировать типы, но минимум, чтобы продвинуться на следующий
шаг.

Вы так же иногда будете получать ошибки синтаксиса, но не в таком количестве
как на предыдущем шаге.

- Измените `foo.bar` на `foo##bar`. Эта [BuckleScript фича](http://bucklescript.github.io/bucklescript/Manual.html#_how_to_consume_js_property_and_methods) будет вашим другом некоторое время.

- Измените `{foo: bar}` на `[%bs.obj {foo: bar}]` ([docs](http://bucklescript.github.io/bucklescript/Manual.html#_create_js_objects_using_bs_obj)). После `refmt`, это будет приведено к `{"foo": bar}`.

- Для коммуникации с внешними JS файлами, используйте `external`.
  Это BuckleScript [FFI](http://bucklescript.github.io/bucklescript/Manual.html#_ffi).

  - Делайте это прямо в файле, пока нет нужны создавать отдельные файлы

  - Если это слишком сложно: создавать правильные типы для входа и выхода `external`
  используйте полиморфные типы, например `external getStudentById: 'whatever => 'whateverElse = ...`.

  - Для типов данных и шаблонов, которые сложно правильно сконвертировать, иногда можно
  использовать `external unsafeCast : myPayloadType => anotherDataType = "%identity";`.

Это лишь первый проход. Финальные типы будут выглядеть лучше. Но сейчас оцените плюсы!
Как только вы закончите с ошибкам, то JS файл будет сгенерирован. Держите его открытым рядом.
Теперь время вернуться и пофиксить все хаки!

```reason
/* синтаксичеки неверно, семантически неверно, но лучше чем было */
external getStudentById: 'whatever => 'whateverElse = "getStudentById" [@@bs.module "school"];

let defaultId = 10;

let queryResult usePayload payload => {
  if (usePayload) {
    payload##student /* this will be inferred as `Js.t 'a` */
  } else {
    getStudentById defaultId;
  }
};
```

Семантика времени работы
-------

**Цель**: пофиксить все ошибки в конечном JS.

Сравните это с вашим старым JS файлом. Полученный код, скорее всего
некорректен. Скорее всего вы пропустили некоторые внешние объявления.

- Опишите форму JS объектов (штуки, которые требуют `##`).

- По возможности замените их на записи/варианты/идиоматические типы OCaml.

Каждый раз при изменении проверяйте, что на выходе в JS.

```reason
type student; /* абстрактный тип, описан далее */
external getStudentById: 'whatever => student = "getStudentById" [@@bs.module "school"];

type payloadType = Js.t {. student: student};

let defaultId = 10;

let queryResult usePayload (payload: payloadType) => {
  if (Js.to_bool usePayload) {
    payload##student
  } else {
    getStudentById defaultId;
  }
};
```

Чистим код (Типы, проход второй)
-------

**Цель**: сделать типы корректными (звучащими).

Вернемся и пофиксим все, что пропустили при первом проходе.

- Убедитесь, что у вас нет неопределенных типов в `external`

- Вы можете оставить `external` или переместить в отдельный файл


```reason
/* в текущем файле */
type payloadType = Js.t {. student: School.student};

let defaultId = 10;

let queryResult usePayload (payload: payloadType) => {
  if (Js.to_bool usePayload) {
    payload##student
  } else {
    School.getStudentById defaultId;
  }
};
```

```reason
/* в отдельном School.re файле */
type student;
external getStudentById: int => student = "getStudentById" [@@bs.module "School"];
external getAllStudents: unit => array student = "getAllStudents" [@@bs.module "School"];
```

Тип `student` не имеет содержимого. Он называется [абстрактным типом](../language/module#%D0%A1%D0%B8%D0%B3%D0%BD%D0%B0%D1%82%D1%83%D1%80%D1%8B).
Это очень удобный способ указывать отношения между внешними вызовами,
без знания структуры данных.

И теперь все готово!


Советы
-------

**Не пытайтесь** сконвертировать JS файл за один присест. Это только
вас затормозит! Это нормально иметь внешние зависимости и `bs.obj`, а
также не иметь удобных OCaml фич (вариантов, именованных аргументов, и так далее).
Как только вы переведете несколько файлов, вы сможете вернуться и
сделать рефаторинг **быстрее** так как система типов будет помогать

Все утилиты, которые вы используете (например конвертирование `Js.null_undefined Js.boolean` в `bool`)
положите в отдельный файл `tempUtils.re`. Это будет хорошим примером
для ваших коллег.

Мы **крайне рекомендуем** добавить полученный JS в систему контроля версий.
Это упростит сборку и в случае когда вас нет, ваши коллеги смогут сделать небольшие
изменения, проверить diff и отловить ошибки. Это так же может быть полезно для
быстрых патчей прямо в JS код. Это как [снапшоты Jest](https://facebook.github.io/jest/docs/snapshot-testing.html) бесплатно!

Как всегда, вы можете написать нам в [Discord](https://discord.gg/reasonml).
