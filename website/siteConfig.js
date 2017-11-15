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
  sourceCodeButton: null,
  baseUrl: "/" /* base url for your project */,
  projectName: "Reason",
  headerLinks: [
    // { doc: "installation", label: "Docs" },
    // { doc: "simple", label: "Examples" },
    // { doc: "community", label: "Community" },
    { doc: "quickstart-javascript", label: "Quick Start" },
    { doc: "guide", label: "Guide" },
    { page: "try", label: "Try" },
    { blog: true, label: "Blog" },
    { languages: true },
    { search: true },
    { href: "https://github.com/facebook/reason", label: "GitHub" },
  ],
  users,
  examples,
  /* path to images for header/footer */
  headerIcon: "img/reason-react-white.svg",
  footerIcon: "img/reason-react-white.svg",
  favicon: "img/reason-react-red.svg",
  /* colors for website */
  colors: {
    primaryColor: "#db4d3f",
    secondaryColor: "#db4d3f"
  },
  highlight: {
    theme: "solarized-dark"
  },
  algolia: {
    apiKey: "55156da6520de795d3a2c2d23786f08e",
    indexName: "reason"
  },
};

module.exports = siteConfig;


/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
// const users = [
//   {
//     caption: "Prettier",
//     image: "/img/prettier.png",
//     infoLink: "https://www.prettier.io",
//     pinned: true
//   },
//   {
//     caption: "FastText",
//     image: "/img/fasttext.png",
//     infoLink: "https://fasttext.cc",
//     pinned: true
//   },
//   {
//     caption: "Jest",
//     image: "/img/jest.png",
//     infoLink: "https://facebook.github.io/jest/",
//     pinned: true
//   },
//   {
//     caption: "Docusaurus",
//     image: "/img/docusaurus.svg",
//     infoLink: "https://www.docusaurus.io",
//     pinned: true
//   }
// ];

// const siteConfig = {
//   title: "Docusaurus",
//   tagline: "Easy to Maintain Open Source Documentation Websites",
//   url: "https://docusaurus.io",
//   baseUrl: "/",
//   projectName: "Docusaurus",
//   cname: "docusaurus.io",
//   noIndex: true,
//   users,
//   editUrl:
//     "https://github.com/facebookexperimental/docusaurus/edit/master/docs/",
//   headerLinks: [
//     // { doc: "installation", label: "Docs" },
//     // { page: "help", label: "Help" },
//     { blog: true, label: "Blog" },
//     {
//       href: "https://github.com/facebookexperimental/docusaurus",
//       label: "GitHub"
//     }
//   ],
//   headerIcon: "img/docusaurus.svg",
//   footerIcon: "img/docusaurus_monochrome.svg",
//   favicon: "img/docusaurus.ico",
//   algolia: {
//     apiKey: "3eb9507824b8be89e7a199ecaa1a9d2c",
//     indexName: "docusaurus"
//   },
//   colors: {
//     primaryColor: "#2E8555",
//     secondaryColor: "#205C3B"
//   },
//   translationRecruitingLink: "https://crowdin.com/project/docusaurus",
//   copyright: "Copyright © " + new Date().getFullYear() + " Facebook Inc.",
//   highlight: {
//     theme: "solarized-dark"
//   }
// };


// module.exports = siteConfig;