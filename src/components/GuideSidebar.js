import React from 'react'
import Link from './Link'

import {accent} from '../utils/colors'

export default class GuideSidebar extends React.Component {
  render() {
    return <div css={styles.container}>
      <Node current={this.props.current} item={this.props.root} root depth={0} />
    </div>
  }
}

const Node = ({current, root, item: {title, relativePath, children}, depth}) => {
  const linkStyles = [styles.link, styles['link' + depth], relativePath === current && styles.currentLink]
  return children.length
  ? <div css={[styles.node, root && styles.rootNode]}>
      {!root ? <Link to={relativePath} css={linkStyles}>{title}</Link> : null}
      <ul css={[styles.children, root && styles.rootChildren]}>
      {children.map(child => <li key={child.relativePath}><Node current={current} item={child} depth={depth + 1} /></li>)}
      </ul>
    </div>
  : <Link css={[styles.node, linkStyles]} to={relativePath}>{title}</Link>
}

const styles = {
  container: {
    width: 200,
    fontSize: 14,
    lineHeight: '14px',
  },

  node: {

  },

  link: {
    textDecoration: 'none',
    color: 'currentColor',
  },

  currentLink: {
    textDecoration: 'underline',
    textDecorationColor: accent,
    color: accent,
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

// TODO
// export const query =
