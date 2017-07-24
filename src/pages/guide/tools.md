---
title: Outils
order: 4
---

Reason-tools
-------

[Reason-tools](https://github.com/reasonml/reason-tools) est une extension navigateur assez pratique pour basculer rapidement entre la syntaxe OCaml et la syntaxe Reason. Il sert également à nettoyer le code des pages de documentation des librairies OCaml.
Vous avez la version autonome [ici](https://reasonml.github.io/reason-tools/popup.html).

Utilitaires de ligne de commande
-------

La chaine de compilation de Reason utilise quelques outils importants qui sont utilisés dans le terminal et/ou avec votre éditeur.

**Note**: les workflows [JavaScript](./javascript)
et [natif](./native) ont différentes façons d'installer ces outils. Consultez leurs sections respectives afin d'avoir la démarche d'installation en elle-même. Cette section ne décrit que ce qu'ils sont.

### Refmt

`refmt` ("Reason format") prend le texte de votre code et le retourne bien formaté. Les développeurs l'utilisent de façon intensive pour nettoyer leur code, soit en l'exécutant depuis le terminal, soit par un raccourci éditeur. Il sert également à convertir depuis/vers la syntaxe Reason/OCaml.

`refmt` prend éventuellement en paramètre une largeur de colonne, et formate votre code de façon **responsive** en se basant dessus. En d'autres termes, il ne se limite pas à passer à la ligne suivante dès qu'il atteint une certaine limite de caractères. Il prend en considération les contraintes et organise votre code en conséquence. Voici `refmt` à l'intérieur de Vim, appelé une fois par fenêtre redimensionnée (juste pour l'exemple):

<img src="images/LiquidSmallOptCrop.gif" style="width:100%; max-width:466px; max-height:433px;" />

La communauté Reason l'utilise pour faire respecter un style cohérent et éviter les formations manuelles chronophages et autres débats stylistiques.

Exécutez `refmt --help` pour avoir les options.

### Merlin

[Merlin](https://github.com/ocaml/merlin) propose du type hinting, du refactoring, l'affichage d'erreurs en temps réel, du saut vers les définitions, etc. à nos éditeurs.


L'interface en ligne de commande de Merlin est `ocamlmerlin`, bien que vous n'ayez pas à l'appeler manuellement (les éditeurs le démarrent eux-mêmes et le demandent). Pour configurer Merlin afin de comprendre votre projet, vous devrez écrire un fichier `.merlin` à la racine (la documentation est
[ici](https://github.com/ocaml/merlin/wiki/project-configuration)).

**Note**: Pour le workflow JS, nous générons le fichier `.merlin` pour vous, donc pas de soucis à ce niveau là.

Merlin est destiné à OCaml à la base, mais possède un support de première classe pour Reason. **Afin que le support fonctionne, vous aurez besoin d'`ocamlmerlin-reason`**. Encore une fois, l'installation de ces utilitaires est décrite dans le [workflow JS](./javascript)
et [le workflow natif](./native).


### REPL

Reason est fourni avec une boucle d'évaluation (REPL) appelée `rtop` qui vous permet d'évaluer Reason de façon interactive. Elle propose une auto-complétion intelligente et typée.

<img src="images/RtopOptCrop.gif" style="width:100%; max-width:466px; max-height:433px;">


```sh
# La commande rtop commence une session REPL
rtop
```

```sh
let myVar = "Hello Reason!";
# myVar: bytes = "Hello Reason!"

let result = 100 + 200;
# result : int = 300;
```

Utilisez `#quit;` pour fermer votre session REPL.

Integration éditeur
=======

Toutes nos intégrations éditeur proposent au minimum :

- Affichage de types.
- `refmt`-ing de fichier.
- Affichage d'erreurs.
- Coloration syntaxique.

Ces fonctionnalités sont propulsées par `refmt` de Reason et Merlin, mentionnés dans les sections précédentes.

### VSCode (recommendé)

Le plugin Reason de Visual Studio Code Reason offre énormément de super fonctionnalités.
https://github.com/freebroccolo/vscode-reasonml

### Atom

Vous pouvez installer l'intégration [Atom](https://atom.io/) de Reason via [atom-ocaml-merlin](https://atom.io/packages/ocaml-merlin) ou
[Nuclide](https://nuclide.io/). Le premier est plus léger.

<img style="width:100%; max-width:470px; max-height:440px" src="images/AtomAutocomplete.png" />

#### OCaml-Merlin
Conformément aux instructions [ici](https://atom.io/packages/ocaml-merlin), vous aurez aussi besoin de :

- [language-reason](https://atom.io/packages/language-reason)
- [linter-refmt](https://atom.io/packages/linter-refmt)
- [reason-refmt](https://atom.io/packages/reason-refmt)

Comme indiqué sur la page, vous aurez également besoin du linter (qui nécessite Linter-ui-default, Intention et Busy-signal).

**Note**: si vous avez installé les outils en global via le [workflow JS](./javascriptp), alors pous pouvez passer outre les instructions `opam install merlin` à la fin.

#### Nuclide
Sinon, si vous utilisez Nuclide :

- Ouvrez l'installateur de paquets depuis `Packages > Settings View > Install Packages and Themes`.
- Cherchez et installez `nuclide` si ce n'est pas déjà fait.
- Si vous ne souhaitez pas activer toutes les fonctionnalités de Nuclide, vous pouvez en désactiver la plupart excepté :
  - nuclide-ocaml
  - hyperclick
  - autocomplete
  - linter
  - nuclide-code-format
  - nuclide-outline-view
  - nuclide-datatip
  - nuclide-language-reason
  - nuclide-type-hint

Nous nous reposons sur les fonctionnalités de Nuclide (formatting, diagnosis, datatip). `⌘+shift+p` et cherchez ces mots-clés).

### Vim

Installez [vim-reason](https://github.com/reasonml-editor/vim-reason) comme vous le feriez pour n'importe quel plugin Vim.

Par exemple, via [NeoBundle](https://github.com/Shougo/neobundle.vim):

```
NeoBundle 'reasonml-editor/vim-reason'
```

Idem pour [vim-plug](https://github.com/junegunn/vim-plug) et le reste.

<img src="images/VimReason.png" style="width:100%; max-width:470px; max-height:440px" />

#### Merlin

`merlin` supporte `Vim` par défaut.

L'auto-complétion est fournie en utilisant `omnifunc`. Par défaut vous pouvez l'activer un utilisant `<C-X><C-O>` dans le mode insertion.
Si vous utilisez des plugins d'auto-complétion, la plupart d'entre eux utilisent `omni` à la base.

```
" deoplete

let g:deoplete#omni_patterns = {}
let g:deoplete#omni_patterns.reason = '[^. *\t]\.\w*\|\h\w*|#'
let g:deoplete#sources = {}
let g:deoplete#sources.reason = ['omni', 'buffer']

" neocomplete et YouCompleteMe fonctionnent directement
```

Vous pouvez utiliser les vérifications syntaxiques via des plugins comme [Syntastic](https://github.com/vim-syntastic/syntastic) (vim-reason devrait fonctionner avec par défaut), ALE, ou autres.

```
" Pour ALE

let g:ale_linter_aliases = {'reason': 'ocaml'}
```

Prenez connaissance des autres fonctionnalités proposées par Merlin dans le [README](https://github.com/reasonml-editor/vim-reason#merlin).

La commande `:ReasonPrettyPrint` invoque l'outil `refmt` et formate le texte dans le buffer actuel.
Vous pouvez définir la variable `g:vimreason_extra_args_expr_reason` afin de controler les arguments passés à `refmt` (comme `--print-width` par exemple).

### Emacs

[Reason-mode](https://github.com/arichiardi/reason-mode) propose `refmt` et un support optionnel de la boucle d'évaluation (REPL).
Pour le support de  Merlin, merlin-mode est disponible sur [Elpa](https://www.emacswiki.org/emacs/ELPA). Veuillez consulter l'utilisation de merlin-mode [ici](https://github.com/ocaml/merlin/wiki/emacs-from-scratch#discovering-the-emacs-mode) (ignorez la partie d'installation plus haut).

### Sublime Text
*Expérimental*. Sublime Text ne supporte pas encore Merlin.
https://github.com/reasonml-editor/sublime-reason

### IDEA
*Expérimental*.
https://github.com/reasonml-editor/reasonml-idea-plugin
