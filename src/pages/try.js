import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import Section from '../components/Section'
import { accent, gray } from '../utils/colors'
import {headerFontFamily} from '../utils/typography'
import debounce from '../utils/debounce'
import { compressToEncodedURIComponent as compress, decompressFromEncodedURIComponent as decompress } from 'lz-string'

let CodeMirror
if (typeof navigator !== 'undefined') {
  CodeMirror = require('../components/CodeMirror')
  require('codemirror/lib/codemirror.css')
  require('codemirror/mode/javascript/javascript')
  require('codemirror/mode/mllike/mllike')
  require('codemirror/mode/rust/rust')
} else {
  CodeMirror = () => (
    <div css={styles.fakeCodemirrorPreload}>
      <div css={styles.fakeCodemirrorPreloadInner} />
    </div>
  )
}
const  queryParamPrefixFor = language => `?${language}=`;

const retrieve = () => {
  function fromQueryParam(language) {
    const queryParam = window.location.search; // returns ?language=blablabla
    const prefix = queryParamPrefixFor(language);

    if (queryParam.startsWith(prefix)) {
      return {
        language,
        code: decompress(queryParam.slice(prefix.length)) || '' // decompressing an empty string returns null, joyously!
      };
    }
  }

  function fromLocalStorage() {
    try {
      const json = localStorage.getItem('try-reason');
      return json && JSON.parse(json);
    } catch (e) {
      console.error(e);
    }
  }

  // WTH? There's some retarded automatic semicolon insertion going on, actively causing bugs. Hence the parens. Wonderful!
  return ( 
    fromQueryParam('reason') ||
    fromQueryParam('ocaml') ||
    fromLocalStorage() ||
    { language: 'reason', code: 'let x = 10;\nJs.log x;' }
  );
};

const persist = debounce((language, code) => {
  try {
    localStorage.setItem('try-reason', JSON.stringify({ language, code }));
  } catch (e) {
    console.error(e);
  }

  // avoid a refresh of the page; we also don't want every few keystrokes to
  // create a new history for the back button, so replace the current one
  const newURL =
    window.location.origin +
    window.location.pathname +
    queryParamPrefixFor(language) +
    compress(code);
  window.history.replaceState(null, '', newURL);
}, 100);

const errorTimeout = 500

const waitUntilScriptsLoaded = done => {
  const tout = setInterval(() => {
    if (window.refmt && window.ocaml && window.require) {
      clearInterval(tout)
      done()
    }
  }, 10)
}

const isSafari = (
  typeof navigator !== 'undefined' && /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(navigator.userAgent)
) || (
  typeof safari !== 'undefined'
);

export default class Try extends Component {
  state = {
    reason: '/* loading */',
    reasonSyntaxError: null,
    ocaml: '(* loading *)',
    js: '// loading',
    jsIsLatest: false,
    autoEvaluate: true,
    output: [],
  }

  err = null

  _output = item =>
    this.setState(state => ({
      ...state,
      output: state.output.concat(item)
    }));

  output = item => {
    if (this.outputOverloaded)
      return;

    if (this.state.output.length > 100) {
      this.outputOverloaded = true;
      this._output({ type: 'error', contents: ['[Too much output!]']})
      return;
    }

    this._output(item);
  }

  initEvalWorker = () => {
    this.evalWorker = new Worker('/evalWorker.js');
    this.evalWorker.onmessage = ({data}) => {
      if (data.type === 'end') {
        clearTimeout(data.contents);
      } else {
        this.output(data);
      }
    }
  }

  evalJs(code) {
    this.outputOverloaded = false;
    this.setState(
      state => ({ ...state, output: [] }),
      () => {
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
    )
  }

  componentDidMount() {
    waitUntilScriptsLoaded(() => {
      this.initEvalWorker();
      const {language, code} = retrieve();
      language === 'reason' ? this.updateReason(code) : this.updateOCaml(code)
    })
  }

  componentWillUnmount() {
    this.evalWorker.terminate();
  }

  updateReason = newReasonCode => {
    if (newReasonCode === this.state.reason) return
    persist('reason', newReasonCode);
    clearTimeout(this.err)

    this.setState((prevState, _) => {
      const converted = window.refmt(newReasonCode, 'RE', 'implementation', 'ML')

      let newOcamlCode = prevState.ocaml;
      if (converted[0] === 'REtoML') {
        newOcamlCode = converted[1]
        this.tryCompiling(newReasonCode, newOcamlCode)
      } else {
        this.err = setTimeout(
          () => this.setState(_ => {
            const error = converted[1] === '' ? 'Syntax error' : converted[1];
            return {
              reasonSyntaxError: error,
              compileError: null,
              ocamlSyntaxError: null,
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
        compileError: null,
        ocamlSyntaxError: null,
        jsError: null
      }
    });
  }

  updateOCaml = newOcamlCode => {
    if (newOcamlCode === this.state.ocaml) return
    persist('ocaml', newOcamlCode);
    clearTimeout(this.err)

    this.setState((prevState, _) => {
      const converted = window.refmt(newOcamlCode, 'ML', 'implementation', 'RE')

      let newReasonCode = prevState.reason;
      if (converted[0] === 'MLtoRE') {
        newReasonCode = converted[1]
        this.tryCompiling(newReasonCode, newOcamlCode)
      } else {
        this.err = setTimeout(
          () => this.setState(_ => {
            const error = converted[1] === '' ? 'Syntax error' : converted[1];
            return {
              ocamlSyntaxError: error,
              compileError: null,
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
        compileError: null,
        ocamlSyntaxError: null,
        jsError: null
      }
    });
  }

  tryCompiling = debounce((reason, ocaml) => {
    try {
      const res = JSON.parse(window.ocaml.compile(ocaml))
      if (res.js_code) {
        this.setState(_ => ({
          js: res.js_code,
          jsIsLatest: true,
        }))
        if (this.state.autoEvaluate) {
          try {
            this.evalJs(res.js_code)
          } catch (err) {
            this.err = setTimeout(
              () => this.setState(_ => ({
                jsError: err
              })),
              errorTimeout
            )
          }
        }
        return
      } else {
        this.err = setTimeout(
          () => this.setState(_ => ({
            compileError: res,
            js: '',
          })),
          errorTimeout
        )
      }
    } catch (err) {
      this.err = setTimeout(
        () => this.setState(_ => ({
          compileError: err,
          js: '',
        })),
        errorTimeout
      )
    }
    this.setState(_ => {
      return {
        compileError: null,
        jsIsLatest: false,
        output: [],
      }
    })
  }, 100)

  toggleEvaluate = () => {
    if (!this.state.autoEvaluate && this.state.jsIsLatest) {
      this.evalJs(this.state.js)
    }
    this.setState(_ => {
      return {
        autoEvaluate: !this.state.autoEvaluate
      }
    })
  }

  render() {
    const { reason, ocaml, js, reasonSyntaxError, compileError, ocamlSyntaxError, jsError } = this.state
    const codemirrorStyles = [
      styles.codemirror,
      isSafari && styles.codemirrorSafari,
    ]
    return (
      <div css={styles.container}>
        <Helmet>
          <script async src={__PATH_PREFIX__ + '/stdlibBundle.js'} />
          <script async src={__PATH_PREFIX__ + '/bs.js'} />
          <script async src={__PATH_PREFIX__ + '/refmt.js'} />
          <title>Try Reason</title>
        </Helmet>
        <div css={{ backgroundColor: accent, color: 'white' }}>
          <Header inverted />
        </div>
        <div css={styles.info}>Copy the URL to share the code snippet!</div>
        <div css={styles.inner}>
          <div css={styles.column}>
            <div css={styles.row}>
              <div css={styles.label}>Reason</div>
              <CodeMirror
                css={codemirrorStyles}
                value={reason}
                options={{
                  mode: 'rust',
                  lineNumbers: true,
                }}
                onChange={this.updateReason}
              />
              {reasonSyntaxError &&
                <div css={styles.error}>
                  <div css={styles.errorBody}>
                    {reasonSyntaxError}
                  </div>
                </div>}
            </div>
            <div style={{ flexBasis: 20 }} />
            <div css={styles.row}>
              <div css={styles.label}>OCaml</div>
              <CodeMirror
                css={codemirrorStyles}
                value={ocaml}
                options={{
                  mode: 'mllike',
                  lineNumbers: true,
                }}
                onChange={this.updateOCaml}
              />
              {ocamlSyntaxError &&
                <div css={styles.error}>
                  <div css={styles.errorBody}>
                    {ocamlSyntaxError}
                  </div>
                </div>}
              {compileError &&
                <div css={styles.error}>
                  <div css={styles.errorBody}>
                    {compileError.js_error_msg
                      ? compileError.js_error_msg
                      : compileError.message}
                  </div>
                </div>}
            </div>
          </div>
          <div style={{ flexBasis: 20 }} />
          <div css={styles.column}>
            <div css={styles.row}>
              <div css={styles.label}>JavaScript</div>
              <CodeMirror
                css={codemirrorStyles}
                value={js}
                options={{
                  mode: 'javascript',
                  lineNumbers: true,
                  readOnly: 'nocursor',
                }}
              />
              {jsError &&
                <div css={styles.error}>
                  <div css={styles.errorBody}>
                    {jsError.message}
                  </div>
                </div>}
            </div>
            <div style={{ flexBasis: 20 }} />
            <div css={styles.row}>
              <div css={styles.label}>
                Auto-evaluate
                <input
                  css={styles.checkbox}
                  type="checkbox"
                  checked={this.state.autoEvaluate}
                  onChange={this.toggleEvaluate}
                />
              </div>
              <div css={styles.output}>
                {this.state.output.map((item, i) =>
                  <div css={styles.outputLine} key={i}>
                    {formatOutput(item)}
                  </div>
                )}
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

const formatOutput = item =>
  item.contents.map(val => JSON.stringify(val)).join(' ')

const styles = {
  checkbox: {
    marginLeft: 10,
  },
  output: {
    flex: 1,
    padding: 10,
  },
  outputLine: {
    fontFamily: 'monospace',
    whiteSpace: 'pre',
    display: 'block',
  },

  errorBody: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
  error: {
    backgroundColor: '#faa',
    padding: '10px 20px',
  },

  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    '@media(max-width: 500px)': {
      position: 'static',
      display: 'block',
    },
  },
  inner: {
    flexDirection: 'row',
    flex: 1,
    padding: '10px 20px 20px 20px',
    '@media(max-width: 500px)': {
      display: 'block',
      flexDirection: 'column',
    },
  },
  column: {
    flex: 1,
    minWidth: 0,
    '@media(max-width: 500px)': {
      display: 'block',
      flexShrink: 'initial',
      flexGrow: 'initial',
      // flex: 0,
    },
  },
  row: {
    flex: 1,
    minHeight: 0,
    border: '1px solid #aaa',
    position: 'relative',
    overflow: 'auto',
    '@media(max-width: 500px)': {
      // display: 'block',
      height: 300,
      marginBottom: 20,
      flexShrink: 'initial',
      flexGrow: 'initial',
      // flex: 0,
    },
  },

  label: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(200, 200, 200, 0.6)',
    padding: '5px 10px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: 'black',
    fontSize: 14,
    lineHeight: '14px',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 20,
    borderRadius: '0 0 0 5px',
  },

  info: {
    fontFamily: headerFontFamily(),
    fontSize: 16,
    padding: '10px 20px 0 20px',
  },

  fakeCodemirrorPreload: {
    display: 'flex',
    flexGrow: 1,
    width: 30,
  },
  fakeCodemirrorPreloadInner: {
    backgroundColor: '#f7f7f7',
    borderRight: '1px solid rgb(221, 221, 221)',
    flexGrow: 1,
  },

  codemirror: {
    flex: 1,
    '& .CodeMirror': {
      flex: 1,
      height: 'auto',

      '@media(max-width: 500px)': {
        height: 300,
      },
    },
  },

  codemirrorSafari: {
    '& .CodeMirror': {
      height: 300,
    },
  },
}
