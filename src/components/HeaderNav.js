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
  render() {
    return <div css={styles.linkContainer}>
      <div css={styles.links}>
        {links.map(link => (
          <Link css={styles.link} to={link.target} key={link.target}>
            {link.title}
          </Link>
        ))}
      </div>
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
      fontSize: '.9em',
    },
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
}
