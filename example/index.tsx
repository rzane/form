import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { useForm, useField, Field } from "../src";

interface Profile {
  name: string;
}

interface Values {
  email: string;
  profile: Profile;
}

const useInput = ({
  id,
  name,
  value,
  setTouched,
  setValue
}: Field<string>) => ({
  id,
  name,
  value,
  onBlur: React.useCallback(() => setTouched(true), [setTouched]),
  onChange: React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [setValue]
  )
});

function App() {
  const form = useForm<Values>({
    initialValue: {
      email: "",
      profile: { name: "" }
    }
  });

  const email = useInput(useField(form, "email"));
  const profile = useField(form, "profile");
  const name = useInput(useField(profile, "name"));

  return (
    <div>
      <h1>@stackup/form</h1>

      <div>
        <label htmlFor={email.id}>Email</label>
        <input type="email" {...email} />
      </div>

      <fieldset>
        <legend>Profile</legend>

        <div>
          <label htmlFor={name.id}>Name</label>
          <input type="text" {...name} />
        </div>
      </fieldset>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
