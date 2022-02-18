import { ApolloCache } from "@apollo/client";
import {
  InteractWithPostMutation,
  PostActivitiesStatusAndPointsFragment,
  PostActivitiesStatusAndPointsFragmentDoc,
} from "../generated/graphql";

type interactionField = "vote" | "like" | "laugh" | "confused";

export const cacheUpdateAfterInteraction = (
  id: number,
  value: boolean,
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
  let newValue!: boolean | null;
  let newData: PostActivitiesStatusAndPointsFragment;
  newData = {
    id: cachedData.id,
    postPoints: {
      ...cachedData.postPoints,
      // votePoints: cachedData.postPoints?.votePoints,
      // laughPoints: cachedData.postPoints?.laughPoints,
      // likePoints: cachedData.postPoints?.likePoints,
      // confusedPoints: cachedData.postPoints?.confusedPoints,
    },
    postActivitiesStatus: {
      ...cachedData.postActivitiesStatus,
    },
  };

  if (!newData.postPoints) return;

  // if (cachedData.postActivitiesStatus?.voteStatus !== value) {
  //   // user change vote
  //   newValue = value;
  //   const incOrDec = value ? 1 : -1;
  //   newPoints =
  //     cachedData.postPoints.votePoints +
  //     (cachedData.postActivitiesStatus?.voteStatus === null ? 1 : 2) * incOrDec;

  //   // user never voted before
  // } else if (cachedData.postActivitiesStatus?.voteStatus === value) {
  //   newValue = !value;
  //   const resetValPoints = value ? -1 : 1;
  //   newPoints = cachedData.postPoints.votePoints + resetValPoints;
  // }

  if (
    value === cachedData.postActivitiesStatus?.confusedStatus ||
    value === cachedData.postActivitiesStatus?.likeStatus ||
    value === cachedData.postActivitiesStatus?.laughStatus ||
    value === cachedData.postActivitiesStatus?.voteStatus
  ) {
    newValue = null;
  }

  if (voteField === "vote") {
    newData.postPoints.votePoints = newPoints;
    newData.postActivitiesStatus!.voteStatus = newValue;
  } else if (voteField === "confused") {
    newData.postPoints.confusedPoints = newPoints;
    newData.postActivitiesStatus!.confusedStatus = newValue;
  } else if (voteField === "laugh") {
    newData.postPoints.laughPoints = newPoints;
    newData.postActivitiesStatus!.laughStatus = newValue;
  } else if (voteField === "like") {
    newData.postPoints.likePoints = newPoints;
    newData.postActivitiesStatus!.likeStatus = newValue;
  }
  cache.writeFragment<PostActivitiesStatusAndPointsFragment>({
    fragment: PostActivitiesStatusAndPointsFragmentDoc,
    fragmentName: "PostActivitiesStatusAndPoints",
    id: `Post:${id}`,
    data: newData,
  });
};
