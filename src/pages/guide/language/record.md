---
title: Record
order: 60
---

Les records sont comme des objets JavaScript mais sont :

- plus léger
- immutables par défaut
- fixes au niveau des noms de champ et des types
- trrrès rapide
- suuuuper bien typés

### Utilisation

Type (obligatoire) :

```reason
type person = {
  age: int,
  name: string
};
```

Valeur (ceci va être déduit comme étant du type `person`) :

```reason
let me = {
  age: 5,
  name: "Big Reason"
};
```

Accès (la syntaxe habituelle avec un point) :

```reason
let name = me.name;
```

**Les records doivent avoir une définition de type explicite**. Si vous écrivez uniquement `{age: 5, name: "Baby Reason"}` sans une déclaration de type explicite quelque part plus haut, le système de types vous renverra une erreur. Si la défintion du type réside dans un autre fichier, vous devez explicitement indiquer de quel fichier il s'agit :

```reason
/* School.re */

type person = {age: int, name: string};
```

```reason
/* example.re */

let me: School.person = {age: 20, name: "Big Reason"};
/* ou */
let me = School.{age: 20, name: "Big Reason"};
/* ou */
let me = {School.age: 20, name: "Big Reason"};
```

Chacune de ces 3 syntaxes indique que "la définition de ce record se trouve dans le fichier School". La première, l'annotation de type normale, est à préférer.

#### Mise à jour immutable

De nouveaux records peuvent être créés à partir d'anciens records avec le spread operator `...`. Le record original n'est pas modifié.

```reason
let meNextYear = {...me, age: me.age + 1};
```

Cette mise à jour est très efficace ! Essayez-en quelques-unes dans notre [éditeur](/try) pour voir comment les records sont compilés.

**Note** : le spread ne peut pas ajouter de nouveaux champs, car la forme d'un record est définie par son type.

#### Mise à jour mutable

Les champs des records peuvent éventuellement être mutables. Cela vous permet de mettre à jour ces champs avec l'opérateur `=`.

```reason
type person = {
  name: string,
  mutable age: int
};
let baby = {name: "Baby Reason", age: 5};
baby.age = baby.age + 1; /* altère `baby`. Joyeux anniversaire ! */
```

### Syntaxe du shorthand

Pour réduire la redondance, nous fournissons le **punning** pour les types et les valeurs d'un record. Vous pouvez l'utiliser lorsque le nom d'un champ de record correspond au nom de sa valeur/type.

```reason
type horsePower = {power: int, metric: bool};

let metric = true;
let someHorsePower = {power: 10, metric};
/* similaire à la valeur {power: 10, metric: metric}; */

type car = {name: string, horsePower};
/* similaire au type {name: string, horsePower: horsePower}; */
```

**Notez qu'il n'y a pas de punning pour les records avec un seul champ** ! `{foo}` ne fait pas ce à quoi on s'attendrait de prime abord (il s'agit d'un bloc qui retourne la valeur `foo`).

### Conseils & astuces

#### Interopérabilité avec JavaScript

Si vous travaillez avec JavaScript, la syntaxe et les opérations de records devraient être familières. Vous pourriez être tenté(e) de travaillez avec JavaScript en convertissant un objet JavaScript en un record et vice versa. C'est bien, mais nous avons **une bien meilleure solution qui ne présente aucun frais de conversion**. Voyez [cette partie](https://bucklescript.github.io/bucklescript/Manual.html#_binding_to_js_objects) qui traite des **objets Reason**. Voici un exemple:
<!-- TODO: link to object doc  -->

```reason
type payload = Js.t {
    .
    name: string
};
external sendQuery: payload => unit = "sendQuery" [@@bs.module "myAjaxLibrary"];
sendQuery {"name": "Reason"};
```
Notez le point dans la définition de type. C'est une notation de type d'objet, et n'a rien à voir avec un record ! Les objets seront décrits dans une section ultérieure.

#### Les types de record sont trouvés par nom de champ

Avec les records, vous ne pouvez pas dire "j'aimerais que cette fonction prenne n'importe quel type de record, du moment qu'il a le champ `age`". Par exemple :

```reason
type person = {age: int, name: string};
type monster = {age: int, hasTentacles: bool};

let getAge entity => entity.age;
```

La dernière ligne de la fonction va supposée que le paramètre `entity` doit être de type `monster`. Donc on aura une erreur à la dernière ligne du code suivant :

```reason
let kraken = {age: 9999, hasTentacles: true};
let me = {age: 5, name: "Baby Reason"};

getAge kraken;
getAge me;
```

Le système de types va soulever une erreur parce que  `me` est une `person`, et que `getAge` ne fonctionne qu'avec `monster`. Si vous avez besoin de telles fonctionnalités, utilisez les objects Reason, abordés dans une section ultérieure.

### Décisions de conception

Après avoir lu les contraintes dans les sections précédentes, et si vous venez d'un background avec un langage dynamique, vous vous demandez peut-être pourquoi s'embêter avec un record lorsqu'on peut utiliser directement un objet. En effet le premier nécessite un type explicite et ne permet pas à différents records avec des noms de champs identiques d'être passés à la même fonction, etc.

1. La vérité est que la plupart du temps dans votre application, la forme de vos données est fixe, et si elle ne l'est pas, elle peut potentiellement être mieux représentée par une combinaison de variants (introduits plus tard) et de records plutôt*.

2. Le record, puisque ses champs sont fixes, est compilé en un array avec des accès d'index d'array à la place de l'objet JavaScript (essayez-le dans notre editeur !). En mode natif, il compile essentiellement une région de mémoire où un accès au champ est juste une recherche de champ + un accès réel, aka **2 instructions d'assembleur**. Les bons vieux jours où les gens mesuraient en nanosecondes ...

<!--TODO: sharable playground  -->

3. Enfin, étant donné qu'un type de record est résolu en trouvant cette fameuse déclaration de type explicite & unique (nous appelons cela le "typage nominal"), les messages d'erreur de type sont au final mieux que la contrepartie ("typage structurel", comme pour les tuples). Cela facilite le refactoring. La modification des champs d'un type de record permet naturellement au compilateur de savoir que c'est toujours le même record, juste parfois mal utilisé à certains endroits. Sinon, sous typage structurel, il peut être difficile de dire si le site de définition ou le site d'utilisation est incorrect.

\* Et nous ne sommes pas juste entrain de nous chercher des excuses ! Les objets Reason supportent ces fonctionnalités.
