import React from 'react';
import ReactDOM from 'react-dom';
import AnsiUp from 'ansi_up';
import debounce from './utils/debounce';
import * as lzString from 'lz-string';
import codemirror from 'codemirror';

import javascript from 'codemirror/mode/javascript/javascript';
import mllike from 'codemirror/mode/mllike/mllike';
import rust from 'codemirror/mode/rust/rust';

const compress = lzString.compressToEncodedURIComponent;
const decompress = lzString.decompressFromEncodedURIComponent;

let ansiUp = new AnsiUp();

class CodeMirror extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.editor = codemirror(this.div, this.props.options);
    this.editor.setValue(this.props.value)

    this.editor.on('change', (cm, metadata) => {
      const value = this.editor.getValue();
      if (value !== this.props.value && this.props.onChange) {
          this.props.onChange(value)
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value && nextProps.value !== this.editor.getValue()) {
      this.editor.setValue(nextProps.value);
    }
  }

  render() {
    return (
      <div className={this.props.className} ref={div => this.div = div}/>
    )
  }
}

class PreviewPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="preview" className="cleanslate">
        <p>
          This div has the ID <code>preview</code>.
        </p>
        <p>
          Feel free to override its content, or choose "React Greetings"
          in the Examples menu!
        </p>
      </div>
    )
  }
}

const examples = [{
  name: 'Tree sum',
  code:
`type tree = Leaf | Node(int, tree, tree);

let rec sum = (item) => {
  switch (item) {
  | Leaf => 0
  | Node(value, left, right) => value + sum(left) + sum(right);
  }
};

let myTree =
  Node(
    1,
    Node(2, Node(4, Leaf, Leaf), Node(6, Leaf, Leaf)),
    Node(3, Node(5, Leaf, Leaf), Node(7, Leaf, Leaf))
  );

Js.log(sum(myTree));`
}, {
  name: 'FFI - Base64',
  code:
`[@bs.val] external btoa : string => string = "";
[@bs.val] external atob : string => string = "";

let text = "Hello World!";
Js.log(btoa(text));
Js.log(text |. btoa |. atob);`
}, {
  name: 'Factorial',
  code:
`/* Based on https://rosettacode.org/wiki/Factorial#Recursive_50 */
let rec factorial = (n) =>
  n <= 0
  ? 1
  : n * factorial(n - 1);

Js.log(factorial(6));`
}, {
  name: 'Greatest Common Divisor',
  code:
`/* Based on https://rosettacode.org/wiki/Greatest_common_divisor#OCaml */
let rec gcd = (a, b) =>
  switch (a mod b) {
  | 0 => b
  | r => gcd(b, r)
  };

Js.log(gcd(27, 9));`
}, {
  name: 'Towers of Hanoi',
  code:
`/* Based on https://rosettacode.org/wiki/Towers_of_Hanoi#OCaml */
let rec hanoi = (n, a, b, c) =>
  if (n > 0) {
    hanoi(n - 1, a, c, b);
    Js.log({j|Move disk from pole $a to pole $b|j});
    hanoi(n - 1, c, b, a)
  };

hanoi(4, 1, 2, 3);`
}, {
  name: 'Json',
  code:
`open Belt;

[@bs.deriving abstract]
type fullName = {
  first: string,
  last: string,
};

[@bs.deriving abstract]
type person = {
  name: fullName,
  age: int,
};

let person1 = person(~name=fullName(~first="Ricky", ~last="Zhang"), ~age=10);

/* encode person1, then decode it */
let json =
  person1
  |. Js.Json.stringifyAny
  |. Option.getExn
  |. Js.Json.parseExn;

let name =
  json
  |. Js.Json.decodeObject
  |. Option.flatMap(p => Js.Dict.get(p, "name"))
  |. Option.flatMap(json => Js.Json.decodeObject(json))
  |. Option.getExn;

let firstName =
  Js.Dict.get(name, "first")
  |. Option.flatMap(json => Js.Json.decodeString(json))
  |. Option.getExn;

let lastName =
  Js.Dict.get(name, "last")
  |. Option.flatMap(json => Js.Json.decodeString(json))
  |. Option.getExn;

Js.log({j|Hello, $firstName $lastName|j});`
}, {
  name: 'FizzBuzz',
  code:
`/* Based on https://rosettacode.org/wiki/FizzBuzz#OCaml */
let fizzbuzz = (i) =>
  switch (i mod 3, i mod 5) {
  | (0, 0) => "FizzBuzz"
  | (0, _) => "Fizz"
  | (_, 0) => "Buzz"
  | _ => string_of_int(i)
  };

for (i in 1 to 100) {
  Js.log(fizzbuzz(i))
};`
}, {
  name: 'Normal distribution of random numbers',
  code:
`/* Based on https://rosettacode.org/wiki/Random_numbers#OCaml */
let pi = 4. *. atan(1.);

let random_gaussian = () =>
  1. +. sqrt((-2.) *. log(Random.float(1.))) *. cos(2. *. pi *. Random.float(1.));

Belt.Array.makeBy(42, (_) => random_gaussian()) |. Belt.Array.forEach(Js.log);`
}, {
  name: 'Regex',
  code:
`let input = {|
  <html>
    <head>
      <title>A Simple HTML Document</title>
    </head>
    <body>
      <p>This is a very simple HTML document</p>
      <p>It only has two paragraphs</p>
    </body>
  </html>
|};

let result = Js.String.match([%re {|/<p>(.*?)<\\/p>/gi|}], input);

switch (result) {
| Some(result) => Js.Array.forEach(Js.log, result)
| None => Js.log("no matches")
};`
}, {
  name: 'String interpolation',
  code:
`for (a in 1 to 10) {
  for (b in 1 to 10) {
    let product = a * b;
    Js.log({j|🐙 $a times $b is $product|j})
  }
};`
}, {
  name: 'React Greetings',
  code:
`[@bs.config {jsx: 3}];

module Greeting = {
  [@react.component]
  let make = () => {
    <button> {React.string("Hello!")} </button>
  };
};

ReactDOMRe.renderToElementWithId(<Greeting />, "preview");`
}, {
  name: 'React Hooks',
  code:
`[@bs.config {jsx: 3}];

module Counter = {
  [@react.component]
  let make = (~name) => {
    let (count, setCount) = React.useState(() => 0);

    <div>
      <p> {React.string(name ++ " clicked " ++ string_of_int(count) ++ " times")} </p>
      <button onClick={_ => setCount(_ => count + 1)}>
        {React.string("Click me")}
      </button>
    </div>
  };
};

ReactDOMRe.renderToElementWithId(<Counter name="Counter" />, "preview");`
}, {
  name: '(Legacy Record API) ReasonReact Greetings',
  code:
`module Greeting = {
  let component = ReasonReact.statelessComponent("Greeting");
  let make = _children => {
    ...component,
    render: _self =>
      <button> (ReasonReact.string("Hello!")) </button>,
  };
};

ReactDOMRe.renderToElementWithId(<Greeting />, "preview");`
}];

// https://davidwalsh.name/query-string-javascript
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const retrieve = () => {
  function fromLocalStorage() {
    try {
      const json = localStorage.getItem('try-reason');
      let result = json && JSON.parse(json);
      result.useReasonReactJSX = result.hasOwnProperty('useReasonReactJSX')
        ? result.useReasonReactJSX
        : true
      result.code = result.code || '';
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  const fallbackDefault = {
    language: 'reason',
    code: examples[0].code,
    useReasonReactJSX: true
  };

  const isReason = !!getUrlParameter('reason');
  const isOCaml = !!getUrlParameter('ocaml');
  const useReasonReactJSX = getUrlParameter('rrjsx') !== 'false';

  if (isReason) {
    const compressedCode = getUrlParameter('reason');
    return {
      language: 'reason',
      useReasonReactJSX,
      code: decompress(compressedCode)
    }
  } else if (isOCaml) {
    const compressedCode = getUrlParameter('ocaml');
    return {
      language: 'ocaml',
      useReasonReactJSX,
      code: decompress(compressedCode)
    }
  } else {
    return (fromLocalStorage() || fallbackDefault)
  }
};

const generateShareableUrl = (language, code, useReasonReactJSX) => {
  let result = window.location.origin +
    window.location.pathname +
    '?rrjsx=' + useReasonReactJSX +
    '&' + language + '=' + compress(code);

  return result;
}

const persist = debounce((language, code, useReasonReactJSX) => {
  try {
    localStorage.setItem('try-reason', JSON.stringify({ language, code, useReasonReactJSX }));
  } catch (e) {
    console.error(e);
  }

  // avoid a refresh of the page; we also don't want every few keystrokes to
  // create a new history for the back button, so replace the current one
  window.history.replaceState(null, '', generateShareableUrl(language, code, useReasonReactJSX));
}, 100);

const errorTimeout = 500

class ShareButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmation: false
    }
    this.onClick = () => {
      this.props.onClick();
      this.setState({showConfirmation: true});
      setTimeout(() => this.setState({showConfirmation: false}), 2000);
    }
  }

  render() {
    const {url} = this.props;
    const {showConfirmation} = this.state;

    return (
      <div className={this.props.className}>
        <input
          id="shareableUrl"
          value={this.props.url}
          readOnly
        />
        <div onClick={this.onClick}>Share</div>
        <span className="try-tooltip">
          <span className="arrow"></span>
          {showConfirmation ? 'Copied': 'Click to copy to clipboard'}
        </span>
      </div>
    );
  }
}

const formatErrorLocation = ({startLine, startLineStartChar, endLine, endLineEndChar}) => {
  if (startLine === endLine) {
    if (startLineStartChar === endLineEndChar) {
      return `Line ${startLine}:${startLineStartChar}`
    } else {
      return `Line ${startLine}:${startLineStartChar}-${endLineEndChar}`
    }
  } else {
    return `Line ${startLine}:${startLineStartChar}-Line ${endLine}:${endLineEndChar}`
  }
};

const stripErrorNumberFromReasonSyntaxError = (error) => {
  return error.replace(/\d+: /, '');
}

const capitalizeFirstChar = (str) => {
  if (str.length === 0) return '';
  return str[0].toUpperCase() + str.slice(1);
};

class Try extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reason: '/* loading */',
      reasonSyntaxError: null,
      ocaml: '(* loading *)',
      js: '// loading',
      jsIsLatest: false,
      useReasonReactJSX: getUrlParameter('rrjsx') !== 'false',
      output: [],
      shareableUrl: '',
      errorsFromCompilation: null,
    }

    this.previewPanel = React.createRef();

    this._output = item =>
      this.setState(state => ({
        output: state.output.concat(item)
      }));

    this.output = item => {
      if (this.outputOverloaded)
        return;

      if (this.state.output.length > 100) {
        this.outputOverloaded = true;
        this._output({ type: 'error', contents: ['[Too much output!]']})
        return;
      }

      this._output(item);
    }

    this.initEvalWorker = () => {
      this.evalWorker = new Worker('/js/evalWorker.js');
      this.evalWorker.onmessage = ({data}) => {
        if (data.type === 'end') {
          clearTimeout(data.contents);
        } else {
          this.output(data);
        }
      }
      this.evalWorker.onerror = err => {
        this.errorTimerId = setTimeout(
          () => this.setState(_ => ({
            jsError: err
          })),
          errorTimeout
        );
      }
    }

    this.evalJs = (code) => {
      // Remove the currently rendered DOM elements when the code changes
      ReactDOM.unmountComponentAtNode(this.previewPanel.current);
      // Then reset to the default PreviewPanel
      // TODO: Is there a better way to do this?
      ReactDOM.render(<PreviewPanel />, this.previewPanel.current);
      this.outputOverloaded = false;
      const requireReactString = 'var React = require("react");';
      const requireReasonReactString = 'var ReasonReact = require("stdlib/reasonReact");';
      this.setState(
        state => ({ output: [] }),
        () => {
          // the code to evaluate might be expensive, so we're sending it into a
          // worker. But if it's DOM manipulation, then don't use it; worker
          // doesn't have access to DOM
          if (code.indexOf(requireReactString) >= 0 || code.indexOf(requireReasonReactString) >= 0) {
            // https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval
            const eval2 = eval;
            try {
              const codeWithExports = 'const exports = {};' + code;
              eval2(codeWithExports);
            } catch(e) {
              this.errorTimerId = setTimeout(
                () => this.setState(_ => {
                  return {
                    reasonSyntaxError: null,
                    ocamlSyntaxError: null,
                    jsError: e,
                    js: '',
                    ocaml: '',
                    output: [],
                  }
                }),
                errorTimeout
              )
            }
          } else {
            const timerId = setTimeout(() => {
              this.evalWorker.terminate();
              this.initEvalWorker();
              this._output({type: 'error', contents: ['[Evaluation timed out!]']});
            }, 1000);
            this.evalWorker.postMessage({
              code: wrapInExports(code),
              timerId
            });
          }
        }
      )
    }

    this.updateReason = (newReasonCode, forceUpdate) => {
      if (newReasonCode === this.state.reason && !forceUpdate) return
      persist('reason', newReasonCode, this.state.useReasonReactJSX);
      clearTimeout(this.errorTimerId)

      this.setState((prevState, _) => {
        let newOcamlCode = prevState.ocaml;
        try {
          newOcamlCode = window.printML(window.parseRE(newReasonCode))


          this.tryCompiling(newReasonCode, newOcamlCode)
        } catch (e) {
          this.errorTimerId = setTimeout(
            () => this.setState(_ => {
              return {
                reasonSyntaxError: e,
                ocamlSyntaxError: null,
                errorsFromCompilation: null,
                jsError: null,
                js: '',
                ocaml: '',
                output: [],
              }
            }),
            errorTimeout
          )
        }

        return {
          reason: newReasonCode,
          ocaml: newOcamlCode,
          reasonSyntaxError: null,
          ocamlSyntaxError: null,
          jsError: null,
          shareableUrl: generateShareableUrl('reason', newReasonCode, this.state.useReasonReactJSX)
        }
      });
    }

    this.updateOCaml = (newOcamlCode) => {
      if (newOcamlCode === this.state.ocaml) return;
      persist('ocaml', newOcamlCode, this.state.useReasonReactJSX);

      clearTimeout(this.errorTimerId)

      this.setState((prevState, _) => {
        let newReasonCode = prevState.reason;
        try {
          newReasonCode = window.printRE(window.parseML(newOcamlCode))

          this.tryCompiling(newReasonCode, newOcamlCode)
        } catch (e) {
          this.errorTimerId = setTimeout(
            () => this.setState(_ => {
              return {
                ocamlSyntaxError: e,
                reasonSyntaxError: null,
                jsError: null,
                js: '',
                reason: '',
                output: [],
              }
            }),
            errorTimeout
          )
        }

        return {
          reason: newReasonCode,
          ocaml: newOcamlCode,
          reasonSyntaxError: null,
          ocamlSyntaxError: null,
          jsError: null,
          shareableUrl: generateShareableUrl('ocaml', newOcamlCode, this.state.useReasonReactJSX)
        }
      });
    }

    this.reformat = () => {
      clearTimeout(this.errorTimerId)

      this.setState((prevState, _) => {
        let newReasonCode = prevState.reason;
        try {
          newReasonCode = window.printRE(window.parseRE(newReasonCode))
        } catch (e) {
          this.errorTimerId = setTimeout(
            () => this.setState(_ => {
              return {
                reasonSyntaxError: e,
              }
            }),
            errorTimeout
          )
        }

        persist('reason', newReasonCode, this.state.useReasonReactJSX);
        return {
          reason: newReasonCode,
          reasonSyntaxError: null,
          shareableUrl: generateShareableUrl('reason', newReasonCode, this.state.useReasonReactJSX)
        }
      });
    }

    this.compile = (code) => {
      const _consoleError = console.error;
      let errs = '';
      console.error = (...args) => {
        return args.forEach(argument => {
          // this is a warning we get:
          // WARN: File "js_cmj_load.ml", line 53, characters 23-30 ReactDOMRe.cmj not found
          // TODO: not sure why; investigate into it
          if (argument.indexOf('WARN: File "js_cmj_load.ml"') < 0) {
            errs += argument + '\n'
          }
        });
      }
      let res = window.ocaml.compile_super_errors_ppx_v2(code);
      console.error = _consoleError;
      // super-errors pads the line with two spaces. Remove them can't just do
      // it in the above args.forEach, since every console.error msg might
      // contain multiple line breaks
      let startPadding = /^  /gm;
      let noFileName = /\(No file name\)/gm;
      errs = errs
        .replace(startPadding, '')
        .replace(noFileName, 'OCaml preview')
      return [res, errs];
    }

    this.tryCompiling = debounce((reason, ocaml) => {
      try {
        const [res, errs] = this.compile(ocaml);
        if (res.js_code) {
          this.setState(_ => ({
            js: res.js_code,
            jsIsLatest: true,
            errorsFromCompilation: errs
          }));
          this.evalJs(res.js_code);
          return
        } else {
          this.errorTimerId = setTimeout(
            () => this.setState(_ => ({
              errorsFromCompilation: errs,
              js: '',
            })),
            errorTimeout
          )
        }
      } catch (err) {
        this.errorTimerId = setTimeout(
          () => this.setState(_ => ({
            errorsFromCompilation: err,
            js: '',
          })),
          errorTimeout
        )
      }
      this.setState(_ => {
        return {
          errorsFromCompilation: null,
          jsIsLatest: false,
          output: [],
        }
      })
    }, 100)

    this.copyShareableUrl = () => {
      let input = document.getElementById('shareableUrl');
      input.select();
      document.execCommand('copy');
    }

    this.toggleUseReasonReact = () => {
      this.setState(_ => {
        return {
          useReasonReactJSX: !this.state.useReasonReactJSX
        }
      }, () => {
        this.updateReason(this.state.reason, true);
      });
    }
  }

  componentDidMount() {
    this.initEvalWorker();
    const {language, code, useReasonReactJSX} = retrieve();
    language === 'reason' ? this.updateReason(code) : this.updateOCaml(code)
  }

  componentWillUnmount() {
    this.evalWorker && this.evalWorker.terminate();
  }

  render() {
    let {
      reason,
      ocaml,
      js,
      reasonSyntaxError,
      errorsFromCompilation,
      ocamlSyntaxError,
      jsError,
    } = this.state;

    return (
      <div className="try-inner">
        <div className="try-buttons">
          <div className="try-button try-button-examples try-button-right-border">
            Examples
            <ul className="try-button-examples-list">
              {examples.map(example => <li key={example.name} onClick={() => this.updateReason(example.code)}>{example.name}</li>)}
            </ul>
          </div>
          <div className="try-button try-button-note" style={{marginRight: 'auto'}}>
            Note on foo##bar
            <div className="try-tooltip">
              <span className="arrow"></span>
              Currently, typing `foo##bar` in the Reason syntax section gives a
              syntax error; the playground translates Reason syntax to OCaml syntax
              first before feeding it into the compiler. But OCaml mis-prints `foo##bar` as
              the syntactically invalid `## foo bar` (a fix will be released soon).
              For now, whenever this happens, please manually edit the OCaml
              section to use `foo##bar` instead. Sorry!
            </div>
          </div>
          <div className="try-button try-button-right-border" onClick={this.reformat}>
            Refmt (Reformat)
          </div>
          <div className="try-button try-button-right-border" onClick={this.toggleUseReasonReact}>
            ReasonReact JSX
            <input
              className="try-button-reasonreact-checkbox"
              type="checkbox"
              checked={this.state.useReasonReactJSX}
              onChange={this.toggleUseReasonReact}
            />
          </div>
          <ShareButton
            className="try-button try-button-share"
            url={this.state.shareableUrl}
            onClick={this.copyShareableUrl}
          />
        </div>
        <div className="try-grid">

          <div className="try-grid-editor">
            <div className="try-label">Reason</div>
            <CodeMirror
              className="try-codemirror-wrap"
              value={reason}
              options={{
                mode: 'rust',
                lineNumbers: true,
              }}
              onChange={this.updateReason}
            />
            {reasonSyntaxError &&
              <pre className="try-error-warning" style={{padding: 15}}>
                {formatErrorLocation(reasonSyntaxError.location)}
                {' '}
                {capitalizeFirstChar(stripErrorNumberFromReasonSyntaxError(reasonSyntaxError.message))}
              </pre>}
          </div>

          <div className="try-grid-editor">
            <div className="try-label">JavaScript</div>
            <CodeMirror
              className="try-codemirror-wrap"
              value={js}
              options={{
                mode: 'javascript',
                lineNumbers: true,
                readOnly: true,
              }}
            />
            {jsError && <pre className="try-error-warning" style={{padding: 15}}>{jsError.message}</pre>}
          </div>

          <div className="try-grid-editor">
            <div className="try-label">OCaml</div>
            <CodeMirror
              className="try-codemirror-wrap"
              value={ocaml}
              options={{
                mode: 'mllike',
                lineNumbers: true,
              }}
              onChange={this.updateOCaml}
            />
            {ocamlSyntaxError && <pre className="try-error-warning" style={{padding: 15}}>{ocamlSyntaxError.message}</pre>}
            {errorsFromCompilation &&
              <pre
                className="try-error-warning"
                dangerouslySetInnerHTML={{__html: ansiUp.ansi_to_html(
                  errorsFromCompilation
                )}}
                >
              </pre>
            }
          </div>

          <div className="try-output">

            <div className="try-grid-editor">
              <div className="try-label">Console</div>
              <div style={{padding: 10}}>
                {this.state.output.map((item, i) =>
                  <div className="try-output-line" key={i}>
                    {item.contents.join(' ')}
                  </div>
                )}
              </div>
            </div>

            <div className="try-grid-editor">
              <div className="try-label">Preview</div>
              <div ref={this.previewPanel} style={{padding: 10}}>
                <PreviewPanel />
              </div>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

const wrapInExports = code =>
  `(function(exports) {${code}})({})`

ReactDOM.render(<Try />, document.querySelector('#try-wrapper'));
