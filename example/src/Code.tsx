import * as React from "react";

export interface CodeProps {
  label: string;
  data: any;
}

export function Code(props: CodeProps) {
  return (
    <React.Fragment>
      <h4>{props.label}</h4>
      <pre>
        <code>{JSON.stringify(props.data, null, 2)}</code>
      </pre>
    </React.Fragment>
  );
}
