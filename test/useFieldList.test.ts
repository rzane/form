import { renderHook, act } from "@testing-library/react-hooks";
import { FormOptions, useForm, useFieldList } from "../src";

function setup(options: Partial<FormOptions<number[]>> = {}) {
  return renderHook(() => {
    const form = useForm<number[]>({
      submit: jest.fn(),
      validate: jest.fn(),
      initialValue: [1, 2],
      ...options
    });

    return useFieldList(form);
  });
}

test("adds an item with `push`", () => {
  const { result } = setup();

  act(() => result.current.push(3));
  expect(result.current.value).toEqual([1, 2, 3]);
});

test("adds an item with `insert`", () => {
  const { result } = setup({
    initialError: ["a", "b"],
    initialTouched: [true, false]
  });

  act(() => result.current.insert(1, 3));
  expect(result.current.value).toEqual([1, 3, 2]);
  expect(result.current.error).toEqual(["a", undefined, "b"]);
  expect(result.current.touched).toEqual([true, undefined, false]);
});

test("removes the value, error, and touched with `remove`", () => {
  const { result } = setup({
    initialError: ["a", "b"],
    initialTouched: [true, false]
  });

  act(() => result.current.remove(1));
  expect(result.current.value).toEqual([1]);
  expect(result.current.error).toEqual(["a"]);
  expect(result.current.touched).toEqual([true]);
});
