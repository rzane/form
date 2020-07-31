export type FormError<T> = T extends any[]
  ? string | undefined | Array<string | undefined | FormError<T[number]>>
  : T extends object
  ? string | undefined | { [K in keyof T]?: FormError<T[K]> }
  : string | undefined;

export type FormTouched<T> = T extends any[]
  ? boolean | undefined | Array<boolean | undefined | FormTouched<T[number]>>
  : T extends object
  ? boolean | undefined | { [K in keyof T]?: FormTouched<T[K]> }
  : boolean | undefined;

export type Transform<T> = (value: T) => T;
export type SetState<T> = (value: T | Transform<T>) => void;

/**
 * The primary form data structure.
 */
export interface FormField<T> {
  id: string;
  name: string | number;
  value: T;
  error: FormError<T> | undefined;
  touched: FormTouched<T> | undefined;
  setValue: SetState<T>;
  setError: SetState<FormError<T> | undefined>;
  setTouched: SetState<FormTouched<T> | undefined>;
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
  initialError: FormError<T> | undefined;
  initialTouched: FormTouched<T> | undefined;
  isSubmitting: boolean;
  isValidating: boolean;
  submit: () => Promise<void>;
  validate: () => Promise<ValidationResult<T, R>>;
}
