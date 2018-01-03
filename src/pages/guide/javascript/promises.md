---
title: Promises
order: 6
---

Reason/Bucklescript has built-in support for JavaScript promises. The 3 functions you generally need are

- `Js.Promise.resolve: ('a) => Js.Promise.t('a)`
- `Js.Promise.then_: (('a) => Js.Promise.t('b), Js.Promise.t('a)) => Js.Promise.t('b)`
- `Js.Promise.catch: ((Js.Promise.exn) => Js.Promise.t('a), Js.Promise.t('a)) => Js.Promise.t('a')`

(see more documentation on Js.Promise [here](https://bucklescript.github.io/bucklescript/api/Js.Promise.html))

Here's an example, using the pipe operator (see "Composition operators" in the [Pervasives module](https://reasonml.github.io/api/Pervasives.html)):

```
let doSomethingToAPromise = (somePromise) => {
  somePromise
  |> Js.Promise.then_(value => {
    Js.log(value);
    Js.Promise.resolve(value + 2)
  })
  |> Js.Promise.catch(err => {
    Js.log2("Failure!!", err);
    Js.Promise.resolve(-2)
  })
}
```


