---
title: Installation
---

This page is a detailed explanation on how to install Reason with [opam](https://opam.ocaml.org/), both manually and using a template. There are other options available, such as [esy](https://esy.sh), but we recommend using opam for the best experience. Check the [esy installation page](installation-esy.md) if you want to use esy instead.

### System requirements
- macOS and Linux are supported natively
- Windows is supported via WSL (https://ocaml.org/docs/ocaml-on-windows)

## Install the package manager

[opam](https://opam.ocaml.org) (short for OCaml Package Manager) is a tool for managing packages and environments. If you haven't installed opam yet, please follow the instructions provided on the [official website](https://opam.ocaml.org/doc/Install.html). Be aware that the initial setup might be notably slow due to compiler retrieval and build processes.

### Using a template

This template serves as a solid foundation, integrating essential configurations and structure to expedite your development process. Simply follow the link to access the template and initiate your ReasonML project effortlessly.

We recommend this method for beginners.

**Repository** [melange-re/melange-opam-template](https://github.com/melange-re/melange-opam-template)

The template comes from the [Melange](https://melange.re) team, since it's a common duo to use Reason with Melange.
Melange is a compiler that emits JavaScript, from Reason code. You can find all the information about Melange in their docs: https://melange.re

### Setup a new environment manually

opam needs to be initialised (Initialize `~/.opam`). This step is only required once.

```bash
opam init -y
```

During opam init, you will be asked if you want to add a hook to your shell to put the tools available in the current opam switch on your PATH.

```bash
eval $(opam env)
```

### Create switch

opam is now installed and configured. Before installing Reason, we need to create a switch which is set of packages that are installed in a given compiler version. This is similar to how [nvm](https://github.com/nvm-sh/nvm) manages different versions of packages on a Node version.

```bash
opam switch create . 5.1.0 --deps-only
```

For a comprehensive guide on how to create an opam switch, refer to the following link: [ocaml.org/docs/installing-ocaml#create-an-opam-switch](https://ocaml.org/docs/up-and-running#3-create-an-opam-switch).

### Install reason

```
opam install reason
```

Once the instalation of the [`reason`](https://opam.ocaml.org/packages/reason) package is done you will have available the following tools `refmt` and `rtop` and there's no configuration change to enable the build system (dune) to build your code.

Make sure you have installed the latest version of `refmt` and `rtop` by running the following command:

```
refmt --version
```

## Install the build system

We introduced the build-system called `dune` that Reason projects can use to specify libraries, executables and applications. It’s optimized for monorepos and makes project maintenance easier. Check their docs in case you want to learn more about it: [dune.build](https://dune.build/).

```
opam install dune
```

## Hello world

To wrap up the installation process, let's create a simple hello world project. With the basic setup done:

Create a file `hello.re` with the following content:
```
print_endline("Hello world!");
```

Create a file `dune` with the following content:
```
(executable
 (name hello)
 (public_name hello))
```
> Note: dune uniformly uses the .exe extension to build native executables, even on Unix where programs don’t usually have a .exe extension.

The `executable` stanza is used to define executables and the `name` field is used to specify the name of the executable (Can run with `dune exec src/hello.exe`). The `public_name` field is used to specify the name of the executable when it is installed and allows you to run the executable with `hello` directly: `dune exec hello`.

Run the project (this will compile the project and run the executable):
```
dune exec hello
```
If you want to build only:

```
dune build
```

## What's Next?

After you have successfully intalled Reason, it's time to [set up your editor](editor-plugins.md) to get access to all the nice features such as auto-completion. Later on you can check out the [language basics](overview.md) to get a basic understanding of all the Reason language constructs.
