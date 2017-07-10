---
title: Destructuring & Pattern Matching
order: 5
---

"Destructuring" is a visually concise way of extracting fields from a data structure while binding them to variables. You can use destructuring anywhere you'd normally use a variable. To destructure, instead
of writing the variable name as usual, write out the shape of the object.

The following binds variables: `ten = 10`, `twenty = 20`

```reason
let someInts = (10, 20);
let (ten, twenty) = someInts;
```

The following binds variables: `n = "Guy"`, `a = 30`

```reason
type person = {name: string, age: int};
let somePerson = {name: "Guy", age: 30};
let {name: n, age: a} = somePerson;
```

Destructuring also allows type annotations.
```reason
let (ten: int, twenty: int) = someInts;
let {name: (n:string), age: (a:int)} = somePerson;
```

Destructuring labeled arguments is also possible.

```reason
type person = {name: string, age: int};

let someFunction person::{name} => {
  /* you can use `name` here */
}

let otherFunction person::({name} as thePerson) => {
  /* you can use both `name` and the whole record as `thePerson` here */
}
```

A more advanced form of destructuring is called **pattern matching**. The latter looks like destructuring, but comes with even more help from the type system. Consider a variant:

```reason
type payload =
| BadResult int
| GoodResult string
| NoResult;
```

While using the `switch` expression on it, you can "destructure" it:

```reason
let data = GoodResult "Product shipped!";

let message =
  switch data {
  | GoodResult theMessage => "Success! " ^ theMessage
  | BadResult errorCode =>
    "Something's wrong. The error code is: " ^ (string_of_int errorCode)
  };
```

Notice how we've destructured `data` while handling each different case. The above `switch` will give you a compiler warning:

```
Warning 8: this pattern-matching is not exhaustive.
Here is an example of a value that is not matched:
NoResult
```

Isn't that great? While matching on the shape of your data, the type system warned of an unhandled case. This **conditional** aspect is the essence of pattern matching. Most data structures with a "if this then that" aspect works with it:

```reason
switch myList {
| [] => print_endline "Empty list"
| [a, ...theRest] =>
  print_endline ("list with the head value " ^ a)
};

switch myArray {
| [|1, 2|] => print_endline "This is an array with item 1 and 2"
| _ => print_endline "This is an array"
}
```

You can even switch on string, int and others. You can even have many patterns going to the same result!

```reason
let reply =
  switch message {
  | "Reason's pretty cool" => "Yep"
  | "good night" => "See ya!"
  | "hello"
  | "hi"
  | "heya"
  | "hey" => "hello to you too!"
  | _ => "Nice to meet you!"
  };
```

Combined with other data structures, pattern matching can produce extremely concise, compiler-verified, performant code:

```reason
let message =
  switch data {
  | GoodResult theMessage => "Success! " ^ theMessage
  | BadResult (0 | 1 | 5) => "Something's wrong. It's a server side problem."
  | BadResult errorCode => "Unknown error occurred. Code: " ^ string_of_int errorCode
  | NoResult => "Things look fine"
  };
```

When you really need to use arbitrary logic with an otherwise clean pattern match, you can slip in some `when` clauses, which are basically `if` sugar:

```reason
let message =
  switch data {
  | GoodResult theMessage => ...
  | BadResult errorCode when isServerError errorCode => ...
  | BadResult errorCode => ... /* otherwise */
  | NoResult => ...
  };
```
