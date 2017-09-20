---
title: Guia Rapida
order: 0
---

```sh
npm install -g bs-platform
bsb -init my-first-app -theme basic-reason
```
Y despues iniciamos como siempre:
```sh
cd my-first-app
npm run build
```
Tambien podes compilar en modo observacion (Esto va a mirar cambios que hayas hecho y compilar automaticamente):
```sh
npm run watch
```
Esto va a compilar de Reason a Javascript en la carpeta `lib/js/`

Alternativamente, **para iniciar una app [ReasonReact](//reasonml.github.io/reason-react/gettingStarted.html)**, ingresa `bsb -init my-react-app -theme react` en la consola.
Mas informacion sobre bsb & bsconfig [aca](http://bucklescript.github.io/bucklescript/Manual.html#_bucklescript_build_system_code_bsb_code).
**Bucklescript ya viene con soporte para Reason**, por eso mismo no hay necesidad de instalar nada especifico a Reason.
