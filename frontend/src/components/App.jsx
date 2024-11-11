import React, { useState, useEffect } from 'react';
import { Timer } from './Timer';
import { TaskPanel } from './TaskPanel';
import { SettingsModal } from './SettingsModal';

export const App = () => {
  const [timerState, setTimerState] = useState({
    timeLeft: 1500,
    isRunning: false,
    isBreak: false,
    isCompleted: false,
    stats: {
      focusMinutes: 0,
      completedPomodoros: 0,
      currentStreak: 0
    }
  });
  
  const [taskInput, setTaskInput] = useState('');
  const [currentTask, setCurrentTask] = useState('');
  const [subTasks, setSubTasks] = useState([]);
  const [isPinned, setIsPinned] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    focusDuration: 25,
    breakDuration: 5,
    dailyGoal: 8
  });

  // Load initial state
  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getState" }, (response) => {
      if (response) {
        setTimerState({
          timeLeft: response.timeLeft,
          isRunning: response.isRunning,
          isBreak: response.isBreak,
          isCompleted: response.isCompleted,
          stats: response.stats || {
            focusMinutes: 0,
            completedPomodoros: 0,
            currentStreak: 0
          }
        });
        setCurrentTask(response.currentTask || '');
        setSubTasks(response.subTasks || []);
        setSettings(response.settings || {
          focusDuration: 25,
          breakDuration: 5,
          dailyGoal: 8
        });
      }
    });

    // Listen for state updates
    const handleUpdate = (message) => {
      if (message.type === 'STATE_UPDATE') {
        setTimerState(prev => ({
          ...prev,
          ...message.state
        }));
      } else if (message.type === 'SESSION_COMPLETE') {
        setTimerState(prev => ({
          ...prev,
          isCompleted: true,
          isRunning: false,
          stats: message.stats
        }));
      }
    };

    chrome.runtime.onMessage.addListener(handleUpdate);
    return () => chrome.runtime.onMessage.removeListener(handleUpdate);
  }, []);

  // Listen for state updates
  useEffect(() => {
    const handleStateUpdate = (request) => {
      if (request.action === "stateUpdate") {
        setTimerState({
          timeLeft: request.state.timeLeft,
          isRunning: request.state.isRunning,
          isBreak: request.state.isBreak,
          isCompleted: request.state.isCompleted,
          stats: request.state.stats
        });
        setSettings(request.state.settings);
      }
    };

    chrome.runtime.onMessage.addListener(handleStateUpdate);
    return () => chrome.runtime.onMessage.removeListener(handleStateUpdate);
  }, []);

  const handlePin = () => {
    setIsPinned(!isPinned);
    chrome.action.setPopup({ popup: isPinned ? 'popup.html' : '' });
  };

  const handleStartTimer = () => {
    if (!taskInput.trim() && !currentTask) return;
  
    const task = taskInput.trim() || currentTask;
    chrome.runtime.sendMessage({ 
      action: "startTimer",
      task: task,
      focusDuration: settings.focusDuration
    });
    
    setCurrentTask(task);
    setTaskInput('');
    setTimerState(prev => ({
      ...prev,
      timeLeft: settings.focusDuration * 60, // Sync with focus duration in minutes
      isCompleted: false,
      isRunning: true
    }));
  };

  const handleStartBreak = () => {
    chrome.runtime.sendMessage({ 
      action: "startBreak",
      breakDuration: settings.breakDuration
    });
    setTimerState(prev => ({
      ...prev,
      timeLeft: settings.breakDuration * 60,
      isCompleted: false,
      isBreak: true,
      isRunning: true
    }));
  };

  const handleReset = () => {
    chrome.runtime.sendMessage({ action: "resetTimer" });
    setTaskInput('');
    setCurrentTask('');
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      isCompleted: false
    }));
  };

  const handleAddSubTask = (task) => {
    chrome.runtime.sendMessage({ 
      action: "addSubTask", 
      task 
    });
    setSubTasks([...subTasks, task]);
  };

  const handleSwitchToSubTask = (task) => {
    setCurrentTask(task);
    setSubTasks(subTasks.filter(t => t !== task));
    chrome.runtime.sendMessage({ 
      action: "switchTask",
      task,
      previousTask: currentTask
    });
  };

  // Add the click handler
  const handleOutsideClick = (e) => {
    if (showSettings && e.target.className === 'settings-modal') {
      setShowSettings(false);
    }
  };

  // Update settings handler
  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  const handleSettingsSave = (newSettings) => {
    setSettings(newSettings);
    chrome.runtime.sendMessage({
      action: "updateSettings",
      settings: newSettings
    });
    setShowSettings(false);
  };

  return (
    <>
      <div className="app-container">
        <header className="header">
          <h1 className="app-title">Polydomo</h1>
          <div className="header-controls">
            <button 
              className={`icon-btn ${isPinned ? 'active' : ''}`}
              onClick={handlePin}
              title={isPinned ? "Unpin Window" : "Pin Window"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L12 22M2 12L22 12" />
              </svg>
            </button>
            <button 
              className="icon-btn"
              onClick={handleSettingsClick}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>
        </header>

        <Timer
          timeLeft={timerState.timeLeft}
          isRunning={timerState.isRunning}
          isBreak={timerState.isBreak}
          isCompleted={timerState.isCompleted}
          stats={timerState.stats}
        >
          <div className="current-context">
            <span className="context-label">Current Task:</span>
            {!currentTask ? (
              <div className="task-input-wrapper">
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
              <div className="current-task">
                <h3>{currentTask}</h3>
              </div>
            )}
          </div>
        </Timer>

        <TaskPanel
          onAddSubTask={handleAddSubTask}
          subTasks={subTasks}
          currentTask={currentTask}
          taskInput={taskInput}
          setTaskInput={setTaskInput}
          handleStartTimer={handleStartTimer}
          isVisible={timerState.isCompleted || timerState.isBreak}
          isBreak={timerState.isBreak}
          isCompleted={timerState.isCompleted}
        />

        <div className="button-container">
          {timerState.isCompleted ? (
            <div className="completion-buttons">
              <button 
                className="primary-button"
                onClick={timerState.isBreak ? handleStartTimer : handleStartBreak}
              >
                {timerState.isBreak ? 'Start New Focus' : 'Take a Break'}
              </button>
              {subTasks.length > 0 && (
                <button 
                  className="secondary-button"
                  onClick={() => handleSwitchToSubTask(subTasks[0])}
                >
                  Switch to Subtask
                </button>
              )}
            </div>
          ) : (
            <button 
              className={timerState.isRunning ? "secondary-button" : "primary-button"}
              onClick={timerState.isRunning ? handleReset : handleStartTimer}
              disabled={!timerState.isRunning && !taskInput.trim() && !currentTask}
            >
              {timerState.isRunning ? 'Reset' : timerState.isBreak ? 'Start Break' : 'Start Focus'}
            </button>
          )}
        </div>
      </div>
      {showSettings && (
        <SettingsModal
          settings={settings}
          onSave={handleSettingsSave}
          onClose={handleSettingsClose}
        />
      )}
    </>
  );
};

export default App;