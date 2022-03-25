// schema for validator
export interface Validator<A> {
  validate: (x: A) => boolean;
  errorMessage?: string;
}

// schema for object with declared validations
export interface ValidatorEntry {
  name: string;
  options?: any;
}