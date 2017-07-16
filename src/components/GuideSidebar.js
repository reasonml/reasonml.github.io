import React from 'react'
import Link from './Link'

import {scale, rhythm, headerFontFamily} from '../utils/typography'
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
        <Link to={this.props.search}>Recherche</Link>
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

const phablet = '@media(max-width: 800px)'

const styles = {
  container: {
    width: rhythm(8),
    [phablet]: {
      ...scale(0),
      width: 'auto',
    },
    fontFamily: headerFontFamily(),
  },

  contents: {
    padding: `${rhythm(1/3)} ${rhythm(1/2)}`,
  },

  hiddenContents: {
    [phablet]: {
      display: 'none',
    }
  },

  navToggle: {
    backgroundColor: '#444',
    color: 'white',
    padding: `${rhythm(1/3)} ${rhythm(1/2)}`,
    alignSelf: 'stretch',
    display: 'none',
    cursor: 'pointer',
    [phablet]: {
      display: 'flex',
    }
  },

  li: {
    margin: 0,
    padding: 0,
  },

  link: {
    textDecoration: 'none',
    color: 'currentColor',
    [phablet]: {
      padding: `${rhythm(1/4)}`
    },
    display: 'block',
  },

  currentLink: {
    textDecoration: 'underline',
    textDecorationColor: accent,
    color: accent,
  },

  link1: {
    fontWeight: 'bold',
    ...scale(0),
  },

  children: {
    ...scale(-0.2),
    listStyle: 'none',
    margin: 0,
    padding: 0,
    paddingLeft: rhythm(.5),
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
