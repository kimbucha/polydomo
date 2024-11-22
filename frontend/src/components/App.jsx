import React, { useState, useEffect } from 'react';
import { Timer } from './Timer';
import { TaskPanel } from './TaskPanel';
import { SettingsModal } from './SettingsModal';

export const App = () => {
  const [settings, setSettings] = useState({
    focusDuration: 25,
    breakDuration: 5,
    notifications: true
  });

  const [timerState, setTimerState] = useState({
    timeLeft: settings.focusDuration,
    isBreak: false,
    isRunning: false,
    currentTask: '',
    isCompleted: false
  });

  // Ensure timer state syncs with settings
  useEffect(() => {
    if (!timerState.isRunning) {
      setTimerState(prev => ({
        ...prev,
        timeLeft: prev.isBreak ? settings.breakDuration : settings.focusDuration
      }));
    }
  }, [settings.focusDuration, settings.breakDuration]);

  const [taskInput, setTaskInput] = useState('');
  const [currentTask, setCurrentTask] = useState('');
  const [subTasks, setSubTasks] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [port, setPort] = useState(null);

  // Load initial state
  useEffect(() => {
    console.log('Setting up port connection...');
    let port;
    
    try {
      port = chrome.runtime.connect({ name: 'popup' });
      setPort(port);

      const messageHandler = (message) => {
        console.log('Received message:', message);
        if (message.type === 'STATE_UPDATE') {
          setTimerState(prev => ({
            ...prev,
            timeLeft: message.state.timeLeft,
            isRunning: message.state.isRunning,
            isBreak: message.state.isBreak,
            isCompleted: message.state.isCompleted,
            stats: message.state.stats
          }));
          setCurrentTask(message.state.currentTask);
          setSubTasks(message.state.subTasks || []);
        }
      };

      port.onMessage.addListener(messageHandler);
      port.postMessage({ action: 'getState' });

      return () => {
        try {
          port.onMessage.removeListener(messageHandler);
          port.disconnect();
        } catch (error) {
          console.error('Error cleaning up port:', error);
        }
      };
    } catch (error) {
      console.error('Error setting up port connection:', error);
    }
  }, []);

  const handlePin = () => {
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    
    if (newPinnedState) {
      chrome.windows.getCurrent(window => {
        chrome.windows.update(window.id, {
          focused: true,
          state: 'normal',
          alwaysOnTop: true
        });
      });
    } else {
      chrome.windows.getCurrent(window => {
        chrome.windows.update(window.id, {
          alwaysOnTop: false
        });
      });
    }
    
    chrome.storage.local.set({ isPinned: newPinnedState });
    chrome.action.setPopup({ 
      popup: newPinnedState ? '' : 'popup.html' 
    });
  };

  const handleStartTimer = () => {
    console.log('App: handleStartTimer called');
    const task = taskInput.trim() || currentTask;
    
    if (!task) {
      console.log('No task provided');
      return;
    }

    console.log('Sending startTimer message with task:', task);
    port.postMessage({ 
      action: "startTimer",
      task: task,
      focusDuration: settings.focusDuration
    });
    
    setCurrentTask(task);
    setTaskInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (taskInput.trim() || currentTask)) {
      e.preventDefault();
      handleStartTimer();
    }
  };
  const handleStartBreak = () => {
    port.postMessage({ 
      action: "startBreak",
      settings: settings
    });
  };

  const handleReset = () => {
    port.postMessage({ 
      action: "resetTimer" 
    });
    setTaskInput('');
    setCurrentTask('');
  };

  const handleAddSubTask = (task) => {
    port.postMessage({ 
      action: "addSubTask", 
      task 
    });
    setSubTasks([...subTasks, task]);
  };

  const handleSwitchToSubTask = (task) => {
    setCurrentTask(task);
    setSubTasks(subTasks.filter(t => t !== task));
    port.postMessage({ 
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
    port.postMessage({
      action: "updateSettings",
      settings: newSettings
    });
    setShowSettings(false);
  };

  // Add console log to verify component mounting
  useEffect(() => {
    console.log('App mounted');
  }, []);

  return (
    <div className="app-container">
      <div className="main-content">
        <header className="app-header">
          <div className="logo-container">
            <h1 className="app-title">Polydomo</h1>
            <img 
              src="/icons/Evil_Tomato.gif" 
              alt="Evil Tomato Mascot" 
              className="mascot-gif"
            />
          </div>
          <div className="header-controls">
            <button 
              className="settings-btn icon-btn"
              onClick={() => setShowSettings(true)}
              aria-label="Settings"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" strokeLinejoin="round"/>
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
          settings={settings}
        />
      </div>

      <TaskPanel
        currentTask={currentTask}
        taskInput={taskInput}
        setTaskInput={setTaskInput}
        handleStartTimer={handleStartTimer}
        subTasks={subTasks}
        onAddSubTask={handleAddSubTask}
        isVisible={!timerState.isRunning || timerState.isCompleted}
        isBreak={timerState.isBreak}
        isCompleted={timerState.isCompleted}
        onPrioritizeSubTask={handleSwitchToSubTask}
      />
    </div>
  );
};

export default App;