const React = require("react");

class Footer extends React.Component {
  // note that the pjax-api script is here, and not in siteConfig.scripts. The
  // pjax script can't execute on the Try playground page; otherwise it errors.
  render() {
    return (
      <span>
        <script src={this.props.config.baseUrl + 'js/redirectBlog.js'}></script>
        <script src={this.props.config.baseUrl + 'js/pjax-api.min.js'}></script>
        <script dangerouslySetInnerHTML={{__html: `window.foo = new Pjax({
          areas: [
            // try to use the first query.
            '.mainContainer, .docsNavContainer .toc .navWrapper, .onPageNav',
            // fallback
            'body'
          ],
          link: '.docsNavContainer:not(.docsSliderActive) a',
          update: {
            script: false,
          }
        });
        var languagesMenuItemCopy = document.getElementById("languages-menu");
        languagesMenuItemCopy.addEventListener("click", function(e){
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        });`}}></script>
      </span>
    );
  }
}

module.exports = Footer;
