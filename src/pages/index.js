import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"

import Features from '../components/Features'

const links = [
  {
    target: '/learn/',
    title: 'quickstart',
  },
  {
    target: '/guide/',
    title: 'learn',
  },
  {
    target: '/community/',
    title: 'community',
  },
  {
    target: '/roadmap/',
    title: 'road map',
  },
]

const features = [
  {
    title: 'Types without hassle',
    description: 'Powerful type inference means you rarely have to annotate types, but everything gets checked for you.',
    action: 'See how',
    url: '/docs/types',
  },
  {
    title: 'Web or Native',
    description: 'Write your frontend, backend, and build tools all in the same language -- without compromising on speed.',
    action: 'Native quickstart',
    url: '/docs/native/quickstart',
  },
  {
    title: 'Easy JavaScript interop',
    description: 'Use packages from npm with minimum hassle, or drop in a snippet of raw JavaScript while you\'re learning',
    action: 'Learn more',
    url: '/docs/javascript/interop',
  },
  {
    title: 'Flexible & Fun',
    description: 'Make websites, games, servers, build tools, and more! Take a look at these examples to get inspired.',
    action: 'See examples',
    url: '/community/examples',
  }
];

export default class Index extends React.Component {
  render() {
    return (
      <div css={styles.container}>
        <div css={[styles.header]}>
          <div css={styles.content}>
            <div css={styles.top}>
              <img style={{margin: 0}} src="/static/icon_50.png" width={50}/>
              <div css={styles.links}>
                {links.map(link => (
                  <Link css={styles.link} to={link.target} key={link.target}>
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
            <div css={{alignItems: 'center'}}>
              <img src="/static/reason_300.png" width={300} />
              {/*<h1>Reason</h1>*/}
              <p css={styles.description}>
                Reason is a new syntax and toolchain for OCaml, a powerful
                language that will give you type-safe, maintainable code that
                transforms into performant, readable JavaScript.
              </p>
              <div css={{flexDirection: 'row', marginBottom: '1.5em'}}>
                <Link to="/guide/get-started/" css={styles.button}>
                  Get started
                </Link>
                <Link to="/guide/" css={styles.button}>
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div css={[styles.body, styles.features]}>
          <div css={[styles.content]}>
            <div css={styles.featuresDivider} />
            <Features
              features={features}
            />
          </div>
        </div>
      </div>
    )
  }
}

const accent = '#db4d3f';

const styles = {
  container: {
    fontFamily: '"Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif',
  },
  header: {
    backgroundColor: '#f6f4f4',
    alignItems: 'center',
  },

  description: {
    width: 600,
    fontWeight: 200,
    fontSize: '1.5em',
    lineHeight: '1.5em',
    textAlign: 'center',
    textShadow: '1px 1px white',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
  },
  links: {
    flexDirection: 'row',
  },
  content: {
    width: 1270,
    alignSelf: 'center',
  },

  button: {
    textDecoration: 'none',
    background: accent,
    border: '1px solid #aaa',
    border: 'none',
    color: 'white',
    padding: '8px 34px',
    borderRadius: 5,
    margin: 10,
  },
  link: {
    padding: 15,
    textDecoration: 'none',
    color: 'currentColor',
  },
  featuresDivider: {
    height: 1,
    backgroundColor: '#cecece',
  },
  features: {
    // backgroundColor: '#d0d0d0',
    backgroundColor: '#f6f4f4',
  },
  body: {

  }
}
