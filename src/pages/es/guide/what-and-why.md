---
title: Que y Por que?
order: 0
---

### Que es Reason?

Reason no es un nuevo lenguaje; es una nueva sintaxis y set de herramientas hechas a partir de [OCaml](https://ocaml.org), un lenguaje maduro y puesto a prueba industrialmente. Reason le da a OCaml una sintaxis familiar inclinada a los programadores de JavaScript, y funciona con la misma metodologia de NPM/Yarn que ya conocen los mismos.

En este aspecto, Reason podria ser casi considerado como un primo de JavaScript, mas simple, rapido y con tipo de datos estaticos, dejando de lado el historial problematico, y agregando las caracteristicas de ES2030 que puedes usar hoy mismo, y con acceso a el ecosistema de JS y OCaml!

Reason compila a JavaScript gracias a nuestro proyecto acompanado, [BuckleScript](https://bucklescript.github.io/bucklescript/Manual.html), que compila OCaml/Reason a codigo legible en JavaScript con interoperaciones adecuadas. Ademas, Reason compila a codigo eficiente y rapido en assembly, gracias a OCaml.

### Por que Reason?

> "Porque tomarse la molestia de aprender **completamente** un nuevo lenguaje?"

De esto no es lo que trata Reason.

La realizacion de que el 80% de la semantica de OCaml (como funciona) se traduce sin problemas a JavaScript moderno y vice-versa\*; si uno tiene el placer de dejar de lado algunas esquinas de JavaScript y agregar algunas pocas cosas, uno puede lograr algo que compile a un JS bastante legible y directamente usar el 80% de su ecosistema y herramientas. Ademas de esto, poder compilar a assembly, iOS, Android e incluso [microcontroladores](http://www.algo-prog.info/ocapic/web/index.php?id=ocapic)!

De todas maneras, es poco claro que caracteristicas de JS hay que modificar, en orden de encajar a un lenguaje con semanticas rapidas y con 100% de tipo de datos. Pero podemos trabjar _de atras para adelante_, a partir de un lenguaje con simpleza y velocidad como principios, y ajustarlo un poco para que sea una mejor parte de el lenguaje tan familiar de la web que todos conocemos.

Todas estas decisiones han logrado que, para los usos comunes, la curva de aprendizaje de Reason no sea mucho mas alta que aprender JS + un sistema de tipo de datos gradualmente; a cambio uno tiene:

- **Excelente sistema de tipos de datos**. Los tipo de datos de OCaml tienen 100% de cobertura (cada linea de codigo), inferencia (los tipos pueden ser deducidos y no es necesario declaralos manualmente), y correcto (una vez que compila, los tipos de datos estan garantizados de ser acertados).
- **Gusto para simplicidad y pragmatismo**. Permitimos efectos secundarios, mutaciones y objetos por familiaridad y interoperaciones, mientras dejamos el resto del lenguaje puro, immutabilidad y functional.
- **Enfoque en alto rendimiento**. El sitema de compliacion de Reason, [`bsb`](http://bucklescript.github.io/bucklescript/Manual.html#_bucklescript_build_system_code_bsb_code), termina de compilar en menos de 100ms (de manera incremental).
- **Aprendizaje y conversion del codigo incremental**. Conseguir los beneficios de un archivo tipeado desde el primer momento, [copia un poco de JavaScript dentro de tu archivo de Reason](/es/guide/javascript/interop).
- **Gran ecosistema y herramientas**. Usa [tu editor de codigo favorito](/es/guide/editor-tools/editors-plugins), [tu paquete favorito de NPM](/es/guide/javascript/libraries), cualquiera de tu [infrastructura](https://webpack.js.org) [favorita](https://github.com/reasonml/reason-react) [existente](https://github.com/reasonml-community/bs-jest) .

\* Dificl de creer? Mira nuestro [JS -> Reason guia de atajos](/es/guide/javascript/syntax-cheatsheet) o proba un poco de Reason en [el editor](/try/) y observa tu codigo compliado a la derecha!

_Reason es un proyecto open source comunitario de Facebook_.
