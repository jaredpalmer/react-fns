/*
 * This code is not run through any build step! Don't add any fancy stuff
 */

(function() {
  // redirects[page][hash] => new page;
  var redirects = {
    'reason-react': 'reason-react.html',
    'intro-example': 'intro-example.html',
    'jsx': 'jsx.html',
    'component-creation': 'creation-props-self.html',
    'react-element': 'render.html',
    'interop-with-existing-javascript-components': 'interop.html',
    'events': 'event.html',
    'styles': 'style.html',
    'cloneelement': 'clone-element.html',
    'working-with-children': 'children.html',
    'working-with-dom': 'dom.html',
    'convert-over-reactjs-idioms': 'convert.html',
    'miscellaneous': 'context-mixins.html',
    'common-type-errors': 'im-having-a-type-error.html',
  };
  // they all start with reason-react
  var hash = window.location.hash
  if (hash.indexOf('reason-react') !== 1) {
    return;
  }
  if (hash === '#reason-react') {
    hash = 'reason-react';
  } else {
    hash = hash.split('reason-react-')[1];
  }
  var path = window.location.pathname.split('/');
  var page = path[path.length - 1];
  var base = '/reason-react/docs/en/';
  Object.keys(redirects).forEach(function(redirect) {
    if (redirect.indexOf(hash) === 0) {
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
