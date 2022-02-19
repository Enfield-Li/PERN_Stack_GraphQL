import React from "react";
import {
  MeQuery,
  PostActivitiesStatusAndPointsFragment,
  PostActivitiesStatusAndPointsFragmentDoc,
  PostContentsFragment,
  PostsSnippetFragment,
  useDeletePostMutation,
  useInteractWithPostMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import { usePopperTooltip } from "react-popper-tooltip";
import { useRouter } from "next/router";
import { interactWithPost } from "../utils/interactWithPost";
import { useApolloClient } from "@apollo/client";
import { cacheUpdateAfterInteraction } from "../utils/cacheUpdateAfterInteraction";

interface EditSectionProps {
  post: PostContentsFragment | PostsSnippetFragment;
  meData: MeQuery | undefined;
}

const EditSection: React.FC<EditSectionProps> = ({ meData, post }) => {
  const [controlledVisible, setControlledVisible] = React.useState(false);
  const [interact] = useInteractWithPostMutation();
  const [deletePost] = useDeletePostMutation();
  const router = useRouter();
  const apolloClient = useApolloClient();

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    trigger: "click",
    visible: controlledVisible,
    onVisibleChange: setControlledVisible,
  });

  return (
    <div className="App">
      <a className="bi bi-three-dots text-success" ref={setTriggerRef}></a>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "card bg-info" })}
        >
          <div className="card-body">
            <div {...getArrowProps({ className: "" })} />

            {/* like */}
            <div className="d-flex">
              <a
                href="#"
                className="me-2 text-decoration-none"
                onClick={() => {
                  setControlledVisible(!controlledVisible);
                  const cachedData =
                    apolloClient.readFragment<PostActivitiesStatusAndPointsFragment>(
                      {
                        fragment: PostActivitiesStatusAndPointsFragmentDoc,
                        fragmentName: "PostActivitiesStatusAndPoints",
                        id: `Post:${post.id}`,
                      }
                    );

                  if (!cachedData || !cachedData.postActivitiesStatus) return;

                  let cacheValue = false;
                  let submitValue = true;
                  if (cachedData.postActivitiesStatus.likeStatus === true) {
                    cacheValue = true;
                    submitValue = false;
                  }

                  interact({
                    variables: {
                      interactInput: {
                        postId: post.id,
                        like: submitValue,
                      },
                    },
                    update: (cache) =>
                      cacheUpdateAfterInteraction(
                        post.id,
                        cacheValue,
                        "like",
                        cache
                      ),
                  });
                }}
              >
                &#10084;
              </a>

              {/* laugh */}
              <a
                href="#"
                className="me-2 text-decoration-none"
                onClick={() => {
                  setControlledVisible(!controlledVisible);
                  const cachedData =
                    apolloClient.readFragment<PostActivitiesStatusAndPointsFragment>(
                      {
                        fragment: PostActivitiesStatusAndPointsFragmentDoc,
                        fragmentName: "PostActivitiesStatusAndPoints",
                        id: `Post:${post.id}`,
                      }
                    );

                  if (!cachedData || !cachedData.postActivitiesStatus) return;

                  let cacheValue = false;
                  let submitValue = true;
                  if (cachedData.postActivitiesStatus.laughStatus === true) {
                    cacheValue = true;
                    submitValue = false;
                  }

                  interact({
                    variables: {
                      interactInput: {
                        postId: post.id,
                        laugh: submitValue,
                      },
                    },
                    update: (cache) =>
                      cacheUpdateAfterInteraction(
                        post.id,
                        cacheValue,
                        "laugh",
                        cache
                      ),
                  });
                }}
              >
                &#128516;
              </a>

              {/* confused */}
              <a
                href="#"
                className="me-2 text-decoration-none"
                onClick={() => {
                  setControlledVisible(!controlledVisible);
                  const cachedData =
                    apolloClient.readFragment<PostActivitiesStatusAndPointsFragment>(
                      {
                        fragment: PostActivitiesStatusAndPointsFragmentDoc,
                        fragmentName: "PostActivitiesStatusAndPoints",
                        id: `Post:${post.id}`,
                      }
                    );

                  if (!cachedData || !cachedData.postActivitiesStatus) return;

                  let cacheValue = false;
                  let submitValue = true;
                  if (cachedData.postActivitiesStatus.confusedStatus === true) {
                    cacheValue = true;
                    submitValue = false;
                  }

                  interact({
                    variables: {
                      interactInput: {
                        postId: post.id,
                        confused: submitValue,
                      },
                    },
                    update: (cache) =>
                      cacheUpdateAfterInteraction(
                        post.id,
                        cacheValue,
                        "confused",
                        cache
                      ),
                  });
                }}
              >
                &#x1F615;
              </a>
            </div>

            {meData?.me?.id === post.creatorId ? (
              <div>
                {/* edit */}
                <NextLink href={"/post/edit/[id]"} as={`/post/edit/${post.id}`}>
                  <a
                    className="me-2 text-decoration-none"
                    onClick={() => setControlledVisible(!controlledVisible)}
                  >
                    &#x1F4DD;
                  </a>
                </NextLink>

                {/* delete */}
                <a
                  href="#"
                  className="me-2 ms-1 text-decoration-none"
                  onClick={() => {
                    setControlledVisible(!controlledVisible);
                    deletePost({
                      variables: { deletePostId: post.id },
                      update: (cache) => {
                        cache.evict({ id: "Post:" + post.id });
                      },
                    });

                    router.push("/");
                  }}
                >
                  &#x1F6BD;
                </a>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
export default EditSection;
