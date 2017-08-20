---
title: Comparaison avec OCaml
order: 50
---

Si vous venez d'OCaml ou si vous êtes un néophyte lisant un tutoriel écrit sur OCaml, ce guide est pour vous ! Mais n'oubliez pas que [reason-tools](https://github.com/reasonml/reason-tools) peut convertir la syntaxe OCaml et Reason à la volée.

### Commentaires

OCaml | Reason
------|-------
`(* OCaml (*nest*) *)` | `/* Reason /*nest*/  */`

### Renommage d'opérateur

Raison supporte tous les opérateurs infixes d'OCaml, mais quelques opérateurs sont exprimés différemment. Dans Reason, l'égalité structurelle est exprimée avec `==`, et l'égalité de référence (physique) est exprimée avec `===`. Dans Reason, pour obtenir l'inégalité correspondante, il suffit d'échanger le premier caractère avec un caractère `!` (`!=` pour l'inégalité structurelle, et `!==` pour l'inégalité de référence).

Égalité | OCaml | Reason
---------|-------|-------
Structurelle | `x = y` | `x == y`
Référence | `x == y` | `x === y`

Inégalité | OCaml | Reason
---------|-------|-------
Structurelle | `x <> y` | `x != y`
Référence | `x != y` | `x !== y`

### Scope local

Le scoping lexical de Reason est exactement le même que celui d'OCaml, mais les bindings let ressemblent syntaxiquement au "block scope" qui est plus familier à de nombreux développeurs. En Reason, ils sont créés avec des accolades `{}`, qui peuvent contenir à la fois des bindings et des commandes impératives, séparées par `;`. Tous les blocs évaluent à la dernière ligne, où le point-virgule est facultatif. Les accolades `{}` ne sont nécessaires que si vous avez plus d'un élément à chaîner via via `;`.

<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let _ =
  let msg = "Hello" in
  print_string msg;
  let msg2 = "Goodbye" in
  print_string msg2</pre>
    </td>
    <td>
      <pre>
{
  let msg = "Hello";
  print_string msg;
  let msg2 = "Goodbye";
  print_string msg2
};</pre>
    </td>
  </tr>
</table>

La syntaxe `{}` en Reason supprime plusieurs *pain points* communément signalés dans la syntaxe d'OCaml :

- Les doubles point-virgules sont complètement retirés.
- `begin`/`end` est complètement retiré.
- Les fameux [problèmes](https://github.com/ocaml/ocaml/pull/278) de parsing impératif ont disparu.
- Le corps et le scope local des modules sont unifiés.

### Scope local vs Corps de module

En Reason, tout ce qui peut être écrit entre les `{}` peut être dans le [scope local](/guide/ocaml#local-scope) ou les corps de module. Vous pouvez même généralement copier/coller votre code entre ces deux contextes. En OCaml, les syntaxes pour les deux contextes sont très différentes. Le scope local requiert un trailing `in`, mais pas les corps de module. Par ailleurs, certaines déclarations impératives doivent être assignées à `_` ou `()`, voir utiliser un double `;;`.

<table>
  <thead><tr> <th scope="col"><p>Corps de module OCaml</p></th><th scope="col"><p>Corps de module Reason</p></th></tr></thead>
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
    <td>Idem qu'au dessus</td>
  </tr>

  <thead><tr> <th scope="col"><p>Scope local OCaml</p></th><th scope="col"><p>Scope local Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let ten = 10 in
let _ = imperativeFunc ten ten in
imperativeFunc 0 0</pre>
    </td>
    <td>
       Idem qu'au dessus
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
       Idem qu'au dessus
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
       Idem qu'au dessus
    </td>
  </tr>
</table>

### Tuple et Record

En Reason, les tuples s'écrivent toujours avec des parenthèses.

OCaml | Reason
------|-------
`let tup = 4, 5` | `let tup = (4, 5);`
`let tup = ((1: int), (2:int))` | `let tup = (1: int, 2:int);`
`fun ((a: int), (b: int)) -> a ` | `fun (a: int, b: int) => a;`

En Reason, les valeurs des records ressemblent à du JavaScript, utilisant `:` à la place de `=`. Vu que les tuples Reason sont toujours dans des parenthèses, les records peuvent contenir des lambdas sans besoin de parenthèses supplémentaires.

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

### Lists

OCaml | Reason
------|-------
`let list = [1; 2; 3]` | `let list = [1, 2, 3]`
`let list = hd :: tl` | `let list = [hd, ...tl];`

### Définitions de type

Tuple OCaml | Tuple Reason
------|-------
`type tuple = int * int` | `type tuple = (int, int);`
`let tup: tuple = (10, 30)` | `let tup: tuple = (10, 30);`

Record OCaml | Record Reason
------|-------
`type r = {x: int; y: int}` | `type r = {x: int, y: int};`
`let myRec: r = {x = 0; y = 10}` | `let myRec: r = {x: 0, y: 10};`

Fonction OCaml | Fonction Reason
------|-------
`type func = int -> int` | `type func = int => int;`
`let x: func = fun a -> a + 1` | `let x: func = fun a => a + 1;`

### Fonctions

OCaml | Reason
------|-------
`let x a b = e` | `let x a b => e;`
`let x = fun a b -> e` | `let x = fun a b => e;`
`let x = fun a -> fun b -> e` | `let x = fun a => fun b => e;`

#### Fonctions match à un argument

OCaml a une définition de fonction (`function |`) qu'on considère équivalente à `function a -> match a with ...`. Reason possède la même, mais la syntaxe ici montre plus clairement qu'il s'agit d'une extension de fonction à un seul arguement. Le match à un seul cas est une extension naturelle du lambda simple, et le lambda à plusieurs cas est une extension naturelle du lambda simple.

<table>
  <thead><tr> <th scope="col"><p>Forme</p></th><th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      Lambda
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
      Cas à un match
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
      Plusieurs cas
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

#### Annotations d'argument

En Reason et en OCaml, les arguments sont annotés avec des types (comme pour tout le reste), les enveloppant entre parenthèses après l'ajout de `:typeAnnotation`.

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

Parce que nous utilisons `=>` pour les fonctions partout en Reason, il y a un cas où nous avons besoin d'ajouter des parenthèses supplémentaires atour du type retourné, qui est lui-même un type de fonction.


#### Paramètres de type

##### OCaml

Les applications de type en OCaml (pensez "generiques"), sont appliquées dans l'ordre inverse.

Il y a ainsi dans le langage, quelques conséquences assez peu intuitives à cela.


```ocaml
let x: int list = [2]

type listOfListOfInts = int list list

(* Parsé comme étant : *)
type listOfListOfInts = (int list) list
```


Les choses deviennent encore plus étranges lorsque les constructeurs de type acceptent plusieurs paramètres. Les arguments multiples nécessitent des parenthèses et des virgules pour séparer les paramètres de type, mais ces parenthèses ne représentent pas les tuples. La forme parenthèses/virgule doit également être donnée lors de la construction d'instances de type tels que le tuple`(int, string)`.


```ocaml
type ('a, 'b) tuple = 'a * 'b

type listOfTuplesOfStringAndInt = (string, int) tuple list

(* Parsé comme étant : *)
type listOfTuplesOfStringAndInt = ((string, int) tuple) list

(* Ce qui permet une liste de (tuples de (string et d'int)) *)
let tuples: listOfTuplesOfStringAndInt = [("asdf", 3)]
```

##### Reason

En résumé, Reason unifie presque la totalité de la syntaxe au style d'une simple "application de fonction", ce qui signifie que les paramètres de type suivent le même modèle de listes séparées par des espaces vu partout ailleurs dans la syntaxe. Comme pour tout le reste, les parenthèses peuvent être utilisées pour faire respecter la priorité. Le résultat de tout cela est qu'il y a moins de modèles syntaxiques à apprendre.

Par exemple, on peut imaginer `list` comme étant une "fonction" pour les types qui accepte un type et retourne un nouveau type.

<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let x: int list = [2]
type listOfListOfInts = int list list
type ('a, 'b) tup = ('a * 'b)
type pairs = (int, int) tup list
let tuples: pairs = [(2, 3)]</pre>
    </td>
    <td>
      <pre>
let x: list int = [2];
type listOfListOfInts = list (list int);
type tup 'a 'b = ('a, 'b);
type pairs = list (tup int int);
let tuples: pairs = [(2, 3)];</pre>
    </td>
  </tr>
</table>

### Tuples en tant que paramètres de type

Parce qu'OCaml utilise des parenthèses et des virgules pour représenter plusieurs arguments de constructeurs de type, il est assez déroutant de voir que l'un des arguments d'un constructeur de type est lui-même un tuple. En OCaml, il est difficile de se rappeler la différence entre un constructeur de type acceptant plusieurs arguments et un constructeur de type acceptant un seul argument qui se trouve être un tuple.

Les exemples suivants montrent la différence entre passer *deux* paramètres de type à `pair` et *un seul* paramètre de type qui est un tuple.

OCaml | Reason
------|-------
`type intPair = (int, int) pair` | `type intPair = pair int int;`
`type pairList = (int * int) list` | `type pairList = list (int, int);`

- En Reason, la syntaxe qui représente un tuple ou des types de tuples ressemble toujours à un tuple.
- En Reason, la syntaxe qui représente un record ou des types de records ressemble toujours à un record.
- À peu près tout le reste utilise le modèle syntaxique de l'application de fonction (arguments séparés par des espaces).


### Variants

###### OCaml
- OCaml s'attend déjà à ce que les types des arguments de constructeurs soient spécifiés sous la forme de tuples, donc on est un peu confus lorsque le seul argument qu'attend un constructeur se trouve être type de tuple.
- Ce qui est encore plus surprenant, c'est que les constructeurs n'acceptent pas *réellement* les tuples, même si la syntaxe parait ressembler à des tuples.
- Parfois, la syntaxe pour l'instanciation d'un constructeur avec plusieurs arguments chevauche la syntaxe pour construire une variant avec un seul argument qui se trouve être un tuple - donc on dirait que vous êtes entrain d'envoyer un tuple, alors que ce n'est pas le cas.

###### Reason

- Les types de constructeurs de variants doivent être listés sous forme de listes séparées par des espaces, en utilisant des parenthèses pour regrouper par priorité (comme *tout* le reste).
- La construction des instances de la variant (comme vous l'aurez deviné) suit le style d'application de la fonction (listes séparées par des espaces).
- Les tuples *ressemblent* **toujours** à des tuples, et tout autre chose qui ressemblerait à un type … *est* un tuple.

<table>
  <thead>
    <tr>
      <th scope="col">
        <p>OCaml</p>
      </th>
      <th scope="col">
        <p>Reason</p>
      </th>
    </tr>
  </thead>
  <tr>
    <td>
      <pre>
type myVariant =
  | HasNothing
  | HasSingleInt of int
  | HasSingleTuple of (int * int)
  | HasMultipleInts of int * int
  | HasMultipleTuples of (int * int) * (int * int)
      </pre>
    </td>
    <td>
      <pre>
type myVariant =
  | HasNothing
  | HasSingleInt int
  | HasSingleTuple (int, int)
  | HasMultipleInts int int
  | HasMultipleTuples (int, int) (int, int);
      </pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
let a = HasSingleInt 10
let a = HasSingleTuple (10, 10)
let a = HasMultipleInts (10, 10)
let a = HasMultipleTuples ((10, 10), (10, 10))
      </pre>
    </td>
    <td>
      <pre>
let a = HasSingleInt 10;
let a = HasSingleTuple (10, 10);
let a = HasMultipleInts 10 10;
let a = HasMultipleTuples (10, 10) (10, 10);
      </pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
let res = match x with
  | HasNothing -> 0
  | HasSingleInt x -> 0
  | HasSingleTuple (x, y) -> 0
  | HasMultipleInts (x, y) -> 0
  | HasMultipleTuples ((x, y), (q, r)) -> 0
      </pre>
    </td>
    <td>
      <pre>
let res = switch x {
| HasNothing => 0
| HasSingleInt x => 0
| HasSingleTuple (x, y) => 0
| HasMultipleInts x y => 0
| HasMultipleTuples (x, y) (q, r) => 0
};
      </pre>
    </td>
  </tr>
</table>

### Pattern Matching

Pouvez-vous repérer l'erreur dans l'exemple OCaml ? C'est l'une des erreurs les plus fréquentes chez les développeurs OCaml. Le second `match` *doit* être englobé dans des parenthèses, sinon le cas `Some` est parsé comme appartenant au `match` externe. Les blocs `{}` requis par Reason devraient prévenir ce genre de problèmes.

<table>
  <thead><tr> <th scope="col"><p>OCaml (NON FONCTIONNEL)</p></th><th scope="col"><p>Reason</p></th></tr></thead>
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

#### Définition

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

#### Types de functor

<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
module type FType =
  functor (A: ASig) ->
  functor (B: BSig) -> Result
      </pre>
    </td>
    <td>
      <pre>
module type FType =
  (A: ASig) =>
  (B: BSig) => Result;
      </pre>
    </td>
  </tr>
</table>

### Functors

<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
module F =
  functor (A: ASig) ->
  functor (B: BSig) -> struct end</pre>
    </td>
    <td>
      <pre>
module F =
  fun (A: ASig) =>
  fun (B: BSig) => {};</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
module F = functor (A: ASig) (B: BSig) -> struct end</pre>
    </td>
    <td>
      <pre>
module F = fun (A: ASig) (B: BSig) => {};</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
module F (A: ASig) (B: BSig) = struct end</pre>
    </td>
    <td>
      <pre>
module F (A: ASig) (B: BSig) => {};</pre>
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

**Note : il existe actuellement une incohérence connue lorsque les functors ne sont pas conformes à la syntaxe de l'application de fonction lorsqu'ils sont à la place d'une annotation de type - voir
`formatTest/modules.re` sur le [repo Reason](https://github.com/facebook/reason).**


### Améliorations diverses

OCaml ne requiert pas de parenthèses autour des séquences `(a;b;c;d)` ou des tuples `(x,y)`, ce qui finit par exclure un tas d'autres règles de syntaxe très pratiques. Vu que Reason utilise toujours les accolades `{}` pour englober des séquences ou des bindigs let, et qu'il
requiert toujours des parenthèses `()` autour de tuples, beaucoup d'autres constructions de syntaxe sont exprimées de manière plus intuitive, sans nécessiter d'enveloppement supplémentaire entre parenthèses.

#### Les lambdas en champs de record n'ont plus besoin de parenthèses supplémentaires

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


#### Les lambdas en résultats de match n'ont plus besoin de parenthèses supplémentaires

<table>
  <thead><tr> <th scope="col"><p>OCaml</p></th><th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let x = match prnt with
  | None -> fun a -> blah
  (* Extra () required ! *)
  | Some "_" -> (fun a -> ())
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

#### Les lambdas et annotations de types des tuples n'ont plus besoin de parenthèses supplémentaires

OCaml | Reason
------|-------
`let tuple = ((fun x -> x), 20)` | `let tuple = (fun x => x, 20);`
`let tuple = (("hi": string), (20: int))` | `let tuple = ("hi": string, 20: int);`

### Différences diverses

#### Priorité d'`as`

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
let | (MyThing _ as ppp)
    | (YourThing _ as ppp) = ppp;</pre>
    </td>
    <td>
      <pre>
let | MyThing _ as ppp
    | YourThing _ as ppp = ppp;</pre>
    </td>
  </tr>
</table>

#### Mises à jour de champ de record mutable

Parce que les égalités et leurs négations ont été rendues plus cohérentes en Reason, l'opérateur `=` est disponible pour la mise à jour du champ mutable.

OCaml | Reason
------|-------
`myRec.field <- "next"` | `myRec.field = "next"`

#### Opérateurs préfixes

En Reason, `!` et d'autres opérateurs préfixes ont une priorité moindre que celle du point `.` ou du dièse `#`. C'est plus cohérent avec ce que font d'autres langages, et plus pratique lorsque (ou si) le symbole `!` est utilisé pour représenter le booléen `not`.

OCaml                                 | Reason
--------------------------------------|--------------------------------
`let x = !(foo.bar)`    | `let x = !foo.bar;`
`let x = !(foo#bar)`    | `let x = !foo#bar;`
`let x = !(!foo.bar)`   | `let x = !(!foo).bar;`
`let x = !(!foo#bar)`   | `let x = !(!foo)#bar;`
`let x = !(!(foo.bar))` | `let x = !(!foo.bar);`
`let x = !(!(foo#bar))` | `let x = !(!foo#bar);`
`let x = !!(foo.bar)`   | `let x = !!foo.bar;`
`let x = !!(foo#bar)`   | `let x = !!foo#bar;`
`let x = !~(foo.bar)`   | `let x = !~foo.bar;`
`let x = !~(foo#bar)`   | `let x = !~foo#bar;`


#### Escape de commentaire
Parce que Reason utilise des commentaires de style C, certains obscurs opérateurs préfixes/infixes customs doivent être écrits différemment. Les règles pour les opérateurs préfixes/infixes sont les mêmes que dans la syntaxe OCaml, mais avec les exceptions suivantes :

Plus précisément, si un caractère, à l'exception du premier, d'un opérateur préfixe/infixe est une étoile ou un slash, il faut d'abord l'échapper avec un backslash. Ceux-ci seront analysés *sans* le backslash lorsqu'ils seront ajoutés à l'AST. Lorsqu'ils sont reprint, les backslashes sont automatiquement rajoutés.


OCaml                                        | Reason
---------------------------------------------|--------------------------------
`let (/*) a b = a + b`      |  `let (/\*) a b => a + b;`
`let x = 12 /-* 23 /-* 12`   |  `let x = 12 /-\* 23 /-\* 12;`
`let y = (/*) a b`           |  `let y = (/\*) a b;`
`let (!=*) q r => q + r`     |  `let (!=\*) q r => q + r;`
`let res = q (!=*) r`        |  `let res = q (!=\*) r;`
`let (!=/*) q r = q + r`    |  `let (!=\/\*) q r => q + r;`
`let res = q (!=/*) r`       |  `let res = q (!=\/\*) r;`

#### Renommage d'opérateur

Si Reason utilise `==` pour représenter le `=` d'OCaml, et
utilise `===` pour représenter le `==` d'OCaml, alors comment est-ce que Reason représente le symbole `===` d'OCaml (s'il était définit) ? Reason propose une solution ! "Escape" le symbole triple égal !

Identifier | Meaning | OCaml | Reason
-----------|---------|-------|-------
`"==="` | Custom value | `x === y` | `x \=== y`

#### REPL

Dans la boucle d'évaluation de Reason, [`rtop`](/guide/editor-tools/extra-goodies#repl) (une version customisée d'[`utop`](https://github.com/diml/utop)), chaque entrée est soumise via un seul point-virgule `;`. La boucle d'évalution OCaml quant à elle requiert deux points-virgules `;;`.

OCaml | Reason
------|-------
`;;` | `;`
