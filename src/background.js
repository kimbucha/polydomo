let timer;
let state = {
  timeLeft: 1500, // 25 minutes
  isRunning: false,
  isBreak: false,
  isCompleted: false,
  currentTask: '',
  subTasks: [],
  stats: {
    focusMinutes: 0,
    completedPomodoros: 0,
    currentStreak: 0,
    lastCompleted: null
  },
  settings: {
    focusDuration: 25,
    breakDuration: 5,
    dailyGoal: 8
  }
};

// Initial state with default settings
const defaultState = {
  timeLeft: 1500, // 25 minutes
  isRunning: false,
  isBreak: false,
  isCompleted: false,
  settings: {
    focusDuration: 25,
    breakDuration: 5,
    dailyGoal: 8
  },
  stats: {
    focusMinutes: 0,
    completedPomodoros: 0,
    currentStreak: 0
  }
};

// Load state from storage or use defaults
chrome.storage.local.get(['timerState'], (result) => {
  state = result.timerState || defaultState;
  // Ensure timeLeft matches current settings
  if (!state.isRunning) {
    state.timeLeft = state.isBreak ? 
      state.settings.breakDuration * 60 : 
      state.settings.focusDuration * 60;
  }
  broadcastState();
});

// Timer control functions
const startTimer = () => {
  if (state.isRunning) return false;
  
  state.isRunning = true;
  state.isCompleted = false;
  timer = setInterval(tick, 1000);
  updateIcon();
  broadcastState();
  return true;
};

const resetTimer = () => {
  clearInterval(timer);
  
  // Save current task before resetting
  const taskToRestore = state.currentTask;
  
  state.isRunning = false;
  state.isCompleted = false;
  state.isBreak = false;
  state.timeLeft = state.settings.focusDuration * 60;
  state.currentTask = ''; // Clear current task
  state.subTasks = [];
  
  // Broadcast state with the task that needs to be restored
  chrome.runtime.sendMessage({
    type: 'STATE_UPDATE',
    state: {
      ...state,
      taskToRestore // Add this to the state update
    }
  });
  
  updateIcon();
  saveState();
};

const tick = () => {
  if (!state.isRunning) return;

  state.timeLeft--;
  
  if (!state.isBreak) {
    state.stats.focusMinutes = Math.floor((state.settings.focusDuration * 60 - state.timeLeft) / 60);
  }

  if (state.timeLeft <= 0) {
    handleTimerComplete();
  } else {
    broadcastState();
  }
};

const handleTimerComplete = () => {
  clearInterval(timer);
  state.isRunning = false;
  state.isCompleted = true;

  if (!state.isBreak) {
    // Focus session completed
    state.stats.completedPomodoros++;
    updateStreak();
    
    // Prepare for break
    state.timeLeft = state.settings.breakDuration * 60;
    state.isBreak = true;
    
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/focus_complete_icon.png',
      title: 'Focus Session Complete! 🎉',
      message: `Great job! Time for a ${state.settings.breakDuration}-minute break.`,
      requireInteraction: true
    });
  } else {
    // Break completed
    state.timeLeft = state.settings.focusDuration * 60;
    state.isBreak = false;
    
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/break_complete_icon.png',
      title: 'Break Complete! 🔄',
      message: `Ready for a ${state.settings.focusDuration}-minute focus session?`,
      requireInteraction: true
    });
  }

  updateIcon();
  broadcastState();
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
    if (daysDiff > 1) {
      state.stats.currentStreak = 1;
    }
  } else {
    state.stats.currentStreak = 1;
  }
  
  state.stats.lastCompleted = today;
};

// State management functions
const broadcastState = () => {
  chrome.runtime.sendMessage({
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
  });
};

const saveState = () => {
  chrome.storage.local.set({ state });
};

const updateIcon = () => {
  const iconPath = state.isBreak 
    ? "public/icons/short_break_icon.png"
    : state.isRunning 
      ? "public/icons/active_icon128.png" 
      : "public/icons/inactive_icon128.png";
  
  chrome.action.setIcon({ path: iconPath });
};

// Message handlers
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case "getState":
      sendResponse({
        timeLeft: state.timeLeft,
        isRunning: state.isRunning,
        isBreak: state.isBreak,
        isCompleted: state.isCompleted,
        currentTask: state.currentTask,
        subTasks: state.subTasks,
        stats: state.stats,
        settings: state.settings
      });
      break;

    case "startTimer":
      if (request.task) {
        state.currentTask = request.task;
      }
      const success = startTimer();
      sendResponse({ success });
      break;

    case "startBreak":
      state.isBreak = true;
      state.isCompleted = false;
      startTimer();
      sendResponse({ success: true });
      break;

    case "resetTimer":
      resetTimer();
      sendResponse({ success: true });
      break;

    case "addSubTask":
      if (request.task && !state.subTasks.includes(request.task)) {
        state.subTasks.push(request.task);
        saveState();
        broadcastState();
      }
      sendResponse({ success: true });
      break;

    case "switchTask":
      if (request.task) {
        state.currentTask = request.task;
        state.subTasks = state.subTasks.filter(t => t !== request.task);
        if (request.previousTask) {
          state.subTasks.push(request.previousTask);
        }
        saveState();
        broadcastState();
      }
      sendResponse({ success: true });
      break;

    case "updateSettings":
      state.settings = request.settings;
      if (!state.isRunning) {
        state.timeLeft = state.settings.focusDuration * 60;
      }
      chrome.storage.local.set({ settings: state.settings });
      broadcastState();
      sendResponse({ success: true });
      break;
  }
  return true;
});

// Initialize on install/update
chrome.runtime.onInstalled.addListener(() => {
  state.timeLeft = state.settings.focusDuration * 60;
  updateIcon();
  saveState();
});