---
title: Binding let
order: 10
---

Un "binding let", dans d'autres langages, pourrait être appelé "déclaration/affectation de variable". `let` donne des noms aux valeurs. Elles peuvent être vues et référencées par le code qui les suit.
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
/* `message` n'est pas accessible ici ! */
```

#### Les bindings sont immutables

"Immutables" comme dans "ne changent pas". Une fois qu'un binding se réfère à une valeur, il ne peut se référer à rien d'autre (sauf s'il contient explicitement une valeur mutable, point abordé plus loin). Cependant, vous pouvez créer un nouveau binding du même nom qui serait une *copie superficielle* du binding précédent. À partir de ce moment-là, le binding se référera à la valeur nouvellement attribuée.

```reason
let message = "hello";
print_endline message; /* Print "hello" */
let message = "bye";
print_endline message; /* Print "bye" */
```

### Conseils & astuces

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

Reason est en fait supporté par OCaml. Un binding let, dans la syntaxe OCaml, ressemble à ceci :


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
/* syntaxe reason */
fun a =>
  fun b =>
    a + b;
```

Bien qu'ils ne soient pas strictement les mêmes, espérons que vous puissiez voir que `let` est juste une expression ! En Reason, nous avons transformé `in` en `;` par soucis de familiarité visuelle. Mais ne laissez pas `let` cacher l'élégance sous-jacente d'une expression.
