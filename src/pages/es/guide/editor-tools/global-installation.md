---
title: Instalacion Global
order: 10
---

**Antes de configurar los plugins del editor**, hay que instalar los binarios globales que necesitan los mismos.

### (Recomendado) Mediante Npm/Yarn

| Platforma  | Comando de Instalacion
|-----------|-------------------------------------------------------------------------------------------------
| **OSX**   | `npm install -g https://github.com/reasonml/reason-cli/archive/beta-v-1.13.6-bin-darwin.tar.gz`
| **Linux** | `npm install -g https://github.com/reasonml/reason-cli/archive/beta-v-1.13.6-bin-linux.tar.gz`

**Actualmente `reason-cli` no funciona en Windows**,pero no es un requisito absoluto para usar Reason; aun tienes una excelente herramienta y compilador mediante BuckleScript, que funciona en Windows por el paquete global de npm [`bs-platform`](https://www.npmjs.com/package/bs-platform).

### (Aternativa) Mediante OPAM

[OPAM](https://opam.ocaml.org) es el gestionador de paquetes nativo de OCaml. Si venis de OCaml y no tenes npm/yarn, opcionalmente podes instalar de esta manera, pero ten cuidado!

**Asegurate que tu version de OCaml es `4.02.3`**.

```
opam update
opam add reason.1.13.6
opam add merlin.2.5.4
```

### Problemas

Si tu editor no se esta comportando como deberia, ejectua:

```
which ocamlmerlin refmt ocamlmerlin-reason # Deberia mostrar 3 rutas que contengan la palabra `reason-cli`.
ocamlmerlin -v # Deberia decir "The Merlin toolkit version 2.5.x, for Ocaml 4.02.3"
```

Porfavor verifica que has instalado la version `4.02.x` de OCaml y `>=2.5.1` de Merlin.
