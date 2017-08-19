---
title: JSX
order: 160
---

Voudriez-vous un peu de syntaxe HTML dans votre code Reason ? Si ce n'est pas le cas, passez rapidement cette section et prétendez n'avoir rien vu !

Reason prend en charge la syntaxe JSX, avec quelques légères différences par rapport à celle de [ReactJS](https://facebook.github.io/react/docs/introducing-jsx.html). Reason JSX n'est pas lié à ReactJS, ils se traduisent par des appels de fonction normaux :

### Tag capitalisé

```reason
<MyComponent foo=bar />
```

devient

```reason
MyComponent.make foo::bar children::[] ()
```

### Tag non-capitalisé

```reason
<div foo=bar>child1 child2</div>
```

devient

```reason
div foo::bar children::[child1, child2] () [@JSX]
```

### Utilisation

Voir [ReasonReact](//reasonml.github.io/reason-react/) pour un exemple d'application de JSX.

Voici un tag JSX qui présente la plupart des fonctionnalités.

```reason
<MyComponent
  booleanAttribute=true
  stringAttribute="string"
  intAttribute=1
  forcedOptional=?(Some "hello")
  onClick={updater handleClick}
  onClickThisWorksToo=(updater handleClick)>
  <div>
    (ReasonReact.stringToElement "hello")
  </div>
</MyComponent>
```

### Différences du JSX JavaScript

- Les attributs ne requièrent pas d'accolades, à moins qu'ils ne soient des expressions complexes (dans ce cas, ils sont formatés avec parenthèses).
- Il n'y a aucun support des attributs spread du JSX.
- Le punning !

#### Punning

Le punning d'argument du JSX de ReactJS, ex : `<input checked />`, dû à de malheureuses raisons historiques, se *désucre* en `<input checked=true />`, afin de se conformer aux idiomes du DOM. Reason n'a pas un tel passif, alors nous avons décidé de le *désucré* en `<input checked=checked />`. Cela permet aux gens d'ajouter beaucoup d'autres props dans un composant ReasonReact sans qu'il soit trop gonflé :

```reason
<MyComponent isLoading text onClick />
```

### Conseils & astuces

Pour les auteurs de librairies souhaitant profiter du JSX : l'attribut `[@JSX]` ci-dessus est un hook pour les macros ppx potentielles pour localiser une fonction souhaitant se formater en JSX. Une fois que vous trouvez la fonction, vous pouvez la transformer en toute autre expression.

De cette façon, tout le monde bénéficie de la syntaxe JSX sans avoir besoin d'opter pour une librairie spécifique en l'utilisant, ex : ReasonReact.

Les appels JSX prennent en charge les fonctionnalités des [fonctions labelisées](/guide/language/function#labeled-arguments) : facultatif, explicitement passé en option et facultatif par défaut.

### Décisions de conception

La façon dont nous avons conçu ce JSX est liée à la façon dont nous aimerions aider le langage à évoluer. Voir la section "What's the point?" dans cet [article](https://medium.com/@chenglou/cool-things-reason-formatter-does-9e1f79e25a82).

La possibilité d'avoir des macros dans le langage + la syntaxe agnostique de JSX permet à chaque librairie d'implémenter potentiellement JSX sans tracas. De cette façon, nous ajoutons des connaissances visuelles au langage OCaml sous-jacent sans compromettre ses sémantiques (aka, comment il s'exécute). L'un des principaux objectifs de Reason est de permettre au plus grand nombre de personnes de profiter du beau langage qu'est OCaml, tout en rejetant les débats fastidieux autour de la syntaxe et du formatage.
