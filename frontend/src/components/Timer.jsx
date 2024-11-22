import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

export const Timer = ({ 
  timeLeft, 
  isBreak, 
  isRunning,
  onComplete,
  settings,
  currentTask 
}) => {
  const [showBreakPrompt, setShowBreakPrompt] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Handle state transitions
  useEffect(() => {
    if (isRunning || timeLeft === 0) {
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isRunning, timeLeft]);

  // Calculate progress percentage
  const progress = timeLeft / (isBreak ? settings.breakDuration : settings.focusDuration);
  
  const timerClasses = classNames('timer-container', {
    'break': isBreak,
    'focus': !isBreak,
    'running': isRunning,
    'completed': timeLeft === 0,
    'transitioning': isTransitioning
  });

  const formatTime = (seconds) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
      return isBreak ? 
        `${settings?.breakDuration || 5}:00` : 
        `${settings?.focusDuration || 25}:00`;
    }
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  return (
    <div className={timerClasses}>
      <div className="timer-type">
        <span className="timer-label">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </span>
        {currentTask && (
          <span className="current-task-label">{currentTask}</span>
        )}
      </div>

      <div className="timer-display">
        {formatTime(timeLeft)}
      </div>

      <div className="progress-circle">
        <svg viewBox="0 0 100 100">
          <circle 
            className="progress-background"
            cx="50" cy="50" r="45"
          />
          <circle 
            className="progress-indicator"
            cx="50" cy="50" r="45"
            style={{
              strokeDasharray: `${2 * Math.PI * 45}`,
              strokeDashoffset: `${(1 - progress) * 2 * Math.PI * 45}`
            }}
          />
        </svg>
      </div>

      {showBreakPrompt && (
        <div className="completion-prompt">
          <h3>Focus Session Complete!</h3>
          <p>Great work! Time for a break?</p>
          <div className="prompt-actions">
            <button 
              className="primary-button"
              onClick={() => {
                setShowBreakPrompt(false);
                onComplete(true);
              }}
            >
              Start Break
            </button>
            <button 
              className="secondary-button"
              onClick={() => {
                setShowBreakPrompt(false);
                onComplete(false);
              }}
            >
              Skip Break
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;