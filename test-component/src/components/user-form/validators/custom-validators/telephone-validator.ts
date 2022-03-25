import { Validator } from "../validator";

export const TelephoneValidator: Validator<string> = {
  validate: (value: string) => {
    return /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{2,3})[-. )]*(\d{3})[-. ]*(\d{3,4})(?: *x(\d+))?\s*$/.test(value);
  },
  errorMessage: "You must enter a valid telephone number."
}