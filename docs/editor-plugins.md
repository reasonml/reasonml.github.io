---
title: Editor Plugins
---

Reason's nature lends itself to great editor support. Most of our editor plugins provides at minimum:

- Types display.
- Programmatic code formatting through `refmt`.
- Errors & warnings display.
- Syntax highlighting.
- Type-driven autocomplete.
- Jump to definition.

And other features.

## BuckleScript Development:

- [VSCode](https://github.com/jaredly/reason-language-server): **Recommended**. Use [reason-vscode](https://marketplace.visualstudio.com/items?itemName=jaredly.reason-vscode) from the extensions marketplace.
- [Atom](https://github.com/reasonml-editor/atom-ide-reason)
- [Vim/Neovim](https://github.com/reasonml-editor/vim-reason-plus)
- [Sublime Text](https://github.com/reasonml-editor/sublime-reason)
- [IDEA](https://github.com/reasonml-editor/reasonml-idea-plugin)
- [Emacs](https://github.com/reasonml-editor/reason-mode): **Currently unmaintained** It's recommended to use [reason-language-server](https://github.com/jaredly/reason-language-server) rather than [merlin.el](https://github.com/ocaml/merlin/blob/master/emacs/merlin.el).

## Native Project Development (Community Supported):

- [VSCode](https://marketplace.visualstudio.com/items?itemName=freebroccolo.reasonml): Use [vscode-reasonml](https://marketplace.visualstudio.com/items?itemName=freebroccolo.reasonml) from the extensions marketplace. (Mac, Linux).
- [Vim/Neovim](https://github.com/reasonml-editor/vim-reason-plus): Make sure to use [ocaml-language-server](https://www.npmjs.com/package/ocaml-language-server) for native development as suggested. (Mac, Linux): `npm install -g ocaml-language-server`
- [vim-reasonml](https://github.com/jordwalke/vim-reasonml): For use with native [esy](https://esy.sh/), Reason, and Merlin (not LSP based). (Mac, Linux, Windows).
