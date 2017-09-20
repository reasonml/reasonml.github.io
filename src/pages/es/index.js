import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Examples from '../../pages/community/examples'
import Header from '../../components/Header'
import Features from '../../components/Features'
import Section from '../../components/Section'
import { accent, gray } from '../../utils/colors'
import logo from '../../images/reason_300.png'
import { headerFontFamily } from '../../utils/typography'

const features = [
  {
    title: 'Tipos de datos sin problemas',
    description:
      'Un sistema inferido, eficiente y seguro significa que raramente hay que declarar los tipos, sin embargo estan presentes sin nuestra ayuda.',
    action: 'Ver como',
    url: '/es/guide/language/type/'
  },
  {
    title: 'Editor online',
    description:
      'Juga con Reason dentro de tu navegador, mira el codigo producido en OCaml y JavaScript, y proba los ejemplos.',
    action: 'Prueba ahora',
    url: '/try'
  },
  // {
  //   title: 'Web or Native', // 😢 not ready yet
  //   description: 'Write your frontend, backend, and build tools all in the same language -- without compromising on speed.',
  //   action: 'Native quickstart',
  //   url: '/guide/native/quickstart/',
  // },
  {
    title: 'Facil interoperabilidad con JavaScript',
    description:
      'Usa paquetes de NPM/Yarn con el menor esfuerzo, o hasta ingresa algunas lineas de JavaScript mientras estes aprendiendo.',
    action: 'Aprender mas',
    url: '/es/guide/javascript/interop/'
  },
  {
    title: 'Flexible y Divertido',
    description:
      'Crea paginas web, animaciones, juegos, servidores, herramientas de comados, y mas! Mira los ejemplos para sentirte inspirado.',
    action: 'Ver ejemplos',
    url: '/es/community/examples'
  }
]
export default class IndexEs extends React.Component {
  render() {
    const { javascript, examples } = this.props.data
    return (
      <div css={styles.container}>
        <Helmet title={`Reason`} />
        <Section backgroundColor={gray}>
          <Header />
          <div css={{ alignItems: 'center' }}>
            <img src={logo} css={styles.logo} />
            <p css={styles.description}>
              Reason te permite escribir codigo mas simple, rapido y de mayor
              calidad en codigo con tipos seguros mientras aprovechas los
              ecosistemas de JavaScript y OCaml
            </p>
            <div css={styles.buttonGroup}>
              <Link to="/es/guide/javascript/quickstart" css={styles.button}>
                Comenzar
              </Link>
              <Link to="/es/guide/" css={styles.button}>
                Aprender Mas
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
            <h3 css={styles.columnHeader}>Inicio Rapido en JavaScript</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: javascript.childMarkdownRemark.html
              }}
            />
          </div>
          <div css={styles.column}>
            <h3 css={styles.columnHeader}>Ejemplos</h3>
            <Examples />
          </div>
        </Section>
      </div>
    )
  }
}
export const pageQuery = graphql`
  query IndexEsQuery {
    javascript: file(
      relativePath: { eq: "es/guide/javascript/quickstart.md" }
    ) {
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
    alignItems: 'center'
  },
  twoColumn: {
    flexDirection: 'row',
    '@media(max-width: 800px)': {
      flexDirection: 'column'
    }
  },
  column: {
    flexGrow: 1,
    flexBasis: 0,
    flexShrink: 1,
    margin: '0 20px',
    minWidth: 0,
    '@media(max-width: 800px)': {
      flexBasis: 'auto'
    }
  },
  columnHeader: {
    alignSelf: 'center'
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
      fontSize: '1.5em'
    }
  },
  content: {
    maxWidth: 1270,
    alignSelf: 'center'
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
    textAlign: 'center'
  },
  buttonGroup: {
    flexDirection: 'row',
    marginBottom: '1.5em',
    '@media(max-width: 340px)': {
      flexDirection: 'column',
      width: '80%'
    }
  },
  featuresDivider: {
    height: 1,
    backgroundColor: '#cecece'
  },
  features: {
    // backgroundColor: '#d0d0d0',
    backgroundColor: '#f6f4f4'
  },
  quickstarts: {
    backgroundColor: 'white',
    padding: 30
  },
  logo: {
    maxWidth: 300,
    width: '80%'
  }
}
