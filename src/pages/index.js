import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Examples from '../pages/community/examples'
import Header from '../components/Header'
import Features from '../components/Features'
import Section from '../components/Section'
import { accent, gray } from '../utils/colors'
import logo from '../images/reason_300.png'

const features = [
  {
    title: 'Typez sans tracas',
    description:
      'Une inférence de type performante signifie que vous devez rarement annoter vos types, mais tout est vérifié pour vous.',
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
  //   description: 'Concevez votre frontend, backend et créez tous les outils dans le même language - sans compromettre la vitesse.',
  //   action: 'Introduction rapide natif',
  //   url: '/guide/native/quickstart/',
  // },
  {
    title: "Interopérabilité JavaScript",
    description:
      "Utilisez vos paquets depuis npm sans soucis, ou rajoutez un bout de JavaScript pendant que vous apprenez.",
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
        <Section backgroundColor={gray}>
          <Header />
          <div css={{ alignItems: 'center' }}>
            <img src={logo} width={300} height={112} />
            <p css={styles.description}>
              Reason est une nouvelle syntaxe et chaîne de compilation pour OCaml,
              un puissant langage qui vous génère un code typé et maintenable, 
              produisant du JavaScript performant et lisible.
            </p>
            <div css={{ flexDirection: 'row', marginBottom: '1.5em' }}>
              <Link to="/guide/getting-started/" css={styles.button}>
                Démarrer
              </Link>
              <Link to="/guide/" css={styles.button}>
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
