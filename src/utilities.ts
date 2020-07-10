export const isEvent = (value: unknown): value is Event => {
  return value && typeof value === "object" && "preventDefault" in value;
};
