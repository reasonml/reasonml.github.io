/*
 * This code is not run through any build step! Don't add any fancy stuff
 */

(function() {
  var faq = {
    '#should-i-learn-reason-or-ocaml-first': 'docs/en/faq.html#should-i-learn-reason-or-ocaml-first',
    '#im-not-sure-what-to-do-with-reason': 'docs/en/faq.html#i-m-not-sure-what-to-do-with-reason',
    '#whats-the-relation-between-reason-bucklescript-and-ocaml': 'docs/en/faq.html#what-s-the-relation-between-reason-bucklescript-and-ocaml',
    '#where-do-all-these-print_endline-string_of_int-functions-come-from': 'docs/en/faq.html#where-do-all-these-print-endline-string-of-int-functions-come-from',
    '#can-i-have-a-function-to-print-arbitrary-data-structures': 'docs/en/faq.html#can-i-have-a-function-to-print-arbitrary-data-structures',
    '#why-is-there-a--for-adding-ints-and--for-adding-floats-etc': 'docs/en/faq.html#why-is-there-a-for-adding-ints-and-for-adding-floats-etc',
    '#does-library-___-work-with-reason': 'docs/en/faq.html#does-library-work-with-reason',
    '#whats-the-server-side-story-should-i-compile-to-native-or-to-js-and-use-nodejs': 'docs/en/faq.html#what-s-the-server-side-story-should-i-compile-to-native-or-to-js-and-use-nodejs',
    '#whats-bucklescripts-async-story': 'docs/en/faq.html#what-s-bucklescript-s-async-story',
    '#whats-the-unit-test-story': 'docs/en/faq.html#what-s-the-unit-test-story',
    '#whats-the-merlin-file-at-the-root-of-my-project': 'docs/en/faq.html#what-s-the-merlin-file-at-the-root-of-my-project',
    '#i-dont-see-any-import-or-require-in-my-file-how-does-module-resolution-work': 'docs/en/faq.html#i-don-t-see-any-import-or-require-in-my-file-how-does-module-resolution-work',
    '#is-some--none-contents-array-list-and-all-of-these-special-where-do-they-come-from': 'docs/en/faq.html#is-some-none-contents-array-list-and-all-of-these-special-where-do-they-come-from',
    '#what-does-an-argument-with-a-prepended-underscore-eg-_-or-_foo-mean': 'docs/en/faq.html#what-does-an-argument-with-a-prepended-underscore-eg-or-foo-mean',
    '#whats-this-mymodulet-i-keep-seeing': 'docs/en/faq.html#what-s-this-mymodulet-i-keep-seeing',
    '#why-is-there-a-js_promise-and-then-a-jspromise-what-about-js_array-js_string-and-whatever-else': 'docs/en/faq.html#why-is-there-a-js-promise-http-bucklescriptgithubio-bucklescript-api-js-promisehtml-and-then-a-jspromise-http-bucklescriptgithubio-bucklescript-api-jspromisehtml-what-about-js-array-http-bucklescriptgithubio-bucklescript-api-js-arrayhtml-js-string-http-bucklescriptgithubio-bucklescript-api-js-stringhtml-and-whatever-else',
    '#when-will-modular-implicit--multicore--algebraic-effects-be-ready': 'docs/en/faq.html#when-will-modular-implicit-multicore-algebraic-effects-be-ready',
    '#why-are-bucklescript-and-bsb-so-fast-how-can-i-slow-it-down': 'docs/en/faq.html#why-are-bucklescript-and-bsb-so-fast-how-can-i-slow-it-down',
    '#im-seeing-a-weird-cmicmxcmjcma-file-referenced-in-a-compiler-error-where-do-these-files-come-from': 'docs/en/faq.html#i-m-seeing-a-weird-cmi-cmx-cmj-cma-file-referenced-in-a-compiler-error-where-do-these-files-come-from-',
    '#source-files': 'docs/en/faq.html#source-files',
    '#compiled-files': 'docs/en/faq.html#compiled-files',
    '#other-ocaml-ecosystem-files': 'docs/en/faq.html#other-ocaml-ecosystem-files',
    default: 'docs/en/faq.html'
  };
  var examples = {
    default: 'docs/en/community-examples.html'
  };
  var events = {
    default: 'docs/en/events.html'
  };
  var roadmap = {
    '#reason-team-todos': 'docs/en/roadmap.html#reason-team-todos',
    '#near-future': 'docs/en/roadmap.html#near-future',
    '#future': 'docs/en/roadmap.html#future',
    '#your-contribution-opportunities': 'docs/en/roadmap.html#your-contribution-opportunities',
    default: 'docs/en/roadmap.html'
  };
  var community = {
    '#github': 'docs/en/community.html#github',
    default: 'docs/en/community.html',
  };
  var companies = {
    default: 'docs/en/companies-using-reason.html',
  };
  var articlesAndVideos = {
    '#ocaml-concepts': 'docs/en/articles-videos.html#ocaml-concepts',
    '#bucklescript': 'docs/en/articles-videos.html#bucklescript',
    '#reasonreact': 'docs/en/articles-videos.html#reasonreact',
    '#videos': 'docs/en/articles-videos.html#videos',
    '#general-functional-programming--type-system': 'docs/en/articles-videos.html#general-functional-programming-type-system',
    '#pro-links': 'docs/en/articles-videos.html#pro-links',
    default: 'docs/en/articles-videos.html',
  };
  // redirects[page][hash] => new page;
  var redirects = {
    'faq': faq,
    'examples': examples,
    'roadmap': roadmap,
    'community': community,
    'articles-and-videos': articlesAndVideos,
    'events': events,
    'companies': companies,
  };
  var hash = window.location.hash;
  var path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '').split('/');
  var page = path[path.length - 1];
  if (redirects[page]) {
    var link = document.getElementById('redirectLink');
    var location = redirects[page][hash] || redirects[page].default;
    link.textContent = 'https://reasonml.github.io/' + location;
    link.href = '/' + location;
  }
})();
