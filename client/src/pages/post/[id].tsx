import { useRouter } from "next/router";
import React from "react";
import EditSection from "../../components/editSection";
import LayoutSpinner from "../../components/layout/LayoutSpinner";
import LayoutWrapper from "../../components/layout/LayoutWrapper";
import InteractionDisplay from "../../components/nestedComponents/InteractionDisplay";
import PostCreatorInfo from "../../components/nestedComponents/PostCreatorInfo";
import VoteSection from "../../components/voteSection";
import { usePostQuery } from "../../generated/graphql";
import withApollo from "../../utils/withApollo";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const router = useRouter();
  const postId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const {
    data: postData,
    error,
    loading,
  } = usePostQuery({
    variables: { postId },
  });

  if (loading) return <LayoutSpinner />;

  if (error) return <LayoutWrapper>Cannot find post</LayoutWrapper>;

  return (
    <LayoutWrapper>
      {postData?.Post ? (
        <div className="card my-2">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <VoteSection post={postData.Post} />
                <div>
                  <PostCreatorInfo creator={postData.Post.creator} />
                  <h3>{postData.Post.title}</h3>
                  <p className="card-text mt-2 text-muted me-2">
                    {postData.Post?.contents}
                  </p>
                  <InteractionDisplay post={postData.Post} />
                </div>
              </div>
              <EditSection post={postData.Post} />
            </div>
          </div>
        </div>
      ) : (
        <div>Post no longer exist apparently...</div>
      )}
    </LayoutWrapper>
  );
};

export default withApollo({ ssr: true })(Post);
