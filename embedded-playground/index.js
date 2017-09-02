const visit = require(`unist-util-visit`)

module.exports = ({ markdownAST }) => {
  visit(markdownAST, `code`, node => {
    let {lang} = node;

    if (!lang || !lang.startsWith('playground:')) {
      return;
    }

    node.type = `html`;
    node.value = 
      `<div class="embedded-playground">
        <div class="editor-container"><pre>${node.value}</pre></div>
        <div class="output"></div>
        <div class="buttons">
          <button class="run-button">Run</button>
          <button class="try-button">Open in playground</button>
        </div>
      </div>`;
  })
}
