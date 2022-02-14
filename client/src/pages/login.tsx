import { Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import FormWrapper from "../components/FormWrapper";
import InputWrapper from "../components/InputWrapper";
import {
  MeDocument,
  MeQuery,
  PostsDocument,
  useLoginMutation,
  usePostsQuery,
  VoteStatusAndPointsFragment,
} from "../generated/graphql";
import { toError } from "../utils/toError";

interface loginProps {}
interface initialValues {
  usernameOrEmail: string;
  password: string;
}

const login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  // behavior: data will return undefined at first and then actual data
  // console.log("data from mutation: ", data);

  const { data: postData } = usePostsQuery();

  return (
    <Formik<initialValues>
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
            // console.log("cache: ", cache);
            // generic
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                me: data?.login.user,
              },
            });
            // cache.evict({ fieldName: "posts:{}" });
          },
          refetchQueries: [{ query: PostsDocument }],
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
      {(props) => {
        // props.initialValues.password
        return (
          <FormWrapper props={props} formUsage="Login">
            <InputWrapper label="Username" name="usernameOrEmail" />
            <InputWrapper label="Password" name="password" type="password" />
          </FormWrapper>
        );
      }}
    </Formik>
  );
};
export default login;
