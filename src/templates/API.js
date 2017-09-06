import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import Section from '../components/Section'

import Link from "../components/Link"
import { accent, gray } from '../utils/colors'

require('./api.css')


export default class API extends Component {
  render() {
    const {content} = this.props.data.file.childRawHtml;
    return (
      <div>
        <Section backgroundColor={accent} css={{color: 'white'}}>
          <Helmet>
            <title>API Librairie Standard</title>
          </Helmet>
          <Header inverted />
          <div css={{alignItems: 'center'}}>
            <h1>
              <Link to={`/api/index.html`}>
                API
              </Link>
            </h1>
          </div>
        </Section>
        <Section css={{padding: '36px 24px 0'}}>
          <h2>Librairie Standard </h2>
          <p css={{maxWidth: 1270}}>
            Vous trouverez ci-dessous l'API de la librairie standard OCaml. Elle est directement copiée du <a className="api-manual-link" href="http://caml.inria.fr/pub/docs/manual-ocaml/libref/index.html">manuel OCaml</a>, formatée en syntaxe Reason et stylisée en conséquence.
            Les éléments de cette API sont en work-in-progress. Nous les améliorerons progressivement !
          </p>
          <p>
            Si vous visez le JavaScript, la <a className="api-manual-link" href="https://bucklescript.github.io/bucklescript/api/index.html">doc API de BuckleScript</a> inclue tout ce qui suit, plus des APIs spécifiques au JavaScript.
          </p>
        </Section>
        <div css={{alignItems: 'center'}}>
          <div 
            css={{maxWidth: 1270, width: '100%'}}
            dangerouslySetInnerHTML={{__html: content}}
          />
        </div>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query APIPageByPath($relativePath: String!) {
    file(relativePath: {eq:$relativePath}) {
      relativePath
      childRawHtml {
        content
      }
    }
  }
`
