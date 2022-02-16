import DataLoader from "dataloader";
import { Votes } from "../entities/Votes";

type votesMapToVoteType = {
  [key: string]: Votes;
};

export const createVoteLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Votes | null>(
    async (keys): Promise<Votes[] | null[]> => {
      const votes = await Votes.findByIds(keys as any[]);

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
