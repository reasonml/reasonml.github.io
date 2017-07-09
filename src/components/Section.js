import React from 'react'

const Section = ({children, backgroundColor, className}) => (
  <div css={{backgroundColor, flexDirection: 'row', justifyContent: 'center'}}>
    <div css={{maxWidth: 1270, flex: 1}} className={className} children={children} />
  </div>
)
export default Section
