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

## Editor Plugins & Language Server

Since Reason is just an alternative syntax for OCaml, we integrate seamlessly into the official OCaml editor toolchain as well.

- For VSCode, we recommend using the [vscode-ocaml-platform](https://github.com/ocamllabs/vscode-ocaml-platform) plugin, which offers OCaml & Reason support out of the box.
- For other editors, we recommend using a language server client plugin of your choice, and pairing it with the [`ocaml-lsp`](https://github.com/ocaml/ocaml-lsp). Check out the respective README's to get started.

**Other:**

- [Vim/Neovim](https://github.com/reasonml-editor/vim-reason-plus): Make sure to use [ocaml-language-server](https://www.npmjs.com/package/ocaml-language-server) for native development as suggested. (Mac, Linux): `npm install -g ocaml-language-server`
- [vim-reasonml](https://github.com/jordwalke/vim-reasonml): For use with [esy](https://esy.sh/), Reason, and Merlin (not LSP based). (Mac, Linux, Windows).
