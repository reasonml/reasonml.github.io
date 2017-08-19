---
title: Module
order: 180
---

### Fondamentaux

**Les modules sont comme des petits fichiers** ! Ils peuvent contenir des définitions de type, des bindings `let`, d'autres modules imbriqués, etc.

#### Création

Pour créer un module, utilisez le mot-clé `module`. Le nom du module doit commencer par une **lettre majuscule**. Tout ce que vous mettez à l'intérieur d'un fichier `.re`, peut aller à l'intérieur du bloc de définition `{}` d'un module.

```reason
module School = {
  type profession = Teacher | Director;

  let person1 = Teacher;
  let getProfession person =>
    switch person {
    | Teacher => "A teacher"
    | Director => "A director"
    };
};
```

Vous pouvez accéder au contenu d'un module (types inclus !) de la même façon qu'avec un record, en utilisant la notation `.`. Ceci démontre l'utilité des modules pour le namespacing.

```reason
let anotherPerson: School.profession = School.Teacher;
print_endline (School.getProfession anotherPerson); /* "A teacher" */
```

Les modules imbriqués fonctionnent aussi.

```reason
module MyModule = {
  module NestedModule = {
     let message = "hello";
  };
};

let message = MyModule.NestedModule.message;
```

#### `open` un module

Se référer constamment à une valeur/type dans un module peut être fastidieux. Nous pouvons "ouvrir" la définition d'un module et nous référer à son contenu sans les préciser avec le nom du module. Deux options s'offrent à nous.

Ouverture locale :

```reason
let message =
  School.(
    switch person1 {
    | Teacher => "Hello teacher!"
    | Director => "Hello director!"
    }
  );
```

Ouverture globale. **Utilisez-la avec précaution, certes cela permet une certaine commodité mais au prix de la facilité de raisonnement** :

```reason
open School;
let anotherPerson: profession = Teacher;
printProfession anotherPerson;
```

#### Extension de module

Utiliser `include` à l'intérieur d'un module "spread" statiquement son contenu à l'intérieur d'un nouveau module, remplissant souvent le rôle "d'héritage" ou de "mixin".

```reason
module BaseComponent = {
  let defaultGreeting = "Hello";
  let getAudience ::excited => excited ? "world!" : "world";
};

module ActualComponent = {
  /* le contenu est copié */
  include BaseComponent;
  /* override BaseComponent.defaultGreeting */
  let defaultGreeting = "Hey";
  let render () => defaultGreeting ^ " " ^ getAudience excited::true;
};
```

**Note** : `include` et `open` sont très différents ! Le premier copie littéralement les définitions dans le nouveau module pour qu'il se les approprient. Le second permet simplement de se référer à des éléments (valeurs, types, constructeurs, etc.) dans le scope du module ouvert de manière "non qualifiée" (aka, `foo` au lieu de `MyModule.foo` qui est lui qualifié).

#### Tout fichier `.re` est un module

Un fichier OCaml/Reason map vers un module. Cela permet une expressivité assez intéressante qui nécessitait auparavant la génération de code supplémentaire dans d'autres langages. Le fichier `react.re` implique implicitement un module `React`, qui peut être vu par d'autres fichiers sources.

```reason
/* fileA.re. Ceci compile vers le module FileA ci-dessous */
let a = 1;
let b = 2;

/* fileB.re */
/* Map l'implémentation de fileA dans une nouvelle API */
let alpha = FileA.a;
let beta = FileA.b;
```

Cet extrait artificiel montre une "copie" de fichier :

```reason
/* fileA.re. Ceci compile vers le module FileA ci-dessous */
let a = 1;
let b = 2;

/* fileB.re */
/* Compile exactement le contenu de fichierA.re sans frais supplémentaires au runtime ! */
include FileA;
```

Signatures
----------------------------------

Le type d'un module s'appelle une «signature» et peut être écrit explicitement. Si un module est comme un fichier `.re` (implémentation), la signature d'un module est comme un fichier `.rei` (interface).

#### Création

Pour créer une signature, utilisez le mot-clé `module type`. Le nom de la signature doit commencer par **une lettre majuscule**. Tout ce que vous pourriez placer dans un fichier `.rei`, vous pouvez aussi placer dans le bloc `{}` de la définition de signature.

```reason
/* Récupérons l'exemple de la section précédente */
module type EstablishmentType = {
  type profession;
  let getProfession: profession => string;
};
```

Une signature définit la liste des exigences qu'un module doit satisfaire afin que ce module corresponde à la signature. Ces exigences sont de la forme :

- `let x: int;` requiert un binding `let` nommé `x` et de type `int`.

- `type t = someType;` requiert un champ de type `t` étant égal à `someType`.

- `type t;` requiert un champ de type `t`, mais sans imposer d'exigences sur le type concret de `t`. Nous pourrions utiliser `t` dans d'autres entrées de la signature pour décrire les relations, par exemple `let makePair: t -> (t, t)`, mais on ne peut pas par exemple, supposer que `t` est un `int`. Cela nous donne de grandes capacités d'abstraction forcées.

Pour illustrer les différents entrées de type, considérez la signature `EstablishmentType` ci-dessus qui nécessite un module qui :

- Déclare un type nommé `profession`.
- Doit inclure une fonction qui prend en entrée une valeur de type `profession` et retourne une string.

**Note** :

Les modules du type `EstablishmentType` peuvent contenir plus de champs que la signature en déclare, tout comme le module `School` dans la section précédente (si on choisit de lui attribuer le type `EstablishmentType`. Sinon, `School` expose tous les champs). Cela fait effectivement du champ `person1`, un détail d'implémentation forcé ! Les éléments étrangers ne peuvent y accéder, car ils ne sont pas présents dans la signature. La signature a **restreint** ce à quoi les autres peuvent accéder.

Le type `EstablishmentType.profession` est **abstrait** : il n'a pas de type concret. Il dit juste : «Je ne me soucie pas du type actuel, mais il est utilisé comme entrée pour `getProfession`». Ceci est utile pour s'adapter à de nombreux modules sous la même interface :

```reason
module Company: EstablishmentType = {
  type profession = CEO | Designer | Engineer | ...;

  let getProfession person => ...
  let person1 = ...;
  let person2 = ...;
};
```

Il est également utile de cacher le type sous-jacent comme un détail d'implémentation sur lequel d'autres ne peuvent pas compter. Si vous demandez quel type `Company.profession` est, au lieu d'exposer la variant, il ne vous dira que "c'est `Company.profession`".

### Tout fichier `.rei` est une signature

De la même façon qu'un fichier `react.re`définit implicitement un module React, un fichier `react.rei` définit implicitement une signature pour `React`. Si `react.rei` n'est pas fourni, la signature de `react.re` est par défaut d'exposer tous les champs du module. Parce qu'ils ne contiennent pas de fichiers d'implémentation, les fichiers `.rei` sont utilisés dans l'écosystème pour documenter l'API publique de leurs modules correspondants.

```reason
/* fichier react.re (implémentation. Compile en un module React) */
type state = int;
let render = fun str => str;
```

```reason
/* fihcier react.rei (interface. Compile en signature du module React) */
type state = int;
let render: str => str;
```

Fonctions de module (functors)
----------------------------------

Les modules peuvent être transmis aux fonctions ! Ce serait l'équivalent de passer un fichier en tant qu'élément de première classe. Cependant, les modules sont à une autre "couche" du langage que d'autres concepts communs, donc nous ne pouvons pas les transmettre à des fonctions **régulières**. Au lieu de cela, nous les transmettons à des fonctions spéciales appelées *functors* (foncteurs).

La syntaxe de définition et d'utilisation des functors ressemble beaucoup à la syntaxe pour définir et utiliser des fonctions régulières. Les principales différences sont les suivantes :

- Les functors utilisent le mot-clé `module` en lieu et place de `let` et le mot-clé `fun` désigne ici "functor" et non "function".
- Les functors prennent des modules en entrée et retournent des modules.
- Les functors **requièrent** une annotation des arguments.
- Les functors doivent débuter avec une lettre majuscule (exactement comme les modules/signatures).

Voici un functor `MakeSet` pour l'exemple, qui prend en argument un module de type `Comparable` et retourne un nouvel ensemble qui peut contenir des éléments comparables.

```reason
module type Comparable = {
  type t;
  let equal: t => t => bool;
};

module MakeSet = fun (Item: Comparable) => {
  /* utilisons une liste comme notre structure de données de support naïve */
  type backingType = list Item.t;
  let empty = [];
  let add (currentSet: backingType) (newItem: Item.t) :backingType =>
    /* si item exist */
    if (List.exists (fun x => Item.equal x newItem) currentSet) {
      currentSet /* retourne le même ensemble immutable (une list en réalité) */
    } else {
      [newItem, ...currentSet]; /* prepend l'ensemble et le retourne */
    }
};
```

Les functors peuvent être appliqués à l'aide de la syntaxe d'application de fonctions. Dans ce cas, nous créons un ensemble, dont les éléments sont des paires d'integers.

```reason
module IntPair = {
  type t = (int, int);
  let equal (x1, y1) (x2, y2) => x1 == x2 && y1 == y2;
  let create x y => (x, y);
};

/* IntPair respecte la signature Comparable requise par MakeSet */
module SetOfIntPairs = MakeSet IntPair;
```

#### Types de fonctions de module

Comme avec les types de modules, les types de functors agissent également pour contraindre et cacher ce que nous pouvons supposer sur les functors. La syntaxe pour les types de functors est cohérente avec celles des types de fonctions, mais avec les premières lettres des types en majuscules pour représenter les signatures des modules que le functor accepte comme arguments et valeurs de retour. Dans l'exemple précédent, nous exposions le type de support d'un ensemble. En donnant à `MakeSet` une signature de functor, nous pouvons cacher la structure de données sous-jacente !

```reason
module type Comparable = ...

module type MakeSetType = (Item: Comparable) => {
  type backingType;
  let empty: backingType;
  let add: backingType => Item.t => backingType;
};

module MakeSet: MakeSetType = fun (Item: Comparable) => {
  ...
};
```

Désavantages
----------------------------------

Les modules et les functors se situent dans une autre "couche" de langage que le reste (fonctions, bindings let, structures de données, etc.). Par exemple, vous ne pouvez pas les transmettre facilement dans un tuple ou un record. Utilisez-les judicieusement ! La plupart du temps, juste un record ou une fonction suffisent.

```reason
module School = {...};

/* ceci va directement vous donner une erreur de syntaxe ! */
let schools = (School, School);
```
