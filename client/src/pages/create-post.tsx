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
import { useIsAuth } from "../utils/useIsAuth";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  const [createPost] = useCreatePostMutation();
  const router = useRouter();
  useIsAuth();

  return (
    <LayoutWrapper>
      <Formik<CreatePostMutationVariables>
        initialValues={{ title: "", contents: "" }}
        // refetchQueries: [{ query: PostsDocument }],
        onSubmit={async (values, {}) => {
          const res = await createPost({
            variables: values,
            update: (cache, { data }) => {
              const cachedPost = cache.readQuery<PostsQuery>({
                query: PostsDocument,
              });
              if (!cachedPost) return;
              if (!data) return;

              cache.writeQuery<PostsQuery>({
                query: PostsDocument,
                data: {
                  posts: {
                    hasMore: cachedPost.posts.hasMore,
                    posts: [data.createPost, ...cachedPost.posts.posts],
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
