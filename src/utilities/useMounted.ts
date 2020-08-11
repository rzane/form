import { useRef, useEffect } from "react";

export function useMounted(): boolean {
  const ref = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      ref.current = false;
    };
  }, []);

  return ref.current;
}
