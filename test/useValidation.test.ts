import { ValidateFn } from "./../src/types";
import { renderHook, act } from "@testing-library/react-hooks";
import {
  useForm,
  useValidation,
  UseFormOptions,
  UseValidationOptions
} from "../src";

const makeValidate = () => {
  return jest.fn(value => {
    if (value === "throw") {
      throw new Error("boom");
    } else if (value === "throw-async") {
      return Promise.reject("boom");
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
    return { form, validation };
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
  await act(async () => {
    await result.current.validation.validate();
  });
  expect(result.current.form.error).toBeUndefined();
});

it.todo("optionally touches erroneous fields");
it.todo("resets `isValidating` when an error is thrown");
it.todo("resets `isValidating` when a a promise is rejected");

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
