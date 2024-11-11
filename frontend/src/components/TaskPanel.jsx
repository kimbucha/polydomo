import React, { useState } from 'react';

export const TaskPanel = ({ 
  currentTask, 
  taskInput,
  setTaskInput,
  handleStartTimer,
  subTasks, 
  onAddSubTask,
  onPrioritizeSubTask,
  isVisible,
  isBreak,
  isCompleted 
}) => {
  const [newSubTask, setNewSubTask] = useState('');
  const [category, setCategory] = useState('related');

  const handleAddSubTask = (e) => {
    e.preventDefault();
    if (!newSubTask.trim()) return;

    const task = {
      text: newSubTask.trim(),
      category,
      capturedAt: Date.now(),
      parentTask: currentTask
    };
    
    onAddSubTask(task);
    setNewSubTask('');
  };

  const CategoryTag = ({ type }) => (
    <span className={`category-tag ${type}`}>
      <span className="icon">
        {type === 'related' ? '🔄' : '📌'}
      </span>
      <span className="text">
        {type === 'related' ? 'Related' : 'Follow Up'}
      </span>
    </span>
  );

  return (
    <div className={`task-panel ${isVisible ? 'visible' : ''}`}>
      {/* Current Task Context */}
      <div className="current-context">
        <div className="current-focus">
          <span className="context-label">Current Task:</span>
          {!currentTask ? (
            <div className="task-input-container">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="What are you focusing on?"
                className="task-input"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && taskInput.trim()) {
                    handleStartTimer();
                  }
                }}
              />
            </div>
          ) : (
            <h3>{currentTask}</h3>
          )}
        </div>
        {isCompleted && (
          <div className={`session-complete-message ${isBreak ? 'break' : ''}`}>
            {isBreak ? 
              "Break time! Add any tasks you thought of during focus." :
              "Great job! Take a break or add related tasks."
            }
          </div>
        )}
      </div>

      {/* Category Selection and Input */}
      <form className="task-form" onSubmit={handleAddSubTask}>
        <div className="category-selector">
          <button
            type="button"
            className={`category-btn ${category === 'related' ? 'active' : ''}`}
            onClick={() => setCategory('related')}
          >
            <span className="icon">🔄</span>
            <span>Related</span>
          </button>
          <button
            type="button"
            className={`category-btn ${category === 'followUp' ? 'active' : ''}`}
            onClick={() => setCategory('followUp')}
          >
            <span className="icon">📌</span>
            <span>Follow Up</span>
          </button>
        </div>

        <div className="input-group">
          <input
            type="text"
            value={newSubTask}
            onChange={(e) => setNewSubTask(e.target.value)}
            placeholder={
              category === 'related' 
                ? "Add a task related to your current focus..."
                : "Add a task to do after this session..."
            }
            className="task-input"
          />
          <button 
            type="submit"
            className="add-task-btn"
            disabled={!newSubTask.trim()}
          >
            Add Task
          </button>
        </div>
      </form>

      {/* Subtasks List */}
      <div className="tasks-list">
        <h4>Captured Tasks {subTasks.length > 0 && `(${subTasks.length})`}</h4>
        {subTasks.length > 0 ? (
          <div className="tasks-grid">
            {subTasks.map((task, index) => (
              <div 
                key={index} 
                className={`task-card ${task.category}`}
              >
                <div className="task-header">
                  <CategoryTag type={task.category} />
                  <span className="capture-time">
                    {formatTimeAgo(task.capturedAt)}
                  </span>
                </div>
                <p className="task-text">{task.text}</p>
                {isCompleted && !isBreak && (
                  <button
                    className="focus-next-btn"
                    onClick={() => onPrioritizeSubTask(index)}
                  >
                    Focus on This Next
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-tasks">
            <p>No tasks captured yet</p>
            <div className="category-examples">
              <span>🔄 Related: Tasks connected to current focus</span>
              <span>📌 Follow Up: Tasks for after this session</span>
            </div>
            <span className="tip">
              💡 Add tasks you want to focus on later
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const formatTimeAgo = (timestamp) => {
  const minutes = Math.floor((Date.now() - timestamp) / 60000);
  if (minutes < 1) return 'Just now';
  return `${minutes}m ago`;
};

export default TaskPanel; 