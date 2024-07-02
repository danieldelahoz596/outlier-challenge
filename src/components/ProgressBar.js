import React from "react";

const ProgressBar = ({ answeredCount, totalCount }) => {
  return (
    <div className="progress bg-white">
      <div
        className="progress-bar bg-secondary"
        role="progressbar"
        style={{
          width: `${(answeredCount / (totalCount * 1.0)) * 100}%`,
        }}
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};

export default ProgressBar;
