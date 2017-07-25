---
title: JSX
order: 160
---

Would you like some HTML syntax in your Reason? If not, quickly skip over this section and pretend you've seen nothing!

Reason supports the JSX syntax, with some slight differences compared to the one in [ReactJS](https://facebook.github.io/react/docs/introducing-jsx.html). JSX tags translate to function calls as shown in these examples:

Capitalized tag:

```reason
<MyComponent foo=bar />
```

becomes

```reason
MyComponent.make foo::bar children::[] ()
```

Lowercase tag:

```reason
<div foo=bar>child1 child2</div>
```

becomes

```reason
div foo::bar children::[child1, child2] () [@JSX]
```

The `[@JSX]` syntax attribute can be safely ignored; it's a hook for potential
ppx macros to spot them and syntactically transform the preceeding expression
into something else. This way, everyone gets to benefit the JSX syntax without
needing to opt into a specific library using it, e.g. React.

Some departures from JS JSX: Children text needs to be converted to a React element. 
This is done using `ReasonReact.stringToElement "string"`. Attributes
don't mandate curly braces, unless they're complex expressions (in which case
they're formatted to parentheses).

```reason
<NoCurlyBraces
  booleanAttribute=true
  stringAttribute="string"
  intAttribute=1
  floatAttribute=0.1
  forcedOptional=?(Some "hello")
  onClick={updater handleClick}
  thisWorksToo=(updater handleClick)>
  (ReasonReact.stringToElement "foo bar")
</NoCurlyBraces>
```

There is also support for punning!

```reason
<div foo /> /* same as <div foo=foo /> */
```

Note that this would translate to `foo=true` within JSX in JS code.

There is no support for JSX spread attributes.

JSX calls supports the features of [labeled functions](functions#labeled-arguments): optional, explicitly passed optional and optional with default.
