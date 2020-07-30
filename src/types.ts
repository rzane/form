export type Errors<T> = T extends any[]
  ? string | undefined | Array<string | undefined | Errors<T[number]>>
  : T extends object
  ? string | undefined | { [K in keyof T]?: Errors<T[K]> }
  : string | undefined;

export type Touched<T> = T extends any[]
  ? boolean | undefined | Array<boolean | undefined | Touched<T[number]>>
  : T extends object
  ? boolean | undefined | { [K in keyof T]?: Touched<T[K]> }
  : boolean | undefined;

export type Transform<T> = (value: T) => T;
export type SetState<T> = (value: T | Transform<T>) => void;

/**
 * The primary form data structure.
 */
export interface Field<T> {
  id: string;
  name: string | number;
  value: T;
  error: Errors<T> | undefined;
  touched: Touched<T> | undefined;
  setValue: SetState<T>;
  setError: SetState<Errors<T> | undefined>;
  setTouched: SetState<Touched<T> | undefined>;
}

type MaybeAsync<T> = T | Promise<T>;

export type Result<T, R> =
  | { valid: true; value: R }
  | { valid: false; error: Errors<T> };

export type Validate<T, R> = (value: T) => MaybeAsync<Result<T, R>>;
export type Submit<T> = (value: T) => MaybeAsync<void>;

/**
 * These are options that can be passed to `useForm`.
 */
export interface FormOptions<T, R = T> {
  submit: Submit<R>;
  validate: Validate<T, R>;
  initialValue: T;
  initialError?: Errors<T>;
  initialTouched?: Touched<T>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

/**
 * The value returned by `useForm`.
 */
export interface Form<T, R = T> extends Field<T> {
  initialValue: T;
  initialError: Errors<T> | undefined;
  initialTouched: Touched<T> | undefined;
  isSubmitting: boolean;
  isValidating: boolean;
  submit: () => Promise<void>;
  validate: () => Promise<Result<T, R>>;
}
