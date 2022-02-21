import React, { useContext } from "react";
import {
  MeQuery,
  PostContentsFragment,
  PostsSnippetFragment,
  useInteractWithPostMutation,
  useMeQuery,
  UserInfoFragment,
} from "../../generated/graphql";
import { GlobalContext } from "../../context/GlobalContext";
import router from "next/router";
import { interactWithPost } from "../../utils/interactWithPost";
import LayoutWrapper from "../layout/LayoutWrapper";

interface InteractionDisplayProps {
  post: PostsSnippetFragment | PostContentsFragment;
}

const InteractionDisplay: React.FC<InteractionDisplayProps> = ({ post }) => {
  const { state } = useContext(GlobalContext);
  const { data: meData } = useMeQuery();
  const [interact, { error }] = useInteractWithPostMutation();
  console.log(post.postPoints?.likePoints);

  if (error) {
    return <LayoutWrapper>Something went wrong..</LayoutWrapper>;
  }

  return (
    <div className="d-flex">
      {post.postPoints!.likePoints > 0 ? (
        <div
          role="button"
          className={`border border-1 rounded-pill me-2 d-flex text-decoration-none ${
            post.postActivitiesStatus?.likeStatus
              ? "border-info"
              : "border-dark"
          }`}
          onClick={async () => {
            if (meData?.me === null) {
              // router.replace(`/login?next=${path}`);
              router.push("/login");
              return;
            }
            await interactWithPost(post.id, "like", interact, state);
          }}
        >
          <div className="mx-1">&#10084;</div>
          <div
            className={`mx-1 me-2 ${
              post.postActivitiesStatus?.likeStatus ? "text-info" : "text-dark"
            }`}
          >
            {post.postPoints?.likePoints}
          </div>
        </div>
      ) : null}
      {/* laugh */}
      {post.postPoints!.laughPoints > 0 ? (
        <div
          role="button"
          className={`border border-1 rounded-pill me-2 d-flex text-decoration-none ${
            post.postActivitiesStatus?.laughStatus
              ? "border-info"
              : "border-dark"
          }`}
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
              post.postActivitiesStatus?.laughStatus ? "text-info" : "text-dark"
            }`}
          >
            {post.postPoints?.laughPoints}
          </div>
        </div>
      ) : null}
      {/* confused */}
      {post.postPoints!.confusedPoints > 0 ? (
        <div
          role="button"
          className={`border border-1 rounded-pill me-2 d-flex text-decoration-none ${
            post.postActivitiesStatus?.confusedStatus
              ? "border-info"
              : "border-dark"
          }`}
          onClick={() => {
            if (meData?.me === null) {
              // router.replace(`/login?next=${path}`);
              router.push("/login");
              return;
            }
            interactWithPost(post.id, "confused", interact, state);
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
        </div>
      ) : null}
    </div>
  );
};

export default InteractionDisplay;
