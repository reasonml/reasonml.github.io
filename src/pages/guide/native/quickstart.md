---
title: Quickstart
order: 0
---

**Note**: some parts of the native workflow likely don't work on Windows. The native workflow is currently **work in progress**, as we're currently focusing on polishing the JS workflow. Contribution welcome!
Reason integrates well into existing toolchains such as `ocamlbuild`, and ships
with a binary called `rebuild`, a thin wrapper around [`ocamlbuild`](https://ocaml.org/learn/tutorials/ocamlbuild/)
that ensures the right flags to be passed to the compiler for any files ending
in `.re`.
For native compilation, we use [OPAM](https://opam.ocaml.org).
```sh
# On OSX, install opam via Homebrew:
brew update
brew install opam
# On Linux, see here (you'll need opam >= 1.2.2): http://opam.ocaml.org/doc/Install.html
opam init
# **Note**: add the line below to your ~/.bashrc or ~/.zshrc too; it's needed at every shell startup
eval $(opam config env)
opam update
opam switch 4.02.3
```

Then clone our example [`ReasonNativeProject`](https://github.com/reasonml/ReasonNativeProject) repo, and you're good to go!
