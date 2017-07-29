---
title: Démarrage rapide
order: 0
---

```sh
npm install -g bs-platform
bsb -init my-first-app -theme basic-reason
```

Ensuite lancez votre projet comme d'habitude :

```sh
cd my-first-app
npm run build
```

Vous pouvez aussi build en mode watch:
```sh
rpm run watch
```

Ce qui va compiler Reason en JavaScrit dans le dossier `/lib/js/`.

Sinon **pour lancer une application [ReasonReact](https://reasonml.github.io/reason-react/gettingStarted.html)**, essayez `bsb -init my-react-app -theme react`.
Plus d'informations sur bsb & bsconfig [ici](http://bucklescript.github.io/bucklescript/Manual.html#_bucklescript_build_system_code_bsb_code).
**BuckleScript dispose d'un support de première classe pour Reason**, c'est pourquoi vous ne voyez pas d'étapes supplémentaires pour l'installation de "reason".
