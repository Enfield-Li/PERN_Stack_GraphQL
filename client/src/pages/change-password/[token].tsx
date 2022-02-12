import { Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import FormWrapper from "../../components/FormWrapper";
import InputWrapper from "../../components/InputWrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toError } from "../../utils/toError";

interface ChangePasswordProps {}

const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
  const [changePassword] = useChangePasswordMutation();

  const router = useRouter();

  return (
    <Formik
      initialValues={{ password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const res = await changePassword({
          variables: {
            newPassword: values.password,
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          },
        });

        if (res.data?.changePassword.errors) {
          setErrors(toError(res.data?.changePassword.errors));
        } else if (res.data?.changePassword.user) {
          router.push("/");
        }
      }}
    >
      {(props) => (
        <FormWrapper props={props} formUsage="changePassword">
          <InputWrapper
            label="New Password"
            name="password"
            type={"password"}
          />
        </FormWrapper>
      )}
    </Formik>
  );
};
export default ChangePassword;
