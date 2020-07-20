import { renderHook } from "@testing-library/react-hooks";
import { useForm } from "../src";

const INITIAL = {
  name: ""
};

function setup() {
  const hook = renderHook(() => useForm({ initialValues: INITIAL }));
  return hook.result.current;
}

describe("useForm", () => {
  test("initialValues", () => {
    const form = setup();
    expect(form.initialValues).toEqual(INITIAL);
  });

  test("values", () => {
    const form = setup();
    expect(form.values).toEqual(INITIAL);
  });
});
