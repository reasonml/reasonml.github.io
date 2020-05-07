// To run this file: `node setupSomeArtifacts.js`. The first time, it'll
// show you an error. Follow the message!

const fs = require('fs');
const path = require('path');
const browserify = require('browserify');
const envify = require('envify/custom');
const childProcess = require('child_process')

const playgroundDir = path.join(__dirname, 'playground');
const docusaurusJsDir = path.join(__dirname, 'static', 'js');

// === first task

console.log("1. Copying refmt.js");

const refmtFileSource = path.join(__dirname, 'node_modules', 'reason', 'refmt.js');
const refmtFileDest = path.join(docusaurusJsDir, 'refmt.js');
fs.copyFileSync(refmtFileSource, refmtFileDest);

// === second task

// BuckleScript's standard library has a special integration when used in the
// browser playground:
// https://github.com/BuckleScript/bucklescript/blob/d21cdfbbe61afb0ae6b79735765de949409947ea/jscomp/core/js_packages_info.ml#L174
// When you do `List.map`, it'll output `require('stdlib/list')`.

console.log("2. Bundling bs stdlib");

const b = browserify();

const stdlibDir = path.join(playgroundDir, 'bs', 'stdlib');

fs
  .readdirSync(stdlibDir)
  .filter(file => path.extname(file) === '.js')
  .forEach(file => {
    const exposedRequireName = './stdlib/' + path.basename(file);
    // map `require('stdlib/list')` from the playground to `require('./stdlib/list.js')`
    b.require(path.join(stdlibDir, file), {expose: exposedRequireName});
  });

b
  .transform('uglifyify', { global: true })
  .require(path.join(playgroundDir, 'dummy.js'), {expose: 'fs'})
  .bundle()
  .pipe(fs.createWriteStream(path.join(docusaurusJsDir, 'stdlibBundle.js')));

// === third task

// Copy the resulting exports.js from playground folder

console.log("3. Copy exports.js to playground folder");

const bsFilename = path.join(playgroundDir, 'bs', 'exports.js');
const bsReasonReactFilename = path.join(docusaurusJsDir, 'bsReasonReact.js');
fs.copyFileSync(bsFilename, bsReasonReactFilename);

// === fourth task

// Bundle React and ReasonReact

function lowercaseFirstLetter(s) {
  return s && s[0].toLowerCase() + s.slice(1);
}

console.log("4. Bundling React+ReasonReact");

const b2 = browserify();

const reactFile = path.join(__dirname, 'node_modules', 'react', 'cjs', 'react.production.min.js');
b2.require(reactFile, {expose: "react"});

const reasonReactJsDir = path.join(__dirname, 'node_modules', 'reason-react', 'lib', 'js', 'src');
let reasonReactDirFiles;
try {
  reasonReactDirFiles = fs.readdirSync(reasonReactJsDir);
} catch (e) {
  console.log(`
** There's an error while reading ${reasonReactJsDir}.`);
  process.exit(1);
};
reasonReactDirFiles.forEach(file => {
  const exposedRequireName = './stdlib/' + lowercaseFirstLetter(path.basename(file));
  b2.require(path.join(reasonReactJsDir, file), {expose: exposedRequireName});
});

b2
  .transform(envify({NODE_ENV: 'production'}), {global: true})
  .transform('uglifyify', { global: true })
  .bundle()
  .pipe(fs.createWriteStream(path.join(docusaurusJsDir, 'reasonReactBundle.js')));
