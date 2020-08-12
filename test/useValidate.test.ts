import { assert, refute, isString, isBlank, map } from "@stackup/validate";
import { renderHook } from "@testing-library/react-hooks";
import { useValidate } from "../src";

const validator = assert(isString)
  .then(refute(isBlank))
  .then(map(value => `transformed ${value}`));

const setup = (value: string) => {
  const form = {
    value,
    setError: jest.fn(),
    setValidating: jest.fn(),
    setSubmitting: jest.fn()
  };

  return renderHook(() => useValidate(form as any, validator));
};

test("accepts a valid result", async () => {
  const { result } = setup("value");

  expect(await result.current.validate()).toEqual({
    valid: true,
    value: "transformed value"
  });
});

test("translates error messages", async () => {
  const { result } = setup("");

  expect(await result.current.validate()).toEqual({
    valid: false,
    error: "This field is invalid"
  });
});
