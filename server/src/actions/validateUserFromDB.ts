import {
  ErrorResponse,
  UserInputField,
  FieldError,
  UserInput,
  UserResponse,
} from "../types/resolvertypes";

export const validateUserInput = (input: UserInput) => {
  if (input.username.length < 3)
    return {
      field: "username",
      message: "Username must be longer than 3 characters",
    };

  if (input.username.includes("@"))
    return {
      field: "username",
      message: "Username cannot include an @",
    };

  if (!input.email.includes("@"))
    return { field: "email", message: "Invalid email" };

  if (input.password.length < 3)
    return {
      field: "password",
      message: "Password must be longer than 3 characters",
    };

  return null;
};

export const validateSingleFieldFromDB = (
  errDetail: any,
  field: string
): UserResponse => {
  let error: FieldError = { field: "", message: "" };

  if (errDetail.includes(field)) {
    error.field = field;
    error.message = field + " already taken";
  }

  return { errors: error };
};

export const validateFieldsFromDB = (
  errDetail: any,
  fieldsToValidate: UserInputField[]
): UserResponse => {
  let error: FieldError = { field: "", message: "" };

  fieldsToValidate.forEach((field) => {
    if (errDetail.includes(field)) {
      error.field = field;
      error.message = field + " already taken";
    }

    return;
  });

  return { errors: error };
};

export const validateSingleField = (field: UserInputField): ErrorResponse => {
  return { errors: { field: field, message: "Invalid " + field } };
};
