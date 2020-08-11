import * as React from "react";

export function useMounted(): boolean {
  const ref = React.useRef<boolean>(true);

  React.useEffect(() => {
    return () => {
      ref.current = false;
    };
  }, []);

  return ref.current;
}
