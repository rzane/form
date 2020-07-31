export type FormError<Value> =
  | undefined
  | string
  | (Value extends any[]
      ? Array<FormError<Value[number]>>
      : Value extends object
      ? { [K in keyof Value]?: FormError<Value[K]> }
      : never);

export type FormTouched<Value> =
  | undefined
  | boolean
  | (Value extends any[]
      ? Array<FormTouched<Value[number]>>
      : Value extends object
      ? { [K in keyof Value]?: FormTouched<Value[K]> }
      : never);

export type Transform<T> = (value: T) => T;
export type SetState<T> = (value: T | Transform<T>) => void;

/**
 * The primary form data structure.
 */
export interface FormField<Value> {
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
  value: Value;

  /**
   * An error or errors that are associated with this field or it's children.
   */
  error: FormError<Value>;

  /**
   * Indicates that this field or it's children have been modified by the user.
   */
  touched: FormTouched<Value>;

  /**
   * Change the value. Just like with `setState`, you can pass a callback
   * to this function to get the current value and update it.
   */
  setValue: SetState<Value>;

  /**
   * Update the error.
   */
  setError: SetState<FormError<Value>>;

  /**
   * Indicate that this field has been touched. This is usually called in `onBlur`.
   */
  setTouched: SetState<FormTouched<Value>>;
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
export type ValidationResult<Value, Result> =
  | { valid: true; value: Result }
  | { valid: false; error: FormError<Value> };

/**
 * A function that is called to validate the form.
 */
export type Validate<Value, Result> = (
  value: Value
) => ValidationResult<Value, Result> | Promise<ValidationResult<Value, Result>>;

/**
 * The function called when the form is submitted. The data will be validated
 * and converted before this function is called.
 */
export type Submit<Result> = (value: Result) => void | Promise<void>;

/**
 * The options that can be passed to {@link useForm}.
 */
export interface FormOptions<Value, Result = Value> {
  /**
   * Customize the base ID for all fields.
   */
  id?: string;

  /**
   * Handles the submission of the form.
   */
  submit: Submit<Result>;

  /**
   * Validates the form.
   */
  validate: Validate<Value, Result>;

  /**
   * The initial values for the form.
   */
  initialValue: Value;

  /**
   * The initial errors on the fields.
   */
  initialError?: FormError<Value>;

  /**
   * The initially touched fields.
   */
  initialTouched?: FormTouched<Value>;

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
export interface Form<Value, Result = Value> extends FormField<Value> {
  /**
   * The initial values for the form.
   */
  initialValue: Value;

  /**
   * The initial errors on the fields.
   */
  initialError: FormError<Value>;

  /**
   * The initially touched fields.
   */
  initialTouched: FormTouched<Value>;

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
  validate: () => Promise<ValidationResult<Value, Result>>;

  /**
   * This is the same as `submit`, but it'll `preventDefault` on the `event`.
   */
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
