import { assert, refute, isString, isBlank, map } from "@stackup/validate";
import { renderHook, act } from "@testing-library/react-hooks";
import { useForm, useValidate, UseFormOptions } from "../src";

const validator = assert(isString)
  .then(refute(isBlank))
  .then(map(value => `transformed ${value}`));

const setup = (opts: UseFormOptions<string>) => {
  return renderHook(() => {
    const form = useForm<unknown>(opts);
    return useValidate(form, validator, {
      onBlur: false,
      onChange: false
    });
  });
};

test("accepts a valid result", async () => {
  const { result } = setup({ initialValue: "value" });

  await act(async () => {
    expect(await result.current.validate()).toEqual({
      valid: true,
      value: "transformed value"
    });
  });
});

test("translates error messages", async () => {
  const { result } = setup({ initialValue: "" });

  await act(async () => {
    expect(await result.current.validate()).toEqual({
      valid: false,
      error: "This field is invalid"
    });
  });
});
