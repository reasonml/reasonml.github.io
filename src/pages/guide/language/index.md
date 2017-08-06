---
title: Principes de base du langage
order: 20
---

# Qu'est-ce que Reason

Raison est un projet ombrelle qui fournit une surcouche organisée pour [OCaml](http://ocaml.org). Il propose :


- Une nouvelle syntaxe familière pour le langage testé et approuvé qu'est OCaml.
- Un workflow pour compiler en JavaScript ou en code natif.
- Un ensemble de documentations, de librairies et d'utilitaires sympa.

# Pourquoi Reason

#### Aucun soucis

Reason s'appuie sur l'architecture et le système de typage d'OCaml pour fournir un retour d'informations immédiat sous la forme d'erreurs au moment de la compilation et de d'anti-patterns qui sont évités.

#### Surcharge faible

Reason garde les choses simples et efficaces. Grâce à cela, intégrer Reason dans votre projet [JavaScript](/guide/javascript) ou [OCaml](/guide/native) existant est assez simple. Faîtes plus avec moins; Allégez votre futur fardeau !

#### Performant & prévisible

Laissez le compilateur et le système de typage vous pousser à écrire un code qui est rapide et facile à appréhender.


Comment fonctionne Reason
=========================

Le compilateur OCaml est organisé en plusieurs niveaux, qui sont exposés en tant que librairies. Reason remplace une partie de la chaîne d'outils du compilateur par un analyseur de syntaxe complètement nouveau qui est plus accessible, tout en étant toujours compatible avec le reste du compilateur. Reason implémente également un nouveau *source printer* qui s'intègre dans votre IDE et la nouvelle [`REPL`](/guide/editor-tools/extra-goodies/#repl) custom.

###### Pourquoi OCaml ?

OCaml est un excellent langage pour écrire un code hautement expressif, fonctionnel *ou* impératif, avec une inférence de types et un runtime rapide et performant. En raison de ces propriétés, OCaml a aidé Facebook à créer rapidement des infrastructures évolutives telles que [Hack](http://hacklang.org/), [Flow](http://flowtype.org/) et
[Infer](http://fbinfer.com/). Il est également utilisé pour d'autres applications sensibles aux performances dans l'industrie financière (Jane Street, Bloomberg).

L'approche non-invasive de Reason envers le compilateur OCaml permet au code Reason de profiter de toutes les optimisations/backends existants du compilateur OCaml tel que la compilation ARM, x86 et même JavaScript. OCaml dispose d'un écosystème très mature (*et toujours croissant*) pour cibler les environnements navigateurs et JavaScript en mettant l'accent sur l'interopérabilité des langages et l'intégration avec le code JavaScript existant.
