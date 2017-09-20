---
title: If-Else
order: 110
---

```reason
if (showMenu) {
  displayMenu ();
};
```

В Reason `if` являются выражениями и их значение вычисляется как последнее выражение тела:

```reason
let message = if (isMorning) {
  "Good morning!"
} else {
  "Hello!"
};
```

Есть тернарный оператор

```reason
let message = isMorning ? "Good morning!" : "Hello!";
```

### Использование

**`if-else` и тернарный оператор используются намного реже** в Reason чем в других языках.
[Паттерн-матчинг](../../guide/language/pattern-matching) покрывает большую часть нужд там, где
раньше использовались условные выражения. Используйте `if-else`, если, например у вас есть
только две ветки.

### Проектные решения

Тернарный оператор в Reason это лишь сахар для `bool` варианта и switch:

```reason
switch isMorning {
| true => "Good morning!"
| false => "Hello!"
}
```

Если вы пропустите код выше через [`refmt`](../../guide/editor-tools/extra-goodies#refmt), получите:

```reason
isMorning ? "Good morning!" : "Hello!";
```

Интересно? Вот [пост в блоге](https://medium.com/@chenglou/cool-things-reason-formatter-does-9e1f79e25a82) об идеях `refmt`.
