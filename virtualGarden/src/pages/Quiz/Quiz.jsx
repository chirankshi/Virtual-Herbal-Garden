import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import './Quiz.css';
import Footer from '../../components/Footer/Footer'
import confetti from 'canvas-confetti';



// Level Selection
const LevelSelection = ({ onLevelSelect }) => (
  <div className="container">
    <div className="quiz-box level-selection-box">
      <h2 className="question-number">Select Quiz Difficulty</h2>
      <p className="quiz-description">Challenge yourself with different levels.</p>
      <div className="options-container level-options">
        {['Easy', 'Medium', 'Hard', 'Extreme'].map(level => (
          <button
            key={level}
            onClick={() => onLevelSelect(level.toLowerCase())}
            className={`option-button level-${level.toLowerCase()}`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  </div>
);

// Quiz Info Page
const QuizInfo = ({ level, totalQuestions, onStartQuiz }) => {
  const [seconds, setSeconds] = useState(5);
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timer);
          onStartQuiz();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onStartQuiz]);

  return (
    <div className="container">
      <div className="quiz-box quiz-info-box">
        <h2 className="question-number">Ready to Begin?</h2>
        <p className="quiz-details">Level: <span className={`level-tag ${level}`}>{level}</span></p>
        <p className="quiz-details">Questions: {totalQuestions}</p>
        <p className="quiz-details">Starting in: <span className="timer">0:{seconds < 10 ? `0${seconds}` : seconds}</span></p>
        <button onClick={onStartQuiz} className="submit-button start-quiz-button">Start Now</button>
      </div>
    </div>
  );
};

// Time Up
const TimeUpPage = ({ attemptedQuestions, onSubmitResult }) => (
  <div className="container">
    <div className="quiz-box time-up-box">
      <h2 className="question-number">Time's Up!</h2>
      <p className="quiz-details">You attempted {attemptedQuestions} questions.</p>
      <button onClick={onSubmitResult} className="submit-button finish-quiz-button">Submit Results</button>
    </div>
  </div>
);

// Results Page
const ResultPage = ({ score, total, onRestart }) => {
  const percentage = ((score / total) * 100).toFixed(2);
  const feedback =
    percentage >= 90 ? "Fantastic!" :
    percentage >= 70 ? "Excellent!" :
    percentage >= 50 ? "Good job!" : "Better luck next time!";

  useEffect(() => {
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
  }, []);

  return (
    <div className="container">
      <div className="result-box final-result-box">
        <h2 className="result-heading">Quiz Results</h2>
        <p className="result-feedback">{feedback}</p>
        <p className="result-details">Score: <span className="final-score">{score}</span> / {total}</p>
        <p className="result-details">Percentage: <span className="final-percentage">{percentage}%</span></p>
        <button onClick={onRestart} className="restart-button play-again-button">Play Again</button>
      </div>
    </div>
  );
};

// Quiz Execution Page
const QuizPage = ({ quizData, onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const questionTimeout = useRef(null);
  const overallTimer = useRef(null);

  const handleSubmitQuiz = useCallback(async () => {
    clearInterval(overallTimer.current);
    clearTimeout(questionTimeout.current);

    try {
      await axios.post('http://localhost:8802/save', {
        userId: localStorage.getItem('userId') || 'guest',
        userName: localStorage.getItem('userName') || 'guest',
        score,
        totalQuestions: quizData.length,
        correctAnswers: score,
        date: new Date().toISOString(),
      });
      onFinish(score);
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Could not submit results');
    }
  }, [score, quizData, onFinish]);

  useEffect(() => {
    overallTimer.current = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(overallTimer.current);
        setIsTimeUp(true);
      } else {
        if (seconds > 0) setSeconds(seconds - 1);
        else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(overallTimer.current);
  }, [minutes, seconds]);

  useEffect(() => {
    questionTimeout.current = setTimeout(() => {
      if (!showAnswer) {
        setShowAnswer(true);
        setSelectedOption('');
        setTimeout(handleNextQuestion, 1500);
      }
    }, 15000);
    return () => clearTimeout(questionTimeout.current);
  }, [currentQuestion, showAnswer]);

  const handleOptionClick = (option) => {
    if (showAnswer) return;
    setSelectedOption(option);
    setShowAnswer(true);
    clearTimeout(questionTimeout.current);
    if (option === quizData[currentQuestion].answer) {
      setScore(prev => prev + 1);
      confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption('');
      setShowAnswer(false);
    } else {
      handleSubmitQuiz();
    }
  };

  if (isTimeUp) {
    return <TimeUpPage attemptedQuestions={currentQuestion + 1} onSubmitResult={handleSubmitQuiz} />;
  }

  return (
    <div className="container">
      <div className="quiz-box quiz-page-box">
        <div className="quiz-header">
          <h2>Question {currentQuestion + 1} / {quizData.length}</h2>
          <p>Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
        </div>
        <h3>{quizData[currentQuestion].question}</h3>
        <div className="options-container">
          {quizData[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              className={`option-button ${
                showAnswer
                  ? option === quizData[currentQuestion].answer
                    ? 'correct'
                    : option === selectedOption
                    ? 'wrong'
                    : ''
                  : ''
              }`}
              disabled={showAnswer}
            >
              {option}
            </button>
          ))}
        </div>
        {showAnswer && (
          <div className="quiz-controls">
            <button
              onClick={currentQuestion === quizData.length - 1 ? handleSubmitQuiz : handleNextQuestion}
              className="submit-button"
            >
              {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
const Quiz = () => {
  const [quizLevel, setQuizLevel] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchQuizData = useCallback(async (level) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8802/alldata/quiz?level=${level}`);
      setQuizData(response.data.data || []);
    } catch (error) {
      console.error(error);
      alert('Failed to load quiz data.');
    }
    setLoading(false);
  }, []);

  const handleLevelSelect = (level) => {
    setQuizLevel(level);
    fetchQuizData(level);
  };

  const handleRestartQuiz = () => {
    setQuizLevel(null);
    setScore(null);
    setStartQuiz(false);
    setQuizData([]);
  };

  return (
    <>
      <div className="quiz-hero-section">
        <h1 className="quiz-hero-text">Test Your Knowledge</h1>
      </div>
      {!quizLevel ? (
        <LevelSelection onLevelSelect={handleLevelSelect} />
      ) : loading ? (
        <h2 className="loading-text">Loading quiz...</h2>
      ) : score === null ? (
        startQuiz ? (
          <QuizPage quizData={quizData} onFinish={setScore} />
        ) : (
          <QuizInfo
  level={quizLevel}
  totalQuestions={quizData.length}
  onStartQuiz={() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      window.location.href = '/login'; // Redirect to login page if not authenticated
    } else {
      setStartQuiz(true); // Start the quiz only if user is authenticated
    }
  }}
/>
        )
      ) : (
        <ResultPage score={score} total={quizData.length} onRestart={handleRestartQuiz} />
      )}



      <div className="footcont">
        <Footer/>
      </div>

    </>
  );
};

export default Quiz;
