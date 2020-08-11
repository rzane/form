import { Form, Validation, Submit } from "./types";
import { useMounted } from "./utilities/useMounted";
import { useEventCallback } from "./utilities/useEventCallback";

type SubmitFn<T> = (values: T) => void | Promise<void>;

/**
 * Create a submit handler for the form.
 */
export function useSubmit<Value>(
  base: Form<Value>,
  submit: SubmitFn<Value>
): Submit<Value>;
export function useSubmit<Value, Result>(
  base: Validation<Value, Result>,
  submit: SubmitFn<Result>
): Submit<Value>;
export function useSubmit<Value>(
  base: Form<Value> | Validation<Value, any>,
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
