---
title:  Convertir depuis JavaScript
order: 5
---

Préparation
-------

**Avant de procéder**, assurez-vous que Reason est ce dont votre équipe a besoin ! Certes nous voudrions voir croître la popularité de Reason et BuckleScript, mais ne dérangez pas inutilement vos collègues, en leur donnant une mauvaise première impression qui plus est. C'est difficile à défaire après coup.

Ce guide couvre un workflow qui nous a aidé à convertir les choses rapidement et de façon efficace. Il n'est pas destiné à passer en revue les fonctionnalités du langage (bien que cela les mettent en contexte). Des connaissances de base en Reason/BuckleScript sont un prérequis.

Syntaxe
-------

**Objectif**: tout d'abord, **rendre le fichier syntaxiquement valide**. Ne vous souciez pas des types incorrects, des modules manquants, de la mauvaise organisation des fichiers, d'autres externals, etc. Nous reviendrons pour les nettoyer après avoir configuré le test de régression pour qu'il n'y ait "pas d'erreurs de syntaxe".

Étant donné que la syntaxe Reason ressemble à celle de JavaScript, au lieu de créer un nouveau fichier Reason, il suffit de copier sur un fichier js existant et de travailler en haut de celui-ci.

*Conseil*: n'oubliez pas que vous pouvez utiliser `refmt` dans votre éditeur/terminal ! Si par exemple vous ne connaissez pas la préséance de certaines opérations, enveloppez-les dans autant de parenthèses que vous le souhaitez, puis `refmt`-ez votre code et voyez celles qui restent. De même, il n'est pas nécessaire de perdre du temps sur les indentations et l'espacement; `refmt` prend soin d'eux.

```reason
/* fichier JS original que vous avez copié */
const school = require('school');

const defaultId = 10;

function queryResult(usePayload, payload) {
  if (usePayload) {
    return payload.student
  }
  return school.getStudentById(defaultId);
}
```

Voici certaines choses que vous feriez à cette étape :

- Convertir la syntaxe d'appel de fonction.

- Convertir les `var`/`const` en `let`.

- Commenter les `require`s.

- Effectuer d'autres changements similaires. Pour les expressions idiomatiques qui n'ont pas d'équivalent, BuckleScript utilise `bs.raw` ([documentation](http://bucklescript.github.io/bucklescript/Manual.html#_embedding_arbitrary_js_code_as_an_expression)).

Encore une fois, **ne vous inquiétez que de rendre le fichier syntaxiquement valide**. Essayer d'apprendre les trois syntaxes, les types et autres sémantiques lors de la conversion d'un fichier réduit votre vitesse d'itération à moins d'un tiers.

```reason
/* syntaxe valide, conversion sémantiquement incorrecte */
/* const school = require('school'); */

let defaultId = 10;

let queryResult usePayload payload => {
  if (usePayload) {
    payload.student
  } else {
    /* pas besoin de return anticipé en reason; if-else est une expression */
    school.getStudentById defaultId;
  }
};
```

Types, Passe 1
-------

**Objectif**: corriger les types, mais juste assez pour passer à la prochaine étape.

Vous pouvez parfois obtenir des erreurs de syntaxe, mais pas aussi drastiques que l'étape précédente.

- Changer `foo.bar` en `foo##bar`. Cette [fonctionnalité *escape-hatch* de BuckleScript](http://bucklescript.github.io/bucklescript/Manual.html#_how_to_consume_js_property_and_methods) sera votre ami à moyen terme.

- Convertir `{foo: bar}` en `[%bs.obj {foo: bar}]` ([docs](http://bucklescript.github.io/bucklescript/Manual.html#_create_js_objects_using_bs_obj)). Après `refmt`, le tout sera *sucré* en `{"foo": bar}`.

- Pour communiquer avec des fichiers JavaScript externes, utilisez `external`. Ils sont [l'interface de fonction étrangère](http://bucklescript.github.io/bucklescript/Manual.html#_ffi) de BuckleScript.

  - Externals inline. Pas besoin de créer des fichiers propres et bien séparés pour les externals pour l'instant. Nous reviendrons là-dessus.

  - S'il est trop compliqué de saisir correctement une entrée/sortie d'un external, utilisez certains types polymorphiques *par défaut*, par exemple : `external getStudentById: 'whatever => 'whateverElse = ...`.

  - Pour les types et modèles de données difficiles à convertir correctement, vous pouvez parfois créer des convertisseurs comme `external unsafeCast : myPayloadType => anotherDataType = "%identity";`.

C'est la première passe, les types finaux semblent différents. Pour l'instant, récoltez les récompenses ! Une fois que vous avez fini de réparer toutes les erreurs de type, votre fichier JS devrait maintenant être généré. Gardez-le ouvert à côte. Il est temps de revenir et de réparer tous les hacks !


```reason
/* syntaxiquement valide, toujours sémantiquement faux, mais mieux */
external getStudentById: 'whatever => 'whateverElse = "getStudentById" [@@bs.module "school"];

let defaultId = 10;

let queryResult usePayload payload => {
  if (usePayload) {
    payload##student /* cela sera déduit comme `Js.t 'a` */
  } else {
    getStudentById defaultId;
  }
};
```

Sémantiques d'exécution
-------

**Objectif**: corriger les erreurs dans le JS généré.

Comparez-le avec votre ancien fichier JS. Le résultat est probablement incorrect. Vous avez probablement mal converti certaines expressions idiomatiques et avez mal écrit des internals.

- Typez la forme des objets JS (les choses nécessitant `##`).

- Convertissez les pièces par rapport aux records/variants/types idiomatiques OCaml.

Vérifiez le résultat en quête de n'importe quel changement.

```reason
type student; /* type abstrait, décrit plus tard */
external getStudentById: 'whatever => student = "getStudentById" [@@bs.module "school"];

type payloadType = Js.t {. student: student};

let defaultId = 10;

let queryResult usePayload (payload: payloadType) => {
  if (Js.to_bool usePayload) {
    payload##student
  } else {
    getStudentById defaultId;
  }
};
```

Nettoyage (Types, Passe 2)
-------

**Objectif**: rendre vos types *legit* (aka, *sound*).

Reprenez tout bug que vous auriez laissé pendant la première passe et corrigez-le.

- Assurez-vous que vous n'avez aucun type `whatever` dans vos `internals`.

- Vous pouvez conserver vos `externals` inlined, ou les extraire dans un fichier.

```reason
/* dans le fichier actuel */
type payloadType = Js.t {. student: School.student}; /* TODO: mettre ça ailleurs ! */

let defaultId = 10;

let queryResult usePayload (payload: payloadType) => {
  if (Js.to_bool usePayload) {
    payload##student
  } else {
    School.getStudentById defaultId;
  }
};
```

```reason
/* dans un fichier School.re dédié */
type student;
external getStudentById: int => student = "getStudentById" [@@bs.module "School"];
external getAllStudents: unit => array student = "getAllStudents" [@@bs.module "School"];
```

Le type `sudent` n'a pas de contenu réel, c'est ce qu'on appelle [un type abstrait](#modules-signatures). C'est un moyen pratique de spécifier la relation entre les appels externes sans savoir quelle est la forme des données sous le capot. 

Et vous avez terminé !


Conseils
-------

**N'essayez pas** de convertir complètement un fichier JS en un fichier Reason immaculé d'un seul coup. Une telle méthode pourrait réellement vous ralentir ! Ce n'est pas grave d'avoir des externals et `bs.obj` de côté, et de ne pas profiter des super fonctionnalités OCaml (variants, arguments labellés, etc.) temporairement. Une fois que vous avez converti quelques autres fichiers connexes, vous pouvez revenir et refactorer **rapidement** en vous reposant sur le système de typage.

Quels que soient les utilitaires agréables que vous trouveriez (par exemple, convertir un `Js.null_undefined Js.boolean` vers un `bool`), placez-les dans un fichier `tempUtil.re` ou quelque chose comme ça. Ils sont des exemples faciles pour vos collègues et réduisent certains problèmes de conversion.

Nous vous **recommandons vivement** de vérifier le résultat JS dans le contrôle de version. Cela rend l'intégration de système de build quasi inexistante et vous assure que lorsque vous n'êtes pas là, vos coéquipiers peuvent faire de petits changements, auditer le diff de sortie et catch n'importe quelle erreur. Le fait que la sortie JavaScript enregistrée soit compatible avec des correctifs d'urgence est un bon argument de vente (surtout auprès des managers !). Même si vous mettez à niveau la version de BuckleScript, vous allez catch n'importe quelle différence de sortie. C'est comme des [snapshots Jest](https://facebook.github.io/jest/docs/snapshot-testing.html), mais gratuitement !

Comme toujours, contacez-nous sur [Discord](https://discord.gg/reasonml) pour plus d'aide !
