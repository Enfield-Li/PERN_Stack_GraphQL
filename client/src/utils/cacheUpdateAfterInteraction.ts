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
  voteField: interactionField,
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
  if (!newData.postPoints) return;

  // new vote and switch to opposite vote
  if (cachedData.postActivitiesStatus?.voteStatus !== upOrDownValue) {
    newUpOrDownValue = upOrDownValue;
    const incOrDec = upOrDownValue ? 1 : -1;

    newPoints =
      cachedData.postPoints.votePoints +
      // check if user voted before
      (cachedData.postActivitiesStatus?.voteStatus === null ? 1 : 2) * incOrDec;
  }

  // user cancel vote
  else if (
    upOrDownValue === cachedData.postActivitiesStatus?.confusedStatus ||
    upOrDownValue === cachedData.postActivitiesStatus?.likeStatus ||
    upOrDownValue === cachedData.postActivitiesStatus?.laughStatus ||
    upOrDownValue === cachedData.postActivitiesStatus?.voteStatus
  ) {
    newUpOrDownValue = null;
    const resetValPoints = upOrDownValue ? -1 : 1;
    newPoints = cachedData.postPoints.votePoints + resetValPoints;
  }

  if (voteField === "vote") {
    newData.postPoints.votePoints = newPoints;
    newData.postActivitiesStatus!.voteStatus = newUpOrDownValue;
  } else if (voteField === "confused") {
    newData.postPoints.confusedPoints = newPoints;
    newData.postActivitiesStatus!.confusedStatus = newUpOrDownValue;
  } else if (voteField === "laugh") {
    newData.postPoints.laughPoints = newPoints;
    newData.postActivitiesStatus!.laughStatus = newUpOrDownValue;
  } else if (voteField === "like") {
    newData.postPoints.likePoints = newPoints;
    newData.postActivitiesStatus!.likeStatus = newUpOrDownValue;
  }

  cache.writeFragment<PostActivitiesStatusAndPointsFragment>({
    fragment: PostActivitiesStatusAndPointsFragmentDoc,
    fragmentName: "PostActivitiesStatusAndPoints",
    id: `Post:${id}`,
    data: newData,
  });
};
