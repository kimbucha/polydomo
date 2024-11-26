import React, { useEffect } from 'react';

const TimerControls = ({ isRunning, onPause, onReset }) => {
  return (
    <div className="timer-controls">
      <button 
        className="timer-control-btn"
        onClick={onPause}
        aria-label={isRunning ? "Pause Timer" : "Resume Timer"}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {isRunning ? (
            <>
              <line x1="10" y1="6" x2="10" y2="18" />
              <line x1="14" y1="6" x2="14" y2="18" />
            </>
          ) : (
            <polygon points="5 3 19 12 5 21 5 3" />
          )}
        </svg>
      </button>

      <button 
        className="timer-control-btn"
        onClick={onReset}
        aria-label="Reset Timer"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
    </div>
  );
};

export const Timer = ({ 
  timeLeft, 
  isBreak, 
  currentTask,
  settings,
  onComplete,
  isRunning,
  onPause,
  onReset
}) => {
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    const totalTime = isBreak ? settings.breakDuration : settings.focusDuration;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      onComplete();
    }
  }, [timeLeft, isRunning, onComplete]);

  return (
    <div className={`timer-display-container ${isBreak ? 'break' : 'focus'}`}>
      <div className="task-header">
        <h2 className="current-task-title">
          {isBreak ? 'Break Time' : currentTask}
        </h2>
        <span className="session-type">
          {isBreak ? 'Time to relax' : 'Focus Session'}
        </span>
      </div>

      <div className="timer-circle">
        <svg viewBox="0 0 200 200" className="timer-svg">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={isBreak ? 'var(--leaf-light)' : 'var(--tomato-light)'}
            strokeWidth="4"
            className="timer-circle-bg"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={isBreak ? 'var(--leaf-green)' : 'var(--tomato-red)'}
            strokeWidth="4"
            strokeLinecap="round"
            className="timer-circle-progress"
            style={{
              strokeDasharray: `${2 * Math.PI * 90}`,
              strokeDashoffset: `${2 * Math.PI * 90 * (1 - calculateProgress() / 100)}`
            }}
          />
          <text
            x="100"
            y="100"
            textAnchor="middle"
            dominantBaseline="middle"
            className="timer-text"
            fill="var(--text-primary)"
          >
            {formatTime(timeLeft)}
          </text>
        </svg>

        <TimerControls 
          isRunning={isRunning}
          onPause={onPause}
          onReset={onReset}
        />
      </div>
    </div>
  );
};