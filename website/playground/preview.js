import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'

class Preview extends Component {

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      if (!isScriptLoadSucceed) {
        this.props.onError()
      }
    }
  }

  render() {
    return (
      <div style={{padding: 10}}>
        <div id="preview" className="cleanslate" />
      </div>
    )
  }
}

export default scriptLoader(
  [
    '/js/stdlibBundle.js',
    '/js/reasonReactBundle.js',
    '/js/jsxV2.js'
  ]
)(Preview)
