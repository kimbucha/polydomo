import React from 'react';

export const Timer = ({ 
  timeLeft, 
  isBreak, 
  isRunning,
  isCompleted,
  stats = {
    focusMinutes: 0,
    completedPomodoros: 0,
    currentStreak: 0
  }
}) => {
  const formatTime = (seconds) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
      return '25:00';
    }
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  const getStateText = () => {
    if (isCompleted) {
      return isBreak ? 'Break Complete!' : 'Session Complete!';
    }
    if (isBreak) {
      return isRunning ? 'Break Time' : 'Take a Break';
    }
    return isRunning ? 'Focusing' : 'Ready to Focus';
  };

  return (
    <div className={`timer-container ${isBreak ? 'break' : 'focus'} ${
      isCompleted ? 'completed' : !isRunning ? 'paused' : ''
    }`}>
      <div className="timer-display">{formatTime(timeLeft)}</div>
      <div className="timer-type">{getStateText()}</div>
      
      {/* Stats Panel - Shown after completion or during break */}
      {(isCompleted || isBreak) && (
        <div className="stats-panel">
          <div className="stats-row">
            <div className="stats-item">
              <span className="stats-label">Focus Time</span>
              <span className="stats-value">{stats.focusMinutes}m</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">Completed</span>
              <span className="stats-value">{stats.completedPomodoros}</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">Streak</span>
              <span className="stats-value">{stats.currentStreak}🔥</span>
            </div>
          </div>
          
          {isBreak && (
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${(stats.completedPomodoros / 8) * 100}%`
                  }} 
                />
              </div>
              <div className="progress-label">
                Daily Goal: {stats.completedPomodoros}/8
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Timer;