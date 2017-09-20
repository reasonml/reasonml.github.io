---
title: Паттерн-матчинг
order: 135
---

_Убедитесь что вы прочитали про [Вариант](../../guide/language/variant) сперва_.

**Ма наконец добрались**! Паттерн-матчинг — это одна из лучших фич языка. Как
деструктурирование, но дает больше помощи от системы типов.

### Использование

Допустим есть вариант:

```reason
type payload =
| BadResult int
| GoodResult string
| NoResult;
```

Использую `switch` можно его "деструктурировать":

```reason
let data = GoodResult "Product shipped!";

let message =
  switch data {
  | GoodResult theMessage => "Success! " ^ theMessage
  | BadResult errorCode =>
    "Something's wrong. The error code is: " ^ (string_of_int errorCode)
  };
```

Заметьте как мы деструктурировали `data` обрабатывая каждый случай. Описанный `switch`
вызовет предупреждение от компилятора:

```
Warning 8: this pattern-matching is not exhaustive.
Here is an example of a value that is not matched:
NoResult
```

Разве не здорово? Система типов предупреждает о пропущенной ветке. Этот **условный** аспект
делает паттерн-матчинг очень мощной фичей. Большая часть структур данных "если это, то потом
то" работает так:

```reason
switch myList {
| [] => print_endline "Empty list"
| [a, ...theRest] => print_endline ("list with the head value " ^ a)
};

switch myArray {
| [|1, 2|] => print_endline "This is an array with item 1 and 2"
| [||] => print_endline "This array has no element"
| _ => print_endline "This is an array"
}
```

Символ `_` специальный случай, который срабатывает для всех необработанных веток.

Вы можете выбирать ветки по строке, числу и другим типам. Вы даже можете иметь несколько
веток с одним результатом.

```reason
let reply =
  switch message {
  | "Reason's pretty cool" => "Yep"
  | "good night" => "See ya!"
  | "hello" | "hi" | "heya" | "hey" => "hello to you too!"
  | _ => "Nice to meet you!"
  };
```

В комбинации с другими структурами данных паттерн-матчинг может создавать очень лаконичный,
проверенный и производительный код:

```reason
let message =
  switch data {
  | GoodResult theMessage => "Success! " ^ theMessage
  | BadResult (0 | 1 | 5) => "Something's wrong. It's a server side problem."
  | BadResult errorCode => "Unknown error occurred. Code: " ^ string_of_int errorCode
  | NoResult => "Things look fine"
  };
```

#### When проверки

Когда вам действительно нужно проверить некоторую логику внутри паттерна, вы можете
использовать `when`, который является синтаксическим сахаром для `if`:

```reason
let message =
  switch data {
  | GoodResult theMessage => ...
  | BadResult errorCode when isServerError errorCode => ...
  | BadResult errorCode => ... /* otherwise */
  | NoResult => ...
  };
```

### Советы и трюки

**Старайтесь по возможности держать список веток плоским**. Пример ниже.

Не используйте `_` слишком часто. Этот способ не дает компилятору точно сказать, что
вы забыли проверить один из случаем. А это особенно ценно во время рефакторинга, когда вы
добавляете новый элемент в вариант. Постарайтесь использовать `_` только для случаев с
бесконечными вариантами (строки, числа).

Вот серия примеров от худшего к лучшему:

```reason
let optionBoolToJsBoolean opt =>
  if (opt == None) {
    Js.false_
  } else {
    if (opt == Some true) {
      Js.true_
    } else {
      Js.false_
    }
  };
```

Это совсем глупо, лучше использовать паттерн-матчинг:

```reason
let optionBoolToJsBoolean opt => switch opt {
| None => Js.false_
| Some a => switch a {
  | true => Js.true_
  | false => Js.false_
  }
};
```

Лучше, но все еще вложено.

```reason
let optionBoolToJsBoolean opt => switch opt {
| None => Js.false_
| Some true => Js.true_
| Some false => Js.false_
};
```

Вот теперь отлично!  И вы даже можете сделать так:

```reason
let optionBoolToJsBoolean opt => switch opt {
| Some true => Js.true_
| _ => Js.false_
};
```

Так короче, но убивает проверку, о которой говорилось ранее. Такой вариант лучший:

```reason
let optionBoolToJsBoolean opt => switch opt {
| Some true => Js.true_
| Some false | None => Js.false_
};
```

В таком коде намного сложнее сделать ошибку! Всегда старайтесь использовать такой подход
вместо if-else. Это более кратко и [более производительно](../../guide/language/variant#design-decisions).

Посмотрите другой пример для кортежа [тут](../../guide/language/tuple#tips--tricks).

### Проектные решения

The notorious [fizzbuzz problem](https://en.wikipedia.org/wiki/Fizz_buzz#Programming_interviews) strangely trips some people up, partially due its nature of paralyzing the programmer who hopes to simplify/unify the few condition branches in search of elegance where there's none. While fizzbuzz is slightly too dynamic to be solved in `when`-less switches, hopefully you can see that usually, pattern-matching's visual conciseness allows us to overcome decision paralysis, while keeping all the benefits (and more, as you've seen) of a bunch of brute-forced `if-else`s. There's really nothing wrong with explicitly listing out all the possibilities; Pattern matching corresponds to **case analysis** in math, a valid problem-solving technique that proves to be extremely convenient.

Using a Reason `switch` for the first time might make you feel like you've been missing out all these years. Careful, for it might ruin other languages for you =).

If you've tried to refactor a big, nested if-else logic, you might realize it's very hard to get the logic right. On the other hand, pattern matching + tuple conceptually maps to a 2D table, where each cell can be independently filled. This ensures that whenever you need to add a case in the `switch`, you can target that and only that table cell, without messing other cells up.

```reason
type animal = Dog | Cat | Bird;
let result = switch (isBig, myAnimal) {
| (true, Dog) => 1
| (true, Cat) => 2
| (true, Bird) => 3
| (false, Dog | Cat) => 4
| (false, Bird) => 5
};
```

isBig \ myAnimal | Dog | Cat | Bird
-----------------|-----|-----|------
true             |  1  |  2  |  3
false            |  4  |  4  |  5
