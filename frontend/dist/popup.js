/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/App.jsx":
/*!********************************!*\
  !*** ./src/components/App.jsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   App: () => (/* binding */ App),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Timer */ "./src/components/Timer.jsx");
/* harmony import */ var _TaskPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TaskPanel */ "./src/components/TaskPanel.jsx");
/* harmony import */ var _SettingsModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SettingsModal */ "./src/components/SettingsModal.jsx");
/* harmony import */ var _StatsDisplay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StatsDisplay */ "./src/components/StatsDisplay.jsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/Users/mona/code/polydomos/polydomo/frontend/src/components/App.jsx";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






class ErrorBoundary extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, info) {
    console.error('Error caught by boundary:', error, info);
  }
  render() {
    if (this.state.hasError) {
      var _this$state$error;
      return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
        style: {
          padding: '20px',
          color: 'red'
        },
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("h2", {
          children: "Something went wrong"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("pre", {
          children: (_this$state$error = this.state.error) === null || _this$state$error === void 0 ? void 0 : _this$state$error.toString()
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 26,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 9
      }, this);
    }
    return this.props.children;
  }
}
const App = () => {
  const [settings, setSettings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    focusDuration: 25 * 60,
    // 25 minutes in seconds
    breakDuration: 5 * 60,
    // 5 minutes in seconds
    notifications: true
  });
  const [timerState, setTimerState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
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
  const [taskInput, setTaskInput] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [currentTask, setCurrentTask] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [showSettings, setShowSettings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [port, setPort] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let currentPort;
    try {
      currentPort = chrome.runtime.connect({
        name: 'popup'
      });
      setPort(currentPort);
      const messageHandler = message => {
        console.log('Received message:', message);
        if (message.type === 'STATE_UPDATE') {
          setTimerState(prev => {
            var _message$state$timeLe, _message$state$isBrea, _message$state$stats$, _message$state$stats, _message$state$stats$2, _message$state$stats2, _message$state$stats$3, _message$state$stats3, _message$state$stats$4, _message$state$stats4;
            return _objectSpread(_objectSpread({}, prev), {}, {
              timeLeft: (_message$state$timeLe = message.state.timeLeft) !== null && _message$state$timeLe !== void 0 ? _message$state$timeLe : prev.timeLeft,
              isRunning: false,
              // Force this to false initially
              isBreak: (_message$state$isBrea = message.state.isBreak) !== null && _message$state$isBrea !== void 0 ? _message$state$isBrea : prev.isBreak,
              isCompleted: false,
              // Force this to false initially
              stats: {
                today: {
                  pomodoros: (_message$state$stats$ = (_message$state$stats = message.state.stats) === null || _message$state$stats === void 0 || (_message$state$stats = _message$state$stats.today) === null || _message$state$stats === void 0 ? void 0 : _message$state$stats.pomodoros) !== null && _message$state$stats$ !== void 0 ? _message$state$stats$ : prev.stats.today.pomodoros,
                  totalFocusMinutes: (_message$state$stats$2 = (_message$state$stats2 = message.state.stats) === null || _message$state$stats2 === void 0 || (_message$state$stats2 = _message$state$stats2.today) === null || _message$state$stats2 === void 0 ? void 0 : _message$state$stats2.totalFocusMinutes) !== null && _message$state$stats$2 !== void 0 ? _message$state$stats$2 : prev.stats.today.totalFocusMinutes
                },
                streaks: {
                  current: (_message$state$stats$3 = (_message$state$stats3 = message.state.stats) === null || _message$state$stats3 === void 0 || (_message$state$stats3 = _message$state$stats3.streaks) === null || _message$state$stats3 === void 0 ? void 0 : _message$state$stats3.current) !== null && _message$state$stats$3 !== void 0 ? _message$state$stats$3 : prev.stats.streaks.current
                },
                dailyGoal: (_message$state$stats$4 = (_message$state$stats4 = message.state.stats) === null || _message$state$stats4 === void 0 ? void 0 : _message$state$stats4.dailyGoal) !== null && _message$state$stats$4 !== void 0 ? _message$state$stats$4 : prev.stats.dailyGoal
              }
            });
          });
          setCurrentTask(message.state.currentTask || '');
        }
      };
      currentPort.onMessage.addListener(messageHandler);
      currentPort.postMessage({
        action: 'getState'
      });
      return () => {
        currentPort.onMessage.removeListener(messageHandler);
        currentPort.disconnect();
      };
    } catch (error) {
      console.error('Error connecting to popup:', error);
    }
  }, []);
  const handleSettingsSave = newSettings => {
    setSettings(newSettings);
    chrome.storage.local.set({
      settings: newSettings
    });
    port.postMessage({
      action: "updateSettings",
      settings: newSettings
    });
    if (!timerState.isRunning) {
      setTimerState(prev => _objectSpread(_objectSpread({}, prev), {}, {
        timeLeft: prev.isBreak ? newSettings.breakDuration : newSettings.focusDuration
      }));
    }
    setShowSettings(false);
  };

  // Your existing handlers remain the same
  const handleStartTimer = () => {
    const task = taskInput.trim() || currentTask;
    if (!task) return;
    const initialTime = timerState.isBreak ? settings.breakDuration : settings.focusDuration;

    // Set local state first
    setTimerState(prev => _objectSpread(_objectSpread({}, prev), {}, {
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
  const handleKeyPress = e => {
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
      setTimerState(prev => _objectSpread(_objectSpread({}, prev), {}, {
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
  const getTransitionClass = componentType => {
    if (!transition.isAnimating) return '';
    return `transition-${transition.type} ${componentType === 'current' ? 'current' : 'next'}`;
  };
  const handleBreakStart = () => {
    handleStateTransition('focus', 'break');
    setTimerState(prev => _objectSpread(_objectSpread({}, prev), {}, {
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
      const initialDuration = timerState.isBreak ? settings.breakDuration : settings.focusDuration;
      port.postMessage({
        action: 'resetTimer',
        duration: initialDuration
      });
      setTimerState(prev => _objectSpread(_objectSpread({}, prev), {}, {
        timeLeft: initialDuration,
        isRunning: false
      }));
    }
  };
  const handleBreakTransition = () => {
    const nextDuration = timerState.isBreak ? settings.focusDuration : settings.breakDuration;
    setTimerState(prev => _objectSpread(_objectSpread({}, prev), {}, {
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
      setTimerState(prev => _objectSpread(_objectSpread({}, prev), {}, {
        isRunning: false
      }));
    } else {
      port.postMessage({
        action: 'resumeTimer',
        currentTime: timerState.timeLeft
      });
      setTimerState(prev => _objectSpread(_objectSpread({}, prev), {}, {
        isRunning: true
      }));
    }
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(ErrorBoundary, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
      className: "app-container",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
        className: "header",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("div", {
          className: "logo-container",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("img", {
            src: "icons/Evil_Tomato.gif",
            alt: "Polydomo",
            className: `logo-gif ${timerState.isRunning ? 'active' : ''}`
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 308,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("h1", {
            className: "app-title",
            children: "Polydomo"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 313,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 307,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("button", {
          className: "settings-trigger",
          onClick: () => setShowSettings(true),
          "aria-label": "Settings",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("svg", {
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            className: "settings-icon",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("path", {
              d: "M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 327,
              columnNumber: 15
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("path", {
              d: "M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 334,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 320,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 315,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 306,
        columnNumber: 9
      }, undefined), !timerState.isRunning && !timerState.isCompleted && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_TaskPanel__WEBPACK_IMPORTED_MODULE_2__.TaskPanel, {
        taskInput: taskInput,
        setTaskInput: setTaskInput,
        handleStartTimer: handleStartTimer,
        isVisible: true,
        isBreak: timerState.isBreak,
        handleKeyPress: handleKeyPress
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 346,
        columnNumber: 11
      }, undefined), timerState.isRunning && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_Timer__WEBPACK_IMPORTED_MODULE_1__.Timer, {
        timeLeft: timerState.timeLeft,
        isBreak: timerState.isBreak,
        isRunning: timerState.isRunning,
        currentTask: currentTask,
        onComplete: handleComplete,
        settings: settings,
        onPause: handlePause,
        onReset: handleReset,
        className: getTransitionClass('current')
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 357,
        columnNumber: 11
      }, undefined), timerState.isCompleted && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_StatsDisplay__WEBPACK_IMPORTED_MODULE_4__.StatsDisplay, {
        stats: timerState.stats,
        currentTask: currentTask
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 371,
        columnNumber: 11
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_SettingsModal__WEBPACK_IMPORTED_MODULE_3__.SettingsModal, {
        isOpen: showSettings,
        onClose: () => setShowSettings(false),
        settings: settings,
        onSave: handleSettingsSave
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 377,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 305,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 304,
    columnNumber: 5
  }, undefined);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/components/SettingsModal.jsx":
/*!******************************************!*\
  !*** ./src/components/SettingsModal.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsModal: () => (/* binding */ SettingsModal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/Users/mona/code/polydomos/polydomo/frontend/src/components/SettingsModal.jsx";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


const SettingsModal = ({
  isOpen,
  onClose,
  settings,
  onSave
}) => {
  const [localSettings, setLocalSettings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(settings);
  const [showFeedback, setShowFeedback] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [feedbackData, setFeedbackData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    email: '',
    feedbackType: 'general',
    message: ''
  });
  const [feedbackStatus, setFeedbackStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    message: '',
    type: ''
  });
  const [isSubmitting, setIsSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setLocalSettings(settings);
  }, [settings]);
  const handleSubmit = e => {
    e.preventDefault();
    onSave(localSettings);
    onClose();
  };
  const handleFeedbackSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(_objectSpread(_objectSpread({}, feedbackData), {}, {
          timestamp: new Date().toISOString(),
          systemInfo: {
            version: '1.0.0',
            browser: navigator.userAgent
          }
        }))
      });
      if (response.ok) {
        setFeedbackStatus({
          message: 'Thank you for your feedback!',
          type: 'success'
        });
        setTimeout(() => {
          setShowFeedback(false);
          setFeedbackData({
            email: '',
            feedbackType: 'general',
            message: ''
          });
        }, 2000);
      } else {
        const data = await response.json();
        setFeedbackStatus({
          message: data.error || 'Failed to send feedback',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setFeedbackStatus({
        message: 'Failed to send feedback. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isOpen) return null;
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
    className: "modal-overlay",
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
      className: "modal-wrapper",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
        className: "modal-header",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("h3", {
          children: showFeedback ? 'Send Feedback' : 'Settings'
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 84,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("button", {
          className: "icon-btn",
          onClick: onClose,
          children: "\xD7"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 85,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
        className: "modal-content",
        children: !showFeedback ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
          className: "settings-content",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("form", {
            onSubmit: handleSubmit,
            className: "settings-form",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
              className: "form-group",
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("label", {
                htmlFor: "focusDuration",
                children: "Focus Duration (minutes)"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 93,
                columnNumber: 19
              }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("input", {
                type: "number",
                id: "focusDuration",
                className: "form-input",
                value: localSettings.focusDuration / 60,
                onChange: e => setLocalSettings(_objectSpread(_objectSpread({}, localSettings), {}, {
                  focusDuration: Math.max(1, Math.min(60, e.target.value)) * 60
                })),
                min: "1",
                max: "60"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 94,
                columnNumber: 19
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 92,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
              className: "form-group",
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("label", {
                htmlFor: "breakDuration",
                children: "Break Duration (minutes)"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 109,
                columnNumber: 19
              }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("input", {
                type: "number",
                id: "breakDuration",
                className: "form-input",
                value: localSettings.breakDuration / 60,
                onChange: e => setLocalSettings(_objectSpread(_objectSpread({}, localSettings), {}, {
                  breakDuration: Math.max(1, Math.min(30, e.target.value)) * 60
                })),
                min: "1",
                max: "30"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 110,
                columnNumber: 19
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 108,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("button", {
              type: "button",
              className: "feedback-button",
              onClick: () => setShowFeedback(true),
              children: "Send Feedback"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 124,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
              className: "settings-actions",
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("button", {
                type: "button",
                className: "secondary-button",
                onClick: onClose,
                children: "Cancel"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 133,
                columnNumber: 19
              }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("button", {
                type: "submit",
                className: "primary-button",
                children: "Save Changes"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 136,
                columnNumber: 19
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 132,
              columnNumber: 17
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 91,
            columnNumber: 15
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 90,
          columnNumber: 13
        }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("form", {
          onSubmit: handleFeedbackSubmit,
          className: "feedback-form",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
            className: "form-group",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("label", {
              htmlFor: "email",
              children: "Email (optional)"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 145,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("input", {
              type: "email",
              id: "email",
              className: "form-input",
              value: feedbackData.email,
              onChange: e => setFeedbackData(_objectSpread(_objectSpread({}, feedbackData), {}, {
                email: e.target.value
              })),
              placeholder: "your@email.com"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 146,
              columnNumber: 17
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 144,
            columnNumber: 15
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
            className: "form-group",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("label", {
              htmlFor: "feedbackType",
              children: "Feedback Type"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 157,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("select", {
              id: "feedbackType",
              className: "form-select",
              value: feedbackData.feedbackType,
              onChange: e => setFeedbackData(_objectSpread(_objectSpread({}, feedbackData), {}, {
                feedbackType: e.target.value
              })),
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("option", {
                value: "general",
                children: "General Feedback"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 164,
                columnNumber: 19
              }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("option", {
                value: "bug",
                children: "Report a Bug"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 165,
                columnNumber: 19
              }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("option", {
                value: "feature",
                children: "Feature Request"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 166,
                columnNumber: 19
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 158,
              columnNumber: 17
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 156,
            columnNumber: 15
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
            className: "form-group",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("label", {
              htmlFor: "message",
              children: "Message"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 171,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("textarea", {
              id: "message",
              className: "form-textarea",
              required: true,
              value: feedbackData.message,
              onChange: e => setFeedbackData(_objectSpread(_objectSpread({}, feedbackData), {}, {
                message: e.target.value
              })),
              placeholder: "Tell us what you think...",
              rows: 4
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 172,
              columnNumber: 17
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 170,
            columnNumber: 15
          }, undefined), feedbackStatus.message && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
            className: `status-message ${feedbackStatus.type}`,
            children: feedbackStatus.message
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 184,
            columnNumber: 17
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
            className: "form-actions",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("button", {
              type: "button",
              className: "secondary-button",
              onClick: () => setShowFeedback(false),
              disabled: isSubmitting,
              children: "Back"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 190,
              columnNumber: 17
            }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("button", {
              type: "submit",
              className: "primary-button",
              disabled: isSubmitting,
              children: isSubmitting ? 'Sending...' : 'Send Feedback'
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 198,
              columnNumber: 17
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 189,
            columnNumber: 15
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 143,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 88,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 81,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "./src/components/StatsDisplay.jsx":
/*!*****************************************!*\
  !*** ./src/components/StatsDisplay.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StatsDisplay: () => (/* binding */ StatsDisplay)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/Users/mona/code/polydomos/polydomo/frontend/src/components/StatsDisplay.jsx";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


const StatsDisplay = ({
  stats,
  currentTask,
  onStartBreak,
  onNewSession
}) => {
  var _stats$dailyGoal;
  // Ensure safe defaults for all stats
  const safeStats = {
    today: _objectSpread({
      pomodoros: 0,
      totalFocusMinutes: 0
    }, stats === null || stats === void 0 ? void 0 : stats.today),
    streaks: _objectSpread({
      current: 0
    }, stats === null || stats === void 0 ? void 0 : stats.streaks),
    dailyGoal: (_stats$dailyGoal = stats === null || stats === void 0 ? void 0 : stats.dailyGoal) !== null && _stats$dailyGoal !== void 0 ? _stats$dailyGoal : 8
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
    className: "stats-display-container",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
      className: "stats-header",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
        className: "completion-icon",
        children: "\u2728"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("h2", {
        className: "stats-title",
        children: "Session Complete!"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 22,
        columnNumber: 9
      }, undefined), currentTask && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
        className: "completed-task-display",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("span", {
          className: "task-label",
          children: "Task Completed:"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 13
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("span", {
          className: "task-name",
          children: currentTask
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 26,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
      className: "stats-grid",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
        className: "stat-card",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
          className: "stat-icon",
          children: "\uD83C\uDFAF"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 33,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
          className: "stat-value",
          children: safeStats.today.pomodoros
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 34,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
          className: "stat-label",
          children: "Today's Sessions"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
        className: "stat-card",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
          className: "stat-icon",
          children: "\uD83D\uDD25"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 39,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
          className: "stat-value",
          children: safeStats.streaks.current
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
          className: "stat-label",
          children: "Day Streak"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 41,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
        className: "stat-card",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
          className: "stat-icon",
          children: "\u23F1\uFE0F"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 45,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
          className: "stat-value",
          children: [safeStats.today.totalFocusMinutes, "m"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 46,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
          className: "stat-label",
          children: "Total Focus Time"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 44,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
      className: "daily-progress",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("h3", {
        className: "progress-title",
        children: "Daily Goal Progress"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
        className: "progress-ring-container",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("svg", {
          viewBox: "0 0 100 100",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("circle", {
            className: "progress-ring-bg",
            cx: "50",
            cy: "50",
            r: "45"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 55,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("circle", {
            className: "progress-ring-progress",
            cx: "50",
            cy: "50",
            r: "45",
            strokeDashoffset: 283 * (1 - safeStats.today.pomodoros / safeStats.dailyGoal)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 61,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 54,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
          className: "progress-text",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("span", {
            className: "current",
            children: safeStats.today.pomodoros
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 72,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("span", {
            className: "separator",
            children: "/"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 73,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("span", {
            className: "goal",
            children: safeStats.dailyGoal
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 74,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 71,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
      className: "action-buttons",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("button", {
        className: "action-button break-button",
        onClick: onStartBreak,
        children: "Take a Break (5:00)"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 80,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("button", {
        className: "action-button new-session-button",
        onClick: onNewSession,
        children: "Start New Session"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 19,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "./src/components/TaskPanel.jsx":
/*!**************************************!*\
  !*** ./src/components/TaskPanel.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskPanel: () => (/* binding */ TaskPanel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/Users/mona/code/polydomos/polydomo/frontend/src/components/TaskPanel.jsx";


const TaskPanel = ({
  taskInput,
  setTaskInput,
  handleStartTimer,
  isVisible,
  isBreak,
  handleKeyPress
}) => {
  const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);
  const handleSubmit = e => {
    e.preventDefault();
    if (taskInput.trim()) {
      handleStartTimer();
    }
  };
  return isVisible ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
    className: `task-panel ${isBreak ? 'break' : 'focus'}`,
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("h2", {
      className: "task-panel-title",
      children: isBreak ? 'Break Time!' : 'What are you focusing on?'
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("form", {
      onSubmit: handleSubmit,
      className: "task-input-wrapper",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("input", {
        ref: inputRef,
        type: "text",
        className: "task-input",
        value: taskInput,
        onChange: e => setTaskInput(e.target.value),
        onKeyPress: handleKeyPress,
        placeholder: isBreak ? 'Take a breather...' : 'Enter your focus task...',
        "aria-label": "Task input"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("button", {
        type: "submit",
        className: `start-button ${isBreak ? 'break' : 'focus'} ${!taskInput.trim() ? 'disabled' : ''}`,
        disabled: !taskInput.trim(),
        children: isBreak ? 'Start Break' : 'Start Focus Session'
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 44,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 27,
    columnNumber: 5
  }, undefined) : null;
};

/***/ }),

/***/ "./src/components/Timer.jsx":
/*!**********************************!*\
  !*** ./src/components/Timer.jsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Timer: () => (/* binding */ Timer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/Users/mona/code/polydomos/polydomo/frontend/src/components/Timer.jsx";


const TimerControls = ({
  isRunning,
  onPause,
  onReset
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
    className: "timer-controls",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("button", {
      className: "timer-control-btn",
      onClick: onPause,
      "aria-label": isRunning ? "Pause Timer" : "Resume Timer",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: isRunning ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("line", {
            x1: "10",
            y1: "6",
            x2: "10",
            y2: "18"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 23,
            columnNumber: 15
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("line", {
            x1: "14",
            y1: "6",
            x2: "14",
            y2: "18"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 24,
            columnNumber: 15
          }, undefined)]
        }, void 0, true) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("polygon", {
          points: "5 3 19 12 5 21 5 3"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 27,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 11,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("button", {
      className: "timer-control-btn",
      onClick: onReset,
      "aria-label": "Reset Timer",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("path", {
          d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("path", {
          d: "M3 3v5h5"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 48,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 5,
    columnNumber: 5
  }, undefined);
};
const Timer = ({
  timeLeft,
  isBreak,
  currentTask,
  settings,
  onComplete,
  isRunning,
  onPause,
  onReset
}) => {
  const formatTime = totalSeconds => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  const calculateProgress = () => {
    const totalTime = isBreak ? settings.breakDuration : settings.focusDuration;
    const progress = (totalTime - timeLeft) / totalTime * 100;
    return Math.min(Math.max(progress, 0), 100);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (timeLeft === 0 && isRunning) {
      onComplete();
    }
  }, [timeLeft, isRunning, onComplete]);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
    className: `timer-display-container ${isBreak ? 'break' : 'focus'}`,
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
      className: "task-header",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("h2", {
        className: "current-task-title",
        children: isBreak ? 'Break Time' : currentTask
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("span", {
        className: "session-type",
        children: isBreak ? 'Time to relax' : 'Focus Session'
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("div", {
      className: "timer-circle",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("svg", {
        viewBox: "0 0 200 200",
        className: "timer-svg",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("circle", {
          cx: "100",
          cy: "100",
          r: "90",
          fill: "none",
          stroke: isBreak ? 'var(--leaf-light)' : 'var(--tomato-light)',
          strokeWidth: "4",
          className: "timer-circle-bg"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 96,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("circle", {
          cx: "100",
          cy: "100",
          r: "90",
          fill: "none",
          stroke: isBreak ? 'var(--leaf-green)' : 'var(--tomato-red)',
          strokeWidth: "4",
          strokeLinecap: "round",
          className: "timer-circle-progress",
          style: {
            strokeDasharray: `${2 * Math.PI * 90}`,
            strokeDashoffset: `${2 * Math.PI * 90 * (1 - calculateProgress() / 100)}`
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 105,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("text", {
          x: "100",
          y: "100",
          textAnchor: "middle",
          dominantBaseline: "middle",
          className: "timer-text",
          fill: "var(--text-primary)",
          children: formatTime(timeLeft)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 119,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 95,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(TimerControls, {
        isRunning: isRunning,
        onPause: onPause,
        onReset: onReset
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 84,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "./src/index.jsx":
/*!***********************!*\
  !*** ./src/index.jsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/App */ "./src/components/App.jsx");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/Users/mona/code/polydomos/polydomo/frontend/src/index.jsx";





class ErrorBoundary extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)("div", {
        style: {
          padding: '20px',
          color: 'red'
        },
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)("h2", {
          children: "Something went wrong."
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 24,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)("details", {
          style: {
            whiteSpace: 'pre-wrap'
          },
          children: this.state.error && this.state.error.toString()
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 9
      }, this);
    }
    return this.props.children;
  }
}
const renderApp = () => {
  try {
    console.log('Starting to render app...');
    const container = document.getElementById('root');
    if (!container) {
      throw new Error('Root container not found');
    }
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);
    root.render(/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(ErrorBoundary, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_components_App__WEBPACK_IMPORTED_MODULE_2__.App, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 7
    }, undefined));
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error rendering app:', error);
    document.body.innerHTML = `
      <div style="padding: 20px; color: red;">
        Error loading app: ${error.message}
        <pre>${error.stack}</pre>
      </div>
    `;
  }
};

// Add load event listener
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  renderApp();
});

// Add error logging
window.addEventListener('error', event => {
  console.error('Global error:', event.error);
});

// Add unhandled promise rejection handling
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason);
});

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"popup": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor-react"], () => (__webpack_require__("./src/index.jsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2NvbXBvbmVudHMvQXBwLmpzeCIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9jb21wb25lbnRzL1NldHRpbmdzTW9kYWwuanN4Iiwid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2NvbXBvbmVudHMvU3RhdHNEaXNwbGF5LmpzeCIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9jb21wb25lbnRzL1Rhc2tQYW5lbC5qc3giLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvY29tcG9uZW50cy9UaW1lci5qc3giLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvaW5kZXguanN4Iiwid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL3N0eWxlcy5jc3M/OTk3ZCIsIndlYnBhY2s6Ly9mcm9udGVuZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2Zyb250ZW5kL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Zyb250ZW5kL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Zyb250ZW5kL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9mcm9udGVuZC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9mcm9udGVuZC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2Zyb250ZW5kL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9mcm9udGVuZC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBUaW1lciB9IGZyb20gJy4vVGltZXInO1xuaW1wb3J0IHsgVGFza1BhbmVsIH0gZnJvbSAnLi9UYXNrUGFuZWwnO1xuaW1wb3J0IHsgU2V0dGluZ3NNb2RhbCB9IGZyb20gJy4vU2V0dGluZ3NNb2RhbCc7XG5pbXBvcnQgeyBTdGF0c0Rpc3BsYXkgfSBmcm9tICcuL1N0YXRzRGlzcGxheSc7XG5cbmNsYXNzIEVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0geyBoYXNFcnJvcjogZmFsc2UsIGVycm9yOiBudWxsIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgaGFzRXJyb3I6IHRydWUsIGVycm9yIH07XG4gIH1cblxuICBjb21wb25lbnREaWRDYXRjaChlcnJvciwgaW5mbykge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNhdWdodCBieSBib3VuZGFyeTonLCBlcnJvciwgaW5mbyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuaGFzRXJyb3IpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzIwcHgnLCBjb2xvcjogJ3JlZCcgfX0+XG4gICAgICAgICAgPGgyPlNvbWV0aGluZyB3ZW50IHdyb25nPC9oMj5cbiAgICAgICAgICA8cHJlPnt0aGlzLnN0YXRlLmVycm9yPy50b1N0cmluZygpfTwvcHJlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBBcHAgPSAoKSA9PiB7XG4gIGNvbnN0IFtzZXR0aW5ncywgc2V0U2V0dGluZ3NdID0gdXNlU3RhdGUoe1xuICAgIGZvY3VzRHVyYXRpb246IDI1ICogNjAsICAvLyAyNSBtaW51dGVzIGluIHNlY29uZHNcbiAgICBicmVha0R1cmF0aW9uOiA1ICogNjAsICAgLy8gNSBtaW51dGVzIGluIHNlY29uZHNcbiAgICBub3RpZmljYXRpb25zOiB0cnVlXG4gIH0pO1xuXG4gIGNvbnN0IFt0aW1lclN0YXRlLCBzZXRUaW1lclN0YXRlXSA9IHVzZVN0YXRlKHtcbiAgICB0eXBlOiAnZm9jdXMnLFxuICAgIHRpbWVMZWZ0OiBzZXR0aW5ncy5mb2N1c0R1cmF0aW9uLFxuICAgIGlzUnVubmluZzogZmFsc2UsXG4gICAgaXNCcmVhazogZmFsc2UsXG4gICAgaXNDb21wbGV0ZWQ6IGZhbHNlLFxuICAgIHN0YXRzOiB7XG4gICAgICB0b2RheToge1xuICAgICAgICBwb21vZG9yb3M6IDAsXG4gICAgICAgIHRvdGFsRm9jdXNNaW51dGVzOiAwXG4gICAgICB9LFxuICAgICAgc3RyZWFrczoge1xuICAgICAgICBjdXJyZW50OiAwXG4gICAgICB9LFxuICAgICAgZGFpbHlHb2FsOiA4XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBbdGFza0lucHV0LCBzZXRUYXNrSW5wdXRdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbY3VycmVudFRhc2ssIHNldEN1cnJlbnRUYXNrXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3Nob3dTZXR0aW5ncywgc2V0U2hvd1NldHRpbmdzXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3BvcnQsIHNldFBvcnRdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgY3VycmVudFBvcnQ7XG4gICAgdHJ5IHtcbiAgICAgIGN1cnJlbnRQb3J0ID0gY2hyb21lLnJ1bnRpbWUuY29ubmVjdCh7IG5hbWU6ICdwb3B1cCcgfSk7XG4gICAgICBzZXRQb3J0KGN1cnJlbnRQb3J0KTtcblxuICAgICAgY29uc3QgbWVzc2FnZUhhbmRsZXIgPSAobWVzc2FnZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVjZWl2ZWQgbWVzc2FnZTonLCBtZXNzYWdlKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gJ1NUQVRFX1VQREFURScpIHtcbiAgICAgICAgICBzZXRUaW1lclN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICB0aW1lTGVmdDogbWVzc2FnZS5zdGF0ZS50aW1lTGVmdCA/PyBwcmV2LnRpbWVMZWZ0LFxuICAgICAgICAgICAgaXNSdW5uaW5nOiBmYWxzZSwgLy8gRm9yY2UgdGhpcyB0byBmYWxzZSBpbml0aWFsbHlcbiAgICAgICAgICAgIGlzQnJlYWs6IG1lc3NhZ2Uuc3RhdGUuaXNCcmVhayA/PyBwcmV2LmlzQnJlYWssXG4gICAgICAgICAgICBpc0NvbXBsZXRlZDogZmFsc2UsIC8vIEZvcmNlIHRoaXMgdG8gZmFsc2UgaW5pdGlhbGx5XG4gICAgICAgICAgICBzdGF0czoge1xuICAgICAgICAgICAgICB0b2RheToge1xuICAgICAgICAgICAgICAgIHBvbW9kb3JvczogbWVzc2FnZS5zdGF0ZS5zdGF0cz8udG9kYXk/LnBvbW9kb3JvcyA/PyBwcmV2LnN0YXRzLnRvZGF5LnBvbW9kb3JvcyxcbiAgICAgICAgICAgICAgICB0b3RhbEZvY3VzTWludXRlczogbWVzc2FnZS5zdGF0ZS5zdGF0cz8udG9kYXk/LnRvdGFsRm9jdXNNaW51dGVzID8/IHByZXYuc3RhdHMudG9kYXkudG90YWxGb2N1c01pbnV0ZXNcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc3RyZWFrczoge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IG1lc3NhZ2Uuc3RhdGUuc3RhdHM/LnN0cmVha3M/LmN1cnJlbnQgPz8gcHJldi5zdGF0cy5zdHJlYWtzLmN1cnJlbnRcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZGFpbHlHb2FsOiBtZXNzYWdlLnN0YXRlLnN0YXRzPy5kYWlseUdvYWwgPz8gcHJldi5zdGF0cy5kYWlseUdvYWxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSk7XG4gICAgICAgICAgc2V0Q3VycmVudFRhc2sobWVzc2FnZS5zdGF0ZS5jdXJyZW50VGFzayB8fCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGN1cnJlbnRQb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihtZXNzYWdlSGFuZGxlcik7XG4gICAgICBjdXJyZW50UG9ydC5wb3N0TWVzc2FnZSh7IGFjdGlvbjogJ2dldFN0YXRlJyB9KTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY3VycmVudFBvcnQub25NZXNzYWdlLnJlbW92ZUxpc3RlbmVyKG1lc3NhZ2VIYW5kbGVyKTtcbiAgICAgICAgY3VycmVudFBvcnQuZGlzY29ubmVjdCgpO1xuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY29ubmVjdGluZyB0byBwb3B1cDonLCBlcnJvcik7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlU2V0dGluZ3NTYXZlID0gKG5ld1NldHRpbmdzKSA9PiB7XG4gICAgc2V0U2V0dGluZ3MobmV3U2V0dGluZ3MpO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IHNldHRpbmdzOiBuZXdTZXR0aW5ncyB9KTtcbiAgICBwb3J0LnBvc3RNZXNzYWdlKHtcbiAgICAgIGFjdGlvbjogXCJ1cGRhdGVTZXR0aW5nc1wiLFxuICAgICAgc2V0dGluZ3M6IG5ld1NldHRpbmdzXG4gICAgfSk7XG4gICAgaWYgKCF0aW1lclN0YXRlLmlzUnVubmluZykge1xuICAgICAgc2V0VGltZXJTdGF0ZShwcmV2ID0+ICh7XG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIHRpbWVMZWZ0OiBwcmV2LmlzQnJlYWsgPyBuZXdTZXR0aW5ncy5icmVha0R1cmF0aW9uIDogbmV3U2V0dGluZ3MuZm9jdXNEdXJhdGlvblxuICAgICAgfSkpO1xuICAgIH1cbiAgICBzZXRTaG93U2V0dGluZ3MoZmFsc2UpO1xuICB9O1xuXG4gIC8vIFlvdXIgZXhpc3RpbmcgaGFuZGxlcnMgcmVtYWluIHRoZSBzYW1lXG4gIGNvbnN0IGhhbmRsZVN0YXJ0VGltZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFzayA9IHRhc2tJbnB1dC50cmltKCkgfHwgY3VycmVudFRhc2s7XG4gICAgaWYgKCF0YXNrKSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgaW5pdGlhbFRpbWUgPSB0aW1lclN0YXRlLmlzQnJlYWsgPyBcbiAgICAgIHNldHRpbmdzLmJyZWFrRHVyYXRpb24gOiBcbiAgICAgIHNldHRpbmdzLmZvY3VzRHVyYXRpb247XG4gICAgXG4gICAgLy8gU2V0IGxvY2FsIHN0YXRlIGZpcnN0XG4gICAgc2V0VGltZXJTdGF0ZShwcmV2ID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgaXNSdW5uaW5nOiB0cnVlLFxuICAgICAgdGltZUxlZnQ6IGluaXRpYWxUaW1lLFxuICAgICAgY3VycmVudFRhc2s6IHRhc2ssXG4gICAgICBpc0NvbXBsZXRlZDogZmFsc2VcbiAgICB9KSk7XG4gICAgXG4gICAgLy8gVGhlbiBub3RpZnkgYmFja2dyb3VuZFxuICAgIHBvcnQucG9zdE1lc3NhZ2UoeyBcbiAgICAgIGFjdGlvbjogXCJzdGFydFRpbWVyXCIsXG4gICAgICB0YXNrOiB0YXNrLFxuICAgICAgZm9jdXNEdXJhdGlvbjogc2V0dGluZ3MuZm9jdXNEdXJhdGlvbixcbiAgICAgIGluaXRpYWxUaW1lOiBpbml0aWFsVGltZVxuICAgIH0pO1xuICAgIFxuICAgIHNldEN1cnJlbnRUYXNrKHRhc2spO1xuICAgIHNldFRhc2tJbnB1dCgnJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlS2V5UHJlc3MgPSAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyAmJiAodGFza0lucHV0LnRyaW0oKSB8fCBjdXJyZW50VGFzaykpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGhhbmRsZVN0YXJ0VGltZXIoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU3RhcnRCcmVhayA9ICgpID0+IHtcbiAgICBwb3J0LnBvc3RNZXNzYWdlKHsgXG4gICAgICBhY3Rpb246IFwic3RhcnRCcmVha1wiLFxuICAgICAgc2V0dGluZ3M6IHNldHRpbmdzXG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ29tcGxldGUgPSAoc3RhcnRCcmVhayA9IHRydWUpID0+IHtcbiAgICBpZiAoc3RhcnRCcmVhaykge1xuICAgICAgaGFuZGxlQnJlYWtUcmFuc2l0aW9uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVyU3RhdGUocHJldiA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBpc0NvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgIGlzUnVubmluZzogZmFsc2UsXG4gICAgICAgIHRpbWVMZWZ0OiBzZXR0aW5ncy5mb2N1c0R1cmF0aW9uXG4gICAgICB9KSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVN0YXRlVHJhbnNpdGlvbiA9IChmcm9tLCB0bykgPT4ge1xuICAgIHNldFRyYW5zaXRpb24oe1xuICAgICAgdHlwZTogJ2V4aXQnLFxuICAgICAgaXNBbmltYXRpbmc6IHRydWVcbiAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gVXBkYXRlIHN0YXRlIGhlcmVcbiAgICAgIHNldFRyYW5zaXRpb24oe1xuICAgICAgICB0eXBlOiAnZW50ZXInLFxuICAgICAgICBpc0FuaW1hdGluZzogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZXRUcmFuc2l0aW9uKHtcbiAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgIGlzQW5pbWF0aW5nOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfSwgMzAwKTtcbiAgfTtcblxuICBjb25zdCBnZXRUcmFuc2l0aW9uQ2xhc3MgPSAoY29tcG9uZW50VHlwZSkgPT4ge1xuICAgIGlmICghdHJhbnNpdGlvbi5pc0FuaW1hdGluZykgcmV0dXJuICcnO1xuICAgIFxuICAgIHJldHVybiBgdHJhbnNpdGlvbi0ke3RyYW5zaXRpb24udHlwZX0gJHtcbiAgICAgIGNvbXBvbmVudFR5cGUgPT09ICdjdXJyZW50JyA/ICdjdXJyZW50JyA6ICduZXh0J1xuICAgIH1gO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUJyZWFrU3RhcnQgPSAoKSA9PiB7XG4gICAgaGFuZGxlU3RhdGVUcmFuc2l0aW9uKCdmb2N1cycsICdicmVhaycpO1xuICAgIHNldFRpbWVyU3RhdGUocHJldiA9PiAoe1xuICAgICAgLi4ucHJldixcbiAgICAgIHR5cGU6ICdicmVhaycsXG4gICAgICB0aW1lTGVmdDogc2V0dGluZ3MuYnJlYWtEdXJhdGlvbixcbiAgICAgIGlzUnVubmluZzogdHJ1ZVxuICAgIH0pKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZXNzaW9uQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgaGFuZGxlU3RhdGVUcmFuc2l0aW9uKCdmb2N1cycsICdjb21wbGV0ZWQnKTtcbiAgICBwb3J0LnBvc3RNZXNzYWdlKHtcbiAgICAgIGFjdGlvbjogXCJjb21wbGV0ZVNlc3Npb25cIixcbiAgICAgIHRhc2s6IGN1cnJlbnRUYXNrXG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQnJlYWtTa2lwID0gKCkgPT4ge1xuICAgIGhhbmRsZVN0YXRlVHJhbnNpdGlvbignYnJlYWsnLCAnZm9jdXMnKTtcbiAgICBwb3J0LnBvc3RNZXNzYWdlKHtcbiAgICAgIGFjdGlvbjogXCJza2lwQnJlYWtcIlxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUJyZWFrQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgaGFuZGxlU3RhdGVUcmFuc2l0aW9uKCdicmVhaycsICdmb2N1cycpO1xuICAgIHBvcnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgYWN0aW9uOiBcImNvbXBsZXRlQnJlYWtcIlxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlc2V0ID0gKCkgPT4ge1xuICAgIGlmICh3aW5kb3cuY29uZmlybSgnUmVzZXQgdGltZXI/IEN1cnJlbnQgc2Vzc2lvbiBwcm9ncmVzcyB3aWxsIGJlIGxvc3QuJykpIHtcbiAgICAgIGNvbnN0IGluaXRpYWxEdXJhdGlvbiA9IHRpbWVyU3RhdGUuaXNCcmVhayA/IFxuICAgICAgICBzZXR0aW5ncy5icmVha0R1cmF0aW9uIDogXG4gICAgICAgIHNldHRpbmdzLmZvY3VzRHVyYXRpb247XG4gICAgICBcbiAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyBcbiAgICAgICAgYWN0aW9uOiAncmVzZXRUaW1lcicsXG4gICAgICAgIGR1cmF0aW9uOiBpbml0aWFsRHVyYXRpb25cbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBzZXRUaW1lclN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgdGltZUxlZnQ6IGluaXRpYWxEdXJhdGlvbixcbiAgICAgICAgaXNSdW5uaW5nOiBmYWxzZVxuICAgICAgfSkpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVCcmVha1RyYW5zaXRpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgbmV4dER1cmF0aW9uID0gdGltZXJTdGF0ZS5pc0JyZWFrID8gXG4gICAgICBzZXR0aW5ncy5mb2N1c0R1cmF0aW9uIDogXG4gICAgICBzZXR0aW5ncy5icmVha0R1cmF0aW9uO1xuICAgICAgXG4gICAgc2V0VGltZXJTdGF0ZShwcmV2ID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgaXNCcmVhazogIXByZXYuaXNCcmVhayxcbiAgICAgIHRpbWVMZWZ0OiBuZXh0RHVyYXRpb24sXG4gICAgICBpc1J1bm5pbmc6IGZhbHNlXG4gICAgfSkpO1xuXG4gICAgcG9ydC5wb3N0TWVzc2FnZSh7XG4gICAgICBhY3Rpb246ICdzd2l0Y2hQaGFzZScsXG4gICAgICBpc0JyZWFrOiAhdGltZXJTdGF0ZS5pc0JyZWFrLFxuICAgICAgZHVyYXRpb246IG5leHREdXJhdGlvblxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVBhdXNlID0gKCkgPT4ge1xuICAgIGlmICh0aW1lclN0YXRlLmlzUnVubmluZykge1xuICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7IFxuICAgICAgICBhY3Rpb246ICdwYXVzZVRpbWVyJyxcbiAgICAgICAgY3VycmVudFRpbWU6IHRpbWVyU3RhdGUudGltZUxlZnRcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBzZXRUaW1lclN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgaXNSdW5uaW5nOiBmYWxzZVxuICAgICAgfSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgXG4gICAgICAgIGFjdGlvbjogJ3Jlc3VtZVRpbWVyJyxcbiAgICAgICAgY3VycmVudFRpbWU6IHRpbWVyU3RhdGUudGltZUxlZnRcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBzZXRUaW1lclN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgaXNSdW5uaW5nOiB0cnVlXG4gICAgICB9KSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEVycm9yQm91bmRhcnk+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcC1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ28tY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICBzcmM9XCJpY29ucy9FdmlsX1RvbWF0by5naWZcIiBcbiAgICAgICAgICAgICAgYWx0PVwiUG9seWRvbW9cIiBcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgbG9nby1naWYgJHt0aW1lclN0YXRlLmlzUnVubmluZyA/ICdhY3RpdmUnIDogJyd9YH0gXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImFwcC10aXRsZVwiPlBvbHlkb21vPC9oMT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwic2V0dGluZ3MtdHJpZ2dlclwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93U2V0dGluZ3ModHJ1ZSl9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiU2V0dGluZ3NcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdmcgXG4gICAgICAgICAgICAgIHdpZHRoPVwiMjRcIiBcbiAgICAgICAgICAgICAgaGVpZ2h0PVwiMjRcIiBcbiAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiIFxuICAgICAgICAgICAgICBmaWxsPVwibm9uZVwiIFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzZXR0aW5ncy1pY29uXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHBhdGggXG4gICAgICAgICAgICAgICAgZD1cIk0xMiAxNUMxMy42NTY5IDE1IDE1IDEzLjY1NjkgMTUgMTJDMTUgMTAuMzQzMSAxMy42NTY5IDkgMTIgOUMxMC4zNDMxIDkgOSAxMC4zNDMxIDkgMTJDOSAxMy42NTY5IDEwLjM0MzEgMTUgMTIgMTVaXCIgXG4gICAgICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIyXCIgXG4gICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgXG4gICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxwYXRoIFxuICAgICAgICAgICAgICAgIGQ9XCJNMTkuNCAxNUMxOS4yNjY5IDE1LjMwMTYgMTkuMjI3MiAxNS42MzYyIDE5LjI4NiAxNS45NjA2QzE5LjM0NDggMTYuMjg1IDE5LjQ5OTUgMTYuNTg0MyAxOS43MyAxNi44MkwxOS43OSAxNi44OEMxOS45NzYgMTcuMDY1NyAyMC4xMjM1IDE3LjI4NjMgMjAuMjI0MSAxNy41MjkxQzIwLjMyNDggMTcuNzcxOSAyMC4zNzY2IDE4LjAzMjIgMjAuMzc2NiAxOC4yOTVDMjAuMzc2NiAxOC41NTc4IDIwLjMyNDggMTguODE4MSAyMC4yMjQxIDE5LjA2MDlDMjAuMTIzNSAxOS4zMDM3IDE5Ljk3NiAxOS41MjQzIDE5Ljc5IDE5LjcxQzE5LjYwNDMgMTkuODk2IDE5LjM4MzcgMjAuMDQzNSAxOS4xNDA5IDIwLjE0NDFDMTguODk4MSAyMC4yNDQ4IDE4LjYzNzggMjAuMjk2NiAxOC4zNzUgMjAuMjk2NkMxOC4xMTIyIDIwLjI5NjYgMTcuODUxOSAyMC4yNDQ4IDE3LjYwOTEgMjAuMTQ0MUMxNy4zNjYzIDIwLjA0MzUgMTcuMTQ1NyAxOS44OTYgMTYuOTYgMTkuNzFMMTYuOSAxOS42NUMxNi42NjQzIDE5LjQxOTUgMTYuMzY1IDE5LjI2NDggMTYuMDQwNiAxOS4yMDZDMTUuNzE2MiAxOS4xNDcyIDE1LjM4MTYgMTkuMTg2OSAxNS4wOCAxOS4zMkMxNC43ODQyIDE5LjQ0NjggMTQuNTMyIDE5LjY1NzIgMTQuMzU0MyAxOS45MjU1QzE0LjE3NjYgMjAuMTkzOCAxNC4wODEzIDIwLjUwODIgMTQuMDggMjAuODNWMjFDMTQuMDggMjEuNTMwNCAxMy44NjkzIDIyLjAzOTEgMTMuNDk0MiAyMi40MTQyQzEzLjExOTEgMjIuNzg5MyAxMi42MTA0IDIzIDEyLjA4IDIzQzExLjU0OTYgMjMgMTEuMDQwOSAyMi43ODkzIDEwLjY2NTggMjIuNDE0MkMxMC4yOTA3IDIyLjAzOTEgMTAuMDggMjEuNTMwNCAxMC4wOCAyMVYyMC45MUMxMC4wNzIzIDIwLjU3OSA5Ljk2NTEyIDIwLjI1OCA5Ljc3MjUxIDE5Ljk4ODdDOS41Nzk5IDE5LjcxOTQgOS4zMTA3NCAxOS41MTQzIDkgMTkuNEM4LjY5ODM4IDE5LjI2NjkgOC4zNjM4MSAxOS4yMjcyIDguMDM5NDEgMTkuMjg2QzcuNzE1MDIgMTkuMzQ0OCA3LjQxNTY4IDE5LjQ5OTUgNy4xOCAxOS43M0w3LjEyIDE5Ljc5QzYuOTM0MjUgMTkuOTc2IDYuNzEzNjggMjAuMTIzNSA2LjQ3MDg4IDIwLjIyNDFDNi4yMjgwOCAyMC4zMjQ4IDUuOTY3ODMgMjAuMzc2NiA1LjcwNSAyMC4zNzY2QzUuNDQyMTcgMjAuMzc2NiA1LjE4MTkyIDIwLjMyNDggNC45MzkxMiAyMC4yMjQxQzQuNjk2MzIgMjAuMTIzNSA0LjQ3NTc1IDE5Ljk3NiA0LjI5IDE5Ljc5QzQuMTA0MDUgMTkuNjA0MyAzLjk1NjUzIDE5LjM4MzcgMy44NTU4OCAxOS4xNDA5QzMuNzU1MjMgMTguODk4MSAzLjcwMzQzIDE4LjYzNzggMy43MDM0MyAxOC4zNzVDMy43MDM0MyAxOC4xMTIyIDMuNzU1MjMgMTcuODUxOSAzLjg1NTg4IDE3LjYwOTFDMy45NTY1MyAxNy4zNjYzIDQuMTA0MDUgMTcuMTQ1NyA0LjI5IDE2Ljk2TDQuMzUgMTYuOUM0LjU4MDU0IDE2LjY2NDMgNC43MzUxOSAxNi4zNjUgNC43OTQgMTYuMDQwNkM0Ljg1MjgyIDE1LjcxNjIgNC44MTMxMiAxNS4zODE2IDQuNjggMTUuMDhDNC41NTMyNCAxNC43ODQyIDQuMzQyNzYgMTQuNTMyIDQuMDc0NDcgMTQuMzU0M0MzLjgwNjE4IDE0LjE3NjYgMy40OTE3OSAxNC4wODEzIDMuMTcgMTQuMDhIM0MyLjQ2OTU3IDE0LjA4IDEuOTYwODYgMTMuODY5MyAxLjU4NTc5IDEzLjQ5NDJDMS4yMTA3MSAxMy4xMTkxIDEgMTIuNjEwNCAxIDEyLjA4QzEgMTEuNTQ5NiAxLjIxMDcxIDExLjA0MDkgMS41ODU3OSAxMC42NjU4QzEuOTYwODYgMTAuMjkwNyAyLjQ2OTU3IDEwLjA4IDMgMTAuMDhIMy4wOUMzLjQyMDk5IDEwLjA3MjMgMy43NDIgOS45NjUxMiA0LjAxMTMgOS43NzI1MUM0LjI4MDU5IDkuNTc5OSA0LjQ4NTcyIDkuMzEwNzQgNC42IDlDNC43MzMxMiA4LjY5ODM4IDQuNzcyODIgOC4zNjM4MSA0LjcxNCA4LjAzOTQxQzQuNjU1MTkgNy43MTUwMiA0LjUwMDU0IDcuNDE1NjggNC4yNyA3LjE4TDQuMjEgNy4xMkM0LjAyNDA1IDYuOTM0MjUgMy44NzY1MyA2LjcxMzY4IDMuNzc1ODggNi40NzA4OEMzLjY3NTIzIDYuMjI4MDggMy42MjM0MyA1Ljk2NzgzIDMuNjIzNDMgNS43MDVDMy42MjM0MyA1LjQ0MjE3IDMuNjc1MjMgNS4xODE5MiAzLjc3NTg4IDQuOTM5MTJDMy44NzY1MyA0LjY5NjMyIDQuMDI0MDUgNC40NzU3NSA0LjIxIDQuMjlDNC4zOTU3NSA0LjEwNDA1IDQuNjE2MzIgMy45NTY1MyA0Ljg1OTEyIDMuODU1ODhDNS4xMDE5MiAzLjc1NTIzIDUuMzYyMTcgMy43MDM0MyA1LjYyNSAzLjcwMzQzQzUuODg3ODMgMy43MDM0MyA2LjE0ODA4IDMuNzU1MjMgNi4zOTA4OCAzLjg1NTg4QzYuNjMzNjggMy45NTY1MyA2Ljg1NDI1IDQuMTA0MDUgNy4wNCA0LjI5TDcuMSA0LjM1QzcuMzM1NjggNC41ODA1NCA3LjYzNTAyIDQuNzM1MTkgNy45NTk0MSA0Ljc5NEM4LjI4MzgxIDQuODUyODIgOC42MTgzOCA0LjgxMzEyIDguOTIgNC42OEg5QzkuMjk1NzcgNC41NTMyNCA5LjU0ODAyIDQuMzQyNzYgOS43MjU2OSA0LjA3NDQ3QzkuOTAzMzcgMy44MDYxOCA5Ljk5ODcyIDMuNDkxNzkgMTAgMy4xN1YzQzEwIDIuNDY5NTcgMTAuMjEwNyAxLjk2MDg2IDEwLjU4NTggMS41ODU3OUMxMC45NjA5IDEuMjEwNzEgMTEuNDY5NiAxIDEyIDFDMTIuNTMwNCAxIDEzLjAzOTEgMS4yMTA3MSAxMy40MTQyIDEuNTg1NzlDMTMuNzg5MyAxLjk2MDg2IDE0IDIuNDY5NTcgMTQgM1YzLjA5QzE0LjAwMTMgMy40MTE3OSAxNC4wOTY2IDMuNzI2MTggMTQuMjc0MyAzLjk5NDQ3QzE0LjQ1MiA0LjI2Mjc2IDE0LjcwNDIgNC40NzMyNCAxNSA0LjZDMTUuMzAxNiA0LjczMzEyIDE1LjYzNjIgNC43NzI4MiAxNS45NjA2IDQuNzE0QzE2LjI4NSA0LjY1NTE5IDE2LjU4NDMgNC41MDA1NCAxNi44MiA0LjI3TDE2Ljg4IDQuMjFDMTcuMDY1NyA0LjAyNDA1IDE3LjI4NjMgMy44NzY1MyAxNy41MjkxIDMuNzc1ODhDMTcuNzcxOSAzLjY3NTIzIDE4LjAzMjIgMy42MjM0MyAxOC4yOTUgMy42MjM0M0MxOC41NTc4IDMuNjIzNDMgMTguODE4MSAzLjY3NTIzIDE5LjA2MDkgMy43NzU4OEMxOS4zMDM3IDMuODc2NTMgMTkuNTI0MyA0LjAyNDA1IDE5LjcxIDQuMjFDMTkuODk2IDQuMzk1NzUgMjAuMDQzNSA0LjYxNjMyIDIwLjE0NDEgNC44NTkxMkMyMC4yNDQ4IDUuMTAxOTIgMjAuMjk2NiA1LjM2MjE3IDIwLjI5NjYgNS42MjVDMjAuMjk2NiA1Ljg4NzgzIDIwLjI0NDggNi4xNDgwOCAyMC4xNDQxIDYuMzkwODhDMjAuMDQzNSA2LjYzMzY4IDE5Ljg5NiA2Ljg1NDI1IDE5LjcxIDcuMDRMMTkuNjUgNy4xQzE5LjQxOTUgNy4zMzU2OCAxOS4yNjQ4IDcuNjM1MDIgMTkuMjA2IDcuOTU5NDFDMTkuMTQ3MiA4LjI4MzgxIDE5LjE4NjkgOC42MTgzOCAxOS4zMiA4LjkyVjlDMTkuNDQ2OCA5LjI5NTc3IDE5LjY1NzIgOS41NDgwMiAxOS45MjU1IDkuNzI1NjlDMjAuMTkzOCA5LjkwMzM3IDIwLjUwODIgOS45OTg3MiAyMC44MyAxMEgyMUMyMS41MzA0IDEwIDIyLjAzOTEgMTAuMjEwNyAyMi40MTQyIDEwLjU4NThDMjIuNzg5MyAxMC45NjA5IDIzIDExLjQ2OTYgMjMgMTJDMjMgMTIuNTMwNCAyMi43ODkzIDEzLjAzOTEgMjIuNDE0MiAxMy40MTQyQzIyLjAzOTEgMTMuNzg5MyAyMS41MzA0IDE0IDIxIDE0SDIwLjkxQzIwLjU4ODIgMTQuMDAxMyAyMC4yNzM4IDE0LjA5NjYgMjAuMDA1NSAxNC4yNzQzQzE5LjczNzIgMTQuNDUyIDE5LjUyNjggMTQuNzA0MiAxOS40IDE1WlwiIFxuICAgICAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIFxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMlwiIFxuICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIFxuICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHshdGltZXJTdGF0ZS5pc1J1bm5pbmcgJiYgIXRpbWVyU3RhdGUuaXNDb21wbGV0ZWQgJiYgKFxuICAgICAgICAgIDxUYXNrUGFuZWxcbiAgICAgICAgICAgIHRhc2tJbnB1dD17dGFza0lucHV0fVxuICAgICAgICAgICAgc2V0VGFza0lucHV0PXtzZXRUYXNrSW5wdXR9XG4gICAgICAgICAgICBoYW5kbGVTdGFydFRpbWVyPXtoYW5kbGVTdGFydFRpbWVyfVxuICAgICAgICAgICAgaXNWaXNpYmxlPXt0cnVlfVxuICAgICAgICAgICAgaXNCcmVhaz17dGltZXJTdGF0ZS5pc0JyZWFrfVxuICAgICAgICAgICAgaGFuZGxlS2V5UHJlc3M9e2hhbmRsZUtleVByZXNzfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAge3RpbWVyU3RhdGUuaXNSdW5uaW5nICYmIChcbiAgICAgICAgICA8VGltZXJcbiAgICAgICAgICAgIHRpbWVMZWZ0PXt0aW1lclN0YXRlLnRpbWVMZWZ0fVxuICAgICAgICAgICAgaXNCcmVhaz17dGltZXJTdGF0ZS5pc0JyZWFrfVxuICAgICAgICAgICAgaXNSdW5uaW5nPXt0aW1lclN0YXRlLmlzUnVubmluZ31cbiAgICAgICAgICAgIGN1cnJlbnRUYXNrPXtjdXJyZW50VGFza31cbiAgICAgICAgICAgIG9uQ29tcGxldGU9e2hhbmRsZUNvbXBsZXRlfVxuICAgICAgICAgICAgc2V0dGluZ3M9e3NldHRpbmdzfVxuICAgICAgICAgICAgb25QYXVzZT17aGFuZGxlUGF1c2V9XG4gICAgICAgICAgICBvblJlc2V0PXtoYW5kbGVSZXNldH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Z2V0VHJhbnNpdGlvbkNsYXNzKCdjdXJyZW50Jyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cblxuICAgICAgICB7dGltZXJTdGF0ZS5pc0NvbXBsZXRlZCAmJiAoXG4gICAgICAgICAgPFN0YXRzRGlzcGxheSBcbiAgICAgICAgICAgIHN0YXRzPXt0aW1lclN0YXRlLnN0YXRzfVxuICAgICAgICAgICAgY3VycmVudFRhc2s9e2N1cnJlbnRUYXNrfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAgPFNldHRpbmdzTW9kYWwgXG4gICAgICAgICAgaXNPcGVuPXtzaG93U2V0dGluZ3N9XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0U2hvd1NldHRpbmdzKGZhbHNlKX1cbiAgICAgICAgICBzZXR0aW5ncz17c2V0dGluZ3N9XG4gICAgICAgICAgb25TYXZlPXtoYW5kbGVTZXR0aW5nc1NhdmV9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L0Vycm9yQm91bmRhcnk+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHA7IiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNvbnN0IFNldHRpbmdzTW9kYWwgPSAoeyBpc09wZW4sIG9uQ2xvc2UsIHNldHRpbmdzLCBvblNhdmUgfSkgPT4ge1xuICBjb25zdCBbbG9jYWxTZXR0aW5ncywgc2V0TG9jYWxTZXR0aW5nc10gPSB1c2VTdGF0ZShzZXR0aW5ncyk7XG4gIGNvbnN0IFtzaG93RmVlZGJhY2ssIHNldFNob3dGZWVkYmFja10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtmZWVkYmFja0RhdGEsIHNldEZlZWRiYWNrRGF0YV0gPSB1c2VTdGF0ZSh7XG4gICAgZW1haWw6ICcnLFxuICAgIGZlZWRiYWNrVHlwZTogJ2dlbmVyYWwnLFxuICAgIG1lc3NhZ2U6ICcnXG4gIH0pO1xuICBjb25zdCBbZmVlZGJhY2tTdGF0dXMsIHNldEZlZWRiYWNrU3RhdHVzXSA9IHVzZVN0YXRlKHtcbiAgICBtZXNzYWdlOiAnJyxcbiAgICB0eXBlOiAnJ1xuICB9KTtcbiAgY29uc3QgW2lzU3VibWl0dGluZywgc2V0SXNTdWJtaXR0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldExvY2FsU2V0dGluZ3Moc2V0dGluZ3MpO1xuICB9LCBbc2V0dGluZ3NdKTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBvblNhdmUobG9jYWxTZXR0aW5ncyk7XG4gICAgb25DbG9zZSgpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUZlZWRiYWNrU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgc2V0SXNTdWJtaXR0aW5nKHRydWUpO1xuICAgIFxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL2ZlZWRiYWNrJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAuLi5mZWVkYmFja0RhdGEsXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgc3lzdGVtSW5mbzoge1xuICAgICAgICAgICAgdmVyc2lvbjogJzEuMC4wJyxcbiAgICAgICAgICAgIGJyb3dzZXI6IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHNldEZlZWRiYWNrU3RhdHVzKHtcbiAgICAgICAgICBtZXNzYWdlOiAnVGhhbmsgeW91IGZvciB5b3VyIGZlZWRiYWNrIScsXG4gICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBzZXRTaG93RmVlZGJhY2soZmFsc2UpO1xuICAgICAgICAgIHNldEZlZWRiYWNrRGF0YSh7XG4gICAgICAgICAgICBlbWFpbDogJycsXG4gICAgICAgICAgICBmZWVkYmFja1R5cGU6ICdnZW5lcmFsJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgc2V0RmVlZGJhY2tTdGF0dXMoe1xuICAgICAgICAgIG1lc3NhZ2U6IGRhdGEuZXJyb3IgfHwgJ0ZhaWxlZCB0byBzZW5kIGZlZWRiYWNrJyxcbiAgICAgICAgICB0eXBlOiAnZXJyb3InXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzdWJtaXR0aW5nIGZlZWRiYWNrOicsIGVycm9yKTtcbiAgICAgIHNldEZlZWRiYWNrU3RhdHVzKHtcbiAgICAgICAgbWVzc2FnZTogJ0ZhaWxlZCB0byBzZW5kIGZlZWRiYWNrLiBQbGVhc2UgdHJ5IGFnYWluLicsXG4gICAgICAgIHR5cGU6ICdlcnJvcidcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc1N1Ym1pdHRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBpZiAoIWlzT3BlbikgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLW92ZXJsYXlcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgIDxoMz57c2hvd0ZlZWRiYWNrID8gJ1NlbmQgRmVlZGJhY2snIDogJ1NldHRpbmdzJ308L2gzPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiaWNvbi1idG5cIiBvbkNsaWNrPXtvbkNsb3NlfT7DlzwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgIHshc2hvd0ZlZWRiYWNrID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZXR0aW5ncy1jb250ZW50XCI+XG4gICAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IGNsYXNzTmFtZT1cInNldHRpbmdzLWZvcm1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZm9jdXNEdXJhdGlvblwiPkZvY3VzIER1cmF0aW9uIChtaW51dGVzKTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgIGlkPVwiZm9jdXNEdXJhdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0taW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bG9jYWxTZXR0aW5ncy5mb2N1c0R1cmF0aW9uIC8gNjB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TG9jYWxTZXR0aW5ncyh7XG4gICAgICAgICAgICAgICAgICAgICAgLi4ubG9jYWxTZXR0aW5ncyxcbiAgICAgICAgICAgICAgICAgICAgICBmb2N1c0R1cmF0aW9uOiBNYXRoLm1heCgxLCBNYXRoLm1pbig2MCwgZS50YXJnZXQudmFsdWUpKSAqIDYwXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBtaW49XCIxXCJcbiAgICAgICAgICAgICAgICAgICAgbWF4PVwiNjBcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJicmVha0R1cmF0aW9uXCI+QnJlYWsgRHVyYXRpb24gKG1pbnV0ZXMpPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgaWQ9XCJicmVha0R1cmF0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtsb2NhbFNldHRpbmdzLmJyZWFrRHVyYXRpb24gLyA2MH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRMb2NhbFNldHRpbmdzKHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5sb2NhbFNldHRpbmdzLFxuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrRHVyYXRpb246IE1hdGgubWF4KDEsIE1hdGgubWluKDMwLCBlLnRhcmdldC52YWx1ZSkpICogNjBcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIG1pbj1cIjFcIlxuICAgICAgICAgICAgICAgICAgICBtYXg9XCIzMFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIiBcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZlZWRiYWNrLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93RmVlZGJhY2sodHJ1ZSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgU2VuZCBGZWVkYmFja1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2V0dGluZ3MtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwic2Vjb25kYXJ5LWJ1dHRvblwiIG9uQ2xpY2s9e29uQ2xvc2V9PlxuICAgICAgICAgICAgICAgICAgICBDYW5jZWxcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwicHJpbWFyeS1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgU2F2ZSBDaGFuZ2VzXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVGZWVkYmFja1N1Ym1pdH0gY2xhc3NOYW1lPVwiZmVlZGJhY2stZm9ybVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImVtYWlsXCI+RW1haWwgKG9wdGlvbmFsKTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgaWQ9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWlucHV0XCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtmZWVkYmFja0RhdGEuZW1haWx9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEZlZWRiYWNrRGF0YSh7IC4uLmZlZWRiYWNrRGF0YSwgZW1haWw6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ5b3VyQGVtYWlsLmNvbVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJmZWVkYmFja1R5cGVcIj5GZWVkYmFjayBUeXBlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICBpZD1cImZlZWRiYWNrVHlwZVwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLXNlbGVjdFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17ZmVlZGJhY2tEYXRhLmZlZWRiYWNrVHlwZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RmVlZGJhY2tEYXRhKHsgLi4uZmVlZGJhY2tEYXRhLCBmZWVkYmFja1R5cGU6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJnZW5lcmFsXCI+R2VuZXJhbCBGZWVkYmFjazwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJ1Z1wiPlJlcG9ydCBhIEJ1Zzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImZlYXR1cmVcIj5GZWF0dXJlIFJlcXVlc3Q8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJtZXNzYWdlXCI+TWVzc2FnZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICBpZD1cIm1lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS10ZXh0YXJlYVwiXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2ZlZWRiYWNrRGF0YS5tZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRGZWVkYmFja0RhdGEoeyAuLi5mZWVkYmFja0RhdGEsIG1lc3NhZ2U6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUZWxsIHVzIHdoYXQgeW91IHRoaW5rLi4uXCJcbiAgICAgICAgICAgICAgICAgIHJvd3M9ezR9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAge2ZlZWRiYWNrU3RhdHVzLm1lc3NhZ2UgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgc3RhdHVzLW1lc3NhZ2UgJHtmZWVkYmFja1N0YXR1cy50eXBlfWB9PlxuICAgICAgICAgICAgICAgICAge2ZlZWRiYWNrU3RhdHVzLm1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiIFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic2Vjb25kYXJ5LWJ1dHRvblwiIFxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd0ZlZWRiYWNrKGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc1N1Ym1pdHRpbmd9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgQmFja1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCIgXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwcmltYXJ5LWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNTdWJtaXR0aW5nfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpc1N1Ym1pdHRpbmcgPyAnU2VuZGluZy4uLicgOiAnU2VuZCBGZWVkYmFjayd9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59OyAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgY29uc3QgU3RhdHNEaXNwbGF5ID0gKHsgc3RhdHMsIGN1cnJlbnRUYXNrLCBvblN0YXJ0QnJlYWssIG9uTmV3U2Vzc2lvbiB9KSA9PiB7XG4gIC8vIEVuc3VyZSBzYWZlIGRlZmF1bHRzIGZvciBhbGwgc3RhdHNcbiAgY29uc3Qgc2FmZVN0YXRzID0ge1xuICAgIHRvZGF5OiB7XG4gICAgICBwb21vZG9yb3M6IDAsXG4gICAgICB0b3RhbEZvY3VzTWludXRlczogMCxcbiAgICAgIC4uLnN0YXRzPy50b2RheVxuICAgIH0sXG4gICAgc3RyZWFrczoge1xuICAgICAgY3VycmVudDogMCxcbiAgICAgIC4uLnN0YXRzPy5zdHJlYWtzXG4gICAgfSxcbiAgICBkYWlseUdvYWw6IHN0YXRzPy5kYWlseUdvYWwgPz8gOFxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0cy1kaXNwbGF5LWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0cy1oZWFkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21wbGV0aW9uLWljb25cIj7inKg8L2Rpdj5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cInN0YXRzLXRpdGxlXCI+U2Vzc2lvbiBDb21wbGV0ZSE8L2gyPlxuICAgICAgICB7Y3VycmVudFRhc2sgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tcGxldGVkLXRhc2stZGlzcGxheVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGFzay1sYWJlbFwiPlRhc2sgQ29tcGxldGVkOjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRhc2stbmFtZVwiPntjdXJyZW50VGFza308L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0cy1ncmlkXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC1jYXJkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWljb25cIj7wn46vPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LXZhbHVlXCI+e3NhZmVTdGF0cy50b2RheS5wb21vZG9yb3N9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWxhYmVsXCI+VG9kYXkncyBTZXNzaW9uczwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtY2FyZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC1pY29uXCI+8J+UpTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC12YWx1ZVwiPntzYWZlU3RhdHMuc3RyZWFrcy5jdXJyZW50fTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC1sYWJlbFwiPkRheSBTdHJlYWs8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGF0LWNhcmRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXQtaWNvblwiPuKPse+4jzwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC12YWx1ZVwiPntzYWZlU3RhdHMudG9kYXkudG90YWxGb2N1c01pbnV0ZXN9bTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RhdC1sYWJlbFwiPlRvdGFsIEZvY3VzIFRpbWU8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYWlseS1wcm9ncmVzc1wiPlxuICAgICAgICA8aDMgY2xhc3NOYW1lPVwicHJvZ3Jlc3MtdGl0bGVcIj5EYWlseSBHb2FsIFByb2dyZXNzPC9oMz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9ncmVzcy1yaW5nLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMDAgMTAwXCI+XG4gICAgICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInByb2dyZXNzLXJpbmctYmdcIlxuICAgICAgICAgICAgICBjeD1cIjUwXCJcbiAgICAgICAgICAgICAgY3k9XCI1MFwiXG4gICAgICAgICAgICAgIHI9XCI0NVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGNpcmNsZVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwcm9ncmVzcy1yaW5nLXByb2dyZXNzXCJcbiAgICAgICAgICAgICAgY3g9XCI1MFwiXG4gICAgICAgICAgICAgIGN5PVwiNTBcIlxuICAgICAgICAgICAgICByPVwiNDVcIlxuICAgICAgICAgICAgICBzdHJva2VEYXNob2Zmc2V0PXtcbiAgICAgICAgICAgICAgICAyODMgKiAoMSAtIChzYWZlU3RhdHMudG9kYXkucG9tb2Rvcm9zIC8gc2FmZVN0YXRzLmRhaWx5R29hbCkpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9ncmVzcy10ZXh0XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdXJyZW50XCI+e3NhZmVTdGF0cy50b2RheS5wb21vZG9yb3N9PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2VwYXJhdG9yXCI+Lzwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdvYWxcIj57c2FmZVN0YXRzLmRhaWx5R29hbH08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aW9uLWJ1dHRvbnNcIj5cbiAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICBjbGFzc05hbWU9XCJhY3Rpb24tYnV0dG9uIGJyZWFrLWJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17b25TdGFydEJyZWFrfVxuICAgICAgICA+XG4gICAgICAgICAgVGFrZSBhIEJyZWFrICg1OjAwKVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICBjbGFzc05hbWU9XCJhY3Rpb24tYnV0dG9uIG5ldy1zZXNzaW9uLWJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17b25OZXdTZXNzaW9ufVxuICAgICAgICA+XG4gICAgICAgICAgU3RhcnQgTmV3IFNlc3Npb25cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07IiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgY29uc3QgVGFza1BhbmVsID0gKHsgXG4gIHRhc2tJbnB1dCxcbiAgc2V0VGFza0lucHV0LFxuICBoYW5kbGVTdGFydFRpbWVyLFxuICBpc1Zpc2libGUsXG4gIGlzQnJlYWssXG4gIGhhbmRsZUtleVByZXNzXG59KSA9PiB7XG4gIGNvbnN0IGlucHV0UmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzVmlzaWJsZSAmJiBpbnB1dFJlZi5jdXJyZW50KSB7XG4gICAgICBpbnB1dFJlZi5jdXJyZW50LmZvY3VzKCk7XG4gICAgfVxuICB9LCBbaXNWaXNpYmxlXSk7XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRhc2tJbnB1dC50cmltKCkpIHtcbiAgICAgIGhhbmRsZVN0YXJ0VGltZXIoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGlzVmlzaWJsZSA/IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YHRhc2stcGFuZWwgJHtpc0JyZWFrID8gJ2JyZWFrJyA6ICdmb2N1cyd9YH0+XG4gICAgICA8aDIgY2xhc3NOYW1lPVwidGFzay1wYW5lbC10aXRsZVwiPlxuICAgICAgICB7aXNCcmVhayA/ICdCcmVhayBUaW1lIScgOiAnV2hhdCBhcmUgeW91IGZvY3VzaW5nIG9uPyd9XG4gICAgICA8L2gyPlxuICAgICAgXG4gICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fSBjbGFzc05hbWU9XCJ0YXNrLWlucHV0LXdyYXBwZXJcIj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgcmVmPXtpbnB1dFJlZn1cbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwidGFzay1pbnB1dFwiXG4gICAgICAgICAgdmFsdWU9e3Rhc2tJbnB1dH1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFRhc2tJbnB1dChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgb25LZXlQcmVzcz17aGFuZGxlS2V5UHJlc3N9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e2lzQnJlYWsgPyAnVGFrZSBhIGJyZWF0aGVyLi4uJyA6ICdFbnRlciB5b3VyIGZvY3VzIHRhc2suLi4nfVxuICAgICAgICAgIGFyaWEtbGFiZWw9XCJUYXNrIGlucHV0XCJcbiAgICAgICAgLz5cbiAgICAgICAgXG4gICAgICAgIDxidXR0b24gXG4gICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtgc3RhcnQtYnV0dG9uICR7aXNCcmVhayA/ICdicmVhaycgOiAnZm9jdXMnfSAkeyF0YXNrSW5wdXQudHJpbSgpID8gJ2Rpc2FibGVkJyA6ICcnfWB9XG4gICAgICAgICAgZGlzYWJsZWQ9eyF0YXNrSW5wdXQudHJpbSgpfVxuICAgICAgICA+XG4gICAgICAgICAge2lzQnJlYWsgPyAnU3RhcnQgQnJlYWsnIDogJ1N0YXJ0IEZvY3VzIFNlc3Npb24nfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5cbiAgKSA6IG51bGw7XG59OyIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IFRpbWVyQ29udHJvbHMgPSAoeyBpc1J1bm5pbmcsIG9uUGF1c2UsIG9uUmVzZXQgfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZXItY29udHJvbHNcIj5cbiAgICAgIDxidXR0b24gXG4gICAgICAgIGNsYXNzTmFtZT1cInRpbWVyLWNvbnRyb2wtYnRuXCJcbiAgICAgICAgb25DbGljaz17b25QYXVzZX1cbiAgICAgICAgYXJpYS1sYWJlbD17aXNSdW5uaW5nID8gXCJQYXVzZSBUaW1lclwiIDogXCJSZXN1bWUgVGltZXJcIn1cbiAgICAgID5cbiAgICAgICAgPHN2ZyBcbiAgICAgICAgICB3aWR0aD1cIjI0XCIgXG4gICAgICAgICAgaGVpZ2h0PVwiMjRcIiBcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgXG4gICAgICAgICAgZmlsbD1cIm5vbmVcIiBcbiAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBcbiAgICAgICAgICBzdHJva2VXaWR0aD1cIjJcIlxuICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIFxuICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICA+XG4gICAgICAgICAge2lzUnVubmluZyA/IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxsaW5lIHgxPVwiMTBcIiB5MT1cIjZcIiB4Mj1cIjEwXCIgeTI9XCIxOFwiIC8+XG4gICAgICAgICAgICAgIDxsaW5lIHgxPVwiMTRcIiB5MT1cIjZcIiB4Mj1cIjE0XCIgeTI9XCIxOFwiIC8+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPHBvbHlnb24gcG9pbnRzPVwiNSAzIDE5IDEyIDUgMjEgNSAzXCIgLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICA8YnV0dG9uIFxuICAgICAgICBjbGFzc05hbWU9XCJ0aW1lci1jb250cm9sLWJ0blwiXG4gICAgICAgIG9uQ2xpY2s9e29uUmVzZXR9XG4gICAgICAgIGFyaWEtbGFiZWw9XCJSZXNldCBUaW1lclwiXG4gICAgICA+XG4gICAgICAgIDxzdmcgXG4gICAgICAgICAgd2lkdGg9XCIyNFwiIFxuICAgICAgICAgIGhlaWdodD1cIjI0XCIgXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiIFxuICAgICAgICAgIGZpbGw9XCJub25lXCIgXG4gICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgXG4gICAgICAgICAgc3Ryb2tlV2lkdGg9XCIyXCJcbiAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBcbiAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMyAxMmE5IDkgMCAxIDAgOS05IDkuNzUgOS43NSAwIDAgMC02Ljc0IDIuNzRMMyA4XCIgLz5cbiAgICAgICAgICA8cGF0aCBkPVwiTTMgM3Y1aDVcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IFRpbWVyID0gKHsgXG4gIHRpbWVMZWZ0LCBcbiAgaXNCcmVhaywgXG4gIGN1cnJlbnRUYXNrLFxuICBzZXR0aW5ncyxcbiAgb25Db21wbGV0ZSxcbiAgaXNSdW5uaW5nLFxuICBvblBhdXNlLFxuICBvblJlc2V0XG59KSA9PiB7XG4gIGNvbnN0IGZvcm1hdFRpbWUgPSAodG90YWxTZWNvbmRzKSA9PiB7XG4gICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gNjApO1xuICAgIGNvbnN0IHNlY29uZHMgPSB0b3RhbFNlY29uZHMgJSA2MDtcbiAgICByZXR1cm4gYCR7bWludXRlc306JHtzZWNvbmRzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX1gO1xuICB9O1xuXG4gIGNvbnN0IGNhbGN1bGF0ZVByb2dyZXNzID0gKCkgPT4ge1xuICAgIGNvbnN0IHRvdGFsVGltZSA9IGlzQnJlYWsgPyBzZXR0aW5ncy5icmVha0R1cmF0aW9uIDogc2V0dGluZ3MuZm9jdXNEdXJhdGlvbjtcbiAgICBjb25zdCBwcm9ncmVzcyA9ICgodG90YWxUaW1lIC0gdGltZUxlZnQpIC8gdG90YWxUaW1lKSAqIDEwMDtcbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgocHJvZ3Jlc3MsIDApLCAxMDApO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHRpbWVMZWZ0ID09PSAwICYmIGlzUnVubmluZykge1xuICAgICAgb25Db21wbGV0ZSgpO1xuICAgIH1cbiAgfSwgW3RpbWVMZWZ0LCBpc1J1bm5pbmcsIG9uQ29tcGxldGVdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtgdGltZXItZGlzcGxheS1jb250YWluZXIgJHtpc0JyZWFrID8gJ2JyZWFrJyA6ICdmb2N1cyd9YH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhc2staGVhZGVyXCI+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJjdXJyZW50LXRhc2stdGl0bGVcIj5cbiAgICAgICAgICB7aXNCcmVhayA/ICdCcmVhayBUaW1lJyA6IGN1cnJlbnRUYXNrfVxuICAgICAgICA8L2gyPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzZXNzaW9uLXR5cGVcIj5cbiAgICAgICAgICB7aXNCcmVhayA/ICdUaW1lIHRvIHJlbGF4JyA6ICdGb2N1cyBTZXNzaW9uJ31cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZXItY2lyY2xlXCI+XG4gICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAyMDAgMjAwXCIgY2xhc3NOYW1lPVwidGltZXItc3ZnXCI+XG4gICAgICAgICAgPGNpcmNsZVxuICAgICAgICAgICAgY3g9XCIxMDBcIlxuICAgICAgICAgICAgY3k9XCIxMDBcIlxuICAgICAgICAgICAgcj1cIjkwXCJcbiAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgIHN0cm9rZT17aXNCcmVhayA/ICd2YXIoLS1sZWFmLWxpZ2h0KScgOiAndmFyKC0tdG9tYXRvLWxpZ2h0KSd9XG4gICAgICAgICAgICBzdHJva2VXaWR0aD1cIjRcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidGltZXItY2lyY2xlLWJnXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxjaXJjbGVcbiAgICAgICAgICAgIGN4PVwiMTAwXCJcbiAgICAgICAgICAgIGN5PVwiMTAwXCJcbiAgICAgICAgICAgIHI9XCI5MFwiXG4gICAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgICBzdHJva2U9e2lzQnJlYWsgPyAndmFyKC0tbGVhZi1ncmVlbiknIDogJ3ZhcigtLXRvbWF0by1yZWQpJ31cbiAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiNFwiXG4gICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidGltZXItY2lyY2xlLXByb2dyZXNzXCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIHN0cm9rZURhc2hhcnJheTogYCR7MiAqIE1hdGguUEkgKiA5MH1gLFxuICAgICAgICAgICAgICBzdHJva2VEYXNob2Zmc2V0OiBgJHsyICogTWF0aC5QSSAqIDkwICogKDEgLSBjYWxjdWxhdGVQcm9ncmVzcygpIC8gMTAwKX1gXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRleHRcbiAgICAgICAgICAgIHg9XCIxMDBcIlxuICAgICAgICAgICAgeT1cIjEwMFwiXG4gICAgICAgICAgICB0ZXh0QW5jaG9yPVwibWlkZGxlXCJcbiAgICAgICAgICAgIGRvbWluYW50QmFzZWxpbmU9XCJtaWRkbGVcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidGltZXItdGV4dFwiXG4gICAgICAgICAgICBmaWxsPVwidmFyKC0tdGV4dC1wcmltYXJ5KVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2Zvcm1hdFRpbWUodGltZUxlZnQpfVxuICAgICAgICAgIDwvdGV4dD5cbiAgICAgICAgPC9zdmc+XG5cbiAgICAgICAgPFRpbWVyQ29udHJvbHMgXG4gICAgICAgICAgaXNSdW5uaW5nPXtpc1J1bm5pbmd9XG4gICAgICAgICAgb25QYXVzZT17b25QYXVzZX1cbiAgICAgICAgICBvblJlc2V0PXtvblJlc2V0fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59OyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjcmVhdGVSb290IH0gZnJvbSAncmVhY3QtZG9tL2NsaWVudCc7XG5pbXBvcnQgeyBBcHAgfSBmcm9tICcuL2NvbXBvbmVudHMvQXBwJztcbmltcG9ydCAnLi9zdHlsZXMuY3NzJztcblxuY2xhc3MgRXJyb3JCb3VuZGFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7IGhhc0Vycm9yOiBmYWxzZSwgZXJyb3I6IG51bGwgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoZXJyb3IpIHtcbiAgICByZXR1cm4geyBoYXNFcnJvcjogdHJ1ZSwgZXJyb3IgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZENhdGNoKGVycm9yLCBlcnJvckluZm8pIHtcbiAgICBjb25zb2xlLmVycm9yKCdSZWFjdCBFcnJvciBCb3VuZGFyeSBjYXVnaHQgYW4gZXJyb3I6JywgZXJyb3IsIGVycm9ySW5mbyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuaGFzRXJyb3IpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzIwcHgnLCBjb2xvcjogJ3JlZCcgfX0+XG4gICAgICAgICAgPGgyPlNvbWV0aGluZyB3ZW50IHdyb25nLjwvaDI+XG4gICAgICAgICAgPGRldGFpbHMgc3R5bGU9e3sgd2hpdGVTcGFjZTogJ3ByZS13cmFwJyB9fT5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVycm9yICYmIHRoaXMuc3RhdGUuZXJyb3IudG9TdHJpbmcoKX1cbiAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgfVxufVxuXG5jb25zdCByZW5kZXJBcHAgPSAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2coJ1N0YXJ0aW5nIHRvIHJlbmRlciBhcHAuLi4nKTtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpO1xuICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Jvb3QgY29udGFpbmVyIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICBjb25zdCByb290ID0gY3JlYXRlUm9vdChjb250YWluZXIpO1xuICAgIHJvb3QucmVuZGVyKFxuICAgICAgPFJlYWN0LlN0cmljdE1vZGU+XG4gICAgICAgIDxFcnJvckJvdW5kYXJ5PlxuICAgICAgICAgIDxBcHAgLz5cbiAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICAgPC9SZWFjdC5TdHJpY3RNb2RlPlxuICAgICk7XG4gICAgY29uc29sZS5sb2coJ0FwcCByZW5kZXJlZCBzdWNjZXNzZnVsbHknKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciByZW5kZXJpbmcgYXBwOicsIGVycm9yKTtcbiAgICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgc3R5bGU9XCJwYWRkaW5nOiAyMHB4OyBjb2xvcjogcmVkO1wiPlxuICAgICAgICBFcnJvciBsb2FkaW5nIGFwcDogJHtlcnJvci5tZXNzYWdlfVxuICAgICAgICA8cHJlPiR7ZXJyb3Iuc3RhY2t9PC9wcmU+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59O1xuXG4vLyBBZGQgbG9hZCBldmVudCBsaXN0ZW5lclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc29sZS5sb2coJ0RPTUNvbnRlbnRMb2FkZWQgZXZlbnQgZmlyZWQnKTtcbiAgcmVuZGVyQXBwKCk7XG59KTtcblxuLy8gQWRkIGVycm9yIGxvZ2dpbmdcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChldmVudCkgPT4ge1xuICBjb25zb2xlLmVycm9yKCdHbG9iYWwgZXJyb3I6JywgZXZlbnQuZXJyb3IpO1xufSk7XG5cbi8vIEFkZCB1bmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24gaGFuZGxpbmdcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd1bmhhbmRsZWRyZWplY3Rpb24nLCAoZXZlbnQpID0+IHtcbiAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uOicsIGV2ZW50LnJlYXNvbik7XG59KTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInBvcHVwXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2Zyb250ZW5kXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2Zyb250ZW5kXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3ItcmVhY3RcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanN4XCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIlRpbWVyIiwiVGFza1BhbmVsIiwiU2V0dGluZ3NNb2RhbCIsIlN0YXRzRGlzcGxheSIsImpzeERFViIsIl9qc3hERVYiLCJFcnJvckJvdW5kYXJ5IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwiaGFzRXJyb3IiLCJlcnJvciIsImdldERlcml2ZWRTdGF0ZUZyb21FcnJvciIsImNvbXBvbmVudERpZENhdGNoIiwiaW5mbyIsImNvbnNvbGUiLCJyZW5kZXIiLCJfdGhpcyRzdGF0ZSRlcnJvciIsInN0eWxlIiwicGFkZGluZyIsImNvbG9yIiwiY2hpbGRyZW4iLCJmaWxlTmFtZSIsIl9qc3hGaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJ0b1N0cmluZyIsIkFwcCIsInNldHRpbmdzIiwic2V0U2V0dGluZ3MiLCJmb2N1c0R1cmF0aW9uIiwiYnJlYWtEdXJhdGlvbiIsIm5vdGlmaWNhdGlvbnMiLCJ0aW1lclN0YXRlIiwic2V0VGltZXJTdGF0ZSIsInR5cGUiLCJ0aW1lTGVmdCIsImlzUnVubmluZyIsImlzQnJlYWsiLCJpc0NvbXBsZXRlZCIsInN0YXRzIiwidG9kYXkiLCJwb21vZG9yb3MiLCJ0b3RhbEZvY3VzTWludXRlcyIsInN0cmVha3MiLCJjdXJyZW50IiwiZGFpbHlHb2FsIiwidGFza0lucHV0Iiwic2V0VGFza0lucHV0IiwiY3VycmVudFRhc2siLCJzZXRDdXJyZW50VGFzayIsInNob3dTZXR0aW5ncyIsInNldFNob3dTZXR0aW5ncyIsInBvcnQiLCJzZXRQb3J0IiwiY3VycmVudFBvcnQiLCJjaHJvbWUiLCJydW50aW1lIiwiY29ubmVjdCIsIm5hbWUiLCJtZXNzYWdlSGFuZGxlciIsIm1lc3NhZ2UiLCJsb2ciLCJwcmV2IiwiX21lc3NhZ2Ukc3RhdGUkdGltZUxlIiwiX21lc3NhZ2Ukc3RhdGUkaXNCcmVhIiwiX21lc3NhZ2Ukc3RhdGUkc3RhdHMkIiwiX21lc3NhZ2Ukc3RhdGUkc3RhdHMiLCJfbWVzc2FnZSRzdGF0ZSRzdGF0cyQyIiwiX21lc3NhZ2Ukc3RhdGUkc3RhdHMyIiwiX21lc3NhZ2Ukc3RhdGUkc3RhdHMkMyIsIl9tZXNzYWdlJHN0YXRlJHN0YXRzMyIsIl9tZXNzYWdlJHN0YXRlJHN0YXRzJDQiLCJfbWVzc2FnZSRzdGF0ZSRzdGF0czQiLCJfb2JqZWN0U3ByZWFkIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJwb3N0TWVzc2FnZSIsImFjdGlvbiIsInJlbW92ZUxpc3RlbmVyIiwiZGlzY29ubmVjdCIsImhhbmRsZVNldHRpbmdzU2F2ZSIsIm5ld1NldHRpbmdzIiwic3RvcmFnZSIsImxvY2FsIiwic2V0IiwiaGFuZGxlU3RhcnRUaW1lciIsInRhc2siLCJ0cmltIiwiaW5pdGlhbFRpbWUiLCJoYW5kbGVLZXlQcmVzcyIsImUiLCJrZXkiLCJwcmV2ZW50RGVmYXVsdCIsImhhbmRsZVN0YXJ0QnJlYWsiLCJoYW5kbGVDb21wbGV0ZSIsInN0YXJ0QnJlYWsiLCJoYW5kbGVCcmVha1RyYW5zaXRpb24iLCJoYW5kbGVTdGF0ZVRyYW5zaXRpb24iLCJmcm9tIiwidG8iLCJzZXRUcmFuc2l0aW9uIiwiaXNBbmltYXRpbmciLCJzZXRUaW1lb3V0IiwiZ2V0VHJhbnNpdGlvbkNsYXNzIiwiY29tcG9uZW50VHlwZSIsInRyYW5zaXRpb24iLCJoYW5kbGVCcmVha1N0YXJ0IiwiaGFuZGxlU2Vzc2lvbkNvbXBsZXRlIiwiaGFuZGxlQnJlYWtTa2lwIiwiaGFuZGxlQnJlYWtDb21wbGV0ZSIsImhhbmRsZVJlc2V0Iiwid2luZG93IiwiY29uZmlybSIsImluaXRpYWxEdXJhdGlvbiIsImR1cmF0aW9uIiwibmV4dER1cmF0aW9uIiwiaGFuZGxlUGF1c2UiLCJjdXJyZW50VGltZSIsImNsYXNzTmFtZSIsInNyYyIsImFsdCIsIm9uQ2xpY2siLCJ3aWR0aCIsImhlaWdodCIsInZpZXdCb3giLCJmaWxsIiwiZCIsInN0cm9rZSIsInN0cm9rZVdpZHRoIiwic3Ryb2tlTGluZWNhcCIsInN0cm9rZUxpbmVqb2luIiwiaXNWaXNpYmxlIiwib25Db21wbGV0ZSIsIm9uUGF1c2UiLCJvblJlc2V0IiwiaXNPcGVuIiwib25DbG9zZSIsIm9uU2F2ZSIsInVzZVJlZiIsImxvY2FsU2V0dGluZ3MiLCJzZXRMb2NhbFNldHRpbmdzIiwic2hvd0ZlZWRiYWNrIiwic2V0U2hvd0ZlZWRiYWNrIiwiZmVlZGJhY2tEYXRhIiwic2V0RmVlZGJhY2tEYXRhIiwiZW1haWwiLCJmZWVkYmFja1R5cGUiLCJmZWVkYmFja1N0YXR1cyIsInNldEZlZWRiYWNrU3RhdHVzIiwiaXNTdWJtaXR0aW5nIiwic2V0SXNTdWJtaXR0aW5nIiwiaGFuZGxlU3VibWl0IiwiaGFuZGxlRmVlZGJhY2tTdWJtaXQiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGltZXN0YW1wIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwic3lzdGVtSW5mbyIsInZlcnNpb24iLCJicm93c2VyIiwibmF2aWdhdG9yIiwidXNlckFnZW50Iiwib2siLCJkYXRhIiwianNvbiIsIm9uU3VibWl0IiwiaHRtbEZvciIsImlkIiwidmFsdWUiLCJvbkNoYW5nZSIsIk1hdGgiLCJtYXgiLCJtaW4iLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsInJlcXVpcmVkIiwicm93cyIsImRpc2FibGVkIiwib25TdGFydEJyZWFrIiwib25OZXdTZXNzaW9uIiwiX3N0YXRzJGRhaWx5R29hbCIsInNhZmVTdGF0cyIsImN4IiwiY3kiLCJyIiwic3Ryb2tlRGFzaG9mZnNldCIsImlucHV0UmVmIiwiZm9jdXMiLCJyZWYiLCJvbktleVByZXNzIiwiRnJhZ21lbnQiLCJfRnJhZ21lbnQiLCJUaW1lckNvbnRyb2xzIiwieDEiLCJ5MSIsIngyIiwieTIiLCJwb2ludHMiLCJmb3JtYXRUaW1lIiwidG90YWxTZWNvbmRzIiwibWludXRlcyIsImZsb29yIiwic2Vjb25kcyIsInBhZFN0YXJ0IiwiY2FsY3VsYXRlUHJvZ3Jlc3MiLCJ0b3RhbFRpbWUiLCJwcm9ncmVzcyIsInN0cm9rZURhc2hhcnJheSIsIlBJIiwieCIsInkiLCJ0ZXh0QW5jaG9yIiwiZG9taW5hbnRCYXNlbGluZSIsImNyZWF0ZVJvb3QiLCJlcnJvckluZm8iLCJ3aGl0ZVNwYWNlIiwicmVuZGVyQXBwIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIkVycm9yIiwicm9vdCIsIlN0cmljdE1vZGUiLCJpbm5lckhUTUwiLCJzdGFjayIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInJlYXNvbiJdLCJzb3VyY2VSb290IjoiIn0=