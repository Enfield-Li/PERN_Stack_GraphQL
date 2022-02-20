import { Post } from "./../entities/Post";
import DataLoader from "dataloader";

type creatorIdsMapToPostType = {
  [key: number]: Post;
};

export const createPostLoader = () =>
  new DataLoader<number, Post>(async (creatorIds): Promise<Post[]> => {
    const posts = await Post.findByIds(creatorIds as number[]);

    const creatorIdsMapToPost: creatorIdsMapToPostType = {};

    posts.forEach((post) => {
      creatorIdsMapToPost[post.id] = post;
    });

    const res = creatorIds.map((creatorId) => creatorIdsMapToPost[creatorId]);
    return res;
  });
