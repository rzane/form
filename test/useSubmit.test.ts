import { renderHook, act } from "@testing-library/react-hooks";
import { useForm, useValidation, ValidateFn, useSubmit } from "./../src";
import { makeValidation } from "./helpers";

function setup(validate: ValidateFn<any, any>, submit: () => any) {
  return renderHook(() => {
    const form = useForm({ initialValue: { name: "" } });
    const validation = useValidation(form, validate);
    const submission = useSubmit(validation, submit);
    return { submission, validation, form };
  });
}

test("invokes the `submit` option when valid", async () => {
  const submit = jest.fn();
  const validate = makeValidation();
  const { result } = setup(validate, submit);

  await act(result.current.submission.execute);

  expect(validate).toHaveBeenCalled();
  expect(submit).toHaveBeenCalled();
  expect(result.current.form.isValidating).toEqual(false);
  expect(result.current.form.isSubmitting).toEqual(false);
});

test("aborts when validator throws sync", async () => {
  const submit = jest.fn();
  const error = new Error("boom");
  const validate = jest.fn(() => {
    throw error;
  });

  const { result } = setup(validate, submit);
  await expect(act(result.current.submission.execute)).rejects.toThrow(error);

  expect(validate).toHaveBeenCalled();
  expect(submit).not.toHaveBeenCalled();
  expect(result.current.form.isValidating).toEqual(false);
  expect(result.current.form.isSubmitting).toEqual(false);
});

test("aborts when validator throws async", async () => {
  const submit = jest.fn();
  const error = new Error("boom");
  const validate = jest.fn().mockRejectedValue(error);

  const { result, waitForNextUpdate } = setup(validate, submit);
  await expect(act(result.current.submission.execute)).rejects.toThrow(error);

  expect(validate).toHaveBeenCalled();
  expect(submit).not.toHaveBeenCalled();

  await waitForNextUpdate();

  expect(result.current.form.isValidating).toEqual(false);
  expect(result.current.form.isSubmitting).toEqual(false);
});

test("aborts when validator produces an error", async () => {
  const submit = jest.fn();
  const validate = makeValidation("boom");

  const { result } = setup(validate, submit);
  await act(result.current.submission.execute);

  expect(validate).toHaveBeenCalled();
  expect(submit).not.toHaveBeenCalled();

  expect(result.current.form.isValidating).toEqual(false);
  expect(result.current.form.isSubmitting).toEqual(false);
});

test("marks all erroneous fields as touched", async () => {
  const submit = jest.fn();
  const validate = makeValidation({ name: "boom" });

  const { result } = setup(validate, submit);

  expect(result.current.form.touched).toBeUndefined();
  await act(result.current.submission.execute);
  expect(result.current.form.touched).toBe({ name: true });
});
