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

By default, the `basic-reason` theme configures BuckleScript to output compiled JavaScript files to the `src` directory, alongside the Reason files they were produced from. If you prefer to keep your handwritten and generated files separate, editing `bsconfig.json` to set `in-source` to `false` will cause the compiled files to be output to the `lib` directory instead.

Next:

- Read more about how we compile to JavaScript through our partner project, [BuckleScript](https://bucklescript.github.io).
- Alternatively, **to start a [ReasonReact](//reasonml.github.io/reason-react/docs/en/installation.html) app**, follow the instructions [here](https://reasonml.github.io/reason-react/docs/en/installation).
- Head over to [Editor Setup](global-installation.md) to get the Reason plugin for your favorite editor!
