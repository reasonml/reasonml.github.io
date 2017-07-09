import React from "react"
import Helmet from "react-helmet"

import Section from '../components/Section'
import GuideSidebar from '../components/GuideSidebar'
import {accent, gray} from '../utils/colors'

import Link from "../components/Link"
import Header from '../components/Header'

const editUrl = path =>
  `https://github.com/jaredly/reason-docs/edit/master/docs/src/pages/${path}`
  // `https://github.com/facebook/reason/edit/master/docs/src/pages/${path}`

export default class Guide extends React.Component {
  render() {
    const {section, sectionTitle} = this.props.pathContext
    const {allFile, file: {relativePath, childMarkdownRemark: {frontmatter: {title}, html}}} = this.props.data
    return <div>
      <Helmet title={title} />
      <Section backgroundColor={accent} css={{color: 'white'}}>
        <Header inverted />
        <div css={{alignItems: 'center'}}>
          <h1>
            <Link css={styles.topLink} to={`/${section}`}>
              {sectionTitle}
            </Link>
          </h1>
        </div>
      </Section>
      <Section css={{flexDirection: 'row'}}>
        <div css={styles.sidebar}>
          <GuideSidebar
            root={constructTree(section, parseData(allFile.edges.map(edge => edge.node)))}
          />
        </div>
        <div css={styles.main}>
          <Link css={styles.editLink} to={editUrl(relativePath)}>
            Suggest an edit
          </Link>
          <h2 css={styles.title}>{title}</h2>
          <div dangerouslySetInnerHTML={{__html: html}} />
        </div>
      </Section>
    </div>
  }
}

const styles = {
  editLink: {
    position: 'absolute',
    right: '2.4em',
    top: '2em',
    fontSize: '.8em',
  },
  title: {
    borderBottom: '1px solid #aaa',
  },
  sidebar: {
    padding: '2em',
  },
  main: {
    position: 'relative',
    flex: 1,
    padding: '2em',
  },
}

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

const constructTree = (section, files) => {
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
  return listify(tree.children[section])
}


export const pageQuery = graphql`
  query PageByPath($relativePath: String!, $relatedFiles: String!) {
    # For building the table of contents
    # TODO make a fragment probably
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
    file(relativePath:{eq:$relativePath}) {
      relativePath
      childMarkdownRemark {
        html
        frontmatter {
          title
        }
      }
    }
  }
`
