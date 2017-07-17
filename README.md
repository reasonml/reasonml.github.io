![reason logo](src/images/reason_200.png)

# The Reason website & documentation

Uses [gatsby](https://www.gatsbyjs.org/).

## Organization
All pages are in [src/pages/](src/pages/). The markdown files under
[src/pages/guide](src/pages/guide/) and
[src/pages/community](src/pages/community/) are probably of most interest.

## Building

```
npm install
npm run develop
```

That'll start a hot-loading server & you can make changes & see the results.

If you have push access, to deploy a new version of the site, go to the source branch and do:

```
npm run deploy
```

For info on how gatsby works, take a look at [their docs](https://www.gatsbyjs.org/docs/).
