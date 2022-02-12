import { Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import FormWrapper from "../components/FormWrapper";
import InputWrapper from "../components/InputWrapper";
import LayoutWrapper from "../components/LayoutWrapper";
import {
  CreatePostMutationVariables,
  useCreatePostMutation,
} from "../generated/graphql";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  const [createPost] = useCreatePostMutation();
  const router = useRouter();

  return (
    <LayoutWrapper>
      <Formik<CreatePostMutationVariables>
        initialValues={{ title: "", contents: "" }}
        onSubmit={async (values, {}) => {
          const res = await createPost({
            variables: values,
          });
          router.push("/");
        }}
      >
        {(props) => (
          <FormWrapper props={props} formUsage="Create Post">
            <InputWrapper label="Title" name="title" />
            <InputWrapper label="Contents" name="contents" textarea={true} />
          </FormWrapper>
        )}
      </Formik>
    </LayoutWrapper>
  );
};

export default CreatePost;
