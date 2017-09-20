---
title: Object
order: 175
---

Most of time in Reason, you'd be using record to group named values together. In certain niche situations, however, you might want to use a similar feature called object; they're a bit more flexible and come with different tradeoffs.

**If you come from JavaScript**, you're mostly likely **not** looking for plain Reason objects. Skip right to the Tip & Tricks section below.

### Usage

#### Type Declaration

An object **doesn't need a type declaration**, though it can have one. It looks like a record, except with a `.`:

```reason
type tesla = {
  .
  color: string
};
```

The dot at the beginning indicates that this is a "closed" object type, which means that an object based on this type must have exactly this shape.

```reason
type car 'a = {
  ..
  color: string
} as 'a;
```

Two dots, also called an elision, indicate that this is an "open" object type, and therefore can also contain other values and methods. An open object is also polymorphic and therefore requires a parameter.

#### Creation

```reason
type tesla = {
  .
  drive: int => int
};

let obj :tesla = {
  val hasEnvy = ref false;
  pub drive speed => {
    this#enableEnvy true;
    speed
  };
  pri enableEnvy envy => {
    hasEnvy := envy
  };
};
```

This object is of object type tesla and has a public method `drive`. It also contains a private method `enableEnvy` that is only accessible from within the object.

As you can see, a Reason object can also access `this`. Just like a JavaScript object's `this`, our `this` has very erratic behavior depending on the context. Just kidding. Our `this` always points to the object itself correctly. Gotta learn from history.

The following example shows an open object type which uses a type as parameter. The object type parameter is required to implement all the methods of the open object type.

```reason
type tesla 'a = {
  ..
  drive: int => int
} as 'a;

let obj:
  tesla {. drive: int => int, doYouWant: unit => bool}
  = {
  val hasEnvy = ref false;
  pub drive speed => {
    this#enableEnvy true;
    speed
  };
  pub doYouWant () => !hasEnvy;
  pri enableEnvy envy => {
    hasEnvy := envy
  };
};
```

### Tip & Tricks

If you come from JavaScript, you're probably not looking for vanilla Reason objects, but BuckleScript's [special object] (https://bucklescript.github.io/bucklescript/Manual.html#_binding_to_js_objects). These are different in that they:

- access fields through `##`
- can assign fields with `#=`
- are always used as a type parameter in the `Js.t` type.
- compile to actual JS objects.

Because they're used so often, Reason give the BS object value `[%bs.obj {foo: bar}]` a special syntax sugar: `{"foo": bar}`. It looks like a quoted record, basically.
