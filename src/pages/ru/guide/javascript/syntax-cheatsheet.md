---
title: Шпаргалка по синтаксису
order: 1
---

Мы проделали огромную работу, чтобы Reason выглядел как JS,
используя отличную семантику OCaml.

### Let привязки

JavaScript                |   Reason
--------------------------|--------------------------------
`const x = 5;`              |  `let x = 5;`
`var x = y;`                |  Нет эквивалента (к счастью)
`let x = 5; x = 6;`         |  `let x = ref 5; x := 6;`

### Строки и символы

JavaScript                |   Reason
--------------------------|--------------------------------
`"Hello world!"`            |  Так же
`'Hello world!'`            |  Строки используют `"`
Символы — это строки        |  `'a'`
`"hello " + "world"`        |  `"hello " ^ "world"`

### Булев

JavaScript                |   Reason
--------------------------|--------------------------------
`true`, `false`                      |  `true`, `false` \*
`!true`                              |  `not true`
`||`, `&&`, `<=`, `>=`, `<`, `>`     |  Так же
`a === b`, `a !== b`                 |  Так же
Нет глубокого сравнения              |  `a == b`, `a != b`
`a == b`                             |  Нет сравнения с приведением (к счастью)

\* Хотя это и эквивалент в Reason, булев не компилируется в JS `true`/`false`!
Для такой необходимости используйте `Js.true_`/`Js.false_`. [Подробнее](../../guide/language/boolean#usage).

### Число

JavaScript                |   Reason
--------------------------|--------------------------------
`3`                         |  Так же \*
`3.1415`                    |  Так же
`3 + 4`                     |  Так же
`3.0 + 4.5`                 |  `3.0 +. 4.5`

\* JS не имеет разделения на целые и числа с плавающей точкой

### Объект/запись

JavaScript                |   Reason
--------------------------|--------------------------------
нет типов                 |  `type point = {x: int, mutable y: int};`
`{x: 30, y: 20}`          |  Так же \*
`point.x`                 |  Так же
`point.y = 30;`           |  Так же
`{...point, x: 30}`       |  Так же

\* Это ближайший эквивалент в Reason, но это не значит, что запись
компилируется в JS объект! Про компиляции в объект подробнее
[тут](../../guide/language/object#tip--tricks).

### Массив

JavaScript                |   Reason
--------------------------|--------------------------------
`[1, 2, 3]`               |  `[|1, 2, 3|]`
`myArray[1] = 10`         |  `myArray.(1) = 10`
Нет корт                  |  `(1, 2, 3)`
Нет неизменяемых списков  |  `[1, 2, 3]`

### Null

JavaScript                |   Reason
--------------------------|--------------------------------
`null`, `undefined`       |  `None` \*

\* Reason не имеет нулей (потому нет багов с ними связанными).
`option None` — ближайшая похожая сущность

### Функция

JavaScript                            |   Reason
--------------------------------------|--------------------------------
`arg => retVal`                       |  `fun arg => retVal`
`function named(arg) {...}`           |  `fun named arg => ...`
`const f = function named(arg) {...}` |  `let f = fun named arg => ...`
`add(4, add(5, 6))`                   |  `add 4 (add 5 6)`

#### Блоки

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
const myFun = (x, y) => {
  const doubleX = x + x;
  const doubleY = y + y;
  return doubleX + doubleY
};</pre>
    </td>
    <td>
      <pre>
let myFun = fun x y => {
  let doubleX = x + x;
  let doubleY = y + y;
  doubleX + doubleY
};</pre>
    </td>
  </tr>
</table>

#### Каррирование

JavaScript                |   Reason
--------------------------|--------------------------------
`let add = a => b => a + b`       |  `let add a b => a + b`

Оба языка поддерживают каррирование, но в Reason каррирование
**встроенно и оптимизировано для избежания дополнительных аллокаций**,
когда это возможно.

### If-else

JavaScript                |   Reason
--------------------------|--------------------------------
`if (a) {b} else {c}`     |  Так же \*
`a ? b : c`               |  Так же
`switch`                  |  `switch` но [совсем не такой](../../guide/language/pattern-matching)

\* Условия в Reason всегда выражения

### Деструктурирование

JavaScript                        |   Reason
----------------------------------|----------------------------
`const {a, b} = data`             |  `let {a, b} = data`
`const [a, b] = data`             |  `let [|a, b|] = data` \*
`const {a: aa, b: bb} = data`     |  `let {a: aa, b: bb} = data`

\* Выдаст предупреждение, что `data` может иметь длину отличную от 2.
Лучше использовать `switch`

### Цикл

JavaScript                |   Reason
--------------------------|--------------------------------
`for (let i = 0; i <= 10; i++) {...}`             |  `for i in 0 to 10 {...}`
`for (let i = 10; i >- 0; i--) {...}`             |  `for i in 10 downto 0 {...}`
`while (true) {...}`                              |  Так же

### JSX

JavaScript                |   Reason
--------------------------|--------------------------------
`<Foo bar=1 baz="hi" onClick={bla} />`  |  `<Foo bar=1 baz="hi" onClick=(bla) />`
`<Foo bar=bar />`                       |  `<Foo bar />`
`<input checked />`                     |  `<input checked=true />`

### Исключения

JavaScript                |   Reason
--------------------------|--------------------------------
`throw new SomeError(...)`  |  `raise (SomeError ...)`
`try (a) {...} catch (Err) {...} finally {...}`   |  `try (a) { | Err => ...}` \*

\* Нет finally

### Блоки

В Reason последовательности выражений создаются с помощью `{}` и вычисляются
в последнее выражение. В JavaScript это может быть симулировано при помощи
локальной переменной, которая изменяется.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let res = undefined;
{
  const x = 23;
  const y = 34;
  res = x + y;
};</pre>
    </td>
    <td>
      <pre>
let res = {
  let x = 23;
  let y = 34;
  x + y
};</pre>
    </td>
  </tr>
</table>

