---
title: Pattern Matching!
order: 135
---

_Assurez-vous d'avoir lu la section [Variant](/guide/language/variant) avant_.

**Nous y sommes enfin** ! Le pattern matching est _l'une_ des meilleures fonctionnalités du langage. Il ressemble au destructuring, mais avec encore plus d'aide de la part du système de types.

### Utilisation

Considérons une variant :

```reason
type payload =
| BadResult int
| GoodResult string
| NoResult;
```

Si on l'utilise avec l'expresion `switch`, on peut "destructurer" notre variant de la sorte :

```reason
let data = GoodResult "Product shipped!";

let message =
  switch data {
  | GoodResult theMessage => "Success! " ^ theMessage
  | BadResult errorCode =>
    "Something's wrong. The error code is: " ^ (string_of_int errorCode)
  };
```

Notez comment nous avons destructuré `data` tout en gérant chacun des différents cas. Cependant le `switch` ci-dessus vous générera un warning du compilateur :

```
Warning 8: this pattern-matching is not exhaustive.
Here is an example of a value that is not matched:
NoResult
```

N'est-ce pas merveilleux ? Tout en correspondant à la forme de nos données, le système de types nous a mis en garde contre un cas non traité. Cet aspect **conditionnel** est ce qui en fait du pattern matching plutôt que de la simple déstructuration. La plupart des structures de données avec un aspect «**si ceci alors cela**» fonctionnent aussi :

```reason
switch myList {
| [] => print_endline "Empty list"
| [a, ...theRest] => print_endline ("list with the head value " ^ a)
};

switch myArray {
| [|1, 2|] => print_endline "This is an array with item 1 and 2"
| [||] => print_endline "This array has no element"
| _ => print_endline "This is an array"
}
```

Le cas `_` est un cas spécial qui permet à toutes les conditions inégalées d'accéder à cette branche.

Vous pouvez switch sur des strings, des ints et bien d'autres. Vous pouvez même avoir plusieurs patterns vallant le même résultat !

```reason
let reply =
  switch message {
  | "Reason's pretty cool" => "Yep"
  | "good night" => "See ya!"
  | "hello" | "hi" | "heya" | "hey" => "hello to you too!"
  | _ => "Nice to meet you!"
  };
```

Combiné avec d'autres structures de données, le pattern matching peut produire un code concis, vérifié par le compilateur et performant :

```reason
let message =
  switch data {
  | GoodResult theMessage => "Success! " ^ theMessage
  | BadResult (0 | 1 | 5) => "Something's wrong. It's a server side problem."
  | BadResult errorCode => "Unknown error occurred. Code: " ^ string_of_int errorCode
  | NoResult => "Things look fine"
  };
```

#### Clauses when

Lorsque vous avez vraiment besoin d'utiliser une logique arbitraire avec un pattern match autrement propre, vous pouvez glisser certaines clauses `when`, qui sont grosso modo un *sucre syntaxique* pour `if` :

```reason
let message =
  switch data {
  | GoodResult theMessage => ...
  | BadResult errorCode when isServerError errorCode => ...
  | BadResult errorCode => ... /* otherwise */
  | NoResult => ...
  };
```

### Conseils & astuces

**Simplifiez votre pattern-match chaque fois que vous le pouvez**. Ça vous permet de supprimer bien des bugs. Exemple ci-dessous.

Ne pas trop abuser du cas par défaut `_`. Cela empêche le compilateur de vous dire que vous avez oublié de couvrir un cas (vérification exhaustive), ce qui serait particulièrement utile après un refactoring où vous ajoutez un nouveau cas à une variant. Essayez seulement d'utiliser `_` en dernier recours après avoir tenté d'infinies possibilités, par ex. strings, ints, etc.

Voici une série d'exemples, du pire au meilleur :

```reason
let optionBoolToJsBoolean opt => 
  if (opt == None) {
    Js.false_
  } else {
    if (opt == Some true) {
      Js.true_
    } else {
      Js.false_
    }
  };
```

OK : ceci n'est que pure folie =). Passons le tout au pattern matching : 

```reason
let optionBoolToJsBoolean opt => switch opt {
| None => Js.false_
| Some a => switch a {
  | true => Js.true_
  | false => Js.false_
  }
};
```

Un peu mieux, mais encore imbriqué. Le pattern matching vous permet par ailleurs de faire ceci :

```reason
let optionBoolToJsBoolean opt => switch opt {
| None => Js.false_
| Some true => Js.true_
| Some false => Js.false_
};
```

Beaucoup plus linéaire ! Maintenant, vous pourriez être tenté(e) de faire :

```reason
let optionBoolToJsBoolean opt => switch opt {
| Some true => Js.true_
| _ => Js.false_
};
```

Ce qui est beaucoup plus concis, mais tue le contrôle d'exhaustivité mentionné ci-dessus. Ceci est la meilleure option :

```reason
let optionBoolToJsBoolean opt => switch opt {
| Some true => Js.true_
| Some false | None => Js.false_
};
```

Assez difficile de faire une erreur dans ce code à ce stade ! Chaque fois que vous souhaitez utiliser un if-else avec de nombreuses branches, préférez plutôt le pattern matching. C'est plus concis et [performant](/guide/language/variant#design-decisions) aussi.

Voyez un autre exemple avec switch + tuple [ici](/guide/language/tuple#tips--tricks).

### Notes de conception

Le [problème fizz buzz](https://en.wikipedia.org/wiki/Fizz_buzz#Programming_interviews) notoire émerveille étrangement certaines personnes. En partie grâce à sa capacité à  paralyser le programmeur qui espère simplifier/unifier les quelques branches de l'état à la recherche de l'élégance là où il n'y en a pas. Alors que fizz buzz est légèrement trop dynamique pour être résolu dans les switches sans `when`, espérons que vous pouvez constater qu'habituellement, la concision visuelle du pattern matching nous permet de surmonter la paralysie des décisions tout en conservant tous les avantages (et plus, comme vous l'avez vu) d'un tas de `if-else`s brute-forcés. Il n'y a vraiment rien de mal à énumérer explicitement toutes les possibilités. Le pattern matching correspond à **l'analyse de cas** en mathématiques, une technique de résolution de problèmes valable qui s'avère extrêmement pratique.

Utiliser un `switch` Reason pour la première fois peut vous faire vous sentir comme s'il vous avait manqué toutes ces années. Attention, cela pourrait ruiner d'autres langages à vos yeux =).

Si vous avez essayé de refactorer une grande logique if-else bien imbriquée, vous pouvez vous rendre compte qu'il est très difficile d'obtenir la bonne logique. D'autre part, le couple pattern matching + tuple correspond conceptuellement à un tableau 2D, où chaque cellule peut être remplie de manière indépendante. Cela garantit que chaque fois que vous devez ajouter un cas au `switch`, vous pouvez cibler cette cellule et seulement cette cellule du tableau, sans en déranger d'autres.

```reason
type animal = Dog | Cat | Bird;
let result = switch (isBig, myAnimal) {
| (true, Dog) => 1
| (true, Cat) => 2
| (true, Bird) => 3
| (false, Dog | Cat) => 4
| (false, Bird) => 5
};
```

isBig \ myAnimal | Dog | Cat | Bird
-----------------|-----|-----|------
true             |  1  |  2  |  3
false            |  4  |  4  |  5
