---
title: Installation
---

This page is a detailed explanation on how to install Reason with [opam](https://opam.ocaml.org/), both manually and using a template.

Reason can also be installed with [esy](https://esy.sh). Check the [esy installation](installation-esy.md).

### System requirements
- opam
- macOS and Linux are supported natively
- Windows is supported via WSL (https://ocaml.org/docs/ocaml-on-windows)

## Install opam

opam (short for OCaml Package Manager) is a tool for managing packages and environments. If you haven't installed opam yet, please follow the instructions provided on the [official website](https://opam.ocaml.org/doc/Install.html). Be aware that the initial setup might be notably slow due to compiler retrieval and build processes.

### Using a template

This template serves as a solid foundation, integrating essential configurations and structure to expedite your development process. Simply follow the link to access the template and initiate your ReasonML project effortlessly.

We recommend this method for beginners.

**Repository** [reasonml/opam-template](https://github.com/reasonml/opam-template).

### Setup a new environment manually

opam needs to be initialised (Initialize `~/.opam`)

```bash
opam init -y
```

During opam init, you will be asked if you want to add a hook to your shell to put the tools available in the current opam switch on your PATH.

```bash
eval $(opam env)
```

opam is now installed and configured. Before installing Reason, we need to create a switch which is set of packages that are installed in a given compiler version. This is similar to how [nvm](https://github.com/nvm-sh/nvm) manages different versions of packages on a Node version.

```bash
opam switch create . 5.1.0 --deps-only
```

For a comprehensive guide on how to create an opam switch, refer to the following link: [ocaml.org/docs/installing-ocaml#create-an-opam-switch](https://ocaml.org/docs/up-and-running#3-create-an-opam-switch).

### Install reason

```
opam install reason
```

// TODO: Explain that `refmt` and `rtop` are available after installing reason
// TODO: Explain that you don't need to configure anything else to have the build system (dune) to build your code

Current version https://opam.ocaml.org/packages/reason

## Hello world program

// TODO: Explain what's dune wtf

```
opam install dune # build system
```

Create a file `dune` with the following content:
```
(executable
 (name hello)
 (public_name hello))
```

Create a file `hello.re` with the following content:
```
print_endline("Hello world!");
```

Build the project:
```
dune exec hello
```

## What's Next?

After you have successfully intalled reason, it's time to [set up your editor](editor-plugins.md) to get access to all the nice features such as auto-completion. Later on you can check out the [language basics](overview.md) to get a basic understanding of all the Reason language constructs.
