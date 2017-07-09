import React from "react"
import Link from "gatsby-link"

const links = [
  {
    target: '/guide/javascript/quickstart',
    title: 'quickstart',
  },
  {
    target: '/guide/',
    title: 'guide',
  },
  {
    target: '/community/',
    title: 'community',
  },
  {
    target: '/roadmap/',
    title: 'road map',
  },
  {
    target: 'https://github.com/facebook/reason',
    title: 'github',
    external: true,
  },
]

export default class HeaderNav extends React.Component {
  render() {
    return <div css={styles.links}>
      {links.map(link => (
        link.external
        ? <a href={link.target} key={link.target} css={styles.link}>
            {link.title}
          </a>
        : <Link css={styles.link} to={link.target} key={link.target}>
            {link.title}
          </Link>
      ))}
    </div>
  }
}

const styles = {
  links: {
    flexDirection: 'row',
  },
  link: {
    padding: 15,
    textDecoration: 'none',
    color: 'currentColor',
  },
}
