// Timer.jsx
import React, { useState, useEffect } from 'react';

const Timer = ({ timer, setTimer ,isRunning,setIsRunning}) => {

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, setTimer]);

  useEffect(() => {
    if (timer === 0) {
      setIsRunning(false);
    }
  }, [timer]);

 



  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>{formatTime(timer)}</h2>
    </div>
  );
};

export default Timer;