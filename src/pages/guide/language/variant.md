---
title: Variant!
order: 70
---

Voici, le joyau de la couronne des structures de données Reason !

La majorité des structures de données dans la plupart des langages concernent «ceci **et** cela». Une variante nous permet d'exprimer «ceci **ou** cela».

```reason
type myResponseVariant =
| Yes
| No
| PrettyMuch;

let areYouCrushingIt = Yes;
```

`Yes`, `No` et `PrettyMuch` ne sont pas des strings, ni des références, ou un type spécial de donnée. Il s'agit de "*constructeurs*" (ou "*tags*"). Le pipe `|` sépare chaque constructeur.

**Note** : le constructeur d'une variante doit être écrit avec la première lettre en majuscule.

### Utilisation

Avec une variant vient l'une des fonctionnalités les plus importantes de Reason, l'expression `switch`.

Un `switch` Reason est visuellement similaire à celui d'autres langages (aka un long `if/elseif/elseif`...). Il vous permet de vérifier tous les cas possibles d'une variant. Pour l'utiliser, énumérez chaque constructeur de la variant que vous souhaitez utiliser, chacun suivi d'un `=>` et de l'expression correspondant à ce cas.

```reason
let message = switch (areYouCrushingIt) {
| No => "No worries. Keep going!"
| Yes => "Great!"
| PrettyMuch => "Nice!"
};
/* message vaut "Great!" */
```

Une variant a un pourcentage extrêmement important d'assistance du système de types. Par exemple, nous vous donnerons une erreur de type si vous avez oublié de couvrir un cas de votre variant ou si deux cas sont redondants. Assurez-vous de jeter un coup d'oeil au switch et au pattern-matching dans une [section ultérieure](/guide/language/pattern-matching) !

#### Une variante nécessite une définition explicite

Si la variant que vous utilisez est dans un fichier différent, amenez-la dans le scope comme vous le feriez [pour un record](/guide/language/record#record-needs-an-explicit-definition) :

```reason
/* Zoo.re */

type animal = Dog | Cat | Bird;
```

```reason
/* example.re */

let pet: Zoo.animal = Dog; /* preferred */
/* or */
let pet = Zoo.Dog;
```

#### Arguments de constructeur

Les constructeurs de variants peuvent contenir des données supplémentaires séparées par un espace.

```reason
type account =
| None
| Instagram string
| Facebook string int;
```

Ici, `Instagram` contient une `string`, et `Facebook` tient une `string` et un `int`. Utilisation :

```reason
let myAccount = Facebook "Josh" 26;
let friendAccount = Instagram "Jenny";
```

**Remarquez comment utiliser un constructeur est sembable à un appel de fonction ?** C'est comme si `Facebook` était une fonction qui acceptait deux arguments. Ce n'est pas un hasard. Il y a une raison pour laquelle les données d'un constructeur s'appellent "arguments de constructeur".

À l'aide de `switch`, vous pouvez faire du pattern-matching (encore une fois décrit dans une section ultérieure) sur les arguments d'un constructeur :

```reason
let greeting = switch (myAccount) {
| None => "Hi!"
| Facebook name age =>
  "Hi " ^ name ^ ", you're " ^ (string_of_int age) ^ "-year-old."
| Instagram name => "Hello " ^ name ^ "!"
}
```

#### Mentions honorables

La [ librairie standard](/api/index.html) expose deux importantes variants dont vous entendrez souvent parler.

##### `option`

```reason
type option 'a = None | Some 'a;
```

C'est la convention utilisée pour simuler une valeur "nulle" (aka `undefined` ou `null`) d'autres langages. Grâce à cette définition de type de commodité, Reason peut rendre chaque valeur non-nulle par défaut. Un `int` sera toujours un int, jamais "`int` **ou** `null` **ou** `undefined`". Si vous souhaitez exprimer un "int nul", vous utiliserez `option int`, dont les valeurs possibles sont `None` ou `Some int`. `switch` vous force à gérer les deux cas. Par conséquent, **un programme en Reason pur n'a pas d'erreurs `null`**.

##### `list`

```reason
type list 'a = Empty | Head 'a (list 'a);
```

_Pas la définition de type réelle. Juste un exemple_.

Ceci signifie : "une list contenant une valeur de type `a` (quelle qu'elle soit) est soit vide, soit contient cette valeur plus une autre list".

Reason fournit à `list` un *sucre syntaxique*. `[1, 2, 3]` est conceptuellement équivalent à `Head 1 (Head 2 (Head 3 Empty))`. Encore une fois, le `switch` vous oblige à gérer chaque cas de cette variant, y compris `Empty` (aka `[]`). **Ceci élimine une autre grande catégorie de bugs d'accès.**

##### Autres types semblables à des variants

Saviez-vous que vous pouvez utiliser `switch` sur des strings, ints, floats, arrays, et plein d'autres structures de données ? Essayez dans l'éditeur pour voir !

<!-- TODO playground link -->

### Conseils & astuces

**Faîtes attention** à ne pas confondre un constructeur comportant 2 arguments avec un constructeur avec un seul tuple en argument :

```reason
type account =
| Facebook string int /* 2 arguments */
type account2 =
| Instagram (string, int) /* 1 argument - qui se trouve être un 2-uplet */
```
#### Les variants doivent avoir un constructeur

Si vous venez d'un langage non typé, vous pourriez être tenté d'essayer `type foo = int | string`. Ceci n'est pas possible en Reason. Vous devriez donner à chaque branche un constructeur : `type foo = Int int | String int`. Bien qu'en général, le simple fait que vous ayez besoin d'écrire ça pourrait bien être un anti-pattern. La section Décisions de conception ci-dessous l'explique plus en détails.

#### Interopérabilité avec JavaScript

_Cette section suppose des connaissance sur l'[IFE](http://bucklescript.github.io/bucklescript/Manual.html#_ffi) de BuckleScript. Sautez cette partie si vous n'avez pas encore ressenti le besoin d'utiliser des variants pour gérer des bindings de fonctions JavaScript_.

Beaucoup de librairies JavaScript utilisent des fonctions pouvant accepter de nombreux types d'arguments. Dans ces cas là, il est très tentant de les modéliser par des variants. Par exemple, supposons qu'il existe une fonction JavaScript `myLibrary.draw` qui prend un `number` ou une `string` en paramètre. Vous pourriez être tenté de la bind comme tel :

```
/* réservé pour un usage interne */
external draw: 'a => unit = "draw" [@@bs.module "myLibrary"];

type animal =
  | MyFloat float
  | MyString string;

let betterDraw animal =>
  switch animal {
  | MyFloat f => draw f
  | MyString s => draw s
  };
```

Vous pourriez procéder de la sorte, mais il existe de bien meilleures solutions ! Par exemple, deux `external`s tout simplement, qui compilent vers le même appel JavaScript :

```
external drawFloat: float => unit = "draw" [@@bs.module "myLibrary"];
external drawString: string => unit = "draw" [@@bs.module "myLibrary"];
```

Ou, faîtes vous plaisir et utilisez une fonctionnalité avancée des variants appelée GADT, puis utilisez la [fonctionnalité de l'argument fantôme de l'IFE](http://bucklescript.github.io/bucklescript/Manual.html#_phantom_arguments_and_ad_hoc_polymorphism) de BuckleScript. Si ces mots ne vous disent absolument rien, pas de soucis. Référez-vous plutôt à la suggestion précédente.

#### Les types de variantes se trouvent par nom de champ

Veuillez vous référer à cette [section du record](/guide/language/record#record-types-are-found-by-field-name). C'est pareil pour les variants : une fonction ne peut pas accepter un constructeur arbitraire partagé par deux différentes variants. Encore une fois, cette fonctionnalité existe, il s'agit de la *variant polymorphique*. Nous en parlerons plus dans le futur =).

### Décisions de conception

La variant sous ses nombreuses formes (variant polymorphe, variant ouverte, GADT, etc.) est probablement *la* fonctionnalité clé d'un système de types comme celui de Reason. La variant `option` susmentionnée, par exemple, supprime le besoin de types nuls, une source majeure de bugs dans d'autres langages. Philosophiquement parlant, un problème est composé de nombreuses branches/conditions possibles. Mal gérer ces conditions est la principale source de ce que nous appelons "bugs". **Un système de types n'élimine pas les bugs par magie. Il souligne les conditions non traitées et vous demande de les couvrir**\*. La capacité à modéliser "ceci ou cela" correctement est cruciale.

Par exemple, certains se demandent comment le système de types peut empêcher les données JSON mal formatées de se propager dans leur programme. Ils ne le font pas, pas par eux-mêmes ! Mais si l'analyseur renvoie le type  `option` `None | Some actualData`, alors vous devriez gérer le cas `None` de façon explicite dans les prochains lieux d'appel. C'est aussi simple que ça.

D'un point de vue "performances pures", une variant peut potentiellement accélérer considérablement la logique de votre programme. Voici un morceau de JavaScript :

```js
let data = 'dog';
if (data === 'dog') {
  ...
} else if (data === 'cat') {
  ...
} else if (data === 'bird') {
  ...
}
```

Il y a une quantité linéaire de contrôle de branche ici (`O(n)`). Comparez ceci à l'utilisation d'une variant Reason :

```reason
type animal = Dog | Cat | Bird;
let data = Dog;
switch data {
| Dog => ...
| Cat => ...
| Bird => ...
}
```

Le compilateur voit la variant et ensuite 

1. la transforme de façon conceptuelle en `type animal = 0 | 1 | 2`

2. compile `switch` en un format constant dans le temps (`O(1)`).

Vous pourriez vous demander pourquoi les langages fonctionnels typés sont souvent utilisés pour le parsing. Le switch d'un grand arbre de données de façon efficace et en toute sécurité est à peu près le meilleur scénario possible pour les variants.

<!-- TODO: playground link -->

Mind blown? Les variants ont une connexion profonde avec d'autres domaines des mathématiques. [Voyez ici](https://codewords.recurse.com/issues/three/algebra-and-calculus-of-algebraic-data-types) pour vous lancer dans une exploration intéressante.

\*Il est toujours plus agréable de concevoir le problème plutôt que de recourir à un système de types pour couvrir les défauts. En réalité, il est irréaliste de le faire pour chaque problème, ou même simplement de comprendre tous les problèmes afin de concevoir une solution. Un système de types vous permet d'apporter bons nombres de changements à votre codebase en toute sécurité, sans avoir à tout comprendre par avance. À cet égard, les types nous permettent également de ne pas trop concevoir une API pour contourner les pièges simples des callers. Ils réduisent les couches d'abstractions nécessaires pour «faire avancer les choses», ce qui, en retour, réduit le fardeau cognitif des callers.

