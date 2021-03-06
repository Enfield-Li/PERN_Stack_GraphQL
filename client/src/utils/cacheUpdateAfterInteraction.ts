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
  // console.log("cachedData: ", cachedData);

  if (!cachedData || !cachedData.postPoints) return;
  let newPoints!: number;
  let newUpOrDownValue!: boolean | null;
  let newData: PostActivitiesStatusAndPointsFragment;

  newData = {
    id: id,
    postPoints: {
      __typename: "PostPointsType",
      ...cachedData.postPoints,
    },
    postActivitiesStatus: {
      __typename: "PostActivitiesStatusType",
      confusedStatus: cachedData.postActivitiesStatus?.confusedStatus
        ? cachedData.postActivitiesStatus?.confusedStatus
        : null,
      likeStatus: cachedData.postActivitiesStatus?.likeStatus
        ? cachedData.postActivitiesStatus?.likeStatus
        : null,
      laughStatus: cachedData.postActivitiesStatus?.laughStatus
        ? cachedData.postActivitiesStatus?.laughStatus
        : null,
      voteStatus: cachedData.postActivitiesStatus?.voteStatus
        ? cachedData.postActivitiesStatus?.voteStatus
        : null,
    },
    __typename: "Post",
  };
  // console.log("newData: ", newData);

  // votes
  // new vote and switch to opposite vote
  if (fieldToInteract === "vote") {
    if (cachedData.postActivitiesStatus?.voteStatus !== upOrDownValue) {
      newUpOrDownValue = upOrDownValue;
      const incOrDec = upOrDownValue ? 1 : -1;

      newPoints =
        cachedData.postPoints.votePoints +
        // check if user voted before
        (cachedData.postActivitiesStatus?.voteStatus === null || undefined
          ? 1
          : 2) *
          incOrDec;

      if (!cachedData.postActivitiesStatus) {
        newPoints = cachedData.postPoints.votePoints + incOrDec;
      }
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
    newData.postActivitiesStatus!.likeStatus = !cachedData.postActivitiesStatus
      ?.likeStatus
      ? true
      : false;
    newData.postPoints!.likePoints =
      cachedData.postPoints.likePoints +
      (cachedData.postActivitiesStatus?.likeStatus ? -1 : 1);
  }

  if (fieldToInteract === "laugh") {
    newData.postActivitiesStatus!.laughStatus = !cachedData.postActivitiesStatus
      ?.laughStatus
      ? true
      : false;
    newData.postPoints!.laughPoints =
      cachedData.postPoints.laughPoints +
      (cachedData.postActivitiesStatus?.laughStatus ? -1 : 1);
  }

  if (fieldToInteract === "confused") {
    newData.postActivitiesStatus!.confusedStatus = !cachedData
      .postActivitiesStatus?.confusedStatus
      ? true
      : false;
    newData.postPoints!.confusedPoints =
      cachedData.postPoints.confusedPoints +
      (cachedData.postActivitiesStatus?.confusedStatus ? -1 : 1);
  }

  const res = cache.writeFragment<PostActivitiesStatusAndPointsFragment>({
    fragment: PostActivitiesStatusAndPointsFragmentDoc,
    fragmentName: "PostActivitiesStatusAndPoints",
    id: `Post:${id}`,
    data: newData,
  });
  console.log(res);
};
