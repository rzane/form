import { useRef, useEffect, MutableRefObject } from "react";

export function useMounted(): MutableRefObject<boolean> {
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
