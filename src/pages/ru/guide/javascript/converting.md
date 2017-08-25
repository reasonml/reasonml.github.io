---
title: Конвертация из JS
order: 5
---

Подготовка
-------

**Прежде чем начинать**, пожалуйста, убедитесь, что Reason именно то, что
нужно вашей команде!
Мы ручаемся за популярность Reason и BuckleScript. Но не нужно безосновательно ошарашивать ваших коллег
и давать им неправильное первое впечатление. В последствии будет сложно это
исправить.

Этот гайд покажет как конвертировать код быстро и эффективно. Гайд не ставит
целью рассмотреть взаимодействие между языками. Предполагается, что у
читателя уже есть понимание Reason/BuckleScript.

Синтаксис
-------

**Цель**: **сделать файл синтаксически валидным**. Не волнуйтесь о неверных
типах, отсутствии модулей, плохой организации файлов, большом количестве
внешних зависимостей, и так далее. После того как мы настроим регрессионные
тесты мы вернемся, чтобы сделать
рефакторинг.

Так как Reason очень напоминает JS, вместо того, чтобы создавать новый файл, просто скопируйте существующий и работайте в нем.

**Совет**: не забываете, что можете использовать `refmt` в вашем редакторе/терминале.
Если вы, например, не знаете порядка операторов, то оберните их в
максимальное количество скобок затем выполните `refmt`, который оставит
только необходимое. Точно также не нужно заботиться об отступах: `refmt`
сделает все за вас.

```reason
/* оригинальный JS */
const school = require('school');

const defaultId = 10;

function queryResult(usePayload, payload) {
  if (usePayload) {
    return payload.student
  }
  return school.getStudentById(defaultId);
}
```

Теперь делаем следующее:

- Конвертируем вызов функции
- Конвертируем `var`/`const` в `let`
- Прячем `require`
- Вносим остальные изменения. Для идиом, которых нет в BuckleScript
используем `bs.raw` ([документация](http://bucklescript.github.io/bucklescript/Manual.html#_embedding_arbitrary_js_code_as_an_expression))

Главное **сконцентрируйтесь на том, чтобы сделать файл синтаксически валидным**. Попытка выучить весь синтаксис, типы и другую семантику только
затормозит процесс.

```reason
/* Семантически неверное, но синтаксически верно */
/* const school = require('school'); */

let defaultId = 10;

let queryResult usePayload payload => {
  if (usePayload) {
    payload.student
  } else {
    school.getStudentById defaultId;
  }
};
```

Типы, первый проход
-------

**Цель**: скорректировать типы минимальным образом.

Вы все еще можете видеть ошибки, но уже в меньшем количестве.

- Измените `foo.bar` на `foo##bar`. Эта
[возможность BuckleScript](http://bucklescript.github.io/bucklescript/Manual.html#_how_to_consume_js_property_and_methods)
очень поможет на начальном этапе.

- Измените  `{foo: bar}` на `[%bs.obj {foo: bar}]`, ([документация](http://bucklescript.github.io/bucklescript/Manual.html#_create_js_objects_using_bs_obj)). Выполните `refmt`, код изменится на `{"foo": bar}`.

- Для взаимодействия с JS файлами, используйте `external`. [Документация](http://bucklescript.github.io/bucklescript/Manual.html#_ffi).

  - Не описывайте внешние зависимости отдельно. Пока нет нужды разносить все
по отдельным файлам

  - Если описывать типы для `external` слишком громоздко, то используйте
  полиморфные типы: `external getStudentById: 'whatever => 'whateverElse = ...`.

  - Для типов и паттерном, которые трудно перевести можно создавать
  конвертеры `external unsafeCast : myPayloadType => anotherDataType = "%identity";`.

Это первый проход. В финальном варианте типы будут выглядеть по другому.
Зато теперь можно пользоваться полученными преимуществами. После того как
все ошибки пофикшены, JS файд будет генерироваться. Держите JS файл
открытым. Теперь вернемся и уберем все хаки.

```reason
/* уже лучше, синтакически правильно, но семантически неверно */
external getStudentById: 'whatever => 'whateverElse = "getStudentById" [@@bs.module "school"];

let defaultId = 10;

let queryResult usePayload payload => {
  if (usePayload) {
    payload##student /* это будет транслировано как `Js.t 'a` */
  } else {
    getStudentById defaultId;
  }
};
```

Семантика рантайма
-------

**Цель**: пофиксить ошибки в JS.

Сравните полученный код с вашим старым JS файлом. Скорее всего полученный код
некорректен. Скорее всего вы пропустили некоторые идиомы и неправильно описали
некоторые типы.

- Опишите форму JS объекта (те что требуют `##`)
- Сконвертируйте возможные части кода в идиоматические типы OCaml

Пока делаете это проверяйте получающийся JS.

```reason
type student; /* абстрактный тип */
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

Подчищаем код
-------

**Цель**: сделать типы правильно.

Вернемся и пофиксим все, что оставили при первом проходе.

- Убедитесь, что у вас больше нет `'whatever` типов в `external`

- Оставьте `external` в коде или переместите в отдельный файл


```reason
/* в текущем файле */
type payloadType = Js.t {. student: School.student}; /* TODO: положить в другое место! */

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
/* отдельный School.re файл */
type student;
external getStudentById: int => student = "getStudentById" [@@bs.module "School"];
external getAllStudents: unit => array student = "getAllStudents" [@@bs.module "School"];
```

Тип `student` не имеет содержимого и называется [абстрактным типом](#modules-signatures).
Это стандартный способ указать отношения между внешними вызовами без знания
какая форма у данных.

И теперь все работает!


Советы
-------

**Не пытайтесь** сконвертировать JS файл за один проход. Это только замедлит вас!
Это нормально, что в коде будет много `external` и `bs.obj`, и не будет
преимуществ OCaml (варианты, именованный аргументы, и так далее). После того как вы
сконвертируете несколько файлов, вы сможете вернуть с сделать рефакторинг **быстрее**.

Если вы используете удобные утилиты для конвертации (например, конвертирование
`Js.null_undefined Js.boolean` в `bool`) положите их в отдельный файл. Например,
`tempUtils.re`. Это поможет вашим коллегам.

Мы **крайне рекомендуем** добавить полученный JS в систему контроля версий. Это
упростит систему сборки. Ваши коллеги смогут делать небольшие изменения и смотреть
как изменился JS. Это так же поможет быстро вносить критичные патчи прямо в JS код.
Даже если вы обновите версию Bucklescript, то сможете посмотреть как поменялся код.

Вы всегда можете спросить вопрос в [Discord](https://discord.gg/reasonml).
