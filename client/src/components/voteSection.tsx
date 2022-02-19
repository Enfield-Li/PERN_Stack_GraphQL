import { useRouter } from "next/router";
import React from "react";
import {
  PostContentsFragment,
  PostsSnippetFragment,
  useInteractWithPostMutation,
  useMeQuery,
} from "../generated/graphql";
import { cacheUpdateAfterInteraction } from "../utils/cacheUpdateAfterInteraction";

interface VoteSectionProps {
  post: PostContentsFragment | PostsSnippetFragment;
}

const voteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const router = useRouter();
  const [interact, { loading }] = useInteractWithPostMutation();
  const { data } = useMeQuery();

  let path = "";
  if (router.pathname.includes("post")) {
    path = `post/${post.id}`;
  }

  return (
    <div className="me-3">
      <button
        className={`bi bi-caret-up btn ${
          post.postActivitiesStatus?.voteStatus === true ? "bg-info" : ""
        }`}
        disabled={loading}
        onClick={async () => {
          if (data?.me === null) {
            // router.replace(`/login?next=${path}`);
            router.push("/login");
            return;
          }

          const res = await interact({
            variables: { interactInput: { vote: true, postId: post.id } },
            update: (cache) =>
              cacheUpdateAfterInteraction(post.id, true, "vote", cache),
          });
          if (!res) console.error(res);
        }}
      />
      <div className="text-center">{post.postPoints?.votePoints}</div>
      <button
        className={`bi bi-caret-down btn ${
          post.postActivitiesStatus?.voteStatus === false ? "bg-danger" : ""
        }`}
        disabled={loading}
        onClick={async () => {
          const res = await interact({
            variables: { interactInput: { vote: false, postId: post.id } },
            update: (cache) =>
              cacheUpdateAfterInteraction(post.id, false, "vote", cache),
          });
          if (!res) console.error(res);
        }}
      />
    </div>
  );
};

export default voteSection;
