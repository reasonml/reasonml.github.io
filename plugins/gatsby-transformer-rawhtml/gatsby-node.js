const fs = require('fs')
const crypto = require('crypto')

function onCreateNode({ node, boundActionCreators, loadNodeContent }) {
  const { createNode, createParentChildLink } = boundActionCreators
  if (node.internal.mediaType !== 'text/html') return

  loadNodeContent(node).then(content => {
    const contentDigest = crypto
      .createHash('md5')
      .update(content)
      .digest('hex')

    const rawhtmlNode  = {
      content: content,
      id: `${node.id} >>> rawhtml`,
      children: [],
      parent: node.id,
      internal: {
        contentDigest,
        type: 'RawHTML',
      },
    }

    createNode(rawhtmlNode)
    createParentChildLink({ parent: node, child: rawhtmlNode })
  })
}

exports.onCreateNode = onCreateNode