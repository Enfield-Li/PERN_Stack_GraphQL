import React from "react";
import { UserInfoFragment, UserQuery } from "../../generated/graphql";

interface ProfileCardProps {
  user: UserInfoFragment;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className="card mt-2" style={{ width: 200 }}>
      {/* <img src="..." className="card-img-top" alt="..." /> */}
      <div className="card-body">
        <h5 className="card-title">{user.username}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <div role="button" className="btn btn-primary">
          Go somewhere
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
