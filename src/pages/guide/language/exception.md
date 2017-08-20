---
title: Exception
order: 175
---

Les exceptions sont juste des variants un peu spéciales, "lancées" dans cas **exceptionnels** (n'en abusez pas !).

### Utilisation

```reason
let getItem theList => {
  if (...) {
    /* retourne l'item trouvé ici */
  } else {
    raise Not_found
  }
};

let result = try (getItem [1, 2, 3]) {
| Not_found => print_endline "Item not found!"
};
```
Vous pouvez créer vos propres exceptions comme vous le feriez avec une variant (les exceptions doivent également avoir leur première lettre en majuscule).

```
exception InputClosed string;
...
raise (InputClosed "the stream has closed!");
```

### Conseils & astuces

Lorsque vous avez des variants ordinaires, vous n'avez pas souvent **besoin** d'exceptions. Par exemple, au lieu d'en lancer une lorsque `item` ne peut être trouvé dans une collection, essayez de renvoyer un `option item` (`None` dans le cas d'espèce) à la place.

### Décisions de conception

Le point ci-dessus semble contredire ce qui se passe dans la librairie standard OCaml. Les fonctions éminentes dans des modules tels que [List](/api/List.html) et [String](/api/String.html) semblent lancer des exceptions trop souvent. Ceci est en partie un héritage historique, et partiellement une attention extrême à la performance. OCaml natif/Reason sont extrêmement performants. Le générateur d'exceptions a été conçu pour être très léger, moins gourmant que l'allocation et le retour d'une `option` par exemple. Ce n'est malheureusement pas le cas pour JavaScript.

Les alternatives de librairies standard plus récentes sont généralement livrées avec des fonctions retournant des `option`s plutôt que lançant des exceptions.
