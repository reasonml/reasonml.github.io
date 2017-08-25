---
title: Плагины редактора
order: 20
---

**Убедитесь, что установили reason-cli, как было указано в предыдущей секции**

Сама суть Reason предполагает отличную поддержку редакторов. Большая часть плагинов для редакторов предоставляют
как минимум:
- Показ типов
- Форматирование кода с помощью `refmt`
- Показ ошибок и предупреждений
- Подсветка синтаксиса
- Автокомплит, учитывающий типы
- Переход к определению

И другие фичи. Например, загляните в [раздел возможностей](https://github.com/reasonml-editor/vscode-reasonml#features)!
VSCode плагина

### Официально поддерживаемые плагины

- [VSCode](https://github.com/reasonml-editor/vscode-reasonml): **рекомендованно**.
- [Atom](https://github.com/314eter/atom-ocaml-merlin)
  - Установите пакет `apm install language-reason linter linter-refmt reason-refmt`.
  - Или если используете [Nuclide](https://nuclide.io/), поддержка Reason идет по умолчанию
  - В духе JavaScript, [существует и другой Atom плагин для Reason ](https://github.com/zaaack/atom-ide-reason)!
    Возможно это самый перспективный плагин!
- [Vim](https://github.com/reasonml-editor/vim-reason)
- [Emacs](https://github.com/reasonml-editor/reason-mode)
- [Sublime Text](https://github.com/reasonml-editor/sublime-reason): экспериментальный. Пока не поддерживает
фичи, связанные с типами
- [IDEA](https://github.com/reasonml-editor/reasonml-idea-plugin)

Репозиторий на GitHub [reasonml-editor](https://github.com/reasonml-editor/) является собранием этих плагинов.
Если вы хотите добавить свой, то пришлите нам [pull request](https://github.com/reasonml/reasonml.github.io)!
