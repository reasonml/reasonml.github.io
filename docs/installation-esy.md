---
title: Installation via esy
---

This page is a detailed explanation on how to install Reason with [esy](https://esy.sh/) Easy package management for native Reason, OCaml and more, both manually and using a template.

Reason can be installed with a package manager like [opam](https://opam.ocaml.org/) also, check the [installation page](installation.md) for more details.

### Requirements

System Requirements:

- Node.js 16.14 or later.
- macOS, Windows (including WSL), and Linux are supported.

Esy is distributed via npm, install it using the following command:

```
npm install -g esy
```
> It's recommended to install esy globally

### Automatic
Using the [`hello-reason`](https://github.com/esy-ocaml/hello-reason) template

### Manual installation

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

To create your first Reason native CLI program, run the following commands:

```
git clone https://github.com/esy-ocaml/hello-reason.git
cd hello-reason

# Install all dependencies (might take a while in the first run)
esy

# Compile and run Hello.exe
esy x Hello
```

## What's Next?

After you have successfully compiled your first example, it's time to [set up your editor](editor-plugins.md) to get access to all the nice features such as auto-completion. Later on you can check out the [language basics](overview.md) to get a basic understanding of all the Reason language constructs.
