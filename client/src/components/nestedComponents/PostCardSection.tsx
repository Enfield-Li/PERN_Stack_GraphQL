import React, { useContext } from "react";
import NextLink from "next/link";
import {
  MeQuery,
  PostsSnippetFragment,
  UserInfoFragment,
} from "../../generated/graphql";
import router from "next/router";
import { interactWithPost } from "../../utils/interactWithPost";
import { GlobalContext } from "../../context/GlobalContext";

interface PostCardSectionProps {
  post: PostsSnippetFragment & UserInfoFragment;
  meData: MeQuery | undefined;
  interact: any;
}

const PostCardSection: React.FC<PostCardSectionProps> = ({
  post,
  meData,
  interact,
}) => {
  const { state } = useContext(GlobalContext);

  return (
    <div>
      {/* title */}
      <NextLink href={"/post/[id]"} as={`/post/${post.id}`}>
        <div
          role="button"
          className="card-title text-dark text-decoration-none h3"
        >
          {post.title}
        </div>
      </NextLink>
      <p className="card-text mt-1 fs-5">
        {post.contentSnippets.length === 50
          ? post.contentSnippets + "..."
          : post.contentSnippets}
      </p>
      <div className="d-flex">

        {/* like */}
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
                post.postActivitiesStatus?.likeStatus
                  ? "text-info"
                  : "text-dark"
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
                post.postActivitiesStatus?.laughStatus
                  ? "text-info"
                  : "text-dark"
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
    </div>
  );
};

export default PostCardSection;
