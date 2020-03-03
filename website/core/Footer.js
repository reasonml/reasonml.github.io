const React = require("react");

class Footer extends React.Component {
  // note that the pjax-api script is here, and not in siteConfig.scripts. The
  // pjax script can't execute on the Try playground page; otherwise it errors.
  render() {
    return (
      <span>
        <script src={this.props.config.baseUrl + 'js/redirectBlog.js'}></script>
      </span>
    );
  }
}

module.exports = Footer;
