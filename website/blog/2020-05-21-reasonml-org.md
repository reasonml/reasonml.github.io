---
title: Future Blog Updates / Unified Website
---

## Insights in our Development Processes

You might be wondering why we haven't posted any blog posts for the Reason syntax for almost 2 years now, so we wanted to give you an update and explain how the Reason development process takes place and what we have achieved so far.

The ReasonML ecosystem consists of multiple parts, currently separated to different websites:
- [Reason](https:///reasonml.github.io): The Reason Syntax
- [BuckleScript](https://bucklescript.github.io): The "Reason Compiler" for JS development
- [ReasonReact](https://reasonml.github.io/reasonreact): The official Reason bindings to ReactJS

The Reason syntax has been stable for several years now, we didn't introduce any major changes since v3 and the most interesting changes to the ecosystem almost exclusively happened on the compiler side within the BuckleScript project. Technically speaking, Reason is "just a syntax" after all, the compiler does the heavy lifting to make the language useful!

That means that most recent blog posts relevant for the Reason ecosystem can be found on the current [BuckleScript Blog](https://bucklescript.github.io/blog). Arguably, this is a discoverability problem, mostly caused by separate websites that should have been one unified website to begin with.

We learned a lot about the most common use-cases of the language, this is something we couldn't predict a few years ago, so we set out to improve and streamline the ecosystem.

## Reason & BuckleScript

Reason and BuckleScript are getting closer, that's why we started to call BuckleScript more often the "Reason Compiler", to make it easier for newcomers to understand the relation between the syntax and the JS compiler. So be aware that we will think about a more unified naming scheme in the future to make the language ecosystem more approachable.

Also since BuckleScript's biggest target group is the Reason community (ReasonReact, JSX, etc), we started to simplify and optimize the content by e.g. removing OCaml syntax for examples, blog posts and code snippets.

This is not a take against OCaml, since Reason **is OCaml** behind the scenes after all (and the compiler will still understand `.ml` files of course), but we believe that this will make a better, more cohesive learning experience without any additional cognitive overload for our target group.


## New Unified Website is coming!

That said, we are happy to say that the community started an initiative to unify the Reason, BuckleScript, ReasonReact websites and some other useful tooling documentation (such as [genType](https://github.com/cristianoc/gentype)) to a single umbrella website called [reasonml.org](https://reasonml.org).

The project was initiated by the [Reason Association](https://reason-association.org), a non-profit organization that emerged from the success of our first [ReasonConf](https://reason-conf.com), dedicated to support the Reason & OCaml communities.

Please note that this website is already usable, but still a **work in progress**, that means that URLs on this website are not stable yet. We will try to keep the structure similar to the original documentation sites, so you will feel right at home.

In case you find any content issues on any of the aforementioned Reason websites, make sure to open an issue / PR on the [reasonml.org repository](https://github.com/reason-association/reasonml.org) instead.

## Unified Blog

A unification of all documentation websites means a unification for the blog as well! On our new [unified blog](https://reasonml.org/blog), you will find all our previous and future blog posts in one glimpse. You can also sort them by topic to find the most recent content you are interested in more easily.

## ReasonML is growing strong

So far it was a really interesting experience to see the language grow over the past 4 years. We have a considerable amount of [individuals and organizations](/users-of-reason) relying on our tech day by day, and our goal right now is to optimize and polish the experience as much as possible, so our users can focus on building reliable and enjoyable products.

We hope this blog post shows that ReasonML is growing strong and that we are working hard to provide you with a language that has a strong type system, first-class ReactJS support and a custom-tailored compiler that compiles extremely fast to readable and efficient JavaScript.

Happy hacking everyone!









