/******/ (() => { // webpackBootstrap
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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

// Keep service worker active
var _keepAlive = function keepAlive() {
  chrome.runtime.getPlatformInfo(function () {
    setTimeout(_keepAlive, 20000); // Run every 20 seconds
  });
};
_keepAlive();

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

// Debounce state broadcasts
var debouncedBroadcast = debounce(broadcastState, 100);
var tick = function tick() {
  try {
    if (!state.isRunning) return;
    state.timeLeft--;
    debouncedBroadcast();
  } catch (error) {
    handleError(error);
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
    updateStats(); // Update daily stats

    // Transition to break mode
    state.isBreak = true;
    state.timeLeft = state.settings.breakDuration * 60;

    // Show completion notification
    chrome.notifications.create('focusComplete', {
      type: 'basic',
      iconUrl: 'public/icons/focus_complete_icon.png',
      title: 'Focus Session Complete! 🎉',
      message: "Time for a ".concat(state.settings.breakDuration, "-minute break."),
      requireInteraction: true,
      buttons: [{
        title: 'Start Break'
      }, {
        title: 'Dismiss'
      }]
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
      message: "Ready for a ".concat(state.settings.focusDuration, "-minute focus session?"),
      requireInteraction: true,
      buttons: [{
        title: 'Start Focus'
      }, {
        title: 'Dismiss'
      }]
    });
  }
  handleStateTransition();
  playNotificationSound();
};
var updateStreak = function updateStreak() {
  var now = new Date();
  var today = now.toDateString();
  if (state.stats.lastCompleted === today) {
    // Already completed a session today, increment streak
    state.stats.currentStreak++;
  } else if (state.stats.lastCompleted) {
    // Check if streak is broken
    var lastDate = new Date(state.stats.lastCompleted);
    var daysDiff = (now - lastDate) / (1000 * 60 * 60 * 24);
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
    timerState: _objectSpread(_objectSpread({}, state), {}, {
      timeLeft: state.timeLeft,
      isRunning: state.isRunning,
      isBreak: state.isBreak,
      isCompleted: state.isCompleted,
      currentTask: state.currentTask,
      subTasks: state.subTasks,
      settings: state.settings,
      stats: state.stats
    })
  });
};
var updateIcon = function updateIcon() {
  var iconPath;
  if (state.isRunning) {
    iconPath = state.isBreak ? "public/icons/break_active_icon.png" : "public/icons/active_icon128.png";
  } else {
    iconPath = state.isBreak ? "public/icons/short_break_icon.png" : "public/icons/inactive_icon128.png";
  }
  chrome.action.setIcon({
    path: iconPath
  });
};

// Message handlers
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
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
    case "sendFeedback":
      console.log('Processing feedback:', request.feedback);
      handleFeedbackEmail(request.feedback).then(function (response) {
        console.log('Feedback response:', response);
        sendResponse(response);
      })["catch"](function (error) {
        console.error('Feedback error:', error);
        sendResponse({
          success: false,
          error: error.message
        });
      });
      return true;
    // Required for async response
  }
  return true;
});

// Initialize on install/update
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'update' || details.reason === 'install') {
    // Initialize default state
    state = _objectSpread({}, defaultState);
    state.timeLeft = state.settings.focusDuration * 60;

    // Update icon and save state
    updateIcon();
    saveState();

    // Start keep-alive
    _keepAlive();
  }
});

// Core state management improvements
var handleStateTransition = function handleStateTransition() {
  clearInterval(timer);

  // Update timeLeft based on current mode
  if (!state.isRunning) {
    state.timeLeft = state.isBreak ? state.settings.breakDuration * 60 : state.settings.focusDuration * 60;
  }

  // Ensure proper icon state
  updateIcon();

  // Broadcast and save new state
  broadcastState();
  saveState();
};

// Need to implement proper popup trigger
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "checkPopupTrigger") {
    if (state.isCompleted && !state.popupShown) {
      state.popupShown = true;
      chrome.action.openPopup();
    }
  }
});

// Improved stats management
var updateStats = function updateStats() {
  var today = new Date().toDateString();

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
var handleError = function handleError(error) {
  console.error('Timer Error:', error);

  // Reset timer state
  clearInterval(timer);
  state.isRunning = false;

  // Save last known good state
  var lastGoodState = {
    timeLeft: state.isBreak ? state.settings.breakDuration * 60 : state.settings.focusDuration * 60,
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
var cleanup = function cleanup() {
  // Clear any running timers
  clearInterval(timer);

  // Save final state
  saveState();

  // Clear any active notifications
  chrome.notifications.getAll(function (notifications) {
    Object.keys(notifications).forEach(function (id) {
      chrome.notifications.clear(id);
    });
  });
};

// Need to implement proper notification handling
var handleNotificationClick = function handleNotificationClick(notificationId) {
  chrome.notifications.clear(notificationId);
  chrome.action.openPopup();
};

// Notification management
chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
  switch (notificationId) {
    case 'focusComplete':
      if (buttonIndex === 0) {
        // Start Break
        state.isBreak = true;
        state.isCompleted = false;
        startTimer();
      }
      break;
    case 'breakComplete':
      if (buttonIndex === 0) {
        // Start Focus
        state.isBreak = false;
        state.isCompleted = false;
        startTimer();
      }
      break;
  }
  chrome.notifications.clear(notificationId);
});
chrome.notifications.onClicked.addListener(function (notificationId) {
  chrome.action.openPopup();
  chrome.notifications.clear(notificationId);
});

// Settings validation
var validateSettings = function validateSettings(settings) {
  return {
    focusDuration: Math.min(60, Math.max(1, settings.focusDuration || 25)),
    breakDuration: Math.min(30, Math.max(1, settings.breakDuration || 5)),
    dailyGoal: Math.min(20, Math.max(1, settings.dailyGoal || 8))
  };
};

// Update settings handler
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "updateSettings") {
    try {
      var validatedSettings = validateSettings(request.settings);
      state.settings = validatedSettings;

      // Update timer if not running
      if (!state.isRunning) {
        state.timeLeft = state.isBreak ? validatedSettings.breakDuration * 60 : validatedSettings.focusDuration * 60;
      }

      // Save settings
      chrome.storage.local.set({
        settings: validatedSettings,
        timerState: state
      }, function () {
        broadcastState();
        sendResponse({
          success: true
        });
      });
    } catch (error) {
      console.error('Settings update error:', error);
      sendResponse({
        success: false,
        error: 'Invalid settings'
      });
    }
    return true;
  }
});
// Register cleanup handlers
chrome.runtime.onSuspend.addListener(cleanup);

// Handle extension updates/reinstalls
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'update' || details.reason === 'install') {
    // Initialize default state
    state = _objectSpread({}, defaultState);
    state.timeLeft = state.settings.focusDuration * 60;

    // Update icon and save state
    updateIcon();
    saveState();
  }
});

// Popup management
var popupOpen = false;
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === 'popup') {
    popupOpen = true;
    port.onDisconnect.addListener(function () {
      popupOpen = false;
      // Save state when popup closes
      saveState();
    });
  }
});
var openPopup = function openPopup() {
  if (!popupOpen) {
    chrome.action.openPopup();
  }
};
var playNotificationSound = function playNotificationSound() {
  var audio = new Audio('public/sounds/notification.mp3');
  audio.play()["catch"](console.error);
};
var migrateStateData = function migrateStateData(oldState) {
  var newState = _objectSpread({}, defaultState);
  // Ensure backward compatibility
  if (oldState) {
    newState.settings = validateSettings(oldState.settings || defaultState.settings);
    newState.stats = _objectSpread(_objectSpread({}, defaultState.stats), oldState.stats);
  }
  return newState;
};
var handleCrashRecovery = function handleCrashRecovery() {
  chrome.storage.local.get(['lastKnownState'], function (result) {
    if (result.lastKnownState && result.lastKnownState.isRunning) {
      // Attempt to recover timer state
      state = migrateStateData(result.lastKnownState);
      broadcastState();
    }
  });
};
var FEEDBACK_COOLDOWN = 1000 * 60 * 5; // 5 minutes cooldown
var MAX_DAILY_FEEDBACK = 5; // Maximum feedback submissions per day

var handleFeedbackEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(feedback) {
    var _yield$chrome$storage, lastFeedback, _yield$chrome$storage2, dailyFeedback, now, today, todaysFeedback, minutesLeft, response, feedbackEntry;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('Starting handleFeedbackEmail with:', feedback);
          _context.prev = 1;
          _context.next = 4;
          return chrome.storage.local.get(['lastFeedback', 'dailyFeedback']);
        case 4:
          _yield$chrome$storage = _context.sent;
          lastFeedback = _yield$chrome$storage.lastFeedback;
          _yield$chrome$storage2 = _yield$chrome$storage.dailyFeedback;
          dailyFeedback = _yield$chrome$storage2 === void 0 ? [] : _yield$chrome$storage2;
          now = Date.now();
          today = new Date().toDateString(); // Clean up old daily feedback entries
          todaysFeedback = dailyFeedback.filter(function (f) {
            return new Date(f.timestamp).toDateString() === today;
          }); // Check cooldown
          if (!(lastFeedback && now - lastFeedback < FEEDBACK_COOLDOWN)) {
            _context.next = 14;
            break;
          }
          minutesLeft = Math.ceil((FEEDBACK_COOLDOWN - (now - lastFeedback)) / (1000 * 60));
          return _context.abrupt("return", {
            success: false,
            error: "Please wait ".concat(minutesLeft, " minutes before sending another feedback.")
          });
        case 14:
          if (!(todaysFeedback.length >= MAX_DAILY_FEEDBACK)) {
            _context.next = 16;
            break;
          }
          return _context.abrupt("return", {
            success: false,
            error: 'Daily feedback limit reached. Please try again tomorrow.'
          });
        case 16:
          console.log('Sending request to Resend API');
          _context.next = 19;
          return fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': "Bearer ".concat(process.env.RESEND_API_KEY),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: 'Polydomo Feedback <onboarding@resend.dev>',
              to: 'kim.nguyen.afk@gmail.com',
              subject: "Polydomo Feedback: ".concat(feedback.feedbackType),
              html: "\n          <h2>New Feedback Received</h2>\n          <p><strong>Type:</strong> ".concat(feedback.feedbackType, "</p>\n          <p><strong>Email:</strong> ").concat(feedback.email || 'Not provided', "</p>\n          <p><strong>Message:</strong></p>\n          <p>").concat(feedback.message, "</p>\n          <hr>\n          <p><strong>System Info:</strong></p>\n          <p>Version: ").concat(feedback.systemInfo.version, "</p>\n          <p>Browser: ").concat(feedback.systemInfo.browser, "</p>\n          <p>Time: ").concat(new Date(feedback.timestamp).toLocaleString(), "</p>\n        ")
            })
          });
        case 19:
          response = _context.sent;
          console.log('Resend API response:', response);
          if (response.ok) {
            _context.next = 23;
            break;
          }
          throw new Error('Failed to send email');
        case 23:
          // Store feedback history
          feedbackEntry = _objectSpread(_objectSpread({}, feedback), {}, {
            timestamp: now,
            status: 'sent'
          });
          _context.next = 26;
          return chrome.storage.local.set({
            lastFeedback: now,
            dailyFeedback: [].concat(_toConsumableArray(todaysFeedback), [feedbackEntry])
          });
        case 26:
          // Show success notification
          chrome.notifications.create('feedbackSuccess', {
            type: 'basic',
            iconUrl: 'public/icons/success_icon.png',
            title: 'Feedback Sent',
            message: 'Thank you for your feedback!'
          });
          return _context.abrupt("return", {
            success: true
          });
        case 30:
          _context.prev = 30;
          _context.t0 = _context["catch"](1);
          console.error('Detailed feedback error:', _context.t0);
          return _context.abrupt("return", {
            success: false,
            error: 'Failed to send feedback. It will be retried automatically.'
          });
        case 34:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 30]]);
  }));
  return function handleFeedbackEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Add retry mechanism for failed feedback
var retryFailedFeedback = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var _yield$chrome$storage3, _yield$chrome$storage4, failedFeedback, retryResults, newFailedFeedback;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return chrome.storage.local.get(['failedFeedback']);
        case 3:
          _yield$chrome$storage3 = _context2.sent;
          _yield$chrome$storage4 = _yield$chrome$storage3.failedFeedback;
          failedFeedback = _yield$chrome$storage4 === void 0 ? [] : _yield$chrome$storage4;
          if (!(failedFeedback.length === 0)) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return");
        case 8:
          _context2.next = 10;
          return Promise.allSettled(failedFeedback.map(function (feedback) {
            return handleFeedbackEmail(feedback);
          }));
        case 10:
          retryResults = _context2.sent;
          // Keep only the still-failed feedback
          newFailedFeedback = failedFeedback.filter(function (_, index) {
            var _retryResults$index$v;
            return retryResults[index].status === 'rejected' || !((_retryResults$index$v = retryResults[index].value) !== null && _retryResults$index$v !== void 0 && _retryResults$index$v.success);
          });
          _context2.next = 14;
          return chrome.storage.local.set({
            failedFeedback: newFailedFeedback
          });
        case 14:
          _context2.next = 19;
          break;
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.error('Failed to retry feedback:', _context2.t0);
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function retryFailedFeedback() {
    return _ref2.apply(this, arguments);
  };
}();

// Retry failed feedback periodically
chrome.alarms.create('retryFeedback', {
  periodInMinutes: 30
});
chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === 'retryFeedback') {
    retryFailedFeedback();
  }
});

// Also add this to ensure persistence
chrome.runtime.onStartup.addListener(function () {
  _keepAlive();
});
/******/ })()
;
//# sourceMappingURL=background.js.map