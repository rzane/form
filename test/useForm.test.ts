import { act, renderHook } from "@testing-library/react-hooks";
import { useForm, UseFormOptions } from "../src";

function setup(options: Partial<UseFormOptions<string>> = {}) {
  return renderHook(() => useForm({ initialValue: "", ...options }));
}

test("initializes value, error, and touched", () => {
  const { result } = setup({
    initialValue: "value",
    initialError: "error",
    initialTouched: true
  });

  expect(result.current.value).toEqual("value");
  expect(result.current.initialValue).toEqual("value");

  expect(result.current.error).toEqual("error");
  expect(result.current.initialError).toEqual("error");

  expect(result.current.touched).toEqual(true);
  expect(result.current.initialTouched).toEqual(true);
});

test("changes `value` with `setValue`", () => {
  const { result } = setup();

  expect(result.current.value).toEqual("");
  expect(result.current.initialValue).toEqual("");

  act(() => result.current.setValue("changed"));

  expect(result.current.value).toEqual("changed");
  expect(result.current.initialValue).toEqual("");
});

test("changes `error` with `setError`", () => {
  const { result } = setup();

  expect(result.current.error).toBeUndefined();
  expect(result.current.initialError).toBeUndefined();

  act(() => result.current.setError("changed"));

  expect(result.current.error).toEqual("changed");
  expect(result.current.initialError).toBeUndefined();
});

test("changes `touched` with `setTouched`", () => {
  const { result } = setup();

  expect(result.current.touched).toBeUndefined();
  expect(result.current.initialTouched).toBeUndefined();

  act(() => result.current.setTouched(true));

  expect(result.current.touched).toEqual(true);
  expect(result.current.initialTouched).toBeUndefined();
});
