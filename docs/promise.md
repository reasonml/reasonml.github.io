---
title: Promise
---

## Basic
Reason has built-in support for [JavaScript promises through BuckleScript](https://bucklescript.github.io/bucklescript/api/Js.Promise.html). The 3 functions you generally need are:

- `Js.Promise.resolve: 'a => Js.Promise.t('a)`
- `Js.Promise.then_: ('a => Js.Promise.t('b), Js.Promise.t('a)) => Js.Promise.t('b)`
- `Js.Promise.catch: (Js.Promise.error => Js.Promise.t('a), Js.Promise.t('a)) => Js.Promise.t('a)`

Additionally, here's how to create a JS promise on the Reason side:

- `Js.Promise.make: (
      (
        ~resolve: (. 'a) => unit,
        ~reject: (. exn) => unit
      ) => unit
    ) => Js.Promise.t('a)`

This type signature means that `make` takes a callback that takes 2 named arguments, `resolve` and `reject`. Both arguments are themselves [uncurried callbacks](https://bucklescript.github.io/docs/en/function.html#solution-guaranteed-uncurrying) (they have a dot). `make` returns the created promise.

## Advance
- `Js.Promise.all: array(Js.Promise.t('a)) => Js.Promise.t(array('a))`
- `Js.Promise.all2: (
  (
    Js.Promise.t('a0),
    Js.Promise.t('a1)
  )
) => Js.Promise.t(('a0, 'a1))`
- `Js.Promise.race: array(Js.Promise.t('a)) => Js.Promise.t(
  'a
)`
- And others at [JavaScript promises through BuckleScript](https://bucklescript.github.io/bucklescript/api/Js.Promise.html)

## Usage

Using the pipe operator (see "Composition operators" in the [Pervasives module](https://reasonml.github.io/api/Pervasives.html)):

```reason
let myPromiseInt = Js.Promise.make((~resolve, ~reject as _) => resolve(. 2));
let myPromiseStr = Js.Promise.resolve("42");

/* Tuple can be used when Promises are of different type, see also #all3 to #all6 */
Js.Promise.all2((myPromiseInt, myPromiseStr))
|> Js.Promise.then_(
     (
       (valueInt, valueStr) /* destructuring; this function has 1 param only, which is a tuple that can be destructured */,
     ) => {
     Js.log(valueInt);
     Js.log(valueStr);
     /* Array (NOT List) can be used when Promises are of same type */
     Js.Promise.all([|
       Js.Promise.resolve(valueInt),
       Js.Promise.resolve(69),
     |]);
   })
|> Js.Promise.then_(value => {
     Js.log(value[0]);
     Js.log(value[1]);
     /* Unlike #all and its sibling, #race only accept array of Promises of same type */
     Js.Promise.race([|
       Js.Promise.resolve(value[0]),
       Js.Promise.resolve(value[1]),
       Js.Promise.make((~resolve, ~reject as _) => {
         Js.Global.setInterval(() => {
          /* [@bs]resolve(2) is equivalent to resolve(. 2) */
          [@bs]resolve(-1);
         }, 1000) -> ignore
       }),
       Js.Promise.make((~resolve as _, ~reject) => {
         Js.log("s");
         Js.Global.setInterval(() => {
          /* [@bs]resolve(2) is equivalent to resolve(. 2) */
          [@bs]reject(Not_found);
         }, 1000) -> ignore
       }),
     |]);
   })
|> Js.Promise.catch(err => {
     Js.log2("Failure!!", err);
     Js.Promise.resolve(-2);
   });
```

**Note**: we might offer a dedicated syntax for JS promises (async/await) in the future. Stay tuned or disscuss at https://github.com/facebook/reason/issues/1321!
