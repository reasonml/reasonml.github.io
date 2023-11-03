---
title: JSX
---

JSX is a syntax extension for HTML-like syntax inside a JavaScript file. It's a convenient way to write React components.

Reason has built in support for JSX at the language-level, so you can use it without any extra tooling.

The design is slight different compared to the one in [React](https://facebook.github.io/react/docs/introducing-jsx.html), since Reason JSX isn't tied to React and it translate to normal function calls.

### Features of Reason JSX
- Components are modules with a `make` function
- Props are labeled arguments
- Adds dynamic expressions that allow you to reference variables and functions within your JSX by using the `{ }` (block-scoped) syntax

### Departures from JavaScript JSX

- Attributes and children don't mandate `{}`, but we show them anyway for ease of learning. Once you format your file, some of them go away and some turn into parentheses.
- There is no support for JSX prop spread: `<Foo {...bar} />`. Though somewhat related, we do have children spread, described above: `<Foo> ...baz </Foo>`.
- Punning [See below](#punning)

# Syntax

Here's a quick overview of the syntax, and example of how it transforms to normal function calls.

## Capitalized Tag

```reason
<MyComponent foo={bar} />
```

becomes

```reason
([@JSX] MyComponent.createElement(~foo=bar, ~children=[], ()));
```

## Uncapitalized Tag

```reason
<div foo={bar}> child1 child2 </div>;
```

becomes

```reason
([@JSX] div(~foo=bar, ~children=[child1, child2], ()));
```

`[@JSX]` is just an attribute for hooking up ppxes. As an example, [reason-react-ppx](https://reasonml.github.io/reason-react/) turns that agnostic `div` call into something React-specific.

## Fragment

```reason
<> child1 child2 </>
```

becomes

```reason
([@JSX] [child1, child2]);
```

### Children

```reason
<MyComponent> foo bar </MyComponent>
```

This is the syntax for passing a list of two items, `foo` and `bar`, to the children position. It desugars to a list containing `foo` and `bar`:

```reason
([@JSX] MyComponent.createElement(~children=[foo, bar], ()));
```

So naturally, `<MyComponent> foo </MyComponent>` desugars to `([@JSX] MyComponent.createElement(~children=[foo], ()))`. I.e. whatever you do, the arguments passed to the children position will be wrapped in a list. What if you don't want that? **What if you want to directly pass `foo` without an extra wrapping**?

#### Children Spread

To solve the above problem, we've introduced

```reason
<MyComponent> ...foo </MyComponent>
```

This passes the value `foo` _without_ wrapping it in a list. Aka, this desugars to:

```reason
([@JSX] MyComponent.createElement(~children=foo, ()));
```

This is extra useful in the cases where you are handled `foo` that is already a list of things, and want to forward that without wrapping it an extra time (which would be a type error). It also allows you to pass arbitrary data structures at `children` position (remember, JSX `children` is really just a totally normal prop):

```reason
<MyComponent> ...((theClassName) => <div className=theClassName />) </MyComponent>;
<MyForm> ...("Hello", "Submit") </MyForm>;
```

## Usage

Here's a JSX tag that shows most of the features.

```reason
<MyComponent
  booleanAttribute={true}
  stringAttribute="string"
  intAttribute=1
  optionalProp={Some("hello")}
  forcedOptional=?{Some("hello")}
  onClick={event => handleClick(event)}>
  <div> {"hello"} </div>
</MyComponent>
```

### Punning

"Punning" refers to the syntax shorthand for when a label and a value are the same. For example, in JavaScript, instead of doing `return {name: name}`, you can do `return {name}`.

Reason JSX supports punning. `<input checked />` is just a shorthand for `<input checked=checked />`. The formatter will help you format to the latter whenever possible. This is convenient in the cases where there are lots of props to pass down:

```reason
<MyComponent isLoading text onClick />
```

Consequently, a Reason JSX component can cram in a few more props before reaching for extra libraries solutions that avoids props passing.

**Note** that this is a big difference from ReactJS JSX, which does **not** have punning. ReactJS' `<input checked />` means `<input checked=true />`, in order to conform to DOM's idioms and for backward compatibility.

## Frameworks using JSX

Aside from the tight integration with [**`reason-react`**](https://reasonml.github.io/reason-react/), there are a few libraries that are build on top of JSX in Reason. The following list is not exhaustive, and the quality of the libraries may vary.

- [**ReveryUI**](https://www.outrunlabs.com/revery/api/revery/#Overview): A ReactJS-like UI framework for building cross-platform GUI applications
- [**jsoo-react**](https://github.com/ml-in-barcelona/jsoo-react): js_of_ocaml bindings for ReactJS
- [**brisk**](https://github.com/briskml/brisk): Cross-platform set of tools for building native UIs with Reason/OCaml
- [**ppx-tea-jsx**](https://github.com/osener/ppx-tea-jsx): Reason JSX syntax for BuckleScript-TEA

## Tip & Tricks

For library authors wanting to take advantage of the JSX: the `[@JSX]` attribute above is a hook for potential ppx macros to spot a function wanting to format as JSX. Once you spot the function, you can turn it into any other expression.

This way, everyone gets to benefit the JSX syntax without needing to opt into a specific library using it.

JSX calls supports the features of [labeled functions](function.md#labeled-arguments): optional, explicitly passed optional and optional with default.

## Design Decisions

The way we designed this JSX is related to how we'd like to help the language evolve. See the section "What's the point?" in [this blog post](https://medium.com/@chenglou/cool-things-reason-formatter-does-9e1f79e25a82).

The ability to have macros in the language + the library-agnostic JSX syntax allows every library to potentially have JSX without hassle. This way, we add some visual familiarities to the underlying OCaml language without compromising on its semantics (aka how it executes). One big goal of Reason is to let more folks take advantage of the beautiful language that is OCaml, while discarding the time-consuming debates around syntax and formatting.
