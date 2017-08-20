---
title: Comparaison avec OCaml 🔴
order: 50
---

Un rapide résumé pour les développeurs OCaml.

### Commentaires

Les commentaires en Reason utilisent le style de commentaires de la famille du C et les commentaires en OCaml utilisent plutôt le style `(*
*)`. En Reason, les `/**/` en commentaires imbriqués sont valides lors du parsing, et en OCaml, les `(* *)` le sont aussi de leur côté.
Reason pourra aussi supporter les commentaires de fin de ligne, ce qui n'est pas le cas en OCaml.

<table>
  <thead><tr> <th scope="col"><p >OCaml</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <code>
`(* OCaml (*nest*) *)`
      </code>
    </td>
    <td>
      <code>
`/* Reason /*nest*/  */`
      </code>
    </td>
  </tr>
</table>

### REPL ([Read-Eval-Print-Loop](https://en.wikipedia.org/wiki/Read–eval–print_loop))

Dans la boucle d'évaluation de Reason, `rtop` (une version customisée d'`utop`), chaque entrée est soumise via un seul point-virgule `;`. La boucle d'évalution OCaml quant à elle requiert deux points-virgules `;;`.

<table>
  <thead><tr> <th scope="col"><p >OCaml REPL</p></th> <th scope="col"><p>Reason REPL</p></th></tr></thead>
  <tr>
    <td>
      <pre>;;</pre>
    </td>
    <td>
      <pre>;</pre>
    </td>
  </tr>
</table>

### Renommage d'opérateur

Reason possède tous les opérateurs infixes d'OCaml, mais plusieurs d'entre eux sont *exprimés* différement.
En Reason, l'égalité simple s'écrit `==`, et l'égalité stricte (égalité physique) s'écrit  `===` (souvenez-vous juste de rajouter un `=` supplémentaire à ceux qu'OCaml
requiert). En Reason, pour vérifier une inégalité,
changer juste le premier caractère que nous venons de voir avec un `!` (`!=` pour l'inégalité simple, et `!==` pour l'inégalité stricte). Les choix de symboles de Reason sont légèrement plus cohérents et suivents les conventions d'ES6.
<table>
  <thead><tr><th scope="col"><p>Égalité</p></th> <th scope="col"><p>Exprimée en OCaml via</p></th> <th scope="col"><p>Exprimée en Reason via</p></th></tr></thead>
  <tr>
    <td>
      <pre>
structural</pre>
    </td>
    <td>
      <pre>
x = y</pre>
    </td>
    <td>
      <pre>
x == y</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
reference</pre>
    </td>
    <td>
      <pre>
x == y</pre>
    </td>
    <td>
      <pre>
x === y</pre>
    </td>
  </tr>
  <thead><tr><th scope="col"><p>Inégalité</p></th> <th scope="col"><p>Exprimée en OCaml via</p></th> <th scope="col"><p>Exprimée en Reason via</p></th></tr></thead>
  <tr>
    <td>
      <pre>
structural</pre>
    </td>
    <td>
      <pre>
x <> y</pre>
    </td>
    <td>
      <pre>
x != y</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
reference</pre>
    </td>
    <td>
      <pre>
x != y</pre>
    </td>
    <td>
      <pre>
x !== y</pre>
    </td>
  </tr>
</table>


### Scope local

Le scoping lexical de Reason est exactement le même que celui d'OCaml, mais les  bindings *let* ressemblent syntaxiquement au "block scope" qui est beaucoup plus familier pour de nombreux développeurs. En Reason, le scope est créé avec des accolades `{}`, qui peuvent contenir des bindings `let` et des commandes impératives, séparés par des `;`.
Tous les blocs sont *évalués* à la dernière ligne où le point-virgule est d'ailleurs facultatif. Les accolades`{}` ne sont nécessaires que si vous avez plus d'un élément à chaîner via `;`.

<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let \_ =
  let msg = "Hello" in
  print\_string msg;
  let msg2 = "Goodbye" in
  print\_string msg2</pre>
    </td>
    <td>
      <pre>
{
  let msg = "Hello";
  print\_string msg;
  let msg2 = "Goodbye";
  print\_string msg2
};</pre>
    </td>
  </tr>
</table>

La syntaxe `{}` en Reason supprime plusieurs *pain points* communément signalés dans la syntaxe d'OCaml :

- Les doubles point-virgules sont complètement retirés.
- `begin`/`end` est complètement retiré.
- Les fameux [problèmes](https://github.com/ocaml/ocaml/pull/278) de parsing impératif ont disparu.
- Les *corps* (*bodies*) et *local scope* des modules ont été unifiés.

### Scope local Vs. Corps de module

En Reason, tout ce qui peut être écrit entre les `{}` peut être dans le [scope Local](#reason-vs-ml-syntax-local-scope) ou les *corps de module*. Vous pouvez même généralement copier/coller votre code entre ces deux contextes. En OCaml, les syntaxes pour les deux contextes sont très différentes. Le *scope local* requiert un *trailing* `in`, mais pas les *corps de module*. Par ailleurs, certaines déclarations impératives doivent être assignées à `_` ou `()`, voir utiliser un double `;;`).
Reason simplifie grandement la syntaxe pour les nouveaux _et_ les plus expérimentés des développeurs ML.

<table>
  <thead><tr> <th scope="col"><p>Body d'un module OCaml</p></th><th scope="col"><p>Body d'un module Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let ten = 10
let () = imperativeFunc ten ten
let () = imperativeFunc 0 0</pre>
    </td>
    <td>
      <pre>
let ten = 10;
imperativeFunc ten ten;
imperativeFunc 0 0;</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
let ten = 10;;
imperativeFunc ten ten;;
imperativeFunc 0 0;;</pre>
    </td>
    <td>*Idem*</td>
  </tr>
  <thead><tr> <th scope="col"><p>Scope local OCaml</p></th><th scope="col"><p>Scope local Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let ten = 10 in
let \_ = imperativeFunc ten ten in
imperativeFunc 0 0</pre>
    </td>
    <td>
       *Idem*
    </td>
  </tr>
  <tr>
    <td>
      <pre>
let ten = 10 in begin
  imperativeFunc ten ten;
  imperativeFunc 0 0
end</pre>
    </td>
    <td>
       *Idem*
    </td>
  </tr>
  <tr>
    <td>
      <pre>
let ten = 10 in (
  imperativeFunc ten ten;
  imperativeFunc 0 0
)</pre>
    </td>
    <td>
       *Idem*
    </td>
  </tr>
</table>

### Tuples et Records

En Reason, les tuples s'écrivent toujours avec des parenthèses. Cela rend Reason plus facile à lire et supprime par la même occasion le besoin d'englober à l'intérieur de parenthèses supplémentaires, les annotations de type des membres du tuple.

<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>let tup = 4, 5</pre>
    </td>
    <td>
      <pre>let tup = (4, 5);</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>let tup = ((1: int), (2:int))</pre>
    </td>
    <td>
      <pre>let tup = (1: int, 2:int);</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>fun ((a:int), (b:int)) -> a </pre>
    </td>
    <td>
      <pre>fun (a:int, b:int) => a</pre>
    </td>
  </tr>
</table>

En Reason, les records ressemblent à du JavaScript, utilisant `:` à la place de `=`. Vu que les tuples Reason sont toujours dans des parenthèses, les records  peuvent contenir des *lambdas* sans besoin de parenthèses supplémentaires.
<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let myRec = {x = 0; y = 10}</pre>
    </td>
    <td>
      <pre>
let myRec = {x: 0, y: 10};</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
let myFuncs = {
  myFun = (fun x -> x + 1);
  your = (fun a b -> a + b);
}</pre>
    </td>
    <td>
      <pre>
let myFuncs = {
  myFun: fun x => x + 1,
  your: fun a b => a + b
};</pre>
    </td>
</table>

### Listes

Les Listes en Reason sont délimitées par des virgules plutôt que par des points-virgules comme c'est le cas en JavaScript. Reason utilise aussi la syntax *spread* de JavaScript pour la concatenation de liste au lieu de l'opérateur `::`.

<table>
<thead><tr> <th scope="col"><p>Listes OCaml</p></th><th scope="col"><p>Listes Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>let list = [1; 2; 3]</pre>
      <pre>let list = hd :: tl</pre>
    </td>
    <td>
      <pre>let list = [1, 2, 3];</pre>
      <pre>let list = [hd, ...tl];</pre>
    </td>
  </tr>
</table>

### Définitions de type

Avec Reason, les types ressemblent généralement aux valeurs qu'ils représentent. Il n'y a qu'un seul motif syntaxique à apprendre pour chaque type de type. Tandis qu'en OCaml, il y a une syntaxe différente pour les types de tuples `(x * y)` et les valeurs de tuples
`(x, y)`.

<table>
<thead><tr> <th scope="col"><p>Tuples OCaml</p></th><th scope="col"><p>Tuples Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
type tuple = int \* int
let tup: tuple = (10, 30)</pre>
    </td>
    <td>
      <pre>
type tuple = (int, int);
let tup: tuple = (10, 30);</pre>
    </td>
  </tr>
<thead><tr> <th scope="col"><p>Records OCaml</p></th><th scope="col"><p>Records Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
type r =
  {x: int; y: int};
let myRec: r = {x = 0; y = 10};</pre>
    </td>
    <td>
      <pre>
type r =
  {x: int, y: int};
let myRec: r = {x: 0, y: 10};</pre>
    </td>
  </tr>
<thead><tr> <th scope="col"><p>Fonctions OCaml</p></th><th scope="col"><p>Fonctions Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
type func = int -> int;
let x: func = fun a -> a + 1;</pre>
    </td>
    <td>
      <pre>
type func = int => int;
let x: func = fun a => a + 1;</pre>
    </td>
  </tr>
</table>

### Fonctions

OCaml propose trois façons de définir une fonction :

- Certaines formes d'OCaml utilisent des flèches `->`, d'autres des signes égal `=`.
- Certaines formes d'OCaml utilisent le mot-clé `fun`, d'autres le mot-clé `function`.

Reason propose aussi les 3 mêmes façons de définir des lambdas, mais par soucis de cohérence :

- Reason utilisera toujours une flèche `=>`.
- Reason utilise un mot-clé tout au plus (`fun`).
- Comme pour tout *pattern matching*, le pipe `|` est requis dans le pattern match de l'argument.

###### Fonctions match à un argument

OCaml a une définition de fonction (`function |`) qu'on considère équivalente à `function a -> match a with ...`. Reason possède la même, mais la syntaxe ici montre plus clairement qu'il s'agit d'une extension de fonction à un seul arguement. Le match à un seul cas est une extension naturelle du lambda simple, et le lambda à plusieurs cas est une extension naturelle du lambda simple.

<table>
  <thead><tr> <th scope="col"><p>Forme</p></th><th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      lambda
    </td>
    <td>
      <pre>
fun pat -> e</pre>
    </td>
    <td>
      <pre>
fun pat => e</pre>
    </td>
  </tr>
  <tr>
    <td>
      cas à un match
    </td>
    <td>
      <pre>
function | pat -> e</pre>
    </td>
    <td>
      <pre>
fun | pat => e</pre>
    </td>
  </tr>
  <tr>
    <td>
      plusieurs cas
    </td>
    <td>
      <pre>
function | pat -> e
         | pat2 -> e</pre>
    </td>
    <td>
      <pre>
fun | pat => e
    | pat2 => e</pre>
    </td>
  </tr>
</table>

###### Binding let pour les fonctions curryfiées

Les deux syntaxes d'OCaml et de Reason offrent un zeste de *syntactic sugar* pour exprimer les fonctions curryfiées. Le tableau suivant montre 3 définitions équivalentes qui sont identiques une fois parsées.  Comme toujours, toutes les fonctions Reason incluent une flèche `=>`.

<table> <thead><tr><th scope="col"><p>OCaml</p></th><th
        scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let x = fun a -> fun b -> e</pre>
    </td>
    <td>
      <pre>
let x = fun a => fun b => e;</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
let x = fun a b -> e</pre>
    </td>
    <td>
      <pre>
let x = fun a b => e;</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
let x a b = e</pre>
    </td>
    <td>
      <pre>
let x a b => e;</pre>
    </td>
  </tr>
</table>


### Annotation d'arguments de fonction

En Reason et en OCaml, les arguments sont annotés avec des types (comme pour tout le reste), les enveloppant entre parenthèses après l'ajout `:typeAnnotation`.

```reason
fun (arg : argType) => returnValue;
```

```reason
fun (arg : argType) => fun (arg2 : arg2Type) => returnValue;
```

```reason
fun (arg : argType) (arg2 : arg2Type) => returnValue;
```


Reason ainsi qu'OCaml permettent d'annoter le type retourné, lorsqu'on utilise la forme du "super binding let *sucré*".

```ocaml
(* OCaml *)
let myFunc (a:int) (b:int) :int * int = (a, b)
let myFunc (a:int) (b:int) :int list = [1]
let myFunc (a:int) (b:int) :int -> int = fun x -> x + a + b
```


```reason
/* Reason */
let myFunc (a:int) (b:int) :(int, int) => (a, b);
let myFunc (a:int) (b:int) :list int => [1];
let myFunc (a:int) (b:int) :(int => int) => fun x => x + a + b;
```
> Parce que nous utilisons `=>` pour les fonctions partout en Reason, il y a un cas où nous avons besoin d'ajouter des parenthèses supplémentaires atour du type retourné, qui est lui-même un type de fonction.


### Paramètres de type

###### OCaml :

Les applications de type en OCaml (pensez "generics"), sont appliquées dans l'ordre inverse.

Il y a ainsi dans le langage, quelques conséquences assez peu intuitives à cela.

```ocaml
    let x: int list = [2]

    type listOfListOfInts = int list list

    (* Parsé comme étant : *)
    type listOfListOfInts = (int list) list
```


Les choses deviennent encore plus étranges lorsque les constructeurs de type acceptent plusieurs paramètres. Les arguments multiples nécessitent des parenthèses et des virgules pour séparer les paramètres de type, mais ces parenthèses ne représentent pas les tuples. La forme parenthèses/virgule doit également être donnée lors de la construction d'instances de type telles que le tuple`(int, string)`.


```ocaml
    type ('a, 'b) tuple = 'a * 'b

    type listOfTuplesOfStringAndInt = (string, int) tuple list

    (* Parsé comme étant : *)
    type listOfTuplesOfStringAndInt = ((string, int) tuple) list

    (* CE qui permet une liste de (tuples de (string et d'int)) *)
    let tuples: listOfTuplesOfStringAndInt = [("asdf", 3)]
```

###### Reason :

En résumé, Reason unifie presque la totalité de la syntaxe en un style simple d'"application de fonction", ce qui signifie que les paramètres de type suivent le même modèle de listes séparées par des espaces vu partout ailleurs dans la syntaxe. Comme pour tout le reste, les parenthèses peuvent être utilisées pour faire respecter la priorité. Le résultat de tout cela est qu'il y a moins de modèles syntaxiques à apprendre.

Par exemple, on peut imaginer `list` comme étant une "fonction" pour les types qui accepte un type et retourne un nouveau type.

<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let x: int list = [2]
type listOfListOfInts =
  int list list
type ('a, 'b) tup = ('a \* 'b)
type pairs = (int, int) tup list
let tuples: pairs = [(2, 3)]</pre>
    </td>
    <td>
      <pre>
let x: list int = [2];
type listOfListOfInts =
  list (list int);
type tup 'a 'b = ('a, 'b);
type pairs = list (tup int int)
let tuples: pairs = [(2, 3)]</pre>
    </td>
  </tr>
</table>



### Tuples en tant que paramètres de type

Parce qu'OCaml utilise des parenthèses et des virgules pour représenter plusieurs arguments de constructeurs de type, il est assez déroutant de voir que l'un des arguments d'un constructeur de type est lui-même un tuple. En OCaml, il est difficile de se rappeler la différence entre un constructeur de type acceptant plusieurs arguments et un constructeur de type acceptant un seul argument qui se trouve être un tuple.

Les exemples suivants montrent la différence entre passer *deux* paramètres de type à `pair` et `un seul` paramètre de type qui est un tuple.

<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
type intPair = (int, int) pair
type pairList = (int \* int) list</pre>
    </td>
    <td>
      <pre>
type intPair = pair int int;
type pairList = list (int, int);</pre>
    </td>
  </tr>
</table>

- En Reason, la syntaxe qui représente un tuple ou des types de tuples ressemble toujours à un tuple.
- En Reason, la syntaxe qui représente un record ou des types de records ressemble toujours à un record.
- À peu près tout le reste utilise le modèle syntaxique de l'application de fonction (arguments séparés par des espaces).



### Variants

###### OCaml
- OCaml s'attend déjà à ce que les types des arguments de constructeurs soient spécifiés sous la forme de tuples, donc on est un peu confus lorsque le seul argument qu'attend un constructeur se trouve être type de tuple.
- Ce qui est encore plus surprenant, c'est que les constructeurs n'acceptent pas *réellement* les tuples, même si la syntaxe semble ressembler à des tuples.
- Parfois, la syntaxe pour l'instanciation d'un constructeur avec plusieurs arguments chevauche la syntaxe pour construire une variant avec un seul argument qui se trouve être un tuple - donc on dirait que vous êtes entrain d'envoyer un tuple, alors que ce n'est pas le cas.

###### Reason

- Les types de constructeurs de variants doivent être listés sous forme de listes séparées par des espaces, en utilisant des parenthèses pour regrouper par priorité (comme *tout* le reste).
- La construction des instances de la variant (comme vous l'aurez deviné) suit le style d'application de la fonction (listes séparées par des espaces).
- Les Tuples *ressemble* **toujours** à des tuples, et tout autre chose qui ressemblerait à un type … *est* un tuple.

<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
type myVariant =
   | HasNothing
   | HasSingleInt of int
   | HasSingleTuple of (int \* int)
   | HasMultipleInts of int \* int
   | HasMultipleTuples
      of (int \* int) \* (int\* int)

let a = HasSingleInt 10
let a = HasSingleTuple (10, 10)
let a = HasMultipleInts (10, 10)
let a =
  HasMultipleTuples (
    (10, 10),
    (10, 10)
  )

let res = match x with
   | HasNothing -> 0
   | HasSingleInt x -> 0
   | HasSingleTuple (x, y) -> 0
   | HasMultipleInts (x, y) -> 0
   | HasMultipleTuples
      ((x, y),
       (q, r)) -> 0</pre>
    </td>
    <td>
      <pre>
type myVariant =
   | HasNothing
   | HasSingleInt int
   | HasSingleTuple (int, int)
   | HasMultipleInts int int
   | HasMultipleTuples
      (int, int) (int, int);

let a = HasSingleInt 10;
let a = HasSingleTuple (10, 10);
let a = HasMultipleInts 10 10;
let a =
  HasMultipleTuples
    (10, 10)
    (10, 10);

let res = switch x {
   | HasNothing => 0
   | HasSingleInt x => 0
   | HasSingleTuple (x, y) => 0
   | HasMultipleInts x y => 0
   | HasMultipleTuples
      (x, y)
      (q, r) => 0
};</pre>
    </td>
  </tr>
</table>


### Pattern Matching

###### OCaml


###### Reason

- Utilise le mot-clé `switch`, et ne requiert pas `with`.
- *Requiert* d'englober les cas du `switch` dans des accolades `{}` afin d'éviter toute confusion et une mauvaise analyse des erreurs lorsque le pattern matching est intégré dans un autre pattern matching.
- Utilise `=>`.
- Requiert l'emploi du pipe `|`. C'est une bonne idée car cela libère d'autres possibilités dans la grammaire sans pour autant générer de conflits.


Pouvez-vous repérer l'erreur dans l'exemple OCaml ? C'est l'une des erreurs les plus fréquentes chez les développeurs OCaml. Le second `match` *doit* être englobé dans des parenthèses, sinon le cas `Some` est parsé comme appartenant au `match` externe. Les blocs `{}` requis par Reason devraient prévenir ce genre de problèmes.

<table>
  <thead><tr> <th scope="col"><p>OCaml (non fonctionnel)</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let res = match x with
  | A (x, y) -> match y with
    | None -> 0
    | Some i -> 10
  | B (x, y) -> 0</pre>
    </td>
    <td>
      <pre>
let res = switch x {
  | A (x, y) => switch y {
    | None => 0
    | Some i => 10
  }
  | B x y => 0
};</pre>
    </td>
  </tr>
</table>

### Modules et Signatures

###### Définition de Modules/Signatures

<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
module type MySig = sig
  type t = int
  val x: int
end
module MyModule: MySig = struct
  type t = int
  let x = 10
end
module MyModule = struct
  module NestedModule = struct
     let msg = "hello";
  end
end
      </pre>
    </td>
    <td>
      <pre>
module type MySig = {
  type t = int;
  let x: int;
};
module MyModule: MySig = {
  type t = int;
  let x = 10;
};
module MyModule = {
  module NestedModule = {
     let msg = "hello";
  };
};
      </pre>
    </td>
  </tr>
</table>


##### Types de foncteurs

De la même manière que les paramètres de type (pensez generics) ont été conçu de façon cohérente avec la syntaxe de l'application de fonction, Reason unifie aussi la syntaxe des  Foncteurs.

En Reason, les règles de parsing de foncteurs sont quasiment identiques à celles des fonctions, utilisant le flèche `=>` pour représenter l'application curryfiée.

<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
module type FType =
    functor (A: ASig) ->
    functor (B:BSig) -> Result
      </pre>
    </td>
    <td>
      <pre>
module type FType =
    (A: ASig) =>
    (B:BSig) => Result;
      </pre>
    </td>
  </tr>
</table>

### Foncteurs

En Reason, la syntaxe pour créer et appliquer des foncteurs est quasiment identique à celle des fonctions. De plus, *l'application* d'un foncteur est cohérente avec celle d'un fonction (encore une fois, des listes séparées par des espaces).


<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
module F =
  functor (A:ASig) ->
  functor (B:BSig) ->
    struct end</pre>
    </td>
    <td>
      <pre>
module F =
  fun (A:ASig) =>
  fun (B:BSig) =>
    {};</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
module F =
  functor
    (A:ASig)
    (B:BSig) -> struct end</pre>
    </td>
    <td>
      <pre>
module F =
  fun (A:ASig)
      (B:BSig) => {};</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
module F
       (A:ASig)
       (B:BSig) =
         struct end</pre>
    </td>
    <td>
      <pre>
module F
           (A:ASig)
           (B:BSig) =>
             {};</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
module Res = F(A)(B)</pre>
    </td>
    <td>
      <pre>
module Res = F A B;</pre>
    </td>
  </tr>
</table>

> \* **Note: Il existe actuellement une incohérence connue lorsque les foncteurs ne sont pas conformes à la syntaxe de l'application de fonction lorsqu'ils sont à la place d'une annotation de type - voir
`formatTest/modules.re`.**



### Améliorations diverses

OCaml ne requiert pas de parenthèses autour des séquences `(a;b;c;d)` ou des tuples `(x,y)`, ce qui finit par exclure un tas d'autres règles de syntaxe très pratiques. Vu que Reason utilise toujours les accolades `{}` pour englober des séquences ou des bindigs let, et que Reason
requiert toujours des parenthèses `()` autour de tuples, beaucoup d'autres constructions de syntaxe sont exprimées de manière plus intuitive, sans nécessiter d'enveloppement supplémentaire entre parenthèses.


###### Les lambdas en champs de record n'ont plus besoin de parenthèses supplémentaires

Il s'agit d'une amélioration bienvenue parce que les erreurs de type en OCaml que l'utilisateur voyait étaient très déroutantes quand il pensait que la valeur de retour de la fonction était un tuple avec une virgule `,` infixe.


<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let myFuncs = {
  myFun = (fun x -> x + 1);
  your = (fun a b -> a + b);
}</pre>
    </td>
    <td>
      <pre>
let myFuncs = {
  myFun: fun x => x + 1,
  your: fun a b => a + b
}</pre>
    </td>
  </tr>
</table>


###### Les lambdas en résultats de match n'ont plus besoin de parenthèses supplémentaires
<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let x = match prnt with
  | None -> fun a -> blah
  (\* Extra () required ! \*)
  | Some "\_" -> (fun a -> ())
  | Some "ml" -> blah
      </pre>
    </td>
    <td>
      <pre>
let x = switch prnt {
| None => fun a => blah
| Some "_" => fun a => ()
| Some "ml" => blah
};</pre>
    </td>
  </tr>
</table>

###### Les lambdas en types d'annotation de tuples n'ont plus besoin de parenthèses supplémentaires

<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let tuple =
  ((fun x -> x), 20)
let tuple =
  (("hi": string), (20: int))
      </pre>
    </td>
    <td>
      <pre>
let tuple =
  (fun x => x, 20);
let tuple =
  ("hi": string, 20: int);
      </pre>
    </td>
  </tr>
</table>


### Différences diverses

##### Priorité d'`as`

Avec Reason, `as` à une plus grande priorité que le pipe `|`. Cela permet de créer des alias `as` pour des lignes entières dans le pattern matching.

<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let ppp = match MyThing 20 with
  | (MyThing x as ppp)
  | (YourThing x as ppp) -> ppp;
      </pre>
    </td>
    <td>
      <pre>
let ppp = switch (MyThing 20) {
| MyThing x as ppp
| YourThing x as ppp => ppp;
};
      </pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
let | (MyThing \_ as ppp)
    | (YourThing \_ as ppp) = ppp;</pre>
    </td>
    <td>
      <pre>
let | MyThing \_ as ppp
    | YourThing \_ as ppp = ppp;</pre>
    </td>
  </tr>
</table>

### Updates de champ de record mutables

Parce que les égalités et leurs négations ont été rendues plus cohérentes en Reason, l'opérateur `=` est disponible pour la mise à jour du champ mutable.

<table>
  <thead><tr> <th scope="col"><p >OCaml</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
myRec.field <- "next"</pre>
    </td>
    <td>
      <pre>
myRec.field = "next"</pre>
    </td>
  </tr>
</table>

##### Opérateurs de préfix

En Reason, `!` et d'autres opérateurs de préfixe ont une priorité moindre que celle du point `.` ou du dièse `#`. C'est plus cohénrent avec ce que font d'autres langages, et plus pratique lorque (ou si) le symbole `!` est utilisé pour représenter le booléen `not`.

Ocaml                                 | Reason
--------------------------------------|--------------------------------
<pre>   let x = !(foo.bar);    </pre> | <pre>    let x = !foo.bar;        </pre>
<pre>   let x = !(foo#bar);    </pre> | <pre>    let x = !foo#bar;        </pre>
<pre>   let x = !(!foo.bar);   </pre> | <pre>    let x = !(!foo).bar;     </pre>
<pre>   let x = !(!foo#bar);   </pre> | <pre>    let x = !(!foo)#bar;     </pre>
<pre>   let x = !(!(foo.bar)); </pre> | <pre>    let x = !(!foo.bar);     </pre>
<pre>   let x = !(!(foo#bar)); </pre> | <pre>    let x = !(!foo#bar);     </pre>
<pre>   let x = !!(foo.bar);   </pre> | <pre>    let x = !!foo.bar;       </pre>
<pre>   let x = !!(foo#bar);   </pre> | <pre>    let x = !!foo#bar;       </pre>
<pre>   let x = !~(foo.bar);   </pre> | <pre>    let x = !~foo.bar;       </pre>
<pre>   let x = !~(foo#bar);   </pre> | <pre>    let x = !~foo#bar;       </pre>


###### Escape de commentaire
Parce que Reason utilise des commentaires de style C, certains obscurs opérateurs préfixés/infixes customs doivent être écrits différemment. Les règles pour les opérateurs préfixés/infixes sont les mêmes que dans la syntaxe OCaml, mais avec les exceptions suivantes:

Plus précisément, si un caractère, à l'exception du premier, d'un opérateur préfixé/infixe est une étoile ou un slash, il faut d'abord l'échapper avec un backslash. Ceux-ci seront analysés *sans* le backslash lorsqu'ils seront ajoutés à l'AST. Lorsqu'ils sont reprint, les backslashes sont automatiquement rajoutées.


OCaml                                        | Reason
---------------------------------------------|--------------------------------
<code>let (/*) a b => a + b;       </code>   |  <code>     let (/\\\*) a b => a + b;         </code>
<code>let x = 12 /-\* 23 /-\* 12;  </code>   |  <code>     let x = 12 /-\\\* 23 /-\\\* 12; </code>
<code>let y = (/*) a b;            </code>   |  <code>     let y = (/\\\*) a b;            </code>
<code>let (!=*) q r => q + r;      </code>   |  <code>     let (!=\\\*) q r => q + r;      </code>
<code>let res = q (!=*) r;         </code>   |  <code>     let res = q (!=\\\*) r;         </code>
<code>let (!=/*) q r => q + r;     </code>   |  <code>     let (!=\/\\\*) q r => q + r;    </code>
<code>let res = q (!=/*) r;        </code>   |  <code>     let res = q (!=\/\\\*) r;       </code>



###### Renommage d'opérateur
Si Reason utilise `==` pour représenter le `=` d'OCaml, et
utilise `===` pour représenter le `==` d'OCaml, alors comment est-ce que Reason représente le symbole `===` d'OCaml (s'il était définit) ? Reason propose une solution ! "Escape" le symbole triple égal !

<table>
  <thead><tr> <th scope="col"><p>Identifiant</p></th><th scope="col"><p>Signifit</p></th> <th scope="col"><p>Exprimé en OCaml via</p></th> <th scope="col"><p>Exprimé en Reason via</p></th></tr></thead>
  <tr>
  <tr>
    <td>
      <pre>
"==="</pre>
    </td>
    <td>
      <pre>
Custom value</pre>
    </td>
    <td>
      <pre>
x === y</pre>
    </td>
    <td>
      <pre>
x \=== y</pre>
    </td>
  </tr>
</table>
