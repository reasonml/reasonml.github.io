---
title: Blog
order: 0
---

### Reason 3

I'm writing this post while coincidentally sitting next to the Reason team manager's manager who's trying out the new Reason syntax; his first impression is "this is exactly how I think it works!". I think this alone made all our effort worthwhile.

Reason 3 is primarily the work of [Fred](https://github.com/let-def), the maintainer of Merlin (yeah, _that_ [Merlin](https://github.com/ocaml/merlin)), [Iwan](https://github.com/iwankaramazow) and [Jared](https://github.com/jaredly), over the last six months. The release packs a _lot_ of infra changes under the hood, most of which, we hope, stay invisible to you and occasionally make you feel "yeah, that _is_ how I think it should work".

The infra changes wouldn't have happened without a tight cooperation from these OCaml and JavaScript folks. We're really, _really_ grateful for all the support we've gotten. Thank you so much.

**Highlights**:

- [Here's how it looks](https://github.com/reasonml-community/reason-react-example/commit/3640ce6bb6729c3b3d8a0c200a624996f8da8beb).
- 100+ parsing & printing issues fixed! The total open issues count went from almost 500 to <300.
- New error messages infra, by Fred. This solves lots of existing pain points with refmt error report: reserved keywords, missing semicolon, etc. More coming soon! **Please do give Fred a shout out on his [Twitter](https://twitter.com/let_def)**. Show that the JavaScript folks appreciate his help.
- Unification of `[@foo]`, `[@@foo]` and `[@@@foo]` into `[@foo]`. Labeled argument + type punning, JS object type sugar `{. "foo": string}`, string concat is now `++`, infix operators formatting tweaks, etc.
- We've now exposed [dedicated APIs](https://github.com/facebook/reason/tree/9c578b4e5ace89e8966fc9ec747d393985b05933#installation-for-programmatic-usage) for programmatic usage of the Reason parser and printer, `refmt`, for both native and web usage. In particular, the web version of `refmt` powers [Klipse](http://blog.klipse.tech/reason/2017/10/06/blog-reason.html), [reason-tools](https://github.com/reasonml/reason-tools), the Reason docs site, etc. If you're coming from JavaScript: `npm install --save reason` to get the single `refmt.js` script. It gzips to <350kb, so go wild and impress us with your `refmt` usages!\*
- **Aaaand yes, JS application/abstraction syntax (aka, parentheses around functions/parametrized types)**. Yes, you still get automatic currying; it's a pure syntactical change. Honestly, this point alone deserves its own post, but it opens the floodgates of [bikeshedding](http://whatis.techtarget.com/definition/Parkinsons-law-of-triviality-bikeshedding), so we're gonna refrain from writing one and will just watch you folks argue over this on Twitter (and pick the most creative rants and hang them on our wall!). More seriously, **if you deeply care about syntax**, then instead of shouting about the change publicly, voice your feedbacks/complains privately to [@_chenglou](https://twitter.com/_chenglou) and [@jordwalke](https://twitter.com/jordwalke). If you don't care about syntax, then great!

**How do I get it?**

- There's a **migration script** at https://github.com/reasonml/upgradeSyntaxFrom2To3. Use it. No manual syntax upgrade needed.
- Upgrade your [reason-cli](/guide/editor-tools/global-installation) to `3.0.0` (instead of the old `1.13.7`), for editor tooling.
- Upgrade your project's [BuckleScript](https://github.com/BuckleScript/bucklescript) to `2.0.0`.
- Set `"refmt": 3` in your `bsconfig.json`.
- Restart your editor.

- If you're working on native, it's `reason.3.0.0` on OPAM.

**How does this affect existing projects**?

- If you don't specify `"refmt": 3` in your `bsconfig.json`, nothing changes.
- Your third-party dependencies can still stay at version 2, vice-versa. Things will work as intended.
- Learning the new syntax? [Reason-tools](https://github.com/reasonml/reason-tools) now converts between syntaxes too!

- For native, the dependencies will have to upgrade the syntax first. We'll solve this better in the future.

Voilà!

**To see the full list of the changes**, please go to [HISTORY.md](https://github.com/facebook/reason/blob/master/HISTORY.md#300). Again, check the migration script so that you don't go and manually convert each file.

Thank you again, Fred, Iwan, Jared and all the others (hcarty, Sean, Jordan, Cristiano, Hongbo, Ricky, Andrey, etc.) for the whole effort.

\* If you format your own blog site's Reason code using it, the post's syntax can potentially stay always up-to-date without you needing to go and manually update the snippets. And yes, we have some crazy ideas around this soon.

### Messenger.com Now 50% Converted to Reason

*September 8, 2017*

Boom!

Messenger.com is the web version of Facebook Messenger; we also share code with facebook.com's inbox view and chat tabs. For over a year, the Reason team has been working directly on Messenger in order to integrate Reason + BuckleScript into the codebases. As of a while ago, we've reached 50% Reason code coverage!

#### Some Statistics

- Full rebuild of the Reason part of the codebase is ~2s (a few hundreds of files), incremental build (the norm) is **<100ms** on average. The BuckleScript author estimates that the build system should scale to a few hundred thousands files in the current condition.
- Messenger used to receive bugs reports on a daily basis; since the introduction of Reason, there have been a total of **10 bugs** (that's during the whole year, not per week)!
- Most of the messenger core team's new features are now developed in Reason.
- Dozens of massive refactors while iterating on ReasonReact. Refactoring speed went from days to hours to dozens of minutes. I don't think we've caused more than a few bugs during the process (counted toward the total number of bugs).
- Everyone writing Reason got promoted for quality engineering. Just kidding. But definitely high, long-term impact.

#### Which Team's Next?

We believe in iterating on/alongside product teams in order to create the best infra. The product teams' and open source folks' feedback has changed our strategy a few times, for the better. As of today, Reason and BuckleScript are also deployed on a WhatsApp internal tool, Instagram Web (small scale), plus some critical Ads internal tools. We'll be working closely with these teams over the next year.

We've successfully onboarded regular JavaScript folks to Reason; in the most extreme case, an intern with no JS knowledge was able to ship ReasonReact code in production (and made 0 bug while doing so). Give your own team a try! =)

A big thanks to all these teams' members, to Hongbo (BuckleScript author) and to the OCaml community (really, 50% Reason means 50% OCaml. We're nothing without you); and of course, to all of you folks in the community for being with us all this time. The best is yet to come.

See you soon!

### Way, Way, Waaaay Nicer Error Messages!

*August 25, 2017*

A picture's worth a thousand words.

Before:
<div style="width:744px">
  <img alt="before" src="https://user-images.githubusercontent.com/1909539/29709302-ab0c6aee-8940-11e7-953f-60a867d242cb.png" />
</div>
After:
<div style="width:742px">
  <img alt="before" src="https://user-images.githubusercontent.com/1909539/29709301-ab04eac6-8940-11e7-8d2b-c65f808b6be8.png" />
</div>

Sometimes when I'm busy working, some random colleague/Discord member would ping me and tell me "Yo Cheng Lou why are Reason's errors so bad? Why can't you be more like [Elm](http://elm-lang.org) Cheng Lou? Why? Look at how great Elm's errors are Cheng Lou, look."

In reality I'm pretty darn ashamed of our error messages; here we are, a type system with two decades of solid research and implementation, but sometimes presented to the end users as if it's something that'd get in their way.

No more! We've heard you loud and clear, and delivered you much improved error messages! A few things we did:

- Display the error-ing line(s), right inside the terminal.
- Better colors, for quicker visual search.
- Improved messages in many cases.
- Errors in Reason syntax for Reason files.
- A bit of breathing room between lines.

The last point is a tradeoff; errors end up taking more space. Seeing that you'd usually focus on a single error rather than trying to get an overview of all errors, we've deemed this tradeoff worthwhile, especially in the context of a big amount of build output. Considering the new warning format:
<div style="width:745px">
  <img alt="warning-after" src="https://user-images.githubusercontent.com/1909539/29711739-431be094-894b-11e7-87a6-bc1d6aeea043.png" />
</div>
Here's the same warning, old version, buried among other outputs:
<div style="width:745px">
  <img alt="warning-before" src="https://user-images.githubusercontent.com/1909539/29711789-810739f8-894b-11e7-8451-a919b3f119c6.png" />
</div>

At Messenger, we've seen people ship warnings to production not because they didn't want to fix them, but because they've **missed them**! It's not rocket science. Leave some negative space here and there. Color things appropriately. Voilà!

**The new errors can be turned on by adding `"bsc-flags": ["-bs-super-errors"]` to your bsconfig.json**, [like so](https://github.com/reasonml-community/reason-react-example/blob/6dc15bf5fbeeb184c99acb063f7644a0d14b12f4/bsconfig.json#L3). They're also available for [bsb-native](https://github.com/bsansouci/bsb-native). True to our stack's spirit, they're fast, simple to configure, and solid.

**One more thing**: we're vertically integrated common pitfalls of [ReasonReact](//reasonml.github.io/reason-react/) into these messages too, when applicable.

<div style="width:747px">
  <img alt="reason-react" src="https://user-images.githubusercontent.com/1909539/29712284-f1013bb2-894d-11e7-9596-1cca54d5c331.png" />
</div>

This is just the first of many iterations to come! Got a message you'd like to see explained better? File an issue [here](https://github.com/reasonml-community/error-message-improvement/issues)!

Enjoy =)

### Much Better Playground

*August 18, 2017*

Based on popular feedback, we've now improved our online [Try](/try) section. Highlights:

- Bidirectional conversion. Write Reason, get OCaml translation, vice-versa.
- Live evaluation, with console feedback in the lower-right section.
- Most of the [standard library](/api/index.html) is now loaded. Since we're evaluating on the web, This includes BuckleScript's [extra stdlib APIs](https://bucklescript.github.io/bucklescript/api/).
- Sharable code snippet! Just copy the URL.
- Some performance improvements.

Have fun!

### New website!

*July 14, 2017*

Notice anything different? =)

The new documentation website is built by our community member [Jared](https://jaredforsyth.com) (make sure to check his Reason blog posts too!). The new site keeps most of the same content from the old one, while providing a better structure to navigate through them. You'll notice "Suggest an edit" links all over the place. Take a look around!

(Built with [Gatsby](https://www.gatsbyjs.org))

### New ReasonReact version released

*June 12, 2017*

Very exciting release! Short version: ReasonReact now has its own documentation site [here](//reasonml.github.io/reason-react/). Accompanying this is the new [BuckleScript](https://www.npmjs.com/package/bs-platform) release. Both are non-breaking.

Enjoy!

### Spring Cleaning (First Blog Post!)

*May 18, 2017*

Now that the community is taking off, keeping folks up-to-date through [Discord](https://discord.gg/reasonml) and other existing channels became less ideal. We're starting a blog post section for this reason. In the spirit of the community, these posts will stay short and concise.

We've moved unused first-party projects from [GitHub/reasonml](https://github.com/reasonml/) to [GitHub/reasonml-old](https://github.com/reasonml-old). Old URLs are redirected, so no breakage here.

We've cleaned up the Reason codebase. Editor integrations moved out to their dedicated repos. Updated instructions are still [here](/guide/editor-tools/editors-plugins). Other Reason repo cleanups are still ongoing.

Some discord rooms got merged together. Fewer rooms, more focused discussions.

As you can see: this documentation site got a few rearrangements too. In general, if you'd like to contribute to docs, please ping us on Discord!
