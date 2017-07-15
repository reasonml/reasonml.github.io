import React from 'react'
import Link from './Link'

import {accent} from '../utils/colors'

const GuideSidebar = ({props, current, root, search}) => (
  <div css={styles.container}>
    <div css={styles.contents}>
      <Link to={search}>Search</Link>
      <Node current={current} item={root} root depth={0} />
    </div>
  </div>
)

const Node = ({current, root, item: {title, relativePath, children}, depth}) => {
  const linkStyles = [styles.link, styles['link' + depth], relativePath === current && styles.currentLink]
  return children.length
  ? <div css={[styles.node, root && styles.rootNode]}>
      {!root ? <Link to={relativePath} css={linkStyles}>{title}</Link> : null}
      <ul css={[styles.children, root && styles.rootChildren]}>
      {children.map(child => <li style={styles.li} key={child.relativePath}><Node current={current} item={child} depth={depth + 1} /></li>)}
      </ul>
    </div>
  : <Link css={[styles.node, linkStyles]} to={relativePath}>{title}</Link>
}

export default GuideSidebar

export const sidebarFragment = graphql`
  fragment guideSidebar on RootQueryType {
    allFile(filter:{
      relativePath:{regex:$relatedFiles}
    }) {
      edges{
        node{
          relativePath
          childMarkdownRemark{
            frontmatter{
              title
              order
            }
          }
        }
      }
    }
  }
`;

const styles = {
  container: {
    width: 200,
    fontSize: 14,
    lineHeight: '14px',
    '@media(max-width: 800px)': {
      width: 'auto',
    },
  },

  contents: {
    padding: '2em',
  },

  node: {

  },

  li: {
    margin: 0,
    padding: 0,
  },

  link: {
    textDecoration: 'none',
    color: 'currentColor',
    lineHeight: '1.2em',
    paddingBottom: 3,
    paddingTop: 5,
    display: 'block',
  },

  currentLink: {
    textDecoration: 'underline',
    textDecorationColor: accent,
    color: accent,
  },

  link1: {
    fontWeight: 'bold',
    fontSize: '1.2em',
    lineHeight: '1.2em',
    // paddingBottom: 10,
    // marginTop: 5,
  },

  rootNode: {
  },

  children: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    paddingLeft: 15,
    marginLeft: 0,
    borderLeft: '1px solid #aaa',
  },

  rootChildren: {
    borderLeft: 'none',
    marginLeft: 0,
    paddingLeft: 0,
  },
}


export const fixPath = relativePath => {
  if (relativePath.match(/\/index\.md$/)) {
    return '/' + relativePath.slice(0, -'/index.md'.length)
  }
  return '/' + relativePath.slice(0, -'.md'.length)
}

const parseData = nodes => nodes.map(({
  relativePath,
  childMarkdownRemark: {frontmatter: {title, order}}
}) => ({relativePath: fixPath(relativePath), title, order}))

const values = obj => Object.keys(obj).map(k => obj[k])

const listify = node => ({
  ...node,
  children: values(node.children)
    .sort((a, b) => a.order - b.order)
    .map(listify)
})

export const constructTree = (section, files) => {
  const tree = {children: {}}
  parseData(files).forEach(({relativePath, title, order}) => {
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
  return listify(tree.children[section])
}

// TODO
// export const query =
