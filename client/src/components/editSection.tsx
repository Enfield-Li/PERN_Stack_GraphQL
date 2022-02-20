import { useApolloClient } from "@apollo/client";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { GlobalContext } from "../context/GlobalContext";
import {
  PostContentsFragment, PostsSnippetFragment,
  useDeletePostMutation,
  useInteractWithPostMutation,
  useMeQuery
} from "../generated/graphql";
import { interactWithPost } from "../utils/interactWithPost";

interface EditSectionProps {
  post: PostContentsFragment | PostsSnippetFragment;
  // meData: MeQuery | undefined;
}

const EditSection: React.FC<EditSectionProps> = ({ post }) => {
  const router = useRouter();
  const { state } = useContext(GlobalContext);
  const { data: meData } = useMeQuery();

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

  console.log("meID: ", meData?.me?.id);
  console.log("creatorId: ", post.creatorId);
  return (
    <div className="d-flex flex-column">
      <div
        role="button"
        className="bi bi-three-dots text-success"
        ref={setTriggerRef}
      ></div>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "card bg-info" })}
        >
          <div className="card-body">
            <div {...getArrowProps({ className: "tooltip-arrow" })} />

            {/* like */}
            <span className="d-flex">
              <div
                role="button"
                className={`me-2 text-decoration-none ${
                  post.postActivitiesStatus?.likeStatus
                    ? "bg-secondary rounded"
                    : null
                }`}
                onClick={() => {
                  if (meData?.me === null) {
                    router.push("/login");
                    return;
                  }
                  interactWithPost(post.id, "like", interact, state);
                  setControlledVisible(!controlledVisible);
                }}
              >
                &#10084;
              </div>

              {/* laugh */}
              <span
                role="button"
                className={`me-2 text-decoration-none ${
                  post.postActivitiesStatus?.laughStatus
                    ? "bg-secondary rounded"
                    : null
                }`}
                onClick={() => {
                  if (meData?.me === null) {
                    router.push("/login");
                    return;
                  }
                  interactWithPost(post.id, "laugh", interact, state);
                  setControlledVisible(!controlledVisible);
                }}
              >
                &#128516;
              </span>

              {/* confused */}
              <span
                role="button"
                className={`text-decoration-none ${
                  post.postActivitiesStatus?.confusedStatus
                    ? "bg-secondary rounded"
                    : null
                }`}
                onClick={() => {
                  if (meData?.me === null) {
                    router.push("/login");
                    return;
                  }
                  interactWithPost(post.id, "confused", interact, state);
                  setControlledVisible(!controlledVisible);
                }}
              >
                &#x1F615;
              </span>
            </span>
          </div>
        </div>
      )}
      {/* show edit/delete button or not */}
      {meData?.me?.id === post.creatorId ? (
        <div className="mt-1 d-flex flex-column">
          {/* edit */}
          <NextLink href={"/post/edit/[id]"} as={`/post/edit/${post.id}`}>
            <span
              role="button"
              className="me-2 text-decoration-none"
              onClick={() => setControlledVisible(!controlledVisible)}
            >
              &#x1F4DD;
            </span>
          </NextLink>

          {/* delete */}
          <span
            role="button"
            className="me-2 mt-2 text-decoration-none"
            onClick={async () => {
              setControlledVisible(!controlledVisible);
              deletePost({
                variables: { deletePostId: post.id },

                update: (cache) => {
                  cache.evict({ id: "Post:" + post.id });
                },
              });

              // await apolloClient.refetchQueries({
              //   include: [PostsDocument],
              //   updateCache(cache) {
              //     cache.evict({ fieldName: "posts" });
              //   },
              // });
              // router.push("/");
              // router.reload();
            }}
          >
            &#128465;
          </span>
        </div>
      ) : null}
    </div>
  );
};
export default EditSection;
