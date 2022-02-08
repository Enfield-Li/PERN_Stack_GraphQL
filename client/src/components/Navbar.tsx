import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data, loading } = useMeQuery();
  console.log(data);

  return (
    <div className="bg-primary py-2">
      <ul className="nav justify-content-between container">
        <li className="nav-item">
          <NextLink href={"/"}>
            <a
              className="nav-link active text-dark"
              aria-current="page"
              href="#"
            >
              Home
            </a>
          </NextLink>
        </li>
        {data?.me ? (
          <div className="d-flex align-items-center">
            <li className="me-3">{data.me?.username}</li>
            <li>logout</li>
          </div>
        ) : (
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
        )}
      </ul>
    </div>
  );
};
export default Navbar;
