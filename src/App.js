import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from "./components/ProgressBar";
import QuestionInfo from "./components/QuestionInfo";
import AnswerGroup from "./components/AnswerGroup";

function App() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

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
    () => questions[answeredCount],
    [questions, answeredCount]
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
    setAnsweredCount((prev) => prev + 1);
  };

  if (isLoading) {
    return <h2 className="container">Questions are loading....</h2>;
  }

  if (error) {
    return <h2 className="container">Loading Failed</h2>;
  }

  return (
    <div>
      <ProgressBar totalCount={totalCount} answeredCount={answeredCount} />

      <div id="body" className="container d-flex flex-column gap-50">
        <QuestionInfo
          answeredCount={answeredCount}
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
            answeredCount,
            correctAnswer: decodeURIComponent(
              currentQuestionData.correct_answer
            ),
          }}
          onNext={() => handleNext()}
          setCorrectCount={setCorrectCount}
        />
      </div>
    </div>
  );
}

export default App;
