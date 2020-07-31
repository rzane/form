import { insertItem, removeItem, getAllTouched } from "../src/utilities";

test("insertItem", () => {
  const values = [1, 2, 3];
  const nextValues = insertItem(values, 1, 4);
  expect(nextValues).toEqual([1, 4, 2, 3]);
  expect(nextValues).not.toBe(values);
});

test("removeItem", () => {
  const values = [1, 2, 3];
  const nextValues = removeItem(values, 1);
  expect(nextValues).toEqual([1, 3]);
  expect(nextValues).not.toBe(values);
});

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
