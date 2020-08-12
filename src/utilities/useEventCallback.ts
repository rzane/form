import { useRef, useCallback, useLayoutEffect, useEffect } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined"
    ? useLayoutEffect
    : useEffect;

/**
 * @private
 *
 * Creates a new callback, scoped to the current props and state
 * on each render. The returned function will always maintain
 * the same identity, which avoids re-renders.
 */
export function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
  const ref = useRef(fn);

  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  });

  return useCallback(
    (...args: any[]) => ref.current.apply(void 0, args),
    []
  ) as T;
}
