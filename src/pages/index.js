import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"

import Header from '../components/Header'
import Features from '../components/Features'
import Section from '../components/Section'
import {accent, gray} from '../utils/colors'

const features = [
  {
    title: 'Types without hassle',
    description: 'Powerful type inference means you rarely have to annotate types, but everything gets checked for you.',
    action: 'See how',
    url: '/guide/types/',
  },
  {
    title: 'Web or Native',
    description: 'Write your frontend, backend, and build tools all in the same language -- without compromising on speed.',
    action: 'Native quickstart',
    url: '/guide/native/quickstart/',
  },
  {
    title: 'Easy JavaScript interop',
    description: 'Use packages from npm with minimum hassle, or drop in a snippet of raw JavaScript while you\'re learning',
    action: 'Learn more',
    url: '/guide/javascript/interop/',
  },
  {
    title: 'Flexible & Fun',
    description: 'Make websites, games, servers, build tools, and more! Take a look at these examples to get inspired.',
    action: 'See examples',
    url: '/community/examples',
  }
];

export default class Index extends React.Component {
  render() {
    const {javascript, native} = this.props.data
    return (
      <div css={styles.container}>
        <Section backgroundColor={gray}>
          <Header />
          <div css={{alignItems: 'center'}}>
            <img src="/static/reason_300.png" width={300} />
            <p css={styles.description}>
              Reason is a new syntax and toolchain for OCaml, a powerful
              language that will give you type-safe, maintainable code that
              transforms into performant, readable JavaScript.
            </p>
            <div css={{flexDirection: 'row', marginBottom: '1.5em'}}>
              <Link to="/guide/getting-started/" css={styles.button}>
                Get started
              </Link>
              <Link to="/guide/" css={styles.button}>
                Learn more
              </Link>
            </div>
          </div>
          <div css={styles.features}>
            <div css={[styles.content]}>
              <div css={styles.featuresDivider} />
              <Features
                features={features}
              />
            </div>
          </div>
        </Section>
        <Section css={[styles.quickstarts, styles.twoColumn]}>
          <div css={styles.column}>
            <h3 css={styles.columnHeader}>
              <Link to="/guide/javascript/">JavaScript quickstart</Link>
            </h3>
            <div dangerouslySetInnerHTML={{__html: javascript.childMarkdownRemark.html}}/>
          </div>
          <div css={styles.column}>
            <h3 css={styles.columnHeader}>
              Native quickstart
            </h3>
            <div dangerouslySetInnerHTML={{__html: native.childMarkdownRemark.html}}/>
          </div>
        </Section>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    javascript: file(relativePath:{eq:"guide/javascript/quickstart.md"}) {
      childMarkdownRemark {
        html
        frontmatter {
          title
        }
      }
    }
    native: file(relativePath:{eq:"guide/native/quickstart.md"}) {
      childMarkdownRemark {
        html
        frontmatter {
          title
        }
      }
    }
  }
`;


const styles = {
  container: {
  },
  inner: {

  },

  header: {
    backgroundColor: gray,
    alignItems: 'center',
  },

  twoColumn: {
    flexDirection: 'row',
  },

  column: {
    flexGrow: 1,
    flexBasis: 0,
    flexShrink: 1,
    margin: '0 20px',
    minWidth: 0,
  },
  columnHeader: {
    alignSelf: 'center',
  },

  description: {
    width: 600,
    fontWeight: 200,
    fontSize: '1.5em',
    lineHeight: '1.5em',
    textAlign: 'center',
    textShadow: '1px 1px white',
  },
  content: {
    maxWidth: 1270,
    alignSelf: 'center',
  },

  button: {
    textDecoration: 'none',
    background: accent,
    border: '1px solid #aaa',
    border: 'none',
    color: 'white',
    padding: '8px 34px',
    borderRadius: 5,
    margin: 10,
  },
  featuresDivider: {
    height: 1,
    backgroundColor: '#cecece',
  },
  features: {
    // backgroundColor: '#d0d0d0',
    backgroundColor: '#f6f4f4',
  },

  quickstarts: {
    backgroundColor: 'white',
    padding: 30,
  },
}
