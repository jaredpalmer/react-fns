export let supportsPassiveListener = false;

const noop = () => {};

try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassiveListener = true;
    },
  });
  (window as EventTarget).addEventListener('testPassive', noop, opts);
  (window as EventTarget).removeEventListener('testPassive', noop, opts);
} catch (e) {}
