import { Form, Validate, Submit } from "./types";
import { useEventCallback, useMounted } from "./utilities";

type SubmitFn<T> = (values: T) => void | Promise<void>;

/**
 * Create a submit handler for the form.
 */
export function useSubmit<Value>(
  base: Form<Value>,
  submit: SubmitFn<Value>
): Submit<Value>;
export function useSubmit<Value, Result>(
  base: Validate<Value, Result>,
  submit: SubmitFn<Result>
): Submit<Value>;
export function useSubmit<Value>(
  base: Form<Value> | Validate<Value, any>,
  submit: SubmitFn<Value>
): Submit<Value> {
  const isMounted = useMounted();
  const form = "form" in base ? base.form : base;

  const execute = useEventCallback(async () => {
    form.setSubmitting(true);

    try {
      if ("execute" in base) {
        const result = await base.execute({ touch: true });
        if (result.valid) await submit(result.value);
      } else {
        await submit(form.value);
      }
    } finally {
      if (isMounted) form.setSubmitting(false);
    }
  });

  const onSubmit = useEventCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      return execute();
    }
  );

  return { form, execute, onSubmit };
}
