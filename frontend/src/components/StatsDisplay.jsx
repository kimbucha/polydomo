import React from 'react';

export const StatsDisplay = ({ stats, currentTask, onStartBreak, onNewSession }) => {
  // Ensure safe defaults for all stats
  const safeStats = {
    today: {
      pomodoros: 0,
      totalFocusMinutes: 0,
      ...stats?.today
    },
    streaks: {
      current: 0,
      ...stats?.streaks
    },
    dailyGoal: stats?.dailyGoal ?? 8
  };

  return (
    <div className="stats-display-container">
      <div className="stats-header">
        <div className="completion-icon">✨</div>
        <h2 className="stats-title">Session Complete!</h2>
        {currentTask && (
          <div className="completed-task-display">
            <span className="task-label">Task Completed:</span>
            <span className="task-name">{currentTask}</span>
          </div>
        )}
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{safeStats.today.pomodoros}</div>
          <div className="stat-label">Today's Sessions</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-value">{safeStats.streaks.current}</div>
          <div className="stat-label">Day Streak</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-value">{safeStats.today.totalFocusMinutes}m</div>
          <div className="stat-label">Total Focus Time</div>
        </div>
      </div>

      <div className="daily-progress">
        <h3 className="progress-title">Daily Goal Progress</h3>
        <div className="progress-ring-container">
          <svg viewBox="0 0 100 100">
            <circle
              className="progress-ring-bg"
              cx="50"
              cy="50"
              r="45"
            />
            <circle
              className="progress-ring-progress"
              cx="50"
              cy="50"
              r="45"
              strokeDashoffset={
                283 * (1 - (safeStats.today.pomodoros / safeStats.dailyGoal))
              }
            />
          </svg>
          <div className="progress-text">
            <span className="current">{safeStats.today.pomodoros}</span>
            <span className="separator">/</span>
            <span className="goal">{safeStats.dailyGoal}</span>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="action-button break-button"
          onClick={onStartBreak}
        >
          Take a Break (5:00)
        </button>
        <button 
          className="action-button new-session-button"
          onClick={onNewSession}
        >
          Start New Session
        </button>
      </div>
    </div>
  );
};