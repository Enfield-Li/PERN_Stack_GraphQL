import { Form, FormikProps } from "formik";
import Link from "next/link";

type FormUsage =
  | "Login"
  | "Register"
  | "Change password"
  | "Create Post"
  | "Update Post";

interface FormWrapperProps<Values> {
  children: React.ReactNode;
  props: FormikProps<Values>;
  formUsage?: FormUsage;
}

const FormWrapper = <Values,>({
  children,
  props,
  formUsage,
}: FormWrapperProps<Values>) => {
  // interface FormWrapperProps {
  //   children: React.ReactNode;
  //   props: FormikProps<unknown>;
  //   formUsage?: FormUsage;
  // }

  // const FormWrapper = ({ children, props, formUsage }: FormWrapperProps) => {
  let addtionalAssist = null;

  if (formUsage === "Login")
    addtionalAssist = (
      <div className="d-flex justify-content-between">
        <Link href={"/forgot-password"}>Forgot password?</Link>
        <Link href={"/register"}>Regester!</Link>
      </div>
    );

  if (formUsage === "Register")
    addtionalAssist = <Link href={"/login"}>Got an account?</Link>;

  if (formUsage === "Change password")
    addtionalAssist = <Link href={"/login"}>Or you can login!</Link>;

  return (
    <Form className="container mt-2 w-50">
      <div className="d-grid">
        {children}

        <button
          type="submit"
          disabled={props.isSubmitting}
          className="btn btn-primary w-auto"
        >
          {formUsage}
        </button>
      </div>
      <div className="pt-3">{addtionalAssist}</div>
    </Form>
  );
};
export default FormWrapper;

import React from "react";
