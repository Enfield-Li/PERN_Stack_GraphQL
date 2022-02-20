import { Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import FormWrapper from "../components/layout/FormWrapper";
import InputWrapper from "../components/InputWrapper";
import LayoutWrapper from "../components/LayoutWrapper";
import {
  CreatePostMutationVariables,
  PostsDocument,
  PostsQuery,
  useCreatePostMutation,
} from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import withApollo from "../utils/withApollo";

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
            update: (cache, { data: createdPosts }) => {
              if (!createdPosts) return;

              // cache.updateQuery<PostsQuery>(
              //   {
              //     query: PostsDocument,
              //     variables: { limit: 15, cursor: null },
              //   },
              //   (cachedPosts) => {
              //     if (!cachedPosts) return;
              //     cachedPosts.posts.posts = [
              //       createdPosts?.createPost,
              //       ...cachedPosts.posts.posts,
              //     ];
              //   }
              // );

              const cachedPost = cache.readQuery<PostsQuery>({
                query: PostsDocument,
                variables: { limit: 15, cursor: null },
              });

              if (!cachedPost) return;

              // cache.writeQuery<PostsQuery>({
              //   query: PostsDocument,
              //   data: {
              //     posts: {
              //       hasMore: cachedPost.posts.hasMore,
              //       posts: [createdPosts.createPost, ...cachedPost.posts.posts],
              //     },
              //   },
              //   variables: { limit: 15, cursor: null },
              // });
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

export default withApollo({ ssr: false })(CreatePost);
