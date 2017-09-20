---
title: Let Binding
order: 10
---

Un "let binding", en otros lenguajes, pueden llamarse  "asignacion o declaracion de una variable". `let` le da un nombre a un valor. Pueden ser usadas por codigo el codigo que viene despues de las mismas.

```reason
let saludo = "hola!";
let puntaje = 10;
let nuevoPuntaje = 10 + puntaje;
...
```

### Bloque de Alcance

Bindings pueden limitar su alcance mediante `{}`.

```reason
if (mostrarSaludo) {
  let mensaje = "Disfrutando de la documentacion hasta ahora?";
  print_endline mensaje;
};
/* `mensaje` no es accesible aca! */
```

### Bindings son Inmutables

"Inmmutable" como en, "no cambia". Una vez que un binding hace referencia a un valor, no puede hacer referencia a nada mas (al menos que contenga un valor mutable, explicado mas adelante). Sin embargo, se puede crear un nuevo binding del mismo nombre que *encierre* el binding previo; desde ese punto en adelante, el binding va a referir al nuevo valor asignado.

```reason
let mensaje = "hola";
print_endline mensaje; /* Imprime "hola" */
let mensaje = "chau";
print_endline mensaje; /* Imprime "chau" */
```

### Consejos

Ya que los bindings estan limitados mediante `{}`, podes crear un scope anonimos mediante:

```reason
let mensaje = {
  let parte1 = "hola";
  let parte2 = "mundo";
  parte1 ^ " " ^ parte2
};
/* `parte1` y `parte2` no son accesibles aca! */
```

Esto prevee el mal uso de los bindings despues de estas lineas.

### Decisiones de disenio

Reason funciona gracias a OCaml. Un let binding, en sintaxis de OCaml, funciona asi:

```ocaml
let a = 1 in
let b = 2 in
a + b
```

Esto puede ser leido conceptualmente en este formato:

```ocaml
let a = 1 in
  let b = 2 in
    a + b
```

Lo cual te puede recordar a:

```reason
/* Reason syntax */
fun a =>
  fun b =>
    a + b;
```

Aunque no son estrictamente lo mismo, afortunadamente podras observar que `let` es solo una expresion! En Reason, hemos transformado `in` en `;` para tener familiaridad visual; pero no dejes que eso oculte la elegancia de la expresion.
