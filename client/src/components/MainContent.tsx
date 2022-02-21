import React from "react";
import VoteSection from "../components/voteSection";
import { usePostsQuery } from "../generated/graphql";
import EditSection from "./editSection";
import ContentPlaceholder from "./layout/ContentPlaceholder";
import PostCardSection from "./nestedComponents/PostCardSection";
import PostCreatorInfo from "./nestedComponents/PostCreatorInfo";

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({}) => {
  const { data, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

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

                  <div>
                    <PostCreatorInfo
                      creator={post.creator}
                      createdAt={post.createdAt}
                    />
                    <PostCardSection post={post} />
                  </div>
                </div>

                <EditSection post={post} />
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

                updateQuery: (previousValue, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return previousValue;

                  return {
                    posts: {
                      hasMore: fetchMoreResult.posts.hasMore,
                      posts: [
                        ...previousValue.posts.posts,
                        ...fetchMoreResult.posts.posts,
                      ],
                    },
                  };
                },
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
