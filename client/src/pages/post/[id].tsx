import { useRouter } from "next/router";
import React from "react";
import LayoutSpinner from "../../components/LayoutSpinner";
import LayoutWrapper from "../../components/LayoutWrapper";
import { usePostQuery, usePostsQuery } from "../../generated/graphql";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const router = useRouter();
  const postId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const { data, error, loading } = usePostQuery({
    variables: { postId },
  });

  if (loading) return <LayoutSpinner />;

  if (error) return <LayoutWrapper>Cannot find post</LayoutWrapper>;

  return (
    <LayoutWrapper>
      <h2>{data?.Post?.title}</h2>
      <p className="text-justify">{data?.Post?.contents}</p>
    </LayoutWrapper>
  );
};

export default Post;
