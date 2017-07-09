import React from 'react'
import Link from './Link'

export default class GuideSidebar extends React.Component {
  render() {
    return <div css={styles.container}>
      <Node item={this.props.root} root depth={0} />
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
