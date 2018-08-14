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
npm run build
node src/demo.bs.js
```

And that's it! You've just built the project once and ran the JS output. Feel free to inspect the js output, add a few files in `my-new-project/src`, etc.

## Existing Project

You can install the toolchain locally to an existing project, through the familiar command:

```sh
yarn add --dev bs-platform
```

(or `npm install --save-dev bs-platform` for npm).
