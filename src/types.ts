export type Errors<T> = T extends any[]
  ? ErrorsArray<T[number]>
  : T extends object
  ? ErrorsObject<T>
  : string;

export type ErrorsArray<T> = string | string[] | Errors<T>[];

export type ErrorsObject<T> = {
  [K in keyof T]?: Errors<T[K]>;
};

export type Touched<T> = T extends any[]
  ? TouchedObject<T[number]>[]
  : T extends object
  ? TouchedObject<T>
  : boolean;

export type TouchedObject<T> = {
  [K in keyof T]?: Touched<T[K]>;
};

export type Transform<T> = (value: T) => T;
export type SetState<T> = (value: T | Transform<T>) => void;

export interface FormOptions<T> {
  initialValue: T;
  initialError?: ErrorsObject<T>;
  initialTouched?: TouchedObject<T>;
}

export interface Fields<T> {
  value: T;
  error: ErrorsObject<T> | undefined;
  touched: TouchedObject<T> | undefined;
  setValue: SetState<T>;
  setError: SetState<ErrorsObject<T> | undefined>;
  setTouched: SetState<TouchedObject<T> | undefined>;
}

export interface Form<T> extends Fields<T> {
  initialValue: T;
  initialError: ErrorsObject<T> | undefined;
  initialTouched: TouchedObject<T> | undefined;
}

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

type Filter<T, V> = {
  [P in keyof T]: T[P] extends V ? P : never;
};

export type NamesOfType<T, V> = Filter<T, V>[keyof T];
