import { FormEvent } from "react";
import { Form, Submit } from "./types";
import { useMounted } from "./utilities/useMounted";
import { useEventCallback } from "./utilities/useEventCallback";

type SubmitFn<T> = (values: T) => void | Promise<void>;

/**
 * Create a submit handler for the form.
 */
export function useSubmit<Value, Result>(
  form: Form<Value, Result>,
  fn: SubmitFn<Result>
): Submit {
  const isMounted = useMounted();

  return useEventCallback(async (event?: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.setSubmitting(true);

    try {
      const result = await form.validate({ touch: true });
      if (result.valid) await fn(result.value);
    } finally {
      if (isMounted) form.setSubmitting(false);
    }
  });
}
