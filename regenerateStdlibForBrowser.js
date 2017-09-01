// BuckleScript's standard library has a special integraton when used in the
// browser playground:
// https://github.com/BuckleScript/bucklescript/blob/d21cdfbbe61afb0ae6b79735765de949409947ea/jscomp/core/js_packages_info.ml#L174
// When you do `List.map`, it'll output `require('stdlib/list')`.

// To run this file: `node regenerateStdlibForBrowser.js`. The first time, it'll
// show you an error. Follow the message!

const fs = require('fs');
const path = require('path');
const browserify = require('browserify');

const b = browserify();

const stdlibDir = path.join(__dirname, 'static', 'js');

let stdlibDirFiles;
try {
  stdlibDirFiles = fs.readdirSync(stdlibDir);
} catch (e) {
  console.log(`
** There's an error while reading ${stdlibDir}. Is this your first time setting things up?
You need to copy the BuckleScript standard library files from here:
https://github.com/BuckleScript/bucklescript/tree/47e8fea03391b26d27dd7fe00fd6cb5e88eafc58/lib/js
into ${stdlibDir}.
(To upgrade the stdlib, use master's files)
This script will then call Browserify to bundle each file, while exposing them correctly in a global \`require\` you can use in the browser.`);
  process.exit(1);
};

stdlibDirFiles.forEach(file => {
  const exposedRequireName = path.join('stdlib', path.basename(file, '.js'));
  // map `require('stdlib/list')` from the playground to `require('./stdlib/list.js')`
  b.require(path.join(stdlibDir, file), {expose: exposedRequireName});
});

b
  .transform('uglifyify', { global: true })
  .require(path.join(__dirname, 'static', 'dummy.js'), {expose: 'fs'})
  .bundle()
  .pipe(fs.createWriteStream(path.join(__dirname, 'static', 'stdlibBundle.js')));
