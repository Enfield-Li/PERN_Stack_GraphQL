import React, { useContext, useEffect, useState } from "react";
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
import { interactWithPost } from "../utils/interactWithPost";

interface EditSectionProps {
  post: PostContentsFragment | PostsSnippetFragment;
  meData: MeQuery | undefined;
}

const EditSection: React.FC<EditSectionProps> = ({ meData, post }) => {
  const router = useRouter();
  const { state } = useContext(GlobalContext);

  const [interact] = useInteractWithPostMutation();
  const [deletePost] = useDeletePostMutation();
  const apolloClient = useApolloClient();

  // https://codesandbox.io/s/github/mohsinulhaq/react-popper-tooltip/tree/master/examples/controlled?file=/src/index.js:234-570
  const [controlledVisible, setControlledVisible] = useState(false);
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    trigger: "click",
    closeOnOutsideClick: true,
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
                className={`me-2 text-decoration-none ${
                  post.postActivitiesStatus?.likeStatus
                    ? "bg-secondary rounded"
                    : null
                }`}
                onClick={() => {
                  if (meData?.me === null) {
                    // router.replace(`/login?next=${path}`);
                    router.push("/login");
                    return;
                  }
                  interactWithPost(post.id, "like", interact, state);
                  setControlledVisible(!controlledVisible);
                }}
              >
                &#10084;
              </a>

              {/* laugh */}
              <a
                href="#"
                className={`me-2 text-decoration-none ${
                  post.postActivitiesStatus?.laughStatus
                    ? "bg-secondary rounded"
                    : null
                }`}
                onClick={() => {
                  if (meData?.me === null) {
                    // router.replace(`/login?next=${path}`);
                    router.push("/login");
                    return;
                  }
                  interactWithPost(post.id, "laugh", interact, state);
                  setControlledVisible(!controlledVisible);
                }}
              >
                &#128516;
              </a>

              {/* confused */}
              <a
                href="#"
                className={`me-2 text-decoration-none ${
                  post.postActivitiesStatus?.confusedStatus
                    ? "bg-secondary rounded"
                    : null
                }`}
                onClick={() => {
                  if (meData?.me === null) {
                    // router.replace(`/login?next=${path}`);
                    router.push("/login");
                    return;
                  }
                  interactWithPost(post.id, "confused", interact, state);
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
