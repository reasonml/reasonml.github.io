---
title: Exception
order: 175
---

Exceptions are just a special kind of variant, "thrown" in **exceptional** cases (don't abuse them!).

### Usage

```reason
let getItem theList => {
  if (...) {
    /* return the found item here */
  } else {
    raise Not_found
  }
};

let result = try (getItem [1, 2, 3]) {
| Not_found => print_endline "Item not found!"
};
```

You can make your own exceptions like you'd make a variant (exceptions need to be capitalized too).

```
exception InputClosed string;
...
raise (InputClosed "the stream has closed!");
```

### Tips & Tricks

When you have ordinary variants, you often don't **need** exceptions. For example, instead of throwing when `item` can't be found in a collection, try to return an `option item` (`None` in this case) instead.

### Design Decisions

The above tip seems to contract what's happening in the OCaml standard library; prominent functions in modules such as [List](/api/List.html) and [String](/api/String.html) seems to throw exceptions overly often. This is partially a historical sediment, and partially out of extreme care for performance. Native OCaml/Reason is extremely performant; exception throwing was designed to be very cheap, cheaper than allocation and returning e.g. an `option`. This is unfortunately not the case for JavaScript.

Newer standard library alternatives usually come with `option`-returning functions rather than exception-throwing ones.
