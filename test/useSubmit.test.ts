import { renderHook } from "@testing-library/react-hooks";
import { useSubmit } from "../src";

test("submits valid values", async () => {
  const form = {
    setSubmitting: jest.fn(),
    validate: jest.fn().mockResolvedValue({
      value: "value",
      valid: true as const
    })
  };

  const submit = jest.fn();
  const onSubmit = renderHook(() => useSubmit(form, submit));
  await onSubmit.result.current();
  expect(submit).toHaveBeenCalledWith("value");
  expect(form.setSubmitting).toHaveBeenCalledTimes(2);
});

test("aborts submission when the form is not valid", async () => {
  const form = {
    setSubmitting: jest.fn(),
    validate: jest.fn().mockResolvedValue({
      error: "error",
      valid: false as const
    })
  };

  const submit = jest.fn();
  const onSubmit = renderHook(() => useSubmit(form, submit));
  await onSubmit.result.current();
  expect(submit).not.toHaveBeenCalled();
  expect(form.setSubmitting).toHaveBeenCalledTimes(2);
});

test("resets `isSubmitting` when an error is thrown", async () => {
  const form = {
    setSubmitting: jest.fn(),
    validate: jest.fn(() => {
      throw new Error("boom");
    })
  };

  const submit = jest.fn();
  const onSubmit = renderHook(() => useSubmit(form, submit));
  await expect(onSubmit.result.current()).rejects.toThrow("boom");
  expect(submit).not.toHaveBeenCalled();
  expect(form.setSubmitting).toHaveBeenCalledTimes(2);
});

test("resets `isSubmitting` when a promise is rejected", async () => {
  const form = {
    setSubmitting: jest.fn(),
    validate: jest.fn().mockRejectedValue(new Error("boom"))
  };

  const submit = jest.fn();
  const onSubmit = renderHook(() => useSubmit(form, submit));
  await expect(onSubmit.result.current()).rejects.toThrow("boom");
  expect(submit).not.toHaveBeenCalled();
  expect(form.setSubmitting).toHaveBeenCalledTimes(2);
});

test("prevents default and stops propagation", async () => {
  const form = {
    setSubmitting: jest.fn(),
    validate: jest.fn().mockResolvedValue({
      value: "value",
      valid: true as const
    })
  };

  const event = {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn()
  };

  const submit = jest.fn();
  const onSubmit = renderHook(() => useSubmit(form, submit));
  await onSubmit.result.current(event as any);
  expect(event.preventDefault).toHaveBeenCalled();
  expect(event.stopPropagation).toHaveBeenCalled();
});
