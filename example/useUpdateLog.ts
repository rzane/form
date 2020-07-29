import { useRef, useEffect } from "react";

export function useUpdateLog(name: string, props: object) {
  const prevProps = useRef<object>();

  useEffect(() => {
    const { current } = prevProps;

    if (current) {
      const diff = {};

      for (const key of Object.keys({ ...current, ...props })) {
        if (current[key] !== props[key]) {
          diff[key] = { from: current[key], to: props[key] };
        }
      }

      if (Object.keys(diff).length) {
        console.log(
          `%c[updated] %c${name}`,
          "font-weight: bold;",
          "color: dodgerblue; font-weight: bold;",
          diff
        );
      }
    }

    prevProps.current = props;
  });
}
