/*
 * This code is not run through any build step! Don't add any fancy stuff
 */

(function() {
  console.log('hit====');
  var faq = {
    '#frequently-asked-questions-common-type-errors': 'im-having-a-type-error.html',
    '#frequently-asked-questions-how-do-i-do-props-spreading-div-thisprops': 'props-spread.html',
    default: 'im-having-a-type-error.html'
  };
  var examples = {
    '#examples-simple': 'simple.html',
    '#examples-counter': 'counter.html',
    '#examples-reasonreact-using-reactjs': 'retained-props.html',
    '#examples-reasonreact-using-reactjs': 'reason-using-js.html',
    '#examples-reactjs-using-reasonreact': 'js-using-reason.html',
    default: 'simple.html'
  };
  var gettingStarted = {
    '#getting-started': 'installation.html',
    '#getting-started-bsb': 'installation.html#bsb',
    '#getting-started-reason-scripts': 'installation.html#reason-scripts',
    default: 'installation.html'
  };
  var community = {
    '#getting-started': 'installation.html',
    '#getting-started-bsb': 'installation.html#bsb',
    'articles-and-videos': 'installation.html#reason-scripts',
    'blog': '/blog',
    default: '/docs/en/community.html',
  };
  var articlesAndVideos = {
    '#ocaml-concepts': '/docs/en/articles-videos.html#ocaml-concepts',
    '#bucklescript': '/docs/en/articles-videos.html#bucklescript',
    '#reasonreact': '/docs/en/articles-videos.html#reasonreact',
    '#videos': '/docs/en/articles-videos.html#videos',
    '#general-functional-programming--type-system': '/docs/en/articles-videos.html#general-functional-programming--type-system',
    '#pro-links': '/docs/en/articles-videos.html#pro-links',
    default: '/docs/en/articles-videos.html',
  };
  // redirects[page][hash] => new page;
  var redirects = {
    'faq': faq,
    'examples': examples,
    'gettingStarted': gettingStarted,
    'community': community,
    'articles-and-videos': articlesAndVideos,
  };
  var hash = window.location.hash;
  var path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '').split('/');
  console.log(path,' -------');
  var page = path[path.length - 1];
  if (redirects[page]) {
    var link = document.getElementById('redirectLink');
    var location = redirects[page][hash] || redirects[page].default;
    link.textContent = 'https://reasonml.github.io' + location;
    link.href = location;
  }
})();
