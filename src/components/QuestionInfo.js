import React, { useEffect, useState } from "react";
import { ReactComponent as Star } from "../assets/star.svg";

const QuestionInfo = ({ currentPage, totalCount, questionInfo }) => {
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    if (questionInfo.difficulty === "easy") setStarCount(1);
    else if (questionInfo.difficulty === "medium") setStarCount(2);
    else if (questionInfo.difficulty === "hard") setStarCount(3);
  }, [questionInfo]);

  return (
    <div>
      <h2 className="text-dark">
        Question {currentPage} of {totalCount}
      </h2>
      <h5 className="text-secondary">{questionInfo.category}</h5>

      <div className="d-flex gap-2">
        {Array.from(Array(starCount)).map((_, index) => (
          <Star key={index} />
        ))}
        {Array.from(Array(5 - starCount)).map((_, index) => (
          <Star key={index} fill="var(--gray)" />
        ))}
      </div>
    </div>
  );
};

export default QuestionInfo;
