# Reason Website

This code is used to generate https://reasonml.github.io. It pulls in files from `docs/` and `website/` to generate html files served on the site.

`website/` contains the JS, CSS, images and other files (and blog, which contains some markdown files too, these are separated from `docs/`, not too important).

`cd website && yarn && yarn start` to start the development server & watcher.

Don't use `yarn build`. It's mostly for debugging.

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

Changes from `source` branch are automatically picked into `master` branch by CI, then published.

# Build the Playground

```
cd website && yarn
```

For modifying the actual try playground source code, run `yarn bundle-try-playground:dev` to start a watcher. Once you're done, run `yarn bundle-try-playground:prod` once.

## Building with custom BuckleScript/etc

To build the actual `bsReasonReact.js`, `refmt.js`, `stdlibBundle.js`, `reasonReactBundle.js`:

You'll need to have this repository and the [BuckleScript](https://github.com/BuckleScript/bucklescript) repository cloned. These will likely be next to each other in the directory structure.

1. Inside the BuckleScript repository, follow the [Setup](https://github.com/BuckleScript/bucklescript/blob/master/CONTRIBUTING.md#setup) guide.

2. Navigate to the `jscomp` directory in the BuckleScript repository.

3. Install or switch to `js_of_ocaml` 3.0 using:

```sh
opam switch 4.02.3
eval `opam config env`
opam install js_of_ocaml.3.0
which js_of_ocaml # use this absolute path for the task above or symlink this into your $PATH, maybe /usr/local/bin or something
# switch back now
opam switch 4.02.3+buckle-master
opam install ocp-ocamlres
eval `opam config env`
```

4. Inside `jscomp`, either modify `repl.js`'s occurrences of `js_of_ocaml` to an absolute path that points to it or symlink `js_of_ocaml` into your `$PATH`.

5. Run `BS_PLAYGROUND=../../reasonml.github.io/website/playground/bs/ node repl.js`

6. Inside the `reasonml.github.io` repository, run `cd website && yarn`

7. Then run, `yarn prepare` in the same place.

8. Finally, run `node setupSomeArtifacts.js`

If this command fails, ping @chenglou in Discord.
