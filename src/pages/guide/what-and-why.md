---
title: Quoi & Pourquoi
order: 0
---

### Qu'est-ce que Reason ?

Reason n'est pas un nouveau langage. C'est une nouvelle syntaxe et chaine de compilation propulsée par le langage testé et approuvé qu'est [OCaml](http://ocaml.org). Reason donne à OCaml une syntaxe familière et orientée vers les développeurs JavaScript et s'adresse aux workflows NPM/Yarn déjà existants que connait la communauté.

À cet égard, Reason peut presque être considéré comme un cousin fortement typé statiquement, plus rapide et plus simple de JavaScript. Les accrocs historiques en moins, mais les fonctionnalités d'ES2030 que vous pouvez utiliser dès aujourd'hui et l'accès à l'écosystème JavaScript et OCaml en plus !

Reason compile en JavaScript grâce au partenaire de notre projet [BuckleScript](https://bucklescript.github.io/bucklescript/Manual.html), qui compile OCaml/Reason en un JavaScript lisible avec une interopérabilité impéccable. Reason compile également en assembleur grâce à OCaml lui-même.

### Pourquoi Reason ?

> "Pourquoi m'embêter à apprendre **tout** un nouveau langage ?"

Ce n'est pas la raison d'être de Reason.

Le fait est que 80% de la sémantique d'OCaml (aka comment il s'exécute) est déjà directement orientée vers le JavaScript moderne et vice versa\*. Si on a la possibilité de se permettre de laisser de côté quelques aspects de JavaScript et d'ajouter quelques bonnes choses, on peut réellement réaliser quelque chose qui compile un JavaScript assez lisible et utilise directement 80% de son écosystème et de ses outils. Ceci,  en plus d'être capable de compiler en assembleur, iOS, Android et même en [microcontrôleurs](http://www.algo-prog.info/ocapic/web/index.php?id=ocapic) !

Cependant, il n'est pas chose aisée que de savoir quelles fonctionnalités de JavaScript remodeler, afin de les intégrer dans le moule d'un langage avec des sémantiques rapides et 100% "sound" typé. Mais nous pouvons *travailler dans le sens inverse*, à partir d'un langage déjà "sound", avec la performance et la simplicité prises en compte, et lui faire subir quelques ajustements. Le tout pour qu'il ressemble et agisse un peu plus comme le meilleur aspect du langage Web qui nous est si familier.

Toutes ces décisions ont été prises de sorte à ce que, pour les cas d'utilisation courants, la courbe d'apprentissage de Reason ne soit pas vraiment supérieure à celle de l'apprentissage de JavaScript + un système de types progressif. En retour, vous obtenez :

- **Un système de types solide comme le roc**. Les types OCaml possèdent une couverture de 100% (chaque ligne de code), l'inférence (les types peuvent être déduits et ne doivent pas forcément être écrits manuellement) et la sûreté (une fois que ça compile, les types sont garantis pour être précis).
- **Une attention à la simplicité et au pragmatisme**. Nous autorisons la mutation et l'objet par soucis de familiarité et d'interopérabilité, tout en conservant le reste du langage pur, immutable et fonctionnel.
- **Un focus sur la taille & la performance**. Le système de build de Reason, [`bsb`](http://bucklescript.github.io/bucklescript/Manual.html#_bucklescript_build_system_code_bsb_code), build en moins de 100ms (incrémental). Notre résultat en sortie est aussi [assez léger](https://twitter.com/bobzhang1988/status/827562467148623875).
- **Apprentissage progressif & conversion de codebase**. Récupérez les avantages d'un fichier entièrement typé dès le premier jour. Si tout le reste échoue, [collez des extraits de JavaScript brut directement dans votre fichier Reason](/guide/javascript/interop).
- **Super écosystème & outillage**. Utilisez [votre éditeur préféré](/guide/editor-tools/editors-plugins), [votre package NPM favori](/guide/javascript/libraries), et n'importe laquelle de vos [stacks](https://webpack.js.org) [favorites](https://github.com/reasonml/reason-react) [existantes](https://github.com/reasonml-community/bs-jest).

\* Vous ne nous croyez pas ? Jetez un coup d'oeil à notre [cheatsheet JavaScript -> Reason](/guide/javascript/syntax-cheatsheet) ou essayez quelques extraits de Reason dans [l'éditeur](/try) et observez le résultat sur votre droite !


### Pourquoi avoir choisit OCaml comme langage support ? Pourquoi pas [insérez votre langage favori ici] ?

Tout d'abord, comprenez que peu importe le langage que nous choisissons, nous recevrons cette question de la plupart d'entre vous =) !

De nombreux langages supports satisfont les points de la section précédente. Les points ci-dessous, cependant, ont été des contrevenants dans nos considérations.

- **La capacité à rendre du code natif**. Le startup time d'OCaml natif (assembleur) se calcule **en millisecondes à un seul chiffre**. Nous avons de grands projets pour l'utilisation de Reason en natif un jour. Pendant ce temps, nous nous concentrons sur l'adoption grâce à une excellente compatibilité JavaScript.
- **Effets secondaires, mutation et autres portes de secours**. Ce ne sont généralement pas les principaux arguments de vente d'un langage. Mais être capable de se rapprocher d'une partie d'une codebase sans une interop/re-écriture élaborée est crucial pour nous à Facebook. OCaml produit par défaut un code fonctionnel et immutable, mais ces portes de secours rendent l'adoption initiale parfois possible très simplement.
- **Le peaufinage de l'implémentation compte**. OCaml a été raffiné sur deux décennies et s'améliore chaque année. Si nous proposons une nouvelle syntaxe et une nouvelle chaîne d'outils, nous souhaiterions qu'il ne dispose pas de sémantiques et de type "gotchas" et/ou de retours décroissants, 80% sur l'écriture d'une codebase.
- **Le langage pour écrire React**. Le [créateur](https://twitter.com/jordwalke) de Reason est aussi celui de [ReactJS](https://facebook.github.io/react/), dont les premiers prototypes ont été écrits en SML, un cousin éloigné d'OCaml. Nous avons transcrit ReactML dans ReactJS pour une large adoption. Quelques années plus tard, nous sommes en train d'itérer sur l'avenir de ReactJS grâce à [ReasonReact](https://reasonml.github.io/reason-react/).
- **Un communauté sympa et en pleine croissance**. Je veux dire, nous sommes vraiment sympa. Je suis Canadien. Nous avons des membres partout dans le monde. Si tout échoue, demandez de l'aide dans le channel Discord et [au moins quelques-uns de nos membres dans votre fuseau horaire répondront](https://twitter.com/ken_wheeler/status/894298052705615872).

J'espère que cela pourra aider ! Vous voulez en savoir plus ? Démarrez une conversation avec n'importe lequel d'entre nous dans la [communité](/community/) !


*Reason est un projet communautaire open source de Facebook.*
