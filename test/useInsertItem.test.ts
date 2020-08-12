import { renderHook, act } from "@testing-library/react-hooks";
import { useForm, useInsertItem, UseFormOptions } from "../src";

function setup(options: Partial<UseFormOptions<number[]>> = {}) {
  return renderHook(() => {
    const field = useForm<number[]>({ initialValue: [1, 2], ...options });
    const insert = useInsertItem(field, 1, 3);
    return { insert, field };
  });
}

test("adds an item with `insert`", () => {
  const { result } = setup({
    initialError: ["a", "b"],
    initialTouched: [true, false]
  });

  act(result.current.insert);
  expect(result.current.field.value).toEqual([1, 3, 2]);
  expect(result.current.field.error).toEqual(["a", undefined, "b"]);
  expect(result.current.field.touched).toEqual([true, undefined, false]);
});

test("only modifies `error` and `touched` when they are arrays", () => {
  const { result } = setup({
    initialError: "error",
    initialTouched: true
  });

  act(result.current.insert);
  expect(result.current.field.value).toEqual([1, 3, 2]);
  expect(result.current.field.error).toEqual("error");
  expect(result.current.field.touched).toEqual(true);
});
