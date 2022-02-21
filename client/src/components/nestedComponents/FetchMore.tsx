import React from "react";
import { PostsQuery } from "../../generated/graphql";

interface FetchMoreProps {
  postData: PostsQuery | undefined;
  fetchMore: any;
  loading: boolean;
  variables: any;
}

const FetchMore: React.FC<FetchMoreProps> = ({
  postData,
  fetchMore,
  loading,
  variables,
}) => {
  return (
    <div className="d-flex justify-content-center">
      <button
        className="btn btn-primary"
        disabled={loading}
        onClick={() => {
          fetchMore({
            variables: {
              limit: variables?.limit,
              cursor:
                postData?.posts.posts[postData.posts.posts.length - 1]
                  .createdAt,
            },

            updateQuery: (
              previousValue: { posts: { posts: any } },
              { fetchMoreResult }: any
            ) => {
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
  );
};

export default FetchMore;
