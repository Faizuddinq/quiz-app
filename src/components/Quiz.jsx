import React, { useEffect } from "react";
import { quizData } from "../data/quizdata";
import { Link } from "react-router-dom";

const Quiz = () => {
  const initialQuizState = {
    activeQuestion: 0,
    selectedAnswer: "", // Track the selected answer
    showResult: false,
    selectedAnswerIndex: null,
    result: {
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    },
    timeLeft: 10,
    quizStarted: false,
  };

  const [quizState, setQuizState] = React.useState(initialQuizState);

  const { activeQuestion, selectedAnswer, showResult, selectedAnswerIndex, result, timeLeft, quizStarted } = quizState;

  const { questions } = quizData;
  const { question, choices, correctAnswer } = questions[activeQuestion];

  // Timer functionality
  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !showResult) {
      timer = setTimeout(() => {
        setQuizState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeout();
    }

    return () => clearTimeout(timer);
  }, [timeLeft, showResult, quizStarted]);

  const handleTimeout = () => {
    setSelectedAnswer(false); 
    onClickNext();
  };

  const onClickNext = () => {
    const isCorrect = selectedAnswer === correctAnswer; 

    setQuizState((prev) => ({
      ...prev,
      result: {
        ...prev.result,
        score: isCorrect ? prev.result.score + 5 : prev.result.score,
        correctAnswers: isCorrect ? prev.result.correctAnswers + 1 : prev.result.correctAnswers,
        wrongAnswers: !isCorrect ? prev.result.wrongAnswers + 1 : prev.result.wrongAnswers,
      },
      selectedAnswerIndex: null,
      showResult: activeQuestion === questions.length - 1,
      activeQuestion: activeQuestion === questions.length - 1 ? 0 : prev.activeQuestion + 1,
      quizStarted: true, // Start the timer only once at the beginning of the quiz
      timeLeft: 10, // Reset timer for the next question
    }));
  };

  const onAnswerSelected = (answer, index) => {
    if (!quizStarted) {
      setQuizState((prev) => ({
        ...prev,
        quizStarted: true,
      }));
    }
    setQuizState((prev) => ({
      ...prev,
      selectedAnswerIndex: index,
      selectedAnswer: answer,
    }));
  };

  const resetQuiz = () => {
    setQuizState(initialQuizState);
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <div className="timer">
            {quizStarted ? `Time Left: ${timeLeft}s` : "Click an answer to start the quiz"}
          </div>
          <div>
            <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
            <span className="total-question">/{addLeadingZero(questions.length)}</span>
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
              {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: <span>{questions.length}</span>
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
      )}
    </div>
  );
};

export default Quiz;
