import { act, renderHook } from "@testing-library/react-hooks";
import { useForm, FormOptions } from "../src";

function makeValidator() {
  return jest.fn().mockImplementation(() => ({
    valid: false,
    error: "invalid"
  }));
}

function setup(options: Partial<FormOptions<string>> = {}) {
  return renderHook(() =>
    useForm({
      submit: jest.fn(),
      validate: jest.fn(),
      initialValue: "",
      ...options
    })
  );
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

describe("validateOnChange", () => {
  test("does not run validations by default", () => {
    const validate = makeValidator();
    const { result } = setup({ validate });

    act(() => result.current.setValue("changed"));
    expect(validate).not.toHaveBeenCalled();
  });

  test("runs validations when enabled", async () => {
    const validate = makeValidator();
    const { result, waitForNextUpdate } = setup({
      validate,
      validateOnChange: true
    });

    act(() => result.current.setValue("changed"));
    expect(validate).toHaveBeenCalledWith("changed");

    await waitForNextUpdate();
    expect(result.current.error).toEqual("invalid");
  });
});

describe("validateOnBlur", () => {
  test("does not run validations by default", () => {
    const validate = makeValidator();
    const { result } = setup({ validate });

    act(() => result.current.setTouched(true));
    expect(validate).not.toHaveBeenCalled();
  });

  test("runs validations when enabled", async () => {
    const validate = makeValidator();
    const { result, waitForNextUpdate } = setup({
      validate,
      validateOnBlur: true
    });

    act(() => result.current.setTouched(true));
    expect(validate).toHaveBeenCalled();

    await waitForNextUpdate();
    expect(result.current.error).toEqual("invalid");
  });
});
