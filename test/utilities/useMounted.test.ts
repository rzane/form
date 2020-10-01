import { renderHook } from "@testing-library/react-hooks";
import { useMounted } from "../../src/utilities/useMounted";

test("useMounted", () => {
  const { result, unmount } = renderHook(() => useMounted());
  expect(result.current.current).toBe(true);
  unmount();
  expect(result.current.current).toBe(false);
});
