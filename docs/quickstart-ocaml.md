---
title: Quickstart
---

**Note: the native workflow is heavily work-in-progress**.

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
