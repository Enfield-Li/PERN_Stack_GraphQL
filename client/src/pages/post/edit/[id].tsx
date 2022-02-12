import { Formik } from "formik";
import { useRouter } from "next/router";
import FormWrapper from "../../../components/FormWrapper";
import InputWrapper from "../../../components/InputWrapper";
import LayoutSpinner from "../../../components/LayoutSpinner";
import LayoutWrapper from "../../../components/LayoutWrapper";
import {
  CreatePostMutationVariables,
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
          });
          router.push(`/post/${postId}`);
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
