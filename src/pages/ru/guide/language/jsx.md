---
title: JSX
order: 10
---
Reason поддерживает JSX синтаксис, который немного отличается от того, что
используется в [ReactJS](https://facebook.github.io/react/docs/introducing-jsx.html).
JSX теги транслируются в вызовы функций как показано в примерах ниже:

Тег, начинающийся с заглавной буквы:

```reason
<MyComponent foo=bar />
```

превращается в:

```reason
MyComponent.createElement foo::bar children::[] () [@JSX]
```

Тег начинающийся с маленький буквы:

```reason
<div foo=bar>child1 child2</div>
```

превращается в:

```reason
div foo::bar children::[child1, child2] () [@JSX]
```

Атрибут `[@JSX]` можно игнорировать. Это хук, который позволит *ppx* макросу
преобразовать предшествующее выражение в нечто другое. Таким образом мы получаем
возможность использовать JSX без использования конкретной библиотеки, например
React.

Некоторые отличия от JS JSX:
- Текст как потомок должен быть обернут в двойные кавычки
- Атрибутам не обязательно быть обернутыми в двойные кавычки (кроме случаев, когда они являются сложными выражениями)

```reason
<NoCurlyBraces
  booleanAttribute=true
  stringAttribute="string"
  intAttribute=1
  floatAttribute=0.1
  forcedOptional=?(Some "hello")
  onClick={updater handleClick}
  thisWorksToo=(updater handleClick)>
  "foo bar"
</NoCurlyBraces>
```

Есть поддержка короткой записи (punning):

```reason
<div foo /> /* эквивалентно <div foo=foo /> */
```

*Важно:* В JS JSX это бы транслировалось в `foo=true`.

Нет поддержки разворачивания (spread) атрибутов.

