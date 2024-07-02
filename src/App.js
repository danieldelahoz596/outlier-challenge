import React, { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  console.log("questions: ", questions);
  const [error, setError] = useState(null);

  const fetchQuestions = useCallback(async () => {
    try {
      // Fetch questions from the API
      const response = await fetch("http://localhost:3001/questions");
      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
