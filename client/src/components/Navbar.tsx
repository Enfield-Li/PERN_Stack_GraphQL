import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [logout, { loading: logoutBtnLoading }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery();

  let body = null;

  if (loading) {
    // body show nothing
  } else if (data?.me) {
    body = (
      <div className="d-flex align-items-center">
        <li className="me-3">{data.me?.username}</li>
        <button
          type="button"
          className="btn btn-link text-dark text-decoration-none"
          disabled={logoutBtnLoading}
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
        >
          logout
        </button>
      </div>
    );
  } else {
    body = (
      <div className="d-flex align-items-center">
        <li className="nav-item">
          <NextLink href={"/login"}>
            <a className="nav-link text-dark" href="#">
              login
            </a>
          </NextLink>
        </li>
        <li className="nav-item">
          <NextLink href={"/register"}>
            <a className="nav-link text-dark" href="#">
              register
            </a>
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
            <a
              className="nav-link active text-dark h2"
              aria-current="page"
              href="#"
            >
              Home
            </a>
          </NextLink>
        </li>
        {body}
      </ul>
    </div>
  );
};

export default Navbar;
