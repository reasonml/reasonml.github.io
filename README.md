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

The site uses GatsbyJS. For info on how it works, take a look at [their docs](https://www.gatsbyjs.org/docs/).
