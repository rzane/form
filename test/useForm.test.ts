import { act, renderHook } from "@testing-library/react-hooks";
import { useForm, FormOptions } from "../src";

interface Values {
  name: string;
}

const VALUES: Values = { name: "" };
const TOUCHED = { name: true };
const ERRORS = { name: "is invalid" };

function setup(options: Partial<FormOptions<Values>> = {}) {
  return renderHook(() => useForm({ initialValue: VALUES, ...options }));
}

describe("useForm", () => {
  test("initialValue", () => {
    const { result } = setup();
    expect(result.current.initialValue).toEqual(VALUES);
  });

  test("values", () => {
    const { result } = setup();
    expect(result.current.value).toEqual(VALUES);
  });

  test("setValue", () => {
    const { result } = setup();
    expect(result.current.value).toEqual(VALUES);

    act(() => result.current.setValue({ name: "Rick" }));
    expect(result.current.value).toEqual({ name: "Rick" });
  });

  test("initialTouched", () => {
    const { result } = setup({ initialTouched: TOUCHED });
    expect(result.current.initialTouched).toEqual(TOUCHED);
  });

  test("initialTouched (default)", () => {
    const { result } = setup();
    expect(result.current.initialTouched).toEqual({});
  });

  test("touched", () => {
    const { result } = setup({ initialTouched: TOUCHED });
    expect(result.current.touched).toEqual(TOUCHED);
  });

  test("setTouched", () => {
    const { result } = setup();
    expect(result.current.touched).toEqual({});

    act(() => result.current.setTouched(TOUCHED));
    expect(result.current.touched).toEqual(TOUCHED);
  });

  test("initialError", () => {
    const { result } = setup({ initialError: ERRORS });
    expect(result.current.initialError).toEqual(ERRORS);
  });

  test("initialError (default)", () => {
    const { result } = setup();
    expect(result.current.initialError).toEqual({});
  });

  test("error", () => {
    const { result } = setup({ initialError: ERRORS });
    expect(result.current.error).toEqual(ERRORS);
  });

  test("setError", () => {
    const { result } = setup();
    expect(result.current.error).toEqual({});

    act(() => result.current.setError(ERRORS));
    expect(result.current.error).toEqual(ERRORS);
  });
});
