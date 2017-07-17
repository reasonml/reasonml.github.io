---
title: FAQ
order: 9
---
Foire Aux Questions
=======

#### Est-ce que je devrais apprendre Reason ou OCaml en premier ?
Aucune raison de choisir entre les deux ! Reason et OCaml partagent exactement la même sémantique (ex : comment le code s'exécute). Seule la syntaxe diffère. Gardez [Reason-tools](https://github.com/reasonml/reason-tools) à portée de main afin de pouvoir faire vos équivalences entre les deux syntaxes librement. Un tutoriel Reason est un tutoriel OCaml et vice-versa.

#### Je ne sais pas trop quoi faire avec Reason
[Nous compilons très bien vers JavaScript](./gettingStarted.html#javascript-workflow). Pensez à quel projet vous feriez habituellement s'il s'agissait purement de JavaScript. Essayez juste de le porter/écrire en Reason + BuckleScript à la place ! Nous vous recommandons d'essayer de réaliser des projets concrets, avec des utilisateurs finaux (par exemple, un petit utilitaire de ligne de commande) plutôt que des projets au niveau d'infrastructures (par exemple, un générateur de boilerplate). Cette dernière catégorie nécessite une expertise et une compréhension idiomatique du code Reason assez poussées.

#### Quelle est la relation entre  Reason, BuckleScript et OCaml ?
Regardez [ici](./gettingStarted.html#javascript-workflow). Reason est une syntaxe pour OCaml et prend en charge toutes ses fonctionnalités. BuckleScript compile du code OCaml/Reason en JavaScript.

#### Où est-ce que je peux trouver une documentation pour stdlib (standard library) ?
Reason utilise tout ce qu'utilise OCaml. Pour BuckleScript (workflow JS), ce serait ici :  http://bucklescript.github.io/bucklescript/api. Pour le natif, ce serait là : http://caml.inria.fr/pub/docs/manual-ocaml/libref/index.html.

#### D'où viennent toutes ces fonctions `print_endline` et `string_of_int` ?
Elles proviennent de la librairie standard, pre-`open` lors de la compilation de votre fichier. C'est pourquoi vous les voyez dans le scope.


#### Qu'en est-il du rendu serveur ? Devrais-je compiler en natif ou JS et utiliser node.js ?
Nous compilons vers le natif, mais le workflow natif est actuellement en cours de développement. Pour le moment, nous recommandons de compiler en JS via BuckleScript et d'utiliser les bindings disponibles sur [BuckleTypes](https://github.com/buckletypes) ou autre part.

#### Quel est ce fichier `.merlin` à la racine du projet ?
C'est le fichier metadata de [Merlin](./tools.html#tools-command-line-utilities-merlin), le backend de l'éditeur d'intégration partagé pour l'autocomplétion, le "saut vers la définition", etc. Pour le [Workflow JavaScript](./gettingStarted.html#javascript-workflow), le système de build de `bsb` génère le fichier `.merlin` pour vous. Vous n'avez pas besoin de vérifier cela dans votre contrôle de version et ne devez pas le modifier manuellement.


#### Je ne vois aucun `import` ou `require` dans mon fichier. Comment fonction la résultion de module ?
Reason/OCaml n'a pas besoin que vous écriviez d'import. Les modules référencés dans le fichier sont automatiquement recherchés dans le projet. Plus précisement, un module `Hello` demande au compilateur de chercher un fichier `hello.re` ou `hello.ml` (et leur [fichier d'interface](./modules.html#modules-signatures) correspondant, `hello.rei` or `hello.mli`, s'il est disponible).

Un nom de module est le nom du fichier, en majuscule. Il doit être unique par projet. Cela met de côté le système de fichiers et vous permet de déplacer des fichiers sans modifier votre code.

#### BuckleScript : Existe-t-il un moyen générique de transformer un record en un objet JS ?
Pas actuellement. Vous devriez faire la traduction manuellement. Sinon, essayez [d'utiliser directement les objets JS](http://bucklescript.github.io/bucklescript/Manual.html#_create_js_objects_using_bs_obj).

D'une manière générale, nous recommandons de se bind à la bibliothèque JS plutôt que de le faire de façon grossière et idiomatique. Mieux vaut rester léger et intercepter des erreurs de conversion. 

Voir aussi notre [guide d'interopérabilité JS](./gettingStarted.html#javascript-workflow-talk-to-existing-js-libraries).

#### Bsb : Existe-t-il un moyen de configurer le répertoire de sortie ?
Pas actuellement. Nous aimerions que la configuration reste minimale.

#### Le compilateur me dit qu'il n'arrive pas à trouver le module.
Êtes-vous entrain d'utiliser un module tiers ? Si vous êtes entrain de compiler en JS, avez-vous ajouté une dépendance au champ `bs-dependencies` de votre [`bsconfig.json`](http://bucklescript.github.io/bucklescript/Manual.html#_get_started) ? Aussi, avez-vous exécutez `bsb -make-world` ? `bsb` par défaut ne crée le projet racine que pour lui-même, pour des questions de performance.

De plus, n'oubliez pas d'ajouter les dossiers source dans votre `bsconfig.json` ! Par soucis de performance, `bsb` ne crée pas automatiquement et de façon récursive des dossiers imbriqués.

#### Est-ce que `Some | None`, `contents`, `Array`, `List` ont quelque chose de particulier ? D'où vient-ils ?
Ce sont des variantes/records/défintions de modules ordinaires qui viennent avec la [librairie standard](http://caml.inria.fr/pub/docs/manual-ocaml/libref/), `open` par défaut lors de la compilation par commodité.

#### Que signifie un argument précédé d'un underscore (ex : `_` ou `_foo`) ?
Disons que vous avez : `List.map (fun item => 1) myList`. L'arguemnt `item` n'est pas utilisé et va généré un avertissement au niveau du compilateur. Utilisé `fun _ => 1`, indique au contraire que vous recevez et ignorez délibérément un argument, contournant ainsi l'avertissement. Vous pouvez aussi utiliser `fun _item => 1` qui a le même effet, mais indique de façon plus descriptive ce que vous ignorez.

#### Qu'est-ce que ce `MyModule.t` que je vois partout ?
Si on suppose que `MyModule` est le nom d'un module, `t` est une convention de la communauté qui indique "le type qui représente ce module, quoi qu'il en soit". Par exemple : pour le module [`Js.String`](http://bucklescript.github.io/bucklescript/api/Js.String.html), [`String.t`](http://bucklescript.github.io/bucklescript/api/Js.String.html#TYPEt) est le type qui l'accompagne et représente ce qu'est "une string".

#### Pourquoi il y a-t-il un [`Js_promise`](http://bucklescript.github.io/bucklescript/api/Js_promise.html) et ensuite un [`Js.Promise`](http://bucklescript.github.io/bucklescript/api/Js.Promise.html) ? Et qu'en est-il de [`Js_array`](http://bucklescript.github.io/bucklescript/api/Js_array.html), [`Js_string`](http://bucklescript.github.io/bucklescript/api/Js_string.html) et tout le reste ?
Par convention, `Js_foo` représente le module en lui-même, et `Js.Foo` est juste un alias. Ils sont [equivalents](https://github.com/bloomberg/bucklescript/blob/7bc37f387a726ba1ae4afeefe02b9c82577d9e10/jscomp/runtime/js.ml#L124-L138). Utilisez plutôt `Js.Foo`, car il s'agit du nom publique et officiel du module.

#### Pourquoi BuckleScript et  bsb sont aussi rapide ? 
BuckleScript est optimisé pour être performant sur l'ensemble de la stack. Vous pouvez essayer de le ralentir en ajoutant une douzaine de couches d'indirections et de métaprogrammes. Essayez :

- D'ajouter quelques boucles infinies par-ci par-là.
- De caser un outil de compilation JavaScript dans le pipeline.
- De rajouter encore plus de dépendances juste pour écrire un "hello world".
