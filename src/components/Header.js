import React from "react"
import Link from "gatsby-link"
import {gray} from '../utils/colors'

import HeaderNav from './HeaderNav'
import icon from '../images/icon_50.png'

export default ({inverted}) => (
  <div css={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 10px',
    paddingLeft: '2em',
    // height: 100,
    '@media(max-width: 400px)': {
      paddingLeft: 10,
      height: 'auto',
    }
  }}>
    <Link to="/" style={{textDecoration: 'none', color: 'currentColor'}} >
      <img style={{display: 'block', width: 50, maxWidth: 50, margin: 0, border: `2px solid ${gray}`, boxSizing: 'content-box'}} src={icon} width={50} alt="Reason"/>
    </Link>
    <HeaderNav />
  </div>
)
