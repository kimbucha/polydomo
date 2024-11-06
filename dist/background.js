/******/ (() => { // webpackBootstrap
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var timer;
var state = {
  timeLeft: 1500,
  // 25 minutes
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
var defaultState = {
  timeLeft: 1500,
  // 25 minutes
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
chrome.storage.local.get(['timerState'], function (result) {
  state = result.timerState || defaultState;
  // Ensure timeLeft matches current settings
  if (!state.isRunning) {
    state.timeLeft = state.isBreak ? state.settings.breakDuration * 60 : state.settings.focusDuration * 60;
  }
  broadcastState();
});

// Timer control functions
var startTimer = function startTimer() {
  if (state.isRunning) return false;
  state.isRunning = true;
  state.isCompleted = false;
  timer = setInterval(tick, 1000);
  updateIcon();
  broadcastState();
  return true;
};
var resetTimer = function resetTimer() {
  clearInterval(timer);

  // Save current task before resetting
  var taskToRestore = state.currentTask;
  state.isRunning = false;
  state.isCompleted = false;
  state.isBreak = false;
  state.timeLeft = state.settings.focusDuration * 60;
  state.currentTask = ''; // Clear current task
  state.subTasks = [];

  // Broadcast state with the task that needs to be restored
  chrome.runtime.sendMessage({
    type: 'STATE_UPDATE',
    state: _objectSpread(_objectSpread({}, state), {}, {
      taskToRestore: taskToRestore // Add this to the state update
    })
  });
  updateIcon();
  saveState();
};
var tick = function tick() {
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
var handleTimerComplete = function handleTimerComplete() {
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
      message: "Great job! Time for a ".concat(state.settings.breakDuration, "-minute break."),
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
      message: "Ready for a ".concat(state.settings.focusDuration, "-minute focus session?"),
      requireInteraction: true
    });
  }
  updateIcon();
  broadcastState();
  saveState();
};
var updateStreak = function updateStreak() {
  var now = new Date();
  var today = now.toDateString();
  if (state.stats.lastCompleted === today) {
    state.stats.currentStreak++;
  } else if (state.stats.lastCompleted) {
    var lastDate = new Date(state.stats.lastCompleted);
    var daysDiff = (now - lastDate) / (1000 * 60 * 60 * 24);
    if (daysDiff > 1) {
      state.stats.currentStreak = 1;
    }
  } else {
    state.stats.currentStreak = 1;
  }
  state.stats.lastCompleted = today;
};

// State management functions
var broadcastState = function broadcastState() {
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
var saveState = function saveState() {
  chrome.storage.local.set({
    state: state
  });
};
var updateIcon = function updateIcon() {
  var iconPath = state.isBreak ? "public/icons/short_break_icon.png" : state.isRunning ? "public/icons/active_icon128.png" : "public/icons/inactive_icon128.png";
  chrome.action.setIcon({
    path: iconPath
  });
};

// Message handlers
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
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
      var success = startTimer();
      sendResponse({
        success: success
      });
      break;
    case "startBreak":
      state.isBreak = true;
      state.isCompleted = false;
      startTimer();
      sendResponse({
        success: true
      });
      break;
    case "resetTimer":
      resetTimer();
      sendResponse({
        success: true
      });
      break;
    case "addSubTask":
      if (request.task && !state.subTasks.includes(request.task)) {
        state.subTasks.push(request.task);
        saveState();
        broadcastState();
      }
      sendResponse({
        success: true
      });
      break;
    case "switchTask":
      if (request.task) {
        state.currentTask = request.task;
        state.subTasks = state.subTasks.filter(function (t) {
          return t !== request.task;
        });
        if (request.previousTask) {
          state.subTasks.push(request.previousTask);
        }
        saveState();
        broadcastState();
      }
      sendResponse({
        success: true
      });
      break;
    case "updateSettings":
      state.settings = request.settings;
      if (!state.isRunning) {
        state.timeLeft = state.settings.focusDuration * 60;
      }
      chrome.storage.local.set({
        settings: state.settings
      });
      broadcastState();
      sendResponse({
        success: true
      });
      break;
  }
  return true;
});

// Initialize on install/update
chrome.runtime.onInstalled.addListener(function () {
  state.timeLeft = state.settings.focusDuration * 60;
  updateIcon();
  saveState();
});
/******/ })()
;
//# sourceMappingURL=background.js.map