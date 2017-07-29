---
title: Exemples
order: 20
---

Un exemple vaut mille mots.

Cette section est consacrée aux néophytes essayant de trouver des idiomes et des conventions générales pour Reason et BuckleScript. Si vous êtes un débutant qui a une bonne idée d'exemple, n'hésitez pas à suggérer une modification !

### Utilisation du type `option`

`option` est une [variante](./language/data-types#variant) qui est proposée par la [librairie standard](http://caml.inria.fr/pub/docs/manual-ocaml/libref/). Il évite le besoin de valeurs nulles dans d'autres langues.

```reason
let possiblyNullValue1 = None;
let possiblyNullValue2 = Some "Hello@";

switch possiblyNullValue2 {
| None => print_endline "Nothing to see here."
| Some message => print_endline message
};
```

### Création d'un type paramétré

```reason
type universityStudent = {gpa: float};

type response 'studentType = {status: int, student: 'studentType};

let result: response universityStudent = fetchDataFromServer ();
```

### Création d'un Object JS

En supposant que vous êtes entrain de [compiler en JS](./gettingStarted.html#javascript-workflow), bien évidemment.

```reason
let obj1 = {
  "name": "John",
  "age": 30
};
/* Compile en un objet JS qui ressemble exactement à ce que vous voyez là */
```

Vous noterez que ce qui précède n'est pas un record. Les clés sont encapsulées dans une string via le apostrophes. C'est le *syntax sugar* de Reason pour [bs.obj](http://bucklescript.github.io/bucklescript/Manual.html#_create_js_objects_using_bs_obj). Le type est déduit. L'exemple suivant l'identifie explicitement.


### Typage d'un Object JS

```reason
type payload = Js.t {.
  name: string,
  age: int
};
let obj1: payload = {"name": "John", "age": 30};
```

Vous noterez que `{. name: string, age: int}` est la syntaxe requise pour la déclaration du type d'un object Reason/OCaml (pas d'un record !). Il est *lifté* dans `Js.t` afin que  BuckleScript voit le type entier et le compile correctement dans un objet JavaScript normal. D'habitude, les objets OCaml *non-lifté* sont compilés en quelque chose de différent (et rarement nécessaire d'ailleurs).

### Binding avec un Module JS via Default Export

En supposant que le module est nommé `store.js`, et a un export par défault ainsi qu'une méthode `getDate`.

```reason
type store = Js.t {. getDate : (unit => float) [@bs.meth]};
external store : store = "./store" [@@bs.module];
Js.log store;
Js.log (store##getDate ());
```
