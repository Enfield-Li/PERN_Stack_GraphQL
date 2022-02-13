import { Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import FormWrapper from "../components/FormWrapper";
import InputWrapper from "../components/InputWrapper";
import LayoutWrapper from "../components/LayoutWrapper";
import {
  CreatePostMutationVariables,
  PostsDocument,
  PostsQuery,
  useCreatePostMutation,
} from "../generated/graphql";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  const [createPost, { data }] = useCreatePostMutation();
  const router = useRouter();

  return (
    <LayoutWrapper>
      <Formik<CreatePostMutationVariables>
        initialValues={{ title: "", contents: "" }}
        // refetchQueries: [{ query: PostsDocument }],
        onSubmit={async (values, {}) => {
          const res = await createPost({
            variables: values,
            update: (cache, { data }) => {
              const cachedData = cache.readQuery<PostsQuery>({
                query: PostsDocument,
              });
              if (!cachedData) return;
              if (!data) return;

              cache.writeQuery<PostsQuery>({
                query: PostsDocument,
                data: {
                  posts: {
                    hasMore: cachedData.posts.hasMore,
                    posts: [data.createPost, ...cachedData.posts.posts],
                  },
                },
              });
            },
          });

          // router.push(`/`);

          router.push(`/post/${res.data?.createPost.id}`);
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
