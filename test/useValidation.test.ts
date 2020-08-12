import { ValidateFn, ValidateOptions } from "./../src/types";
import { renderHook, act } from "@testing-library/react-hooks";
import {
  useForm,
  useValidation,
  UseFormOptions,
  UseValidationOptions
} from "../src";

const ERROR = new Error("boom");

const makeValidate = () => {
  return jest.fn(value => {
    if (value === "throw") {
      throw ERROR;
    } else if (value === "throw-async") {
      return Promise.reject(ERROR);
    } else if (value === "transform") {
      return { valid: true as const, value: "transformed" };
    } else if (value) {
      return { valid: true as const, value };
    } else {
      return { valid: false as const, error: "invalid" };
    }
  });
};

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
  const validate = makeValidate();
  const { result } = setup(validate, { initialValue: "transform" });

  await act(async () => {
    expect(await result.current.validation.validate()).toEqual({
      valid: true,
      value: "transformed"
    });
  });
});

it("clears out errors when valid", async () => {
  const validate = makeValidate();
  const { result } = setup(validate, {
    initialValue: "value",
    initialError: "error"
  });

  expect(result.current.form.error).toEqual("error");
  await act(result.current.run);
  expect(result.current.form.error).toBeUndefined();
});

it("optionally touches erroneous fields", async () => {
  const validate = makeValidate();
  const { result } = setup(
    validate,
    { initialValue: "" },
    { onBlur: false, onChange: false }
  );

  await act(() => result.current.run({ touch: true }));
  expect(result.current.form.touched).toBe(true);
});

it("resets `isValidating` when an error is thrown", async () => {
  const validate = makeValidate();
  const { result } = setup(
    validate,
    { initialValue: "throw" },
    { onBlur: false, onChange: false }
  );

  await expect(act(result.current.run)).rejects.toThrow(ERROR);
  expect(result.current.form.isSubmitting).toBe(false);
});

it("resets `isValidating` when a a promise is rejected", async () => {
  const validate = makeValidate();
  const { result } = setup(
    validate,
    { initialValue: "throw-async" },
    { onBlur: false, onChange: false }
  );

  await expect(act(result.current.run)).rejects.toThrow(ERROR);
  expect(result.current.form.isSubmitting).toBe(false);
});

describe("onChange", () => {
  it("validates when a value changes", async () => {
    const validate = makeValidate();
    const { result, waitForNextUpdate } = setup(
      validate,
      { initialValue: "value" },
      { onBlur: false }
    );

    expect(validate).toHaveBeenCalledTimes(1);
    act(() => result.current.form.setValue(""));
    expect(validate).toHaveBeenCalledTimes(2);

    await waitForNextUpdate();
    expect(result.current.form.error).toEqual("invalid");
  });

  it("can be disabled", () => {
    const validate = makeValidate();
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
    const validate = makeValidate();
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
    const validate = makeValidate();
    const { result } = setup(
      validate,
      { initialValue: "value" },
      { onBlur: false, onChange: false }
    );

    act(() => result.current.form.setTouched(true));
    expect(validate).toHaveBeenCalledTimes(0);
  });
});
