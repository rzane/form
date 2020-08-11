type Path = Array<string | number>;

/**
 * Update the value at a given path without mutating the original data.
 *
 * @private
 */
export function setIn(data: any, path: Path, value: any): any {
  if (!path.length) {
    return value;
  }

  let next;
  const [key, ...rest] = path;

  if (typeof key === "number") {
    next = Array.isArray(data) ? data.slice() : [];
  } else {
    next = Object.assign({}, data);
  }

  next[key] = setIn(next[key], rest, value);
  return next;
}
