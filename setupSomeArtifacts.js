// To run this file: `node setupSomeArtifacts.js`. The first time, it'll
// show you an error. Follow the message!

const fs = require('fs');
const path = require('path');
const browserify = require('browserify');
const childProcess = require('child_process')

// === first task

const refmtFileSource = path.join(__dirname, 'node_modules', 'reason', 'refmt.js');
const refmtFileDest = path.join(__dirname, 'static', 'refmt.js');
try {
  fs.copyFileSync(refmtFileSource, refmtFileDest);
} catch(e) {
  console.log(`
** There's an error while reading ${refmtFileSource}. Make sure you've done \`yarn install\`.`);
  process.exit(1)
}

// === second task

// BuckleScript's standard library has a special integration when used in the
// browser playground:
// https://github.com/BuckleScript/bucklescript/blob/d21cdfbbe61afb0ae6b79735765de949409947ea/jscomp/core/js_packages_info.ml#L174
// When you do `List.map`, it'll output `require('stdlib/list')`.

const b = browserify();

const stdlibDir = path.join(__dirname, 'static', 'js');

let stdlibDirFiles;
try {
  stdlibDirFiles = fs.readdirSync(stdlibDir);
} catch (e) {
  console.log(`
** There's an error while reading ${stdlibDir}. Is this your first time setting things up?
You need to copy the BuckleScript standard library files from here:
https://github.com/BuckleScript/bucklescript/tree/42f4fc0cef22632b6e986f31c0cb312f6dd200b7/lib/js
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

// === third task

// Bundle BuckleScript compiler with ReasonReact .cmi and .cmj files:
// 1. compile ReasonReact with bsb
// 2. serialize ReasonReact .cmi and .cmj files
// 3. bundle them with BuckleScript compiler (bs.js)

/** Serialize a .cmi or a .cmj to a string that can be passed to
  * ocaml.load_module
  *
  * This function reads a binary file and produce a JS string containing
  * hex escape sequences. This string gets appended to the file specified
  * by the second parameter.
  *
  * Based on https://github.com/ocsigen/js_of_ocaml/blob/master/compiler/lib/js_output.ml#L279
  */
function serializeBinary(binFileName, jsFileName) {
  const binContent = fs.readFileSync(binFileName, "binary");
  const binLength = binContent.length;
  const arrayStr1 = [];
  for (let i = 0; i < 256; i++) {
    arrayStr1.push(String.fromCharCode(i));
  }
  const arrayConv = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  const fd = fs.openSync(jsFileName, "a");
  fs.writeSync(fd, "\"");
  for (let i = 0, i_finish = binLength - 1 | 0; i <= i_finish; i++) {
    const c = binContent.charCodeAt(i);
    let exit = 0;
    if (c >= 32) {
      if (c >= 127) {
        if (c >= 128) {
          fs.writeSync(fd, "\\x");
          fs.writeSync(fd, arrayConv[(c >>> 4)]);
          fs.writeSync(fd, arrayConv[c & 15]);
        } else {
          exit = 1;
        }
      } else if (c !== 92) {
        if (c === /* "\"" */34) {
          fs.writeSync(fd, "\\");
          fs.writeSync(fd, arrayStr1[c]);
        } else {
          fs.writeSync(fd, arrayStr1[c]);
        }
      } else {
        fs.writeSync(fd, "\\\\");
      }
    } else if (c >= 14) {
      exit = 1;
    } else {
      switch (c) {
        case 0 :
            if (i === (binLength - 1 | 0) || binContent.charCodeAt(i + 1 | 0) < /* "0" */48 || binContent.charCodeAt(i + 1 | 0) > /* "9" */57) {
              fs.writeSync(fd, "\\0");
            } else {
              exit = 1;
            }
            break;
        case 8 :
            fs.writeSync(fd, "\\b");
            break;
        case 9 :
            fs.writeSync(fd, "\\t");
            break;
        case 10 :
            fs.writeSync(fd, "\\n");
            break;
        case 1 :
        case 2 :
        case 3 :
        case 4 :
        case 5 :
        case 6 :
        case 7 :
        case 11 :
            exit = 1;
            break;
        case 12 :
            fs.writeSync(fd, "\\f");
            break;
        case 13 :
            fs.writeSync(fd, "\\r");
            break;

      }
    }
    if (exit === 1) {
      fs.writeSync(fd, "\\x");
      fs.writeSync(fd, arrayConv[(c >>> 4)]);
      fs.writeSync(fd, arrayConv[c & 15]);
    }

  }
  fs.writeSync(fd, "\"");
  fs.closeSync(fd);
  return /* () */0;
}

const compileReasonReactCmd = `bsb -clean-world -make-world`;
const execConfig = {
  cwd: path.join(__dirname, 'node_modules', 'reason-react'),
  encoding: 'utf8',
  stdio: [0, 1, 2],
  shell: true
};
childProcess.execSync(compileReasonReactCmd, execConfig);

const reasonReactBsDir = path.join(__dirname, 'node_modules', 'reason-react', 'lib', 'bs', 'src');
const modules = [
  {
    cmi: path.join(reasonReactBsDir, 'reactDOMRe.cmi'),
    cmj: path.join(reasonReactBsDir, 'reactDOMRe.cmj')
  },
  {
    cmi: path.join(reasonReactBsDir, 'reactDOMServerRe.cmi'),
    cmj: path.join(reasonReactBsDir, 'reactDOMServerRe.cmj'),
  },
  {
    cmi: path.join(reasonReactBsDir, 'reactEventRe.cmi'),
    cmj: path.join(reasonReactBsDir, 'reactEventRe.cmj'),
  },
  {
    cmi: path.join(reasonReactBsDir, 'reasonReact.cmi'),
    cmj: path.join(reasonReactBsDir, 'reasonReact.cmj'),
  },
  {
    cmi: path.join(reasonReactBsDir, 'reasonReactOptimizedCreateClass.cmi'),
    cmj: path.join(reasonReactBsDir, 'reasonReactOptimizedCreateClass.cmj'),
  },
];

const bsFilename = path.join(__dirname, 'static', 'bs.js');
const bsReasonReactFilename = path.join(__dirname, 'static', 'bsReasonReact.js');
fs.copyFileSync(bsFilename, bsReasonReactFilename);
modules.forEach(module => {
  const cmi = module.cmi
  const cmiBasename = path.basename(cmi);
  fs.appendFileSync(bsReasonReactFilename,
                   `ocaml.load_module("/cmis/${cmiBasename}", `);
  serializeBinary(cmi, bsReasonReactFilename);
  const cmj = module.cmj
  const cmjBasename = path.basename(cmj);
  fs.appendFileSync(bsReasonReactFilename,
                   `, "${cmjBasename}", `);
  serializeBinary(cmj, bsReasonReactFilename);
  fs.appendFileSync(bsReasonReactFilename, ');\n');
});


// === fourth task

// Bundle React and ReasonReact

const reactFile = path.join(__dirname, 'node_modules', 'reason-react', 'node_modules', 'react', 'index.js');
b.require(reactFile, {expose: "react"});

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
  const exposedRequireName = path.join('stdlib', path.basename(file, '.js'));
  b.require(path.join(reasonReactJsDir, file), {expose: exposedRequireName});
});

b
  .transform('uglifyify', { global: true })
  .bundle()
  .pipe(fs.createWriteStream(path.join(__dirname, 'static', 'reasonReactBundle.js')));
