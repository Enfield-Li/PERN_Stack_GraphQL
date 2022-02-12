import React from "react";
import LayoutWrapper from "./LayoutWrapper";
import Spinner from "./Spinner";

interface LayoutSpinnerProps {}

const LayoutSpinner: React.FC<LayoutSpinnerProps> = ({}) => {
  return (
    <LayoutWrapper>
      <div className="d-flex justify-content-center">
        <Spinner />
      </div>
    </LayoutWrapper>
  );
};
export default LayoutSpinner;
