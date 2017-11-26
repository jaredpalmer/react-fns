export let supportsPassiveListener = false;

try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassiveListener = true;
    },
  });
  (window as EventTarget).addEventListener('testPassive', null, opts);
  (window as EventTarget).removeEventListener('testPassive', null, opts);
} catch (e) {}
