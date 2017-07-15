---
title: Quickstart
order: 0
---

```sh
npm install -g bs-platform
bsb -init my-first-app -theme basic-reason
```
And then run it as usual:
```sh
cd my-first-app
npm run build
```
Alternatively, **to start a [ReasonReact](https://reasonml.github.io/reason-react/gettingStarted.html) app**, try `bsb -init my-react-app -theme react`.
More info on bsb & bsconfig [here](http://bucklescript.github.io/bucklescript/Manual.html#_bucklescript_build_system_code_bsb_code).
**BuckleScript has first-class support for Reason**, which is why you don't see any extra "reason" installation.
