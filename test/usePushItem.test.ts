import { renderHook, act } from "@testing-library/react-hooks";
import { useForm, usePushItem, UseFormOptions } from "../src";

function setup(options: Partial<UseFormOptions<number[]>> = {}) {
  return renderHook(() => {
    const field = useForm<number[]>({ initialValue: [1, 2], ...options });
    const push = usePushItem(field, 3);
    return { push, field };
  });
}

test("adds an item with `push`", () => {
  const { result } = setup();

  act(result.current.push);
  expect(result.current.field.value).toEqual([1, 2, 3]);
});
