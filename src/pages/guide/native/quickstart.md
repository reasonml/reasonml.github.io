---
title: Démarrage rapide
order: 0
---

```sh
# Sur MacOS, installez opam via Homebrew:
brew update
brew install opam
# Sur Linux, voir ici (vous aurez besoin d'opam >= 1.2.2): http://opam.ocaml.org/doc/Install.html
opam init
# **Note**: ajoutez la ligne ci-dessous à votre ~/.bashrc ou ~/.zshrc également; c'est un pré-requis lors de chaque démarrage du shell
eval $(opam config env)
opam update
opam switch 4.02.3
```

Ensuite clonez le repo de notre exemple [`ReasonNativeProject`](https://github.com/reasonml/ReasonNativeProject), et vous êtes prêt !
