import React from "react";
import { useMeQuery } from "../../generated/graphql";
import NextLink from "next/link";

interface searchBarProps {}

const SearchArea: React.FC<searchBarProps> = ({}) => {
  const { data: meData } = useMeQuery();

  return (
    <div>
      {meData && (
        <div className="card">
          <div className="card-body d-flex align-items-center">
            <NextLink
              href={"/user-profile/[id]"}
              as={`/user-profile/${meData.me?.id}`}
            >
              <div role="button" className="fs-5 ms-2">
                <img
                  src={"/_next/static/media/reddit.8fd7d10b.png"}
                  alt="user profile"
                  style={{ height: 40, width: 40 }}
                  className="rounded-circle"
                />
              </div>
            </NextLink>
            <NextLink href={"create-post"}>
              <input
                role="button"
                className=" form-control nput-group-text mx-3"
                placeholder="Create post"
              ></input>
            </NextLink>
            <NextLink href={"create-post"}>
              <i className="bi bi-image fs-3 mx-3" role="button"></i>
            </NextLink>
            <NextLink href={"create-post"}>
              <i className="bi bi-link-45deg fs-2" role="button"></i>
            </NextLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchArea;
