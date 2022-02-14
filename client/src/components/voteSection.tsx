import {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
} from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import {
  PostContentsFragment,
  PostsSnippetFragment,
  useVoteMutation,
  VoteMutation,
  VoteStatusAndPointsFragment,
  VoteStatusAndPointsFragmentDoc,
} from "../generated/graphql";

interface voteSectionProps {
  post: PostContentsFragment | PostsSnippetFragment;
}

const voteSection: React.FC<voteSectionProps> = ({ post }) => {
  const router = useRouter();
  const [vote] = useVoteMutation();

  const cacheUpdateAfterVote = (
    id: number,
    votings: boolean,
    cache: ApolloCache<VoteMutation>
  ) => {
    const cachedData = cache.readFragment<VoteStatusAndPointsFragment>({
      fragment: VoteStatusAndPointsFragmentDoc,
      id: "Post:" + id,
    });

    if (cachedData) {
      if (cachedData.voteStatus === votings) return;

      const incOrDec = votings ? 1 : -1;

      const newPoints =
        cachedData.points + (cachedData.voteStatus === null ? 1 : 2) * incOrDec;

      cache.writeFragment<VoteStatusAndPointsFragment>({
        id: "Post:" + id,
        fragment: VoteStatusAndPointsFragmentDoc,
        data: {
          id: id,
          voteStatus: votings,
          points: newPoints,
        },
      });
    }
  };

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
              update: (cache) => cacheUpdateAfterVote(post.id, true, cache),
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
              update: (cache) => cacheUpdateAfterVote(post.id, false, cache),
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
