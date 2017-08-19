---
title: Integer & Float
order: 40
---

### Integers

32 bits, tronqué lorsque nécessaire. Reason fournit les opérations habituelles : `+`, `-`, `*`, `/`, etc.

#### Utilisation

Regardez le [module Int32](/api/Int32.html) de la librairie standard. Pour la compilation JavaScript, regardez plutôt [Js.Int](https://bucklescript.github.io/bucklescript/api/Js.Int.html).

#### Conseils & astuces

**Attention lorsque vous bindez des numbers JavaScript ** ! Les plus longs peuvent être tronqués. Bindez le number JavaScript à un float à la place.

### Floats

Le float requiert d'autres opérateurs : `+.`, `-.`, `*.`, `/.`, etc. Exemple : `0.5 +. 0.6`.

#### Utilisation

Il n'y a pas de module Float dans la librairie standard actuelle. Pour la compilation JavaScript, voir [Js.Float](https://bucklescript.github.io/bucklescript/api/Js.Float.html).

#### Décisions de conception

"Pourquoi je ne peux pas simplement utiliser un `+`surchargé à la fois pour int et float ? Pourquoi est-ce que chaque fois que je trouve un langage performant avec des types, une interopérabilité et une communauté au top, je trouve toujours ce genre de défauts ?"

Là, là, doucement. Les opérateurs polymorphes, dans le système de types actuel, auraient besoin d'être codés en dur dans le compilateur. L'équivalent physique polymorphique, `==`, est un tel opérateur. `+` et le reste ne le sont pas. [Des améliorations sont en cours](https://www.reddit.com/r/ocaml/comments/2vyk10/modular_implicits/) pour les faire fonctionner comme souhaité. En attendant, continuons à livrer =).

En outre, les floats sont plutôt spéciaux en Reason/OCaml natif. [Vérifiez ici](http://www.lexifi.com/blog/unboxed-floats-ocaml) si avez envie d'apprendre des optimisations plutôt intéressantes !

