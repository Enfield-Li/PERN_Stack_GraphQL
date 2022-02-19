import { ApolloCache } from "@apollo/client";
import {
  InteractWithPostMutation,
  PostActivitiesStatusAndPointsFragment,
  PostActivitiesStatusAndPointsFragmentDoc,
} from "../generated/graphql";

type interactionField = "vote" | "like" | "laugh" | "confused";

export const cacheUpdateAfterInteraction = (
  id: number,
  upOrDownValue: boolean,
  fieldToInteract: interactionField,
  cache: ApolloCache<InteractWithPostMutation>
) => {
  const cachedData = cache.readFragment<PostActivitiesStatusAndPointsFragment>({
    fragment: PostActivitiesStatusAndPointsFragmentDoc,
    fragmentName: "PostActivitiesStatusAndPoints",
    id: `Post:${id}`,
  });

  if (!cachedData || !cachedData.postPoints) return;
  let newPoints!: number;
  let newUpOrDownValue!: boolean | null;
  let newData: PostActivitiesStatusAndPointsFragment;

  newData = {
    id: cachedData.id,
    postPoints: {
      ...cachedData.postPoints,
    },
    postActivitiesStatus: {
      ...cachedData.postActivitiesStatus,
    },
  };

  // votes
  // new vote and switch to opposite vote
  if (fieldToInteract === "vote") {
    if (cachedData.postActivitiesStatus?.voteStatus !== upOrDownValue) {
      newUpOrDownValue = upOrDownValue;
      const incOrDec = upOrDownValue ? 1 : -1;

      newPoints =
        cachedData.postPoints.votePoints +
        // check if user voted before
        (cachedData.postActivitiesStatus?.voteStatus === null ? 1 : 2) *
          incOrDec;
    }
    // user cancel vote
    else if (cachedData.postActivitiesStatus?.voteStatus === upOrDownValue) {
      newUpOrDownValue = null;
      const resetValPoints = upOrDownValue ? -1 : 1;
      newPoints = cachedData.postPoints.votePoints + resetValPoints;
    }
    newData.postPoints!.votePoints = newPoints;
    newData.postActivitiesStatus!.voteStatus = newUpOrDownValue;
  }

  if (fieldToInteract === "like") {
    newData.postActivitiesStatus!.likeStatus = upOrDownValue;
    newData.postPoints!.likePoints =
      cachedData.postPoints.likePoints + (upOrDownValue ? -1 : 1);
  }

  if (fieldToInteract === "laugh") {
    newData.postActivitiesStatus!.laughStatus = upOrDownValue;
    newData.postPoints!.laughPoints =
      cachedData.postPoints.laughPoints + (upOrDownValue ? -1 : 1);
  }

  if (fieldToInteract === "confused") {
    newData.postActivitiesStatus!.confusedStatus = upOrDownValue;
    newData.postPoints!.confusedPoints =
      cachedData.postPoints.confusedPoints + (upOrDownValue ? -1 : 1);
  }

  cache.writeFragment<PostActivitiesStatusAndPointsFragment>({
    fragment: PostActivitiesStatusAndPointsFragmentDoc,
    fragmentName: "PostActivitiesStatusAndPoints",
    id: `Post:${id}`,
    data: newData,
  });
};
