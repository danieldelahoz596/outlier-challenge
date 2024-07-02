import React, { useMemo } from "react";

const ScoreBar = ({ totalCount, answeredCount, correctCount }) => {
  const score = useMemo(() => {
    const maxScore = (
      ((correctCount + (totalCount - answeredCount)) / (totalCount * 1.0)) *
      100
    ).toFixed(0);
    const minScore = ((correctCount / (totalCount * 1.0)) * 100).toFixed(0);
    const currentScore =
      answeredCount === 0
        ? 0
        : ((correctCount / (answeredCount * 1.0)) * 100).toFixed(0);
    return { maxScore, minScore, currentScore };
  }, [totalCount, answeredCount, correctCount]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <span>Score: {score.currentScore}%</span>
        <span>Max Score: {score.maxScore}%</span>
      </div>

      <div className="position-relative h-22 border border-5 border-dark">
        <span
          className="position-absolute bg-whilte-gray h-20 border-10"
          style={{ width: `${score.maxScore}%` }}
        />
        <span
          className="position-absolute bg-secondary h-20 border-10"
          style={{ width: `${score.currentScore}%` }}
        />
        <span
          className="position-absolute bg-dark-black h-20 border-10"
          style={{ width: `${score.minScore}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreBar;
