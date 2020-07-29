export type ErrorMap<T> = string | { [K in keyof T]?: Errors<T[K]> };
export type ErrorList<T> = string | string[] | Errors<T>[];
export type Errors<T> = T extends any[]
  ? ErrorList<T[number]>
  : T extends object
  ? ErrorMap<T>
  : string;

export type TouchedList<T> = boolean | boolean[] | Touched<T>[];
export type TouchedMap<T> = boolean | { [K in keyof T]?: Touched<T[K]> };
export type Touched<T> = T extends any[]
  ? TouchedList<T[number]>
  : T extends object
  ? TouchedMap<T>
  : boolean;

export type Transform<T> = (value: T) => T;
export type SetState<T> = (value: T | Transform<T>) => void;

export interface FieldState<T> {
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
 * An array consisting of the state for multiple fields.
 */
export interface FieldList<T> extends Field<T[]> {
  push: (value: T) => void;
  insert: (index: number, value: T) => void;
  remove: (index: number) => void;
}

/**
 * An item in an array
 */
export interface FieldItem<T> extends Field<T> {
  remove: () => void;
}
