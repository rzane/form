export type FormError<T> =
  | undefined
  | string
  | (T extends any[]
      ? Array<FormError<T[number]>>
      : T extends object
      ? { [K in keyof T]?: FormError<T[K]> }
      : never);

export type FormTouched<T> =
  | undefined
  | boolean
  | (T extends any[]
      ? Array<FormTouched<T[number]>>
      : T extends object
      ? { [K in keyof T]?: FormTouched<T[K]> }
      : never);

export type Transform<T> = (value: T) => T;
export type SetState<T> = (value: T | Transform<T>) => void;

/**
 * The primary form data structure.
 */
export interface FormField<T> {
  /**
   * A unique ID for this form field. This can be used to associate fields with a label.
   */
  id: string;

  /**
   * The name or array index that was given to {@link useField} or {@link useFieldItem}.
   */
  name: string | number;

  /**
   * The current value of the field.
   */
  value: T;

  /**
   * An error or errors that are associated with this field or it's children.
   */
  error: FormError<T>;

  /**
   * Indicates that this field or it's children have been modified by the user.
   */
  touched: FormTouched<T>;

  /**
   * Change the value. Just like with `setState`, you can pass a callback
   * to this function to get the current value and update it.
   */
  setValue: SetState<T>;

  /**
   * Update the error.
   */
  setError: SetState<FormError<T>>;

  /**
   * Indicate that this field has been touched. This is usually called in `onBlur`.
   */
  setTouched: SetState<FormTouched<T>>;
}

/**
 * The validation function should return either a `value` or an `error`.
 *
 * Many validation libraries support casting the data that you input. The
 * `value` that you return will be passed to your submit handler.
 *
 * The `error` should have the same shape of your form data, but all of the
 * values should be strings.
 */
export type ValidationResult<T, R> =
  | { valid: true; value: R }
  | { valid: false; error: FormError<T> };

/**
 * A function that is called to validate the form.
 */
export type Validate<T, R> = (
  value: T
) => ValidationResult<T, R> | Promise<ValidationResult<T, R>>;

/**
 * The function called when the form is submitted. The data will be validated
 * and converted before this function is called.
 */
export type Submit<T> = (value: T) => void | Promise<void>;

/**
 * The options that can be passed to {@link useForm}.
 */
export interface FormOptions<T, R = T> {
  /**
   * Customize the base ID for all fields.
   */
  id?: string;

  /**
   * Handles the submission of the form.
   */
  submit: Submit<R>;

  /**
   * Validates the form.
   */
  validate: Validate<T, R>;

  /**
   * The initial values for the form.
   */
  initialValue: T;

  /**
   * The initial errors on the fields.
   */
  initialError?: FormError<T>;

  /**
   * The initially touched fields.
   */
  initialTouched?: FormTouched<T>;

  /**
   * Enables validation whenever values change.
   * @default false
   */
  validateOnChange?: boolean;

  /**
   * Enables validation whenever a field is touched.
   * @default false
   */
  validateOnBlur?: boolean;
}

/**
 * The value returned by `useForm`.
 */
export interface Form<T, R = T> extends FormField<T> {
  /**
   * The initial values for the form.
   */
  initialValue: T;

  /**
   * The initial errors on the fields.
   */
  initialError: FormError<T>;

  /**
   * The initially touched fields.
   */
  initialTouched: FormTouched<T>;

  /**
   * Indicates that the form is currently submitting.
   */
  isSubmitting: boolean;

  /**
   * Indicates that the form is currently validating.
   */
  isValidating: boolean;

  /**
   * Trigger form submission.
   */
  submit: () => Promise<void>;

  /**
   * Trigger form validation.
   */
  validate: () => Promise<ValidationResult<T, R>>;

  /**
   * This is the same as `submit`, but it'll `preventDefault` on the `event`.
   */
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
