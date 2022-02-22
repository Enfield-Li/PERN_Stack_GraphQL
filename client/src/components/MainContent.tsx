import React from "react";
import VoteSection from "../components/voteSection";
import { usePostsQuery } from "../generated/graphql";
import EditSection from "./editSection";
import ContentPlaceholder from "./layout/ContentPlaceholder";
import SearchArea from "./layout/SearchArea";
import FetchMore from "./nestedComponents/FetchMore";
import PostCardSection from "./nestedComponents/PostCardSection";
import PostCreatorInfo from "./nestedComponents/PostCreatorInfo";

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({}) => {
  const {
    data: postData,
    loading,
    fetchMore,
    variables,
  } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <div className="mt-2">
      <SearchArea />

      {!postData && loading ? (
        <div>
          <ContentPlaceholder />
          <ContentPlaceholder />
        </div>
      ) : (
        postData?.posts.posts.map((post) => (
          <div className="card my-2" key={post.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                  <VoteSection post={post} />

                  <div className="d-flex flex-column justify-content-between">
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

      {postData && postData?.posts.hasMore ? (
        <FetchMore
          fetchMore={fetchMore}
          loading={loading}
          postData={postData}
          variables={variables}
        />
      ) : null}
    </div>
  );
};
export default MainContent;
