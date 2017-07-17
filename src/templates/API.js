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
            <title>Reason API</title>
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
