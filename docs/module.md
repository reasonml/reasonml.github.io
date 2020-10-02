---
title: Modules
---

_Quick overview: [Modules](overview.md#modules)_

Modules are a way to group type definitions, [let bindings](let-binding.md),
and other nested modules. They are a helpful tool to keep your code neat and
organized.

## The Basics

Create a module with the `module` keyword:

```reason
module Duration = {
  type t = int;
  let fromSeconds = value => value;
  let add = (x, y) => x + y;
};
```

The `Duration` module can now be used from other places:

```reason
let fiveSeconds = Duration.fromSeconds(5);
let tenSeconds = Duration.add(fiveSeconds, fiveSeconds);
```

_Note: Module names must start with a capital letter._

## Files are Modules

Every Reason (`.re`) file creates a module for the contents of that file. This
is commonly how modules are created and code splitting occurs.

A file named `Duration.re` (or `duration.re`) will result in a module named
`Duration`.

## Opening Modules

The contents of a module can be made available in the current scope with the
`open` keyword:

```reason
open Duration;

let fiveSeconds = fromSeconds(5);
let tenSeconds = add(fiveSeconds, fiveSeconds);
```

**Warning**: `open` should be used sparingly. Opening many modules will pollute the
global namespace and can unexpectedly overwrite functions with common names.
If `open` still seems necessary, consider using a local open instead:

### Local Opens

The scope in which a module is open can be restricted in several ways. It can be
limited to a block scope by using `open` within that block:

```reason
let getDuration = () => {
  open Duration;
  let five = fromSeconds(5);
  let ten = add(five, five);
  ten;
};

/* Error: Unbound value */
fromSeconds(5);
```

Or special syntax can be used `Module.()`, `Module.{}`, or `Module.[]`. In each
of these cases the module is only open between the left and right symbols.

```reason
let ten = Duration.(add(fromSeconds(3), fromSeconds(7)));

let timer = Duration.{contents: fromSeconds(10)};

/* A list of durations */
let durations = Duration.[fromSeconds(1), fromSeconds(2), fromSeconds(3)];

/* Error: Unbound value */
fromSeconds(5);
```

### Opens Do Not Copy

Opening a module only affects the visibility of that module's contents. It will
not copy the contents of the module to the location of the `open`. This does not
work for example:

```reason
module DurationCopy = {
  open Duration;
  let ten = fromSeconds(10);
};

/* Error: Unbound Value */
let twenty = DurationCopy.fromSeconds(20);
```

A different keyword, `include`, does provide this copy behavior.
It is covered [later](#including-modules).

## Including Modules

The `include` keyword copies the contents of a module into another module. This
can provide a sense of inheritance by always including a default set of
functions.

```reason
module BaseItem = {  
  let isEnabled = (user) => user.isLoggedIn;
  let run = () => "Do Nothing.";
};

module Hello = {
  include BaseItem;  
  let run = () => "Hello World!";
};

/* Can safely use the interface of BaseItem even if isEnabled does not change */
if (Hello.isEnabled(currentUser)) {
  print_endline(Hello.run());
};
```

## Module Types

Explicit types can be written for modules:

```reason
module type Duration = {
  type t;
  let fromSeconds: int => t;
  let add: (t, t) => t;
};
```

This type can be applied with `:` when a module is created. The module type
specifies exactly what is exposed from a module, anything extra will be hidden.

```reason
module Duration: Duration = {
  type t = int;
  let fromSeconds = value => value;
  let add = (x, y) => x + y;

  /* The module type hides this */
  let extraStuff = () => ();
};

/* Error: Unbound value */
Duration.extraStuff();
```

### Including Module Types

Module types can also be extended using the `include` keyword:

```reason
module type Printable = {
  type printable;
  let print: printable => string;
};

module type PrintableDuration = {
  include Duration;
  include Printable;
};
```

### Accessing Implicit Module Type

Sometimes you may need access to the type of a module, but that module will not
have an explicit type defined. Use `(module type of ModuleName)` to access the
type.

```reason
module type PrintableDuration = {
  include (module type of Duration);
  include Printable;
};
```

## Interface Files

Interface files (`.rei` files) are module types. The file creates a module
type and automatically applies it to the `.re` file with the same name.

In the above examples we instead may have written two files:

```reason
/* Duration.rei */
type t;
let fromSeconds: int => t;
let add: (t, t) => t;
```

```reason
/* Duration.re */
type t = int;
let fromSeconds = value => value;
let add = (x, y) => x + y;
```

This would give the same behavior as using explicit modules and module types.

## Functors

Functors are like functions that create modules. This is an advanced topic
that can be very powerful. Here is a basic example:

```reason
module type Stringable = {
  type t;
  let toString: (t) => string;
};

module Printer = (Item: Stringable) => {
  let print = (t: Item.t) => {
    print_endline(Item.toString(t));
  };

  let printList = (list: list(Item.t)) => {
    list
    |> List.map(Item.toString)
    |> String.concat(", ")
    |> print_endline;
  };
};

module IntPrinter = Printer({
  type t = int;
  let toString = string_of_int;
});

IntPrinter.print(10); // 10
IntPrinter.printList([1, 2, 3]); // 1, 2, 3
```
