// Returns a new object with the key/value pairs from `obj` that are not in the array `omitKeys`.
export function omit(obj: any, omitKeys: any) {
  const result = {};
  Object.keys(obj).forEach(key => {
    if (omitKeys.indexOf(key) === -1) {
      // @ts-ignore
      result[key] = obj[key];
    }
  });
  return result;
}

export const keyCodes = {
  esc: 27,
  space: 32,
  tab: 9,
  up: 38,
  down: 40
};

export function debounce(fn: any, time = 166) {
  let timeout: NodeJS.Timeout;

  function debounced(...args: any[]) {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    const later = () => {
      fn.apply(that, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, time);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
}
