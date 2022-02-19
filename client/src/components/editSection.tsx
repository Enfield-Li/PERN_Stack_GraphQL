import React, { useContext } from "react";
import {
  MeQuery,
  PostContentsFragment,
  PostsDocument,
  PostsSnippetFragment,
  useDeletePostMutation,
  useInteractWithPostMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import { usePopperTooltip } from "react-popper-tooltip";
import { useRouter } from "next/router";
import { cacheUpdateAfterInteraction } from "../utils/cacheUpdateAfterInteraction";
import { GlobalContext } from "../context/GlobalContext";
import { useApolloClient } from "@apollo/client";

interface EditSectionProps {
  post: PostContentsFragment | PostsSnippetFragment;
  meData: MeQuery | undefined;
}

const EditSection: React.FC<EditSectionProps> = ({ meData, post }) => {
  const { state } = useContext(GlobalContext);
  const {
    laughState,
    confusedState,
    likeState,
    setLaughState,
    setLikeState,
    setConfusedState,
  } = state;

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
                  console.log("like: ", likeState);
                  interact({
                    variables: {
                      interactInput: {
                        postId: post.id,
                        like: true,
                      },
                    },
                    update: (cache) =>
                      cacheUpdateAfterInteraction(
                        post.id,
                        likeState,
                        "like",
                        cache
                      ),
                  });
                  setLikeState(!likeState);
                  setControlledVisible(!controlledVisible);
                }}
              >
                &#10084;
              </a>

              {/* laugh */}
              <a
                href="#"
                className="me-2 text-decoration-none"
                onClick={() => {
                  interact({
                    variables: {
                      interactInput: {
                        postId: post.id,
                        laugh: true,
                      },
                    },
                    update: (cache) =>
                      cacheUpdateAfterInteraction(
                        post.id,
                        laughState,
                        "laugh",
                        cache
                      ),
                  });
                  setLaughState(!laughState);
                  setControlledVisible(!controlledVisible);
                }}
              >
                &#128516;
              </a>

              {/* confused */}
              <a
                href="#"
                className="me-2 text-decoration-none"
                onClick={() => {
                  interact({
                    variables: {
                      interactInput: {
                        postId: post.id,
                        confused: true,
                      },
                    },
                    update: (cache) =>
                      cacheUpdateAfterInteraction(
                        post.id,
                        confusedState,
                        "confused",
                        cache
                      ),
                  });
                  setConfusedState(!confusedState);
                  setControlledVisible(!controlledVisible);
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
                  onClick={async () => {
                    setControlledVisible(!controlledVisible);
                    deletePost({
                      variables: { deletePostId: post.id },
                      // update: (cache) => {
                      //   cache.evict({ id: "Post:" + post.id });
                      // },
                    });

                    await apolloClient.refetchQueries({
                      include: [PostsDocument],
                      updateCache(cache) {
                        cache.evict({ fieldName: "posts" });
                      },
                    });
                    // router.push("/");
                    // router.reload();
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
