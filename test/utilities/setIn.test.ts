import { setIn } from "../../src/utilities/setIn";

it("returns the value when the path is empty", () => {
  expect(setIn(undefined, [], 100)).toEqual(100);
});

it("updates a shallow property", () => {
  expect(setIn({}, ["foo"], 100)).toEqual({ foo: 100 });
});

it("updates a shallow property when undefined", () => {
  expect(setIn(undefined, ["foo"], 100)).toEqual({ foo: 100 });
});

it("updates a shallow index", () => {
  expect(setIn([], [1], 100)).toEqual([undefined, 100]);
});

it("updates a shallow index when undefined", () => {
  expect(setIn(undefined, [1], 100)).toEqual([undefined, 100]);
});

it("updates deeply", () => {
  expect(setIn(undefined, ["foo", "bar", 1, "baz"], 2)).toEqual({
    foo: { bar: [undefined, { baz: 2 }] }
  });
});
