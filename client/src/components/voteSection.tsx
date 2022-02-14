import { useRouter } from "next/router";
import React from "react";
import {
  PostSnippetFragment,
  PostsSnippetFragment,
  useVoteMutation,
  VoteDocument,
  VoteMutation,
} from "../generated/graphql";

interface voteSectionProps {
  post: PostSnippetFragment | PostsSnippetFragment;
}

const voteSection: React.FC<voteSectionProps> = ({ post }) => {
  const router = useRouter();
  const [vote] = useVoteMutation();

  let path = "/";
  if (router.pathname.includes("post")) {
    path = `/post/${post.id}`;
  }

  return (
    <div className="me-3">
      <i
        className={`bi bi-caret-up btn ${post.voteStatus ? "bg-info" : ""}`}
        onClick={async () => {
          try {
            await vote({
              variables: { postId: post.id, value: true },
              // update: (cache, { data }) => {
              //   const cachedVote = cache.readQuery<VoteMutation>({
              //     query: VoteDocument,
              //   });
              //   if (!cachedVote) return;

              //   cache.writeQuery({
              //     query: VoteDocument,
              //     data: {
              //       value: data,
              //     },
              //   });
              // },
            });
          } catch (err) {
            // console.log(err);
            // router.push("/login");
            // router.replace(`/login?next=${path}`);
          }
        }}
      />
      <div className="text-center">{post.points}</div>
      <i
        className={`bi bi-caret-down btn ${
          post.voteStatus === false ? "bg-danger" : ""
        }`}
        onClick={async () => {
          try {
            await vote({
              variables: { postId: post.id, value: false },
            });
          } catch (err) {
            // router.push("/login");
          }
        }}
      />
    </div>
  );
};

export default voteSection;
