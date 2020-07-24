import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { useForm, useField } from "../src";

interface Values {
  name: string;
}

function App() {
  const form = useForm<Values>({
    initialValues: { name: "" },
    initialErrors: {
      name: "Oh, no. This is bad."
    }
  });

  const name = useField(form, "name");

  return (
    <div>
      <h1>@stackup/form</h1>

      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name.value}
          onBlur={() => name.setTouched(true)}
          onChange={event => name.setValue(event.target.value)}
        />
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
