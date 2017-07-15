---
title: Converting from JS
order: 5
---

Preparation
-------

**Before you proceed**, please make sure that Reason is what your team needs! As much as we vouch for Reason and BuckleScript's popularity, please don't unnecessarily thrash your colleagues and give them a bad first impression. That's hard to undo afterward.

This guide covers a workflow that's helped us convert things over rapidly and efficiently. It's not intended to go over language/FFI features (though it puts them in context). Basic Reason/BuckleScript knowledge is assumed.

Syntax
-------

**Goal**: first and foremost, **make the file syntactically valid**. Don't care about wrong types, missing modules, bad file organization, too many externals, etc. We'll come back to clean these up after setting up the regression test that is "no more syntax errors".

Since the Reason syntax resembles enough to that of JavaScript, instead of starting a new Reason file, just copy over an existing js file and work on top of it.

*Tip*: don't forget that you can use `refmt` in your editor/terminal! If you don't know e.g. the precedence of some operations, wrap them in as many parentheses as you wish, then `refmt` your code and see which ones remain. Likewise, no need to lose time on indentations and spacing; `refmt` takes care of them.

```reason
/* original JS file you've copied over */
const school = require('school');

const defaultId = 10;

function queryResult(usePayload, payload) {
  if (usePayload) {
    return payload.student
  }
  return school.getStudentById(defaultId);
}
```

Here are some of the things you'd do at this step:

- Convert the function call syntax over.

- Convert the `var`/`const` over to `let`.

- Hide the `require`s.

- Make other such changes. For idioms that don't have a BuckleScript equivalent, use `bs.raw` ([documentation](http://bucklescript.github.io/bucklescript/Manual.html#_embedding_arbitrary_js_code_as_an_expression)).

Again, **worry only about making the file syntactically valid**. Trying to learn all three of syntax, types and other semantics while converting over a file reduces your iteration speed to less than a third.

```reason
/* syntactically valid, semantically wrong conversion */
/* const school = require('school'); */

let defaultId = 10;

let queryResult usePayload payload => {
  if (usePayload) {
    payload.student
  } else {
    /* no need for early return in Reason; if-else is an expression */
    school.getStudentById defaultId;
  }
};
```

Types, Pass 1
-------

**Goal**: correct the types, but just enough to move onto the next step.

You might still occasionally get syntax errors, but not as drastic as the previous step's.

- Change `foo.bar` to `foo##bar`. This escape-hatch [BuckleScript feature](http://bucklescript.github.io/bucklescript/Manual.html#_how_to_consume_js_property_and_methods) will be your medium-term friend.

- Convert `{foo: bar}` to `[%bs.obj {foo: bar}]` ([docs](http://bucklescript.github.io/bucklescript/Manual.html#_create_js_objects_using_bs_obj)). After `refmt`, this will sugar to `{"foo": bar}`.

- To communicate with external JS files, use `external`. They're BuckleScript's [foreign function interface](http://bucklescript.github.io/bucklescript/Manual.html#_ffi).

  - Inline externals. No need to create clean, well-separated files for externals for now. We'll come back to these.

  - If it's too cumbersome to correctly type an `external`'s input/output, use some placeholder polymorphic types, e.g. `external getStudentById: 'whatever => 'whateverElse = ...`.

  - For data types & patterns that are hard to properly convert over, you can occasionally create converters like `external unsafeCast : myPayloadType => anotherDataType = "%identity";`.

This is the first pass; the final types likely look different. For now, reap the rewards! Once you're finally done fixing all the type errors, your JS file should now be generated. Keep it open side-by-side. Time to come back and fix all the hacks!

```reason
/* syntactically valid, still semantically wrong, but better */
external getStudentById: 'whatever => 'whateverElse = "getStudentById" [@@bs.module "school"];

let defaultId = 10;

let queryResult usePayload payload => {
  if (usePayload) {
    payload##student /* this will be inferred as `Js.t 'a` */
  } else {
    getStudentById defaultId;
  }
};
```

Runtime Semantics
-------

**Goal**: fix the errors in the generated JS output.

Compare it with your old JS file. The output is likely incorrect; you probably mis-converted some idioms and mistyped some externals.

- Type the shape of JS objects (the things that required `##`).

- Convert whichever parts to records/variants/idiomatic OCaml types.

All this time, check the output for any change.

```reason
type student; /* abstract type, described later */
external getStudentById: 'whatever => student = "getStudentById" [@@bs.module "school"];

type payloadType = Js.t {. student: student};

let defaultId = 10;

let queryResult usePayload (payload: payloadType) => {
  if (Js.to_bool usePayload) {
    payload##student
  } else {
    getStudentById defaultId;
  }
};
```

Clean Up (Types, Pass 2)
-------

**Goal**: make your types legit (aka, sound).

Go back fix whatever you've left during the first pass.

- Make sure you don't have any `'whatever` types left in `external`s.

- You can keep the `external`s inlined, or pull them out into a file.


```reason
/* in the current file */
type payloadType = Js.t {. student: School.student}; /* TODO: put this somewhere else! */

let defaultId = 10;

let queryResult usePayload (payload: payloadType) => {
  if (Js.to_bool usePayload) {
    payload##student
  } else {
    School.getStudentById defaultId;
  }
};
```

```reason
/* in a dedicated School.re file */
type student;
external getStudentById: int => student = "getStudentById" [@@bs.module "School"];
external getAllStudents: unit => array student = "getAllStudents" [@@bs.module "School"];
```

Type `student` doesn't have an actual content; that's called an [abstract type](#modules-signatures). It's a convenient way of specifying the relationship between external calls without knowing what the shape of the data is under the hood.

And then you're done!


Tips
-------

**Don't** try to fully convert a JS file into a pristine Reason file in a single shot. Such method might actually slow you down! It's fine to have externals and `bs.obj` left, and temporarily not take advantage of nice OCaml features (variants, labelled arguments, etc.). Once you've converted a few other related files, you can come back and now refactor **faster** by banking on the type system.

Whatever nice utilities you find (e.g. convert a `Js.null_undefined Js.boolean` to a `bool`), put them in a `tempUtils.re` file or something. They're easy examples for your colleagues and removes some conversion churns.

We **highly recommend** you to check the JS output into version control. It makes your build system integration quasi-nonexistent, and makes sure that when you're not there, your teammates can make small changes, audit the output diff, and catch any mistakes. It's also a great selling point that the checked in JS output is friendly to emergency hot patches (a big selling point for managers!). Even if you're upgrading BuckleScript version, you'd catch any output difference. It's like [Jest snapshots](https://facebook.github.io/jest/docs/snapshot-testing.html), for free!

As always, ping us on [Discord](https://discord.gg/reasonml) for more help!
