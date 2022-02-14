import { Formik } from "formik";
import { useRouter } from "next/router";
import FormWrapper from "../../../components/FormWrapper";
import InputWrapper from "../../../components/InputWrapper";
import LayoutSpinner from "../../../components/LayoutSpinner";
import LayoutWrapper from "../../../components/LayoutWrapper";
import {
  CreatePostMutationVariables,
  PostsDocument,
  PostsQuery,
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";

interface EditPostProps {}

const EditPost: React.FC<EditPostProps> = ({}) => {
  const [updatePost, { data: updateData }] = useUpdatePostMutation();
  const router = useRouter();
  const postId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const { data, loading } = usePostQuery({ variables: { postId } });

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

            update: (cache, { data }) => {
              const cachedPost = cache.readQuery<PostsQuery>({
                query: PostsDocument,
              });
              if (!cachedPost) return;

              const newPostContentSnippet = data?.updatePost?.contents.slice(
                0,
                50
              );
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

export default EditPost;
