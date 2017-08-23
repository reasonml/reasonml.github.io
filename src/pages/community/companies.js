import React from 'react'

// Fisher-Yates Shuffle - https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(array) {
  let counter = array.length

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter)

    // Decrease counter by 1
    counter--

    // And swap the last element with it
    let temp = array[counter]
    array[counter] = array[index]
    array[index] = temp
  }

  return array
}

const companies = shuffle([
  {
    title: 'Ephox',
    url: 'https://www.ephox.com/',
    img: require('./logos/ephox.png'),
  },
  {
    title: 'Viska',
    url: 'https://www.viska.com/',
    img: require('./logos/viska.png'),
  },
])

export default class Companies extends React.Component {
  render() {
    return (
      <div>
        <div>Companies currently using Reason:</div>
        <div css={styles.container}>
          {companies.map(({ title, url, img }) =>
            <a key={title} href={url} css={styles.link}>
              <img src={img} css={styles.img} alt={title} />
            </a>
          )}
        </div>
        <span>
          {"If don't see your company and you're using Reason, please "}
          <a href="https://github.com/reasonml/reasonml.github.io/blob/source/src/pages/community/companies.js">
            add yours to the list
          </a>!
        </span>
      </div>
    )
  }
}

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    margin: 10,
    flexDirection: 'column',
    textDecoration: 'none',
    color: 'currentColor',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  img: {
    width: 250,
    marginBottom: 0.5,
  },
}
