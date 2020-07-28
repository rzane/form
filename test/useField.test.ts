import { useForm, useField, FormOptions } from "../src";
import { renderHook, act } from "@testing-library/react-hooks";

interface Basic {
  name: string;
}

interface Nested {
  basic: Basic;
}

function basic(options: Partial<FormOptions<Basic>> = {}) {
  return renderHook(() => {
    const form = useForm<Basic>({
      initialValue: { name: "" },
      ...options
    });

    const field = useField(form, "name");
    return { form, field };
  });
}

function nested(options: Partial<FormOptions<Nested>> = {}) {
  return renderHook(() => {
    const form = useForm<Nested>({
      initialValue: { basic: { name: "" } },
      ...options
    });

    const fields = useField(form, "basic");
    const field = useField(fields, "name");
    return { form, fields, field };
  });
}

describe("useField", () => {
  test("id", () => {
    const { result } = basic();
    expect(result.current.field.id).toMatch(/^field-\d+$/);
  });

  test("name", () => {
    const { result } = basic();
    expect(result.current.field.name).toEqual("name");
  });

  test("value", () => {
    const { result } = basic({
      initialValue: { name: "value" }
    });

    expect(result.current.field.value).toEqual("value");
  });

  test("error", () => {
    const { result } = basic({
      initialError: { name: "error" }
    });

    expect(result.current.field.error).toEqual("error");
  });

  test("touched", () => {
    const { result } = basic({
      initialTouched: { name: true }
    });

    expect(result.current.field.touched).toEqual(true);
  });

  test("setValue", () => {
    const { result } = basic();
    act(() => result.current.field.setValue("changed"));
    expect(result.current.field.value).toEqual("changed");
    expect(result.current.form.value).toEqual({ name: "changed" });
  });

  test("setError", () => {
    const { result } = basic();
    act(() => result.current.field.setError("changed"));
    expect(result.current.field.error).toEqual("changed");
    expect(result.current.form.error).toEqual({ name: "changed" });
  });

  test("setTouched", () => {
    const { result } = basic();
    act(() => result.current.field.setTouched(true));
    expect(result.current.field.touched).toEqual(true);
    expect(result.current.form.touched).toEqual({ name: true });
  });

  describe("a nested form", () => {
    test("id", () => {
      const { result } = nested();
      expect(result.current.field.id).toMatch(/^field-\d+$/);
    });

    test("name", () => {
      const { result } = nested();
      expect(result.current.field.name).toEqual("name");
    });

    test("value", () => {
      const { result } = nested({
        initialValue: { basic: { name: "value" } }
      });

      expect(result.current.field.value).toEqual("value");
    });

    test("error", () => {
      const { result } = nested({
        initialError: { basic: { name: "error" } }
      });

      expect(result.current.field.error).toEqual("error");
    });

    test("touched", () => {
      const { result } = nested({
        initialTouched: { basic: { name: true } }
      });

      expect(result.current.field.touched).toEqual(true);
    });

    test("setValue", () => {
      const { result } = nested();
      act(() => result.current.field.setValue("changed"));
      expect(result.current.field.value).toEqual("changed");
      expect(result.current.fields.value).toEqual({ name: "changed" });
      expect(result.current.form.value).toEqual({ basic: { name: "changed" } });
    });

    test("setError", () => {
      const { result } = nested();
      act(() => result.current.field.setError("changed"));
      expect(result.current.field.error).toEqual("changed");
      expect(result.current.fields.error).toEqual({ name: "changed" });
      expect(result.current.form.error).toEqual({ basic: { name: "changed" } });
    });

    test("setTouched", () => {
      const { result } = nested();
      act(() => result.current.field.setTouched(true));
      expect(result.current.field.touched).toEqual(true);
      expect(result.current.fields.touched).toEqual({ name: true });
      expect(result.current.form.touched).toEqual({ basic: { name: true } });
    });
  });
});
