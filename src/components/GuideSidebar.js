import React from 'react'
import Link from './Link'

import {accent} from '../utils/colors'

export default class GuideSidebar extends React.Component {
  state = {closed: true}
  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.props.current) {
      this.setState({closed: true})
    }
  }
  render() {
    return <div css={styles.container}>
      <div
        css={styles.navToggle}
        onClick={() => this.setState({closed: !this.state.closed})}
      >
        Navigation
      </div>
      <div css={[styles.contents, this.state.closed && styles.hiddenContents]}>
        <Node current={this.props.current} item={this.props.root} root depth={0} />
      </div>
    </div>
  }
}

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

  hiddenContents: {
    '@media(max-width: 800px)': {
      display: 'none',
    }
  },

  navToggle: {
    backgroundColor: '#444',
    color: 'white',
    padding: '1em 2em',
    alignSelf: 'stretch',
    display: 'none',
    cursor: 'pointer',
    '@media(max-width: 800px)': {
      display: 'flex',
    }
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

// TODO
// export const query =
