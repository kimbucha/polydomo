console.log('Background script loaded');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed/updated');
});

let timer = null;
let state = {
  timeLeft: 1500,
  isRunning: false,
  isBreak: false,
  isCompleted: false,
  currentTask: '',
  subTasks: [],
  stats: {
    focusMinutes: 0,
    completedPomodoros: 0,
    currentStreak: 0,
    dailyStats: {
      date: new Date().toDateString(),
      focusMinutes: 0,
      completedPomodoros: 0,
      breaks: 0
    }
  },
  settings: {
    focusDuration: 25 * 60,
    breakDuration: 5 * 60,
    dailyGoal: 8,
    popupOnComplete: true
  }
};

// Add connection handling
let ports = new Set();

chrome.runtime.onConnect.addListener(port => {
  console.log('New connection established');
  ports.add(port);

  port.onDisconnect.addListener(() => {
    ports.delete(port);
  });

  port.onMessage.addListener((msg) => handleMessage(msg, port));
});

function handleMessage(request, port) {
  console.log('Background received message:', request);

  switch (request.action) {
    case 'getState':
      port.postMessage({ type: 'STATE_UPDATE', state });
      break;

    case 'startTimer':
      console.log('Starting timer with task:', request.task);
      const success = startTimer(request.task, request.focusDuration);
      port.postMessage({ type: 'TIMER_RESPONSE', success });
      break;

    case 'resetTimer':
      clearInterval(timer);
      state.timeLeft = state.isBreak ? 
        state.settings.breakDuration : 
        state.settings.focusDuration;
      state.isRunning = false;
      updateBadgeAndIcon();
      broadcastState();
      break;

    case 'startBreak':
      console.log('Starting break with settings:', request.settings);
      clearInterval(timer);
      state.isBreak = true;
      state.timeLeft = request.settings.breakDuration * 60;
      state.isRunning = true;
      state.isCompleted = false;
      
      timer = setupTimer();
      
      updateBadgeAndIcon();
      broadcastState();
      break;

    case 'addSubTask':
      state.subTasks.push(request.task);
      broadcastState();
      break;

    case 'switchTask':
      if (request.previousTask) {
        state.subTasks.push(request.previousTask);
      }
      state.currentTask = request.task;
      broadcastState();
      break;

    case 'updateSettings':
      state.settings = {
        ...state.settings,
        ...request.settings
      };
      if (!state.isRunning) {
        state.timeLeft = state.isBreak ? 
          state.settings.breakDuration * 60 : 
          state.settings.focusDuration * 60;
      }
      broadcastState();
      break;

    case 'pauseTimer':
      clearInterval(timer);
      state.isRunning = false;
      updateBadgeAndIcon();
      broadcastState();
      break;

    case 'resumeTimer':
      clearInterval(timer);
      state.isRunning = true;
      timer = setupTimer();
      updateBadgeAndIcon();
      broadcastState();
      break;

    case 'updateWindowSize':
      const { width, height } = request;
      chrome.windows.getCurrent((window) => {
        chrome.windows.update(window.id, {
          width: Math.max(width, 320),
          height: Math.max(height, 400)
        });
      });
      break;
  }
}

const broadcastState = () => {
  const message = {
    type: 'STATE_UPDATE',
    state: {
      timeLeft: state.timeLeft,
      isRunning: state.isRunning,
      isBreak: state.isBreak,
      isCompleted: state.isCompleted,
      currentTask: state.currentTask,
      subTasks: state.subTasks,
      stats: state.stats
    }
  };

  ports.forEach(port => {
    try {
      port.postMessage(message);
    } catch (e) {
      console.error('Error broadcasting to port:', e);
    }
  });

  // Update window size based on state
  const dimensions = getWindowDimensions(state);
  ports.forEach(port => {
    try {
      port.postMessage({
        type: 'WINDOW_DIMENSIONS',
        dimensions
      });
    } catch (e) {
      console.error('Error broadcasting dimensions:', e);
    }
  });
};

// Keep service worker active
const keepAlive = () => {
  const interval = 20000; // 20 seconds
  setInterval(() => {
    chrome.runtime.getPlatformInfo(() => {
      chrome.runtime.lastError; // Just to check connection
    });
  }, interval);
};

// Initialize immediately
keepAlive();

// Load state from storage or use defaults
chrome.storage.local.get(['timerState'], (result) => {
  if (result.timerState) {
    const savedState = result.timerState;
    const now = Date.now();
    const timePassed = now - (savedState.lastSaved || now);
    
    // Reset completed state on new session
    savedState.isCompleted = false;
    savedState.isRunning = false;
    
    // If timer was running, adjust timeLeft
    if (savedState.isRunning) {
      const secondsPassed = Math.floor(timePassed / 1000);
      savedState.timeLeft = Math.max(0, savedState.timeLeft - secondsPassed);
    }
    
    // Merge saved state with defaults
    state = {
      ...state,  // Keep default state as fallback
      ...savedState,
      stats: {
        today: {
          pomodoros: savedState.stats?.today?.pomodoros || 0,
          totalFocusMinutes: savedState.stats?.today?.totalFocusMinutes || 0
        },
        streaks: {
          current: savedState.stats?.streaks?.current || 0
        },
        dailyGoal: savedState.stats?.dailyGoal || 8
      }
    };
  }
  
  // Always ensure valid state
  state.timeLeft = state.isBreak ? 
    state.settings.breakDuration * 60 : 
    state.settings.focusDuration * 60;
  
  broadcastState();
});

const setupTimer = () => {
  try {
    if (timer) {
      clearInterval(timer);
    }
    
    return setInterval(() => {
      if (state.timeLeft > 0) {
        state.timeLeft--;
        updateBadgeAndIcon();
        broadcastState();
      } else {
        handleTimerComplete();
      }
    }, 1000);
  } catch (error) {
    console.error('Error setting up timer:', error);
    return null;
  }
};

const startTimer = (task, duration) => {
  console.log('Starting timer with:', { task, duration });
  
  clearInterval(timer);
  
  state = {
    ...state,
    timeLeft: duration,
    isRunning: true,
    currentTask: task,
    isCompleted: false,
    isBreak: false
  };
  
  timer = setInterval(() => {
    if (state.timeLeft > 0) {
      state.timeLeft--;
      updateBadgeAndIcon();
      broadcastState();
      saveState(); // Save state periodically
    } else {
      handleTimerComplete();
    }
  }, 1000);
  
  updateBadgeAndIcon();
  broadcastState();
  saveState(); // Save initial state
  return true;
};

const updateBadgeAndIcon = () => {
  try {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    const text = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    chrome.action.setBadgeText({ text }).catch(() => {});
    chrome.action.setBadgeBackgroundColor({ 
      color: state.isBreak ? '#4CAF50' : '#FF6B6B' 
    }).catch(() => {});
  } catch (error) {
    console.log('Error updating badge:', error);
  }
};

const updateIcon = () => {
  try {
    const iconPath = state.isRunning ?
      (state.isBreak ? 
        chrome.runtime.getURL("icons/break_active_icon.png") : 
        chrome.runtime.getURL("icons/active_icon128.png")
      ) :
      state.isBreak ? 
        chrome.runtime.getURL("icons/break_inactive_icon.png") : 
        chrome.runtime.getURL("icons/inactive_icon128.png");

    chrome.action.setIcon({ path: iconPath }).catch(err => 
      console.error('Icon update failed:', err)
    );
    
    chrome.action.setBadgeBackgroundColor({ 
      color: state.isBreak ? '#4CAF50' : '#F44336' 
    }).catch(() => {});
  } catch (error) {
    console.error('Error updating icon:', error);
  }
};

const handleTimerComplete = () => {
  clearInterval(timer);
  state.isRunning = false;
  state.isCompleted = true;
  
  // Update icon to smiling one when timer completes
  const iconPath = state.isBreak ? 
    chrome.runtime.getURL("icons/break_inactive_icon.png") : 
    chrome.runtime.getURL("icons/smile_icon128.png");
  
  chrome.action.setIcon({ path: iconPath }).catch(() => {});
  
  if (!state.isBreak) {
    updateStats();
    
    // Create notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: chrome.runtime.getURL('icons/smile_icon128.png'),
      title: 'Focus Session Complete!',
      message: `Great job focusing on "${state.currentTask}"!`
    }).catch(() => {});

    // Show popup if enabled in settings
    if (state.settings.popupOnComplete) {
      chrome.windows.getCurrent((window) => {
        chrome.action.openPopup().catch(() => {});
      });
    }
  } else {
    // Break completed notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: chrome.runtime.getURL('icons/icon128.png'),
      title: 'Break Time Over',
      message: 'Ready to focus again?'
    }).catch(() => {});
  }
  
  chrome.action.setBadgeText({ text: '' }).catch(() => {});
  broadcastState();
  saveState();
};

// Stats management
const updateStats = () => {
  const today = new Date().toDateString();
  
  if (!state.stats.dailyStats || state.stats.dailyStats.date !== today) {
    state.stats.dailyStats = {
      date: today,
      focusMinutes: 0,
      completedPomodoros: 0,
      breaks: 0
    };
  }
  
  state.stats.dailyStats.focusMinutes += state.settings.focusDuration;
  state.stats.dailyStats.completedPomodoros++;
  
  updateStreak();
  saveState();
};

const updateStreak = () => {
  const now = new Date();
  const today = now.toDateString();
  
  if (state.stats.lastCompleted === today) {
    state.stats.currentStreak++;
  } else if (state.stats.lastCompleted) {
    const lastDate = new Date(state.stats.lastCompleted);
    const daysDiff = (now - lastDate) / (1000 * 60 * 60 * 24);
    state.stats.currentStreak = daysDiff > 1 ? 1 : state.stats.currentStreak + 1;
  } else {
    state.stats.currentStreak = 1;
  }
  
  state.stats.lastCompleted = today;
};

// State persistence
const saveState = () => {
  chrome.storage.local.set({ 
    timerState: {
      ...state,
      lastSaved: Date.now()
    } 
  }).catch(error => {
    console.error('Error saving state:', error);
  });
};

// Register cleanup handlers
chrome.runtime.onSuspend.addListener(() => {
  clearInterval(timer);
  saveState();
});

function getWindowDimensions(state) {
  if (!state.isRunning && !state.isCompleted) {
    return { width: 320, height: 400 };
  } else if (state.isRunning) {
    return { width: 400, height: 500 };
  } else {
    return { width: 400, height: 600 };
  }
}

