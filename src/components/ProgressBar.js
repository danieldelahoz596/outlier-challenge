import React from "react";

const ProgressBar = ({ answersCount, totalCount }) => {
  return (
    <div className="progress" style={{ backgroundColor: "var(--white)" }}>
      <div
        className="progress-bar"
        role="progressbar"
        style={{
          width: `${(totalCount / (answersCount * 1.0)) * 100}%"`,
          backgroundColor: "var(--secondary)",
        }}
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};

export default ProgressBar;
