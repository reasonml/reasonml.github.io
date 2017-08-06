---
title: Quoi & Pourquoi
order: 0
---

### Qu'est-ce que Reason ?

Reason n'est pas un nouveau langage. C'est une nouvelle syntaxe et chaine de compilation propulsée par le langage testé et approuvé qu'est [OCaml](https://ocaml.org). Reason donne à OCaml une syntaxe familière et orientée vers les développeurs JavaScript et s'adresse aux workflows NPM/Yarn déjà existants que connait la communauté.

À cet égard, Reason peut presque être considéré comme un cousin fortement typé de façon statique, plus rapide et plus simple de JavaScript. Les détails historiques en moins, mais les fonctionnalités d'ES2030 que vous pouvez utiliser aujourd'hui et l'accès à l'écosystème JavaScript et OCaml en plus !

Reason compile en JavaScript grâce au partenaire de notre projet [BuckleScript](https://bucklescript.github.io/bucklescript/Manual.html), qui compile OCaml/Reason en un JavaScript lisible avec une interopérabilité impéccable. Reason compile également en assembleur grâce à OCaml lui-même.

### Pourquoi Reason ?

> "Pourquoi m'embêter à apprendre un **tout** nouveau langage ?"

Ce n'est pas la raison d'être de Reason.

Le fait est que 80% de la sémantique d'OCaml (aka comment elle s'exécute) est déjà directement orientée vers le JavaScript moderne et vice versa \*. Si on a la possibilité de se permettre de laisser de côté quelques aspects de JavaScript et d'ajouter quelques bonnes choses, on peut réellement réaliser quelque chose qui compile un JavaScript assez lisible et utilise directement 80% de son écosystème et de ses outils. Ceci,  en plus d'être capable de compiler en assembleur, iOS, Android et même en [microcontrôleurs](http://www.algo-prog.info/ocapic/web/index.php?id=ocapic) !

Cependant, il n'est pas chose aisée que de savoir quelles fonctionnalités de JavaScript remodeler, afin de les intégrer dans le moule d'un langage avec des sémantiques rapides et fortement typé. Mais nous pouvons *travailler dans le sens inverse*, à partir d'un langage déjà fortement typé, avec la performance et la simplicité prises en compte, et lui faire subir quelques ajustements. Le tout pour qu'il ressemble et agisse un peu plus comme le meilleur aspect du langage Web qui nous est si familier.

Toutes ces décisions ont été prises de sorte à ce, pour les cas d'utilisation courante, la courbe d'apprentissage de Reason ne soit pas vraiment supérieure à celle de l'apprentissage de JavaScript + un système de typage progressif. En retour, vous obtenez :

- **Un système de typage solide comme le roc**. Les types OCaml possèdent une couverture de 100% (chaque ligne de code), l'inférence (les types peuvent être déduits et ne doivent pas forcément être écrits manuellement) et la sûreté (une fois que ça compile, les types sont garantis pour être précis).
- **Une attention à la simplicité et au pragmatisme**. Nous autorisons la mutation et l'objet par soucis de familiarité et d'interopérabilité, tout en conservant le reste du langage pur, immutable et fonctionnel.
- **Un focus sur la performance**. Le système de build de Reason, [`bsb`](http://bucklescript.github.io/bucklescript/Manual.html#_bucklescript_build_system_code_bsb_code), build en moins de 100ms (incrémental).
- **Apprentissage progressif & conversion de codebase**. Récupérez les avantages d'un fichier entièrement typé dès le premier jour. Si tout le reste échoue, [collez des extraits de JavaScript brut directement dans votre fichier Reason](/guide/javascript/interop).
- **Super écosystème & outillage**. Utilisez [votre éditeur préféré](/guide/editor-tools/editors-plugins), [votre package NPM favori](/guide/javascript/libraries), et n'importe laquelle de vos [stacks](https://webpack.js.org) [favorites](https://github.com/reasonml/reason-react) [existantes](https://github.com/reasonml-community/bs-jest).

\* Vous ne nous croyez pas ? Jetez un coup d'oeil à notre [cheatsheet JavaScript -> Reason](/guide/javascript/syntax-cheatsheet) ou essayez quelques extraits de Reason dans [l'éditeur](/try/) et observez le résutlat sur votre droite !

*Reason est un projet communautaire open source de Facebook.*
