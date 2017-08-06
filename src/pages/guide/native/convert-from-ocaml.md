---
title: Convertir depuis OCaml
order: 4
---

Étant donné que Reason est juste une autre syntaxe pour OCaml, convertir un projet OCaml est assez intuitif et ne nécessite pas de modifications sémantiques. Cependant, il y aura besoin de quelques réglages et modifications diverses.

#### OCamlBuild -> Rebuild
Reason est fourni avec un outil pour remplacer `ocamlbuild` nommé `rebuild`, qui va automatiquement build n'importe quel fichier Reason en même temps que vos fichiers OCaml, sans besoin d'une quelconque configuration. Ça vous permet de rajouter vos fichiers Reason à votre projet OCaml existant, petit à petit, bit par bit. Quel que soit l'endroit où votre script fait référence à `ocamlbuild`, remplacez-le juste par `rebuild`.

#### Makefile
Si votre système de build exécute des commandes de build explicites, alors la façon la plus simple d'utiliser Reason avec `ocamlopt/ocamlc` est d'ajouter les flags suivant à chaque étape de compilation :

```sh
# intf-suffix dit au compilateur où regardez pour trouver les fichiers d'interface correspondants
ocamlopt -pp refmt -intf-suffix rei -impl myFile.re
ocamlopt -pp refmt -intf myFile.rei
```

Si vous utilisez `ocamlbuild` sans `rebuild`, ajoutez la ligne suivante à votre fichier
`_tags`, mais ce ne sera probablement pas assez car `ocamlc`/`ocamlopt` aura besoin des flags `-intf/-impl/-intf-suffix` :

```
<**/*.{re,.rei}>: package(reason), syntax(utf8)
```

#### Correction de syntaxe de constructeur

Le code Reason converti peut attacher `[@implicit_arity]` aux constructeurs des variants de la sorte : `C 1 2 [@implicit_arity]`. Cela est dû au fait qu'OCaml à cette syntaxe ambiguë où un constructeur à plusieurs arguments attend l'argument sous la forme d'un *tuple*. Donc pendant le parsing, nous ne savons pas si `C (1, 2)` en OCaml doit être traduit par `C (1, 2)` ou `C 1 2` en Reason.
Par défaut, nous le convertirons en `C 1 2 [@implicit_arity]`, ce qui indique au compilateur qu'il peut s'agir à la fois de `C 1 2` ou `C (1, 2)`.

Pour empêcher`[@implicit_arity]` d'être généré, on peut fournir `--assume-explicit-arity`
à `refmt`. Ceci force le formateur à générer `C 1 2` au lieu de `C 1 2 [@implicit_arity]`.

Cependant, vu que `C 1 2` requiert plusieurs arguments, il pourrait faire échouer la compilation s'il s'agit en fait d'un constructeur avec un seul *tuple* en tant qu'argument (ex : `Some`).
Nous avons déjà quelques règles d'exception en interne pour gérer la plupart des constructeurs qui requièrent un seul *tuple* en tant qu'argument. De la sorte ils seront convertis correctement (ex : `Some (1, 2)` sera converti en `Some (1, 2)` au lieu de `Some 1 2`, qui ne compilera pas).

Pour fournir votre propre liste d'exceptions, créez un fichier qui contient tous les constructeurs (à la ligne, sans préfixe de module) de votre projet qui attendent un seul *tuple* comme argument, et utilisez `--heuristics-file <filename>` pour dire à `refmt` que tous les constructeurs listés dans le fichier doivent être traité en tant que constructeurs avec un seul *tuple* comme argument :

```sh
> cat heuristics.txt
  TupleConstructor
  And
  Or
```

```sh
> cat test.ml
```

```ocaml
type tm =
  TupleConstructor of (int * int)
| MultiArgumentsConstructor of int * int
let x = TupleConstructor(1, 2)
let y = MultiArgumentsConstructor(1, 2)
module Test = struct
  type a = | And of (int * int) | Or of (int * int)
end;;
let a = Test.And (1, 2)
let b = Test.Or (1, 2)
let c = Some (1, 2)
```

Ainsi, seuls les constructeurs qui ont été listés seront considéré comme acceptant des *tuples* à la place de plusieurs arguments.

```sh
> refmt --heuristics-file \
    ./heuristics.txt --assume-explicit-arity \
    --parse ml --print re test.ml
```


```reason
  type tm =
    | TupleConstructor of (int, int)
    | MultiArgumentsConstructor of int int;

let x = TupleConstructor (1, 2);
let y = MultiArgumentsConstructor 1 2;
module Test = {
  type a = | And of (int, int) | Or of (int, int);
};
let a = Test.And (1, 2);
let b = Test.Or (1, 2);
let c = Some (1, 2);
```
