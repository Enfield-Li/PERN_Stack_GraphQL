import { Formik } from "formik";
import React, { useState } from "react";
import FormWrapper from "../components/nestedComponents/FormWrapper";
import InputWrapper from "../components/nestedComponents/InputWrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import withApollo from "../utils/withApollo";

interface ForgotPassword {}

interface InputField {
  email: string;
}

const ForgotPassword: React.FC<ForgotPassword> = ({}) => {
  const [isSent, setIsSent] = useState(false);
  const [sendEmail] = useForgotPasswordMutation();

  const inputField: InputField = { email: "" };

  return (
    <Formik
      initialValues={inputField}
      onSubmit={async (values) => {
        await sendEmail({ variables: values });
        setIsSent(true);
      }}
    >
      {(props) =>
        isSent ? (
          <p className="pt-3">
            We are sending you an email to change the password.
          </p>
        ) : (
          <FormWrapper props={props} formUsage="Change password">
            <InputWrapper label="Email" name="email" />
          </FormWrapper>
        )
      }
    </Formik>
  );
};
export default withApollo({ ssr: false })(ForgotPassword);
