---
title: JSX
---

Would you like some HTML syntax in your Reason? If not, quickly skip over this section and pretend you didn't see anything!

Reason supports the JSX syntax, with some slight differences compared to the one in [ReactJS](https://facebook.github.io/react/docs/introducing-jsx.html). Reason JSX isn't tied to ReactJS; they translate to normal function calls:

**Note** for [ReasonReact](//reasonml.github.io/reason-react/) readers: this isn't what ReasonReact turns JSX into, in the end. See Usage section for more info.

## Capitalized Tag

```reason
<MyComponent foo={bar} />
```

becomes

```reason
([@JSX] MyComponent.make(~foo=bar, ~children=[], ()));
```

## Uncapitalized Tag

```reason
<div foo={bar}> child1 child2 </div>;
```

becomes

```reason
([@JSX] div(~foo=bar, ~children=[child1, child2], ()));
```

### Children

```reason
<MyComponent> foo bar </MyComponent>
```

This is the syntax for passing a list of two items, `foo` and `bar`, to the children position. It desugars to a list containing `foo` and `bar`:

```reason
([@JSX] MyComponent.createElement(~children=[foo, bar], ()));
```

**Note** again that this isn't the transform for ReasonReact; ReasonReact turns the final list into an array. But the idea still applies.

So naturally, `<MyComponent> foo </MyComponent>` desugars to `([@JSX] MyComponent.createElement(~children=[foo], ()))`. I.e. whatever you do, the arguments passed to the children position will be wrapped in a list. What if you don't want that? **What if you want to directly pass `foo` without an extra wrapping**?

#### Children Spread

To solve the above problem, we've introduced

```reason
<MyComponent> ...foo </MyComponent>
```

This passes the value `foo` _without_ wrapping it in a list (or array, in the case of ReasonReact). Aka, this desugars to:

```reason
([@JSX] MyComponent.createElement(~children=foo, ()));
```

This is extra useful in the cases where you are handled `foo` that is already a list of things, and want to forward that without wrapping it an extra time (which would be a type error) \*. It also allows you to pass arbitrary data structures at `children` position (remember, JSX `children` is really just a totally normal prop):

```reason
<MyComponent> ...((theClassName) => <div className=theClassName />) </MyComponent>;
<MyForm> ...("Hello", "Submit") </MyForm>;
```

## Usage

See [ReasonReact](//reasonml.github.io/reason-react/docs/jsx) for an example application of JSX, which transforms the above calls into a ReasonReact-specific call.

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

## Departures From JS JSX

- Attributes and children don't mandate `{}`, but we show them anyway for ease of learning. Once you `refmt` your file, some of them go away and some turn into parentheses.
- There is no support for JSX prop spread: `<Foo {...bar} />`. Though somewhat related,  we do have children spread, described above: `<Foo> ...baz </Foo>`.
- Punning!

### Punning

"Punning" refers to the syntax shorthand for when a label and a value are the same. For example, in JavaScript, instead of doing `return {name: name}`, you can do `return {name}`.

Reason JSX supports punning. `<input checked />` is just a shorthand for `<input checked=checked />`. The formatter will help you format to the latter whenever possible. This is convenient in the cases where there are lots of props to pass down:

```reason
<MyComponent isLoading text onClick />
```

Consequently, a Reason JSX component can cram in a few more props before reaching for extra libraries solutions that avoids props passing.

**Note** that this is a departure from ReactJS JSX, which does **not** have punning. ReactJS' `<input checked />` desugars to `<input checked=true />`, in order to conform to DOM's idioms and for backward compatibility.

## Tip & Tricks

For library authors wanting to take advantage of the JSX: the `[@JSX]` attribute above is a hook for potential ppx macros to spot a function wanting to format as JSX. Once you spot the function, you can turn it into any other expression.

This way, everyone gets to benefit the JSX syntax without needing to opt into a specific library using it, e.g. ReasonReact.

JSX calls supports the features of [labeled functions](function.md#labeled-arguments): optional, explicitly passed optional and optional with default.

## Design Decisions

The way we designed this JSX is related to how we'd like to help the language evolve. See the section "What's the point?" in [this blog post](https://medium.com/@chenglou/cool-things-reason-formatter-does-9e1f79e25a82).

The ability to have macros in the language + the library-agnostic JSX syntax allows every library to potentially have JSX without hassle. This way, we add some visual familiarities to the underlying OCaml language without compromising on its semantics (aka how it executes). One big goal of Reason is to let more folks take advantage of the beautiful language that is OCaml, while discarding the time-consuming debates around syntax and formatting.

\* You might wonder why you never needed such children spread in ReactJS; ReactJS uses some special runtime logic + special syntax transforms + variadic argument detection & marking to avoid most of these cases ([see here](https://github.com/facebook/react/blob/9b36 df86c6ccecb73ca44899386e6a72a83ad445/packages/react/src/ReactElement.js#L207)). Such dynamic usage complexifies the type system detection _quite a bit_. Since we control the whole syntax and ReasonReact, we decided to introduce children spread to disambiguate between the case of wrapping vs not wrapping, without compile-time & runtime cost!
