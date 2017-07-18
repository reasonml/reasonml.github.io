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
            <title>Standard Library API</title>
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
        <Section css={{paddingTop: '36px'}}>
          <h2>Standard Library</h2>
          <p css={{maxWidth: 1270}}>
            Below is the API for the OCaml standard library. It's directly copied over from <a href="http://caml.inria.fr/pub/docs/manual-ocaml/libref/index.html">the OCaml Manual</a>, formatted to the Reason syntax and styled accordingly.
            The API docs are work-in-progress; we'll be polishing these gradually!
          </p>
        </Section>
        <div css={{alignItems: 'center'}}>
          <div 
            css={{maxWidth: 1270}}
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
