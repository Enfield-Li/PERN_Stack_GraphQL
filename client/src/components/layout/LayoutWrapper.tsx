import React from "react";
import Navbar from "../Navbar";

interface LayoutWrapperProps {}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <div style={{ backgroundColor: "#dae0e6" }}>
      <Navbar />
      <div className="container py-3">{children}</div>
    </div>
  );
};

export default LayoutWrapper;
