import React from "react";
import {
  PostSnippetFragment,
  PostsSnippetFragment,
  useVoteMutation,
} from "../generated/graphql";

interface voteSectionProps {
  post: PostSnippetFragment | PostsSnippetFragment;
}

const voteSection: React.FC<voteSectionProps> = ({ post }) => {
  const [vote] = useVoteMutation();

  return (
    <div className="me-3">
      <i
        className={`bi bi-caret-up btn ${
          post.voteStatus === true ? "bg-info" : ""
        }`}
        onClick={async () => {
          try {
            await vote({ variables: { postId: post.id, value: true } });
          } catch (err) {
            console.log(err);
          }
        }}
      />
      <div className="text-center">{post.points}</div>
      <i
        className={`bi bi-caret-down btn ${
          post.voteStatus === false ? "bg-danger" : ""
        }`}
        onClick={async () => {
          await vote({ variables: { postId: post.id, value: false } });
        }}
      />
    </div>
  );
};

export default voteSection;
