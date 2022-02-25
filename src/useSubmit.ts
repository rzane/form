import { FormEvent } from "react";
import { Form, Submit, ValidateOptions } from "./types";
import { toPromise } from "./utilities/toPromise";
import { useMounted } from "./utilities/useMounted";
import { useEventCallback } from "./utilities/useEventCallback";

type SubmitFn<T> = (values: T) => void | Promise<any>;

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
  fn: SubmitFn<Result>,
  opts: ValidateOptions = {}
): Submit {
  const isMounted = useMounted();
  const { touch = true } = opts;

  return useEventCallback((event?: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (form.isSubmitting) {
      return Promise.resolve();
    }

    form.setSubmitting(true);

    return toPromise(() => form.validate({ touch }))
      .then(result => {
        if (!result.valid) return;

        return toPromise(() => fn(result.value)).then(() => {
          if (isMounted.current) {
            form.setSubmission(prev => ({ count: prev.count + 1 }));
          }
        });
      })
      .catch(error => {
        if (isMounted.current) {
          form.setSubmission(prev => ({ count: prev.count + 1, error }));
        }

        throw error;
      })
      .finally(() => {
        if (isMounted.current) {
          form.setSubmitting(false);
        }
      });
  });
}
