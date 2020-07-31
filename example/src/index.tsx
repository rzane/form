import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Code } from "./Code";
import { Input } from "./Input";
import { Pet, PetList } from "./PetList";
import { useForm, useField, useValidator } from "../../src";
import {
  schema,
  each,
  isString,
  isBlank,
  refute,
  assert
} from "@stackup/validate";

export interface Profile {
  name: string;
}

export interface User {
  email: string;
  profile: Profile;
  pets: Pet[];
}

const userSchema = schema<User, User>({
  email: assert(isString).then(refute(isBlank)),
  profile: schema({ name: assert(isString).then(refute(isBlank)) }),
  pets: each(schema({ name: assert(isString).then(refute(isBlank)) }))
});

function App() {
  const form = useForm<User>({
    validateOnBlur: true,
    validate: useValidator(userSchema),
    submit: value => console.log(value),
    initialValue: {
      email: "",
      pets: [],
      profile: { name: "" }
    }
  });

  const email = useField(form, "email");
  const profile = useField(form, "profile");
  const name = useField(profile, "name");
  const pets = useField(form, "pets");

  return (
    <form onSubmit={form.onSubmit}>
      <h1>@stackup/form</h1>

      {/** A plain ol' field */}
      <Input label="Email" field={email} />

      {/** A nested field */}
      <fieldset>
        <legend>Profile</legend>
        <Input label="Name" field={name} />
      </fieldset>

      {/** A repeating field */}
      <PetList pets={pets} />

      <p>
        <button type="submit">Submit</button>
      </p>

      <hr />

      <Code label="Values" data={form.value} />
      <Code label="Errors" data={form.error} />
      <Code label="Touched" data={form.touched} />
      <Code label="Submitting" data={form.isSubmitting} />
      <Code label="Validating" data={form.isValidating} />
    </form>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
