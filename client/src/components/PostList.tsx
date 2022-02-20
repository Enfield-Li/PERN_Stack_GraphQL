import React from "react";
import { PostsQuery } from "../generated/graphql";

interface PostListProps {
  posts: PostsQuery | undefined;
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export default PostList;
