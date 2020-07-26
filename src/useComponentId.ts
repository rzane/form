import * as React from "react";

const generate: () => number = (() => {
  let previousId = 0;
  return () => ++previousId;
})();

export const useComponentId = (): number => {
  const ref = React.useRef<number>();

  if (typeof ref.current === "undefined") {
    ref.current = generate();
  }

  return ref.current;
};
