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

export interface ValidateOptions {
  touch?: boolean;
}

export interface ResetOptions<Value> {
  value?: Value;
  error?: FormError<Value>;
  touched?: FormTouched<Value>;
}

export type ValidationResult<Value, Result> =
  | { valid: true; value: Result }
  | { valid: false; error: FormError<Value> };

/**
 * A function used for validation. This function must indicate whether
 * or not the form is valid.
 *
 * The `error` property can be used to set errors on the form.
 *
 * The `value` property can be used to transform the form's values before
 * validation.
 */
export type ValidateFn<Value, Result> = (
  value: Value
) => ValidationResult<Value, Result> | Promise<ValidationResult<Value, Result>>;

export interface StackupValidator<Value, Result> {
  resolve(value: any): any;
  reject(value: any): any;
  validate(
    value: Value
  ): Promise<
    | { valid: true; value: Result }
    | {
        valid: false;
        errors: Array<{ message: string; path: Array<string | number> }>;
      }
  >;
}

export interface YupValidator<Value, Result> {
  cast(value: any): any;
  validateSync(value: Value): Result;
  validate(value: Value): Promise<Result>;
}

export type Validator<Value, Result> =
  | ValidateFn<Value, Result>
  | StackupValidator<Value, Result>
  | YupValidator<Value, Result>;

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
   * Keeps track of the form's submission status
   */
  submission: Submission;

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

export interface UseValidFormOptions<Value, Result>
  extends UseFormOptions<Value> {
  /**
   * The function that validates the input.
   */
  validate: ValidateFn<Value, Result>;

  /**
   * Should validation run when fields are changed?
   * @default false
   */
  validateOnChange?: boolean;

  /**
   * Should validation run when fields are blurred?
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
   * Indicate that the form is validating
   */
  setValidating: SetState<boolean>;

  /**
   * Indicate that the form is validating
   */
  setSubmitting: SetState<boolean>;

  /**
   * Update the form's submission status
   */
  setSubmission: SetState<Submission>;

  /**
   * Reset the state of the form
   */
  reset: (opts?: ResetOptions<Value>) => void;

  /**
   * Run validation
   */
  validate: (
    opts?: ValidateOptions
  ) => Promise<ValidationResult<Value, Result>>;
}

/**
 * Submits the form.
 */
export type Submit = (event?: FormEvent<HTMLFormElement>) => Promise<void>;

/**
 * Resets the form.
 */
export type Reset = (event?: FormEvent<HTMLFormElement>) => Promise<void>;

/**
 * Keeps track of submissions.
 */
export interface Submission {
  /**
   * The number of times the form has been submitted
   */
  count: number;

  /**
   * If the submission flow throws an error, it will appear here.
   */
  error?: Error;
}
