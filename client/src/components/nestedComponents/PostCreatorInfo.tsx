import { ApolloQueryResult, useApolloClient } from "@apollo/client";
import NextLink from "next/link";
import React, { useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { UserCardDocument, UserInfoFragment } from "../../generated/graphql";
import { calculateTime } from "../../utils/calculaTime";
import ProfileCard from "./ProfileCard";

interface PostCreatorInfoProps {
  creator: UserInfoFragment;
  createdAt: string;
}

const PostCreatorInfo: React.FC<PostCreatorInfoProps> = ({
  creator,
  createdAt,
}) => {
  const [decoration, setDecoration] = useState(false);
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    trigger: "hover",
    delayHide: 100,
    interactive: true,
    placement: "right",
    // delayShow: 50,
  });

  const apolloClient = useApolloClient();
  const [userCard, setUserCard] = useState<ApolloQueryResult<any> | null>(null);

  // ⬇⬇⬇ useLazyQuery block renders ⬇⬇⬇
  // const [
  //   fetchUserInfo,
  //   { data: userData, loading: userLoading, error: userError },
  // ] = useUserLazyQuery({
  //   variables: { userId: creator.id },
  // });
  return (
    <div className="fs-6 fw-lighter mt-2">
      Posted by{" "}
      <span
        onMouseOver={async () => {
          setDecoration(true);
          let data = await apolloClient.query({
            query: UserCardDocument,
            variables: { userId: creator.id },
          });
          setUserCard(data);
        }}
        onMouseLeave={() => setDecoration(false)}
      >
        <span role="button" ref={setTriggerRef}>
          <NextLink
            href={"/user-profile/[id]"}
            as={`/user-profile/${creator.id}`}
          >
            <span
              role="button"
              className={`fw-light text-dark ${
                decoration
                  ? "text-decoration-underline"
                  : "text-decoration-none"
              }`}
            >
              {creator.username}
            </span>
          </NextLink>
        </span>
        {visible && (
          <div ref={setTooltipRef} {...getTooltipProps({ className: "" })}>
            <div {...getArrowProps({ className: "tooltip-arrow" })} />
            <div>
              {userCard?.data ? (
                <ProfileCard user={userCard?.data} userCard={true} />
              ) : null}
            </div>
          </div>
        )}
      </span>
      <span className="ms-2 fw-lighter">
        {calculateTime(parseInt(createdAt))}
      </span>
    </div>
  );
};
export default PostCreatorInfo;
