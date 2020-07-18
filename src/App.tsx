import React from 'react';
import QuestionCard from './components/QuestionCard';

function App() {
  const startTrivia = async () => {};

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuextion = () => {};

  return (
    <div className='App'>
      <h1>TRIVIA QUIZ</h1>
      <button className='start' onClick={startTrivia}>
        START
      </button>
      <p className='score'>Score:</p>
      <p>Loading Questions...</p>
      <QuestionCard />
      <button className='next' onClick={startTrivia}>
        Next Question
      </button>
    </div>
  );
}

export default App;
