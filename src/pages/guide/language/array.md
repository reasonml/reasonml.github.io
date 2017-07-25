---
title: Array
order: 90
---

Arrays are like lists, except they are mutable and support fast random access for performance-sensitive scenarios.

```reason
let myArray = [|"hello", "world", "how are you"|];
let world = myArray.(1);
Array.set myArray 0 "hey";
/* now [|"hey", "world", "how are you"|] */
```
