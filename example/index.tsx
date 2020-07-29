import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Input } from "./Input";
import { PetValues, PetList } from "./pets";
import { useForm, useField } from "../src";

interface ProfileValues {
  name: string;
}

interface Values {
  email: string;
  profile: ProfileValues;
  pets: PetValues[];
}

function validate(value: Values) {
  return { value };
}

function submit(value: Values) {
  console.log(value);
}

function App() {
  const form = useForm<Values, Values>({
    validate,
    submit,
    initialValue: {
      email: "",
      profile: { name: "" },
      pets: []
    }
  });

  const email = useField(form, "email");
  const profile = useField(form, "profile");
  const name = useField(profile, "name");
  const pets = useField(form, "pets");

  return (
    <div>
      <h1>@stackup/form</h1>

      <Input label="Email" field={email} />

      <fieldset>
        <legend>Profile</legend>
        <Input label="Name" field={name} />
      </fieldset>

      <PetList field={pets} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
