import React from "react";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
} from "../generated/graphql";
import Spinner from "./Spinner";
import NextLink from "next/link";
import VoteSection from "../components/voteSection";

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({}) => {
  const { data, loading } = usePostsQuery();
  const [deletePost] = useDeletePostMutation();
  const { data: meData } = useMeQuery();

  return (
    <div className="mt-3">
      {!data && loading ? (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      ) : (
        data?.posts.posts.map((post) => (
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
                      {post.contentSnippets}...
                    </p>
                  </div>
                </div>
                {meData?.me?.id === post.creatorId ? (
                  <div>
                    <NextLink
                      href={"/post/edit/[id]"}
                      as={`/post/edit/${post.id}`}
                    >
                      <i className="bi bi-pencil-square btn" />
                    </NextLink>
                    <i
                      className="btn bi bi-trash-fill"
                      onClick={() => {
                        deletePost({ variables: { deletePostId: post.id } });
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default MainContent;
