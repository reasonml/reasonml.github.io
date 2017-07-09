import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"

import Section from '../components/Section'
import GuideSidebar from '../components/GuideSidebar'
import {accent, gray} from '../utils/colors'

import Header from '../components/Header'

const editUrl = path =>
  `https://github.com/jaredly/reason-docs/edit/master/docs/src/pages/${path}`
  // `https://github.com/facebook/reason/edit/master/docs/src/pages/${path}`

export default class Guide extends React.Component {
  render() {
    const {allFile, file: {relativePath, childMarkdownRemark: {frontmatter: {title}, html}}} = this.props.data
    return <div>
      <Helmet title={title} />
      <Section backgroundColor={accent} css={{color: 'white'}}>
        <Header inverted />
        <div css={{alignItems: 'center'}}>
          <h1>
            <Link css={styles.topLink} to="/guide">
            Guide
            </Link>
          </h1>
        </div>
      </Section>
      <Section css={styles.container}>
        <div css={styles.sidebar}>
          <GuideSidebar
            files={allFile.edges.map(edge => edge.node)}
          />
        </div>
        <div css={styles.main}>
          <a css={styles.editLink} href={editUrl(relativePath)}>
            Suggest an edit
          </a>
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
  container: {
    flexDirection: 'row',
  },
  topLink: {
    textDecoration: 'none',
    color: 'currentColor',
    ':hover': {
      textDecoration: 'underline',
    },
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

export const pageQuery = graphql`
  query PageByPath($relativePath: String!) {
    # For building the table of contents
    # TODO make a fragment probably
    allFile(filter:{
      relativePath:{regex:"/^guide.*\\.md/"}
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
