import React from "react";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import NextLink from "next/link";
import VoteSection from "../components/voteSection";
import EditSection from "./EditSection";
import ContentPlaceholder from "./ContentPlaceholder";

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({}) => {
  const { data, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const { data: meData } = useMeQuery();

  return (
    <div className="mt-2">
      {!data && loading ? (
        <div>
          <ContentPlaceholder />
          <ContentPlaceholder />
        </div>
      ) : (
        data?.posts.posts.map((post) => (
          <div className="card my-2" key={post.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <VoteSection post={post} />
                  <div className="">
                    <div className="fs-6 fw-light">
                      Posted by{" "}
                      <NextLink
                        href={"/user-profile/[id]"}
                        as={`/user-profile/${post.creatorId}`}
                      >
                        <a className="fw-lighter text-decoration-none text-dark">
                          {post.creator.username}
                        </a>
                      </NextLink>
                    </div>
                    <NextLink href={"/post/[id]"} as={`/post/${post.id}`}>
                      <a className="card-title text-dark text-decoration-none h3">
                        {post.title}
                      </a>
                    </NextLink>
                    <p className="card-text mt-1 fs-5">
                      {post.contentSnippets.length === 50
                        ? post.contentSnippets + "..."
                        : post.contentSnippets}
                    </p>
                  </div>
                </div>
                <EditSection meData={meData} post={post} />
              </div>
            </div>
          </div>
        ))
      )}

      {data && data?.posts.hasMore ? (
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data?.posts.posts[data.posts.posts.length - 1].createdAt,
                },

                // updateQuery: (previousValue, { fetchMoreResult }) => {
                //   if (!fetchMoreResult) return previousValue;

                //   return {
                //     posts: {
                //       hasMore: fetchMoreResult.posts.hasMore,
                //       posts: [
                //         ...previousValue.posts.posts,
                //         ...fetchMoreResult.posts.posts,
                //       ],
                //     },
                //   };
                // },
              });
            }}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Loading...</span>
              </>
            ) : (
              "Load more"
            )}
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default MainContent;
