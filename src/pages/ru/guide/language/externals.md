---
title: Внешние зависимости (external)
order: 11
---

Reason/OCaml позволяют использовать "FFI" (foreign function interface) для
работы с другими языками, например C или JavaScript. Это похоже на специальную
let-привязку.

```reason
external myCFunction: int -> string = "theCFunction";
```

```reason
external getElementsByClassName : string => array Dom.element =
  "document.getElementsByClassName" [@@bs.val];
```

Вы часто будете видеть `external`, когда будете работать с BuckleScript, так как
мы постоянно используем существующие JS библиотеки. Больше подробностей
[тут](http://bucklescript.github.io/bucklescript/Manual.html#_binding_to_simple_js_functions_values).
