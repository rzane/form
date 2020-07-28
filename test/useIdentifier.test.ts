import { renderHook } from "@testing-library/react-hooks";
import { useIdentifier } from "../src/useIdentifier";

test("useIdentifier", () => {
  const one = renderHook(useIdentifier);
  expect(one.result.current).toEqual("0");
  one.rerender();
  one.rerender();
  expect(one.result.current).toEqual("0");

  const two = renderHook(useIdentifier);
  expect(two.result.current).toEqual("1");
  two.rerender();
  two.rerender();
  expect(two.result.current).toEqual("1");
});
