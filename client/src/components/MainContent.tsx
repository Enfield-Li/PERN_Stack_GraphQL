import NextLink from "next/link";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import VoteSection from "../components/voteSection";
import {
  useInteractWithPostMutation,
  useMeQuery,
  usePostsQuery,
} from "../generated/graphql";
import { cacheUpdateAfterInteraction } from "../utils/cacheUpdateAfterInteraction";
import ContentPlaceholder from "./ContentPlaceholder";
import EditSection from "./editSection";
import { interactWithPost } from "../utils/interactWithPost";
import Router, { useRouter } from "next/router";

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({}) => {
  const router = useRouter();
  const { state } = useContext(GlobalContext);

  const [interact, { error }] = useInteractWithPostMutation();

  const { data, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const { data: meData } = useMeQuery();

  if (error) {
    Router.replace("/login");
  }

  let contentPlaceHoder;

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

                    <div className="d-flex">
                      {/* like */}
                      {post.postPoints!.likePoints > 0 ? (
                        <a
                          className={`border border-1 rounded-pill me-2 d-flex text-decoration-none ${
                            post.postActivitiesStatus?.likeStatus
                              ? "border-info"
                              : "border-dark"
                          }`}
                          href="#"
                          onClick={async () => {
                            if (meData?.me === null) {
                              // router.replace(`/login?next=${path}`);
                              router.push("/login");
                              return;
                            }

                            await interactWithPost(
                              post.id,
                              "like",
                              interact,
                              state
                            );
                          }}
                        >
                          <div className="mx-1">&#10084;</div>
                          <div
                            className={`mx-1 me-2 ${
                              post.postActivitiesStatus?.likeStatus
                                ? "text-info"
                                : "text-dark"
                            }`}
                          >
                            {post.postPoints?.likePoints}
                          </div>
                        </a>
                      ) : null}

                      {/* laugh */}
                      {post.postPoints!.laughPoints > 0 ? (
                        <a
                          className={`border border-1 rounded-pill me-2 d-flex text-decoration-none ${
                            post.postActivitiesStatus?.laughStatus
                              ? "border-info"
                              : "border-dark"
                          }`}
                          href="#"
                          onClick={() => {
                            if (meData?.me === null) {
                              // router.replace(`/login?next=${path}`);
                              router.push("/login");
                              return;
                            }

                            interactWithPost(post.id, "laugh", interact, state);
                          }}
                        >
                          <div className="mx-1">&#x1F604;</div>
                          <div
                            className={`mx-1 me-2 ${
                              post.postActivitiesStatus?.laughStatus
                                ? "text-info"
                                : "text-dark"
                            }`}
                          >
                            {post.postPoints?.laughPoints}
                          </div>
                        </a>
                      ) : null}

                      {/* confused */}
                      {post.postPoints!.confusedPoints > 0 ? (
                        <a
                          className={`border border-1 rounded-pill me-2 d-flex text-decoration-none ${
                            post.postActivitiesStatus?.confusedStatus
                              ? "border-info"
                              : "border-dark"
                          }`}
                          href="#"
                          onClick={() => {
                            if (meData?.me === null) {
                              // router.replace(`/login?next=${path}`);
                              router.push("/login");
                              return;
                            }

                            interactWithPost(
                              post.id,
                              "confused",
                              interact,
                              state
                            );
                          }}
                        >
                          <div className="mx-1">&#x1F615;</div>
                          <div
                            className={`mx-1 me-2 ${
                              post.postActivitiesStatus?.confusedStatus
                                ? "text-info"
                                : "text-dark"
                            }`}
                          >
                            {post.postPoints?.confusedPoints}
                          </div>
                        </a>
                      ) : null}
                    </div>
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
