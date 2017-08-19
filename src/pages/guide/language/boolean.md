---
title: Boolean
order: 30
---

Un booléen possède le type `bool` et peut valoir`true` ou `false`. Les opérations les plus communes sont :

- `&&` : ET logique
- `||` : OU logique
- `not` : NON logique. **Vous noterez que le symbole `!` est réservé pour autre chose**
- `<=`, `>=`, `<`, `>`
- `==` : égalité physique, compare les structures de données profondément : `(1, 2) == (1, 2)` vaut `true`. Pratique, mais à utiliser avec prudence
- `===` : égalité structurelle, compare superficiellement. `(1, 2) === (1, 2)` vaut `false`. `let myTuple = (1, 2); myTuple === myTuple` vaut `true`.
- `!=` : inégalité physique
- `!==` : inégalité structurelle

### Utilisation

**Note : BuckleScript fournit des bindings pour le s** `true` et `false` **JavaScript**, qui [ne sont pas les mêmes `true` et `false` que ceux de Reason/OCaml](http://bucklescript.github.io/bucklescript/Manual.html#_boolean) ! Ne les utilisez pas de façon interchangeable sans conversion appropriée (`Js.to_bool` et `Js.Boolean.to_js_boolean`).

### Conseils & astuces

**Utilisez l'égalité physique à bon escient**. Elle est pratique, mais peut accidentellement vous faire comparer deux structures de données profondément imbriquées et ainsi entraîner une baisse de performance. Il n'est pas toujours évident de discerner ce qui est considéré comme étant "égal".
Idéalement, cela aurait été pluggable. Des futurs changements sont prévus pour rendre cela possible et fiable. Si vous êtes intéressé, jetez un coup d'oeil à [modular implicit](https://www.reddit.com/r/ocaml/comments/2vyk10/modular_implicits/).

### Décisions de conception

*Cette section suppose des connaissances sur les [variants](/guide/language/variant). Si c'est la première fois que vous lisez ce guide, n'hésitez pas à revenir ici plus tard !*

Le booléen est (uniquement conceptuellement) un cas particulier de variant : `type bool = True | False`. Sur le plan conceptuel, cela supprime élégamment la nécessité de coder un type booléen dans le système de types. L'inconvénient est que, comme pour les variants, les constructeurs sont [compilés dans une représentation moins lisible mais plus rapide](https://bucklescript.github.io/bucklescript/js-demo/?gist=fa7c72e81d7ac31977da1500ee4fa6d4). C'est pourquoi BuckleScript manque d'informations, à une étape ultérieure, pour compiler le `true/false` Reason en `true/false` JavaScript.
