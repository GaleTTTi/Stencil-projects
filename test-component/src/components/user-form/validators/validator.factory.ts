import { EmailValidator } from "./custom-validators/email-validator";
import { getLengthValidator } from "./custom-validators/length-validator";
import { SelectValidation } from "./custom-validators/select-validation";
import { TelephoneValidator } from "./custom-validators/telephone-validator";
import { ZipValidator } from "./custom-validators/zip-validator";
import { Validator, ValidatorEntry } from "./validator";

export enum ValidatorsName {
  email = 'email',
  telephone = 'telephone',
  zip = 'zip',
  select = 'select',
  length = 'length'
}

export function combineValidators<A>(validator1: Validator<A>, validator2: Validator<A>): Validator<A> {
  let combined: Validator<A>;
  return combined = {
    validate: (value: A) => {
      let valueCheck1: boolean = validator1.validate(value);
      let valueCheck2: boolean = validator2.validate(value);

      if (!valueCheck1) {
        combined.errorMessage = validator1.errorMessage;
      } else if (!valueCheck2) {
        combined.errorMessage = validator2.errorMessage;
      }

      return valueCheck1 && valueCheck2;
    }
  }
}

export function getValidator<A>(list: Array<string | ValidatorEntry>): Validator<A> {
  return (list || []).map((validation) => {
    if (typeof validation === 'string') {
      return validatorFactory(validation, null);
    } else {
      return validatorFactory(validation.name, validation.options);
    }
  }).reduce(combineValidators, defaultValidator);
}

export function validatorFactory(name: string, options: any): Validator<any> {
  options ? options : {};
  switch(name) {
    case (ValidatorsName.email):
      return EmailValidator;
    case (ValidatorsName.length):
      return getLengthValidator(options.min, options.max);
    case (ValidatorsName.telephone):
      return TelephoneValidator;
    case (ValidatorsName.zip):
      return ZipValidator;
    case (ValidatorsName.select):
      return SelectValidation;
    default:
      return defaultValidator;
  }
}

export const defaultValidator: Validator<any> = {
  validate: (_value: any) => true
}