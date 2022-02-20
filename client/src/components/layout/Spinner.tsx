import React from "react";

interface spinnerProps {}

const Spinner: React.FC<spinnerProps> = ({}) => {
  return (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
export default Spinner;
