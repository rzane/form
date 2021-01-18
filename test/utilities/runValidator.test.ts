import * as yup from "yup";
// import * as stackup from "@stackup/validate";
import { runValidator } from "../../src/utilities/runValidator";

// const stackupSchema = stackup.schema({
//   age: stackup.assert(stackup.isNumber),
//   name: stackup.assert(stackup.isString)
// });

const value = { name: "Rick", age: 99 };

test("yup", async () => {
  const validator = yup.object({
    age: yup.number(),
    name: yup.string()
  });

  expect(await runValidator(validator, value)).toEqual({ valid: true, value });
  expect(await runValidator(validator, { age: "a" })).toEqual({ valid: false });
});
