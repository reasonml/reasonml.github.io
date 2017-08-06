---
title: Goodies supplémentaires
order: 30
---

### Extension navigateur : Reason-tools

[Reason-tools](https://github.com/reasonml/reason-tools) vous permet de basculer rapidement entre la syntaxe OCaml et la syntaxe Reason lorsque vous parcourez des tutoriels et des documentations écrites n'importe laquelle de ces deux syntaxes.

### BuckleScript

Vous verrez [BuckleScript](http://bucklescript.github.io/bucklescript/Manual.html) en profondeur dans le reste de cette documentation, car c'est le moteur qui anime notre compilation JavaScript. Ses binaires globaux sont installés via `npm install -g bs-platform`.

### Autres outils

L'installation globale que vous avez effectué dans [la section précédente](/guide/editor-tools/global-installation) contient quelques outils supplémentaires assez utiles, décrits ici.

#### Refmt

`refmt` ("Reason format") est le binaire qui gère la fonctionnalité de formatage automatique de nos éditeurs. Il prend en entrée votre code et le renvoie, bien formaté. Il sert également à convertir en/depuis la syntaxe Reason/OCaml. La communauté Reason l'utilise pour atteindre un style de code cohérent dans différents projets et pour éviter un formatage manuel et des débats stylistiques fastidieux. Le voici utilisé à l'intérieur de Vim :

<img width="466" height="433" src="https://user-images.githubusercontent.com/1909539/28570942-3bd962a2-70f5-11e7-8934-1b7f249d7814.gif" style="max-width:466px; max-height:433px;" />

Il formate le code de façon **responsive** en fonction de la largeur de l'éditeur. En d'autres termes, il ne se limite pas à un simple renvoi à la ligne après une certaine limite de caractères. Il résout les contraintes de mise en page et arrange votre code en conséquence.

`refmt` peut être utilisé directement depuis le terminal. Par exemple, pour formater votre code hors de l'éditeur, faites `refmt --in-place myFile.re`. **Voir `refmt --help` pour toutes les options**.

#### Merlin

[Merlin](https://github.com/ocaml/merlin) est le moteur sous-jacent des systèmes de type hinting, de refactoring, de gestion des erreurs en temps réel, du saut vers définition, etc, de nos éditeurs. Son outil de ligne de commande s'appelle `ocamlmerlin`, bien que vous ne l'utilisiez pas manuellement (les éditeurs le démarrent eux-mêmes et le demandent).

Pour configurer Merlin pour comprendre votre projet, vous écririez un fichier `.merlin` à la racine (documentation [ici](https://github.com/ocaml/merlin/wiki/project-configuration)). **Pour le workflow JavaScript, cette configuration est générée automatiquement pour vous par `bsb` de BuckleScript.**

#### REPL

Reason est fourni avec une boucle d'évaluation (REPL) nommée `rtop`, qui une fois invoquée, vous permet d'évaluer le code de manière interactive. Elle propose une auto-complétion intelligente et basée sur les types.

<img src="https://user-images.githubusercontent.com/1909539/28570943-3bd9eb00-70f5-11e7-981c-4846719c0943.gif" style="width:100%; max-width:466px; max-height:433px;">

Utilisez `#quit;` pour fermer votre session REPL.

**Vous noterez que `rtop` ne fonctionne pas facilement avec les packages et les `external`s** actuellement. Nous vous recommandons d'évaluer le code dans notre [Éditeur](/try).

#### ocamlc, ocamlopt, ocamlrun, rebuild

`ocamlc` et `ocamlopt` sont les compilateurs de base d'OCaml.
