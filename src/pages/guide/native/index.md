---
title: Natif
order: 40
---

Nous utilisons actuellement le workflow OCaml par défaut pour compiler en natif, bien qu'il y ait [des projets en cours](https://github.com/bsansouci/bsb-native) pour ajouter le support de la compilation vers le natif au builder de BuckleScript.

> **Note**: certaines parties du workflow natif ne fonctionnent probablement pas sous Windows. Le workflow natif est actuellement en **work in progress**, car nous nous concentrons sur le peaufinage du workflow JS. Les contributions sont les bienvenues !

Reason s'intègre bien aux chaines de compilation existantes comme `ocamlbuild`, et propose un outil nommé `rebuild`, un léger wrapper autour d'[`ocamlbuild`](https://ocaml.org/learn/tutorials/ocamlbuild/) qui garantit que les bons *flags* sont transmis au compilateur pour tout fichier se terminant par `.re`.

Pour la compilation native, nous utilisons [OPAM](https://opam.ocaml.org).

