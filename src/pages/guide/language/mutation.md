---
title: Mutation
order: 140
---

Reason a de grandes capacités de programmation impératives et mutatives traditionnelles. Vous devez utiliser ces fonctionnalités avec modération, mais parfois elles permettent à votre code d'être plus performant et écrit dans un pattern plus familier.

### Binding let muté

Les bindings let sont immutables, mais vous pouvez les englober dans un `ref`, qui est un peu comme une boîte dont le contenu peut changer :

```reason
let foo = ref 5;
```

### Utilisation

Vous pouvez accéder à la valeur d'un `ref` via l'opérateur `!` :

```
let five = !foo; /* 5 */
```

Affectez une nouvelle valeur à `foo` comme ceci :

```
foo := 6;
```

Notez que le précédent binding `five` reste `5`, puisqu'il a obtenu l'élément sous-jacent dans la boîte `ref`, pas le  `ref` lui-même.

### Conseils & astuces

**Just kidding**! `ref` n'est en fait pas une fonctionnalité particulière ! C'est juste un *sucre syntaxique* ordinaire pour un [type de record mutable prédéfini appelé `ref`](/api/Pervasives.html#TYPEref) dans la librairie standard (cherchez "References" dans cette page). Voici la version *désucrée* :

```reason
let foo = {contents: 5};
let five = foo.contents;
foo.contents = 5;
```

Avant d'essayer d'utiliser des `ref`, sachez que vous pouvez obtenir des «mutations» légères et locales via des overrides de bindings let :

```reason
let foo = 10;
let foo = someCondition ? foo + 5 : foo;
print_int foo; /* soit 15 ou 10 */
```
