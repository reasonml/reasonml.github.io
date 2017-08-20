---
title: Type!
order: 15
---

Les types sont le point culminant de Reason ! Vous avez ici un aperçu de pourquoi tant de personnes sont enthousiastes à leur sujet.

Cette section présente brièvement la syntaxe des types afin que vous puissiez évoluer dans les sections suivantes sans être confus(e). Des sujets plus avancés sur les types peuvent être trouvés dans la section [Plus sur le type](/guide/language/more-on-type).

### Annotations

Ce binding let ne contient aucun type d'écrit : 

```reason
let score = 10;
```

Reason sait que `score` est un `int` en se basant sur la valeur `10`. C'est ce qu'on appelle **l'inférence de type**.

Cependant, les types peuvent aussi être écrits manuellement :

```reason
let score: int = 10;
```

Vous pouvez aussi englober des expressions dans des parenthèses et les annoter :

```reason
let myInt = 5;
let myInt = (5: int);
let myInt = (5: int) + (4: int);
let add (x: int) (y: int) :int => x + y;
let drawCircle radius::(r: int) :unit => ...;
```

Note : à la dernière ligne, `radius::(r: int)` est un "*argument labellisé*". Plus à ce sujet [ici](/guide/language/function).

### Alias

Vous pouvez faire référence à un type via un nom différent. Ils seront équivalents :

```reason
type scoreType = int;
let x: scoreType = 10;
```

### Décisions de conception

Reason est propulsé par OCaml, dont le sytème de types a été peaufiné pendant des dizaines d'années. En voici quelques points intéressants : 

- **Les types peuvent être inférés**. Le système de types déduit les types pour vous, même si vous ne les écrivez pas manuellement. Cela accélère la phase de prototypage. En outre, les fonctionnalités d'éditeur comme les [codelens de VSCode](https://github.com/reasonml-editor/vscode-reasonml) vous montrent tous les types pendant que vous écrivez votre code.

- **Le type coverage est toujours de 100%**. Nous n'avons pas besoin d'un outil de «couverture de type» ! Chaque bout de code Reason est typé.

- **Le système de type est "sound"**. Cela signifie que, tant que votre code compile bien, chaque type garantit qu'il décrit bien ce qu'il est. Dans un système conventionnel de types, simplement parce que le type dit qu'il est par exemple "un integer qui n'est jamais nul", ne signifie pas qu'il n'est jamais nul. En revanche, un programme Reason pur n'a pas de bugs nuls.
