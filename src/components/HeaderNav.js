import React from "react"
// import LanguageSelect from './LanguageSelect'
import Link from "./Link"
import { accent, gray } from "../utils/colors"
import { headerFontFamily } from '../utils/typography'

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
    const isPageHeaderGray = location.pathname.match(/^\/$/)
    let mobileMenu
    let hamburgerButton
    let desktopMenu = (
      <div css={styles.links}>
        {links.map(link => (
          <Link css={styles.link} to={link.target} key={link.target}>
            {link.title}
          </Link>
        ))}
      </div>
    )
    if (this.state.isToggleOn) {
      mobileMenu = (
        <div css={styles.linksMobile}>
          <ul style={{ marginLeft: 0 }}>
          {links.map(link => (
            <li css={styles.mobileMenuItem} key={link.target}>
              <Link css={styles.linkMobile} to={link.target} key={link.target} onClick={this.toggleMenu}>
                {link.title}
              </Link>
            </li>
          ))}
          </ul>
        </div>
      )
      hamburgerButton = (
        <div css={styles.hamburger} onClick={this.toggleMenu}>
          <span css={[styles.hamburgerBar, styles.hamburgerBarX1, !isPageHeaderGray && { background: gray }]} />
          <span css={[styles.hamburgerBar, styles.hamburgerBarX2, !isPageHeaderGray && { background: gray }]} />
        </div>
      )
    } else {
      hamburgerButton = (
        <div css={styles.hamburger} onClick={this.toggleMenu}>
          <span css={[styles.hamburgerBar, !isPageHeaderGray && { background: gray }]} />
          <span css={[styles.hamburgerBar, !isPageHeaderGray && { background: gray }]} />
          <span css={[styles.hamburgerBar, !isPageHeaderGray && { background: gray }]} />
        </div>
      )
    }
    return (
      <div css={styles.linkContainer}>
        {desktopMenu}
        {mobileMenu}
        {hamburgerButton}
      </div>
    )
  }
}

const styles = {
  links: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    '@media(max-width: 550px)': {
      display: 'none',
      justifyContent: 'space-evenly',
    },
  },
  link: {
    padding: '0 10px',
    fontSize: '.9em',
  },
  linksMobile: {
    alignSelf: 'left',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    '@media(min-width: 550px)': {
      display: 'none',
    },
  },
  linkMobile: {
    padding: '0 10px',
    fontSize: '1.2em',
  },
  hamburger: {
    height: 54,
    width: 54,
    '@media(min-width: 550px)': {
      display: 'none',
    },
  },
  hamburgerBar: {
    width: '30px',
    height: '4px',
    margin: '2.5px 0 2.5px 0',
    background: accent,
    borderRadius: '3px',
  },
  hamburgerBarX1: {
    transform: 'rotate(45deg) translate(6px, 6px)',
  },
  hamburgerBarX2: {
    transform: 'rotate(-45deg) translate(0, -1px)',
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
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  },
}
