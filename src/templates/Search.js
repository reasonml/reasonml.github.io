import React from "react"
import Helmet from "react-helmet"

import Section from '../components/Section'
import GuideSidebar, {constructTree, fixPath} from '../components/GuideSidebar'
import {accent, gray} from '../utils/colors'
import {rhythm} from '../utils/typography'

import Link from "../components/Link"
import Header from '../components/Header'

const walk = (node, fn) => {
  [].forEach.call(node.childNodes, child => {
    const res = fn(child)
    if (res) {
      node.replaceChild(res, child)
    } else {
      walk(child, fn)
    }
  })
}

const highlightContents = (node, needle) => {
  walk(node, child => {
    if (child.nodeName === '#text') {
      if (child.nodeValue.match(needle)) {
        const node = document.createElement('span')
        node.innerHTML = child.nodeValue.replace(needle, v => '<span class="search-highlighted-result">' + v + '</span>')
        return node
      }
    }
  })
}

const highlight = (html, needle) => {
  const tmp = document.createElement('div')
  tmp.innerHTML = html;
  const matching = [null];
  ;[].forEach.call(tmp.childNodes, node => {
    if (node.textContent.match(needle)) {
      highlightContents(node, needle)
      matching.push(node.outerHTML)
    } else if (matching[matching.length - 1] !== null) {
      matching.push(null)
    }
  })
  if (matching[0] === null) matching.shift()
  if (matching[matching.length - 1] === null) matching.pop()
  return matching.map(m => m === null ? '<p class="search-elided-section">...</p>' : m).join('\n')
}

const search = (edges, needle) => {
  const rx = new RegExp(needle, 'ig')
  return edges.filter(({node: {childMarkdownRemark: {html, frontmatter: {title}}}}) => {
    if (title.match(rx) || html.match(rx)) {
      return true
    }
  }).map(({node: {relativePath, childMarkdownRemark: {html, frontmatter: {title}}}}) => {
    return {
      relativePath,
      html: highlight(html, needle),
      // html: html.replace(rx, v => '<span style="font-weight: bold; background-color: red">' + v + '</span>'),
      title,
    } // TODO highlight cleverly, probably use the markdown
    // source instead
  })
}

export default class Search extends React.Component {
  constructor(props) {
    super()
    const text = decodeURIComponent(props.location.search.slice(1))
    this.state = {
      results: text.trim().length > 2 ? search(props.data.allFile.edges, text.toLowerCase()) : [],
      searchText: text,
    }
  }

  setText = text => {
    window.history.replaceState({}, document.title, window.location.pathname + '?' + text)
    this.setState({
      searchText: text,
      results: text.trim().length > 2 ? search(this.props.data.allFile.edges, text.toLowerCase()) : []
    })
  }

  componentDidMount() {
    this.input.focus()
  }

  renderMain() {
    return <div css={styles.container}>
      <div css={styles.searchBar}>
        Search
        <input
          ref={input => this.input = input}
          css={styles.searchInput}
          onChange={e => this.setText(e.target.value)}
          value={this.state.searchText}
          type="text"
        />
      </div>
      <div css={styles.results}>
        {this.state.results.slice(0, 10).map(result => (
          <div key={result.relativePath} css={styles.result}>
            <h4 css={styles.resultTitleWrapper}>
              <Link css={styles.resultTitle} to={fixPath(result.relativePath)}>
                ‣ {result.title}
              </Link>
            </h4>
            <div
              css={styles.resultBody}
              dangerouslySetInnerHTML={{__html: result.html}}
            />
          </div>
        ))}
      </div>
    </div>
  }

  render() {
    const {section, sectionTitle} = this.props.pathContext
    const {allFile} = this.props.data
    return <div>
      <Helmet title={`${sectionTitle} Search`} />
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
            current={`${section}/search`}
            search={`/${section}/search`}
            root={constructTree(section, allFile.edges.map(edge => edge.node))}
          />
        </div>
        {this.renderMain()}
      </Section>
    </div>
  }
}

const styles = {
  container: {
    flex: 1,
    flexShrink: 1,
  },
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

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  searchInput: {
    flex: 1,
    padding: '5px 10px',
    fontSize: 18,
    marginLeft: 10,
  },

  results: {
    padding: 10,
  },

  result: {

  },

  resultTitle: {
    fontWeight: 'bold',
  },

  resultTitleWrapper: {
    marginBottom: rhythm(0.5),
  },

  resultBody: {
    fontSize: 12,
    paddingLeft: 20,
    '& .search-highlighted-result': {
      backgroundColor: 'gold',
      fontWeight: 'bold',
    },
    '& p': {
      marginBottom: 10,
    },
    '& .search-elided-section': {
      color: '#aaa',
      height: 5,
      marginBottom: 15,
      marginTop: -10,
    },
    '& ul': {
      marginBottom: 5,
    },
    '& code': {
      fontSize: 'inherit',
    }
  }

}

export const pageQuery = graphql`
  query SearchPage($relatedFiles: String!) {
    allFile(filter:{
      relativePath:{regex:$relatedFiles}
    }) {
      edges{
        node{
          relativePath
          childMarkdownRemark {
            frontmatter {
              title
              order
            }
            html
          }
        }
      }
    }
  }
`
