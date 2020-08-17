import { renderHook } from "@testing-library/react-hooks";
import { useReset } from "../src";

test("resets the form", () => {
  const reset = jest.fn();
  const form: any = { reset };

  const onSubmit = renderHook(() => useReset(form));
  onSubmit.result.current();
  expect(reset).toHaveBeenCalled();
});

test("prevents the default event", () => {
  const reset = jest.fn();
  const preventDefault = jest.fn();
  const stopPropagation = jest.fn();
  const form: any = { reset };
  const event: any = { preventDefault, stopPropagation };

  const onSubmit = renderHook(() => useReset(form));
  onSubmit.result.current(event);

  expect(reset).toHaveBeenCalled();
  expect(preventDefault).toHaveBeenCalled();
  expect(stopPropagation).toHaveBeenCalled();
});
