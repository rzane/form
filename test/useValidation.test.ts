import { renderHook, act } from "@testing-library/react-hooks";
import {
  useForm,
  useValidation,
  UseFormOptions,
  UseValidationOptions,
  ValidateFn,
  ValidateOptions
} from "../src";

const setup = (
  validate: ValidateFn<string, string>,
  formOpts: UseFormOptions<string>,
  validateOpts?: UseValidationOptions
) => {
  return renderHook(() => {
    const form = useForm(formOpts);
    const validation = useValidation(form, validate, validateOpts);

    const run = async (opts?: ValidateOptions) => {
      await validation.validate(opts);
    };

    return { form, validation, run };
  });
};

it("transforms the value", async () => {
  const validate = () => ({
    valid: true as const,
    value: "transformed"
  });

  const { result } = setup(validate, {
    initialValue: "transform"
  });

  await act(async () => {
    expect(await result.current.validation.validate()).toEqual({
      valid: true,
      value: "transformed"
    });
  });
});

it("clears out errors when valid", async () => {
  const validate = (value: string) => ({
    valid: true as const,
    value
  });

  const { result } = setup(validate, {
    initialValue: "value",
    initialError: "error"
  });

  expect(result.current.form.error).toEqual("error");
  await act(result.current.run);
  expect(result.current.form.error).toBeUndefined();
});

it("optionally touches erroneous fields", async () => {
  const validate = () => ({
    valid: false as const,
    error: "invalid"
  });

  const { result } = setup(
    validate,
    { initialValue: "" },
    { onBlur: false, onChange: false }
  );

  await act(() => result.current.run({ touch: true }));
  expect(result.current.form.touched).toBe(true);
});

it("resets `isValidating` when an error is thrown", async () => {
  const validate = () => {
    throw new Error("boom");
  };

  const { result } = setup(
    validate,
    { initialValue: "throw" },
    { onBlur: false, onChange: false }
  );

  await expect(act(result.current.run)).rejects.toThrow("boom");
  expect(result.current.form.isSubmitting).toBe(false);
});

it("resets `isValidating` when a a promise is rejected", async () => {
  const validate = () => {
    return Promise.reject(new Error("boom"));
  };

  const { result } = setup(
    validate,
    { initialValue: "throw-async" },
    { onBlur: false, onChange: false }
  );

  await expect(act(result.current.run)).rejects.toThrow("boom");
  expect(result.current.form.isSubmitting).toBe(false);
});

describe("onChange", () => {
  it("validates when a value changes", async () => {
    const validate = jest.fn(() => {
      return { valid: false as const, error: "invalid" };
    });

    const { result, waitForNextUpdate } = setup(
      validate,
      { initialValue: "initial" },
      { onBlur: false }
    );

    expect(validate).toHaveBeenCalledTimes(1);
    act(() => result.current.form.setValue(""));
    expect(validate).toHaveBeenCalledTimes(2);
    expect(validate.mock.calls).toEqual([["initial"], [""]]);

    await waitForNextUpdate();

    expect(result.current.form.error).toEqual("invalid");
  });

  it("can be disabled", () => {
    const validate = jest.fn();
    const { result } = setup(
      validate,
      { initialValue: "value" },
      { onBlur: false, onChange: false }
    );

    act(() => result.current.form.setValue(""));
    expect(validate).toHaveBeenCalledTimes(0);
  });
});

describe("onBlur", () => {
  it("validates when a field is touched", async () => {
    const validate = jest.fn(() => ({
      valid: false as const,
      error: "invalid"
    }));

    const { result, waitForNextUpdate } = setup(
      validate,
      { initialValue: "" },
      { onChange: false }
    );

    expect(validate).toHaveBeenCalledTimes(1);
    act(() => result.current.form.setTouched(true));
    expect(validate).toHaveBeenCalledTimes(2);

    await waitForNextUpdate();
    expect(result.current.form.error).toEqual("invalid");
  });

  it("can be disabled", () => {
    const validate = jest.fn();
    const { result } = setup(
      validate,
      { initialValue: "value" },
      { onBlur: false, onChange: false }
    );

    act(() => result.current.form.setTouched(true));
    expect(validate).toHaveBeenCalledTimes(0);
  });
});
