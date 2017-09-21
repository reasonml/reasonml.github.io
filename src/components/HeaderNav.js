import React from "react"
// import LanguageSelect from './LanguageSelect'
import Link from "./Link"
import {headerFontFamily} from '../utils/typography'

const links = [
  {
    target: '/guide/javascript/quickstart',
    title: 'Quick Start',
  },
  {
    target: '/try/',
    title: 'Try',
  },
  {
    target: '/guide/',
    title: 'Guide',
  },
  {
    target: '/api/index.html',
    title: 'API',
  },
  {
    target: '/community/',
    title: 'Community',
  },
  {
    target: '/community/blog/',
    title: 'Blog',
  },
  {
    target: 'https://github.com/facebook/reason',
    title: 'GitHub',
  },
]

export default class HeaderNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isToggleOn: false}
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  toggleMenu() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
  }
  render() {
    let isToggleOn = this.state.isToggleOn
    let mobileMenu
    let hamburgerButtonClass
    let hamburgerButton = '☰'
    if(isToggleOn) {
      mobileMenu = <div css={styles.linksMobile}>
        <ul>
        {links.map(link => (
          <li css={styles.mobileMenuItem} key={link.target}>
            <Link css={styles.linkMobile} to={link.target} key={link.target} onClick={this.toggleMenu}>
              {link.title}
            </Link>
          </li>
        ))}
        </ul>
        </div>
      hamburgerButton = "X"
      }
    if(document.location.pathname==='/') {
      hamburgerButtonClass = styles.hamburgerButtonOrange
    } else {
      hamburgerButtonClass = styles.hamburgerButton
    }
      return <div css={styles.linkContainer}>
      <div css={styles.links}>
        {links.map(link => (
          <Link css={styles.link} to={link.target} key={link.target}>
            {link.title}
          </Link>
        ))}
        <span css={styles.hamburger} onClick={this.toggleMenu}>
          <button css={hamburgerButtonClass}>
            {hamburgerButton}
          </button>
        </span>
      </div>
      {mobileMenu}
    </div>
  }
}

const styles = {
  links: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    '@media(max-width: 550px)': {
      justifyContent: 'space-evenly',
    },
  },
  link: {
    padding: '0 10px',
    '@media(max-width: 550px)': {
      visibility: 'hidden',
      fontSize: '.9em',
    },
  },
  linksMobile: {
    alignSelf: 'left',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    '@media(max-width: 550px)': {
      justifyContent: 'space-evenly',
    },
  linkMobile: {
    padding: '0 10px',
    '@media(max-width: 550px)': {
      visibility: 'hidden',
      fontSize: '1.2em',
    },
  },
  },
  hamburger: {
    '@media(min-width: 550px)': {
      visibility: 'hidden',
    },
    padding: '0 10px',
    '@media(max-width: 550px)': {
      visibility: 'visible',
    },
  },
  mobileMenuItem: {
          listStyle: 'none',
  },
  linkContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    overflow: 'auto',
    fontFamily: headerFontFamily(),
    '@media(max-width: 550px)': {
      alignItems: 'flex-end',
      flexDirection: 'column',
    },
  },
  hamburgerButton: {
    fontSize: "2em",
    color: '#fff',
  },
  hamburgerButtonOrange: {
    fontSize: "2em",
    color: '#db4d3f',
  },
}
