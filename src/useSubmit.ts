import { useState } from "react";
import { Form, Validate, Submit } from "./types";
import { useEventCallback, useMounted } from "./utilities";

export function useSubmit<Value>(
  form: Form<Value>,
  submit: (values: Value) => void | Promise<void>
): Submit;
export function useSubmit<Value, Result>(
  form: Validate<Value, Result>,
  submit: (values: Result) => void | Promise<void>
): Submit;
export function useSubmit(
  form: Form<any> | Validate<any, any>,
  submit: (values: any) => void | Promise<void>
): Submit {
  const isMounted = useMounted();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const execute = useEventCallback(async () => {
    setSubmitting(true);

    try {
      if ("execute" in form) {
        const result = await form.execute(true);
        if (result.valid) await submit(result.value);
      } else if ("value" in form) {
        await submit(form.value);
      }
    } finally {
      if (isMounted) setSubmitting(false);
    }
  });

  const onSubmit = useEventCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      return execute();
    }
  );

  return {
    onSubmit,
    execute,
    isSubmitting
  };
}
