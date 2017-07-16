import React from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"
import Helmet from "react-helmet"
import { rhythm } from "../utils/typography"

import HeaderNav from '../components/HeaderNav'

import "../reset.css"

export default class Template extends React.Component {
  static propTypes = {
    children: PropTypes.func,
  }

  render() {
    const {location} = this.props
    if (location.pathname === '/') {
      return this.props.children()
    }
    if (true) {
      return this.props.children()
    }

    const accent = '#db4d3f';
    return (
      <div>
        <Helmet
          title="Reason: JavaScript à la sauce OCaml"
        />
        <div
          style={{
            backgroundColor: accent,
            marginBottom: rhythm(1),
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // margin: `0 auto`,
              maxWidth: 960,
              padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
            }}
          >
            <h1 style={{ margin: 0 }}>
              <Link
                to="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Reason
              </Link>
            </h1>
            <HeaderNav />
          </div>
        </div>
        <div css={{alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center'}}>
          <div
            style={{
              maxWidth: 960,
              flex: 1,
              padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
              paddingTop: 0,
            }}
          >
            {this.props.children()}
          </div>
        </div>
      </div>
    )
  }
}
