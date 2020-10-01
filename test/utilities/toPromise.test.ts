import { toPromise } from "../../src/utilities/toPromise";

describe("toPromise", () => {
  test("converts sync success", async () => {
    const promise = toPromise(() => 1);
    expect(promise).toBeInstanceOf(Promise);
    await expect(promise).resolves.toEqual(1);
  });

  test("converts sync error", async () => {
    const promise = toPromise(() => {
      throw new Error("boom");
    });

    expect(promise).toBeInstanceOf(Promise);
    await expect(promise).rejects.toThrow(/boom/);
  });

  test("converts async success", async () => {
    const promise = toPromise(() => Promise.resolve(1));

    expect(promise).toBeInstanceOf(Promise);
    await expect(promise).resolves.toEqual(1);
  });

  test("converts async error", async () => {
    const promise = toPromise(() => Promise.reject(new Error("boom")));

    expect(promise).toBeInstanceOf(Promise);
    await expect(promise).rejects.toThrow(/boom/);
  });
});
