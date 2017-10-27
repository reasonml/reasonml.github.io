---
title: Examples
order: 60
---

An example is worth a thousand words.

This section is dedicated to newcomers trying to figure out general idioms & conventions in Reason and BuckleScript. If you're a beginner who's got a good idea for an example, please suggest an edit!

### Using the `option` type

`option` is a [variant](/guide/language/variant) that comes with the [standard library](/api/index.html). It obviates the need for null values in other languages.

```reason
let possiblyNullValue1 = None;
let possiblyNullValue2: option(string) = Some("Hello@");

switch possiblyNullValue2 {
| None => print_endline("Nothing to see here.")
| Some(message) => print_endline(message)
};
```

### Creating a parametrized type

```reason
type universityStudent = {gpa: float};

type response('studentType) = {
  status: int,
  student: 'studentType
};

let result: response(universityStudent) = fetchDataFromServer();
```

### Creating a JS Object

Assuming you're [compiling to JS](/guide/javascript), of course.

```reason
let obj1 = {
  "name": "John",
  "age": 30
};
/* Compiles to a JS object that looks exactly like what you're seeing */
```

Note that the above isn't a record; the keys are quoted in string. That's Reason syntax sugar for [bs.obj](http://bucklescript.github.io/bucklescript/Manual.html#_create_js_objects_using_bs_obj). The type is inferred. Next example explicitly types it.

### Typing a JS Object

```reason
type payload = {.
  "name": string,
  "age": int
};

let obj1: payload = {"name": "John", "age": 30};
```

Note that `{. name: string, age: int}` is the syntax for a Reason/OCaml object type declaration (not a record!). It's lifted into `Js.t` so that BuckleScript sees the whole type and compiles it correctly to a regular JavaScript object. Ordinary, non-lifted OCaml objects are compiled into something else (rarely needed currently).

### Binding to a JS Module with Default Export

Assuming the module's called `store.js`, and has a default export, plus a method called `getDate`.

```reason
type store = {. "getDate": [@bs.meth] (unit => float)};
[@bs.module] external store : store = "./store";

Js.log(store);
Js.log(store##getDate());
```

### Checking for JS nullable types using the `option` type
For a function whose argument is passed a JavaScript value that's potentially `null` or `undefined`, it's idiomatic to convert it to a Reason `option`. The conversion is done through the helper functions in Bucklescript's [`Js.Nullable`](http://bucklescript.github.io/bucklescript/api/Js.html#TYPEnullable) module. In this case, `to_opt`:

```reason
let greetByName = (possiblyNullName) => {
  let optionName = Js.Nullable.to_opt(possiblyNullName);
  switch optionName {
  | None => "Hi"
  | Some(name) => "Hello " ++ name
  }
};
```

This check compiles to `possiblyNullName == null` in JS, so checks for the presence of `null` or `undefined`.
