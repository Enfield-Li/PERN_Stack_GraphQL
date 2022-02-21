import React from "react";
import { UserInfoFragment } from "../../generated/graphql";
import NextLink from "next/link";
import moment from "moment";

interface ProfileCardProps {
  user: UserInfoFragment;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const cackeDate = moment(parseInt(user.createdAt)).format("YYYY/MM/DD");

  return (
    <div className="card mt-2">
      {/* <img src="..." className="card-img-top" alt="..." /> */}
      <div className="card-body">
        <div className="d-flex flex-column align-items-center">
          <h5 className="card-title">{user.username}</h5>
          <div>{user.email}</div>
        </div>
        <p className="card-text mt-2">
          <div className="row">
            <div className="col-6">
              <div>Posts amounts:</div>
              <div>📘 {}</div>
            </div>

            <div className="col-6">
              <div>Cake day:</div>
              <div>🎂 {cackeDate}</div>
            </div>
          </div>
        </p>
        <NextLink href="/create-post">
          <div role="button" className="btn btn-primary col-12">
            Crete post
          </div>
        </NextLink>
      </div>
    </div>
  );
};
export default ProfileCard;
