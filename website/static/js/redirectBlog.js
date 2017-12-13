/*
 * This code is not run through any build step! Don't add any fancy stuff
 */

(function() {
  var path = window.location.pathname.split('/');
  var page = path[path.length - 1];
  if (page.indexOf('blog') !== 0) {
    return;
  }
  // redirects[page][hash] => new page;
  var redirects = {
    '#reducers-are-here': '2017/09/01/reducers.html',
    '#reducers-are-here-design-decisions': '2017/09/01/reducers.html#design-decisions',
    '#021-released': '2017/07/05/021.html',
    '#015-released': '2017/06/21/015.html',
    '#major-new-release': '2017/06/09/major-release.html'
  };

  var hash = window.location.hash
  var base = '/reason-react/blog/';
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
