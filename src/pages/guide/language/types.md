---
title: Types!
order: 15
---

Les types sont le point culminant de Reason ! Ici, vous avez un aperçu de pourquoi tant de développeurs sont enthousiastes à son sujet.

Cette section présente brièvement la syntaxe des types afin que vous puissiez aobrder les sections suivantes sans vous perdu. Des sujets plus avancés sur les types peuvent être trouvés dans la section [Plus sur les types](/guide/language/more-on-types/).

### Annotations de type

Les types peuvent être déduits (aka déduits par le système de type):


```reason
let score = 10;
```

Reason sait que `score` est un `int`, à en juger par la valeur `10`.

Les types peuvent également être explicitement écrit par choix:

```reason
let score: int = 10;
```

Vous pouvez également envelopper une expression entre parenthèses et l'annoter :

```reason
let myInt = 5;
let myInt = (5 : int);
let myInt = (5 : int) + (4 : int);
let add (x: int) (y: int) :int => x + y;
let drawCircle radius::(r: int) :unit => ...;
```

Note : `/* radius::(r: int)` est un argument labellé. Plus [ici](/guide/language/functions) */

### Alias de type

Vous pouvez vous référer à un type par un nom différent :

```reason
type scoreType = int;
let x: scoreType = 10;

### Décisions de conception

Rason est soutenu par OCaml, dont le système de type a reçu des décennies d'ingénierie. Voici quelques points importants :

- Nous n'avons pas d'outil de vérification du "type coverage". **Tout est toujours typé à 100%**. Chaque bout de code Reason est typé. Si vous ne l'écrivez pas manuellement, il sera déduit (inferred) par le système de typage
- The type system is completely "sound", meaning that every type guarantees that it's not lying about itself. In a conventional, best-effort type system, just because the type says it's e.g. "an integer that's never null", doesn't mean it's actually never null. In contrast, a Reason program has no null bugs
- The types are entirely inferable (barring some exceptional features). You'd usually never have to annotate values yourself; editor features like [VSCode's codelens](https://github.com/reasonml-editor/vscode-reasonml) show you all the types while you write code. Feel free you write out the types manually though!
```
