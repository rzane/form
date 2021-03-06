import { renderHook, act } from "@testing-library/react-hooks";
import { useForm, useRemoveItem, UseFormOptions } from "../src";

function setup(options: Partial<UseFormOptions<number[]>> = {}) {
  return renderHook(() => {
    const field = useForm<number[]>({ initialValue: [1, 2], ...options });
    const remove = useRemoveItem(field, 1);
    return { remove, field };
  });
}

test("removes the value, error, and touched with `remove`", () => {
  const { result } = setup({
    initialError: ["a", "b"],
    initialTouched: [true, false]
  });

  act(result.current.remove);
  expect(result.current.field.value).toEqual([1]);
  expect(result.current.field.error).toEqual(["a"]);
  expect(result.current.field.touched).toEqual([true]);
});

test("only modifies `error` and `touched` when they are arrays", () => {
  const { result } = setup({
    initialError: "error",
    initialTouched: true
  });

  act(result.current.remove);
  expect(result.current.field.value).toEqual([1]);
  expect(result.current.field.error).toEqual("error");
  expect(result.current.field.touched).toEqual(true);
});
