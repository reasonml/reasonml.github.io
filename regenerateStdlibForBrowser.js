// assuming you're in this directory, and installed all the dependencies for this project in the parent directory through `yarn`
const fs = require('fs');
const path = require('path');
const browserify = require('browserify');

const b = browserify();

const stdlibDir = path.join(__dirname, 'stdlib');

const asd = fs.readdirSync(stdlibDir).forEach(file => {
  const exposedRequireName = path.join('stdlib', path.basename(file, '.js'));
  b.require(path.join(stdlibDir, file), {expose: exposedRequireName});
});

b.bundle().pipe(fs.createWriteStream(path.join(__dirname, 'stdlibBundle.js')));
