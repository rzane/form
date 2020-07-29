import * as React from "react";
import { Field } from "../src";

export interface InputProps {
  label: string;
  field: Field<string>;
}

export function Input(props: InputProps) {
  const { label, field } = props;
  const { id, name, value, error, setValue, setTouched } = field;

  const onBlur = React.useCallback(() => setTouched(true), [setTouched]);
  const onChange = React.useCallback(event => setValue(event.target.value), [
    setValue
  ]);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      {error && <div style={{ color: "red", marginBottom: 20 }}>{error}</div>}
    </div>
  );
}
