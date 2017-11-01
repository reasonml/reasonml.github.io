import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'
import '../css/cleanslate.css'

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
      <div css={styles.preview}>
        <div id="preview" className="cleanslate" />
      </div>
    )
  }
}

const styles = {
  preview: {
    padding: 10,
  },
}

export default scriptLoader(
  [
    __PATH_PREFIX__ + '/stdlibBundle.js',
    __PATH_PREFIX__ + '/reasonReactBundle.js',
    __PATH_PREFIX__ + '/jsxV2.js'
  ]
)(Preview)