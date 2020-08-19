import { FormEvent } from "react";
import { Form, Submit } from "./types";
import { useMounted } from "./utilities/useMounted";
import { useEventCallback } from "./utilities/useEventCallback";

type SubmitFn<T> = (values: T) => void | Promise<void>;

/**
 * Create a submit handler for the form.
 *
 * @example <caption>Sumbitting a form</caption>
 * const form = useForm({ initialValue: "foo" });
 * const submit = useSubmit(form, console.log);
 *
 * @example <caption>Sumbitting with validation</caption>
 * const form = useForm({ initialValue: "foo" });
 * const validate = useValidate(form, myValidator);
 * const submit = useSubmit(validate, console.log);
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

    if (form.isSubmitting) {
      return;
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
