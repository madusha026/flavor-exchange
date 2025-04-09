import React, { useState, useEffect } from 'react';
import './Timer.css';  // Import Timer CSS
import { Button } from '@mui/material';  // Import Material UI Button

const Timer = ({ cookingTime }) => {
  // Convert cookingTime to a number by extracting the digits from the string
  const minutes = parseInt(cookingTime, 10); // Parse the numeric part from "30 mins"
  const [timeLeft, setTimeLeft] = useState(minutes * 60); // Set initial time (in seconds)
  const [isRunning, setIsRunning] = useState(false);

  // Effect hook for timer functionality
  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);  // Clear the interval when time runs out
      alert('Cooking time is up!');
    }

    return () => clearInterval(interval);  // Cleanup interval on unmount or state change
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    if (timeLeft > 0) {
      setIsRunning(true);  // Start the timer if timeLeft is greater than 0
    }
  };

  const resetTimer = () => {
    setTimeLeft(minutes * 60);  // Reset the time to the original cookingTime (in seconds)
    setIsRunning(false); // Stop the timer
  };

  // Helper function to format the time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="timer-container">
      <h4>Cooking Timer</h4>
      <p>{formatTime(timeLeft)}</p>
      <Button 
        sx={{
          padding: '8px 16px',
          backgroundColor: '#3182ce',
          color: 'white',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#2b6cb0',
          },
          marginRight: '8px',
        }} 
        onClick={startTimer} 
        disabled={isRunning || timeLeft === 0}  // Disable if running or time is up
      >
        Start Timer
      </Button>
      <Button 
        sx={{
          padding: '8px 16px',
          backgroundColor: '#e53e3e',
          color: 'white',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#c53030',
          },
        }} 
        onClick={resetTimer}
      >
        Reset Timer
      </Button>
    </div>
  );
};

export default Timer;
