---
title: Getting started
---

This section of the docs is all about quickly setting up a Reason development enviromanet up and running a small "Hello world" and finally compile it to JavaScript.

<!-- Explain this more formal -->
This page introduces a few tools without much detail to get you up to speed

## Get an overview of Reason

```reason
type schoolPerson = Teacher | Director | Student(string);

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
<!-- Link to the playground -->

## Setup your editor

Go to [editor-plugins](editor-plugins.md)
<!-- Screenshot of an editor with hover? -->

## Install Reason

Install Reason on your computer to start writing Reason programs.
<!-- - Link to installation -->

## Compile to JavaScript

Compiling Reason to JavaScript with Melange
<!-- Link to compiling with Melange -->
