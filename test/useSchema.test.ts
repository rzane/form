import { renderHook } from "@testing-library/react-hooks";
import { useSchema } from "../src";
import { assert, each, isString, optional, schema } from "@stackup/validate";

const profile = schema({
  name: assert(isString),
  pets: optional(each(assert(isString)))
});

test("passes along a valid value", async () => {
  const { result } = renderHook(() => useSchema(profile));

  expect(await result.current({ name: "rick" })).toEqual({
    valid: true,
    value: { name: "rick" }
  });
});

test("converts errors", async () => {
  const { result } = renderHook(() => useSchema(profile));

  expect(await result.current({})).toEqual({
    valid: false,
    error: { name: "This field is invalid" }
  });
});

test("converts errors in an array", async () => {
  const { result } = renderHook(() => useSchema(profile));

  expect(await result.current({ name: "", pets: ["", 1] })).toEqual({
    valid: false,
    error: { pets: [undefined, "This field is invalid"] }
  });
});
