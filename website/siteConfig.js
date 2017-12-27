const resaurus = require('resaurus');

const users = [
  {
    caption: "Facebook",
    image: "img/logos/facebook.svg",
    infoLink: "https://www.facebook.com",
    pinned: true
  },
  {
    caption: "Messenger",
    image: "img/logos/messenger.svg",
    infoLink: "https://messenger.com",
    pinned: true
  },
  {
    caption: "WOW air",
    image: "img/logos/wowair.svg",
    infoLink: "https://wowair.com",
    pinned: true
  },
  {
    caption: "BeOpinion",
    image: "img/logos/beopinion.svg",
    infoLink: "https://beopinion.com",
    pinned: true
  },
  {
    caption: "Gain by Sentia",
    image: "img/logos/gain_logo.svg",
    infoLink: "https://gain.ai",
    pinned: true
  },
  {
    caption: "Social Tables",
    image: "img/logos/socialtables.svg",
    infoLink: "https://www.socialtables.com",
    pinned: true
  },
];

const examples = [
  {
    name: "Hacker News",
    image: "img/examples/hn.png",
    link: "https://github.com/reasonml-community/reason-react-hacker-news",
  },
  {
    name: "TodoMVC",
    image: "img/examples/todomvc.png",
    link: "https://github.com/reasonml-community/reason-react-example/tree/master/src/todomvc",
  }
]

const siteConfig = {
  title: "Reason" /* title for your website */,
  tagline: "Reason lets you write simple, fast and quality type safe code while leveraging both the JavaScript & OCaml ecosystems.",
  url: "https://reasonml.github.io/" /* your github url */,
  editUrl: "https://github.com/facebook/reason/tree/master/docs/",
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
  headerIcon: "img/icon_50.png",
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
