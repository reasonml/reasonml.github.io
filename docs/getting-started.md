---
title: Getting started
---

This section of the docs is all about quickly setting up a Reason development enviromanet up and running, plus a "Hello world" executable to introduce the build system.

## Get an overview of Reason

```reason
type schoolPerson =
  | Teacher
  | Director
  | Student(string);

let greeting = person =>
  switch (person) {
  | Teacher => "Hey Professor!"
  | Director => "Hello Director."
  | Student("Richard") => "Still here Ricky?"
  | Student(anyOtherName) => "Hey, " ++ anyOtherName ++ "."
  };

module Intro = {
  [@react.component]
  let make = (~person) => {
    <p> {React.string(greeting(person))} </p>
  }
};
```

For an introduction to most language features check out the [overview](overview.md)

## Try Reason in your browser

To start immediately an online REPL is available at [Sketch.sh](https://sketch.sh)
or open the [playground](playground)

## Setup your editor

<!-- Screenshot of an editor with hover? -->
Go to [editor-plugins](editor-plugins.md)

## Install Reason

Install Reason on your computer to start writing Reason applications.
Check the [installation](installation.md) for a more detailed guide.

### Example ¿¿¿

Here's a minimal example of a native Reason project that prints "Hello!" to the console:

```reason
// src/hi.re
print_endline("Hello!");
```

```clojure
; src/dune

; Defines an executable named hi. Running `dune build` compiles the hi.re file into
; _build/default/hi.exe.
; Can run it directly `./_build/default/hi.exe`
; or via dune with `dune exec hi`
;
; Yes, executables have the .exe extension on all platforms
(executable
  (name hi)
  (public_name hi))
```

More info on the `executable` stanza on the [Dune documentation](https://dune.readthedocs.io/en/stable/dune-files.html#executable)
<!-- Introduce library and link to docs -->
