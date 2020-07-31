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
  id: string;
  name: string | number;
  value: T;
  error: FormError<T>;
  touched: FormTouched<T>;
  setValue: SetState<T>;
  setError: SetState<FormError<T>>;
  setTouched: SetState<FormTouched<T>>;
}

type MaybeAsync<T> = T | Promise<T>;

export type ValidationResult<T, R> =
  | { valid: true; value: R }
  | { valid: false; error: FormError<T> };

export type Validate<T, R> = (value: T) => MaybeAsync<ValidationResult<T, R>>;
export type Submit<T> = (value: T) => MaybeAsync<void>;

/**
 * These are options that can be passed to `useForm`.
 */
export interface FormOptions<T, R = T> {
  id?: string;
  submit: Submit<R>;
  validate: Validate<T, R>;
  initialValue: T;
  initialError?: FormError<T>;
  initialTouched?: FormTouched<T>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

/**
 * The value returned by `useForm`.
 */
export interface Form<T, R = T> extends FormField<T> {
  initialValue: T;
  initialError: FormError<T>;
  initialTouched: FormTouched<T>;
  isSubmitting: boolean;
  isValidating: boolean;
  submit: () => Promise<void>;
  validate: () => Promise<ValidationResult<T, R>>;
}
