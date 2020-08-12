import { getAllTouched } from "../../src/utilities/getAllTouched";

test("getAllTouched", () => {
  expect(getAllTouched(undefined)).toEqual(undefined);
  expect(getAllTouched(true)).toEqual(true);
  expect(getAllTouched(false)).toEqual(true);
  expect(getAllTouched("")).toEqual(true);
  expect(getAllTouched(0)).toEqual(true);
  expect(getAllTouched([])).toEqual([]);
  expect(getAllTouched(["a"])).toEqual([true]);
  expect(getAllTouched({})).toEqual({});
  expect(getAllTouched({ a: "blah" })).toEqual({ a: true });
  expect(getAllTouched([{ a: "blah" }])).toEqual([{ a: true }]);
});
