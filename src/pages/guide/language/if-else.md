---
title: If-Else
order: 110
---

```reason
if (showMenu) {
  displayMenu ();
};
```

Les `if` en Reason sont des expressions, ils évaluent leur contenu :

```reason
let message = if (isMorning) {
  "Good morning!"
} else {
  "Hello!"
};
```

Nous avons aussi le *sucre syntaxique* ternaire.

```reason
let message = isMorning ? "Good morning!" : "Hello!";
```

### Utilisation

**`if-else` et le ternaire sont beaucoup moins utilisés** en Reason que dans d'autres langages. Le [pattern-matching](/guide/language/pattern-matching) supprime toute une catégorie de code qui nécessitait auparavant des conditionnels. Ne préférez `if-else` que si vous n'avez, disons, que deux branches par exemple.


### Décisions de conception

Le ternaire Reason est juste un *sucre syntaxique* pour la variant `bool` et un switch :

```reason
switch isMorning {
| true => "Good morning!"
| false => "Hello!"
}
```

Si vous passez ce bout de code dans [`refmt`](/guide/editor-tools/extra-goodies#refmt), vous aurez :

```reason
isMorning ? "Good morning!" : "Hello!";
```

Intéressé(e) ? Voici un [article](https://medium.com/@chenglou/cool-things-reason-formatter-does-9e1f79e25a82) à propos de la philosophie de `refmt`.
