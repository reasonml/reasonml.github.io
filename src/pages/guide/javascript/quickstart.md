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

You can also build in watch mode:

```sh
npm run start
```

That's all! This compiles Reason to Javascript in the `lib/js/` folder.

- Read more about how we compile to JavaScript through our partner project, [BuckleScript](http://bucklescript.github.io/bucklescript/Manual.html).

- Alternatively, **to start a [ReasonReact](//reasonml.github.io/reason-react/gettingStarted.html) app**, try `bsb -init my-react-app -theme react`.

- Head over to [Editor Setup](/guide/editor-tools/global-installation) to get the Reason plugin for your favorite editor!
