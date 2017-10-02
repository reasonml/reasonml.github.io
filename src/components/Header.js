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
    padding: 10,
    paddingLeft: '2em',
    // height: 100,
    '@media(max-height: 770px)': {
      paddingLeft: '1em'
    },
    '@media(max-width: 400px)': {
      paddingLeft: 10,
      height: 'auto',
    },
  }}>
    <div style={{alignSelf: 'flex-start' }}>
      <Link to="/" style={styles.link}>
        <img css={styles.logo} src={icon} width={50} alt="Reason"/>
      </Link>
    </div>
    <HeaderNav />
  </div>
)

const styles = {
  logo: {
    display: 'block',
    width: 50,
    maxWidth: 50,
    margin: 0,
    border: `2px solid ${gray}`,
    boxSizing: 'content-box',

    '@media(max-height: 770px)': {
      width: 28
    }
  },
  link: {
    textDecoration: 'none',
    color: 'currentColor'
  }
};