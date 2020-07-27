export type FieldError<T> = T extends any[]
  ? string | string[] | FieldError<T[number]>[]
  : T extends object
  ? FormError<T>
  : string;

export type FormError<T> = {
  [K in keyof T]?: FieldError<T[K]>;
};

export type FieldTouched<T> = T extends any[]
  ? FormTouched<T[number]>[]
  : T extends object
  ? FormTouched<T>
  : boolean;

export type FormTouched<T> = {
  [K in keyof T]?: FieldTouched<T[K]>;
};

export interface FormOptions<T> {
  initialValue: T;
  initialError?: FormError<T>;
  initialTouched?: FormTouched<T>;
}

export type Transform<T> = (value: T) => T;
export type SetState<T> = (value: T | Transform<T>) => void;

export interface Form<T> {
  initialValue: T;
  initialError: FormError<T>;
  initialTouched: FormTouched<T>;
  value: T;
  error: FormError<T>;
  touched: FormTouched<T>;
  setValue: SetState<T>;
  setError: SetState<FormError<T>>;
  setTouched: SetState<FormTouched<T>>;
}

export interface Field<T> {
  id: string;
  name: string;
  value: T;
  error: FieldError<T> | undefined;
  touched: FieldTouched<T> | undefined;
  setValue: SetState<T>;
  setError: SetState<FieldError<T> | undefined>;
  setTouched: SetState<FieldTouched<T> | undefined>;
}

type Filter<T, V> = {
  [P in keyof T]: T[P] extends V ? P : never;
};

export type NamesOfType<T, V> = Filter<T, V>[keyof T];
