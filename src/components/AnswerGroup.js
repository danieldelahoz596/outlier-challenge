import React, { useEffect, useMemo, useState } from "react";
import { getRandomArray } from "../utils/utils";
import styled from "styled-components";

const Button = styled.button`
  font-size: 1em;
  font-weight: 600;
  border: 2px solid var(--dark);
  border-radius: 5px;
  width: 250px;
  height: 30px;
  background: var(--light);
`;
const NextButton = styled(Button)`
  height: 40px;
`;

const AnswerGroup = ({ questionData, onSelectAnswer, onNext }) => {
  const [sequence, setSequence] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const answers = questionData["answers"];
  const correctAnswer = questionData["correctAnswer"];
  const totalCount = questionData["totalCount"];
  const currentPage = questionData["currentPage"];

  const answerCount = useMemo(() => answers.length, [answers]);

  const handleSelectAnswer = (value) => {
    setSelectedAnswer(value);
    onSelectAnswer(value);
  };

  useEffect(() => {
    setSequence(getRandomArray(answerCount));
    setSelectedAnswer("");
  }, [answers, answerCount]);

  const handleNext = () => {
    setSelectedAnswer("");
    onNext();
  };

  return (
    <div>
      <div className="row">
        {Array.from(Array(answerCount)).map((_, index) => (
          <div
            key={index}
            className="col-sm-12 col-md-6 mb-5 d-flex justify-content-center"
          >
            <Button
              onClick={() => handleSelectAnswer(answers[sequence[index] - 1])}
              className={`${
                answers[sequence[index] - 1] === selectedAnswer
                  ? "selected"
                  : answers[sequence[index] - 1] === correctAnswer
                  ? "correct"
                  : ""
              }`}
              disabled={selectedAnswer !== "" && true}
            >
              {answers[sequence[index] - 1]}
            </Button>
          </div>
        ))}
      </div>

      <div className="text-center mb-20">
        <h3>
          {selectedAnswer !== "" &&
            (selectedAnswer === correctAnswer ? "Correct!" : "Sorry!")}
        </h3>
      </div>

      {selectedAnswer !== "" && totalCount !== currentPage && (
        <div className="d-flex justify-content-center">
          <NextButton onClick={() => handleNext()}>Next Question</NextButton>
        </div>
      )}
    </div>
  );
};

export default AnswerGroup;
