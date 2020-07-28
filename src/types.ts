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

export interface NestedField<T> {
  value: T;
  error: ErrorMap<T> | undefined;
  touched: TouchedMap<T> | undefined;
  setValue: SetState<T>;
  setError: SetState<ErrorMap<T> | undefined>;
  setTouched: SetState<TouchedMap<T> | undefined>;
}

interface FieldState<T> {
  value: T;
  error: Errors<T> | undefined;
  touched: Touched<T> | undefined;
  setValue: SetState<T>;
  setError: SetState<Errors<T> | undefined>;
  setTouched: SetState<Touched<T> | undefined>;
}

export interface FormOptions<T> {
  initialValue: T;
  initialError?: Errors<T>;
  initialTouched?: Touched<T>;
}

export interface Form<T> extends FieldState<T> {
  initialValue: T;
  initialError: Errors<T> | undefined;
  initialTouched: Touched<T> | undefined;
}

export interface Field<T> extends FieldState<T> {
  id: string;
  name: string;
}

type Filter<T, V> = {
  [P in keyof T]: T[P] extends V ? P : never;
};

export type NamesOfType<T, V> = Filter<T, V>[keyof T];
