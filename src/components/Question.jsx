import React from "react";

const Question = ({
  question,
  choices,
  selectedAnswerIndex,
  onAnswerSelected,
  onClickNext,
  activeQuestion,
  totalQuestions,
  timeLeft,
  quizStarted,
}) => {
  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <div>
      <div className="timer">
        {quizStarted ? `Time Left: ${timeLeft}s` : "Click an answer to start the quiz"}
      </div>
      <div>
        <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
        <span className="total-question">/{addLeadingZero(totalQuestions)}</span>
      </div>
      <h2>{question}</h2>
      <ul>
        {choices.map((answer, index) => (
          <li
            onClick={() => onAnswerSelected(answer, index)}
            key={answer}
            className={selectedAnswerIndex === index ? "selected-answer" : null}
          >
            {answer}
          </li>
        ))}
      </ul>
      <div className="flex-right">
        <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
          {activeQuestion === totalQuestions - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Question;
