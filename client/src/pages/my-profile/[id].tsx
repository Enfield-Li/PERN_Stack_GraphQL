import React from "react";
import EditSection from "../../components/editSection";
import LayoutSpinner from "../../components/LayoutSpinner";
import LayoutWrapper from "../../components/LayoutWrapper";
import PlaceHolder from "../../components/PlaceHolder";
import VoteSection from "../../components/voteSection";
import { useProfileQuery } from "../../generated/graphql";
import withApollo from "../../utils/withApollo";
import NextLink from "next/link";

const Profile: React.FC = ({}) => {
  const { data, loading, error } = useProfileQuery();

  if (error) return <LayoutWrapper>Something went wrong</LayoutWrapper>;

  return (
    <LayoutWrapper>
      {!data?.me?.userPost && loading ? (
        <div>
          <PlaceHolder />
          <PlaceHolder />
        </div>
      ) : (
        data?.me?.userPost!.map((post) => (
          <div className="card my-3" key={post.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <VoteSection post={post} />
                  <div className="align-self-center">
                    <NextLink href={"/post/[id]"} as={`/post/${post.id}`}>
                      <a className="card-title text-dark text-decoration-none h3">
                        {post.title}
                      </a>
                    </NextLink>
                    <p className="card-text mt-2 text-muted">
                      {post.contentSnippets.length === 50
                        ? post.contentSnippets + "..."
                        : post.contentSnippets}
                    </p>
                  </div>
                </div>
                <EditSection meData={data} post={post} />
              </div>
            </div>
          </div>
        ))
      )}
    </LayoutWrapper>
  );
};

export default withApollo({ ssr: false })(Profile);
