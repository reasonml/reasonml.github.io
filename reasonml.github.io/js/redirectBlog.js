/*
 * This code is not run through any build step! Don't add any fancy stuff
 */

(function() {
  var path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '').split('/');
  var page = path[path.length - 1];
  if (page.indexOf('blog') !== 0) {
    return;
  }
  // redirects[page][hash] => new page;
  var redirects = {
    '#reason-3': '2017/10/27/reason3.html',
    '#messengercom-now-50-converted-to-reason': '2017/09/08/messenger-50-reason.html',
    '#way-way-waaaay-nicer-error-messages': '2017/08/25/way-nicer-error-messages.html',
    '#much-better-playground': '2017/08/18/much-better-playground.html',
    '#new-website': '2017/07/14/new-website.html',
    '#new-reasonreact-version-released': '2017/06/12/new-reason-react.html',
    '#spring-cleaning-first-blog-post': '2017/05/18/spring-cleaning.html',
  };

  var hash = window.location.hash
  var base = '/blog/';
  Object.keys(redirects).forEach(function(redirect) {
    if (redirect === hash) {
      // setup html
      var bannerString = '<div id="redirectBanner"><div>Hello! This particular blog post has moved to <a id="redirectLink"></a>. Please update the URLs to reflect it. Thanks!</div></div>';
      var div = document.createElement('div');
      div.innerHTML = bannerString;
      var redirectBanner = div.firstChild;
      var navPusher = document.querySelector('.navPusher');
      navPusher.insertBefore(redirectBanner, navPusher.firstChild);

      var newHash = redirect.split(hash + '-')[1] || '';
      newHash = newHash ? '#' + newHash : newHash;
      var link = document.getElementById('redirectLink');
      var banner = document.getElementById('redirectBanner');
      var location = base + redirects[redirect] + newHash;

      link.textContent = 'https://reasonml.github.io' + location;
      link.href = location;
      banner.style.display = 'block';
    }
  });
})();
