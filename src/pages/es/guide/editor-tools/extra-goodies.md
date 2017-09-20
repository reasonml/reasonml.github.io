---
title: Extras
order: 30
---

### Extensiones del Navegador: Reason-tools


[Reason-tools](https://github.com/reasonml/reason-tools) te permite intercambiar entre sintaxis de OCaml y Reason cuando estas leyendo tutoriales o docuemntacion que este en cualquiera de los dos lenguajes.
### BuckleScript


Vamos a ver [BuckleScript](http://bucklescript.github.io/bucklescript/Manual.html) extensivamente durante el resto de la documentacion, dado que es el motor que compila nuestro Javascript. Los binarios globales se instalan mediante  `npm install -g bs-platform`.
### Otras Utilidades

The global installation you've done in the [past section](/guide/editor-tools/global-installation) comes with a few extra useful tools, described here.
La instalacion global que has usado en la [seccion anterior](/guide/editor-tools/global-installation) viene con  algunas herramientas de mas, explicadas aca.

#### Refmt

`refmt` ("Reason format") es el binario que provee el formateo automatico al editor de codigo. Toma tu codigo y lo devuelve formateado. Tambien sirve para convertir la sintaxis de Reason a OCaml y de vuelta. La comunidad de Reason lo usa para conseguir consistencia del estilo de codigo en todos los proyectos, y evitar el trabajo manual y los debates de estilo. Asi lo demostramos en Vim:

<img width="466" height="433" src="https://user-images.githubusercontent.com/1909539/28570942-3bd962a2-70f5-11e7-8934-1b7f249d7814.gif" style="max-width:466px; max-height:433px;" />

Formatea el codigo basandose en el ancho del editor (para demostrar un punto). En otras palabras, no pasa a a siguiente linea en cierta cantidad de caracteres; arregla automaticamente el limite de acorde a tu codigo.

`refmt` can be used directly in the terminal. For example, to format your code outside of the editor, do `refmt --in-place myFile.re`. **See `refmt --help` for all the options**.
`refmt` puede ser usado directamente en el terminal. Por ejemplo, para formatear tu codigo afuera del editor, ejecuta  `refmt --in-place myFile.re`. **Usa `refmt --help` para todas las opciones**.

#### Merlin

[Merlin](https://github.com/ocaml/merlin) es el motor que proporciona, tipos de datos, refactor, errores en tiempo real, saltar a la definicion, etc. para nuestro editor. El binario se llama `ocamlmerlin`, aunque no necesitas llamarlo manualmente (los editores lo ejecutan automaticamente).

Para configurar Merlin para que entienda tu proyecto, tendrias que escribir un archivo  `.merlin` en la raiz del proyecto ( [docuentacion](https://github.com/ocaml/merlin/wiki/project-configuration)). **Para el uso en JS, esta configuracion es generada para vos automaticamente por BuckleScript.**

#### REPL

Reason viene con un REPL llamado `rtop` que, una vez invocado, te deja evaluar tu codigo interactivamente. Proporciona autocompletacion inteligente, usando los tipos de datos.

<img src="https://user-images.githubusercontent.com/1909539/28570943-3bd9eb00-70f5-11e7-981c-4846719c0943.gif" style="width:100%; max-width:466px; max-height:433px;">

Ejecuta `#quit;` para terminar la sesion.

**Note that `rtop` currently doesn't work easily with packages and `external`s**. We recommend evaluating code inside our [Try](/try) playground.
**Ten en cuenta que `rtop` no funciona bien con paquetes y `external`**. Recomendamos evaluar codigo dentro de nuestro editor interactivo [Try](/try).

#### ocamlc, ocamlopt, ocamlrun, rebuild

`ocamlc` y `ocamlopt` son los compiladores de OCaml.
