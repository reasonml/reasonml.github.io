---
title: Boucles impératives
order: 150
---

### Boucles for

Les boucles `for` itèrent d'une valeur de départ jusqu'à (et y compris) la valeur de fin.

```reason
for myBinding in (startValue) to (endValue) {
  /* utilisez myBinding ici */
};
```

Les parenthèses autour de `startValue` et `endValue` peuvent être supprimées si elle sont facultatives.

```reason
let xStart = 1;
let xEnd = 3;
/* prints: 1 2 3 */
for x in xStart to xEnd {
  print_int x;
  print_string " ";
};
```

Vous pouvez faire itérer une boucle `for` en sens inverse en utilisant `downto`.

```reason
for myBinding in (startValue) downto (endValue) {
  déclarations
};
```

```reason
let xStart = 3;
let xEnd = 1;
/* prints: 3 2 1 */
for x in xStart downto xEnd {
  print_int x;
  print_string " ";
};
```

### Boucles while

Les boucles `while` exécutent un bloc de code tant qu'une condition est vraie. La forme d'une boucle while comprend une seule expression, la condition à tester.

```reason
while (testCondition) {
  déclarations;
};
```

### Conseils & astuces

Il n'y a pas de mot-clé `break` pour stoper une boucle (ni de `return` anticipé d'ailleurs) en Reason. En général, préférez `map`/`filter`/`reduce` aux boucles impératives. Cependant, on peut sortir d'une boucle `while` facilement en utilisant un [binding mutable](/guide/language/mutation).

```reason
Random.self_init ();
let break = ref false;
while (not !break) {
  if (Random.int 10 === 3) {
    break := true
  } else {
    print_endline "hello"
  }
};
```
