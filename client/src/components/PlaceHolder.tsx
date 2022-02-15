import React from "react";

interface PlaceHolderProps {}

const PlaceHolder: React.FC<PlaceHolderProps> = ({}) => {
  return (
    <div
      className="card container d-flex flex-row justify-content-between"
      aria-hidden="true"
    >
      <div className="mt-3">
        <i className={"bi bi-caret-up btn"} />
        <div className="text-center"></div>
        <i className={"bi bi-caret-down btn"} />
      </div>
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span
            className="placeholder col-10 w-100"
            style={{ height: 300 }}
          ></span>
        </p>
        <a href="#" className="btn btn-primary disabled placeholder col-6"></a>
      </div>
    </div>
  );
};

export default PlaceHolder;
