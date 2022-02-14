import React from "react";
import {
  MeQuery,
  PostSnippetFragment,
  PostsSnippetFragment,
  useDeletePostMutation,
} from "../generated/graphql";
import NextLink from "next/link";

interface editSectionProps {
  post: PostSnippetFragment | PostsSnippetFragment;
  meData: MeQuery | undefined;
}

const EditSection: React.FC<editSectionProps> = ({ meData, post }) => {
  const [deletePost] = useDeletePostMutation();

  return (
    <>
      {meData?.me?.id === post.creatorId ? (
        <div>
          <NextLink href={"/post/edit/[id]"} as={`/post/edit/${post.id}`}>
            <i className="bi bi-pencil-square btn" />
          </NextLink>
          <i
            className="btn bi bi-trash-fill"
            onClick={() => {
              deletePost({ variables: { deletePostId: post.id } });
            }}
          />
        </div>
      ) : null}
    </>
  );
};
export default EditSection;
