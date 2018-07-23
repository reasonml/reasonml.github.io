---
title: Object
---

Most of time in Reason, you'd be using record to group named values together. In certain niche situations, however, you might want to use a similar feature called object; they're a bit more flexible and come with different tradeoffs.

**If you come from JavaScript**, you're mostly likely **not** looking for plain Reason objects. Skip right to the Tip & Tricks section below.

## Usage

### Type Declaration

An object **doesn't need a type declaration**, though it can have one. It looks like a record, except with a `.`:

```reason
type tesla = {
  .
  color: string
};
```

The dot at the beginning indicates that this is a "closed" object type, which means that an object based on this type must have exactly this shape.

```reason
type car('a) = {
  ..
  color: string
} as 'a;
```

Two dots, also called an elision, indicate that this is an "open" object type, and therefore can also contain other values and methods. An open object is also polymorphic and therefore requires a parameter.

### Creation

## Simple

```reason
type tesla = {
  .
  color: string,
};

let obj: tesla = {
  val red = "Red";
  pub color = red;
};

Js.log(obj#color) /* "Red" */
```

Here we have a simple object with the method `color` and the property `red`. This method takes no arguments and returns the private property `red`. Because the method `color` is a public method we can access it using object notation. Remember, objects only export methods and all properties are private.

## Advanced

```reason
type tesla = {.
  drive: int => int
};

let obj: tesla = {
  val hasEnvy = ref(false);
  pub drive = (speed) => {
    this#enableEnvy(true);
    speed
  };
  pri enableEnvy = (envy) => hasEnvy := envy
};
```

This object is of object type tesla and has a public method `drive`. It also contains a private method `enableEnvy` that is only accessible from within the object.

As you can see, a Reason object can also access `this`. JavaScript object's `this` behavior can be quirky; Reason `this` always points to the object itself correctly.

The following example shows an open object type which uses a type as parameter. The object type parameter is required to implement all the methods of the open object type.

```reason
type tesla('a) = {
  ..
  drive: int => int
} as 'a;

let obj: tesla({. drive: int => int, doYouWant: unit => bool}) = {
  val hasEnvy = ref(false);
  pub drive = (speed) => {
    this#enableEnvy(true);
    speed
  };
  pub doYouWant = () => hasEnvy^;
  pri enableEnvy = (envy) => hasEnvy := envy
};
```

You can use the above object like so:

```reason
obj#doYouWant();
```

## Tip & Tricks

If you come from JavaScript, **a Reason object doesn't compile to a JS object**. For that, try BuckleScript's [special feature](https://bucklescript.github.io/docs/en/object.html#record-mode).
