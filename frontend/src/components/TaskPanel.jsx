import React, { useEffect, useRef } from 'react';

export const TaskPanel = ({ 
  taskInput,
  setTaskInput,
  handleStartTimer,
  isVisible,
  isBreak,
  handleKeyPress
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim()) {
      handleStartTimer();
    }
  };

  return isVisible ? (
    <div className={`task-panel ${isBreak ? 'break' : 'focus'}`}>
      <h2 className="task-panel-title">
        {isBreak ? 'Break Time!' : 'What are you focusing on?'}
      </h2>
      
      <form onSubmit={handleSubmit} className="task-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="task-input"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isBreak ? 'Take a breather...' : 'Enter your focus task...'}
          aria-label="Task input"
        />
        
        <button 
          type="submit"
          className={`start-button ${isBreak ? 'break' : 'focus'} ${!taskInput.trim() ? 'disabled' : ''}`}
          disabled={!taskInput.trim()}
        >
          {isBreak ? 'Start Break' : 'Start Focus Session'}
        </button>
      </form>
    </div>
  ) : null;
};