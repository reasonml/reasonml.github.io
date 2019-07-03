---
title: Module
---

## Basics

**Modules are like mini files**! They can contain type definitions, `let`
bindings, nested modules, etc.

### Creation

To create a module, use the `module` keyword. The module name must start with a
**capital letter**. Whatever you could place in a `.re` file, you may place
inside a module definition's `{}` block.

```reason
module School = {
  type profession = Teacher | Director;

  let person1 = Teacher;
  let getProfession = (person) =>
    switch (person) {
    | Teacher => "A teacher"
    | Director => "A director"
    };
};
```

A module's contents (including types!) can be accessed much like a record's,
using the `.` notation. This demonstrates modules' utility for namespacing.

```reason
let anotherPerson: School.profession = School.Teacher;
print_endline(School.getProfession(anotherPerson)); /* "A teacher" */
```

Nested modules work too.

```reason
module MyModule = {
  module NestedModule = {
    let message = "hello";
  };
};

let message = MyModule.NestedModule.message;
```

### `open`ing a module

Constantly referring to a value/type in a module can be tedious. Instead, we can "open" a module and refer to its contents without always prepending them with the
module's name. Instead of writing:

```reason
let p: School.profession = School.getProfession(School.person1);
```

We can write:

```reason
open School;
let p: profession = getProfession(person1);
```

The content of `School` module are made visible (**not** copied into the file, but simply made visible!) in scope. `profession`, `getProfession` and `person1` will thus correctly be found.

**Use `open` sparingly, it's convenient, but makes it hard to know where some values come from**. You should usually use `open` in a local scope:

```reason
let p = {
  open School;
  getProfession(person1);
};
/* School's content isn't visible here anymore */
```

For an `open` followed by a single expression, we have a dedicated syntax sugar:

```reason
let p = School.(getProfession(person1));
```

Anything else needs to be written in the first way:

```reason
let p = {
  open School;
  print_endline("hello!");
  getProfession(person1);
};
```

### Extending modules

Using `include` in a module statically "spreads" a module's content into
a new one, thus often fulfill the role of "inheritance" or "mixin".

```reason
module BaseComponent = {
  let defaultGreeting = "Hello";
  let getAudience = (~excited) => excited ? "world!" : "world";
};

module ActualComponent = {
  /* the content is copied over */
  include BaseComponent;
  /* overrides BaseComponent.defaultGreeting */
  let defaultGreeting = "Hey";
  let render = () => defaultGreeting ++ " " ++ getAudience(~excited=true);
};
```

**Note**: `open` and `include` are very different! The former brings a module's content into your current scope, so that you don't have to refer to a value by prefixing it with the module's name every time. The latter **copies over** the definition of a module statically, then also does an `open`.

### Every `.re` file is a module

An OCaml/Reason file maps to a module; this unlocks some interesting
expressivity that'd previously require code generation in other languages. The
file `React.re` implicitly forms a module `React`, which can be seen by other
source files.

```reason
/* FileA.re. This typically compiles to module FileA below */
let a = 1;
let b = 2;

/* FileB.re */
/* Maps FileA's implementation to a new API */
let alpha = FileA.a;
let beta = FileA.b;
```

This contrived snippet expresses "copying" a file:

```reason
/* FileA.re. This typically compiles to module FileA below */
let a = 1;
let b = 2;

/* FileB.re */
/* compiles to exactly fileA.re's content with no runtime overhead! */
include FileA;
```

**Note**: Because files are modules, file names should, by convention, be capitalized so they match their module names. Uncapitalized file names are not invalid, but will be transformed into a capitalized module name. I.e. `file.re` will be compiled into the module `File`. To simplify and minimize the disconnect here, the convention is therefore to capitalize file names too.

Signatures
----------------------------------

A module's type is called a "signature", and can be written explicitly. If a
module is like a `.re` (implementation) file, then a module's signature is like
a `.rei` (interface) file.

### Creation

To create a signature, use the `module type` keyword. The signature name must start with a
**capital letter**. Whatever you could place in a `.rei` file, you may place
inside a signature definition's `{}` block.

```reason
/* Picking up previous section's example */
module type EstablishmentType = {
  type profession;
  let getProfession: profession => string;
};
```

A signature defines the list of requirements that a module must satisfy in order
for that module to match the signature. Those requirements are of the form:

- `let x: int;` requires a `let` binding named `x`, of type `int`.
- `type t = someType;` requires a type field `t` to be equal to `someType`.
- `type t;` requires a type field `t`, but without imposing any requirements on the actual, concrete type of `t`. We'd use `t` in other entries in the signature to describe relationships, e.g. `let makePair: t => (t, t)` but we cannot, for example, assume that `t` is an `int`. This gives us great, enforced abstraction abilities.

To illustrate the various kinds of type entries, consider the above signature
`EstablishmentType` which requires that a module:

- Declare a type named `profession`.
- Must include a function that takes in a value of the type `profession` and returns a string.

**Note**:

Modules of the type `EstablishmentType` can contain more fields than the
signature declares, just like the module `School` in the previous section (if we
choose to assign it the type `EstablishmentType`. Otherwise, `School` exposes
every field). This effectively makes the `person1` field an enforced
implementation detail! Outsiders can't access it, since it's not present in the
signature; the signature **constrained** what others can access.

The type `EstablishmentType.profession` is **abstract**: it doesn't have a
concrete type; it's saying "I don't care what the actual type is, but it's used
as input to `getProfession`". This is useful to fit many modules under the same
interface:

```reason
module Company: EstablishmentType = {
  type profession = CEO | Designer | Engineer | ...;

  let getProfession = (person) => ...;
  let person1 = ...;
  let person2 = ...;
};
```

It's also useful to hide the underlying type as an implementation detail others
can't rely on. If you ask what the type of `Company.profession` is, instead of
exposing the variant, it'll only tell you "it's `Company.profession`".

### Extending module signatures

Like modules themselves, module signatures can also be extended by other module signatures using `include`:

```reason
module type BaseComponent = {
  let defaultGreeting: string;
  let getAudience: (~excited: bool) => string;
};

module type ActualComponent = {
  /* the BaseComponent signature is copied over */
  include BaseComponent;
  let render: unit => string;
};
```

**Note**: `BaseComponent` is a module **type**, not an actual module itself!

If you do not have a defined module type, you can extract it from an actual module
using `include (module type of ActualModuleName)`. For example, we can extend the
`List` module from the OCaml standard library, which does not define a module
type.

```reason
module type MyList = {
  include (module type of List);
  let myListFun: list('a) => list('a);
};
```

### Every `.rei` file is a signature

Similar to how a `React.re` file implicitly defines a module `React`, a file
`React.rei` implicitly defines a signature for `React`. If `React.rei` isn't
provided, the signature of `React.re` defaults to exposing all the fields of the
module. Because they don't contain implementation files, `.rei` files are used
in the ecosystem to also document the public API of their corresponding modules.

```reason
/* file React.re (implementation. Compiles to module React) */
type state = int;
let render = (str) => str;
```

```reason
/* file React.rei (interface. Compiles to signature of module React) */
type state = int;
let render: str => str;
```

Module Functions (functors)
----------------------------------

Modules can be passed to functions! It would be the equivalent of passing a file
as a first-class item. However, modules are at a different "layer" of the
language than other common concepts, so we can't pass them to *regular*
functions. Instead, we pass them to special functions called "functors".

The syntax for defining and using functors is very much like the syntax
for defining and using regular functions. The primary differences are:

- Functors use the `module` keyword instead of `let`.
- Functors take modules as arguments and return a module.
- Functors *require* annotating arguments.
- Functors must start with a capital letter (just like modules/signatures).

Here's an example `MakeSet` functor, that takes in a module of the type
`Comparable` and returns a new set that can contain such comparable items.

```reason
module type Comparable = {
  type t;
  let equal: (t, t) => bool;
};

module MakeSet = (Item: Comparable) => {
  /* let's use a list as our naive backing data structure */
  type backingType = list(Item.t);
  let empty = [];
  let add = (currentSet: backingType, newItem: Item.t) : backingType =>
    /* if item exists */
    if (List.exists((x) => Item.equal(x, newItem), currentSet)) {
      currentSet /* return the same (immutable) set (a list really) */
    } else {
      [
        newItem,
        ...currentSet /* prepend to the set and return it */
      ]
    };
};
```

Functors can be applied using function application syntax. In this case, we're
creating a set, whose items are pairs of integers.

```reason
module IntPair = {
  type t = (int, int);
  let equal = ((x1, y1), (x2, y2)) => x1 == x2 && y1 == y2;
  let create = (x, y) => (x, y);
};

/* IntPair abides by the Comparable signature required by MakeSet */
module SetOfIntPairs = MakeSet(IntPair);
```

### Module functions types

Like with module types, functor types also act to constrain and hide what we may
assume about functors. The syntax of functor types is consistent with that
of function types, but with types capitalized to represent the signatures of
modules the functor accepts as arguments and return values. In the
previous example, we're exposing the backing type of a set; by giving `MakeSet`
a functor signature, we can hide the underlying data structure!

```reason
module type Comparable = ...

module type MakeSetType = (Item: Comparable) => {
  type backingType;
  let empty: backingType;
  let add: (backingType, Item.t) => backingType;
};

module MakeSet: MakeSetType = (Item: Comparable) => {
  ...
};
```

## Tips & Tricks

Modules and functors are at a different "layer" of language than the rest (functions, let bindings, data structures, etc.). For example, you can't easily pass them into a tuple or record. Use them judiciously, if ever! Lots of times, just a record or a function is enough.
