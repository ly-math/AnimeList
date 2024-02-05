import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

function LoadingLayout({ loadingPage }) {
  return (
    <div className="loading-animation">
      <div>
        <PropagateLoader color={"blueviolet"} loading={loadingPage} size={20} />
      </div>
    </div>
  );
}

export default LoadingLayout;
