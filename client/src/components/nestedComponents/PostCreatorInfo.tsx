import React from "react";
import { UserInfoFragment } from "../../generated/graphql";
import NextLink from "next/link";
import { calculateTime } from "../../utils/calculaTime";
import { usePopperTooltip } from "react-popper-tooltip";

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
  } = usePopperTooltip({ trigger: "hover" });

  return (
    <div className="fs-6 fw-lighter">
      Posted by{" "}
      <span>
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
          <div
            ref={setTooltipRef}
            {...getTooltipProps({ className: "card bg-info" })}
          >
            <div {...getArrowProps({ className: "tooltip-arrow" })} />
            <div className="card-body">1231</div>
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
