# Reason Website

This code is used to generate https://reasonml.github.io. It pulls in files from `docs/` and `website/` to generate html files served on the site.

`website/` contains the JS, CSS, images and other files (and blog, which contains some markdown files too, these are separated from `docs/`, not too important).

To rebuild the playground, you will need `bs-platform` installed globally
(`npm install -g bs-platform`).

`cd website && npm install && npm start` to start the development server & watcher.

Don't use `npm build`. It's mostly for debugging.

In the end, we spit out normal HTML, with all the JS dependencies (barring a few critical ones) removed, including ReactJS itself. It's a full, static website, super lightweight, portable, unfancy but good looking. Works with JS turned off too.

Two special files:

- `sidebars.json`: lists the sections.
- `siteConfig.json`: some header and i18n configs.

During your development, most changes will be picked up at each browser refresh. If you touch these two files or `blog/`, however, you'll have to restart the server to see the changes.

## Translations

The entire site can be translated via the [Crowdin project](https://crowdin.com/project/reason). This repo only has the canonical english documentation. Don't manually edit things in `i18n/`.

## Debugging

`console.log`s appear in your terminal! Since the site itself is React-free.

## Building and Deploying

Changes from `source` branch are automatically picked into `master` branch by CI, then published. Translation download/uploads are still manual right now (needs API key, which @rickyvetter and @chenglou have).
