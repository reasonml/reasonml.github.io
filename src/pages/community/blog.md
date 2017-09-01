---
title: Blog
order: 0
---

### De bien, bien, biiiieeeeen meilleurs messages d'erreur !

*25 août 2017*

Une image vaut mille mots.

Avant :
<div style="width:744px">
  <img alt="before" src="https://user-images.githubusercontent.com/1909539/29709302-ab0c6aee-8940-11e7-953f-60a867d242cb.png" />
</div>
Après:
<div style="width:742px">
  <img alt="before" src="https://user-images.githubusercontent.com/1909539/29709301-ab04eac6-8940-11e7-8d2b-c65f808b6be8.png" />
</div>

Parfois quand je suis occupé, un collègue random/membre de la communauté sur Discord me contacte et me dit "Yo Cheng Lou pourquoi les erreurs de Reason sont-elles aussi mauvaises ? Pourquoi ne pouvez-vous pas être plus comme [Elm](http://elm-lang.org), Cheng Lou ? Pourquoi ? Regardez à quel point les erreurs Elm sont super Cheng Lou, regardez."

En réalité, j'ai vraiment honte de nos messages d'erreur. Nous voici, un système de types avec deux décennies de recherche et d'implémentation solides, parfois présenté aux utilisateurs finaux comme s'il s'agissait de quelque chose qui gênerait leur progression.

C'est fini ! Nous vous avons clairement entendu, et vous livrons ici des messages d'erreur avec des améliorations de toute part. En voici quelques unes :

- Affichez la(les) ligne(s) de(s) l'erreur(erreurs), directement à l'intérieur du terminal.
- Meilleures couleurs, pour une recherche visuelle plus rapide.
- Des messages améliorés dans de nombreux cas.
- Erreurs dans la syntaxe Reason pour les fichiers Reason.
- Un peu plus de respiration entre les lignes.

Le dernier point est un compromis : les erreurs finissent par prendre plus d'espace. En voyant que vous vous concentrez habituellement sur une erreur unique plutôt que d'essayer d'avoir une vue d'ensemble de toutes les erreurs, nous avons jugé que ce compromis était intéressant, surtout dans le contexte d'une grande quantité de résultats de build. Considérons le nouveau format de warning :

<div style="width:745px">
  <img alt="warning-after" src="https://user-images.githubusercontent.com/1909539/29711739-431be094-894b-11e7-87a6-bc1d6aeea043.png" />
</div>

Voici le même warning, dans l'ancienne version, noyé au milieu d'autres ouputs :

<div style="width:745px">
  <img alt="warning-before" src="https://user-images.githubusercontent.com/1909539/29711789-810739f8-894b-11e7-8451-a919b3f119c6.png" />
</div>

À Messenger, nous avons vu des gens pousser des warnings en production, non pas parce qu'ils ne voulaient pas les fix, mais **parce qu'ils ne les avaient pas vu** ! Pourtant ce n'est pas sorcier . Laissez trainer un peu espace négatif ici et là. Colorez les choses de manière appropriée, et voilà !

**Les nouvelles erreurs peuvent être activées en ajoutant `"bsc-flags": ["-bs-super-errors"]` à votre bsconfig.json**, [comme ceci](https://github.com/reasonml-community/reason-react-example/blob/6dc15bf5fbeeb184c99acb063f7644a0d14b12f4/bsconfig.json#L3). Elles sont aussi disponibles pour [bsb-native](https://github.com/bsansouci/bsb-native). Fidèle à notre vision de la stack, elles sont rapides, simples à configurer et robustes.

**One more thing** : nous avons également intégré les pièges communs de [ReasonReact](https://reasonml.github.io/reason-react/) dans ces messages, lorsqu'ils sont applicables.

<div style="width:747px">
  <img alt="reason-react" src="https://user-images.githubusercontent.com/1909539/29712284-f1013bb2-894d-11e7-9596-1cca54d5c331.png" />
</div>

Ceci est juste la première de nombreuses itérations à venir ! Vous avez un message que vous souhaiteriez voir mieux expliqué ? Postez votre issue [ici](https://github.com/reasonml-community/error-message-improvement/issues) !

Enjoy =)

### Un bien meilleur Editeur

*18 Août 2017*

En nous basant sur les retours de la communauté, nous avons maintenant amélioré notre section [Editeur](/try). Les principales nouveautés :

- Conversion bidirectionnelle. Écrivez en Reason, obtenez la traduction OCaml, vice-versa.
- Évaluation en direct, avec feedback de la console dans la partie inférieure droite.
- La majorité de la [librairie standard](/api/index.html) est maintenant chargée. Comme nous évaluons sur le Web, cela inclut les [APIs supplémentaires stdlib](https://bucklescript.github.io/bucklescript/api/) de BuckleScript.
- Snippets de code partageable ! Copiez simplement l'URL.
- Quelques améliorations de performance.

Have fun!


### Nouveau site !

*14 Juillet 2017*

Vous remarquez quelque chose de différent ? =)

Le nouveau site de la documentation est construit par un membre de la communauté [Jared](https://jaredforsyth.com) (assurez-vous de jeter un coup d'oeil à ses articles sur Reason !). Le nouveau site conserve la majorité du contenu de l'ancien, tout en offrant une meilleure structure pour naviguer dans celui-ci. Vous remarquerez la présence d'un lien "Suggérer une modification" un peu partout. N'hésitez pas à faire un tour !

(Conçu avec [Gatsby](https://www.gatsbyjs.org))

### Nouvelle version de ReasonReact publiée

*12 Juin 2017*

Une release très excitante ! Pour faire simple : ReasonReact a maintenant son propre site de documentation [ici](https://reasonml.github.io/reason-react/). Il est acccompagné par la nouvelle version de [BuckleScript](https://www.npmjs.com/package/bs-platform) d'ailleurs. Les deux nouvelles versions sont rétrocompatibles.

Enjoy!

### Nettoyage de printemps (Premier Blog Post !)

*18 Mai 2017*

Maintenant que la communauté décolle, garder les gens à jour via [Discord](https://discord.gg/reasonml) ou les autres channels existants n'est plus la meilleure option. Voilà pourquoi nous inaugurons une section blog. Dans l'esprit de la communauté, ces messages resteront courts et concis.

Nous avons déplacé des projets de premier plan inutilisés de [GitHub/reasonml](https://github.com/reasonml/) vers [GitHub/reasonml-old](https://github.com/reasonml-old). Les anciennes URL sont redirigées, donc pas de soucis à ce niveau là.

Nous avons aussi nettoyé la code base de Reason. Les intégrations de l'éditeur ont été déplacées dans leurs repos dédiés. Les instructions mises à jour sont toujours [là](/guide/editor-tools/editors-plugins). D'autres opérations de nettoyage du repo de Reason sont en cours.

Certaines rooms dans Discord ont été fusionnées. Moins de rooms, des discussions plus ciblées. 

Comme vous pouvez le voir : ce site de documentation a également subit quelques réarrangements. En général, si vous souhaitez contribuer à la doc, contactez nous directement sur Discord !
