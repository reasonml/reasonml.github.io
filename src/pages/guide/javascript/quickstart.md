---
title: Quickstart
order: 0
---

```bash
npm i -g bs-platform
# Create a new project
bsb -init my-new-project
cd my-new-project
npm install
# Start the bucklescript watcher
npm start
# (in a new terminal) start webpack
npm run build
```
Then `open public/index.html` and you're good to go!

[Configure your editor](/guide/editors) if you like, then open `src/main.re` and start making changes.

> TODO merge

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
