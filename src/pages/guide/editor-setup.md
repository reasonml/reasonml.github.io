---
title: "Configuration de l'éditeur"
order: 1
---

Consultez notre section [Outils](./tools) pour avoir le détail de ce que vous avez besoin d'installer et des éditeurs que nous supportons.
Notre [integration éditeur](./tools#editor-integration) nécessite que vous ayez quelques binaires dans votre `$PATH`:
- `refmt`: le parser/printer de Reason (formateur de l'éditeur).
- `ocamlmerlin-reason`: bridge Reason vers [Merlin](./tools#tools-command-line-utilities-merlin).
- `ocamlmerlin`: le binaire de Merlin.
La section Outils explique ce que font ces binaires.
**Installez reason-cli en global** avec npm:
```sh
## sur Linux:
npm install -g https://github.com/reasonml/reason-cli/archive/beta-v-1.13.6-bin-linux.tar.gz
## sur MacOS:
npm install -g https://github.com/reasonml/reason-cli/archive/beta-v-1.13.6-bin-darwin.tar.gz
## testez que que tout s'est installé correctement 
which ocamlmerlin refmt ocamlmerlin-reason
```
**Note**: la chaine de compilation globale `reason-cli` ne fonctionne pas sur Windows pour le moment.
**Note**: vérifiez s'il-vous-plaît qu'OCaml `4.02.x` et Merlin `>=2.5.1` sont les versions que vous avez d'installé. L'installation ci-dessus le fait automatiquement, mais les gens installent parfois notre chaîne de compilation d'une autre façon (ex: via le workflow natif, avec des contraintes de version plus faibles).

```sh
ocamlc -version
ocamlmerlin -version
```
