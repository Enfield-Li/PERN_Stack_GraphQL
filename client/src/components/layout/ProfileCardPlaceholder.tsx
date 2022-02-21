import React from "react";

interface ProfileCardPlaceholderProps {}

const ProfileCardPlaceholder: React.FC<ProfileCardPlaceholderProps> = ({}) => {
  return (
    <div className="card mt-2" aria-hidden="true">
      <div className="card-body">
        <div className="card-title placeholder-glow">
          <div className="d-flex justify-content-center ">
            <span
              className="placeholder col-4 rounded-circle"
              style={{ height: 35, width: 35 }}
            ></span>
          </div>
        </div>
        <p className="card-text placeholder-glow">
          <span
            className="placeholder col-12 w-20 rounded"
            style={{ height: 60 }}
          ></span>
        </p>
        <div
          role="button"
          className="btn btn-primary disabled placeholder col-12"
        ></div>
      </div>
    </div>
  );
};
export default ProfileCardPlaceholder;
