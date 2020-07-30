import { renderHook, act } from "@testing-library/react-hooks";
import { FormOptions, useForm, useRemoveItem } from "../src";

function setup(options: Partial<FormOptions<number[]>> = {}) {
  return renderHook(() => {
    const field = useForm<number[]>({
      submit: jest.fn(),
      validate: jest.fn(),
      initialValue: [1, 2],
      ...options
    });

    const remove = useRemoveItem(field);
    return { remove, field };
  });
}

test("removes the value, error, and touched with `remove`", () => {
  const { result } = setup({
    initialError: ["a", "b"],
    initialTouched: [true, false]
  });

  act(() => result.current.remove(1));
  expect(result.current.field.value).toEqual([1]);
  expect(result.current.field.error).toEqual(["a"]);
  expect(result.current.field.touched).toEqual([true]);
});

test("only modifies `error` and `touched` when they are arrays", () => {
  const { result } = setup({
    initialError: "error",
    initialTouched: true
  });

  act(() => result.current.remove(1));
  expect(result.current.field.value).toEqual([1]);
  expect(result.current.field.error).toEqual("error");
  expect(result.current.field.touched).toEqual(true);
});
