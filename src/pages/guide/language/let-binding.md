---
title: Binding let
order: 10
---

Un "binding let", dans d'autres langues, pourrait être appelé "déclaration/affectation de variable". `let` donne des noms aux valeurs. Elles peuvent être vues et référencées par le code qui les suit.
```reason
let greeting = "hello!";
let score = 10;
let newScore = 10 + score;
...
```

#### Scopage de bloc

Les bindings peuvent être scopés via `{}`.

```reason
if (displayGreeting) {
  let message = "Enjoying the docs so far?";
  print_endline message;
};
/* `message` not accessible here! */
```

#### Les bindings sont immutables

"Immutable" comme dans "ne change pas". Une fois qu'un binding se réfère à une valeur, elle ne peut se référer à rien d'autre (sauf si elle contient explicitement une valeur mutable, point abordé plus loin). Cependant, vous pouvez créer un nouveau binding du même nom qui serait une *copie superficielle* de la liaison précédente. À partir de ce moment-là, la liaison se référera à la valeur nouvellement attribuée.

```reason
let message = "hello";
print_endline message; /* Prints "hello" */
let message = "bye";
print_endline message; /* Prints "bye" */
```

### Conseils & Astuces

Étant donné que les bindings sont scopés via `{}`, vous pouvez créer un scope anonyme autour d'eux :

```reason
let message = {
  let part1 = "hello";
  let part2 = "world";
  part1 ^ " " ^ part2
};
/* `part1` et `part2` ne sont pas accessibles ici ! */
```

Cela empêche l'utilisation abusive des bindings  après ces lignes.

### Décisions de conception

Reason est épaulé par OCaml par derrière. Un binding let, dans la syntaxe OCaml, ressemble à ceci:


```ocaml
let a = 1 in
let b = 2 in
a + b
```

Ce qui pourrait être lu conceptuellement dans ce format à la place :

```ocaml
let a = 1 in
  let b = 2 in
    a + b
```

Ce qui pourrait vous rappeler :

```reason
/* syntax reason */
fun a =>
  fun b =>
    a + b;
```

Bien qu'ils ne soient pas strictement les mêmes, heureusement vous pouvez voir que `let` est juste une expression ! En Reason, nous avons transformé `in` en `;` par soucis d'habitude visuelle. Mais ne laissez pas `let` cacher l'élégance sous-jacente d'une expression.
