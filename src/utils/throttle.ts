/**
 * Throttling enforces a maximum number of times a function
 * can be called over time.
 *
 * @param func a function
 * @param wait time
 */

export function throttle(func: Function, wait: Number) {
  let timeout: number | null = null;
  let callbackArgs = null;
  const context = this;

  const later = () => {
    func.apply(context, callbackArgs);
    timeout = null;
  };

  return function() {
    if (!timeout) {
      callbackArgs = arguments;
      timeout = setTimeout(later, wait);
    }
  };
}
