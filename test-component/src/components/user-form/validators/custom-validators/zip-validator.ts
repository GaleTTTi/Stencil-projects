import { Validator } from "../validator";

export const ZipValidator: Validator<string> = {
  validate: (value: string) => {
    return /^[0-9]{5}(?:-[0-9]{4})?$/.test(value);
  },
  errorMessage: "You must enter a valid zip code (e.g. 12345 or 12345-6789)."
}