import React from 'react';
import classNames from 'classnames';

export const TaskPanel = ({ 
  taskInput,
  setTaskInput,
  handleStartTimer,
  isVisible,
  isBreak,
  handleKeyPress
}) => {
  const panelClasses = classNames('task-input-container', {
    'visible': isVisible,
    'break': isBreak
  });

  return isVisible ? (
    <div className={panelClasses}>
      <label htmlFor="taskInput" className="task-label">
        What are you focusing on?
      </label>
      <input
        id="taskInput"
        type="text"
        className="task-input"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter your focus task..."
        autoFocus
      />
      <button 
        className="primary-button"
        onClick={handleStartTimer}
        disabled={!taskInput.trim()}
      >
        Start Focus Session
      </button>
    </div>
  ) : null;
};

export default TaskPanel;