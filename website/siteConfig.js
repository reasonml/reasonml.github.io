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
      caption: "OneGraph",
      image: "img/logos/onegraph.svg",
      infoLink: "https://onegraph.com",
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
    caption: "ephox",
    image: "img/logos/ephox.svg",
    infoLink: "https://www.ephox.com",
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
    caption: "Root",
    image: "img/logos/root.svg",
    infoLink: "https://root.co.za",
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
  }
]

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
    { doc: "quickstart-javascript", label: "Docs" },
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
    hljs: function(hljs) {
      hljs.registerLanguage('reason', function(hljs) {
        var SWIFT_KEYWORDS = {
            forDocGrammarHighlighting: 'ifTrue ifFalse expression testCondition startVal endVal typeConstraint typeName typeFactoryName argOneType argTwoType finalArgType typeStructure typeParam typeArg1 typeArg2 typeParam1 typeParam2 argOne argTwo finalArg argument argumentType expressionType identifier',
            keyword: 'class deinit enum extension func import init rec class let pub pri val inherit ref mutable protocol static ' +
              'module include struct subscript type typealias var break case continue default do ' +
              'else fallthrough if in of for to downto return switch where while as dynamicType ' +
              'is new super self Self Type __COLUMN__ __FILE__ __FUNCTION__ ' +
              '__LINE__ associativity didSet get infix inout left mutating none ' +
              'nonmutating operator override postfix precedence prefix => right set '+
              'unowned unowned safe unsafe weak willSet',
            literal: 'true false nil',
            built_in: 'abs advance alignof alignofValue assert bridgeFromObjectiveC ' +
              'bridgeFromObjectiveCUnconditional bridgeToObjectiveC ' +
              'bridgeToObjectiveCUnconditional c contains count countElements ' +
              'countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump ' +
              'encodeBitsAsWords enumerate equal filter find getBridgedObjectiveCType ' +
              'getVaList indices insertionSort isBridgedToObjectiveC ' +
              'isBridgedVerbatimToObjectiveC isUniquelyReferenced join ' +
              'lexicographicalCompare map max maxElement min minElement numericCast ' +
              'partition posix print println quickSort reduce reflect reinterpretCast ' +
              'reverse roundUpToAlignment sizeof sizeofValue sort split startsWith strideof ' +
              'strideofValue swap swift toString transcode underestimateCount ' +
              'unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer ' +
              'withUnsafePointerToObject withUnsafePointers withVaList'
          };

        var TYPE = {
          className: 'type',
          begin: '\\b[A-Z][\\w\']*',
          relevance: 0
        };
        var BLOCK_COMMENT = hljs.COMMENT(
          '/\\*',
          '\\*/',
          {
            contains: ['self']
          }
        );
        var SUBST = {
          className: 'subst',
          begin: /\\\(/, end: '\\)',
          keywords: SWIFT_KEYWORDS,
          contains: [] // assigned later
        };
        var NUMBERS = {
            className: 'number',
            begin: '\\b([\\d_]+(\\.[\\deE_]+)?|0x[a-fA-F0-9_]+(\\.[a-fA-F0-9p_]+)?|0b[01_]+|0o[0-7_]+)\\b',
            relevance: 0
        };
        var QUOTE_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, {
          contains: [SUBST, hljs.BACKSLASH_ESCAPE]
        });
        SUBST.contains = [NUMBERS];

        return {
          keywords: SWIFT_KEYWORDS,
          contains: [
            QUOTE_STRING_MODE,
            hljs.C_LINE_COMMENT_MODE,
            BLOCK_COMMENT,
            TYPE,
            NUMBERS,
            {
              className: 'func',
              beginKeywords: 'fun', end: '=>', excludeEnd: true,
              contains: [
                hljs.inherit(hljs.TITLE_MODE, {
                  begin: /[A-Za-z$_][0-9A-Za-z$_]*/,
                  illegal: /\(/
                }),
                {
                  className: 'generics',
                  begin: /</, end: />/,
                  illegal: />/
                },
                {
                  className: 'params',
                  begin: /\s/, end: /\=\>/, endsParent: true, excludeEnd: true,
                  keywords: SWIFT_KEYWORDS,
                  contains: [
                    'self',
                    NUMBERS,
                    QUOTE_STRING_MODE,
                    hljs.C_BLOCK_COMMENT_MODE,
                    {begin: ':'} // relevance booster
                  ],
                  illegal: /["]/
                }
              ],
              illegal: /\[|%/
            },
            {
              className: 'class',
              beginKeywords: 'module struct protocol class extension enum',
              keywords: SWIFT_KEYWORDS,
              end: '\\{',
              excludeEnd: true,
              contains: [
                hljs.inherit(hljs.TITLE_MODE, {begin: /[A-Za-z$_][0-9A-Za-z$_]*/})
              ]
            },
            {
              className: 'preprocessor', // @attributes
              begin: '(@assignment|@class_protocol|@exported|@final|@lazy|@noreturn|' +
                        '@NSCopying|@NSManaged|@objc|@optional|@required|@auto_closure|' +
                        '@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|' +
                        '@infix|@prefix|@postfix)'
            }
          ]
        };
      });
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

