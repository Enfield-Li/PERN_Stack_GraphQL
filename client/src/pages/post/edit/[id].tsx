import { Formik } from "formik";
import { useRouter } from "next/router";
import FormWrapper from "../../../components/nestedComponents/FormWrapper";
import InputWrapper from "../../../components/nestedComponents/InputWrapper";
import LayoutSpinner from "../../../components/layout/LayoutSpinner";
import {
  CreatePostMutationVariables,
  PostsDocument,
  PostsQuery,
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import withApollo from "../../../utils/withApollo";
import LayoutWrapper from "../../../components/layout/LayoutWrapper";

interface EditPostProps {}

const EditPost: React.FC<EditPostProps> = ({}) => {
  const router = useRouter();
  const postId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const { data, loading } = usePostQuery({
    variables: { postId },
    skip: postId === -1,
  });
  const [updatePost, { data: updateData }] = useUpdatePostMutation();

  if (loading) return <LayoutSpinner />;

  if (!data?.Post) return <LayoutWrapper>Cannot find post</LayoutWrapper>;

  return (
    <LayoutWrapper>
      <Formik<CreatePostMutationVariables>
        initialValues={{
          title: data?.Post?.title,
          contents: data?.Post?.contents,
        }}
        onSubmit={async (values, {}) => {
          const res = await updatePost({
            variables: {
              title: values.title,
              contents: values.contents,
              updatePostId: postId,
            },

            update: (cache, { data: updatedPostData }) => {
              // if (!updatedPostData) return;

              // const newPostContentSnippet =
              //   updatedPostData?.updatePost?.contents.slice(0, 50);
              // if (!newPostContentSnippet) return;

              // cache.updateQuery<PostsQuery>(
              //   {
              //     query: PostsDocument,
              //     variables: { limit: 15, cursor: null },
              //   },
              //   (cachedPosts) => {
              //     if (!cachedPosts) return;

              //     cachedPosts.posts.posts.map((post) =>
              //       post.id === postId
              //         ? { ...post, contentSnippets: newPostContentSnippet }
              //         : post
              //     );
              //   }
              // );

              const cachedPost = cache.readQuery<PostsQuery>({
                query: PostsDocument,
                variables: { limit: 15, cursor: null },
              });
              if (!cachedPost) return;

              const newPostContentSnippet =
                updatedPostData?.updatePost?.contents.slice(0, 50);
              if (!newPostContentSnippet) return;

              cache.writeQuery<PostsQuery>({
                query: PostsDocument,
                data: {
                  posts: {
                    hasMore: cachedPost.posts.hasMore,
                    posts: cachedPost.posts.posts.map((post) =>
                      post.id === postId
                        ? { ...post, contentSnippets: newPostContentSnippet }
                        : post
                    ),
                  },
                },
              });
            },
          });
          // router.push(`/post/${postId}`);
          router.back();
        }}
      >
        {(props) => (
          <FormWrapper props={props} formUsage="Update Post">
            <InputWrapper label="Title" name="title" />
            <InputWrapper label="Contents" name="contents" textarea={true} />
          </FormWrapper>
        )}
      </Formik>
    </LayoutWrapper>
  );
};

export default withApollo({ ssr: false })(EditPost);
