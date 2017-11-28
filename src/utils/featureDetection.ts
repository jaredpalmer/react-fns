export let supportsPassiveListener = false;

try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassiveListener = true;
    },
  });
  (window as EventTarget).addEventListener('testPassive', undefined, opts);
  (window as EventTarget).removeEventListener('testPassive', undefined, opts);
} catch (e) {}

export const supportsVibrationAPI = navigator && 'vibrate' in navigator;
