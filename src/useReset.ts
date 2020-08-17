import { FormEvent } from "react";
import { Form, Reset } from "./types";
import { useEventCallback } from "./utilities/useEventCallback";

/**
 * Create a reset handler for the form.
 *
 * @example
 * const form = useForm({ initialValue: "foo" });
 * const reset = useReset(form);
 */
export function useReset<Value, Result>(form: Form<Value, Result>): Reset {
  return useEventCallback(async (event?: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.reset();
  });
}
