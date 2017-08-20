import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Examples from '../pages/community/examples'
import Header from '../components/Header'
import Features from '../components/Features'
import Section from '../components/Section'
import { accent, gray } from '../utils/colors'
import logo from '../images/reason_300.png'
import { headerFontFamily } from '../utils/typography'

const features = [
  {
    title: 'Typez sans tracas',
    description:
      'Une inférence de type puissante et sûre signifie que vous devez rarement annoter des types, mais tout est vérifié pour vous.',
    action: 'Voir comment',
    url: '/guide/language/types/',
  },
  {
    title: 'Éditeur en ligne',
    description:
      "Jouez avec Reason dans votre navigateur, jetez un coup d'oeil au code OCaml et JavaScript, testez les exemples fournis.",
    action: 'Essayer maintenant',
    url: '/try',
  },
  // {
  //   title: 'Web ou Natif', // 😢 not ready yet
  //   description: 'Créez vos frontend, backend et mêmes vos outils de build dans un seul et unique language - sans compromis sur la vitesse.',
  //   action: 'Commencer en natif',
  //   url: '/guide/native/quickstart/',
  // },
  {
    title: 'Interopérabilité JavaScript',
    description:
      'Utilisez vos paquets depuis NPM/Yarn sans soucis, ou rajoutez directement un bout de JavaScript pendant que vous apprenez.',
    action: 'En savoir plus',
    url: '/guide/javascript/interop/',
  },
  {
    title: 'Flexible & Fun',
    description:
      'Créez des sites web, des animations, des jeux, des serveurs, des outils cli et plus encore ! Regardez ces exemples pour vous inspirer.',
    action: 'Voir les exemples',
    url: '/community/examples',
  },
]

export default class Index extends React.Component {
  render() {
    const { javascript, examples } = this.props.data
    return (
      <div css={styles.container}>
        <Helmet title={`Reason`} />
        <Section backgroundColor={gray}>
          <Header />
          <div css={{ alignItems: 'center' }}>
            <img src={logo} width={300} height={112} />
            <p css={styles.description}>
              Reason vous permet d'écrire un code simple, performant, typé et de
              qualité, tout en tirant parti des écosystèmes JavaScript et OCaml.
            </p>
            <div css={{ flexDirection: 'row', marginBottom: '1.5em' }}>
              <Link to="/guide/javascript/quickstart" css={styles.button}>
                Démarrer
              </Link>
              <Link to="/guide/what-and-why" css={styles.button}>
                En savoir plus
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
            <h3 css={styles.columnHeader}>Démarrage rapide en JavaScript</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: javascript.childMarkdownRemark.html,
              }}
            />
          </div>
          <div css={styles.column}>
            <h3 css={styles.columnHeader}>Exemples</h3>
            <Examples />
          </div>
        </Section>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    javascript: file(relativePath: { eq: "guide/javascript/quickstart.md" }) {
      childMarkdownRemark {
        html
        frontmatter {
          title
        }
      }
    }
    examples: file(relativePath: { eq: "community/examples.md" }) {
      childMarkdownRemark {
        html
        frontmatter {
          title
        }
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

  description: {
    maxWidth: 600,
    fontWeight: 200,
    fontSize: '1.1em',
    lineHeight: '1.5em',
    textAlign: 'center',
    textShadow: '1px 1px white',
    padding: '0.8em',
    marginBottom: 0,
    fontFamily: headerFontFamily(),
    '@media(min-width: 800px)': {
      fontSize: '1.5em',
    },
  },
  content: {
    maxWidth: 1270,
    alignSelf: 'center',
  },

  button: {
    fontFamily: headerFontFamily(),
    textDecoration: 'none',
    background: accent,
    border: '1px solid #aaa',
    border: 'none',
    color: 'white',
    padding: '8px 34px',
    borderRadius: 5,
    margin: 10,
    textAlign: 'center',
  },

  buttonGroup: {
    flexDirection: 'row',
    marginBottom: '1.5em',
    '@media(max-width: 340px)': {
      flexDirection: 'column',
      width: '80%',
    },
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

  logo: {
    maxWidth: 300,
    width: '80%',
  },
}
