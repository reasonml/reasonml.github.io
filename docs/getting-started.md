---
title: Getting started
---

This section of the docs is all about quickly setting up a Reason development enviromanet up and running.

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
> This snippet code includes [@react.component] which comes from [reason-react](https://reasonml.github.io/reason-react/)

For an introduction to most language features check out the [overview](overview.md)

## Try Reason in your browser

To start immediately an online REPL is available at [Sketch.sh](https://sketch.sh)
or open the [playground](playground)

## Install Reason

Install Reason on your computer to start writing Reason applications.
Check the [installation](installation.md) for a more detailed guide.
