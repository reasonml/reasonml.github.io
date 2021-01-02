---
title: Installation
---

> **Important:** In case you are looking for BuckleScript + Reason instructions, please note that BuckleScript has rebranded to ReScript and comes with its own syntax, that's very similar to Reason. Please refer to the [ReScript website](https://rescript-lang.org) for more infos.

Reason comes with an npm like package manager called [esy](https://esy.sh):

```
npm install -g esy
```

To create your first Reason native CLI program, run the following commands:

```
git clone https://github.com/esy-ocaml/hello-reason.git
cd hello-reason

# Install all dependencies (might take a while in the first run)
esy 

# Compile and run Hello.exe
esy x Hello
```

Reason native development is essentially OCaml development. From here on, you want to read up following websites to get to understand the ecosystem:

- **esy**: The `esy` package manager is designed to manage your npm and opam dependencies and efficiently caches & sandboxes your project compiler and dependencies. Check out the [esy website](https://esy.sh) to find out how to install dependencies, setting up package resolutions, and executing compiled programs.
- **opam**: The [opam package index](https://opam.ocaml.org/packages/) lists all available packages available in the OCaml ecosystem
- **dune**: [`dune`](https://github.com/ocaml/dune) is the official build system in the OCaml ecosystem. Check out the [manual](https://dune.readthedocs.io/en/latest/) for more details on how to set up your project.

All your packages are managed in your `package.json` file. Usually you will find a `dune` file in each source code directory (such as `bin/` and `lib/`) for all the build system settings as well.


## What Next?

After you have successfully compiled your first example, it's time to [set up your editor](editor-plugins.md). Later on we recommend to explore the [language basics](overview.md) to get a feeling for the Reason syntax.
