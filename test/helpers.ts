export function makeValidation(error?: any) {
  return jest.fn().mockImplementation(value => {
    if (error) {
      return { valid: false, error };
    } else {
      return { valid: true, value };
    }
  });
}
