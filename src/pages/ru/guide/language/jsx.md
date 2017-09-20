---
title: JSX
order: 160
---

Не хотите ли немного HTML синтаксиса в вашем Reason коде? Если нет, то пропустите эту
секцию.

Reason поддерживает синтаксис JSX, с некоторыми отличиями от [ReactJS](https://facebook.github.io/react/docs/introducing-jsx.html).
Reason JSX не привязан к ReactJS, он транслируется в обычные вызовы функций:

### Заглавный тег

```reason
<MyComponent foo=bar />
```

становится

```reason
MyComponent.make foo::bar children::[] ()
```

### Строчный тег

```reason
<div foo=bar>child1 child2</div>
```

становится

```reason
div foo::bar children::[child1, child2] () [@JSX]
```

### Использование

Смотри [ReasonReact](//reasonml.github.io/reason-react/) для примера приложения с JSX.

Вот JSX тег показывающей большую часть фич:

```reason
<MyComponent
  booleanAttribute=true
  stringAttribute="string"
  intAttribute=1
  forcedOptional=?(Some "hello")
  onClick={updater handleClick}
  onClickThisWorksToo=(updater handleClick)>
  <div>
    (ReasonReact.stringToElement "hello")
  </div>
</MyComponent>
```

### Отличия от JS JSX

- Атрибуты не требуют фигурных скобок, если это простые выражения. Если нет, то используются круглые скобки
- Нет поддержки spread оператора в атрибутах
- Возможность использовать имя аргумента как имя переменной (punning)

#### Punning

ReactJS JSX поддерживает короткую запись атрибута `<input checked />`, которая по аналогии
с HTML является булевым атрибутом `<input checked=true />`. Reason разворачивает такую
запись в `<input checked=checked />`. Это позволяет намного удобнее указывать атрибуты.

```reason
<MyComponent isLoading text onClick />
```

### Советы и трюки

Для авторов библиотек, которым нужны достоинства JSX: атрибут `[@JSX]`
позволяет ppx макросу найти функции, которые хотят использовать формат JSX и быть
преобразованы в любое другое выражение.

Таки образом все могут получить профит от использования JSX без необходимости
зависеть от конкретной библиотеки, например ReasonReact.

JSX поддерживает [именованые аргументы](../../guide/language/function#labeled-arguments):
опциональные и аргументы по умолчанию.

### Проектные решения

The way we designed this JSX is related to how we'd like to help the language evolve. See the section "What's the point?" in [this blog post](https://medium.com/@chenglou/cool-things-reason-formatter-does-9e1f79e25a82).

The ability to have macros in the language + the library-agnostic JSX syntax allows every library to potentially have JSX without hassle. This way, we add some visual familiarities to the underlying OCaml language without compromising on its semantics (aka how it executes). One big goal of Reason is to let more folks take advantage of the beautiful language that is OCaml, while discarding the time-consuming debates around syntax and formatting.
