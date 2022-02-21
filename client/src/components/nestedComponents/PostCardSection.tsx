import React, { useContext } from "react";
import NextLink from "next/link";
import {
  MeQuery,
  PostsSnippetFragment,
  UserInfoFragment,
} from "../../generated/graphql";
import InteractionDisplay from "./InteractionDisplay";

interface PostCardSectionProps {
  post: PostsSnippetFragment & UserInfoFragment;
}

const PostCardSection: React.FC<PostCardSectionProps> = ({ post }) => {
  return (
    <div>
      {/* title */}
      <NextLink href={"/post/[id]"} as={`/post/${post.id}`}>
        <div
          role="button"
          className="card-title text-dark text-decoration-none h3"
        >
          {post.title}
        </div>
      </NextLink>
      <p className="card-text mt-1 fs-5">
        {post.contentSnippets.length === 50
          ? post.contentSnippets + "..."
          : post.contentSnippets}
      </p>
      <InteractionDisplay post={post} />
    </div>
  );
};

export default PostCardSection;
