---
title: Быстрый старт
order: 0
---

```sh
npm install -g bs-platform
bsb -init my-first-app -theme basic-reason
```

И потом запустите как обычно

```sh
cd my-first-app
npm run build
```

Вы можете запустить в режиме наблюдения (с автоматической
пересборкой):

```sh
npm run watch
```

И это все! После этого код Reason будет скомпилирован в JavaScript
в папке `lib/js/`.

- Узнайте больше как происходит компиляция в JavaScript в проекте нашего партнера:
  [BuckleScript](http://bucklescript.github.io/bucklescript/Manual.html).

- Или **чтобы начать [ReasonReact](//reasonml.github.io/reason-react/gettingStarted.html)
приложение**, попробуйте `bsb -init my-react-app -theme react`.

- Не забудьте про [Настройку редактора](../editor-tools/global-installation),
  чтобы добавить плагины Reason в ваш любимый редактор.
