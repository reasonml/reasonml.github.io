import React from 'react'
import Link from './Link'

import {scale, rhythm, headerFontFamily} from '../utils/typography'
import {text, accent, dividerLine, gray} from '../utils/colors'

const oldSyntax = () => {
  let url = window.location;
  url = url.toString();
  url = url.replace(/reasonml.github.io/,"reasonml-old.github.io")
  // url = url.replace(/localhost:8000/,"reasonml-old.github.io")
  window.location = url;
};

const GuideSidebar = ({props, current, root, search}) => (
  <div css={styles.container}>
    <a css={[styles.syntax, {display: 'flex'}]} onClick={oldSyntax} href="#">
      See in 1.13.7 syntax
    </a>
    <div css={styles.contents}>
      <Link css={[styles.link, {display: 'flex'}]} to={search}>
        Search
        <svg css={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
          <path fill={text} d="M6.213 12.548C2.783 12.548 0 9.738 0 6.274 0 2.81 2.782 0 6.213 0c3.432 0 6.214 2.81 6.214 6.274 0 1.358-.428 2.616-1.154 3.643L15 13.482 13.576 15l-3.77-3.606c-1.015.727-2.254 1.154-3.593 1.154zm0-2.09c2.288 0 4.143-1.874 4.143-4.184S8.5 2.09 6.213 2.09c-2.287 0-4.142 1.874-4.142 4.184s1.856 4.183 4.143 4.183z"></path>
        </svg>
      </Link>
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

const phablet = '@media(max-width: 800px)'

const styles = {
  container: {
    position: 'relative',
    width: rhythm(8),
    minHeight: '100%',
    padding: '20px',
    [phablet]: {
      ...scale(0),
      width: 'auto',
    },
    fontFamily: headerFontFamily(),
    background: gray
  },

  contents: {
    padding: `${rhythm(1/3)} ${rhythm(1/2)}`,
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
    ...scale(-0.2),
    [phablet]: {
      padding: `${rhythm(1/4)}`
    },
    display: 'block',
    ':hover': {
      color: accent,
    }
  },
  syntax: {
    textDecoration: 'none',
    color: 'currentColor',
    ...scale(-0.2),
    [phablet]: {
      padding: `${rhythm(1/4)}`
    },
    display: 'block',
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: accent,
    justifyContent: 'center',
    padding: '1px 0'
  },

  currentLink: {
    textDecoration: 'underline',
    textDecorationColor: accent,
    color: accent,
  },

  link1: {
    fontWeight: 'bold',
    marginTop: '1em',
    marginBottom: '.25em',
  },

  children: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    paddingLeft: rhythm(1/3),
    marginLeft: 0,
  },

  rootChildren: {
    borderLeft: 'none',
    marginLeft: 0,
    paddingLeft: 0,
  },

  searchIcon: {
    width: '15px',
    height: '15px',
    marginLeft: 'auto',
    alignSelf: 'center'
  }
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

  const sectionPath = section.split('/');
  const treeToListify = sectionPath.reduce(
    (acc, section, i) => i === sectionPath.length - 1
      ? acc[section]
      : acc[section].children,
    tree.children,
  )

  return listify(treeToListify)
}

// TODO
// export const query =
