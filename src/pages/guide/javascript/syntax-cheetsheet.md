---
title: Cheatsheet syntaxique
order: 1
---

Reason ressemble à un sous-ensemble typé du JavaScript moderne (uniquement les bons aspects).

La syntaxe Reason est facile à apprendre, et si vous connaissez déjà le JavaScript moderne, vous pouvez généralement lire et comprendre du code Reason sans pour autant avoir appris Reason.
Le langage OCaml qu'utilise Reason propose de nombreux concepts nouveaux qui offrent une expérience beaucoup plus expressive, mais souvent plus contraignante. Reason vous aide à apprendre ces nouveaux concepts plus rapidement et à profiter plus tôt des bénéfices du compilateur OCaml.

C'est pourquoi au final, Reason :

- Permet d'écrire du code qu'un grand nombre de développeurs peut **lire facilement**.
- Peut être **maîtrisé rapidement**.
- Procure la vraie expérience **"si ça compile, ça marche"** initiée par le langage `ML`.
- Compile en hyperviseurs de Type 1 (* **bare metal** native binaries *), *ou* en JavaScript.

### Primitives de base du langue

JavaScript                |   Reason
--------------------------|--------------------------------
<pre>3</pre>                         |  <pre>3</pre>
<pre>3.1415 </pre>                   |  <pre> 3.1415 </pre>
<pre>"Hello world!" </pre>           |  <pre>"Hello world!" </pre>
<pre>'Hello world!' </pre>           |  Les strings doivent utiliser "
Les caractères sont des strings               |  <pre>'a'  </pre>
<pre>true</pre>                      |  <pre>true </pre>
`[1,2,3]`                            |  `[1,2,3]`
<pre>null</pre>                      |  <pre>()</pre>
<pre>const x = y;</pre>              |  <pre>let x = y;</pre>
<pre>let x = y;</pre>                |  <pre>cellules de référence</pre>
<pre>var x = y;</pre>                |  Pas d'équivalent (heureusement)
`[x, ...lst] (temps linéaire)`          | `[x, ...lst] (temps constant)`
`[...lst, x] (temps linéaire)`          | <pre>Pas supporté</pre>
<pre>{...obj, x: y}</pre>            | <pre>{...obj, x: y}</pre>


### Opérations basiques sur des primitives

JavaScript                         |   Reason
-----------------------------------|--------------------------------
<pre>1 + 2</pre>                   |  <pre>1 + 2</pre>
<pre>1.0 + 2.0 </pre>              |  <pre>1.0 +. 2.0 </pre>
<pre>"hello " + "world" </pre>     |  <pre>"hello " ^ "world" </pre>

### Objects et Records
JavaScript                |   Reason
--------------------------|--------------------------------
"Objects"                 |  "Records"
pas de types statiques           |  <pre>type point = {x: int, mutable y: int};</pre>
<pre>{x: 30, y: 20}</pre>          |  <pre>{x: 30, y: 20}</pre>
<pre>point.x</pre>                 |  <pre>point.x</pre>
<pre>point.y = 30;</pre>           |  <pre>point.y = 30;</pre>
<pre>{...point, x: 30}</pre>       |  <pre>{...point, x: 30}</pre>

### Blocs
En Reason, les "expressions de séquence" sont créées avec `{}` et évaluées à leur dernière déclaration. En JavaScript, cela peut être simulé via une variable temporaire qui doit être créée dans un état non valide, puis mutée plus tard.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let res = undefined;
{
  const x = 23;
  const y = 34;
  res = x + y;
};</pre>
    </td>
    <td>
      <pre>
let res = {
  let x = 23;
  let y = 34;
  x + y
};</pre>
    </td>
  </tr>
</table>


### Lambdas

JavaScript a deux différents types de fonctions, alors que Reason n'en a qu'un.

JavaScript                            |   Reason
--------------------------------------|--------------------------------
<pre>arg => retVal  </pre>            |  <pre>fun arg => retVal</pre>
<pre>function named(arg) {...}        |
<pre>let f = function named(arg) {...}|


#### Mot-clé de fonction

La différence principale entre les lambdas du JavaScript moderne (ES6) et ceux de Reason et que ceux de Reason commencencent avec le mot `fun`. Il s'agit simplement d'aider à la compréhension visuelle de la signification d'une fonction lorsqu'elle possède un très large argument déstructuré.

JavaScript                        |   Reason
----------------------------------|--------------------------------
<pre>const incr = x => x + 1;</pre>        |  <pre>let incr = fun x => x + 1;</pre>
<pre>const five = incr(4);</pre>           |  <pre>let five = incr 4;</pre>
<pre>const add = (x, y) => x+y;</pre>      |  <pre>let add = fun x y => x+y;</pre>
<pre>const x = add(3, 4);</pre>            |  <pre>let x = add 3 4;</pre>
<pre>const y = add(3, add(0, 1));</pre>    |  <pre>let y = add 3 (add 0 1);</pre>


#### Expression de fonction

Comme JavaScript, Reason permet toute expression sur le côté droit du lambda `=>`.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
const add = (x, y) =>
  x + x + y + y;
      </pre>
    </td>
    <td>
      <pre>
let add = fun (x, y) =>
  x + x + y + y;
      </pre>
    </td>
  </tr>
</table>


#### Blocs de fonction

Cependant, JavaScript permet aux lambdas de retourner des blocs `{}` *au lieu* d'expressions, via une instruction `return` englobée dans des accolades `{}`. Avec Reason, les blocs`{}` sont *déjà* des expressions, donc Reason n'a pas besoin de deux modes de lambda - tous les lambdas en Reason ont des expressions sur le côté droit de `=>`, et certaines de ces expressions ressemblent comme par hasard au corps de fonction dans les accolades `{}`.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
const myFun = (x, y) => {
  const doubleX = x + x;
  const doubleY = y + y;
  return doubleX + doubleY
};</pre>
    </td>
    <td>
      <pre>
let myFun = fun (x, y) => {
  let doubleX = x + x;
  let doubleY = y + y;
  doubleX + doubleY
};</pre>
    </td>
  </tr>
</table>

#### Arguments de fonction

Lorsque vous utilisez Reason, chaque fonction accepte un seul argument. Dans cet exemple, ce seul argument se trouve être un tuple déstructuré. Cela semble très semblable aux arguments JavaScript. Cependant, la différence est apparente lorsqu'on fournit ces arguments en première classe. En JavaScript, les arguments sont un arry et fournir tous les arguments nécessite un `.apply`. En Reason, vous pouvez simplement fournir le tuple.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let add = (x, y) =>
  x + x + y + y;
let result = add (1, 2);
let myArgs = [1, 2];
let result = add.apply(null, myArgs);</pre>
    </td>
    <td>
      <pre>
let add = fun (x, y) =>
  x + x + y + y;
let result = add (1, 2);
let myArgs = (1, 2);
let result = add myArgs;</pre>
    </td>
  </tr>
</table>

### Application de fonction

En Reason, les parenthèses sont généralement facultatives dans les endroits où il est évident qu'elles ne sont pas nécessaires. Cela signifie que lorsque vous invoquez des fonctions, les parenthèses ne sont pas toujours nécessaires autour de l'argument. Reason vous laissera ajouter des parenthèses si vous les voulez vraiment, mais il est bon de savoir pourquoi certains examples que vous avez lus les ont omis. Voyez comment, dans cet exemple, les arguments qui sont clairement des mots simples ou qui ont des "bookends" équilibrés (tels que `{}`) n'ont pas besoin de parenthèses.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let result = aFunc (oneArg);</pre>
    </td>
    <td>
      <pre>
let result = aFunc (oneArg);
let result = aFunc oneArg;</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
let result = aFunc ({x:0});
      </pre>
    </td>
    <td>
      <pre>let result = aFunc ({x:0});
let result = aFunc {x:0};</pre>
    </td>
  </tr>
</table>

### Curryfication

Aussi bien JavaScript que Reason supportent la curryfication, mais avec Reason, quand vous utilisez le compilateur natif (ou même un backend JavaScript), la curryfication est optimisée. Pour être plus précis : chaque fois que vous arrivez à fournir tous les arguments, le fait de curryfié n'est pas pénalisé en Reason. La principale différence syntaxique lors de la définition des fonctions curryfiées est que les lambdas de Reason commencent toujours par le mot-clé `fun`.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td><pre>let add = a => b => a + b;</pre></td>
    <td><pre>let add = fun a => fun b => a + b;</pre></td>
  </tr>
</table>

Quand vous invoquez des fonctions curryfiées, la syntaxe est identique, mais avec Reason, l'ajout de parenthèses est facultatif.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>let result = add(10)(20);</pre>
    </td>
    <td>
      <pre>let result = add(10)(20);</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre></pre>
    </td>
    <td>
      <pre>let result = add 10 20;</pre>
    </td>
  </tr>
</table>

Parce que les lambdas Reason incluent le mot-clé `fun`, les fonctions curryfiées ne semblent pas être aussi *clean* qu'elles le sont en JavaScript. Pour remédier à cela, Reason intègre un peu de *sucre syntaxique* pour aider avec les définitions de fonctions curryfiées. Ces deux formes sont *en tout point* équivalentes et rien ne change quant à la façon dont vous invoqueriez ces fonctions.

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>let add = a => b => a + b;</pre>
    </td>
    <td>
      <pre>let add = fun a => fun b => a + b;</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>// Pas besoin de sucre syntaxique</pre>
    </td>
    <td>
      <pre>let add = fun a b => a + b;</pre>
    </td>
  </tr>
</table>


### Champs de record

En Reason, vous devez vous assurer que la déclaration de votre record a un type non ambigu si vous souhaitez créer des records ou accéder à des champs de record. Dans le cas le plus simple, le type du record est déjà dans le scope et vous pouvez créer des valeurs simplement en utilisant la syntaxe `{key: value}` standard.

<table>
  <thead>
    <tr>
      <th scope="col"><p>JavaScript</p></th>
      <th scope="col"><p>Reason</p></th>
    </tr>
  </thead>
  <tr>
    <td>
      <pre>function make(
  id, name) {
  return {
    id: id,
    name: name
  };
}</pre>
    </td>
    <td>
      <pre>module Person = {
  type t = {
    id: int, name: string
  };
  let make id name => { id: id, name: name };
  /&ast;
  Ou en utilisant le raccourci de nom de champ,
  let make id name => { id, name };
  &ast;/
};</pre>
    </td>
  </tr>
</table>

Lorsque le type du record est déclaré dans un module différent, vous devez donner quelques informations à Reason quant au type exact que vous voulez, car différents types de record dans différents modules peuvent partager des noms de champs.

Par soucis de sécurité, il est préférable de 1. préfixer au moins un champ d'enregistrement avec le nom du module pour identifier de manière unique le type du record (le plus sûr), 2. préfixer la déclaration du record avec un module temporaire ouvert pour amener le type du record dans le scope (légèrement moins sûr - amène tous les noms du module ouvert dans le scope du reste de l'expression), ou 3. ouvrez le module entier pour que le type du record atteigne le champ d'application (le moins sûr - apporte tous les noms de l'ouverture module dans la portée pour le reste du bloc).

<table>
  <thead>
    <tr>
      <th scope="col"><p>JavaScript</p></th>
      <th scope="col"><p>Reason</p></th>
    </tr>
  </thead>
  <tr>
    <td>
      <pre>const bob =
  { id: 1, name: "Bob" };</pre>
    </td>
    <td>
      <pre>let bob = {
  Person.id: 1, name: "Bob"
};</pre>
    </td>
  </tr>
  <tr>
    <td><pre></pre></td>
    <td>
      <pre>let bob = Person.{
  id: 1, name: "Bob"
};</pre>
    </td>
  </tr>
  <tr>
    <td><pre></pre></td>
    <td>
      <pre>open Person;
let bob = {
  id: 1, name: "Bob"
};</pre>
    </td>
  </tr>
</table>

### Expressions

Si ce n'était pas déjà clair, en Reason, quasiment tout est une expression. Par exemple, en Reason, l'instruction `switch` est évaluée en une valeure, ce qui rend la programmation moins propice aux erreurs. Notez comment, dans la version JavaScript, il y a certaines fois où le programme est dans un état non valide. L'instruction switch en Reason fournit également beaucoup plus de *superpouvoirs*, abordés dans la partie [Pattern
Matching](/guide/language/destructuring).

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>login ? "hi" : "bye" </pre>
    </td>
    <td>
      <pre>login ? "hi" : "bye" </pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
let res = undefined;
switch (thing) {
  case first:
     res = "first";
     break;
  case second:
     res = "second";
     break;
};
      </pre>
    </td>
    <td>
      <pre>
let res = switch thing {
  | first => "first"
  | second => "second"
};
      </pre>
    </td>
  </tr>
</table>
