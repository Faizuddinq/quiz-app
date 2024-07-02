import React from "react";

const Result = ({ result, totalQuestions, resetQuiz }) => (
  <div className="result">
    <h3>Result</h3>
    <p>
      Total Question: <span>{totalQuestions}</span>
    </p>
    <p>
      Total Score:<span> {result.score}</span>
    </p>
    <p>
      Correct Answers:<span> {result.correctAnswers}</span>
    </p>
    <p>
      Wrong Answers:<span> {result.wrongAnswers}</span>
    </p>
    <button onClick={resetQuiz}>Try Again</button>
  </div>
);

export default Result;
