// components/StatsDisplay.jsx
import React from 'react';
import { LineChart, BarChart } from './charts';

export const StatsDisplay = ({ stats, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="stats-display">
      <div className="stats-summary">
        <div className="stat-card today">
          <h3>Today</h3>
          <div className="stat-grid">
            <StatItem 
              value={stats.today.pomodoros} 
              label="Focus Sessions"
              icon="🎯"
            />
            <StatItem 
              value={`${stats.today.totalFocusMinutes}m`} 
              label="Total Focus Time"
              icon="⏱️"
            />
            <StatItem 
              value={stats.streaks.current} 
              label="Day Streak"
              icon="🔥"
            />
          </div>
        </div>
        
        <div className="stat-card progress">
          <h3>Daily Goal</h3>
          <div className="goal-progress">
            <div className="progress-ring">
              <svg width="120" height="120">
                <circle
                  className="progress-ring__circle progress-ring__circle--bg"
                  cx="60"
                  cy="60"
                  r="52"
                />
                <circle
                  className="progress-ring__circle progress-ring__circle--fg"
                  cx="60"
                  cy="60"
                  r="52"
                  style={{
                    strokeDashoffset: calculateProgress(
                      stats.today.pomodoros,
                      stats.dailyGoal
                    )
                  }}
                />
              </svg>
              <div className="progress-center">
                <span className="progress-number">
                  {stats.today.pomodoros}/{stats.dailyGoal}
                </span>
                <span className="progress-label">sessions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-charts">
        <div className="chart-container">
          <h3>Weekly Progress</h3>
          <BarChart 
            data={stats.weeklyData}
            height={200}
            valueKey="pomodoros"
            color="var(--focus-accent)"
          />
        </div>
        
        <div className="chart-container">
          <h3>Focus Time Trend</h3>
          <LineChart 
            data={stats.monthlyData}
            height={200}
            valueKey="totalFocusMinutes"
            color="var(--break-accent)"
          />
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ value, label, icon }) => (
  <div className="stat-item">
    <span className="stat-icon">{icon}</span>
    <span className="stat-value">{value}</span>
    <span className="stat-label">{label}</span>
  </div>
);

function calculateProgress(current, total) {
  const circumference = 2 * Math.PI * 52;
  const progress = 1 - (current / total);
  return circumference * progress;
}