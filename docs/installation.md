---
title: Installation
---

This page is a detailed explanation on how to install Reason, both manually and using a template.

Reason is installed with a package manager like [opam](https://opam.ocaml.org/) or [esy](https://esy.sh).

## Package manager

<!-- Should I move this into another section? Titled with "Choose package manager or 'Package manager'? -->

The `esy` package manager is designed to manage your npm and opam dependencies and efficiently caches & sandboxes your project compiler and dependencies. Check out the [esy website](https://esy.sh) to find out how to install dependencies, setting up package resolutions, and executing compiled programs.

- **opam**: The [opam package index](https://opam.ocaml.org/packages/) lists all available packages available in the OCaml ecosystem
- [esy](https://esy.sh) was designed to work with Reason and JavaScript projects.
- esy allows to install packages from npm and opam.
- [opam](https://opam.ocaml.org/) is the official package manager for OCaml.
- opam allows to install packages from opam (you would need npm/yarn/pnpm to install JavaScript dependencies).
- opam is closer to the OCaml ecosystem and more mature.
- esy is closer to npm/yarn/pnpm in terms of workflow.
- esy sandboxing vs opam switch
<!-- Explain a few differences (in a table?) -->

ESY:
- esy was designed to work well with Reason and JavaScript projects.
- esy allows to install packages from the npm's registry and opam's registry.
- esy developer experience is closer to npm/yarn/pnpm.
- Just one command to run `esy`, it will install deps if missing, build your dependencies and build your project.
- Due to it's cache, it's faster than opam.
- works on all platforms (Linux, MacOS and Windows)
- Publish is more straight forward (esy publish)
- Since esy needs to download packages from the opam repository, it needs to xxx and it can break, isn't as stable as opam.
- There's not an active team working on it

OPAM:
- opam is the official package manager for OCaml.
- opam is closer to the OCaml ecosystem and more mature.
- opam allows to only install packages from opam (you would need npm/yarn/pnpm to install JavaScript dependencies).
- opam comes with switches
- opam works great on Linux and MacOS (and Windows not straight forward)
- Publish is more tedious and comes with manual revision (with the tradeoff of reliability when installing)
- opam is being actively maintained and improved

<!-- Jump to opam -->
<!-- Jump to esy -->

## Installing with esy

Esy is distributed via npm, this installation requires npm x.x.x or higher.
```
npm install -g esy
```
> It's recommended to install esy globally

### Install reason

To add packages that happen to be hosted on npm, run `esy add npm-package-name`.

To add packages from opam's registry, prefix the package name with `@opam`. `esy` treats the npm scope `@opam` specially. In this case, `esy` will install any package name with the `@opam` scope directly from [opam](https://opam.ocaml.org/packages/).

```bash
esy add @opam/bos
```

<!-- Add a warning about being crazy slow the first time -->

We install reason from opam using the following command:

```
esy add @opam/reason
```

Link to getting started with esy https://esy.sh/docs/en/getting-started.html
See the [configuration](https://esy.sh/docs/en/configuration.html) section from the complete `esy` docs.

### Using the [`hello-reason`](https://github.com/esy-ocaml/hello-reason) template

To create your first Reason native CLI program, run the following commands:

```
git clone https://github.com/esy-ocaml/hello-reason.git
cd hello-reason

# Install all dependencies (might take a while in the first run)
esy

# Compile and run Hello.exe
esy x Hello
```

## Installing with opam

<!--

While using Reason,
Explain the relation with OCaml (and link to https://ocaml.org/docs/up-and-running#3-create-an-opam-switch) -->
If you don't have opam installed, follow the instructions on the opam website.
<!-- Add disclamer about being crazy slow the first time -->

```bash

bash -c "sh <(curl -fsSL https://raw.githubusercontent.com/ocaml/opam/master/shell/install.sh)"
```
(See the content of the script [here](https://raw.githubusercontent.com/ocaml/opam/master/shell/install.sh))

### Setup a new environment
<!-- Explain opam init, opam env and opam switch -->

opam needs to be initialised, which will create a default opam switch. An opam switch is an isolated environment for the OCaml compiler and any packages you install.

```
opam init
```

During opam init, you will be asked if you want to add a hook to your shell to put the tools available in the current opam switch on your PATH.

### Install reason

```
opam install reason
```
<!-- Link to opam -->
Current version 3.9.0

<!-- Small file with dune -->
<!-- https://til.hashrocket.com/posts/qljaabp1yb-compile-reasonml-to-native-with-dune -->
<!-- dune exec ... -->

### Using a template

<!-- Link to opam template and explanation -->

## What's Next?

After you have successfully compiled your first example, it's time to [set up your editor](editor-plugins.md) to get access to all the nice features such as auto-completion. Later on you can check out the [language basics](overview.md) to get a basic understanding of all the Reason language constructs.
