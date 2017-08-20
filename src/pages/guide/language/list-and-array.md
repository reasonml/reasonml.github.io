---
title: List & Array
order: 80
---

### List

Les lists sont :

- homogènes
- immutables
- rapides à l'ajout d'éléments (prepending)

```reason
let myList = [1, 2, 3];
```

Les lists Reason sont simples, liées individuellement.


#### Utilisation

Vous utiliserez une list pour sa capacité à être redimensionnée, son *prepend* rapide (ajout au début de la list), et son *split* rapide, qui sont tous immutables et efficaces !

La librairie standard fournit un [module List](/api/List.html) (et sa contrepartie avec des arguments labellisés, `ListLabels`).

##### Prepend immutable

Utilisez la syntaxe spread, qui n'est en fait que `List.cons`:

```reason
let myList = [1, 2, 3];
let anotherList = [0, ...myList];
```

`myList` n'a pas été muté. `anotherList` vaut maintenant `[0, 1, 2, 3]`. Cette méthode est efficace (temps constant, pas linéaire). Les 3 derniers éléments d'`anotherList` sont partagés avec `myList` !

**Notez que `[a, ...b, ...c]` est une erreur de syntaxe**. Nous ne supportons pas plusieurs spreads pour une seule list. Ce serait une opération linéaire accidentelle (`O(b)`), étant donné que les éléments de `b` seraient ajoutés un à un au début de `c`. Vous pouvez utiliser `List.concat` pour ceci.

Mettre à jour de façon arbitraire un élément au milieu d'une liste est déconseillez car ses performances et ses frais généraux d'allocation seraient linéaires (`O(n)`).

##### Accès

`switch` (abordé dans la [section pattern-matching](/guide/language/destructuring-pattern-matching)) est habituellement utilisé pour accéder aux éléments d'une list :

```
let message = switch myList {
| [] => "This list is empty"
| [a, ...rest] => "The head of the list is the string " ^ a
}
```

Pour accéder à un élément précis d'une list, utilisez `List.nth`.

#### Conseils & astuces

N'hésitez pas à allouer autant de lists vides que vous le souhaitez. Comme expliqué dans la section [variant pour list](/guide/language/variant#list), une liste vide est en fait un constructeur de variant sans paramètre, qui compile en un simple integer. Aucune allocation de mémoire supplémentaire n'est nécessaire.

#### Décisions de conception

Dans l'avenir, nous pourrions fournir une structure de données listée immutable, redimensionnable et dotée d'opérations rapides, telle que [Immutable-re](https://github.com/facebookincubator/immutable-re) (encore en work in progress !).

### Array

Les arrays sont comme les lists, sauf qu'ils sont :

- mutables
- rapides pour les accès aléatoires et les mises à jour
- de taille fixe en natif (flexible en JavaScript)

Vous les entourerez avec `[|` et `|]`.

```reason
let myArray = [|"hello", "world", "how are you"|];
```

#### Utilisation

Les modules [Array](/api/Array.html) et [ArrayLabel](/api/ArrayLabels.html) de la librairie standard. Pour la compilation JavaScript, vous avez aussi les bindings de l'API [Js.Array](https://bucklescript.github.io/bucklescript/api/Js.Array.html) qui doit vous être un peu plus familière.

L'accès et la mise à jour d'un array se font comme suit :

```reason
let myArray = [|"hello", "world", "how are you"|];

let world = myArray.(1); /* "hello" */

myArray.(0) = "hey";

/* maintenant [|"hey", "world", "how are you"|] */
```

L'accès et la mise à jour de l'array notés ci-dessus ne sont qu'un *sucre syntaxique* pour `Array.get`/`Array.set`.

#### Conseils & astuces

Si vous compilez en JavaScript, sachez que les arrays Reason map directement les arrays JavaScript et vice versa. Ainsi, même si les arrays sont de taille fixe en natif, vous pouvez toujours utiliser l'API `Js.Array` pour les redimensionner. Ça passe.
