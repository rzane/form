import { renderHook } from "@testing-library/react-hooks";
import { useValidator } from "../src";
import { assert, each, isString, optional, schema } from "@stackup/validate";

const profile = schema({
  name: optional(assert(isString)),
  pets: optional(each(assert(isString))),
  profile: optional(schema({ name: assert(isString) }))
});

test("passes along a valid value", async () => {
  const { result } = renderHook(() => useValidator(profile));

  const value = {
    name: "rick",
    pets: ["fido"],
    profile: { name: "bob" }
  };

  expect(await result.current(value)).toEqual({ valid: true, value });
});

test("converts top-level errors", async () => {
  const { result } = renderHook(() => useValidator(profile));

  expect(await result.current({ name: 1 })).toEqual({
    valid: false,
    error: { name: "This field is invalid" }
  });
});

test("converts nested errors", async () => {
  const { result } = renderHook(() => useValidator(profile));

  expect(await result.current({ profile: { name: 1 } })).toEqual({
    valid: false,
    error: { profile: { name: "This field is invalid" } }
  });
});

test("converts array errors", async () => {
  const { result } = renderHook(() => useValidator(profile));

  expect(await result.current({ pets: ["", 1] })).toEqual({
    valid: false,
    error: { pets: [undefined, "This field is invalid"] }
  });
});
