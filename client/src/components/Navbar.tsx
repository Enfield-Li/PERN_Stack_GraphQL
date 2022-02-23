import { useApolloClient } from "@apollo/client";
import NextLink from "next/link";
import React from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import {
  PostsDocument,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [logout, { loading: logoutBtnLoading }] = useLogoutMutation();
  const apolloClient = useApolloClient();

  const { data, loading } = useMeQuery();

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ offset: [0, 1] });

  let userStatus = null;

  if (loading) {
    // body show nothing
  } else if (data?.me) {
    userStatus = (
      <div className="d-flex align-items-center justify-content-center">
        <div className="dropdown">
          <div
            className="dropdown-toggle border px-3 py-1 my-2 d-flex justify-content-center align-items-center"
            role="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-person-circle fs-2"></i>
            <div className="ms-3 me-2 d-flex flex-column align-items-center justify-content-center">
              <div>
                <i className="bi bi-bookmark-star me-1"></i>
                {data.me.username}
              </div>
              <div>{data.me.email}</div>
            </div>
          </div>
          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton1"
            style={{ width: 242 }}
          >
            <li>
              <div className="ms-3">MY STUFF</div>
              <div className="dropdown-item">
                <NextLink
                  href={"/user-profile/[id]"}
                  as={`/user-profile/${data.me.id}`}
                >
                  <div role="button" className="text-dark">
                    <i className="bi bi-person-circle fs-5 me-2"></i> Profile
                  </div>
                </NextLink>
              </div>
              <div className="dropdown-item" role="button">
                <div
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
                  <i className="bi bi-box-arrow-right fs-5 me-2"></i> Logout
                </div>
              </div>
            </li>
          </ul>
        </div>
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
        <li className="nav-item align-self-center">
          <NextLink href={"/"}>
            <div
              role="button"
              className="nav-link active text-dark h2"
              aria-current="page"
              onClick={async () => {
                const res = await apolloClient.refetchQueries({
                  include: [PostsDocument],
                  updateCache(cache) {
                    cache.evict({ fieldName: "posts" });
                    cache.gc();
                  },
                });
              }}
            >
              Awasome Forum
            </div>
          </NextLink>
        </li>
        <div className="d-flex align-items-center">
          <div role="button" ref={setTriggerRef}>
            <NextLink href="/create-post">
              <button className="btn btn-link text-dark text-decoration-none me-2">
                <i className="bi bi-plus-square fs-3"></i>
              </button>
            </NextLink>
          </div>
          {visible && (
            <div
              ref={setTooltipRef}
              {...getTooltipProps({ className: "card bg-info p-1" })}
            >
              <div {...getArrowProps({ className: "card-content" })} />
              Create post
            </div>
          )}
          {userStatus}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
