const React = require("react");

class Index extends React.Component {
  render() {
    return <span>
      <div id="try-wrapper" />
      <script type="text/javascript" src="/js/bs.js" />
      <script type="text/javascript" src="/js/refmt.js" />
      <script type="text/javascript" src="/js/try.js" />
    </span>;
  }
}

module.exports = Index;
