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
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    trigger: "hover",
    delayHide: 200,
    interactive: true,
    placement: "right",
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
    <div className="fs-6 fw-lighter">
      Posted by{" "}
      <span
        onMouseOver={async () => {
          let data = await apolloClient.query({
            query: UserCardDocument,
            variables: { userId: creator.id },
          });
          setUserCard(data);
        }}
      >
        <span role="button" ref={setTriggerRef}>
          <NextLink
            href={"/user-profile/[id]"}
            as={`/user-profile/${creator.id}`}
          >
            <span
              role="button"
              className="fw-light text-decoration-none text-dark"
            >
              {creator.username}
            </span>
          </NextLink>
        </span>
        {visible && (
          <div ref={setTooltipRef} {...getTooltipProps({ className: "" })}>
            <div {...getArrowProps({ className: "tooltip-arrow" })} />
            <div>
              <ProfileCard user={userCard?.data} userCard={true} />
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
