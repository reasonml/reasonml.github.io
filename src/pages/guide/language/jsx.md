---
title: JSX
order: 160
---

Would you like some HTML syntax in your Reason? If not, quickly skip over this section and pretend you didn't see anything!

Reason supports the JSX syntax, with some slight differences compared to the one in [ReactJS](https://facebook.github.io/react/docs/introducing-jsx.html). Reason JSX isn't tied to ReactJS; they translate to normal function calls:

### Capitalized Tag

```reason
<MyComponent foo={bar} />
```

becomes

```reason
MyComponent.make(~foo=bar, ~children=[], ());
```

### Uncapitalized Tag

```reason
<div foo={bar}> child1 child2 </div>;
```

becomes

```reason
([@JSX] div(~foo=bar, ~children=[child1, child2], ()));
```

### Usage

See [ReasonReact](//reasonml.github.io/reason-react/) for an example application of JSX.

Here's a JSX tag that shows most of the features.

```reason
<MyComponent
  booleanAttribute={true}
  stringAttribute="string"
  intAttribute=1
  forcedOptional=?{Some("hello")}
  onClick={reduce(handleClick)}>
  <div> {ReasonReact.stringToElement("hello")} </div>
</MyComponent>
```

### Departures From JS JSX

- Attributes and children don't mandate `{}`, but we show them anyway for ease of learning. Once you `refmt` your file, some of them go away and some turn into parentheses.
- There is no support for JSX spread attributes.
- Punning!

#### Punning

ReactJS JSX's argument punning, e.g. `<input checked />`, due to unfortunate historical reasons, desugars to `<input checked={true} />`, in order to conform to DOM's idioms. Reason doesn't have such baggage, so we've decided to desugar it to `<input checked={checked} />`. This allows folks to cram many more props into a ReasonReact component without it looking too bloated:

```reason
<MyComponent isLoading text onClick />
```

### Tip & Tricks

For library authors wanting to take advantage of the JSX: the `[@JSX]` attribute above is a hook for potential ppx macros to spot a function wanting to format as JSX. Once you spot the function, you can turn it into any other expression.

This way, everyone gets to benefit the JSX syntax without needing to opt into a specific library using it, e.g. ReasonReact.

JSX calls supports the features of [labeled functions](/guide/language/function#labeled-arguments): optional, explicitly passed optional and optional with default.

### Design Decisions

The way we designed this JSX is related to how we'd like to help the language evolve. See the section "What's the point?" in [this blog post](https://medium.com/@chenglou/cool-things-reason-formatter-does-9e1f79e25a82).

The ability to have macros in the language + the library-agnostic JSX syntax allows every library to potentially have JSX without hassle. This way, we add some visual familiarities to the underlying OCaml language without compromising on its semantics (aka how it executes). One big goal of Reason is to let more folks take advantage of the beautiful language that is OCaml, while discarding the time-consuming debates around syntax and formatting.
