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

// Keep service worker active
const keepAlive = () => {
  chrome.runtime.getPlatformInfo(() => {
    setTimeout(keepAlive, 20000); // Run every 20 seconds
  });
};

keepAlive();

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

// Debounce state broadcasts
const debouncedBroadcast = debounce(broadcastState, 100);

const tick = () => {
  try {
    if (!state.isRunning) return;
    state.timeLeft--;
    debouncedBroadcast();
  } catch (error) {
    handleError(error);
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
    updateStats(); // Update daily stats
    
    // Transition to break mode
    state.isBreak = true;
    state.timeLeft = state.settings.breakDuration * 60;
    
    // Show completion notification
    chrome.notifications.create('focusComplete', {
      type: 'basic',
      iconUrl: 'public/icons/focus_complete_icon.png',
      title: 'Focus Session Complete! 🎉',
      message: `Time for a ${state.settings.breakDuration}-minute break.`,
      requireInteraction: true,
      buttons: [
        { title: 'Start Break' },
        { title: 'Dismiss' }
      ]
    });
    
    // Trigger popup
    openPopup();
  } else {
    // Break completed
    state.isBreak = false;
    state.timeLeft = state.settings.focusDuration * 60;
    
    chrome.notifications.create('breakComplete', {
      type: 'basic',
      iconUrl: 'public/icons/break_complete_icon.png',
      title: 'Break Complete! 🔄',
      message: `Ready for a ${state.settings.focusDuration}-minute focus session?`,
      requireInteraction: true,
      buttons: [
        { title: 'Start Focus' },
        { title: 'Dismiss' }
      ]
    });
  }

  handleStateTransition();
  playNotificationSound();
};

const updateStreak = () => {
  const now = new Date();
  const today = now.toDateString();
  
  if (state.stats.lastCompleted === today) {
    // Already completed a session today, increment streak
    state.stats.currentStreak++;
  } else if (state.stats.lastCompleted) {
    // Check if streak is broken
    const lastDate = new Date(state.stats.lastCompleted);
    const daysDiff = (now - lastDate) / (1000 * 60 * 60 * 24);
    
    if (daysDiff > 1) {
      // Streak broken, reset to 1
      state.stats.currentStreak = 1;
    } else {
      // Continue streak
      state.stats.currentStreak++;
    }
  } else {
    // First ever session
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
  chrome.storage.local.set({ 
    timerState: {
      ...state,
      timeLeft: state.timeLeft,
      isRunning: state.isRunning,
      isBreak: state.isBreak,
      isCompleted: state.isCompleted,
      currentTask: state.currentTask,
      subTasks: state.subTasks,
      settings: state.settings,
      stats: state.stats
    } 
  });
};

const updateIcon = () => {
  let iconPath;
  
  if (state.isRunning) {
    iconPath = state.isBreak 
      ? "public/icons/break_active_icon.png"
      : "public/icons/active_icon128.png";
  } else {
    iconPath = state.isBreak
      ? "public/icons/short_break_icon.png"
      : "public/icons/inactive_icon128.png";
  }

  chrome.action.setIcon({ path: iconPath });
};

// Message handlers
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request);

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

    case "sendFeedback":
      console.log('Processing feedback:', request.feedback);
      
      handleFeedbackEmail(request.feedback)
        .then(response => {
          console.log('Feedback response:', response);
          sendResponse(response);
        })
        .catch(error => {
          console.error('Feedback error:', error);
          sendResponse({ success: false, error: error.message });
        });
      return true; // Required for async response
  }
  return true;
});

// Initialize on install/update
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'update' || details.reason === 'install') {
    // Initialize default state
    state = { ...defaultState };
    state.timeLeft = state.settings.focusDuration * 60;
    
    // Update icon and save state
    updateIcon();
    saveState();
    
    // Start keep-alive
    keepAlive();
  }
});

// Core state management improvements
const handleStateTransition = () => {
  clearInterval(timer);
  
  // Update timeLeft based on current mode
  if (!state.isRunning) {
    state.timeLeft = state.isBreak ? 
      state.settings.breakDuration * 60 : 
      state.settings.focusDuration * 60;
  }
  
  // Ensure proper icon state
  updateIcon();
  
  // Broadcast and save new state
  broadcastState();
  saveState();
};

// Need to implement proper popup trigger
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkPopupTrigger") {
    if (state.isCompleted && !state.popupShown) {
      state.popupShown = true;
      chrome.action.openPopup();
    }
  }
});

// Improved stats management
const updateStats = () => {
  const today = new Date().toDateString();
  
  // Initialize daily stats if needed
  if (!state.stats.dailyStats || state.stats.dailyStats.date !== today) {
    state.stats.dailyStats = {
      date: today,
      focusMinutes: 0,
      completedPomodoros: 0,
      breaks: 0
    };
  }
  
  // Update daily stats
  state.stats.dailyStats.focusMinutes += state.settings.focusDuration;
  state.stats.dailyStats.completedPomodoros++;
  
  // Update streak
  updateStreak();
  
  // Save updated stats
  saveState();
};

// Error handling
const handleError = (error) => {
  console.error('Timer Error:', error);
  
  // Reset timer state
  clearInterval(timer);
  state.isRunning = false;
  
  // Save last known good state
  const lastGoodState = {
    timeLeft: state.isBreak ? 
      state.settings.breakDuration * 60 : 
      state.settings.focusDuration * 60,
    isBreak: state.isBreak,
    isCompleted: false
  };
  
  // Update state
  Object.assign(state, lastGoodState);
  
  // Notify user
  chrome.notifications.create('timerError', {
    type: 'basic',
    iconUrl: 'public/icons/error_icon.png',
    title: 'Timer Error',
    message: 'There was an error with the timer. It has been reset.',
    requireInteraction: true
  });
  
  // Update UI
  handleStateTransition();
};

// Need to implement proper cleanup
const cleanup = () => {
  // Clear any running timers
  clearInterval(timer);
  
  // Save final state
  saveState();
  
  // Clear any active notifications
  chrome.notifications.getAll((notifications) => {
    Object.keys(notifications).forEach(id => {
      chrome.notifications.clear(id);
    });
  });
};

// Need to implement proper notification handling
const handleNotificationClick = (notificationId) => {
  chrome.notifications.clear(notificationId);
  chrome.action.openPopup();
};

// Notification management
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  switch (notificationId) {
    case 'focusComplete':
      if (buttonIndex === 0) { // Start Break
        state.isBreak = true;
        state.isCompleted = false;
        startTimer();
      }
      break;
      
    case 'breakComplete':
      if (buttonIndex === 0) { // Start Focus
        state.isBreak = false;
        state.isCompleted = false;
        startTimer();
      }
      break;
  }
  
  chrome.notifications.clear(notificationId);
});

chrome.notifications.onClicked.addListener((notificationId) => {
  chrome.action.openPopup();
  chrome.notifications.clear(notificationId);
});

// Settings validation
const validateSettings = (settings) => {
  return {
    focusDuration: Math.min(60, Math.max(1, settings.focusDuration || 25)),
    breakDuration: Math.min(30, Math.max(1, settings.breakDuration || 5)),
    dailyGoal: Math.min(20, Math.max(1, settings.dailyGoal || 8))
  };
};

// Update settings handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateSettings") {
    try {
      const validatedSettings = validateSettings(request.settings);
      state.settings = validatedSettings;
      
      // Update timer if not running
      if (!state.isRunning) {
        state.timeLeft = state.isBreak ? 
          validatedSettings.breakDuration * 60 : 
          validatedSettings.focusDuration * 60;
      }
      
      // Save settings
      chrome.storage.local.set({ 
        settings: validatedSettings,
        timerState: state 
      }, () => {
        broadcastState();
        sendResponse({ success: true });
      });
      
    } catch (error) {
      console.error('Settings update error:', error);
      sendResponse({ success: false, error: 'Invalid settings' });
    }
    return true;
  }
});
// Register cleanup handlers
chrome.runtime.onSuspend.addListener(cleanup);

// Handle extension updates/reinstalls
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'update' || details.reason === 'install') {
    // Initialize default state
    state = { ...defaultState };
    state.timeLeft = state.settings.focusDuration * 60;
    
    // Update icon and save state
    updateIcon();
    saveState();
  }
});

// Popup management
let popupOpen = false;

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'popup') {
    popupOpen = true;
    
    port.onDisconnect.addListener(() => {
      popupOpen = false;
      // Save state when popup closes
      saveState();
    });
  }
});

const openPopup = () => {
  if (!popupOpen) {
    chrome.action.openPopup();
  }
};

const playNotificationSound = () => {
  const audio = new Audio('public/sounds/notification.mp3');
  audio.play().catch(console.error);
};

const migrateStateData = (oldState) => {
  const newState = { ...defaultState };
  // Ensure backward compatibility
  if (oldState) {
    newState.settings = validateSettings(oldState.settings || defaultState.settings);
    newState.stats = {
      ...defaultState.stats,
      ...oldState.stats
    };
  }
  return newState;
};

const handleCrashRecovery = () => {
  chrome.storage.local.get(['lastKnownState'], (result) => {
    if (result.lastKnownState && result.lastKnownState.isRunning) {
      // Attempt to recover timer state
      state = migrateStateData(result.lastKnownState);
      broadcastState();
    }
  });
};

const FEEDBACK_COOLDOWN = 1000 * 60 * 5; // 5 minutes cooldown
const MAX_DAILY_FEEDBACK = 5; // Maximum feedback submissions per day

const handleFeedbackEmail = async (feedback) => {
  console.log('Starting handleFeedbackEmail with:', feedback);
  try {
    // Check rate limiting
    const { lastFeedback, dailyFeedback = [] } = await chrome.storage.local.get([
      'lastFeedback',
      'dailyFeedback'
    ]);

    const now = Date.now();
    const today = new Date().toDateString();

    // Clean up old daily feedback entries
    const todaysFeedback = dailyFeedback.filter(f => 
      new Date(f.timestamp).toDateString() === today
    );

    // Check cooldown
    if (lastFeedback && (now - lastFeedback) < FEEDBACK_COOLDOWN) {
      const minutesLeft = Math.ceil((FEEDBACK_COOLDOWN - (now - lastFeedback)) / (1000 * 60));
      return { 
        success: false, 
        error: `Please wait ${minutesLeft} minutes before sending another feedback.`
      };
    }

    // Check daily limit
    if (todaysFeedback.length >= MAX_DAILY_FEEDBACK) {
      return {
        success: false,
        error: 'Daily feedback limit reached. Please try again tomorrow.'
      };
    }

    console.log('Sending request to Resend API');
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Polydomo Feedback <onboarding@resend.dev>',
        to: 'kim.nguyen.afk@gmail.com',
        subject: `Polydomo Feedback: ${feedback.feedbackType}`,
        html: `
          <h2>New Feedback Received</h2>
          <p><strong>Type:</strong> ${feedback.feedbackType}</p>
          <p><strong>Email:</strong> ${feedback.email || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${feedback.message}</p>
          <hr>
          <p><strong>System Info:</strong></p>
          <p>Version: ${feedback.systemInfo.version}</p>
          <p>Browser: ${feedback.systemInfo.browser}</p>
          <p>Time: ${new Date(feedback.timestamp).toLocaleString()}</p>
        `
      })
    });

    console.log('Resend API response:', response);

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    // Store feedback history
    const feedbackEntry = {
      ...feedback,
      timestamp: now,
      status: 'sent'
    };

    await chrome.storage.local.set({
      lastFeedback: now,
      dailyFeedback: [...todaysFeedback, feedbackEntry]
    });

    // Show success notification
    chrome.notifications.create('feedbackSuccess', {
      type: 'basic',
      iconUrl: 'public/icons/success_icon.png',
      title: 'Feedback Sent',
      message: 'Thank you for your feedback!'
    });

    return { success: true };
  } catch (error) {
    console.error('Detailed feedback error:', error);
    return { 
      success: false, 
      error: 'Failed to send feedback. It will be retried automatically.'
    };
  }
};

// Add retry mechanism for failed feedback
const retryFailedFeedback = async () => {
  try {
    const { failedFeedback = [] } = await chrome.storage.local.get(['failedFeedback']);
    if (failedFeedback.length === 0) return;

    const retryResults = await Promise.allSettled(
      failedFeedback.map(feedback => handleFeedbackEmail(feedback))
    );

    // Keep only the still-failed feedback
    const newFailedFeedback = failedFeedback.filter((_, index) => 
      retryResults[index].status === 'rejected' || 
      !retryResults[index].value?.success
    );

    await chrome.storage.local.set({ failedFeedback: newFailedFeedback });
  } catch (error) {
    console.error('Failed to retry feedback:', error);
  }
};

// Retry failed feedback periodically
chrome.alarms.create('retryFeedback', { periodInMinutes: 30 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'retryFeedback') {
    retryFailedFeedback();
  }
});

// Also add this to ensure persistence
chrome.runtime.onStartup.addListener(() => {
  keepAlive();
});
