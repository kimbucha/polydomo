// Updated Task Section Component
const TaskSection = ({ currentTask, taskInput, setTaskInput, handleStartTimer, isBreak }) => {
  return (
    <div className="current-task-section">
      <span className="section-label">Current Task</span>
      {!currentTask ? (
        <div className="task-input-wrapper">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter your task..."
            className="task-input"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && taskInput.trim()) {
                handleStartTimer();
              }
            }}
          />
        </div>
      ) : (
        <div className="current-task">{currentTask}</div>
      )}
    </div>
  );
}; 