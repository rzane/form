<h1 align="center">@stackup/form</h1>

<div align="center">

![Build](https://github.com/rzane/form/workflows/Build/badge.svg)
![Version](https://img.shields.io/npm/v/@stackup/form)
![Size](https://img.shields.io/bundlephobia/minzip/@stackup/form)
![License](https://img.shields.io/npm/l/@stackup/form)

</div>

A type-safe approach to managing complex form state in React.

## Usage

```jsx
import React from "react";
import { useForm, useField, useNoValidate } from "@stackup/form";

const Input = ({ label, field: { id, value, setValue } }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      value={value}
      onChange={useCallback(e => setValue(e.target.value), [setValue])}
    />
  </div>
);

const Form = () => {
  const form = useForm({
    validate: useNoValidate(),
    submit: useCallback(values => console.log(values), []),
    initialValue: { email: "" }
  });

  return (
    <form onSubmit={form.onSubmit}>
      <Input label="Email" field={useField(form, "email")} />
      <button type="submit">Save</button>
    </form>
  );
};
```
