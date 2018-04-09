# Reason Website

This code is used to generate https://reasonml.github.io. It pulls in files from `docs/` and `website/` to generate html files served on the site.

`website/` contains the JS, CSS, images and other files (and blog, which contains some markdown files too, these are separated from `docs/`, not too important).

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

# Build the Playground

```
cd website && yarn
```

For modifying the actual try playground source code, run `yarn bundle-try-playground:dev` to start a watcher. Once you're done, run `yarn bundle-try-playground:prod` once.

If you're hardcore and want to build the actual `bsReasonReact.js`, `refmt.js`, `stdlibBundle.js`, `reasonReactBundle.js` or `jsoo_reactjs_jsx_ppx_v2.js`, then run the following

- `cd website && yarn`
- `yarn prepare`
- `node setupSomeArtifacts.js`

This only needs to be run once (per bs-platform/reason-react update). This step _will_ break the first time you do it, from some BS syncing stuff. Go into your cloned `bucklescript` project and go in `jscomp` and do the following:

- Modify `repl.js`'s occurrences of `js_of_ocaml` to an absolute path that points to it. You can get a `js_of_ocaml` binary from another opam switch that's not `4.02.3+buckle-master`:
  ```sh
  opam switch 4.02.3
  eval `opam config env`
  opam install js_of_ocaml.3.0
  which js_of_ocaml # use this absolute path for the task above
  # switch back now
  opam switch 4.02.3+buckle-master
  eval `opam config env`
  ```
- Back to `repl.js`, change the one occurrences of `amdjs` to `js`
- Run:
  ```sh
  BS_PLAYGROUND=path/to/your/reasonml.github.io/website/playground/bs/ node repl.js
  npm install -g ..
  ```

If this command fails, ping @chenglou in Discord.
