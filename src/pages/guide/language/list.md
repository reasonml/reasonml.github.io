---
title: List
order: 80
---

Lists are homogeneous, immutable, and support fast `O(1)` append at the head of the list.

```reason
let myList = [1, 2, 3];
let anotherList = [0, ...myList]; /* myList didn't mutate */
let listOfRecords = [{title: "two"}, ...oldRecords];
```

Under the hood, a list is just a normal variant with a neat syntax. To illustrate this, here's how you would declare your own int list type, without the nice syntax:

```reason
type myListType = Empty | NonEmpty int myListType;
let myList = NonEmpty 1 (NonEmpty 2 (NonEmpty 3 Empty));
/* basically [1, 2, 3] */
```
