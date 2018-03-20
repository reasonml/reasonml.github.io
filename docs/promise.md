---
title: Promise
---

Reason has built-in support for [JavaScript promises through BuckleScript](https://bucklescript.github.io/bucklescript/api/Js.Promise.html). The 3 functions you generally need are:

- `Js.Promise.resolve: 'a => Js.Promise.t('a)`
- `Js.Promise.then_: ('a => Js.Promise.t('b), Js.Promise.t('a)) => Js.Promise.t('b)`
- `Js.Promise.catch: (Js.Promise.error => Js.Promise.t('a), Js.Promise.t('a)) => Js.Promise.t('a)`

## Usage

Using the pipe operator (see "Composition operators" in the [Pervasives module](https://reasonml.github.io/api/Pervasives.html)):

```
Js.Promise.make((~resolve, ~reject) => [@bs] resolve(2))
|> Js.Promise.then_(value => {
     Js.log(value);
     Js.Promise.resolve(value + 2);
   })
|> Js.Promise.then_(value => {
     Js.log(value);
     Js.Promise.resolve(value + 3);
   })
|> Js.Promise.catch(err => {
     Js.log2("Failure!!", err);
     Js.Promise.resolve(-2);
   });
```

You can also pass a promise as a function parameter like so:

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

**Note**: we might offer a dedicated syntax for JS promises (async/await) in the future. Stay tuned!

