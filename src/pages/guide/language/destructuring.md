---
title: Destructuring
order: 130
---

Le "destructuring" est une méthode visuellement concise d'extraction de champs à partir d'une structure de données. Vous pouvez utiliser le destructuring partout où vous utiliseriez normalement une variable.

### Utilisation

Admettons les binds de variables suivants : `ten = 10`, `twenty = 20`

```reason
let someInts = (10, 20);
let (ten, twenty) = someInts;
```

Admettons les binds de variables suivants : `name = "Guy"`, `age = 30`

```reason
type person = {name: string, age: int};
let somePerson = {name: "Guy", age: 30};
let {name, age} = somePerson;
```

Lorsque vous retirez des champs, vous pouvez éventuellement les renommer : `n = "Guy"`, `a = 30`.

```reason
let {name: n, age: a} = somePerson;
```

Le destructuring permet aussi les annotations de type.

```reason
let (ten: int, twenty: int) = someInts;
let {name: (n: string), age: (a: int)} = somePerson;
```

Il est aussi possible de destructurer les arguments labellisés d'une fonction.

```reason
type person = {name: string, age: int};

let someFunction person::{name} => {
  /* vous pouvez utiliser `name` ici */
}

let otherFunction person::({name} as thePerson) => {
  /* vous pouvez utiliser à la fois `name` et tout le record via `thePerson` ici */
}
```
**Continuez votre lecture dans la section pattern matching, pour une forme de déstructuration encore plus folle !**

### Conseils & astuces

Le destructuring peut rendre votre code beaucoup plus concis sans vous obliger à désigner des variables intermédiaires. Utilisez-le ! Mais n'en abusez pas en rendant votre code excessivement imbriqué & lacunaire.

Si vous déstructurez un record ou une variant dont la définition n'est pas dans le fichier actuel, vous devez l'annoter explicitement. Voyez [ici](/guide/language/record#record-needs-an-explicit-definition) et [ici](/guide/language/variant#variant-needs-an-explicit-definition).
