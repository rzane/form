import { renderHook, act } from "@testing-library/react-hooks";
import { makeValidation } from "./helpers";
import {
  useForm,
  useValidation,
  ValidateFn,
  UseValidationOptions
} from "../src";

function setup(validate: ValidateFn<any, any>, opts?: UseValidationOptions) {
  return renderHook(() => {
    const form = useForm({ initialValue: "" });
    const validation = useValidation(form, validate, opts);
    return { form, validation };
  });
}

describe("onChange", () => {
  test("does not run validations when disabled", () => {
    const validate = makeValidation("boom");
    const { result } = setup(validate, { onChange: false });

    act(() => result.current.form.setValue("changed"));
    expect(validate).not.toHaveBeenCalled();
  });

  test("runs validations when enabled", async () => {
    const validate = makeValidation("boom");
    const { result, waitForNextUpdate } = setup(validate);

    act(() => result.current.form.setValue("changed"));
    expect(validate).toHaveBeenCalledWith("changed");

    await waitForNextUpdate();
    expect(result.current.form.error).toEqual("boom");
  });
});

describe("validateOnBlur", () => {
  test("does not run validations by default", () => {
    const validate = makeValidation("boom");
    const { result } = setup(validate, { onBlur: false });

    act(() => result.current.form.setTouched(true));
    expect(validate).not.toHaveBeenCalled();
  });

  test("runs validations when enabled", async () => {
    const validate = makeValidation("boom");
    const { result, waitForNextUpdate } = setup(validate);

    act(() => result.current.form.setTouched(true));
    expect(validate).toHaveBeenCalled();

    await waitForNextUpdate();
    expect(result.current.form.error).toEqual("invalid");
  });
});
