import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from "@apollo/client";
import {
  Exact,
  InteractWithPostInput,
  InteractWithPostMutation,
} from "../generated/graphql";
import { InitialStateTypes } from "../types/GlobalTypes";
import { cacheUpdateAfterInteraction } from "./cacheUpdateAfterInteraction";

type FieldType = "like" | "laugh" | "confused";

export const interactWithPost = (
  postId: number,
  field: FieldType,
  interact: {
    (
      options?:
        | MutationFunctionOptions<
            InteractWithPostMutation,
            Exact<{ interactInput: InteractWithPostInput }>,
            DefaultContext,
            ApolloCache<any>
          >
        | undefined
    ): Promise<FetchResult<InteractWithPostMutation>>;
  },
  state: InitialStateTypes,
  controlledVisible?: boolean,
  setControlledVisible?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const {
    laughState,
    confusedState,
    likeState,
    setLaughState,
    setLikeState,
    setConfusedState,
  } = state;

  if (field === "like") {
    interact({
      variables: {
        interactInput: {
          postId: postId,
          like: true,
        },
      },
      update: (cache) =>
        cacheUpdateAfterInteraction(postId, likeState, "like", cache),
    });
    setLikeState(!likeState);
    setControlledVisible && setControlledVisible(!controlledVisible);
  }

  if (field === "laugh") {
    interact({
      variables: {
        interactInput: {
          postId: postId,
          laugh: true,
        },
      },
      update: (cache) =>
        cacheUpdateAfterInteraction(postId, laughState, "laugh", cache),
    });
    setLaughState(!laughState);
    setControlledVisible && setControlledVisible(!controlledVisible);
  }

  if (field === "confused") {
    interact({
      variables: {
        interactInput: {
          postId: postId,
          confused: true,
        },
      },
      update: (cache) =>
        cacheUpdateAfterInteraction(postId, confusedState, "confused", cache),
    });
    setConfusedState(!confusedState);
    setControlledVisible && setControlledVisible(!controlledVisible);
  }
};
