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
  name: string;
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
export interface Form<T> extends Field<T> {
  initialValue: T;
  initialError: Errors<T> | undefined;
  initialTouched: Touched<T> | undefined;
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
