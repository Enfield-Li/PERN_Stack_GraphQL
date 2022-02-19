import { useApolloClient } from "@apollo/client";
import {
  PostActivitiesStatusAndPointsFragment,
  PostActivitiesStatusAndPointsFragmentDoc,
  useInteractWithPostMutation,
} from "../generated/graphql";
import { cacheUpdateAfterInteraction } from "./cacheUpdateAfterInteraction";

// Unhandled Runtime Error

// Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
// 1. You might have mismatching versions of React and the renderer (such as React DOM)
// 2. You might be breaking the Rules of Hooks
// 3. You might have more than one copy of React in the same app
// See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.

type FieldType = "like" | "laugh" | "confused";

export const interactWithPost = (postId: number, field: FieldType) => {
  const [interact] = useInteractWithPostMutation();
  const apolloClient = useApolloClient();

  const cachedData =
    apolloClient.readFragment<PostActivitiesStatusAndPointsFragment>({
      fragment: PostActivitiesStatusAndPointsFragmentDoc,
      fragmentName: "PostActivitiesStatusAndPoints",
      id: `Post:${postId}`,
    });

  if (
    !cachedData ||
    !cachedData.postActivitiesStatus ||
    !cachedData.postPoints?.votePoints
  )
    return;

  let submitValue = true;
  if (cachedData.postActivitiesStatus.likeStatus === true) {
    submitValue = false;
  }

  if (field === "like") {
    interact({
      variables: {
        interactInput: {
          postId: postId,
          like: submitValue,
        },
      },
      update: (cache) =>
        cacheUpdateAfterInteraction(postId, submitValue, "like", cache),
    });
  }

  if (field === "laugh") {
    interact({
      variables: {
        interactInput: {
          postId: postId,
          laugh: submitValue,
        },
      },
      update: (cache) =>
        cacheUpdateAfterInteraction(postId, submitValue, "laugh", cache),
    });
  }

  if (field === "confused") {
    interact({
      variables: {
        interactInput: {
          postId: postId,
          confused: submitValue,
        },
      },
      update: (cache) =>
        cacheUpdateAfterInteraction(postId, submitValue, "confused", cache),
    });
  }
};
