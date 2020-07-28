import * as React from "react";

const generate: () => string = (() => {
  let previousId = 0;
  return () => (previousId++).toString(36);
})();

/**
 * Creates a unique identifier that will remain consistent
 * across re-renders.
 *
 * This hook does not currently support SSR. Support for SSR can
 * be added upon request; however, upcoming versions of React will
 * add support for similar behavior soon.
 *
 * @private
 */
export const useIdentifier = (): string => {
  const ref = React.useRef<string>();

  if (typeof ref.current === "undefined") {
    ref.current = generate();
  }

  return ref.current;
};
