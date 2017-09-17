---
title: Installation globale
order: 10
---

**Avant de configurer les plugins de l'éditeur**, vous devez installer les outils globaux dont ils ont besoin.

### (Recommandé) Via NPM/Yarn

| Platforme  | Commande d'installation
|-----------|-------------------------------------------------------------------------------------------------
| **OSX**   | `npm install -g https://github.com/reasonml/reason-cli/archive/beta-v-1.13.7-bin-darwin.tar.gz`
| **Linux** | `npm install -g https://github.com/reasonml/reason-cli/archive/beta-v-1.13.7-bin-linux.tar.gz`

**`reason-cli` ne fonctionne pas actuellement sous Windows**, mais ce n'est pas une exigence pour l'utilisation de Reason. Vous disposez toujours de super messages de diagnostic du CLI du build système via BuckleScript, dont le paquet global NPM  [`bs-platform`](https://www.npmjs.com/package/bs-platform) qui lui fonctionne aussi sur Windows par contre.

### (Alternative) Via OPAM

[OPAM](https://opam.ocaml.org) est le package manager natif d'OCaml. Si vous venez d'OCaml et que vous ne disposez pas de NPM/Yarn, vous pouvez éventuellement l'installer de cette façon, mais attention !

**Assurez-vous d'être sur OCaml `4.02.3`**.

```
opam update
opam install reason.1.13.7
opam install merlin.2.5.4
```

### Dépannage

Si votre éditeur ne se comporte pas comme prévu avec l'installation ci-dessus, procédez comme suit :

```
which ocamlmerlin refmt ocamlmerlin-reason
```

Il devrait renvoyer trois chemins qui contiennent le mot `reason-cli`. Note : durant l'installation `npm/yarn`, les paths `node_modules/reason-cli` peuvent être symlink à `/usr/local/bin` (ce sera affiché ultérieurement si c'est le cas).

```
ocamlmerlin -version
```

Il devrait dire "The Merlin toolkit version 2.5.x, for Ocaml 4.02.3". Non pas OCaml 4.03, ni 4.04, etc.

