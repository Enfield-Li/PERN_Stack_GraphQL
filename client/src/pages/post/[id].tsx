import { useRouter } from "next/router";
import React from "react";
import EditSection from "../../components/editSection";
import LayoutSpinner from "../../components/LayoutSpinner";
import LayoutWrapper from "../../components/LayoutWrapper";
import VoteSection from "../../components/voteSection";
import { useMeQuery, usePostQuery } from "../../generated/graphql";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const router = useRouter();
  const { data: meData } = useMeQuery();
  const postId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const { data, error, loading } = usePostQuery({
    variables: { postId },
  });

  if (loading) return <LayoutSpinner />;

  if (error) return <LayoutWrapper>Cannot find post</LayoutWrapper>;

  return (
    <LayoutWrapper>
      {data?.Post ? (
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <VoteSection post={data.Post} />
                <div className="align-self-center">
                  <h3>{data.Post.title}</h3>
                  <p className="card-text mt-2 text-muted">
                    {data.Post?.contents}
                  </p>
                </div>
              </div>
              <EditSection meData={meData} post={data.Post} />
            </div>
          </div>
        </div>
      ) : (
        <div>Something's gone wrong</div>
      )}
    </LayoutWrapper>
  );
};

export default Post;
