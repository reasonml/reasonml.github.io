---
title: Plugines para Editores
order: 20
---

**Asegurate de haber instalado reason-cli mediante la seccion anterior.**

La naturaleza de Reason permite un excelente soporte de los editores. La mayoria del soporte provee por lo menos:

- Muestra de tipos de datos.
- Formato automatico del codigo mediante `refmt`.
- Muestra de errores y alertas.
- Sintaxis.
- Autocompletado mediante los tipos de datos.
- Accesso rapido a la definicion.

Y otras caracteristicas. Vea, por ejemplo, [nuestras caracteristicas](https://github.com/reasonml-editor/vscode-reasonml#features) del plugin de VSCode!

### Editores con soporte oficial

- [VSCode](https://github.com/reasonml-editor/vscode-reasonml): **recomendado**.
- [Atom](https://github.com/314eter/atom-ocaml-merlin)
  - Porfavor instale los paquetes correspondientes mediante `apm install language-reason linter linter-refmt reason-refmt`.
  - Alternativamente, si usas [Nuclide](https://nuclide.io/), soporte para Reason viene por defecto.
  - Fiel al espiritu de JavaScript, [aca hay otro plugin mas de Atom](https://github.com/zaaack/atom-ide-reason)! En realidad, este es el futuro plugin por defecto de Atom para Reason. Si te sientes valiente, porfavor probalo! 
- [Vim](https://github.com/reasonml-editor/vim-reason)
- [Emacs](https://github.com/reasonml-editor/reason-mode)
- [Sublime Text](https://github.com/reasonml-editor/sublime-reason): experimental. Todavia no tiene soporte con tipos de datos todavia.
- [IDEA](https://github.com/reasonml-editor/reasonml-idea-plugin)

La comunidad [reasonml-editor](https://github.com/reasonml-editor/) en GitHub tiene la mayoria de estos plugins. Si quieres agregar un plugin de tu editor favorito, mandanos un [pull request](https://github.com/reasonml/reasonml.github.io)!
