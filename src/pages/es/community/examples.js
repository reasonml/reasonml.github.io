import React from 'react'

const examples = [{
  title: 'Reason Maze',
  url: 'https://github.com/jaredly/reason-maze',
  img: require('./example-screenshots/reason-maze.png'),
}, {
  title: 'Mareo: Mario + Reason',
  url: 'https://github.com/chenglou/Mareo',
  img: require('./example-screenshots/mareo.png'),
}, {
  title: 'ReasonReact Hacker News',
  url: 'https://github.com/jsdf/reason-react-hacker-news',
  img: require('./example-screenshots/hacker-news.png'),
}, {
  title: 'Reason snake',
  url: 'https://github.com/rdavison/llama-snake/tree/master/websnake',
  img: require('./example-screenshots/llama-snake.png'),
}]

export default class Examples extends React.Component {
  render() {
    return <div css={styles.container}>
      {examples.map(({title, url, img}, index) => (
        <a key={index} href={url} css={styles.link}>
          <img src={img} css={styles.img} />
          <span css={styles.title}>{title}</span>
        </a>
      ))}
    </div>
  }
}

const styles = {
  container: {
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
    }
  },
  img: {
    width: 250,
    height: 250,
    marginBottom: .5,
  },
  title: {

  }
}
