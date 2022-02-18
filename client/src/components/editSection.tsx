import React from "react";
import {
  MeQuery,
  PostContentsFragment,
  PostsSnippetFragment,
  useDeletePostMutation,
  useInteractWithPostMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import { usePopperTooltip } from "react-popper-tooltip";
import { useRouter } from "next/router";

interface EditSectionProps {
  post: PostContentsFragment | PostsSnippetFragment;
  meData: MeQuery | undefined;
}

const EditSection: React.FC<EditSectionProps> = ({ meData, post }) => {
  const [controlledVisible, setControlledVisible] = React.useState(false);
  const [interact, { data }] = useInteractWithPostMutation();
  const [deletePost] = useDeletePostMutation();
  const router = useRouter();
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
                  interact({
                    variables: {
                      interactInput: { postId: post.id, like: true },
                    },
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
                  interact({
                    variables: {
                      interactInput: { postId: post.id, laugh: true },
                    },
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
                  interact({
                    variables: {
                      interactInput: { postId: post.id, confused: true },
                    },
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
