import { UserInput } from "./../resolvers/user";

export const validateRegister = (input: UserInput) => {
  if (!input.email.includes("@"))
    return { field: "email", message: "Invalid email" };

  if (input.password.length < 3)
    return {
      field: "password",
      message: "Password must be longer than 3 characters",
    };

  if (input.username.includes("@"))
    return {
      field: "username",
      message: "cannot include an @",
    };

  if (input.username.length < 3)
    return {
      field: "username",
      message: "Username must be longer than 3 characters",
    };

  return null;
};
