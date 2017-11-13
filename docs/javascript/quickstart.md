---
title: Quickstart
order: 0
---

```sh
npm install -g https://github.com/BuckleScript/bucklescript
bsb -init my-first-app -theme basic-reason
```

**Note** that this installs BuckleScript directly from source. Installing bs-platform from npm gives you a version whose reason template has a few bugs currently. This will be fixed soon.

Then, run it as usual:

```sh
cd my-first-app
npm run start
```

It runs in watch mode, so any changes to files will be picked up and compiled.

That's all! This compiles Reason to Javascript in the `lib/js/` folder.

- Read more about how we compile to JavaScript through our partner project, [BuckleScript](http://bucklescript.github.io/bucklescript/Manual.html).

- Alternatively, **to start a [ReasonReact](//reasonml.github.io/reason-react/docs/en/installation.html) app**, try `bsb -init my-react-app -theme react`.

- Head over to [Editor Setup](/guide/editor-tools/global-installation) to get the Reason plugin for your favorite editor!
