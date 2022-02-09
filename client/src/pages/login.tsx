import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputWrapper from "../components/InputWrapper";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toError } from "../utils/toError";

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [login, { data }] = useLoginMutation();
  // behavior: data will return undefined at first and then actual data
  console.log("data from mutation: ", data);

  return (
    <Formik
      initialValues={{ usernameOrEmail: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const res = await login({
          variables: values,
          // simplest using refetch to update cache
          //   refetchQueries: [
          //     {
          //       query: MeDocument,
          //     },
          //   ],
          update: (cache, { data }) => {
            console.log("cache: ", cache);
            // generic
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                me: data?.login.user,
              },
            });
          },
        });

        if (res.data?.login.errors) {
          setErrors(toError(res.data.login.errors));
        } else if (res.data?.login.user) {
          // behavior: response will return actual data
          // console.log(res.data.login.user);
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="container mt-3">
          <InputWrapper label="Username" name="usernameOrEmail" />
          <InputWrapper label="Password" name="password" type="password" />

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default login;
