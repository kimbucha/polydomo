// services/error-handler.js
class ErrorHandler {
    constructor() {
      this.errors = new Map();
      this.recoveryStrategies = new Map();
      this.setupDefaultStrategies();
    }
  
    setupDefaultStrategies() {
      // Timer state recovery
      this.addRecoveryStrategy('TIMER_SYNC_ERROR', async (state) => {
        const stored = await chrome.storage.local.get('timerState');
        return stored.timerState || this.getDefaultTimerState();
      });
  
      // Stats recovery
      this.addRecoveryStrategy('STATS_CORRUPTION', async () => {
        const backup = await this.getLastValidStatsBackup();
        if (backup) {
          await chrome.storage.local.set({ stats: backup });
          return backup;
        }
        return this.initializeNewStats();
      });
  
      // Task list recovery
      this.addRecoveryStrategy('TASK_SYNC_ERROR', async () => {
        const stored = await chrome.storage.local.get('tasks');
        return stored.tasks || [];
      });
    }
  
    addRecoveryStrategy(errorType, strategy) {
      this.recoveryStrategies.set(errorType, strategy);
    }
  
    async handleError(error, context = {}) {
      const errorId = Date.now().toString();
      const errorInfo = {
        id: errorId,
        timestamp: new Date().toISOString(),
        type: error.name,
        message: error.message,
        context,
        stack: error.stack
      };
  
      this.errors.set(errorId, errorInfo);
      await this.logError(errorInfo);
  
      // Attempt recovery
      if (this.recoveryStrategies.has(error.name)) {
        try {
          const recovered = await this.recoveryStrategies.get(error.name)(context);
          await this.logRecovery(errorId, recovered);
          return recovered;
        } catch (recoveryError) {
          await this.logError({
            ...errorInfo,
            recoveryAttempted: true,
            recoveryError: recoveryError.message
          });
          throw recoveryError;
        }
      }
  
      // If no recovery strategy, throw the original error
      throw error;
    }
  
    async logError(errorInfo) {
      const errors = await chrome.storage.local.get('errorLog');
      const errorLog = errors.errorLog || [];
      errorLog.push(errorInfo);
      
      // Keep only last 50 errors
      if (errorLog.length > 50) {
        errorLog.shift();
      }
      
      await chrome.storage.local.set({ errorLog });
    }
  
    async logRecovery(errorId, recoveryResult) {
      const error = this.errors.get(errorId);
      if (error) {
        error.recovered = true;
        error.recoveryTimestamp = new Date().toISOString();
        error.recoveryResult = recoveryResult;
        await this.logError(error);
      }
    }
  
    getDefaultTimerState() {
      return {
        timeLeft: 1500,
        isRunning: false,
        isBreak: false,
        isCompleted: false
      };
    }
  
    async getLastValidStatsBackup() {
      const backups = await chrome.storage.local.get('statsBackups');
      if (backups.statsBackups && backups.statsBackups.length > 0) {
        return backups.statsBackups[backups.statsBackups.length - 1];
      }
      return null;
    }
  
    initializeNewStats() {
      return {
        daily: {},
        weekly: {},
        monthly: {},
        streaks: {
          current: 0,
          longest: 0,
          lastCompleted: null
        }
      };
    }
  
    // Periodic cleanup
    async cleanup() {
      const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;
      const now = Date.now();
      
      // Clear old errors
      for (const [id, error] of this.errors.entries()) {
        if (now - new Date(error.timestamp).getTime() > TWO_WEEKS) {
          this.errors.delete(id);
        }
      }
  
      // Trim error log
      const errors = await chrome.storage.local.get('errorLog');
      if (errors.errorLog) {
        const filteredLog = errors.errorLog.filter(error => 
          now - new Date(error.timestamp).getTime() <= TWO_WEEKS
        );
        await chrome.storage.local.set({ errorLog: filteredLog });
      }
    }
  }
  
  export const errorHandler = new ErrorHandler();