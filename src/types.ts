export type ErrorMap<T> = { [K in keyof T]?: Errors<T[K]> };
export type ErrorList<T> = string | string[] | Errors<T>[];
export type Errors<T> = T extends any[]
  ? ErrorList<T[number]>
  : T extends object
  ? ErrorMap<T>
  : string;

export type TouchedList<T> = TouchedMap<T>[];
export type TouchedMap<T> = { [K in keyof T]?: Touched<T[K]> };
export type Touched<T> = T extends any[]
  ? TouchedList<T[number]>
  : T extends object
  ? TouchedMap<T>
  : boolean;

export type Transform<T> = (value: T) => T;
export type SetState<T> = (value: T | Transform<T>) => void;

interface FieldState<T> {
  value: T;
  error: Errors<T> | undefined;
  touched: Touched<T> | undefined;
  setValue: SetState<T>;
  setError: SetState<Errors<T> | undefined>;
  setTouched: SetState<Touched<T> | undefined>;
}

/**
 * These are options that can be passed to `useForm`.
 */
export interface FormOptions<T> {
  initialValue: T;
  initialError?: Errors<T>;
  initialTouched?: Touched<T>;
}

/**
 * The value returned by `useForm`.
 */
export interface Form<T> extends FieldState<T> {
  initialValue: T;
  initialError: Errors<T> | undefined;
  initialTouched: Touched<T> | undefined;
}

/**
 * The value returned by `useField`.
 */
export interface Field<T> extends FieldState<T> {
  id: string;
  name: string;
}

/**
 * An object consisting of the state for multiple fields.
 *
 * Any object that complies with this interface can be
 * passed to `useField`.
 */
export interface FieldMap<T> {
  value: T;
  error: ErrorMap<T> | undefined;
  touched: TouchedMap<T> | undefined;
  setValue: SetState<T>;
  setError: SetState<ErrorMap<T> | undefined>;
  setTouched: SetState<TouchedMap<T> | undefined>;
}
