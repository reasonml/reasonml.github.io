---
title: Global Installation
order: 10
---

**Before setting up the editor plugins**, you need to install the global binaries needed by them.

### (Recommended) Through Npm/Yarn

| Platform  | Install command
|-----------|-------------------------------------------------------------------------------------------------
| **OSX**   | `npm install -g https://github.com/reasonml/reason-cli/archive/beta-v-1.13.7-bin-darwin.tar.gz`
| **Linux** | `npm install -g https://github.com/reasonml/reason-cli/archive/beta-v-1.13.7-bin-linux.tar.gz`

**`reason-cli` currently doesn't work on Windows**, but it's not a hard requirement for using Reason; you still have great CLI build system diagnosis messages through BuckleScript, whose npm global package [`bs-platform`](https://www.npmjs.com/package/bs-platform) does work on Windows.

### (Alternative) Through OPAM

[OPAM](https://opam.ocaml.org) is the native package manager for OCaml. If you come from OCaml and don't have npm/yarn, you can optionally install this way, but be careful!

**Make sure you're on OCaml `4.02.3`**.

```
opam update
opam install reason.1.13.6
opam install merlin.2.5.4
```

### Troubleshooting

If your editor isn't behaving as expected with the above install, do the following:

```
which ocamlmerlin refmt ocamlmerlin-reason
```

It should spit out three paths that contain the word `reason-cli`. Note: during `npm/yarn` installation, the `node_modules/reason-cli` paths may be symlinked to `/usr/local/bin` (if so, the latter will display).

```
ocamlmerlin -version
```

It should say "The Merlin toolkit version 2.5.x, for Ocaml 4.02.3". Not OCaml 4.03, not 4.04, etc.

