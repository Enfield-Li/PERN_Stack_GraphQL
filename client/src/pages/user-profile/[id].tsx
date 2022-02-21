import React from "react";
import EditSection from "../../components/editSection";
import ContentPlaceholder from "../../components/layout/ContentPlaceholder";
import LayoutWrapper from "../../components/layout/LayoutWrapper";
import ProfileCardPlaceholder from "../../components/layout/ProfileCardPlaceholder";
import PostCardSection from "../../components/nestedComponents/PostCardSection";
import ProfileCard from "../../components/nestedComponents/ProfileCard";
import VoteSection from "../../components/voteSection";
import {
  useInteractWithPostMutation,
  useUserQuery,
} from "../../generated/graphql";
import { useGetIntParams } from "../../utils/useGetIntParams";
import withApollo from "../../utils/withApollo";

const UserProfile: React.FC = ({}) => {
  const intId = useGetIntParams();
  const { data: meData, error: userError } = useUserQuery({
    variables: { userId: intId },
  });

  const [interact] = useInteractWithPostMutation();

  if (userError) return <LayoutWrapper>Something went wrong</LayoutWrapper>;
  if (!meData?.user)
    return (
      <LayoutWrapper>
        <div className="row ms-2">
          <div className="col-8">
            <ContentPlaceholder />
            <ContentPlaceholder />
          </div>
          <div className="col-4">
            <ProfileCardPlaceholder />
          </div>
        </div>
      </LayoutWrapper>
    );

  return (
    <LayoutWrapper>
      <div className="row ms-2">
        <div className="col-8">
          {!meData?.user?.userPost ? (
            <div>
              <ContentPlaceholder />
              <ContentPlaceholder />
            </div>
          ) : meData?.user?.userPost ? (
            meData?.user?.userPost.map((post) => (
              <div className="card my-2" key={post.id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <VoteSection post={post} />

                      <div className="align-items-center mt-2">
                        <PostCardSection
                          // @ts-ignore
                          interact={interact}
                          meData={meData}
                          post={post}
                        />
                      </div>
                    </div>

                    <EditSection post={post} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            "User hasn't posted anything yet"
          )}
        </div>
        <div className="col-4">
          <ProfileCard user={meData?.user} />
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default withApollo({ ssr: false })(UserProfile);
