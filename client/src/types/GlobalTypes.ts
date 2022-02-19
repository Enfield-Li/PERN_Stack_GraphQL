import { SetStateAction } from "react";

export type GlobalActionType = {};
export const globalAction: GlobalActionType = {};

export type InitialStateTypes = {
  laughState: boolean;
  confusedState: boolean;
  likeState: boolean;
  setLaughState: React.Dispatch<React.SetStateAction<boolean>>;
  setLikeState: React.Dispatch<React.SetStateAction<boolean>>;
  setConfusedState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const initialState: InitialStateTypes = {
  laughState: true,
  likeState: false,
  confusedState: false,
  setLaughState: function (value: SetStateAction<boolean>): void {},
  setLikeState: function (value: SetStateAction<boolean>): void {},
  setConfusedState: function (value: SetStateAction<boolean>): void {},
};
