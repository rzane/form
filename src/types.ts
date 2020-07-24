export type FieldErrors<T> = T extends any[]
  ? T[number] extends object
    ? FormErrors<T[number]>[] | string | string[]
    : string | string[]
  : T extends object
  ? FormErrors<T>
  : string;

export type FormErrors<T> = {
  [K in keyof T]?: FieldErrors<T[K]>;
};

export type FieldTouched<T> = T extends any[]
  ? T[number] extends object
    ? FormTouched<T[number]>[]
    : boolean
  : T extends object
  ? FormTouched<T>
  : boolean;

export type FormTouched<T> = {
  [K in keyof T]?: FieldTouched<T[K]>;
};

export interface FormOptions<T> {
  initialValues: T;
  initialErrors?: FormErrors<T>;
  initialTouched?: FormTouched<T>;
}

export interface Fields<T> {
  values: T;
  errors: FormErrors<T>;
  touched: FormTouched<T>;
  setValues: (values: T) => void;
  setErrors: (errors: FormErrors<T>) => void;
  setTouched: (touched: FormTouched<T>) => void;
}

export interface Form<T> extends Fields<T> {
  initialValues: T;
  initialErrors: FormErrors<T>;
  initialTouched: FormTouched<T>;
}

export interface Field<T> {
  name: string;
  value: T;
  error: FieldErrors<T> | undefined;
  touched: FieldTouched<T> | undefined;
  setValue: (value: T) => void;
  setError: (error: string) => void;
  setTouched: (touched: boolean) => void;
}
