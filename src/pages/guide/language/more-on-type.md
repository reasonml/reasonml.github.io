---
title: Plus sur le type
order: 120
---

### Argument de type !

Les types peuvent accepter des paramètres, semblables aux génériques dans d'autres langages. C'est comme si un type était une fonction qui prend des arguments et renvoie un nouveau type ! Les paramètres **doivent** commencer par `'`.

Le cas d'utilisation d'un type paramétré consiste à supprimer les duplications. Avant :

```reason
/* ceci est un tuple à 3 éléments, expliqué ensuite */
type intCoordinates = (int, int, int);
type floatCoordinates = (float, float, float);

let buddy: intCoordinates = (10, 20, 20);
```

Après :

```reason
type coordinates 'a = ('a, 'a, 'a);

/* applique les coordonnées à la "fonction de type" et retourne le type (int, int, int) */
type intCoordinatesAlias = coordinates int;
let buddy: intCoordinatesAlias = (10, 20, 20);

/* ou, plus communément, l'écrire en ligne */
let buddy: coordinates float = (10.5, 20.5, 20.5);
```

Dans la pratique, les types sont inférés pour vous. Ainsi la version la plus concise du code ci-dessus serait : 

```reason
let buddy = (10, 20, 20);
```

Le système de types en infère qu'il s'agit d'un `(int, int, int)`. Pas besoin d'écrire autre chose.

Les arguments de types apparaissent partout.

```reason
/* déduit comme étant `list string` */
let greetings = ["hello", "world", "how are you"];
```

Si les types n'acceptaient pas de paramètres (aka, si nous n'avions pas défini de "fonctions de types"), la librairie standard aurait besoin de définir les types `listOfString`, `listOfInt`, `listOfTuplesOfInt`, etc.

Les types peuvent recevoir plus d'arguments et être composables.

```reason
type result 'a 'b =
| Ok 'a
| Error 'b;

type myPayload = {data: string};

type myPayloadResults 'errorType = list (result myPayload 'errorType);

let payloadResults: myPayloadResults string = [
  Ok {data: "hi"},
  Ok {data: "bye"},
  Error "Something wrong happened!"
];
```

### Types mutuellement récursifs

Tout comme les fonctions, les types peuvent être mutuellement récursifs via `and` :

```reason
type student = {taughtBy: teacher}
and teacher = {students: list student};
```

**Notez** qu'il n'y a pas de point-virgule à la fin de la première ligne ni de `type` à la seconde.

### Décisions de conception

Un système de types permettant d'avoir un argument de type consiste essentiellement à permettre des fonctions de types. `list int` est vraiment la fonction du type `list` prenant le type `int` en entrée, et retournant le type final et concret que vous utiliserez dans certains endroits. Vous avez peut-être remarqué que dans d'autres langages, cela est plus ou moins appelé des «génériques». Par exemple,`ArrayList<Integer>` en Java.

[Le principe de la moindre puissance (principle of least power)](https://en.wikipedia.org/wiki/Rule_of_least_power) s'applique lorsque vous essayez de "faire avancer les choses". Si le domaine du problème le permet, choisissez sans hésitation la solution la moins abstraite possible (aka, la plus concrète). De sorte que la solution soit atteinte le plus rapidement possible et comporte moins d'indirections instables que vous auriez à traverser. Par exemple, préférez les types aux données de forme libre, préférez la configuration basée sur les données aux appels de fonctions Turing-complets, préférez les appels de fonctions aux macros, préférez les macros aux forks de projets, etc. Lorsque vous contraignez votre domaine et votre puissance, les choses deviennent plus simples à analyser. Le tout, _si_ le domaine est suffisamment limité pour le permettre.

Quand un système de types est un aspect générique de votre programme, nous devons nous assurer que nous laisserons suffisamment d'ordre de puissance pour ne pas trop contraindre votre expressivité. Sans les «fonctions de types», vous vous retrouveriez avec un peu de boilerplate. Par exemple : `listOfInt`, `listOfString`, `listOfArrayOfFloat` et leurs fonctions helpers respectives codés en dur, etc. Cependant, assurez-vous également de ne pas trop abuser de la puissance qui vous est donnée par un système de types assez puissant. Parfois, il est judicieux d'écrire _un peu_ de boilerplate pour réduire le besoin de types autrement puissants. En toute chose, les compromis de bon goût peuvent montrer votre pragmatisme et votre jugement plus que des types fantaisistes !
