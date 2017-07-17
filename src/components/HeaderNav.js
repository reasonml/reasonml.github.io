import React from "react"
import Link from "./Link"
import {headerFontFamily} from '../utils/typography'

const links = [
  {
    target: '/guide/javascript/quickstart',
    title: 'quickstart',
  },
  {
    target: '/try/',
    title: 'try',
  },
  {
    target: '/guide/',
    title: 'guide',
  },
  {
    target: '/api/index.html',
    title: 'api',
  },
  {
    target: '/community/',
    title: 'community',
  },
  {
    target: '/community/blog/',
    title: 'blog',
  },
  {
    target: 'https://github.com/facebook/reason',
    title: 'github',
  },
]

export default class HeaderNav extends React.Component {
  render() {
    return <div css={styles.links}>
      {links.map(link => (
        <Link css={styles.link} to={link.target} key={link.target}>
          {link.title}
        </Link>
      ))}
    </div>
  }
}

const styles = {
  links: {
    flexDirection: 'row',
    flex: 1,
    overflow: 'auto',
    justifyContent: 'flex-end',
    fontFamily: headerFontFamily(),
  },
  link: {
    padding: 15,
    '@media(max-width: 550px)': {
      padding: 5,
      // fontSize: '.9em',
    },
    '@media(max-width: 400px)': {
      padding: 5,
      fontSize: '.9em',
    }
  },
}
