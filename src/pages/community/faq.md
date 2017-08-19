---
title: FAQ
order: 40
---
Foire Aux Questions
=======

#### Est-ce que je devrais apprendre Reason ou OCaml en premier ?
Aucune raison de choisir entre les deux ! Reason et OCaml partagent exactement la même sémantique (ex : comment le code s'exécute). Seule la syntaxe diffère. Gardez [Reason-tools](https://github.com/reasonml/reason-tools) à portée de main afin de pouvoir faire vos équivalences entre les deux syntaxes librement. Un tutoriel Reason est un tutoriel OCaml et vice-versa. Vous pouvez avoir ces alias dans votre terminal à toute fin utile :

```sh
# converti un code ocaml en code reason
alias mlre="pbpaste | refmt --parse ml --print re --interface false | pbcopy"
# converti un code reason en code ocaml
alias reml="pbpaste | refmt --parse re --print ml --interface false | pbcopy"
```

Ils vont prendre votre code à partir du presse-papiers (macOS), le convertir et le coller à nouveau dans votre presse-papiers ! Échangez pbpaste/pbcopy avec les fonctions de votre système de presse-papiers.

#### Je ne sais pas trop quoi faire avec Reason
[Nous compilons très bien en JavaScript](/guide/javascript). Pensez à quel projet vous feriez habituellement s'il s'agissait purement de JavaScript. Essayez juste de le porter/écrire en Reason + BuckleScript à la place ! Nous vous recommandons d'essayer de réaliser des projets concrets, avec des utilisateurs finaux (par exemple, un petit utilitaire de ligne de commande) plutôt que des projets au niveau d'infrastructures (par exemple, un générateur de boilerplate). Cette dernière catégorie nécessite une expertise et une compréhension idiomatique du code Reason assez poussées.

#### Quelle est la relation entre  Reason, BuckleScript et OCaml ?
Regardez [ici](/guide/javascript). Reason est une syntaxe pour OCaml et prend en charge toutes ses fonctionnalités. BuckleScript compile du code OCaml/Reason en JavaScript.

#### D'où viennent toutes ces fonctions `print_endline` et `string_of_int` ?
Elles proviennent de la librairie standard, pre-`open` lors de la compilation de votre fichier. C'est pourquoi vous les voyez dans le scope.

#### Puis-je avoir une fonction pour afficher des structures de données arbitraires ?
Si vous compilez en JavaScript via BuckleScript, vous pouvez utilisez le `console.log` JavaScript via [`Js.log`](https://bucklescript.github.io/bucklescript/api/Js.html#VALlog). Si vous compilez en natif, vous aurez besoin d'un outil comme [ppx_show](https://github.com/diml/ppx_show). Une future fonctionnalité d'Ocaml  (appelée *modular implicit*) réglera ce problème directement dans le langage.

#### Pourquoi est-ce qu'il y a un `+` pour aditionner des ints et un `+.` pour additionner des floats, etc ?
Voir [ici](/guide/language/integer-and-float#design-decisions).

#### Est-ce que la librairie ___ fonctionne en Reason ?
La plupart des librairies JavaScript devraient facilement fonctionner sous Reason + BuckleScript. Du côté natif, puisque Reason est juste une transformation de syntaxe : oui, elles fonctionnent aussi avec Reason. Mais le workflow natif est actuellement en cours d'élaboration et a besoin d'être peaufiné.

#### Qu'en est-il du rendu serveur ? Devrais-je compiler en natif ou JS et utiliser node.js ?
Nous compilons vers le natif, mais le workflow natif est actuellement en cours de développement. Pour le moment, nous recommandons de compiler en JavaScript via BuckleScript et d'utiliser les bindings disponibles sur [reasonml-community](https://github.com/reasonml-community) ou autre part.

#### Quel est ce fichier `.merlin` à la racine de mon projet ?
C'est le fichier metadata de [Merlin](/guide/editor-tools/extra-goodies/#merlin), le backend de l'éditeur d'intégration partagé pour l'autocomplétion, le seut vers définition, etc. Pour le [workflow JavaScript](/guide/javascript), le système de build de `bsb` génère le fichier `.merlin` pour vous. Vous n'avez pas besoin de vérifier cela dans votre contrôle de version et ne devez pas le modifier manuellement.


#### Je ne vois aucun `import` ou `require` dans mon fichier. Comment fonctionne la résolution de module ?
Reason/OCaml n'a pas besoin que vous écriviez d'import. Les modules référencés dans le fichier sont automatiquement recherchés dans le projet. Plus précisement, un module `Hello` demande au compilateur de chercher un fichier `hello.re` ou `hello.ml` (et leur [fichier d'interface](/guide/language/module/#signatures) correspondant, `hello.rei` or `hello.mli`, s'il est disponible).

Un nom de module est le nom du fichier avec la première lettre en majuscule. Il doit être unique par projet. Cela met de côté le système de fichiers et vous permet de déplacer des fichiers sans modifier votre code.

#### BuckleScript : existe-t-il un moyen générique de transformer un record en un objet JavaScript ?
Pas actuellement. Vous devriez faire la traduction manuellement. Sinon, essayez [d'utiliser directement les objets JavaScript](http://bucklescript.github.io/bucklescript/Manual.html#_create_js_objects_using_bs_obj).

De manière générale, nous recommandons de se bind à la librairie JavaScript plutôt que de le faire de façon grossière et idiomatique. Mieux vaut rester léger et intercepter des erreurs de conversion. 

Voir aussi notre [guide d'interopérabilité JavaScript](/guide/javascript/interop/).

#### Bsb : existe-t-il un moyen de configurer le répertoire de sortie ?
Pas actuellement. Nous gardons la configuration minimale. Nous implémenterons peut-être ceci plus tard en fonction des demandes de la communauté.

#### Le compilateur me dit qu'il n'arrive pas à trouver le module.
Êtes-vous entrain d'utiliser un module tiers ? Si vous êtes entrain de compiler en JavaScript, avez-vous ajouté une dépendance au champ `bs-dependencies` de votre [`bsconfig.json`](http://bucklescript.github.io/bucklescript/Manual.html#_get_started) ? Aussi, avez-vous exécutez `bsb -make-world` ? `bsb` par défaut ne crée le projet racine que pour lui-même, pour des questions de performance.

De plus, n'oubliez pas d'ajouter les dossiers source dans votre `bsconfig.json` ! Par soucis de performance, `bsb` ne crée pas automatiquement et de façon récursive des dossiers imbriqués.

#### Est-ce que `Some | None`, `contents`, `Array`, `List` ont quelque chose de particulier ? D'où vient-ils ?
Ce sont des variantes/records/définitions de modules ordinaires qui viennent avec la [librairie standard](http://caml.inria.fr/pub/docs/manual-ocaml/libref/), `open` par défaut lors de la compilation par soucis de commodité.

#### Que signifie un argument précédé d'un underscore (ex : `_` ou `_foo`) ?
Disons que vous avez : `List.map (fun item => 1) myList`. L'arguemnt `item` n'est pas utilisé et va généré un avertissement au niveau du compilateur. Utilisé `fun _ => 1`, indique au contraire que vous recevez et ignorez délibérément un argument, contournant ainsi l'avertissement. Vous pouvez aussi utiliser `fun _item => 1` qui a le même effet, mais indique de façon plus descriptive ce que vous ignorez.

#### Qu'est-ce que ce `MyModule.t` que je vois partout ?
Si on suppose que `MyModule` est le nom d'un module, `t` est une convention de la communauté qui indique "le type qui représente ce module, quoi qu'il soit". Par exemple : pour le module [`Js.String`](http://bucklescript.github.io/bucklescript/api/Js.String.html), [`String.t`](http://bucklescript.github.io/bucklescript/api/Js.String.html#TYPEt) est le type qui l'accompagne et représente ce qu'est "une string".

#### Pourquoi il y a-t-il un [`Js_promise`](http://bucklescript.github.io/bucklescript/api/Js_promise.html) et ensuite un [`Js.Promise`](http://bucklescript.github.io/bucklescript/api/Js.Promise.html) ? Et qu'en est-il de [`Js_array`](http://bucklescript.github.io/bucklescript/api/Js_array.html), [`Js_string`](http://bucklescript.github.io/bucklescript/api/Js_string.html) et tout le reste ?
Par convention, `Js_foo` représente le module en lui-même, et `Js.Foo` est juste un alias. Ils sont [equivalents](https://github.com/bloomberg/bucklescript/blob/7bc37f387a726ba1ae4afeefe02b9c82577d9e10/jscomp/runtime/js.ml#L124-L138). Utilisez plutôt `Js.Foo`, car il s'agit du nom publique et officiel du module.

#### Quand les implicites modulaires, le multicore et les effet algébriques seront-ils prêts?
Ils le seront un jour. En attendant, aidez-nous à livrer plus de code Reason ! La popularité aidera à renforcer les contributions d'OCaml. Moins les gens d'OCaml doivent s'inquiéter des fruits à faible adhérence, plus ils peuvent se concentrer sur de grandes recherches et l'exécution !

#### Pourquoi BuckleScript et bsb sont aussi rapides ? Comment puis-je les ralentir ?
BuckleScript est optimisé pour être performant sur l'ensemble de la stack. Vous pouvez essayer de le ralentir en ajoutant une douzaine de couches d'indirections et de métaprogrammes. Essayez :

- D'ajouter quelques boucles infinies par-ci par-là.
- De caser un outil de compilation JavaScript dans le pipeline.
- De rajouter encore plus de dépendances juste pour écrire un "hello world".
