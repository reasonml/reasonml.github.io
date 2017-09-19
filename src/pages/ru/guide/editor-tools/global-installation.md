---
title: Глобальная установка
order: 10
---

**До настройки плагинов для редактора**, вы должны установить нужные им глобальные бинарники.

### (Рекомендованный способ) через Npm/Yarn

| Платформа  | Команда
|------------|-------------------------------------------------------------------------------------------------
| **OSX**    | `npm install -g https://github.com/reasonml/reason-cli/archive/beta-v-1.13.6-bin-darwin.tar.gz`
| **Linux**  | `npm install -g https://github.com/reasonml/reason-cli/archive/beta-v-1.13.6-bin-linux.tar.gz`

**`reason-cli` на данный момент не работает под Windows**, но это не строгое требование для использования Reason.
Вы всегда можете использовать отличную CLI систему диагностики из  BuckleScript, чей npm пакет
[`bs-platform`](https://www.npmjs.com/package/bs-platform) работает под Windows.

### (Альтернативный способ) через OPAM

[OPAM](https://opam.ocaml.org) — это нативный менеджер пакетов для OCaml. Если вы пишли из OCaml разработки и у вас
нет npm/yarn, то этот вариант годится. Только будьте осторожны!

**Убедитесть, что используете OCaml `4.02.3`**.

```
opam update
opam install reason.1.13.6
opam install merlin.2.5.4
```

### Устранение неполадок

Если ваш редактор не ведет себя как ожидалось, сделайте следующее:

```
which ocamlmerlin refmt ocamlmerlin-reason
```

Эта команда должна отобразить три пути, содержащие слово `reason-cli`.

```
ocamlmerlin -version
```

Должно вывести "The Merlin toolkit version 2.5.x, for Ocaml 4.02.3". Обратите внимание на версию!

