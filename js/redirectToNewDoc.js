/*
 * This code is not run through any build step! Don't add any fancy stuff
 */

(function() {
  var specializedDocsRedirect = {
    'interop': 'docs/manual/latest/introduction',
    'syntax-cheatsheet': 'docs/manual/latest/overview',
    'pipe-first': 'docs/manual/latest/pipe',
    'promise': 'docs/manual/latest/promise',
    'libraries': 'docs/manual/latest/libraries',
    'converting-from-js': 'docs/manual/latest/converting-from-js',
  }
  var path = window.location.pathname.split('/');
  var blogPageFullPath = path.slice(2).join('/')
  var page = path[path.length - 1];

  if (path[1] === 'docs'
      && page != null
      // && page !== 'installation' uncomment to test more easily
      ) {
    if (specializedDocsRedirect[page] != null) {
      window.location = 'https://rescript-lang.org/' + specializedDocsRedirect[page]
    }
  }
})();