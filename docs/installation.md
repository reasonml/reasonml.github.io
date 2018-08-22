---
title: Installation
---

Reason comes by default in [BuckleScript](https://bucklescript.github.io/), our compiler that turns Reason code into JavaScript code.

**Prerequisite**: either NPM (comes with [node](https://nodejs.org/en/)) or [Yarn](https://yarnpkg.com/en/).

To install BuckleScript & Reason globally:

```sh
yarn global add bs-platform
```

(or `npm install -g bs-platform` for npm).

## New Project

The global installation comes with a simple project generator. Try:

```sh
bsb -init my-new-project -theme basic-reason
```

To compile & run the project you just created:

```sh
cd my-new-project
yarn build # or npm run build, for npm
node src/Demo.bs.js
```

That's it! We use BuckleScript to compile Reason to JavaScript, then we use NodeJS to run the JavaScript. Feel free to use the generated JS files in whichever way you'd like, as if they're hand-written by you.

During development, instead of running `npm run build` each time to compile, run `npm run start` to start a watcher that recompiles automatically after file changes.

By default, the `basic-reason` theme configures BuckleScript to output the generated JS files alongside the Reason files they were produced from. [There's a reason we do that](https://bucklescript.github.io/docs/en/build-overview#tips-tricks). If you prefer to keep the generated files somewhere else, edit `bsconfig.json` to set `in-source` to `false`; the JS files will then be output to the `lib/js` directory instead.

Alternatively, **to start a [ReasonReact](https://reasonml.github.io/reason-react/docs/en/installation.html) app**, follow the instructions [here](https://reasonml.github.io/reason-react/docs/en/installation).

## Existing Project

You can install the toolchain locally to an existing project, through the familiar command:

```sh
yarn add --dev bs-platform
```

(or `npm install --save-dev bs-platform` for npm).

The rest is the same as above.
