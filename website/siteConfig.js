const resaurus = require('resaurus');

const users = [
  {
    caption: "Facebook",
    image: "img/logos/facebook.svg",
    infoLink: "https://www.facebook.com",
  },
  {
    caption: "Messenger",
    image: "img/logos/messenger.svg",
    infoLink: "https://messenger.com",
  },
  {
    caption: "WOW air",
    image: "img/logos/wowair.svg",
    infoLink: "https://wowair.com",
  },
  {
    caption: "Viska",
    image: "img/logos/viska.png",
    infoLink: "https://www.viska.com",
  },
  {
    caption: "BeOpinion",
    image: "img/logos/beopinion.svg",
    infoLink: "https://beopinion.com",
  },
  {
    caption: "Sentia",
    image: "img/logos/sentia.jpg",
    infoLink: "https://sentia.ai",
  },
  {
    caption: "Gain by Sentia",
    image: "img/logos/gain.svg",
    infoLink: "https://gain.ai",
  },
  {
    caption: "Social Tables",
    image: "img/logos/socialtables.svg",
    infoLink: "https://www.socialtables.com",
  },
  {
    caption: "Broadsheet",
    image: "img/logos/broadsheet.jpg",
    infoLink: "https://www.broadsheet.com.au",
  },
  {
    caption: "Toughbyte",
    image: "img/logos/toughbyte.svg",
    infoLink: "http://www.toughbyte.com",
  },
  {
    caption: "g2i.co",
    image: "img/logos/g2i.png",
    infoLink: "http://g2i.co",
  },
  {
    caption: "ephox",
    image: "img/logos/ephox.png",
    infoLink: "https://www.ephox.com",
  },
];

const examples = [
  {
    name: "Hacker News",
    image: "img/examples/hacker-news.png",
    link: "https://github.com/reasonml-community/reason-react-hacker-news",
  },
  {
    name: "Maze",
    image: "img/examples/maze.png",
    link: "https://github.com/jaredly/reason-maze",
  },
  {
    name: "TodoMVC",
    image: "img/examples/todomvc.png",
    link: "https://github.com/reasonml-community/reason-react-example/tree/master/src/todomvc",
  },
  {
    name: "Mereo",
    image: "img/examples/mareo.png",
    link: "https://github.com/reasonml-community/Mareo",
  }
]

const siteConfig = {
  title: "Reason" /* title for your website */,
  tagline: "Reason lets you write simple, fast and quality type safe code while leveraging both the JavaScript & OCaml ecosystems.",
  url: "https://reasonml.github.io/" /* your github url */,
  editUrl: "https://github.com/reasonml/reasonml.github.io/tree/source/docs/",
  translationRecruitingLink: "https://crowdin.com/project/reason",
  baseUrl: "/" /* base url for your project */,
  projectName: "Reason",
  wrapPagesHTML: true,
  headerLinks: [
    // { doc: "installation", label: "Docs" },
    // { doc: "simple", label: "Examples" },
    // { doc: "community", label: "Community" },
    { doc: "quickstart-javascript", label: "Docs" },
    { page: "try", label: "Try" },
    { href: "/api/index.html", label: "API" },
    { doc: "community", label: "Community" },
    { blog: true, label: "Blog" },
    { languages: true },
    { search: true },
    { href: "https://github.com/facebook/reason", label: "GitHub" },
  ],
  users,
  examples,
  /* path to images for header/footer */
  headerIcon: "img/dummy.svg",
  footerIcon: "img/icon_50.png",
  favicon: "img/icon_50.png",
  /* colors for website */
  algolia: {
    apiKey: "55156da6520de795d3a2c2d23786f08e",
    indexName: "reason"
  },
  disableHeaderTitle: true,
};

module.exports = resaurus(siteConfig);
