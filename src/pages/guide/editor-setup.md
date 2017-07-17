---
title: Editor setup
order: 1
---

See our [tooling](/guide/tools) section for a descriptions of what you need to install and which editors we support.
Our [editor integration](/guide/tools#editor-integration) need a few binaries to be found in your `$PATH`:
- `refmt`: the Reason parser/printer (editor formatter).
- `ocamlmerlin-reason`: Reason bridge to [Merlin](/guide/tools#tools-command-line-utilities-merlin).
- `ocamlmerlin`: the Merlin binary.
The tooling section explains what these binaries do.
**Install reason-cli globally** with npm:
```sh
## on Linux:
npm install -g https://github.com/reasonml/reason-cli/archive/beta-v-1.13.6-bin-linux.tar.gz
## on MacOS:
npm install -g https://github.com/reasonml/reason-cli/archive/beta-v-1.13.6-bin-darwin.tar.gz
## test that you have them installed correctly
which ocamlmerlin refmt ocamlmerlin-reason
```
**Note**: the global toolchain `reason-cli` currently doesn't work on Windows.
**Note**: please verify that your installed OCaml version is `4.02.x` and that Merlin is `>=2.5.1`. The above installation does that automatically, but people sometimes install our toolchain through other ways (e.g. native workflow, with looser version constraints).
```sh
ocamlc -version
ocamlmerlin -version
```
