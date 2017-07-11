import React from "react"
import Helmet from "react-helmet"

import Section from '../components/Section'
import GuideSidebar from '../components/GuideSidebar'
import {accent, gray} from '../utils/colors'

import Link from "../components/Link"
import Header from '../components/Header'

require('../../syntax-highlighting/xcode.css')
require('./guide.css')

const editUrl = path =>
  `https://github.com/jaredly/reason-docs/edit/master/src/pages/${path}`
  // `https://github.com/facebook/reason/edit/master/docs/src/pages/${path}`

export default class Guide extends React.Component {
  renderMain() {
    const {relativePath, childMarkdownRemark: {frontmatter: {title}, html}} = this.props.data.file
    let edit
    let contents
    if (relativePath === 'community/examples.md') {
      const Examples = require('../pages/community/examples.js')
      contents = <Examples />
      edit = editUrl('community/examples.js')
    } else {
      contents = <div dangerouslySetInnerHTML={{__html: html}} />
      edit = editUrl(relativePath)
    }
    return <div css={styles.main}>
      <h2 css={styles.title}>
        {title}
        <Link css={styles.editLink} to={edit}>
          Suggest an edit
        </Link>
      </h2>
      {contents}
    </div>
  }

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
      <Section css={styles.contentSection}>
        <div css={styles.sidebar}>
          <GuideSidebar
            current={fixPath(relativePath)}
            root={constructTree(section, parseData(allFile.edges.map(edge => edge.node)))}
          />
        </div>
        {this.renderMain()}
      </Section>
    </div>
  }
}

const styles = {
  editLink: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '25px',
  },
  title: {
    borderBottom: '1px solid #aaa',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  contentSection: {
    flexDirection: 'row',
    '@media(max-width: 800px)': {
      flexDirection: 'column',
    },
  },
  sidebar: {
    // padding: '2em',
  },
  main: {
    position: 'relative',
    flex: 1,
    padding: '2em',
    minWidth: 0,
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

const values = obj => Object.keys(obj).map(k => obj[k])

const listify = node => ({
  ...node,
  children: values(node.children)
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
