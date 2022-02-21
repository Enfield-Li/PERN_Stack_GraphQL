import moment from "moment";
import NextLink from "next/link";
import React from "react";
import { UserQuery } from "../../generated/graphql";

interface ProfileCardProps {
  user: UserQuery | undefined | null;
  userCard?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, userCard }) => {
  if (!user) return <div>User does not exist..</div>;
  const cackeDate = moment(parseInt(user?.user!.createdAt)).format(
    "YYYY/MM/DD"
  );

  return (
    <div className="card mt-2" style={{ width: 300 }}>
      {/* <img src="..." className="card-img-top" alt="..." /> */}
      <div className="card-body">
        <div className="d-flex flex-column align-items-center">
          <div className="card-title fs-3">{user.user?.username}</div>
          <div>{user.user?.email}</div>
        </div>
        <div className="card-text my-2">
          <div className="row">
            <div className="col-5 ms-1">
              <div>Posts</div>
              <div>📘 {user.user?.userPost?.postAmount}</div>
            </div>

            <div className="col-6">
              <div>Cake day:</div>
              <div>🎂 {cackeDate}</div>
            </div>
          </div>
        </div>
        {!userCard && (
          <NextLink href="/create-post">
            <div role="button" className="btn btn-primary col-12">
              Crete post
            </div>
          </NextLink>
        )}
      </div>
    </div>
  );
};
export default ProfileCard;
