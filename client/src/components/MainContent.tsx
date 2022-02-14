import React from "react";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
} from "../generated/graphql";
import Spinner from "./Spinner";
import NextLink from "next/link";
import VoteSection from "../components/voteSection";
import EditSection from "./editSection";

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({}) => {
  const { data: postData, loading } = usePostsQuery();
  const { data: meData } = useMeQuery();

  return (
    <div className="mt-3">
      {!postData && loading ? (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      ) : (
        postData?.posts.posts.map((post) => (
          <div className="card my-3" key={post.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <VoteSection post={post} />
                  <div className="align-self-center">
                    <NextLink href={"/post/[id]"} as={`/post/${post.id}`}>
                      <a className="card-title text-dark text-decoration-none h3">
                        {post.title}
                      </a>
                    </NextLink>
                    <p className="card-text mt-2 text-muted">
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
    </div>
  );
};
export default MainContent;
