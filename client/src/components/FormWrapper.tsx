import {
  Form,
  FormikProps,
} from "formik";
import Link from "next/link";

type FormUsage = "Login" | "Register" | "changePassword";

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
  let addtionalAssist = null;

  if (formUsage === "Login")
    addtionalAssist = <Link href={"/forgot-password"}>Forgot password?</Link>;

  if (formUsage === "Register")
    addtionalAssist = <Link href={"/login"}>Got an account?</Link>;

  if (formUsage === "changePassword")
    addtionalAssist = <Link href={"/login"}>Or you can login!</Link>;

  return (
    <Form className="container mt-3 w-50">
      <div className="d-grid">
        {children}

        <button
          type="submit"
          disabled={props.isSubmitting}
          className="btn btn-primary w-auto"
        >
          {formUsage === "changePassword" ? "Change Password" : formUsage}
        </button>
      </div>
      <div className="pt-3">{addtionalAssist}</div>
    </Form>
  );
};
export default FormWrapper;

import React from "react";
