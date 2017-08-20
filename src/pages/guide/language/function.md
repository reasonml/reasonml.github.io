---
title: Function
order: 100
---

Pouvez-vous croire que nous n'avions toujours parlé de fonction jusqu'à présent ?

Les fonctions sont déclarées avec `fun` et retournent une expression.

```reason
let greet = fun name => "Hello " ^ name;
```

Nous déclarons ici une fonction et lui assignons le nom `greet`, qu'on peut ensuite appeler de cette façon :

```reason
greet "world!"; /* "Hello world!" */
```

Les fonctions à plusieurs arguments séparent ces derniers par un espace :

```reason
let add = fun x y z => x + y + z;
add 1 2 3; /* 6 */
```

Pour des fonctions plus longues, vous entourerez le corps de la fonction d'un bloc : 

```reason
let greetMore = fun name => {
  let part1 = "Hello";
  part1 ^ " " ^ name
};
```

**Puisque les définitions de fonctions sont monnaie courante**, nous avons prévu un shorthand pour `let + fun` :

```reason
let add x y z => x + y + z;
/* identique à : let add = fun x y z => x + y + z; */
```

**Faîtes attention à la priorité de la fonction** ! Des fois vous aurez à entourer l'appel dans des parenthèses :

```reason
let increment x => x + 1;
let double x => x + x;

let eleven = increment (double 5);
```

Si vous oubliez d'entourer `double 5` de parenthèses, vous obtiendrez `increment double 5`, comme si la fonction `increment` attendait deux arguments, ce qui n'est pas le cas.

### Aucun argument

Une fonction prend toujours un argument. Mais parfois, nous l'utilisons pour gérer des *side-effects* par exemple, et n'avons rien à lui passer. Dans d'autres langages, nous passions conceptuellement «no argument». En Reason, chaque fonction prend un argument. Ici, nous avons passé la valeur `()`par convention, appelée "*unit*".

```reason
/* reçoit & destructure l'argument unitaire */
let logSomething () => {
  print_endline "hello";
  print_endline "world";
};

/* appelle la fonction avec la valeur de type unit */
logSomething ();
```

`()` est une valeur tout à fait normale, la valeur unique possible dans `unit`. Reason lui a donné une syntaxe spéciale par soucis de commodité.

### Arguments labellisés
Les fonctions multi-arguments, en particulier celles dont les arguments sont du même type, peuvent être source de confusion lors des appels.

```reason
let addCoordinates x y => {
  /* utilisez x et y ici */
};
...
addCoordinates 5 6; /* lequel est x, lequel est y? */
```

En OCaml/Reason, vous pouvez attacher des labels à un argument :

```reason
let addCoordinates x::x y::y => {
  /* utilisez x et y ici */
};
...
addCoordinates x::5 y::6;
```

Étant donné que nous avons la *curryfication* (plus à ce sujet ci-dessous), nous pouvons fournir les arguments dans n'importe quel ordre :

```reason
addCoordinates y::6 x::5;
```

La partie `x::x` de la déclaration signifie que la fonction accepte un argument avec le label `x`, et peut y référer dans le corps de la fonction en tant que variable `x`. Ceci permet d'avoir le pattern suivant, où les arguments labellisés sont renommés à l'intérieur de la fonction par soucis de concision : 

```reason
let drawCircle radius::r color::c => {
  setColor c;
  startAt r r;
  ...
};

drawCircle radius::10 color::"red";
```

Pour le cas commun de `radius::radius` (où le label à le même nom que la variable locale), nous avons la syntaxe shorthand `::radius` :

```reason
let drawCircle ::radius ::color => {
  setColor color;
  startAt radius radius;
  ...
}
```

Voici la syntaxe pour typer des arguements :

```reason
let drawCircle radius::(r: int) color::(c: string) => ...;
```

### Arguments labellisés optionnels

Les arguments labellisés d'une fonction peuvent être rendus facultatifs lors de sa déclaration. Vous pouvez ensuite les omettre lors de l'appel de la fonction.

```reason
/* radius est facultatif */
let drawCircle ::color ::radius=? () => {
  setColor color;
  switch radius {
  | None => startAt 1 1;
  | Some r_ => startAt r_ r_;
  }
};
```

S'il est omis, `radius` est **englobé** dans le type `option` de la librairie standard, qui vaut par défaut `None`. S'il est fourni, `radius` sera enveloppé d'un `Some`. Donc la valeur du type de `radius` vaut soit `None` soit `Some int` ici.

**Note**: `None | Some foo` est un type de structure de données appelé *variant* et est décrit [plus loin](/guide/language/variant). Ce type de variant particulier, fourni par la librairie standard, est appelé `option`. Sa définition ressemble à : `type option 'a = None | Some 'a`.

**Notez** l'unit `()` à la fin de `drawCircle`. Sans ça, vu que `radius` et `color` sont tous deux labellisés, peuvent être curryfiés, et peuvent être appliqués sans ordre spécifique, il n'est pas évident de comprendre ce que siginifie :

```reason
let whatIsThis = drawCircle ::color;
```

Est-ce que `whatIsThis` est une fonction `drawCircle` curryfiée, qui attend que l'argument optionnel `radius` soit appliqué ? Ou bien a-t-il fini de s'appliquer ? Pour résoudre cette confusion, ajoutez un argument positionnel (aka non-labellisé) à `drawCircle` (par convention `()`), et OCaml, en règle générale, supposera que l'argument marqué optionnel est omis lorsque l'argument positionnel est fourni.

```reason
let curriedFunction = drawCircle ::color;
let actualResultWithoutProvidingRadius = drawCircle ::color ();
```

#### Optionnel passé explicitement

Parfois, vous pouvez vouloir transférer une valeur à une fonction sans savoir si la valeur est `None` ou `Some a`. Naïvement, vous feriez :

```reason
let result = switch payloadRadius {
| None => drawCircle ::color ()
| Some r => drawCircle ::color radius::r ()
};
```

Cela devient rapidement fastidieux. Nous fournissons un raccourci :

```reason
let result = drawCircle ::color radius::?payloadRadius ();
```

Ceci signifie "Je comprends que `radius` est optionnel, et que lorsque je lui passe une valeur, il doit s'agir d'un `int`. Mais je ne sais pas si la valeur que je passe est `None` ou `Some val`, alors je vais passer toute le wrapper `option`".

#### Optionnel avec valeur par défaut

Il est aussi possible de définir une valeur par défaut pour les arguments labellisés optionnels. Ils ne sont pas englobés dans un type `option`.

```reason
let drawCircle ::radius=1 ::color () => {
  setColor color;
  startAt r r;
};
```

#### Fonctions récursives

Par défaut, les valeurs ne peuvent pas voir un binding qui pointe sur elles, mais on peut rendre cela possible en incluant le mot-clé `rec` dans un binding `let`. Cela permet aux fonctions de pouvoir accéder à elles-mêmes et de s'appeler, nous donnant ainsi le Pouvoir de la Récursivité.

```reason
let rec neverTerminate = fun () => neverTerminate ();
```

#### Fonctions mutuellement récursives

Les fonctions mutuellement récursives commencent comme un simple fonction récursive en utilisant le mot-clé `rec`, et sont chaînées avec `and`:

```reason
let rec callSecond = fun () => callFirst ()
and callFirst = fun () => callSecond ();
```

**Notez** qu'il n'y a aucun point-virgule à la fin de la première ligne, ni de `let` à la seconde.

#### Curryfication

Les fonctions Reason peuvent être automatiquement appelées **en partie** :

```reason
let add = fun x y => x + y;
let addFive = add 5;
let eleven = addFive 6;
let twelve = addFive 7;
```

En fait, le `add` ci-dessus n'est rien d'autre que du *sucre syntaxique* pour :

```reason
let add = fun x => fun y => x + y;
```

OCaml optimise ceci pour éviter l'allocation inutile de fonctions (2 fonctions ici) chaque fois qu'il le peut ! De cette façon, nous obtenons :

- une belle syntaxe
- la curryfication sans effort supplémentaire (chaque fonction prend un seul argument, en fait !)
- aucun coût de performance
