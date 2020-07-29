import { renderHook, act } from "@testing-library/react-hooks";
import { useForm, useFieldItem, FormOptions } from "../src";

function setup(options: Partial<FormOptions<number[]>> = {}) {
  return renderHook(() => {
    const form = useForm<number[]>({ initialValue: [1], ...options });
    const field = useFieldItem(form, 0);
    return { form, field };
  });
}

test("changes `value` with `setValue`", () => {
  const { result } = setup();

  expect(result.current.field.value).toEqual(1);
  expect(result.current.form.value).toEqual([1]);

  act(() => result.current.field.setValue(2));

  expect(result.current.field.value).toEqual(2);
  expect(result.current.form.value).toEqual([2]);
});

test("changes `error` with `setError`", () => {
  const { result } = setup();

  expect(result.current.field.error).toBeUndefined();
  expect(result.current.form.error).toBeUndefined();

  act(() => result.current.field.setError("changed"));

  expect(result.current.field.error).toEqual("changed");
  expect(result.current.form.error).toEqual(["changed"]);
});

test("changes `touched` with `setTouched`", () => {
  const { result } = setup();

  expect(result.current.field.touched).toBeUndefined();
  expect(result.current.form.touched).toBeUndefined();

  act(() => result.current.field.setTouched(true));

  expect(result.current.field.touched).toEqual(true);
  expect(result.current.form.touched).toEqual([true]);
});

test("removes the value with `remove`", () => {
  const { result } = setup();
  act(() => result.current.field.remove());
  expect(result.current.form.value).toEqual([]);
});
