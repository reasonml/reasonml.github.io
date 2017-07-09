import React from 'react'
import Link from './Link'

const fixPath = relativePath => {
  if (relativePath.match(/\/index\.md$/)) {
    return '/' + relativePath.slice(0, -'/index.md'.length)
  }
  return '/' + relativePath.slice(0, -'.md'.length)
}

const parseData = nodes => nodes.map(({
  relativePath,
  childMarkdownRemark: {frontmatter: {title, order}}
}) => ({relativePath: fixPath(relativePath), title, order}))

const listify = node => ({
  ...node,
  children: Object.values(node.children)
    .sort((a, b) => a.order - b.order)
    .map(listify)
})

const constructTree = files => {
  const tree = {children: {}}
  files.forEach(({relativePath, title, order}) => {
    const parts = relativePath.split(/\//g).slice(1)
    const last = parts.pop()
    let parent = tree
    parts.forEach(part => {
      if (!parent.children[part]) parent.children[part] = {children: {}}
      parent = parent.children[part]
    })
    parent.children[last] = {
      children: {},
      ...parent.children[last],
      relativePath,
      title,
      order,
    }
  })
  console.log(tree)
  return listify(tree.children.guide)
}

export default class GuideSidebar extends React.Component {
  render() {
    const root = constructTree(parseData(this.props.files))
    return <div css={styles.container}>
      <Node item={root} root depth={0} />
    </div>
  }
}

const Node = ({root, item: {title, relativePath, children}, depth}) => (
  children.length
  ? <div css={[styles.node, root && styles.rootNode]}>
      {!root ? <Link to={relativePath} css={[styles.link, styles['link' + depth]]}>{title}</Link> : null}
      <ul css={[styles.children, root && styles.rootChildren]}>
      {children.map(child => <li><Node item={child} depth={depth + 1} key={child.relativePath} /></li>)}
      </ul>
    </div>
  : <Link css={[styles.node, styles.link]} to={relativePath}>{title}</Link>
)

const styles = {
  container: {
    width: 200,
  },

  node: {

  },

  link: {
    textDecoration: 'none',
    color: 'currentColor',
  },

  link1: {
    fontWeight: 'bold',
    fontSize: '1.2em',
    marginBottom: 10,
  },

  rootLink: {
    alignSelf: 'center',
  },

  rootNode: {
  },

  children: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    paddingLeft: 5,
    marginLeft: 5,
    borderLeft: '1px solid #aaa',
  },

  rootChildren: {
    borderLeft: 'none',
    marginLeft: 0,
    paddingLeft: 0,
  },
}

// TODO
// export const query =
