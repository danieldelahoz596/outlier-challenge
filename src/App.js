import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from "./components/ProgressBar";
import QuestionInfo from "./components/QuestionInfo";
import AnswerGroup from "./components/AnswerGroup";
import ScoreBar from "./components/ScoreBar";

function App() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentPage, setCurrentpage] = useState(1);

  const fetchQuestions = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3001/questions");
      const data = await response.json();

      if (Array.isArray(data)) {
        setQuestions(data);
        setTotalCount(data.length);
      } else {
        setError("Wrong Questions Type");
      }
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const currentQuestionData = useMemo(
    () => questions[currentPage - 1],
    [questions, currentPage]
  );

  const correctAnswer = useMemo(
    () =>
      currentQuestionData
        ? decodeURIComponent(currentQuestionData.correct_answer)
        : null,
    [currentQuestionData]
  );

  const answers = useMemo(
    () =>
      currentQuestionData
        ? [
            decodeURIComponent(currentQuestionData.correct_answer),
            ...currentQuestionData.incorrect_answers.map((answer) =>
              decodeURIComponent(answer)
            ),
          ]
        : [],
    [currentQuestionData]
  );

  const handleNext = () => {
    setCurrentpage((prev) => prev + 1);
  };

  const handleSelectAnswer = (value) => {
    setAnsweredCount((prev) => prev + 1);
    if (value === correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return <h2 className="container">Questions are loading....</h2>;
  }

  if (error) {
    return <h2 className="container">Loading Failed</h2>;
  }

  return (
    <div>
      <div className="mb-20">
        <ProgressBar totalCount={totalCount} currentPage={currentPage} />
      </div>

      <div className="container">
        <div id="body" className="d-flex flex-column gap-50 mb-100">
          <QuestionInfo
            currentPage={currentPage}
            totalCount={totalCount}
            questionInfo={{
              difficulty: currentQuestionData.difficulty,
              category: decodeURIComponent(currentQuestionData.category),
            }}
          />
          <h3>{decodeURIComponent(currentQuestionData.question)}</h3>
          <AnswerGroup
            questionData={{
              answers,
              totalCount,
              currentPage,
              correctAnswer,
            }}
            onSelectAnswer={handleSelectAnswer}
            onNext={handleNext}
          />
        </div>

        <ScoreBar
          totalCount={totalCount}
          answeredCount={answeredCount}
          correctCount={correctCount}
        />
      </div>
    </div>
  );
}

export default App;
