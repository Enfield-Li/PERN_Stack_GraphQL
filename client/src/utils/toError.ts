import { FieldError } from "../generated/graphql";

type errorType = {
  [key: string]: string;
};

export const toError = (errors: FieldError) => {
  const fieldError: errorType = {};

  fieldError[errors.field] = errors.message;

  return fieldError;
};
