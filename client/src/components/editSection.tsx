import React from "react";
import {
  MeQuery,
  PostContentsFragment,
  PostsSnippetFragment,
  useDeletePostMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface editSectionProps {
  post: PostContentsFragment | PostsSnippetFragment;
  meData: MeQuery | undefined;
}

const EditSection: React.FC<editSectionProps> = ({ meData, post }) => {
  const [deletePost] = useDeletePostMutation();
  const router = useRouter();

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
              deletePost({
                variables: { deletePostId: post.id },
                update: (cache) => {
                  cache.evict({ id: "Post:" + post.id });
                },
              });

              router.push("/");
            }}
          />
        </div>
      ) : null}
    </>
  );
};
export default EditSection;
