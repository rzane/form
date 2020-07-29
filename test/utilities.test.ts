import { insertItem, removeItem, transform } from "../src/utilities";

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

test("transform", () => {
  expect(transform(1, 2)).toEqual(1);
  expect(transform(v => v * 2, 2)).toEqual(4);
});
