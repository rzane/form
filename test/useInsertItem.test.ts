import { renderHook, act } from "@testing-library/react-hooks";
import { FormOptions, useForm, useInsertItem } from "../src";

function setup(options: Partial<FormOptions<number[]>> = {}) {
  return renderHook(() => {
    const field = useForm<number[]>({
      submit: jest.fn(),
      validate: jest.fn(),
      initialValue: [1, 2],
      ...options
    });

    const insert = useInsertItem(field);
    return { insert, field };
  });
}

test("adds an item with `insert`", () => {
  const { result } = setup({
    initialError: ["a", "b"],
    initialTouched: [true, false]
  });

  act(() => result.current.insert(1, 3));
  expect(result.current.field.value).toEqual([1, 3, 2]);
  expect(result.current.field.error).toEqual(["a", undefined, "b"]);
  expect(result.current.field.touched).toEqual([true, undefined, false]);
});
