# Reason Website

This code is used to generate https://reasonml.github.io. It pulls in files from `docs/` and `website/` to generate HTML files served on the site.

`website/` contains the JS, CSS, images and other files (and some markdown files in `blog` which are separated from `docs/`; it's not too important).

`cd website && npm install && npm run start` to start the development server & watcher.

Don't use `npm run build`. It's mostly for debugging.

In the end, we spit out normal HTML with all but a few critical JS dependencies removed, including ReactJS itself. It's a full static website: super lightweight, portable, unfancy, but good looking. And it works with JS turned off!

Two special files:

- `sidebars.json`: lists the sections.
- `siteConfig.json`: some header and i18n configs.

During your development, most changes will be picked up at each browser refresh. If you touch these two files or `blog/`, however, you'll have to restart the server to see the changes.

## Translations

The entire site can be translated via the [Crowdin project](https://crowdin.com/project/reason). This repo only has the canonical English documentation. Don't manually edit things in `i18n/`.

## Debugging

`console.log`s appear in your terminal! Since the site itself is React-free.

## Building and Deploying

Changes from the `source` branch are automatically picked into `master` branch by CI and then published.

# Building the Playground

```
cd website && npm install
```

For modifying the actual try playground source code, run `npm run bundle-try-playground:dev` to start a watcher. Once you're done, run `npm run bundle-try-playground:prod` once.

## Building with custom BuckleScript/etc

To build the actual `bsReasonReact.js`, `refmt.js`, `stdlibBundle.js`, `reasonReactBundle.js`:

You'll need to have this repository and the [BuckleScript](https://github.com/BuckleScript/bucklescript) repository cloned. These will likely be next to each other in the directory structure.

1. Inside the BuckleScript repository, follow the [Setup](https://github.com/BuckleScript/bucklescript/blob/master/CONTRIBUTING.md#setup) guide.

2. Follow the [Contributing to the BS Playground Bundle](https://github.com/BuckleScript/bucklescript/blob/7.0.1/CONTRIBUTING.md#contributing-to-the-bs-playground-bundle) guide.

3. Run `BS_PLAYGROUND=../../reasonml.github.io/website/playground/bs node scripts/repl.js`

4. Inside the `reasonml.github.io` repository, run `cd website && yarn`

5. Then run, `yarn prepare` in the same place.

6. Finally, run `node setupSomeArtifacts.js`

If this command fails, ping @chenglou in Discord.
