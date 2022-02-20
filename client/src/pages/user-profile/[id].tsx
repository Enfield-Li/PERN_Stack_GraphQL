import NextLink from "next/link";
import React from "react";
import ContentPlaceholder from "../../components/layout/ContentPlaceholder";
import EditSection from "../../components/editSection";
import ProfileCard from "../../components/layout/ProfileCard";
import ProfileCardPlaceholder from "../../components/layout/ProfileCardPlaceholder";
import VoteSection from "../../components/voteSection";
import { useUserQuery } from "../../generated/graphql";
import { useGetIntParams } from "../../utils/useGetIntParams";
import withApollo from "../../utils/withApollo";
import LayoutWrapper from "../../components/LayoutWrapper";

const UserProfile: React.FC = ({}) => {
  const intId = useGetIntParams();
  const { data, error, loading } = useUserQuery({
    variables: { userId: intId },
  });

  if (error) return <LayoutWrapper>Something went wrong</LayoutWrapper>;
  if (!data?.user)
    return (
      <LayoutWrapper>
        <div className="row">
          <div className="col-10">
            <ContentPlaceholder />
            <ContentPlaceholder />
          </div>
          <div className="col-2">
            <ProfileCardPlaceholder />
          </div>
        </div>
      </LayoutWrapper>
    );

  return (
    <LayoutWrapper>
      <div className="row">
        <div className="col-10">
          {!data?.user?.userPost ? (
            <div>
              <ContentPlaceholder />
              <ContentPlaceholder />
            </div>
          ) : data?.user?.userPost ? (
            data?.user?.userPost.map((post) => (
              <div className="card my-2" key={post.id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <VoteSection post={post} />
                      <div className="align-self-center">
                        <NextLink href={"/post/[id]"} as={`/post/${post.id}`}>
                          <div
                            role="button"
                            className="card-title text-dark text-decoration-none h3"
                          >
                            {post.title}
                          </div>
                        </NextLink>
                        <p className="card-text mt-2 text-muted">
                          {post.contentSnippets.length === 50
                            ? post.contentSnippets + "..."
                            : post.contentSnippets}
                        </p>
                      </div>
                    </div>
                    <EditSection meData={data} post={post} />
                    {/* <EditSection meData={data} post={post} /> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            "User hasn't posted anything yet"
          )}
        </div>
        <div className="col-2">
          <ProfileCard user={data?.user} />
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default withApollo({ ssr: false })(UserProfile);
