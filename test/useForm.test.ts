import { act, renderHook } from "@testing-library/react-hooks";
import { useForm, FormOptions } from "../src";

interface Values {
  name: string;
}

const INITIAL: Values = {
  name: ""
};

function setup(options: Partial<FormOptions<Values>> = {}) {
  return renderHook(() => useForm({ initialValues: INITIAL, ...options }));
}

describe("useForm", () => {
  describe("values", () => {
    test("initialValues", () => {
      const { result } = setup();
      expect(result.current.initialValues).toEqual(INITIAL);
    });

    test("values", () => {
      const { result } = setup();
      expect(result.current.values).toEqual(INITIAL);
    });

    test("setValues", () => {
      const { result } = setup();
      expect(result.current.values).toEqual(INITIAL);

      act(() => result.current.setValues({ name: "Rick" }));
      expect(result.current.values).toEqual({ name: "Rick" });
    });
  });

  describe("touched", () => {
    const touched = { name: true };
    test("initialTouched", () => {
      const { result } = setup({ initialTouched: touched });
      expect(result.current.initialTouched).toEqual(touched);
    });

    test("initialTouched (default)", () => {
      const { result } = setup();
      expect(result.current.initialTouched).toEqual({});
    });

    test("touched", () => {
      const { result } = setup({ initialTouched: touched });
      expect(result.current.touched).toEqual(touched);
    });

    test("setTouched", () => {
      const { result } = setup();
      expect(result.current.touched).toEqual({});

      act(() => result.current.setTouched(touched));
      expect(result.current.touched).toEqual(touched);
    });
  });
});
