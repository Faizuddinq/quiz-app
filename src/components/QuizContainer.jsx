import React, { useEffect } from "react";
import { quizData } from "../data/quizdata";
import Question from "./Question";
import Result from "./Result";

const QuizContainer = () => {
  const initialQuizState = {
    activeQuestion: 0,
    selectedAnswer: "",
    showResult: false,
    selectedAnswerIndex: null,
    result: {
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    },
    timeLeft: 15,
    quizStarted: false,
  };

  const [quizState, setQuizState] = React.useState(initialQuizState);

  const { activeQuestion, selectedAnswer, showResult, selectedAnswerIndex, result, timeLeft, quizStarted } = quizState;
  const { questions } = quizData;
  const { question, choices, correctAnswer } = questions[activeQuestion];

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
      quizStarted: true,
      timeLeft: 15,
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

  return (
    <div className="quiz-container">
      {!showResult ? (
        <Question
          question={question}
          choices={choices}
          selectedAnswerIndex={selectedAnswerIndex}
          onAnswerSelected={onAnswerSelected}
          onClickNext={onClickNext}
          activeQuestion={activeQuestion}
          totalQuestions={questions.length}
          timeLeft={timeLeft}
          quizStarted={quizStarted}
        />
      ) : (
        <Result
          result={result}
          totalQuestions={questions.length}
          resetQuiz={resetQuiz}
        />
      )}
    </div>
  );
};

export default QuizContainer;
