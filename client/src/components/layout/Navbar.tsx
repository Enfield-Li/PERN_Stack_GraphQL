import React from "react";
import NextLink from "next/link";
import {
  PostsDocument,
  useLogoutMutation,
  useMeQuery,
} from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [logout, { loading: logoutBtnLoading }] = useLogoutMutation();
  const apolloClient = useApolloClient();

  const { data, loading } = useMeQuery();

  let userStatus = null;

  if (loading) {
    // body show nothing
  } else if (data?.me) {
    userStatus = (
      <div className="d-flex align-items-center">
        <NextLink
          href={"/user-profile/[id]"}
          as={`/user-profile/${data.me.id}`}
        >
          <div role="button" className="nav-link text-dark">
            {data.me?.username}
          </div>
        </NextLink>

        <button
          type="button"
          className="btn btn-link text-dark text-decoration-none"
          disabled={logoutBtnLoading}
          onClick={async () => {
            await logout({
              // update: (cache) => {
              //   cache.writeQuery<MeQuery>({
              //     query: MeDocument,
              //     data: {
              //       me: null,
              //     },
              //   });
              // },
            });
            await apolloClient.resetStore();
          }}
        >
          logout
        </button>
      </div>
    );
  } else {
    userStatus = (
      <div className="d-flex align-items-center">
        <li className="nav-item">
          <NextLink href={"/login"}>
            <div role="button" className="nav-link text-dark">
              login
            </div>
          </NextLink>
        </li>
        <li className="nav-item">
          <NextLink href={"/register"}>
            <div role="button" className="nav-link text-dark">
              register
            </div>
          </NextLink>
        </li>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <ul className="nav justify-content-between container">
        <li className="nav-item">
          <NextLink href={"/"}>
            <div
              role="button"
              className="nav-link active text-dark h2"
              aria-current="page"
              onClick={async () => {
                await apolloClient.refetchQueries({
                  include: [PostsDocument],
                  updateCache(cache) {
                    cache.evict({ fieldName: "posts" });
                  },
                });
              }}
            >
              Home
            </div>
          </NextLink>
        </li>
        <div className="d-flex align-items-center">
          <NextLink href="/create-post">
            <button className="btn btn-link text-dark text-decoration-none me-2">
              Create post
            </button>
          </NextLink>
          {userStatus}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
