export type FormErrors<T> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K][number] extends object
      ? FormErrors<T[K][number]>[] | string | string[]
      : string | string[]
    : T[K] extends object
    ? FormErrors<T[K]>
    : string;
};

export type FormTouched<T> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K][number] extends object
      ? FormTouched<T[K][number]>[]
      : boolean
    : T[K] extends object
    ? FormTouched<T[K]>
    : boolean;
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
  error: string | undefined;
  touched: boolean;
  setValue: (value: T) => void;
  setError: (error: string) => void;
  setTouched: (touched: boolean) => void;
}
