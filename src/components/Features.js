import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"
import {headerFontFamily} from '../utils/typography'
import { dividerLine } from '../utils/colors'

const intersperse = (items, fn) =>
  items.reduce(
    (items, item, i) => (i === 0 ? [item] : [...items, fn(i), item]),
    []
  )

export default class Features extends React.Component {
  render() {
    const items = this.props.features.map(
      ({ title, description, action, url }) =>
        <div css={styles.feature} key={url}>
          <h4 css={styles.title}>
            {title}
          </h4>
          <div css={styles.description}>
            {description}
          </div>
          <div css={{marginTop: 'auto'}}>
            <Link css={styles.button} to={url}>
              {action}
            </Link>
          </div>
        </div>
    )

    return (
      <div css={styles.container}>
        {intersperse(items, key => <div key={key} css={styles.divider} />)}
      </div>
    )
  }
}

const accent = '#db4d3f'

const styles = {
  container: {
    flexDirection: 'row',
    '@media(max-width: 900px)': {
      flexDirection: 'column'
    }
  },
  feature: {
    flex: 1,
    alignItems: 'center',
    padding: 38
  },
  divider: {
    flexBasis: 1,
    backgroundColor: dividerLine,
    margin: '30px 0',
    '@media(max-width: 900px)': {
      margin: 0
    }
  },

  button: {
    fontFamily: headerFontFamily(),
    border: '1px solid currentColor',
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: '5px 15px',
    textDecoration: 'none',
    color: 'currentColor',
    marginTop: '1em',
    fontSize: '.9em'
  },

  title: {
    marginBottom: '.5em',
    textAlign: 'center'
  },

  description: {
    fontFamily: headerFontFamily(),
    fontSize: 16,
    lineHeight: 1.6,
    textAlign: 'center',
    maxWidth: 300
  }
}
