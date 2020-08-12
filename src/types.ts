import { FormEvent } from "react";

export type Transform<T> = (value: T) => T;
export type SetState<T> = (value: T | Transform<T>) => void;

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
   * Indicates that validation is currently being run
   */
  isValidating: boolean;

  /**
   * Indicates that the form is currently being submitted
   */
  isSubmitting: boolean;

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
 * The options that can be passed to {@link useForm}.
 */
export interface UseFormOptions<Value> {
  /**
   * Customize the base ID for all fields.
   */
  id?: string;

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
}

/**
 * The value returned by `useForm`.
 */
export interface Form<Value>
  extends FormField<Value>,
    Submittable<Value, Value> {
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
   * Indicate that the form is validating
   */
  setValidating: SetState<boolean>;
}

export type ValidationResult<Value, Result> =
  | { valid: true; value: Result }
  | { valid: false; error: FormError<Value> };

export type ValidateFn<Value, Result> = (
  value: Value
) =>
  | ValidationResult<Value, Result>
  | PromiseLike<ValidationResult<Value, Result>>;

/**
 * Configures when validation runs.
 */
export interface UseValidationOptions {
  /**
   * Enables validation whenever values change.
   * @default true
   */
  onChange?: boolean;

  /**
   * Enables validation whenever a field is touched.
   * @default true
   */
  onBlur?: boolean;
}

/**
 * Options to run validation with.
 */
export interface ValidateOptions {
  /**
   * Touch erroneous fields.
   */
  touch?: boolean;
}

/**
 * Something that can be submitted.
 */
export interface Submittable<Value, Result> {
  /**
   * Indicate that the form is validating
   */
  setSubmitting: SetState<boolean>;

  /**
   * Run validation
   */
  validate: (opts: ValidateOptions) => Promise<ValidationResult<Value, Result>>;
}

/**
 * Submits the form.
 */
export type Submit = (event?: FormEvent<HTMLFormElement>) => Promise<void>;
