---
title: Pipe First
---

`->` is a convenient operator that allows you to "flip" your code inside-out. `a(b)` becomes `b->a`. It's a piece of syntax that doesn't have any runtime cost.

Imagine you have the following:

```reason
validateAge(getAge(parseData(person)))
```

This is slightly hard to read, since you need to read the code from the innermost part, to the outer parts. Use Pipe First to streamline it

```reason
person
  ->parseData
  ->getAge
  ->validateAge
```

Basically, `parseData(person)` is transformed into `person->parseData`, and `getAge(person->parseData)` is transformed into `person->parseData->getAge`, etc.

**This works when the function takes more than one argument too**.

```reason
a(one, two, three)
```

is the same as

```reason
one->a(two, three)
```

This works with labeled arguments too.

### Tips & Tricks

Try not to abuse pipes; they're a means to an end. Newcomers sometimes shape a library's API to take advantage of the pipe. This is rather backward.

Conventionally, we don't turn the innermost layer of function call into a pipe. So the above example would usually be written as:

```reason
parseData(person)
  ->getAge
  ->validateAge
```

## JS Method Chaining

_This section requires understanding of [Bucklescript's binding API](https://bucklescript.github.io/docs/en/function#object-method)_.

JavaScript's APIs are often attached to objects, and often chainable, like so:

```js
const result = [1, 2, 3].map(a => a + 1).filter(a => a % 2 === 0);

asyncRequest()
  .setWaitDuration(4000)
  .send();
```

Assuming we don't need the chaining behavior above, we'd bind to each case this using `bs.send` from the previous section:

```reason
[@bs.send] external map : (array('a), 'a => 'b) => array('b) = "map";
[@bs.send] external filter : (array('a), 'a => 'b) => array('b) = "filter";

type request;
external asyncRequest: unit => request = "asyncRequest";
[@bs.send] external setWaitDuration: (request, int) => request = "setWaitDuration";
[@bs.send] external send: request => unit = "send";
```

You'd use them like this:

```reason
let result = filter(map([|1, 2, 3|], a => a + 1), a => a mod 2 == 0);

send(setWaitDuration(asyncRequest(), 4000));
```

This looks much worse than the JS counterpart! Now we need to read the actual logic inside-out. We also cannot use the `|>` operator here, since the object comes _first_ in the binding. But `->` works!

```reason
let result = [|1, 2, 3|]
  ->map(a => a + 1)
  ->filter(a => a mod 2 === 0);

asyncRequest()->setWaitDuration(4000)->send;
```

## Pipe Into Variants

A variant's constructors, like `Some` or `Student`, look like functions, but unfortunately aren't, due to historical reasons. Sometime, it'd still be nice to be able to use them as functions. Pipe First takes the occasion to enable that for you!

```reason
let result = name->preprocess->Some
```

We turn this into:

```reason
let result = Some(preprocess(name))
```

**Note** that using a variant constructor as a function wouldn't work anywhere else.

## Pipe Placeholders

A placeholder is written as an underscore and it tells Reason that you want to fill in an argument of a function later. These two have equivalent meaning:

```reason
let addTo7 = (x) => add3(3, x, 4);
let addTo7 = add3(3, _, 4);
```

Sometimes you don't want to pipe the value you have into the first position. In these cases you can mark a placeholder value to show which argument you would like to pipe into.

Let's say you have a function `namePerson`, which takes a `person` then a `name` argument. If you are transforming a person then pipe will work as-is:

```reason
makePerson(~age=47, ())
  ->namePerson("Jane");
```

If you have a name that you want to apply to a person object, you can use a placeholder:

```reason
getName(input)
  ->namePerson(personDetails, _);
```

This allows you to pipe into any positional argument. It also works for named arguments:

```reason
getName(input)
  ->namePerson(~person=personDetails, ~name=_);
```
