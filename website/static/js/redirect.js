/*
 * This code is not run through any build step! Don't add any fancy stuff
 */

(function() {
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
  // redirects[page][hash] => new page;
  // yarn start only supports faq.html format, but gh pages upens up the other two.
  var redirects = {
    'faq.html': faq,
    'faq': faq,
    'faq/': faq,
    'examples.html': examples,
    'examples': examples,
    'examples/': examples,
    'gettingStarted.html': gettingStarted,
    'gettingStarted': gettingStarted,
    'gettingStarted/': gettingStarted,
  };
  var hash = window.location.hash;
  var base = '/reason-react/docs/en/';
  var path = window.location.pathname.split('/');
  var page = path[path.length - 1];
  if (redirects[page]) {
    var link = document.getElementById('redirectLink');
    var location = base +
      (redirects[page][hash] || redirects[page].default);
    link.textContent = 'https://reasonml.github.io' + location;
    link.href = location;
  }
})();
