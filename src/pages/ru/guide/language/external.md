---
title: External
order: 170
---

`external`, или "FFI" (foreign function interface), или просто "interop" (от слова
"interoperability" — совместимость) это то как Reason взаимодействует с другими языками,
такими как C или JavaScript.

Эта конструкция очень похожа на let привязку, только без значения и с обязательным
указанием типа:

```reason
external myCFunction: int => string = "theCFunction";
```

```reason
external getElementsByClassName : string => array Dom.element =
  "document.getElementsByClassName" [@@bs.val];
```

(Код выше — это [BuckleScript](https://bucklescript.github.io/bucklescript/Manual.html)-специфичный интерфейс, который связывает имя с функцией JavaScript с тем же именем.)

### Использование

После вы можете использовать значение/функцию как обычную let привязку.

### Советы и трюки

Если вы пришли из JavaScript: **потратте немного времени на изучение того как работают
[BuckleScript externals](http://bucklescript.github.io/bucklescript/Manual.html#_binding_to_simple_js_functions_values)**!
В начале вы скорее всего столкнетесь с несколькими `external` прежде чем сможете написать
100% идиоматичный Reason код.

### Проектные решения

Взаимодействие с существующим кодом очень важно для Reason. Наша система типов дает строгие
гарантии. Однако такая строгость так же означает, что без хорошей системы взаимодействия, было
бы очень сложно конвертировать существующий код в Reason. К счастью FFI позволяет
сосуществовать с достаточно [грязным существующим кодом](../../guide/javascript/converting).



