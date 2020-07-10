import { Result } from "@stackup/validate";

export interface FormOptions<T, R> {
  initialValues: T;
  validate: (values: T) => Promise<Result<R>>;
  onSubmit: (values: R) => void | Promise<any>;
}

export interface Form<T> {
  initialValues: T;
  values: T;
  setValues(values: T): void;

  submit(): Promise<void>;
  reset(): void;

  useField<K extends keyof T>(key: K): Field<T[K]>;
}

export interface Field<T> {
  value: T;
  setValue(value: T): void;
}
