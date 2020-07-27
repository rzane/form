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

export interface FormState<T> {
  values: T;
  errors: FormErrors<T>;
  touched: FormTouched<T>;
}

export type FormAction<T, K extends keyof T> =
  | { type: "SET_VALUES"; values: T }
  | { type: "SET_ERRORS"; errors: FormErrors<T> }
  | { type: "SET_TOUCHED"; touched: FormTouched<T> }
  | { type: "PUT_VALUE"; name: K; value: T[K] }
  | { type: "PUT_ERROR"; name: K; error: FormErrors<T>[K] }
  | { type: "PUT_TOUCHED"; name: K; touched: FormTouched<T>[K] };

export type FormReducer<T> = React.Reducer<
  FormState<T>,
  FormAction<T, keyof T>
>;

export interface Form<T> extends FormState<T> {
  initialValues: T;
  initialErrors: FormErrors<T>;
  initialTouched: FormTouched<T>;
  setValues(values: T): void;
  setErrors(errors: FormErrors<T>): void;
  setTouched(touched: FormTouched<T>): void;
  putValue<K extends keyof T>(name: K, value: T[K]): void;
  putError<K extends keyof T>(name: K, error: FormErrors<T>[K]): void;
  putTouched<K extends keyof T>(name: K, touched: FormTouched<T>[K]): void;
}

export interface Field<T> {
  id: string;
  name: string;
  value: T;
  error: FieldErrors<T> | undefined;
  touched: FieldTouched<T> | undefined;
  setValue(value: T): void;
  setError(error: FieldErrors<T>): void;
  setTouched(touched: FieldTouched<T>): void;
}
