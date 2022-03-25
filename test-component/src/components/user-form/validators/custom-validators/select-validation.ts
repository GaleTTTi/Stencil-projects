import { Validator } from "../validator";

export const SelectValidation: Validator<string> = {
  validate: (value: string) => value != "",
  errorMessage: "You must select an option."
}