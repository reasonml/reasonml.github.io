import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Examples from '../pages/community/examples'
import Header from '../components/Header'
import Features from '../components/Features'
import Section from '../components/Section'
import { accent, gray } from '../utils/colors'
import logo from '../images/reason_300.png'
import {headerFontFamily} from '../utils/typography'

const features = [
  {
    title: 'Types without hassle',
    description:
      'Powerful, safe type inference means you rarely have to annotate types, but everything gets checked for you.',
    action: 'Learn about types',
    url: '/guide/language/type/',
  },
  // {
  //   title: 'Web or Native', // 😢 not ready yet
  //   description: 'Write your frontend, backend, and build tools all in the same language -- without compromising on speed.',
  //   action: 'Native quickstart',
  //   url: '/guide/native/quickstart/',
  // },
  {
    title: 'Easy JavaScript interop',
    description:
      "Use packages from NPM/Yarn with minimum hassle, or even drop in a snippet of raw JavaScript while you're learning!",
    action: 'Learn about interop',
    url: '/guide/javascript/interop/',
  },
  {
    title: 'Flexible & Fun',
    description:
      'Make websites, animations, games, servers, cli tools, and more! Take a look at these examples to get inspired.',
    action: 'See examples',
    url: '/community/examples',
  },
]

export default class Index extends React.Component {
  render() {
    const { mainExample, jsquickstart, examples } = this.props.data
    return (
      <div css={styles.container}>
        <Helmet title={`Reason`} />
        <Section backgroundColor={gray}>
          <Header />
          <div css={{ alignItems: 'center' }}>
            <img src={logo} css={styles.logo} />
            <div css={styles.frontAndCenter}>
              <div css={styles.mainExample}
                dangerouslySetInnerHTML={{
                  __html: mainExample.childMarkdownRemark.html,
                }}
              />
              <p css={styles.description}>
                Reason lets you write simple, fast and quality type safe code while leveraging both the JavaScript & OCaml ecosystems.
              </p>
            </div>
            <div css={styles.buttonGroup}>
              <Link to="/try" css={[styles.button, styles.actionButton]}>
                Try online
              </Link>
              <Link to="/guide/what-and-why" css={styles.button}>
                Learn more
              </Link>
            </div>
          </div>
          <div css={styles.features}>
            <div css={[styles.content]}>
              <div css={styles.featuresDivider} />
              <Features features={features} />
            </div>
          </div>
        </Section>
        <Section css={[styles.quickstarts, styles.twoColumn]}>
          <div css={styles.column}>
            <h3 css={styles.columnHeader}>JavaScript Quick Start</h3>
            <div
              css={styles.jsquickstart}
              dangerouslySetInnerHTML={{
                __html: jsquickstart.childMarkdownRemark.html,
              }}
            />
          </div>
          <div css={styles.column}>
            <h3 css={styles.columnHeader}>Examples</h3>
            <Examples />
          </div>
        </Section>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    mainExample: file(relativePath: { eq: "index-example.md" }) {
      childMarkdownRemark {
        html
      }
    }
    jsquickstart: file(relativePath: { eq: "guide/javascript/quickstart.md" }) {
      childMarkdownRemark {
        html
      }
    }
  }
`

const styles = {
  container: {},
  inner: {},

  header: {
    backgroundColor: gray,
    alignItems: 'center',
  },

  twoColumn: {
    flexDirection: 'row',
    '@media(max-width: 800px)': {
      flexDirection: 'column',
    },
  },

  column: {
    flexGrow: 1,
    flexBasis: 0,
    flexShrink: 1,
    margin: '0 20px',
    minWidth: 0,
    '@media(max-width: 800px)': {
      flexBasis: 'auto',
    },
  },

  columnHeader: {
    alignSelf: 'center',
  },

  frontAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '2rem',
    '@media(max-width: 950px)': {
      flexDirection: 'column'
    }
  },

  description: {
    maxWidth: 600,
    fontWeight: 200,
    fontSize: '1.1em',
    lineHeight: '1.5em',
    textAlign: 'center',
    textShadow: '0px 1px #f4f2f2',
    padding: '0.8em',
    marginBottom: 0,
    fontFamily: headerFontFamily(),
    '@media(min-width: 800px)': {
      fontSize: '1.5em'
    }
  },
  content: {
    maxWidth: 1270,
    alignSelf: 'center',
  },

  mainExample: {
    '& .hljs': {
      background: 'transparent',
      border: 'none',
      marginBottom: 0
    }
  },

  button: {
    fontFamily: headerFontFamily(),
    textDecoration: 'none',
    border: '1px solid currentColor',
    padding: '8px 34px',
    color: 'currentColor',
    borderRadius: 5,
    margin: 10,
    textAlign: 'center'
  },

  actionButton: {
    border: 'none',
    background: accent,
    color: 'white',
  },

  buttonGroup: {
    flexDirection: 'row',
    marginBottom: '3rem',
    '@media(max-width: 340px)': {
      flexDirection: 'column',
      width: '80%'
    }
  },

  featuresDivider: {
    height: 1,
    backgroundColor: '#d6d4d4',
  },
  features: {
    // backgroundColor: '#d0d0d0',
    backgroundColor: '#f6f4f4',
  },

  quickstarts: {
    backgroundColor: 'white',
    padding: 30,
  },

  // please keep in sync with guide.css's markdown-content selectors
  jsquickstart: {
    '& a': {
      color: accent,
      textDecoration: 'none',
    },
    '& a:hover': {
      textDecoration: 'underline',
    },
    '& a:visited': {
      color: '#b13c2e',
    },
  },

  logo: {
    maxWidth: 300,
    width: '80%'
  }
}
