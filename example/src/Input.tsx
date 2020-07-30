import * as React from "react";
import { FormField } from "../../src";
import { unstable_trace as trace } from "scheduler/tracing";

export interface InputProps {
  label: string;
  field: FormField<string>;
}

export function Input(props: InputProps) {
  const { label, field } = props;
  const { setValue, setTouched } = field;

  const onBlur = React.useCallback(() => {
    trace("blur", performance.now(), () => {
      setTouched(true);
    });
  }, [setTouched]);

  const onChange = React.useCallback(
    event => {
      trace("change", performance.now(), () => {
        setValue(event.target.value);
      });
    },
    [setValue]
  );

  return (
    <div>
      <label htmlFor={field.id}>{label}</label>
      <input
        id={field.id}
        name={field.name.toString()}
        value={field.value}
        onBlur={onBlur}
        onChange={onChange}
      />
      {field.touched && field.error && (
        <div style={{ color: "red", marginBottom: 20 }}>{field.error}</div>
      )}
    </div>
  );
}
