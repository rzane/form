/**
 * If the value returned by the function is not a promise, convert it.
 * Make sure to catch errors that are thrown syncronously.
 */
export function toPromise<T>(fn: () => T | PromiseLike<T>): Promise<T> {
  try {
    return Promise.resolve(fn());
  } catch (error) {
    return Promise.reject(error);
  }
}
