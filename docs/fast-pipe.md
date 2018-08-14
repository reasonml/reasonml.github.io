---
title: Fast pipe
---

You can use the fast pipe operator `->` to simplify code so it becomes easier to
read.

```
second(first(name))
```

You can turn around the functions to be in the order they execute.

```
name
->first
->second
```

The variable will be giving as the first argument to each function. If the
function take two argument, the fast pipe operator will always give it as the
first argument.

```
name
->first(age)
->second
```

is equally to

```
second(first(name, age))
```
