---
title: Object
order: 175
---

En Reason, vous utiliserez le record pour regrouper des valeurs nommées ensemble la plupart du temps. Dans certaines situations particulières cependant, vous voudrez peut-être utiliser une fonction similaire appelée *objet*. Ils sont un peu plus souples et présentent des compromis différents.

**Si vous venez de JavaScript**, vous ne recherchez probablement **pas** des objets Reason. Passez directement à la section Conseils & astuces ci-dessous.

### Utilisation

#### Déclaration de type

Un objet **n'a pas besoin de déclaration de type**, bien qu'il puisse en avoir une. Elle est semblable à celle d'un record, avec un `.` en plus :

```reason
type tesla = {
  .
  color: string
};
```

Le point au début indique qu'il s'agit d'un type d'objet «fermé», ce qui signifie qu'un objet basé sur ce type doit avoir exactement cette forme.

```reason
type car 'a = {
  ..
  color: string
} as 'a;
```

Deux points, également appelés *élision*, indiquent qu'il s'agit d'un type d'objet "ouvert", qui peut donc contenir d'autres valeurs et méthodes. Un objet ouvert est également polymorphe et nécessite donc un paramètre.

#### Création

```reason
type tesla = {
  .
  drive: int => int
};

let obj :tesla = {
  val hasEnvy = ref false;
  pub drive speed => {
    this#enableEnvy true;
    speed
  };
  pri enableEnvy envy => {
    hasEnvy := envy
  };
};
```

Cet objet est de type `tesla` et à une méthode publique `drive`. Il contient aussi une méthode privée `enableEnvy` uniquement accessible depuis l'intérieur de l'objet.

Comme vous pouvez le voir, un objet Reason peut aussi avoir accès à `this`. Exactement comme le `this` de l'object JavaScript, notre `this` a un comportement extrêment irrégulier en fonction du contexte. Nan on rigole. Notre `this` pointe toujours correctement vers l'objet en question. Il faut savoir apprendre des erreurs de l'Histoire.

L'exemple suivant montre un type d'objet ouvert qui utilise un type comme paramètre. Le paramètre de type d'objet est requis afin d'implémenter toutes les méthodes du type d'objet ouvert.

```reason
type tesla 'a = {
  ..
  drive: int => int
} as 'a;

let obj:
  tesla {. drive: int => int, doYouWant: unit => bool}
  = {
  val hasEnvy = ref false;
  pub drive speed => {
    this#enableEnvy true;
    speed
  };
  pub doYouWant () => !hasEnvy;
  pri enableEnvy envy => {
    hasEnvy := envy
  };
};
```

### Conseils & astuces

Si vous venez de JavaScript, vous ne cherchez probablement pas les objets Reason natifs, mais plutôt [l'object spécial] (https://bucklescript.github.io/bucklescript/Manual.html#_binding_to_js_objects) de BuckleScript. Ils sont différents en ce qu'ils :

- accèdent aux champs via `##`
- peuvent assigner des champs via `#=`
- sont toujours utilisés comme des paramètres de type dans le type `Js.t`.
- compilent en de véritables objets JavaScript.

Parce qu'ils sont utilisés si souvent, Reason à la valeur de l'objet BuckleScript `[%bs.obj {foo: bar}]` ajoute un *sucre syntaxique* spécial : `{"foo": bar}`. On dirait un record entre guillemets pour faire simple.
