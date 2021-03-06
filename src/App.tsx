import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
import QuestionCard from './components/QuestionCard';
import { Difficulty, QuestionState } from './API';
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const TOTAL_QUESTIONS = 10;

  const [loading, setloading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setloading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setloading(false);
  };

  // error handling

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // user clicks the answer
      const answer = e.currentTarget.value;
      // check the userAnswer and the answer on API
      const correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // save answer in the local state of array for userAnswer
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // check if it's not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>TRIVIA QUIZ</h1>

        {/* Start button  is only displayed if the game is over ||or if the user has answered the last question*/}
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
            START
          </button>
        ) : null}

        {/* Show score only when tha game is not over */}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}

        {/* Show loading if the questions are still loading */}
        {/* {loading ? <p>Loading Questions...</p> : null} */}
        {loading && <p>Loading Questions...</p>}

        {/* Question card will only be shown IF we're not loading or we're not gameOver */}
        {!loading && !gameOver && (
          <QuestionCard
            questionNum={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {/* Shown when NOT gameOver && NOT Loading  */}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
