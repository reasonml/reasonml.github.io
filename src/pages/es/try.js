import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Header from '../../components/Header'
import Section from '../../components/Section'
import { accent, gray } from '../../utils/colors'

let CodeMirror
if (typeof navigator !== 'undefined') {
  CodeMirror = require('../../components/CodeMirror')
  require('codemirror/lib/codemirror.css')
  require('codemirror/mode/javascript/javascript')
  require('codemirror/mode/mllike/mllike')
  require('codemirror/mode/rust/rust')
} else {
  CodeMirror = () => <div>placeholder</div>
}

const bs = text => {
  try {
    const res = JSON.parse(window.ocaml.compile(text))
    console.log(res)
    if (res.js_code) {
      return res.js_code
    } else {
      console.log(res)
      return 'unexpected response'
    }
  } catch (e) {
    return 'failure: ' + e
  }
}

const defaultSource = 'let x = 10;\nJs.log x;'

const errorTimeout = 500

const waitForLoaded = done => {
  const tout = setInterval(() => {
    if (window.refmt && window.ocaml) {
      clearInterval(tout)
      done()
    }
  })
}

const isSafari =
  (typeof navigator !== 'undefined' &&
    /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(navigator.userAgent)) ||
  typeof safari !== 'undefined'

export default class Try extends Component {
  state = {
    reason: '/* loading */',
    ocaml: '(* loading *)',
    js: '// loading',
    jsIsLatest: false,
    autoEvaluate: true,
    output: []
  }
  rerr = null

  componentDidMount() {
    waitForLoaded(() => {
      // this.setState({loaded: true})
      this.updateReason(defaultSource)
    })
    this.iframe.contentWindow.console = {
      log: (...items) => {
        this.setState(state => ({
          ...state,
          output: state.output.concat({ type: 'log', contents: items })
        }))
      },
      error: (...items) => {
        this.setState(state => ({
          ...state,
          output: state.output.concat({ type: 'error', contents: items })
        }))
      },
      warn: (...items) => {
        this.setState(state => ({
          ...state,
          output: state.output.concat({ type: 'warn', contents: items })
        }))
      }
    }
    this.iframe.contentDocument.body.innerHTML = '(iframe)'
  }

  updateReason = reason => {
    if (reason === this.state.reason) return
    clearTimeout(this.err)
    const converted = window.refmt(reason, 'RE', 'implementation', 'ML')
    if (converted[0] !== 'REtoML') {
      this.err = setTimeout(
        () =>
          this.setState({
            reasonError: converted[1]
          }),
        errorTimeout
      )
      this.setState({
        reason,
        reasonError: null,
        bsError: null,
        ocamlError: null,
        jsIsLatest: false
      })
      return
    }
    const ocaml = converted[1]

    this.tryCompiling(reason, ocaml)
  }

  updateOCaml = ocaml => {
    if (ocaml === this.state.ocaml) return
    clearTimeout(this.err)
    const converted = window.refmt(ocaml, 'ML', 'implementation', 'RE')
    if (converted[0] !== 'MLtoRE') {
      this.err = setTimeout(
        () =>
          this.setState({
            ocamlError: converted[1]
          }),
        errorTimeout
      )
      this.setState({
        ocaml,
        reasonError: null,
        bsError: null,
        ocamlError: null,
        jsIsLatest: false
      })
      return
    }
    const reason = converted[1]

    this.tryCompiling(reason, ocaml)
  }

  tryCompiling(reason, ocaml) {
    try {
      const res = JSON.parse(window.ocaml.compile(ocaml))
      if (res.js_code) {
        this.setState({
          reason,
          ocaml,
          js: res.js_code,
          reasonError: null,
          bsError: null,
          ocamlError: null,
          jsIsLatest: true
        })
        if (this.state.autoEvaluate) {
          this.run(res.js_code)
        }
        return
      } else {
        this.err = setTimeout(
          () =>
            this.setState({
              bsError: res
            }),
          errorTimeout
        )
      }
    } catch (err) {
      this.err = setTimeout(
        () =>
          this.setState({
            bsError: err
          }),
        errorTimeout
      )
    }
    this.setState({
      reason,
      ocaml,
      reasonError: null,
      bsError: null,
      ocamlError: null,
      jsIsLatest: false
    })
  }

  toggleEvaluate = () => {
    if (!this.state.autoEvaluate && this.state.jsIsLatest) {
      this.run(this.state.js)
    }
    this.setState({ autoEvaluate: !this.state.autoEvaluate })
  }

  run(code) {
    this.setState(
      state => ({ ...state, output: [] }),
      () => {
        this.iframe.contentWindow.eval(wrapInExports(code))
      }
    )
  }

  render() {
    const { reason, ocaml, js, reasonError, bsError, ocamlError } = this.state
    const codemirrorStyles = [
      styles.codemirror,
      isSafari && styles.codemirrorSafari
    ]
    return (
      <div css={styles.container}>
        <Helmet>
          <script async src={__PATH_PREFIX__ + '/bs.js'} />
          <script async src={__PATH_PREFIX__ + '/refmt.js'} />
          <title>Try Reason</title>
        </Helmet>
        <div css={{ backgroundColor: accent, color: 'white' }}>
          <Header inverted />
        </div>
        <div css={styles.inner}>
          <div css={styles.column}>
            <div css={styles.row}>
              <div css={styles.label}>reason</div>
              <CodeMirror
                css={codemirrorStyles}
                value={reason}
                options={{
                  mode: 'rust',
                  lineNumbers: true
                }}
                onChange={this.updateReason}
              />
              {reasonError &&
                <div css={styles.error}>
                  <div css={styles.errorTitle}>Reason transformation error</div>
                  <div css={styles.errorBody}>
                    {reasonError}
                  </div>
                </div>}
            </div>
            <div style={{ flexBasis: 20 }} />
            <div css={styles.row}>
              <div css={styles.label}>ocaml</div>
              <CodeMirror
                css={codemirrorStyles}
                value={ocaml}
                options={{
                  mode: 'mllike',
                  lineNumbers: true
                }}
                onValueChange={this.updateOCaml}
              />
              {ocamlError &&
                <div css={styles.error}>
                  <div css={styles.errorTitle}>Reason transformation error</div>
                  <div css={styles.errorBody}>
                    {ocamlError}
                  </div>
                </div>}
              {bsError &&
                <div css={styles.error}>
                  <div css={styles.errorTitle}>
                    Bucklescript Compilation Error
                  </div>
                  <div css={styles.errorBody}>
                    {bsError.js_error_msg
                      ? bsError.js_error_msg
                      : bsError.message}
                  </div>
                </div>}
            </div>
          </div>
          <div style={{ flexBasis: 20 }} />
          <div css={styles.column}>
            <div css={styles.row}>
              <div css={styles.label}>javascript</div>
              <CodeMirror
                css={codemirrorStyles}
                value={js}
                options={{
                  mode: 'javascript',
                  lineNumbers: true,
                  readOnly: 'nocursor'
                }}
              />
            </div>
            <div style={{ flexBasis: 20 }} />
            <div css={styles.row}>
              <div css={styles.label} onClick={this.toggleEvaluate}>
                auto-evaluate
                <input
                  css={styles.checkbox}
                  type="checkbox"
                  checked={this.state.autoEvaluate}
                />
              </div>
              <div css={styles.output}>
                {this.state.output.map((item, i) =>
                  <div css={styles.outputLine} key={i}>
                    {formatOutput(item)}
                  </div>
                )}
              </div>
              <iframe
                css={styles.iframe}
                ref={iframe => (this.iframe = iframe)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const wrapInExports = code =>
  `(function(exports) {${code}})(window.exports = {})`

const formatOutput = item =>
  item.contents.map(val => JSON.stringify(val)).join(' ')

const styles = {
  checkbox: {
    marginLeft: 10
  },
  iframe: {
    flex: 1,
    border: '1px solid #aaf',
    margin: 5
  },
  output: {
    flex: 1,
    padding: 10
  },
  outputLine: {
    fontFamily: 'monospace',
    whiteSpace: 'pre',
    display: 'block'
  },

  errorBody: {
    fontFamily: 'monospace',
    fontSize: 12
  },
  error: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#faa',
    padding: '10px 20px',
    zIndex: 10
  },

  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    '@media(max-width: 500px)': {
      position: 'static',
      display: 'block'
    }
  },
  inner: {
    flexDirection: 'row',
    flex: 1,
    padding: 20,
    '@media(max-width: 500px)': {
      display: 'block',
      flexDirection: 'column'
    }
  },
  column: {
    flex: 1,
    minWidth: 0,
    '@media(max-width: 500px)': {
      display: 'block',
      flexShrink: 'initial',
      flexGrow: 'initial'
      // flex: 0,
    }
  },
  row: {
    flex: 1,
    minHeight: 0,
    border: '1px solid #aaa',
    position: 'relative',
    '@media(max-width: 500px)': {
      // display: 'block',
      height: 300,
      marginBottom: 20,
      flexShrink: 'initial',
      flexGrow: 'initial'
      // flex: 0,
    }
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
    zIndex: 20
  },

  codemirror: {
    flex: 1,
    '& .CodeMirror': {
      flex: 1,
      height: 'auto',

      '@media(max-width: 500px)': {
        height: 300
      }
    }
  },

  codemirrorSafari: {
    '& .CodeMirror': {
      height: 300
    }
  }
}
