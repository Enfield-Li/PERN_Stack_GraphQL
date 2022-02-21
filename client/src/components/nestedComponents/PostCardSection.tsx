import NextLink from "next/link";
import React from "react";
import {
  PostsSnippetFragment
} from "../../generated/graphql";
import InteractionDisplay from "./InteractionDisplay";

interface PostCardSectionProps {
  post: PostsSnippetFragment;
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

      {/* text */}
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
