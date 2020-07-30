import { renderHook } from "@testing-library/react-hooks";
import { useNoValidate } from "../src";

test("indicates that the value is valid", () => {
  const { result } = renderHook(() => useNoValidate());
  expect(result.current("foo")).toEqual({ valid: true, value: "foo" });
});
