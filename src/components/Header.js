import React from "react"
import Link from "gatsby-link"

import HeaderNav from './HeaderNav'

export default ({inverted}) => (
  <div css={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
  }}>
    {inverted
      ? <Link to="/" style={{textDecoration: 'none', color: 'currentColor'}} >
          Reason
        </Link>
      : <img style={{margin: 0}} src="/static/icon_50.png" width={50}/>}
    <HeaderNav />
  </div>
)
