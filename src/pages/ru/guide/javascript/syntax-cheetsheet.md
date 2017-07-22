---
title: Шпаргалка по типам
order: 1
---

Reason повторяет набор типов из JavaScript.

Синтаксис Reason простой, и если вы знаете современный JS, вы сможете
читать и понимать код Reason даже без обучения.
OCaml поверх которого работает Reason предоставляет новые концепции, которые
дают интересные возможности. Reason помогает изучать эти новые возможности
быстрее и получить преимущества от использования OCaml компилятора на ранней
стадии.

В конечном итоге Reason:

- Позволяет писать код, который **легко читать**.
- Позволяет **достичь мастерства быстро**
- Предоставляет концепцию **"если скомпилировалось, то работает"**, которая
  бала введена `ML` языком
- Компилируется в **близкие к железу** нативные бинарники, *или* в JavaScript.

### Базовые примитивы

JavaScript                |   Reason
--------------------------|--------------------------------
<pre>3</pre>                         |  <pre>3</pre>
<pre>3.1415 </pre>                   |  <pre> 3.1415 </pre>
<pre>"Hello world!" </pre>           |  <pre>"Hello world!" </pre>
<pre>'Hello world!' </pre>           |  Строки используют "
Characters are strings               |  <pre>'a'  </pre>
<pre>true</pre>                      |  <pre>true </pre>
`[1,2,3]`                            |  `[1,2,3]`
<pre>null</pre>                      |  <pre>()</pre>
<pre>const x = y;</pre>              |  <pre>let x = y;</pre>
<pre>let x = y;</pre>                |  <pre>reference cells</pre>
<pre>var x = y;</pre>                |  Нет эквивалента
`[x, ...lst] (linear time)`          |  `[x, ...lst] (constant time)`
`[...lst, x] (linear time)`          |  Не поддерживается
<pre>{...obj, x: y}</pre>            |  <pre>{...obj, x: y}</pre>


### Базовые операции с примитивами

JavaScript                         |   Reason
-----------------------------------|--------------------------------
<pre>1 + 2</pre>                   |  <pre>1 + 2</pre>
<pre>1.0 + 2.0 </pre>              |  <pre>1.0 +. 2.0 </pre>
<pre>"hello " + "world" </pre>     |  <pre>"hello " ^ "world" </pre>

### Объекты и записи
JavaScript                |   Reason
--------------------------|--------------------------------
"Objects"                 |  "Records"
no static types           |  <pre>type point = {x: int, mutable y: int};</pre>
<pre>{x: 30, y: 20}</pre>          |  <pre>{x: 30, y: 20}</pre>
<pre>point.x</pre>                 |  <pre>point.x</pre>
<pre>point.y = 30;</pre>           |  <pre>point.y = 30;</pre>
<pre>{...point, x: 30}</pre>       |  <pre>{...point, x: 30}</pre>

### Блоки

В Reason "последовательность выражений" создается с помощью `{}` и значением
является значение последнего выражения. В JS это может быть имитировано
с помощью временной переменной, которая создаёт стейт и затем мутирует.

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


### Лямбды

В JavaScript есть два вида функции, тогда как в Reason только один:

JavaScript                            |   Reason
--------------------------------------|--------------------------------
<pre>arg => retVal  </pre>            |  <pre>fun arg => retVal</pre>
<pre>function named(arg) {...}        |
<pre>let f = function named(arg) {...}|


Основное отличие между лямбдами в современном (ES6) JavaScript и Reason,
это то, что лямбды в Reason начинаются с ключевого слова `fun`. Это удобно
для визуального поиска функции, когда она содержит большое количество
деструктурирования в аргументах.

JavaScript                        |   Reason
----------------------------------|--------------------------------
<pre>const incr = x => x + 1;</pre>        |  <pre>let incr = fun x => x + 1;</pre>
<pre>const five = incr(4);</pre>           |  <pre>let five = incr 4;</pre>
<pre>const add = (x, y) => x+y;</pre>      |  <pre>let add = fun x y => x+y;</pre>
<pre>const x = add(3, 4);</pre>            |  <pre>let x = add 3 4;</pre>
<pre>const y = add(3, add(0, 1));</pre>    |  <pre>let y = add 3 (add 0 1);</pre>


Как и JavaScript, Reason позволяет использовать любое выражение справа от `=>`.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
const add = (x, y) =>
  x + x + y + y;
      </pre>
    </td>
    <td>
      <pre>
let add = fun (x, y) =>
  x + x + y + y;
      </pre>
    </td>
  </tr>
</table>

Однако, JavaScript позволяет использовать блоки `{}` *вместо* выражения.
В таких блоках можно вернуть значение с помощью `return`.
В Reason блок `{}` *уже* является выражением, поэтому Reason не нуждается в
двух типах лямбд: все лябды содержат выражение после `=>`. Просто некоторые
походят на "тело функции".

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
let myFun = fun (x, y) => {
  let doubleX = x + x;
  let doubleY = y + y;
  doubleX + doubleY
};</pre>
    </td>
  </tr>
</table>

Каждая функция в Reason принимает один аргумент. В этом примере аргументом
является деструктурированный кортеж. Это очень похоже на аргументы в JS.
Однако, разница очевидна когда аргументы передаются. В JS аргументы это массиви передача всех аргументов требует вызова `.apply`.
В Reason можно просто передать кортеж.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let add = (x, y) =>
  x + x + y + y;
let result = add (1, 2);
let myArgs = [1, 2];
let result = add.apply(null, myArgs);</pre>
    </td>
    <td>
      <pre>
let add = fun (x, y) =>
  x + x + y + y;
let result = add (1, 2);
let myArgs = (1, 2);
let result = add myArgs;</pre>
    </td>
  </tr>
</table>

### Вызов функций

В Reason скобки опциональны, кроме очевидных случаев, когда нужно указать
порядок вызова функций.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let result = aFunc (oneArg);</pre>
    </td>
    <td>
      <pre>
let result = aFunc (oneArg);
let result = aFunc oneArg;</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
let result = aFunc ({x:0});
      </pre>
    </td>
    <td>
      <pre>let result = aFunc ({x:0});
let result = aFunc {x:0};</pre>
    </td>
  </tr>
</table>

### Каррирование

Оба языка (JS и Reason) поддерживают каррирование, но Reason использует
нативный компилятор (или бекенд JS), и каррирование оптимизировано.
(Лучше сказать, что вы не получаете оверхеда, используя каррирования, вместо
передачи всех аргументов).

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td><pre>let add = a => b => a + b;</pre></td>
    <td><pre>let add = fun a => fun b => a + b;</pre></td>
  </tr>
</table>

Для вызова каррированных функций синтаксис такой же, но скобки опускаются.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>let result = add(10)(20);</pre>
    </td>
    <td>
      <pre>let result = add(10)(20);</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre></pre>
    </td>
    <td>
      <pre>let result = add 10 20;</pre>
    </td>
  </tr>
</table>

Так как лямбды в Reason начинаются с `fun`, то каррированые функции не
выглядят так явно как в JS. Чтобы исправить это, Reason добавляет
синтаксический сахар, который помогает определять такие функции.
Две формы ниже *полностью* эквивалентны:

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>let add = a => b => a + b;</pre>
    </td>
    <td>
      <pre>let add = fun a => fun b => a + b;</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>// No syntactic sugar needed</pre>
    </td>
    <td>
      <pre>let add = fun a b => a + b;</pre>
    </td>
  </tr>
</table>


### Поля записей

В Reason, вы должны убедиться, что запись имеет недвусмысленный тип. В
простейшем случае запись уже в области видимости и вы можете создать значения
просто используя синтаксис `{ key: value }`.

<table>
  <thead>
    <tr>
      <th scope="col"><p>JavaScript</p></th>
      <th scope="col"><p>Reason</p></th>
    </tr>
  </thead>
  <tr>
    <td>
      <pre>function make(
  id, name) {
  return {
    id: id,
    name: name
  };
}</pre>
    </td>
    <td>
      <pre>module Person = {
  type t = {
    id: int, name: string
  };
  let make id name => { id: id, name: name };
  /&ast;
  Alternatively, using field name punning,
  let make id name => { id, name };
  &ast;/
};</pre>
    </td>
  </tr>
</table>

Когда тип записи объявлен в другом модуле, вы должны дать Reason подсказку,
какой именно тип вы имеете ввиду, потому как разные записи в разных модулях
могут иметь одинаковые поля.

Для безопасности лучший способ (1) — поставить префикс с именем модуля
хотя бы одному полю записи. Или поставить префикс перед записью (2), временно
открыв модуль (менее безопасно, так как открывает модуль до конца выражения).
Последний вариант (3) открыть модуль для всего блока (наименее безопасный).

<table>
  <thead>
    <tr>
      <th scope="col"><p>JavaScript</p></th>
      <th scope="col"><p>Reason</p></th>
    </tr>
  </thead>
  <tr>
    <td>
      <pre>const bob =
  { id: 1, name: "Bob" };</pre>
    </td>
    <td>
      <pre>let bob = {
  Person.id: 1, name: "Bob"
};</pre>
    </td>
  </tr>
  <tr>
    <td><pre></pre></td>
    <td>
      <pre>let bob = Person.{
  id: 1, name: "Bob"
};</pre>
    </td>
  </tr>
  <tr>
    <td><pre></pre></td>
    <td>
      <pre>open Person;
let bob = {
  id: 1, name: "Bob"
};</pre>
    </td>
  </tr>
</table>

### Выражения

Если это еще не было ясно, то в Reason практически все является выражением.
Например, `switch` вычисляется как выражение, что делает программирование
более устойчивым к ошибкам. Заметьте как в коде JS некоторое время программа
находится в невалидном состоянии.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>login ? "hi" : "bye" </pre>
    </td>
    <td>
      <pre>login ? "hi" : "bye" </pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
let res = undefined;
switch (thing) {
  case first:
     res = "first";
     break;
  case second:
     res = "second";
     break;
};
      </pre>
    </td>
    <td>
      <pre>
let res = switch thing {
  | first => "first"
  | second => "second"
};
      </pre>
    </td>
  </tr>
</table>
