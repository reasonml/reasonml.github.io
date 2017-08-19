---
title: Plugins éditeurs
order: 20
---

**Assurez-vous d'avoir installé `reason-cli` de la section précédente**.

La nature de Reason se prête à un excellent support éditeur. La plupart de nos plugins éditeurs fournissent au minimum :

- Affichage de types.
- Mise en forme de code programmatique via `refmt`.
- Affichage d'erreurs & de warnings.
- Coloration syntaxique.
- Autocomplétion sur la base de types.
- Saut vers définition.

Et d'autres fonctionnalités. Regardez, par exemple, la [section fonctionnalité](https://github.com/reasonml-editor/vscode-reasonml#features)  de notre plugin VSCode !

### Éditeurs supportés officiellement

- [VSCode](https://github.com/reasonml-editor/vscode-reasonml): **recommandé**.
- [Atom](https://github.com/314eter/atom-ocaml-merlin)
  - Installez les paquets associés avec `apm install language-reason linter linter-refmt reason-refmt`.
  - Si vous utilisez [Nuclide](https://nuclide.io/), le support de Reason est fourni par défaut.
  - Fidèle à l'esprit de JavaScript, [voici encore un autre plugin Reason pour Atom](https://github.com/zaaack/atom-ide-reason) ! En fait, celui-ci pourrait potentiellement être le plugin Reason recommandé pour Atom.
- [Vim](https://github.com/reasonml-editor/vim-reason)
- [Emacs](https://github.com/reasonml-editor/reason-mode)
- [Sublime Text](https://github.com/reasonml-editor/sublime-reason) : expérimental. Ne supporte pas encore les fonctionnalités liées aux types.
- [IDEA](https://github.com/reasonml-editor/reasonml-idea-plugin)

La communauté GitHub [reasonml-editor](https://github.com/reasonml-editor/) héberge la plupart de ces plugins. Si vous souhaitez y ajouter le plugin de votre éditeur préféré, envoyez-nous une [pull request](https://github.com/reasonml/reasonml.github.io) !
