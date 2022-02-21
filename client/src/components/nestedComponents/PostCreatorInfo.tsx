import React from "react";
import { UserInfoFragment } from "../../generated/graphql";
import NextLink from "next/link";

interface PostCreatorInfoProps {
  creator: UserInfoFragment;
}

const PostCreatorInfo: React.FC<PostCreatorInfoProps> = ({ creator }) => {
  return (
    <div className="fs-6 fw-light">
      Posted by{" "}
      <NextLink href={"/user-profile/[id]"} as={`/user-profile/${creator.id}`}>
        <span
          role="button"
          className="fw-lighter text-decoration-none text-dark"
        >
          {creator.username}
        </span>
      </NextLink>
    </div>
  );
};

export default PostCreatorInfo;
