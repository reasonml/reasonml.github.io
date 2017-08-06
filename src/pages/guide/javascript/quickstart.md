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

C'est tout ! Ceci compile Reason en JavaScrit dans le dossier `/lib/js/`.


- Lisez ceci pour en savoir plus sur la façon dont nous compilons en JavaScript grâce à notre partenaire sur ce projet, [BuckleScript](http://bucklescript.github.io/bucklescript/Manual.html).

- Sinon, **pour démarrer une application [ReasonReact](//reasonml.github.io/reason-react/gettingStarted.html) app**, essayez `bsb -init my-react-app -theme react`.

- Rendez-vous sur la partie [Configuration de l'éditeur](/guide/editor-tools/global-installation) pour obtenir le plugin Reason de votre éditeur préféré !
