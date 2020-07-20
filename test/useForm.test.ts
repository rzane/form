import { act, renderHook } from "@testing-library/react-hooks";
import { useForm, FormOptions } from "../src";

interface Values {
  name: string;
}

const VALUES: Values = { name: "" };
const TOUCHED = { name: true };
const ERRORS = { name: "is invalid" };

function setup(options: Partial<FormOptions<Values>> = {}) {
  return renderHook(() => useForm({ initialValues: VALUES, ...options }));
}

describe("useForm", () => {
  test("initialValues", () => {
    const { result } = setup();
    expect(result.current.initialValues).toEqual(VALUES);
  });

  test("values", () => {
    const { result } = setup();
    expect(result.current.values).toEqual(VALUES);
  });

  test("setValues", () => {
    const { result } = setup();
    expect(result.current.values).toEqual(VALUES);

    act(() => result.current.setValues({ name: "Rick" }));
    expect(result.current.values).toEqual({ name: "Rick" });
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

  test("initialErrors", () => {
    const { result } = setup({ initialErrors: ERRORS });
    expect(result.current.initialErrors).toEqual(ERRORS);
  });

  test("initialErrors (default)", () => {
    const { result } = setup();
    expect(result.current.initialErrors).toEqual({});
  });

  test("errors", () => {
    const { result } = setup({ initialErrors: ERRORS });
    expect(result.current.errors).toEqual(ERRORS);
  });

  test("setErrors", () => {
    const { result } = setup();
    expect(result.current.errors).toEqual({});

    act(() => result.current.setErrors(ERRORS));
    expect(result.current.errors).toEqual(ERRORS);
  });
});
