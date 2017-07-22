---
title: Настройка редактора
order: 1
---

Загляните в раздел [инструментов](/guide/tools), для того чтобы понять что вам нужно
установить и какие редакторы мы поддерживаем.
Для [интеграции с редакторами](/guide/tools#editor-integration) необходимо иметь
несколько бинарников в `$PATH`:
- `refmt`: парсер/принтер для Reason (форматирование кода).
- `ocamlmerlin-reason`: адаптер Reason для [Merlin](/guide/tools#tools-command-line-utilities-merlin).
- `ocamlmerlin`: исполняемый файл Merlin.
В разделе инструментов описано подробно для чего нужен каждый бинарник.

Для **глобальной установки reason-cli** с помощью npm:
```sh
## для Linux:
npm install -g https://github.com/reasonml/reason-cli/archive/beta-v-1.13.6-bin-linux.tar.gz
## для MacOS:
npm install -g https://github.com/reasonml/reason-cli/archive/beta-v-1.13.6-bin-darwin.tar.gz
## проверка, что все работает корректно
which ocamlmerlin refmt ocamlmerlin-reason
```
**Важно**: глобальный набор инструментов `reason-cli` пока не работает в Windows.

**Важно**: проверьте, что версия OCaml `4.02.x`, а версия Merlin `>=2.5.1`.
Способ установки, описанный выше выбирает правильные версии, но люди иногда устанавливают
инструменты другим способом (нативная разработка с другими версиями).
```sh
ocamlc -version
ocamlmerlin -version
```
