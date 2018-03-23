const React = require("react");

class Index extends React.Component {
  render() {
    return <span>
      <link rel="stylesheet" type="text/css" href="/css/cleanslate.css" />
      <div id="try-wrapper" />
      <script type="text/javascript" src="/js/bsReasonReact.js" />
      <script type="text/javascript" src="/js/refmt.js" />
      <script type="text/javascript" src="/js/stdlibBundle.js" />
      <script type="text/javascript" src="/js/reasonReactBundle.js" />
      <script type="text/javascript" src="/js/jsxV2.js" />
      <script type="text/javascript" src="/js/try.js" />
    </span>;
  }
}

module.exports = Index;
