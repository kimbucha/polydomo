import React, { useState, useEffect } from 'react';
import { Timer } from './Timer';
import { TaskPanel } from './TaskPanel';
import { SettingsModal } from './SettingsModal';
import { StatsDisplay } from './StatsDisplay';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Error caught by boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h2>Something went wrong</h2>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export const App = () => {
  const [settings, setSettings] = useState({
    focusDuration: 25 * 60,  // 25 minutes in seconds
    breakDuration: 5 * 60,   // 5 minutes in seconds
    notifications: true
  });

  const [timerState, setTimerState] = useState({
    type: 'focus',
    timeLeft: settings.focusDuration,
    isRunning: false,
    isBreak: false,
    isCompleted: false,
    stats: {
      today: {
        pomodoros: 0,
        totalFocusMinutes: 0
      },
      streaks: {
        current: 0
      },
      dailyGoal: 8
    }
  });

  const [taskInput, setTaskInput] = useState('');
  const [currentTask, setCurrentTask] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [port, setPort] = useState(null);

  useEffect(() => {
    let currentPort;
    try {
      currentPort = chrome.runtime.connect({ name: 'popup' });
      setPort(currentPort);

      const messageHandler = (message) => {
        console.log('Received message:', message);
        if (message.type === 'STATE_UPDATE') {
          setTimerState(prev => ({
            ...prev,
            timeLeft: message.state.timeLeft ?? prev.timeLeft,
            isRunning: false, // Force this to false initially
            isBreak: message.state.isBreak ?? prev.isBreak,
            isCompleted: false, // Force this to false initially
            stats: {
              today: {
                pomodoros: message.state.stats?.today?.pomodoros ?? prev.stats.today.pomodoros,
                totalFocusMinutes: message.state.stats?.today?.totalFocusMinutes ?? prev.stats.today.totalFocusMinutes
              },
              streaks: {
                current: message.state.stats?.streaks?.current ?? prev.stats.streaks.current
              },
              dailyGoal: message.state.stats?.dailyGoal ?? prev.stats.dailyGoal
            }
          }));
          setCurrentTask(message.state.currentTask || '');
        }
      };

      currentPort.onMessage.addListener(messageHandler);
      currentPort.postMessage({ action: 'getState' });

      return () => {
        currentPort.onMessage.removeListener(messageHandler);
        currentPort.disconnect();
      };
    } catch (error) {
      console.error('Error connecting to popup:', error);
    }
  }, []);

  const handleSettingsSave = (newSettings) => {
    setSettings(newSettings);
    chrome.storage.local.set({ settings: newSettings });
    port.postMessage({
      action: "updateSettings",
      settings: newSettings
    });
    if (!timerState.isRunning) {
      setTimerState(prev => ({
        ...prev,
        timeLeft: prev.isBreak ? newSettings.breakDuration : newSettings.focusDuration
      }));
    }
    setShowSettings(false);
  };

  // Your existing handlers remain the same
  const handleStartTimer = () => {
    const task = taskInput.trim() || currentTask;
    if (!task) return;
    
    const initialTime = timerState.isBreak ? 
      settings.breakDuration : 
      settings.focusDuration;
    
    // Set local state first
    setTimerState(prev => ({
      ...prev,
      isRunning: true,
      timeLeft: initialTime,
      currentTask: task,
      isCompleted: false
    }));
    
    // Then notify background
    port.postMessage({ 
      action: "startTimer",
      task: task,
      focusDuration: settings.focusDuration,
      initialTime: initialTime
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

  const handleComplete = (startBreak = true) => {
    if (startBreak) {
      handleBreakTransition();
    } else {
      setTimerState(prev => ({
        ...prev,
        isCompleted: false,
        isRunning: false,
        timeLeft: settings.focusDuration
      }));
    }
  };

  const handleStateTransition = (from, to) => {
    setTransition({
      type: 'exit',
      isAnimating: true
    });

    setTimeout(() => {
      // Update state here
      setTransition({
        type: 'enter',
        isAnimating: true
      });

      setTimeout(() => {
        setTransition({
          type: null,
          isAnimating: false
        });
      }, 300);
    }, 300);
  };

  const getTransitionClass = (componentType) => {
    if (!transition.isAnimating) return '';
    
    return `transition-${transition.type} ${
      componentType === 'current' ? 'current' : 'next'
    }`;
  };

  const handleBreakStart = () => {
    handleStateTransition('focus', 'break');
    setTimerState(prev => ({
      ...prev,
      type: 'break',
      timeLeft: settings.breakDuration,
      isRunning: true
    }));
  };

  const handleSessionComplete = () => {
    handleStateTransition('focus', 'completed');
    port.postMessage({
      action: "completeSession",
      task: currentTask
    });
  };

  const handleBreakSkip = () => {
    handleStateTransition('break', 'focus');
    port.postMessage({
      action: "skipBreak"
    });
  };

  const handleBreakComplete = () => {
    handleStateTransition('break', 'focus');
    port.postMessage({
      action: "completeBreak"
    });
  };

  const handleReset = () => {
    if (window.confirm('Reset timer? Current session progress will be lost.')) {
      const initialDuration = timerState.isBreak ? 
        settings.breakDuration : 
        settings.focusDuration;
      
      port.postMessage({ 
        action: 'resetTimer',
        duration: initialDuration
      });
      
      setTimerState(prev => ({
        ...prev,
        timeLeft: initialDuration,
        isRunning: false
      }));
    }
  };

  const handleBreakTransition = () => {
    const nextDuration = timerState.isBreak ? 
      settings.focusDuration : 
      settings.breakDuration;
      
    setTimerState(prev => ({
      ...prev,
      isBreak: !prev.isBreak,
      timeLeft: nextDuration,
      isRunning: false
    }));

    port.postMessage({
      action: 'switchPhase',
      isBreak: !timerState.isBreak,
      duration: nextDuration
    });
  };

  const handlePause = () => {
    if (timerState.isRunning) {
      port.postMessage({ 
        action: 'pauseTimer',
        currentTime: timerState.timeLeft
      });
      
      setTimerState(prev => ({
        ...prev,
        isRunning: false
      }));
    } else {
      port.postMessage({ 
        action: 'resumeTimer',
        currentTime: timerState.timeLeft
      });
      
      setTimerState(prev => ({
        ...prev,
        isRunning: true
      }));
    }
  };

  return (
    <ErrorBoundary>
      <div className="app-container">
        <div className="header">
          <div className="logo-container">
            <img 
              src="icons/Evil_Tomato.gif" 
              alt="Polydomo" 
              className={`logo-gif ${timerState.isRunning ? 'active' : ''}`} 
            />
            <h1 className="app-title">Polydomo</h1>
          </div>
          <button 
            className="settings-trigger"
            onClick={() => setShowSettings(true)}
            aria-label="Settings"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="settings-icon"
            >
              <path 
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {!timerState.isRunning && !timerState.isCompleted && (
          <TaskPanel
            taskInput={taskInput}
            setTaskInput={setTaskInput}
            handleStartTimer={handleStartTimer}
            isVisible={true}
            isBreak={timerState.isBreak}
            handleKeyPress={handleKeyPress}
          />
        )}

        {timerState.isRunning && (
          <Timer
            timeLeft={timerState.timeLeft}
            isBreak={timerState.isBreak}
            isRunning={timerState.isRunning}
            currentTask={currentTask}
            onComplete={handleComplete}
            settings={settings}
            onPause={handlePause}
            onReset={handleReset}
            className={getTransitionClass('current')}
          />
        )}

        {timerState.isCompleted && (
          <StatsDisplay 
            stats={timerState.stats}
            currentTask={currentTask}
          />
        )}

        <SettingsModal 
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          settings={settings}
          onSave={handleSettingsSave}
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;