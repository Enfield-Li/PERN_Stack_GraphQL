import DataLoader from "dataloader";
import { PostActivities } from "../entities/PostActivities";

type votesMapToVoteType = {
  [key: string]: PostActivities;
};

export const createVoteLoader = () =>
  new DataLoader<{ postId: number; userId: number }, PostActivities | null>(
    async (keys): Promise<PostActivities[] | null[]> => {
      const votes = await PostActivities.findByIds(keys as any[]);

      const votesMapToVotes: votesMapToVoteType = {};

      votes.forEach(
        (vote) => (votesMapToVotes[`${vote.userId}&${vote.postId}`] = vote)
      );

      const res = keys.map(
        (id) => votesMapToVotes[`${id.userId}&${id.postId}`]
      );

      return res;
    }
  );
