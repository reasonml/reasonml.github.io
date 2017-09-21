![reason logo](src/images/reason_200.png)

# [Reason](https://github.com/facebook/reason) Website & Documentation

## Contribute

All pages are in [src/pages/](src/pages/). The markdown files under [src/pages/guide](src/pages/guide/) and [src/pages/community](src/pages/community/) are probably of most interest.

## Building

```
yarn install
npm run develop
```

That'll start a hot-loading server & you can make changes & see the results.

If you have push access, to deploy a new version of the site, go to the source branch and do:

```
npm run deploy
```

**Note**: the deployment is currently broken because of gatsby because of webpack because of chunking plugin, because that's life. We've currently cherry-picked the relevant changes into a stable branch called `good-for-deploy`. Deploy through that one.

The site uses GatsbyJS. For info on how it works, take a look at [their docs](https://www.gatsbyjs.org/docs/).

## Building the Playground

The playground uses a bundled JS version of Reason's refmt, [BuckleScript](https://github.com/BuckleScript/bucklescript) compiler, its standard library, etc.

To build the bundled standard library: Please read the documentation in `regenerateStdlibForBrowser.js`.

To build refmt and bs: make sure you've got closure compiler, OPAM, js_of_ocaml, reason, menhirLib and ocaml-migrate-parsetree installed, then invoke black magic at https://github.com/jaredly/bs-refmt-jsoo.

Then run the following on refmt.js and all:

```
java -jar closure.jar --create_source_map bundle.js.map --language_in ECMASCRIPT6 --compilation_level SIMPLE refmt.js > refmt-closure.js
```

Then rename it back to refmt.js.

Then cry a little and submit a PR to make the process better.
