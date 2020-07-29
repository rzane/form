import { renderHook, act } from "@testing-library/react-hooks";
import { useForm, useField, FormOptions, useFieldItem } from "../src";

interface Basic {
  name: string;
}

interface Nested {
  basic: Basic;
}

interface List {
  items: Basic[];
}

describe("basic", () => {
  function setup(options: Partial<FormOptions<Basic>> = {}) {
    return renderHook(() => {
      const form = useForm<Basic>({
        submit: jest.fn(),
        validate: jest.fn(),
        initialValue: { name: "" },
        ...options
      });

      const field = useField(form, "name");
      return { form, field };
    });
  }

  test("has a stable `id`", () => {
    const { result, rerender } = setup();
    const id = result.current.field.id;
    expect(id).toMatch(/^form-\d+_name$/);

    rerender();

    const nextId = result.current.field.id;
    expect(nextId).toEqual(id);
  });

  test("has a `name`", () => {
    const { result } = setup();
    expect(result.current.field.name).toEqual("name");
  });

  test("changes `value` with `setValue`", () => {
    const { result } = setup();

    expect(result.current.field.value).toEqual("");
    expect(result.current.form.value).toEqual({ name: "" });

    act(() => result.current.field.setValue("changed"));

    expect(result.current.field.value).toEqual("changed");
    expect(result.current.form.value).toEqual({ name: "changed" });
  });

  test("changes `error` with `setError`", () => {
    const { result } = setup();

    expect(result.current.field.error).toBeUndefined();
    expect(result.current.form.error).toBeUndefined();

    act(() => result.current.field.setError("changed"));

    expect(result.current.field.error).toEqual("changed");
    expect(result.current.form.error).toEqual({ name: "changed" });
  });

  test("changes `touched` with `setTouched`", () => {
    const { result } = setup();

    expect(result.current.field.touched).toBeUndefined();
    expect(result.current.form.touched).toBeUndefined();

    act(() => result.current.field.setTouched(true));

    expect(result.current.field.touched).toEqual(true);
    expect(result.current.form.touched).toEqual({ name: true });
  });
});

describe("nested", () => {
  function setup(options: Partial<FormOptions<Nested>> = {}) {
    return renderHook(() => {
      const form = useForm<Nested>({
        submit: jest.fn(),
        validate: jest.fn(),
        initialValue: { basic: { name: "" } },
        ...options
      });

      const fields = useField(form, "basic");
      const field = useField(fields, "name");
      return { form, fields, field };
    });
  }

  test("changes `value` with `setValue`", () => {
    const { result } = setup();

    expect(result.current.field.value).toEqual("");
    expect(result.current.fields.value).toEqual({ name: "" });
    expect(result.current.form.value).toEqual({ basic: { name: "" } });

    act(() => result.current.field.setValue("changed"));

    expect(result.current.field.value).toEqual("changed");
    expect(result.current.fields.value).toEqual({ name: "changed" });
    expect(result.current.form.value).toEqual({ basic: { name: "changed" } });
  });

  test("changes `error` with `setError`", () => {
    const { result } = setup();

    expect(result.current.field.error).toBeUndefined();
    expect(result.current.form.error).toBeUndefined();

    act(() => result.current.field.setError("changed"));

    expect(result.current.field.error).toEqual("changed");
    expect(result.current.fields.error).toEqual({ name: "changed" });
    expect(result.current.form.error).toEqual({ basic: { name: "changed" } });
  });

  test("changes `touched` with `setTouched`", () => {
    const { result } = setup();

    expect(result.current.field.touched).toBeUndefined();
    expect(result.current.form.touched).toBeUndefined();

    act(() => result.current.field.setTouched(true));

    expect(result.current.field.touched).toEqual(true);
    expect(result.current.fields.touched).toEqual({ name: true });
    expect(result.current.form.touched).toEqual({ basic: { name: true } });
  });
});

describe("list", () => {
  function setup(options: Partial<FormOptions<List>> = {}) {
    return renderHook(() => {
      const form = useForm<List>({
        submit: jest.fn(),
        validate: jest.fn(),
        initialValue: { items: [{ name: "" }] },
        ...options
      });

      const items = useField(form, "items");
      const item = useFieldItem(items, 0);
      const field = useField(item, "name");
      return { form, items, item, field };
    });
  }

  test("changes `value` with `setValue`", () => {
    const { result } = setup();
    expect(result.current.field.value).toEqual("");
    act(() => result.current.field.setValue("changed"));
    expect(result.current.field.value).toEqual("changed");
  });

  test("changes `error` with `setError`", () => {
    const { result } = setup();
    expect(result.current.field.error).toBeUndefined();
    act(() => result.current.field.setError("changed"));
    expect(result.current.field.error).toEqual("changed");
  });

  test("changes `touched` with `setTouched`", () => {
    const { result } = setup();
    expect(result.current.field.touched).toBeUndefined();
    act(() => result.current.field.setTouched(true));
    expect(result.current.field.touched).toEqual(true);
  });
});
