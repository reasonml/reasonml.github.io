---
title: Regular Expression
---

Reason's regular expression directly transforms to JavaScript's regular expression.
Because of that, You can also directly use a JS regular expression in Reason.

<!--DOCUSAURUS_CODE_TABS-->
<!--Reason-->
```reason
let f = [%re "/(0-9)+/g"];
```
<!--Output-->
```js
var f = (/(0-9)+/g);
```
<!--END_DOCUSAURUS_CODE_TABS-->

Look ma, no runtime cost!