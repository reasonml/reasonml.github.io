---
title: Tuple
order: 50
---

Les tuples sont

- immutables
- ordonnés
- de taille fixe lors de leur création
- hétérogènes (peuvent contenir différents types de valeurs)

```reason
let ageAndName = (24, "Lil' Reason");
let my3dCoordinates = (20.0, 30.5, 100.0);
```

Les types de tuples peuvent également être utilisés dans les annotations de types. Ils ressemblent visuellement aux valeurs de tuples.

```reason
let ageAndName: (int, string) = (24, "Lil' Reason");
/* un alias de type de tuple  */
type coord3d = (float, float, float);
let my3dCoordinates: coord3d = (20.0, 30.5, 100.0);
```

**Note** : il n'existe pas de tuple de taille 1. Vous utiliseriez directement la valeur elle-même.

### Utilisation

La librairie standard fournit `fst` et `snd` ([ici](/api/Pervasives.html), sous "Pair operations"), fonctions assez pratiques qui vous permettent d'accéder au premier et au deuxième élément d'un 2-uplet. Généralement, vous avez accès aux membres d'un n-uplet grâce au destructuring (décrit plus loin dans la barre latérale) :

```reason
let (_, y, _) = my3dCoordinates; /* maintenant vous avez récupéré y */
```

Le `_` signifie que vous ignorez les membres indiqués du tuple.

Les tuples ne sont pas destinés à être mis à jour de façon mutative. Créez-en plutôt de nouveaux en déstructurant les anciens.

### Conseils & astuces

Vous utiliserez des tuples dans des situations pratiques qui transmettent plusieurs valeurs sans trop de cérémonie. Par exemple, pour renvoyer plusieurs valeurs :

```reason
let getCenterCoordinates () => {
  let x = doSomeOperationsHere ();
  let y = doSomeMoreOperationsHere ();
  (x, y)
};
```

Ou pour "pattern-match" (traité plus loin) la conjonction des possibilités :

```reason
switch (isWindowOpen, isDoorOpen) { /* ceci est un 2-uplet */
| (true, true) => ...
| (true, false) => ...
| (false, true) => ...
| (false, false) => ...
}
```

Essayez de garder l'utilisation de tuples **locale**. Pour les structures de données qui sont souvent utilisées, préférez un **record**, qui possède des noms de champs.

Un tuple pourrait aussi être appelé un "type produit", et `(string, int)` est écrit `string * int` à certains endroits. L'idée est qu'un tuple est vraiment un "produit cartésien". Imaginez une grille 2D, avec une `string` sur l'axe x et un `int` sur l'axe y !

Le combo tuple + `switch` est très puissant et concis, et **supprime toute une catégorie de bugs**. Ensemble, ils classent clairement toutes les combinaisons possibles de valeurs. Un tuple de type `(bool, bool)` possède en effet `2 * 2 = 4` possibilités, et le système de type vous demande de les couvrir toutes les 4. Cela se prête bien à coder des refactors. Au lieu d'ajouter de façon informelle quelques if-else sur des valeurs arbitraires ici et là, vous pouvez directement identifier la branche exacte du `switch` que vous devez modifier, pas plus, pas moins.

### Décisions de conception

L'existence du tuple peut sembler étrange à celles et ceux qui viennent de langages non typés. "Pourquoi ne pas simplement utiliser une list/un array ?"

Un système de type n'est pas tout-puissant, et ne devrait pas l'être. Certains compromis de bon goût doivent être appliqués afin de garder le langage simple, performant (compilation et vitesse de fonctionnement) et facile à comprendre. Les lists Reason, par exemple, sont plus flexibles en taille. Elles peuvent être concaténées, ajoutées, tranchées, etc. En retour, elles doivent être homogènes (ne peuvent contenir qu'un seul type de valeur par list), et l'accès aléatoire à un index peut ne pas toujours être valide *. Le tuple, d'autre part, grâce à sa contrainte de taille, est plus rapide, donne au système de type assez de marge de manœuvre pour suivre de manière exhaustive tous les types de ses objets et garantit un accès sécurisé. En général, vous remarquerez quelques compromis importants et de bon goût dans un système de type : les champs de records sont fixes, mais peuvent être hétérogènes, alors que les champs d'une map sont flexibles mais homogènes, etc.

Un tuple Reason est typé "structurellement". Cela signifie que même si vous n'avez pas annoté votre donnée avec un type explicite, le compilateur peut encore le déduire en regardant son contenu, son utilisation, etc. Tant que les déclarations et les formes inférées des usages correspondent, tout va bien !

\* Ce n'est pas que le système de types de Reason ne peut pas accepter des listes hétérogènes et de taille dynamique. En fait, il le peut (indice : GADT) ! Mais en créant cette fonctionnalité, la valeur par défaut augmente à la fois la courbe d'apprentissage et la compréhension du code. Tout simplement parce que les types peuvent l'accomplir ne signifie pas que c'est toujours une bonne idée de laisser des morceaux de code grandir de façon complexe sans aucune limite.
