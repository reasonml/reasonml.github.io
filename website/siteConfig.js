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
    caption: "Reason Association",
    image: "img/logos/reason-association.svg",
    infoLink: "https://www.reason-association.org",
  },
  {
    caption: "OneGraph",
    image: "img/logos/onegraph.svg",
    infoLink: "https://onegraph.com",
  },
  {
    caption: "Viska",
    image: "img/logos/viska.png",
    infoLink: "https://www.viska.com",
  },
  {
    caption: "BeOp",
    image: "img/logos/beop.svg",
    infoLink: "https://beop.io",
  },
  {
    caption: "Mesopo",
    image: "img/logos/mesopo.svg",
    infoLink: "https://mesopo.ai",
  },
  {
    caption: "Social Tables",
    image: "img/logos/socialtables.svg",
    infoLink: "https://www.socialtables.com",
  },
  {
    caption: "Broadsheet",
    image: "img/logos/broadsheet.svg",
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
    caption: "Tiny",
    image: "img/logos/tiny.svg",
    infoLink: "https://www.tiny.cloud",
  },
  {
    caption: "Rung",
    image: "img/logos/rung.svg",
    infoLink: "https://rung.com.br/"
  },
  {
    caption: "Astrocoders",
    image: "img/logos/astrocoders.svg",
    infoLink: "https://astrocoders.com",
  },
  {
    caption: "Ahrefs",
    image: "img/logos/ahrefs.svg",
    infoLink: "https://ahrefs.com",
  },
  {
    caption: "Dernier Cri",
    image: "img/logos/derniercri.svg",
    infoLink: "https://derniercri.io",
  },
  {
    caption: "Backtrace",
    image: "img/logos/backtrace.svg",
    infoLink: "https://backtrace.io",
  },
  {
    caption: "Mobilunity",
    image: "img/logos/mobilunity.svg",
    infoLink: "https://mobilunity.com",
  },
  {
    caption: "Appier",
    image: "img/logos/appier.svg",
    infoLink: "https://appier.com",
  },
  {
    caption: "InVision",
    image: "img/logos/invision.svg",
    infoLink: "https://www.invision.de",
  },
  {
    caption: "Coursebase",
    image: "img/logos/coursebase.svg",
    infoLink: "https://coursebase.co",
  },
  {
    caption: "Aesthetic Integration",
    image: "img/logos/aesthetic-integration.svg",
    infoLink: "https://www.imandra.ai",
  },
  {
    caption: "Tail Recursive",
    image: "img/logos/tailrecursive.svg",
    infoLink: "https://www.tailrecursive.co",
  },
  {
    caption: "Gangverk",
    image: "img/logos/gangverk.svg",
    infoLink: "http://gangverk.is",
  },
  {
    caption: "LaTeX Base",
    image: "img/logos/latexbase.svg",
    infoLink: "https://latexbase.com",
  },
  {
    caption: "ohne-Makler",
    image: "img/logos/ohne-makler.svg",
    infoLink: "https://www.ohne-makler.net/",
  },
  {
    caption: "Sotheby's",
    image: "img/logos/sothebys.svg",
    infoLink: "https://sothebys.com",
  },
  {
    caption: "上线了 SXL.CN",
    image: "img/logos/sxl.svg",
    infoLink: "https://www.sxl.cn",
  },
  {
    caption: "JoinUp",
    image: "img/logos/joinup.png",
    infoLink: "https://www.joinup.io",
  },
  {
    caption: "Lenus eHealth",
    image: "img/logos/lenus.svg",
    infoLink: "https://lenus.io",
  },
  {
    caption: "Pupilfirst",
    image: "img/logos/pupilfirst.svg",
    infoLink: "https://pupilfirst.com",
  },
  {
    caption: "nittygritty",
    image: "img/logos/nittygritty.svg",
    infoLink: "https://nittygritty.net",
  },
  {
    caption: "Leon Software",
    image: "img/logos/leon-software.svg",
    infoLink: "https://www.leonsoftware.com/",
  },
  {
    caption: "xorlab",
    image: "img/logos/xorlab.svg",
    infoLink: "https://www.xorlab.com/",
  },
  {
    caption: "codeheroes",
    image: "img/logos/codeheroes.svg",
    infoLink: "https://codeheroes.io/",
  },
  {
    caption: "Control Center Apps",
    image: "img/logos/control-center-apps.svg",
    infoLink: "https://www.cca.io/",
  },
  {
    caption: "ruangguru",
    image: "img/logos/ruangguru.svg",
    infoLink: "https://ruangguru.com/"
  },
  {
    caption: "Draftbit",
    image: "img/logos/draftbit.svg",
    infoLink: "https://draftbit.com"
  },
  {
    caption: "Qwick",
    image: "img/logos/qwick.svg",
    infoLink: "https://qwick.com"
  },
  {
    caption: "Revery",
    image: "img/logos/revery.png",
    infoLink: "https://outrunlabs.com/revery"
  },
  {
    caption: "Onivim 2",
    image: "img/logos/onivim2.png",
    infoLink: "https://v2.onivim.io"
  },
  {
    caption: "O(1) Labs",
    image: "img/logos/o1labs.svg",
    infoLink: "https://o1labs.org"
  },
  {
    caption: "minima",
    image: "img/logos/minima.svg",
    infoLink: "https://minima.app"
  },
  {
    caption: "Iteam",
    image: "img/logos/iteam.svg",
    infoLink: "https://iteam.se"
  },
  {
    caption: "Astrolabe Diagnostics",
    image: "img/logos/astrolabe.svg",
    infoLink: "https://astrolabediagnostics.com/"
  }
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
    name: "Mareo",
    image: "img/examples/mareo.png",
    link: "https://github.com/reasonml-community/Mareo",
  },
  {
    name: "Avatar Generator",
    image: "img/examples/avatar-generator.png",
    link: "https://github.com/draftbit/avatar-generator"
  }
]

let reasonHighlightJs = require('reason-highlightjs');

const siteConfig = {
  title: "Reason" /* title for your website */,
  tagline: "Reason lets you write simple, fast and quality type safe code while leveraging both the JavaScript & OCaml ecosystems.",
  url: "https://reasonml.github.io" /* your github url */,
  editUrl: "https://github.com/reasonml/reasonml.github.io/tree/source/docs/",
  translationRecruitingLink: "https://crowdin.com/project/reason",
  baseUrl: "/" /* base url for your project */,
  organizationName: "reasonml",
  projectName: "reasonml.github.io",
  wrapPagesHTML: true,
  headerLinks: [
    { doc: "what-and-why", label: "Docs" },
    { page: "try", label: "Try" },
    { href: "/api/index", label: "API" },
    { doc: "community", label: "Community" },
    { blog: true, label: "Blog" },
    { languages: true },
    { search: true },
    { href: "https://github.com/facebook/reason", label: "GitHub" },
  ],
  users,
  examples,
  onPageNav: 'separate',
  /* path to images for header/footer */
  headerIcon: "img/dummy.svg",
  footerIcon: "img/icon_50.png",
  favicon: "img/icon_50.png",
  /* colors for website */
  colors: {
    primaryColor: "#db4d3f",
    // darkened 10%
    secondaryColor: "#C23426",
  },
  // for the api page
  wrapPagesHTML: true,
  // no .html suffix needed
  cleanUrl: true,
  highlight: {
    theme: 'atom-one-light',
    hljs: function (hljs) {
      hljs.registerLanguage('reason', reasonHighlightJs)
    }
  },
  algolia: {
    apiKey: "966d1e412f67114a07dc0afe44b19b53",
    indexName: "reason",
    algoliaOptions: {
      facetFilters: ["lang:LANGUAGE"]
    }
  },
  disableHeaderTitle: true,
};

module.exports = siteConfig;
