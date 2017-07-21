---
title: Editor setup
order: 1
---

To setup `Reason` for your favorite editor, we recommend installing `reason-cli`:
Reason toolchain packaged for npm.

**Supported**: Installing via `npm`, on Mac OS or Linux.

## Getting started

### Install `reason-cli` Globally:

| type     | platform  | install command                                                                                 | Notes   |
|:--------:|-----------|-------------------------------------------------------------------------------------------------|---------|
| `binary` | **OSX**   | `npm install -g https://github.com/reasonml/reason-cli/archive/beta-v-1.13.6-bin-darwin.tar.gz` | Installs Binaries |
| `binary` | **Linux** | `npm install -g https://github.com/reasonml/reason-cli/archive/beta-v-1.13.6-bin-linux.tar.gz`  | Installs Binaries |

> Note, the global toolchain `reason-cli` currently doesn't work on Windows.

> Note, please verify that your installed OCaml version is `4.02.x` and that Merlin is `>=2.5.1`.
The above installation does that automatically, but people sometimes install our toolchain through other ways (e.g. native workflow, with looser version constraints).
```sh
ocamlc -version
ocamlmerlin -version
```

### Install your editor plugins:

- [vscode-reasonml](https://github.com/freebroccolo/vscode-reasonml)
- [vim-reason](https://github.com/chenglou/vim-reason)
- [atom](https://atom.io/packages/ocaml-merlin)
- [emacs](https://github.com/arichiardi/reason-mode)
- [sublime-text](https://github.com/reasonml-editor/sublime-reason)
- [sublime-text](https://github.com/reasonml-editor/sublime-reason) (*Experimental*)
- [jetbrains](https://github.com/reasonml-editor/reasonml-idea-plugin) (*Experimental*)

> More information in our [editor integration section](/guide/tools#editor-integration)


### Optional: Install as local developer tool:
`reason-cli` now supports being installed as a dev-time dependency in an `npm`
project. Simply omit the `-g` flag. The binaries will show up in your
`node_modules/.bin` directory.

## Usage

- After installing `reason-cli` globally, and after installing your editor
  plugins, just start your editor like you normally would, and it should see
  `ocamlmerlin`, and `refmt` working.
- One downside is that `merlin` doesn't know where you have your findlib
  packages installed within your local project, because it is built for the
  global environment.

#### Included Binaries

When installed with `npm install -g`, `reason-cli` places the following tools
in your path:

- `ocamlmerlin`: the Merlin binary.
- `refmt`: the Reason parser/printer (editor formatter).
- `ocamlrun`
- `ocamlc`/`ocamlopt`
- `ocamlfind`

See our [tooling](/guide/tools) section for a detailed descriptions of all tools.

Moreover for `ocamlmerlin-reason`, Reason bridge to Merlin, please follow
this [link](/guide/tools#tools-command-line-utilities-merlin).

