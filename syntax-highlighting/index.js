const visit = require(`unist-util-visit`)
const hljs = require('./hljs')

module.exports = ({ markdownAST }) => {
  visit(markdownAST, `code`, node => {
    let language = node.lang
    let preCssClassLanguage = `none`
    if (language) {
      language = language.toLowerCase()
      preCssClassLanguage = language
    }

    let html
    if (hljs.getLanguage(language)) {
      html = hljs.highlight(
        language,
        node.value
        // highlightLines
      ).value
    } else {
      html = hljs.highlightAuto(
        node.value
        // highlightLines
      ).value
    }

    // Replace the node with the markup we need to make
    // 100% width highlighted code lines work
    node.type = `html`
    node.value = `<div class="gatsby-highlight">
      <pre class="hljs lang-${preCssClassLanguage}"><code>${html}</code></pre>
      </div>`
  })
}
