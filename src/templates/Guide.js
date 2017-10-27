import React from "react"
import Helmet from "react-helmet"

import Section from '../components/Section'
import GuideSidebar, {constructTree, fixPath} from '../components/GuideSidebar'
import {scale, rhythm, headerFontFamily} from '../utils/typography'
import {accent, gray, dividerLine} from '../utils/colors'
import editIcon from '../../static/edit-icon.svg'

import Link from "../components/Link"
import Header from '../components/Header'

require('../../syntax-highlighting/xcode.css')
require('./guide.css')

const oldSyntax = () => {
  let url = window.location;
  url = url.toString();
  url = url.replace(/reasonml.github.io/,"reasonml-old.github.io")
  // url = url.replace(/localhost:8000/,"reasonml-old.github.io")
  window.location = url;
};

const editUrl = path =>
  `https://github.com/reasonml/reasonml.github.io/edit/source/src/pages/${path}`

function flattenTreeToPaths(node) {
  return [node.relativePath].concat(
    ...node.children.map(child => flattenTreeToPaths(child))
  )
}

export default class Guide extends React.Component {
  renderSequenceLinks() {
    const {
      allFile,
      file: {relativePath},
    } = this.props.data;

    // only show in guide section
    if (!relativePath.startsWith('guide')) return null

    const current = fixPath(relativePath)
    const {section} = this.props.pathContext

    const root = constructTree(section, allFile.edges.map(edge => edge.node))
    let flattened = flattenTreeToPaths(root)

    let prev = null;
    let next = null;
    for (var i = 0; i < flattened.length; i++) {
      if (flattened[i] === current) {
        prev = flattened[i - 1]
        next = flattened[i + 1]
        break;
      }
    }

    return (
      <div css={styles.sequenceLinks}>
        <div>
          {prev &&<Link to={prev}><span>&larr; Previous</span></Link>}
        </div>
        <div>
          {next &&<Link to={next}><span>Next &rarr;</span></Link>}
        </div>
      </div>
    );
  }
  renderMain() {
    const {relativePath, childMarkdownRemark: {frontmatter: {title}, html}} = this.props.data.file
    let edit
    let contents
    if (relativePath === 'community/examples.md') {
      const Examples = require('../pages/community/examples.js')
      contents = <Examples />
      edit = editUrl('community/examples.js')
    } else if (relativePath === 'community/companies.md') {
      const Companies = require('../pages/community/companies.js')
      contents = <Companies />
      edit = editUrl('community/companies.js')
    } else {
      contents = <div className="markdown-content" dangerouslySetInnerHTML={{__html: html}} />
      edit = editUrl(relativePath)
    }
    let syntax = relativePath.indexOf('guide/') === 0 ?
    <a css={[styles.syntax, {display: 'flex'}]} onClick={oldSyntax} href="#">
      Looking for the old (version 2) syntax? Click here
    </a> : null;
    return <div css={[styles.main, syntax ? styles.extraPadding : null]}>
      {syntax}
      <h2 css={styles.title}>
        {title}
        <Link css={styles.editLink} to={edit}>
          <img css={styles.editIcon} src={editIcon} />
          <span css={styles.editText}>
            Suggest an edit
          </span>
        </Link>
      </h2>
      {contents}
      {this.renderSequenceLinks()}
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
            search={`/${section}/search`}
            root={constructTree(section, allFile.edges.map(edge => edge.node))}
          />
        </div>
        {this.renderMain()}
      </Section>
    </div>
  }
}

const phablet = '@media(max-width: 800px)'

const styles = {
  editLink: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '25px',
  },
  title: {
    borderBottom: '1px solid ' + dividerLine,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: '4px'
  },
  contentSection: {
    flexDirection: 'row',
    '@media(max-width: 800px)': {
      flexDirection: 'column-reverse',
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
  extraPadding: {
    paddingTop: '2.5em',
  },
  editIcon: {
    marginBottom: 0,
    '@media(min-width: 800px)': {
      display: 'none'
    }
  },
  editText: {
    '@media(max-width: 800px)': {
      display: 'none'
    }
  },
  sequenceLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 32
  },
  syntax: {
    textDecoration: 'none',
    color: 'white',
    ...scale(0.2),
    [phablet]: {
      padding: `${rhythm(1/4)}`
    },
    backgroundColor: '#bb5144',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '2em',
    justifyContent: 'center',
    alignItems: 'center'
  },
}

export const pageQuery = graphql`
  query PageByPath($relativePath: String!, $relatedFiles: String!) {
    ...guideSidebar

    file(relativePath: {eq:$relativePath}) {
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
