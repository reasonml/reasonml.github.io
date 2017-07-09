import React from "react"
import Link from "./Link"

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
    target: '/community/roadmap/',
    title: 'road map',
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
  },
  link: {
    padding: 15,
  },
}
