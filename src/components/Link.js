import Link from 'gatsby-link'
import React from 'react'

export default ({to, css, ...props}) => to.match(/^https?:\/\//)
  ? <a href={to} {...props} css={[style, css]} />
  : <Link to={to} {...props} css={[style, css]} />

const style = {
  textDecoration: 'none',
  color: 'currentColor',
  ':hover': {
    textDecoration: 'underline',
  }
};
