---
title: Editor Plugins
---

**Make sure you've installed reason-cli from the previous section.**

Reason's nature lends itself to great editor support. Most of our editor plugins provides at minimum:

- Types display.
- Programmatic code formatting through `refmt`.
- Errors & warnings display.
- Syntax highlighting.
- Type-driven autocomplete.
- Jump to definition.

And other features. See, for example, our VSCode plugin's [feature section](https://github.com/reasonml-editor/vscode-reasonml#features)!

## Officially Supported Editors

- [VSCode](https://github.com/reasonml-editor/vscode-reasonml): **recommended**.
- [Atom](https://github.com/314eter/atom-ocaml-merlin)
  - Please install the related packages with `apm install language-reason linter linter-refmt reason-refmt`.
  - Alternatively, if you use [Nuclide](https://nuclide.io/), Reason support comes by default.
  - True to the spirit of JavaScript, [here's yet another Atom Reason plugin](https://github.com/zaaack/atom-ide-reason)! Actually, this one's the prospective de-facto Atom Reason plugin. If you feel adventurous, please dog food it!
- [Vim](https://github.com/reasonml-editor/vim-reason-plus)
- [Emacs](https://github.com/reasonml-editor/reason-mode)
- [Sublime Text](https://github.com/reasonml-editor/sublime-reason)
- [IDEA](https://github.com/reasonml-editor/reasonml-idea-plugin)

The GitHub [reasonml-editor](https://github.com/reasonml-editor/) community hosts most of these plugins. If you'd like to add your favorite editor's plugin here, send us a [pull request](https://github.com/reasonml/reasonml.github.io)!
