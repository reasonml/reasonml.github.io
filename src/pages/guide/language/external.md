---
title: External
order: 170
---

L'`external`, ou "IFE" (Interface de Fonction Étrangère), ou simplement "interop" (pour "interopérabilité") est la façon dont Reason communique avec d'autres langages, comme C ou JavaScript.

Imaginez que vous écrivez un binding let, mais en omettant son contenu et en le typant de façon arbitraire :

```reason
external myCFunction: int => string = "theCFunction";
```

```reason
external getElementsByClassName : string => array Dom.element =
  "document.getElementsByClassName" [@@bs.val];
```

(Le code ci-dessus est un external spécifique à [BuckleScript](https://bucklescript.github.io/bucklescript/Manual.html) qui bind une fonction JavaScript portant le même nom).

### Utilisation

Vous utiliseriez une valeur/fonction externe comme s'il s'agissait d'un binding let normal.

### Conseils & astuces

Si vous venez d'un background JavaScript : **prenez le temps de vous renseigner sur les [externals de BuckleScript](http://bucklescript.github.io/bucklescript/Manual.html#_binding_to_simple_js_functions_values)** ! Au début, vous rencontrerez certainement un bon nombre d'externals avant d'écrire à 100% du code Reason idiomatique.

### Décisions de conception

Raison prend très au sérieux l'interopérabilité avec le code existant. Notre système de types a des garanties très importantes. Cependant, une telle caractéristique signifie également que, sans un excellent système d'interopérabilité, il serait très difficile de convertir progressivement une codebase en Reason. Heureusement, l'IFE nous permet de coopérer très bien avec [le code existant et sale](/guide/javascript/converting). La combinaison d'un typage "sound" + une excellente interopérabilité signifie que nous obtenons les avantages d'un système de types progressif traditionnel en ce qui concerne la couverture et la conversion incrémentielle de codebase. Le tout sans les inconvénients d'un tel système de types progressif : fonctionnalités complexes pour supporter les patterns existants, analyse lente, rendement décroissant en termes de couverture de types, etc.

