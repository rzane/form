import { renderHook, act } from "@testing-library/react-hooks";
import { FormOptions, useForm, usePushItem } from "../src";

function setup(options: Partial<FormOptions<number[]>> = {}) {
  return renderHook(() => {
    const field = useForm<number[]>({
      submit: jest.fn(),
      validate: jest.fn(),
      initialValue: [1, 2],
      ...options
    });

    const push = usePushItem(field);
    return { push, field };
  });
}

test("adds an item with `push`", () => {
  const { result } = setup();

  act(() => result.current.push(3));
  expect(result.current.field.value).toEqual([1, 2, 3]);
});
