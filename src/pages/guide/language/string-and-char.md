---
title: String & Char
order: 20
---

### String

Les strings en Reason sont délimitées par des **doubles** quotes (les simples quotes sont réservées pour le type caractère abordé ci-dessous).

```reason
let greeting = "Hello world!";
let multilineGreeting = "Hello
 world!";
```

Les caractères spéciaux dans une string ont besoin d'être échappés :

```reason
let oneSlash = "\\";
```

Pour concaténer des strings, utilisez `^` :

```reason
let greetings = "Hello " ^ "world!";
```

#### String citée

Il existe une syntaxe spéciale pour les strings qui permet d'avoir

- des strings multilignes comme précédemment
- aucun caractère spécial à échapper
- des crochets pour les pré-processeurs spéciaux

```reason
let greetingAndOneSlash = {|Hello
World
\
Hehe...
|};
```

Par analogie, c'est comme l'interpolation de chaîne des backticks de JavaScript, excepté le fait d'avoir à échapper des caractères spéciaux, et sans interpolation intégrée de variables. Bien que vous puissiez récupérer trivialement cette dernière fonctionnalité, [comme BuckleScript l'a fait](http://bucklescript.github.io/bucklescript/Manual.html#_unicode_support_with_string_interpolation_since_1_7_0):

```reason
let world = {js|世界|js}; /* Supporte les caractères Unicode */
let helloWorld = {j|你好，$world|j}; /* Supporte l'Unicode et les variables d'interpolation */
```

Le pré-processeur spécial de BuckleScript peut alors chercher un marqueur `js` ou `j` autour de la chaîne et la transformer en autre chose.

#### Utilisation

[Vous pouvez trouver plus d'opérations sur les strings dans la librairie standard](/api/String.html). Pour la compilation JavaScript, consultez l'API des bindings `JS.String` dans [les docs de l'API BuckleScript](http://bucklescript.github.io/bucklescript/api/Js_string.html). Étant donné qu'une string Reason map vers une string JavaScript, vous pouvez mélanger et associer les opérations de strings dans les deux librairies standard.

#### Conseils & astuces

https://twitter.com/jusrin00/status/875238742621028355

**Vous avez un système de types expressif maintenant** ! Dans un langage non typé, vous surchargez souvent la signification de la string en l'utilisant comme suit :

- un id unique : `var BLUE_COLOR = "blue"`
- un identifiant dans une structure de données : `var BLUE = "blue"; var RED = "red"; var colors = [BLUE, RED]`
- le nom d'un champ d'objet : `person["age"] = 24`
- une énumération : `if (audio.canPlayType() === 'probably') {...}` [(ಠ_ಠ)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canPlayType#Return_value)
- d'autres modèles tout aussi farfelus que vous trouverez bientôt horribles, après vous être habitué(e) aux alternatives de Reason.

Plus vous surchargez le type string, moins le système de type peut vous aider ! Reason fournit des types et des structures de données alternatifs aux cas d'utilisation ci-dessus, rapides et maintenables (les variants par exemple, abordés dans une section ultérieure).

Dans la compilation native, les strings Reason compilent en une représentation simple dont la performance est simple à analyser, au détriment parfois d'un réglage manuel des performances. Par exemple, concaténer naïvement des strings comme "salut" ^ "comment" ^ "ça" ^ "va ?" affecte inutilement les strings intermédiaires "ça va ?" et "comment ça va ?". Dans ce cas, préférez [`String.concat`](/api/String.html). D'une certaine manière, il est plutôt appréciable que la traditionnelle analyse du runtime que nous avons appris à l'école puisse finalement être utile à nouveau.

Dans la compilation JavaScript, une string Reason map vers une string JavaScript et vice versa, donc le problème mentionné ci-dessus ne s'applique pas.

#### Décisions de conception

La fonctionnalité de *string citée* qui permet de ne pas avoir à échapper des caractères spéciaux rend possible des DSLs assez sympatiques comme les [expressions régulières](/api/Str.html) :

```reason
let r = Str.regexp {|hello \([A-Za-z]+\)|};
```

comparé à

```reason
let r = Str.regexp "hello \\([A-Za-z]+\\)";
```

Bien que pour la compilation JavaScript, vous utiliseriez [`[%bs.re]`](http://bucklescript.github.io/bucklescript/Manual.html#_regex_support) et [`Js.Re`](https://bucklescript.github.io/bucklescript/api/Js.Re.html) à la place, vu que `Str` n'est pas disponible.

L'accent mis par Reason/OCaml sur la simplicité par rapport à l'ingéniosité est très bien représenté ici par son implémentation assez simple des strings natives. Une implémentation de string trop sophistiquée peut parfois se [retourner contre nous](http://mrale.ph/blog/2016/11/23/making-less-dart-faster.html).

### Char

Reason a un type pour les strings à une seule lettre :

```reason
let firstLetterOfAlphabet = 'a';
```

**Note** : Char ne supporte pas Unicode ou UTF-8.

#### Conseils & astuces

Un caractère [compile en un integer compris entre 0 et 255](https://bucklescript.github.io/bucklescript/js-demo/?gist=7f6d24873a48fe03fa037c7c47848a4b), par soucis de rapidité. Vous pouvez aussi utilisez le pattern-matching ici (abordé plus tard) :

```reason
fun isVowel theChar => switch theChar {
| 'a' | 'e' | 'i' | 'o' | 'u' | 'y' => true
| _ => false
};
```
