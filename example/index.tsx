import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { useForm, useField, Field } from "../src";

interface Values {
  name: string;
}

function useInput(field: Field<string>) {
  return {
    value: field.value,
    onBlur() {
      field.setTouched(true);
    },
    onChange(event: React.ChangeEvent<HTMLInputElement>) {
      field.setValue(event.target.value);
    }
  };
}

function App() {
  const form = useForm<Values>({
    initialValues: { name: "" },
    initialErrors: {
      name: "Oh, no. This is bad."
    }
  });

  const name = useInput(useField(form, "name"));

  return (
    <div>
      <h1>@stackup/form</h1>

      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...name} />
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
