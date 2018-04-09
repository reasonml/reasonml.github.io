---
title: Quickstart
---

```sh
npm install -g bs-platform  # provides the BuckleScript compiler
bsb -init my-first-app -theme basic-reason  # creates project my-first-app/
cd my-first-app
npm run build  # Compiles to src/Demo.bs.js using BuckleScript compiler
node src/Demo.bs.js  # Runs the demo using NodeJS
```

You should see some "hello world" output:

```console
> node src/Demo.bs.js
Hello, BuckleScript and Reason!
```

We use the BuckleScript compiler to compile Reason to JavaScript, then we use NodeJS to run the JavaScript. After running the compiler, what's left follows the familiar JavaScript workflow (such as running `node` or the browser).

When developing, instead of running `npm run build` each time, run `npm run start` to start a watcher that recompiles on file change.

Next:

- Read more about how we compile to JavaScript through our partner project, [BuckleScript](https://bucklescript.github.io).
- Alternatively, **to start a [ReasonReact](//reasonml.github.io/reason-react/docs/en/installation.html) app**, try `bsb -init my-react-app -theme react`.
- Head over to [Editor Setup](global-installation.md) to get the Reason plugin for your favorite editor!
