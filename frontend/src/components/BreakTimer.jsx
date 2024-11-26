export const BreakTimer = ({ 
    timeLeft, 
    onComplete, 
    onSkip,
    settings 
  }) => {
    return (
      <div className="break-timer-container">
        <div className="break-timer-header">
          <h2 className="break-title">Break Time</h2>
          <p className="break-subtitle">Time to recharge!</p>
        </div>
  
        <div className="break-timer-circle">
          <svg viewBox="0 0 200 200" className="timer-svg">
            <circle
              cx="100"
              cy="100"
              r="90"
              className="break-timer-bg"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              className="break-timer-progress"
              style={{
                strokeDasharray: `${2 * Math.PI * 90}`,
                strokeDashoffset: `${2 * Math.PI * 90 * (1 - timeLeft / settings.breakDuration)}`
              }}
            />
            <text
              x="100"
              y="90"
              className="break-timer-text"
            >
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </text>
            <text
              x="100"
              y="115"
              className="break-timer-label"
            >
              remaining
            </text>
          </svg>
        </div>
  
        <div className="break-actions">
          <button 
            className="skip-break-button"
            onClick={onSkip}
          >
            Skip Break
          </button>
        </div>
      </div>
    );
  };