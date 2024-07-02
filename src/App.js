import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from "./components/ProgressBar";
import QuestionInfo from "./components/QuestionInfo";

function App() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [answersCount, setAnswersCount] = useState(0);

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

  if (isLoading) {
    return <h2 className="container">Questions are loading....</h2>;
  }

  if (error) {
    return <h2 className="container">Loading Failed</h2>;
  }

  return (
    <div>
      <ProgressBar totalCount={totalCount} answersCount={answersCount} />
      <div id="body" className="container d-flex flex-column gap-50">
        <QuestionInfo
          answersCount={answersCount}
          totalCount={totalCount}
          questionInfo={{
            difficulty: questions[answersCount].difficulty,
            category: decodeURIComponent(questions[answersCount].category),
          }}
        />

        <h3>{decodeURIComponent(questions[answersCount].question)}</h3>
      </div>
    </div>
  );
}

export default App;
