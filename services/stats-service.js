// stats-service.js
class StatsService {
    constructor() {
      this.stats = {
        daily: new Map(),
        weekly: new Map(),
        monthly: new Map(),
        streaks: {
          current: 0,
          longest: 0,
          lastCompleted: null
        }
      };
      
      this.loadStats();
    }
  
    async loadStats() {
      const data = await chrome.storage.local.get('stats');
      if (data.stats) {
        this.stats = this.hydrateStats(data.stats);
      }
    }
  
    hydrateStats(data) {
      return {
        daily: new Map(Object.entries(data.daily || {})),
        weekly: new Map(Object.entries(data.weekly || {})),
        monthly: new Map(Object.entries(data.monthly || {})),
        streaks: data.streaks || {
          current: 0,
          longest: 0,
          lastCompleted: null
        }
      };
    }
  
    async saveStats() {
      const serializedStats = {
        daily: Object.fromEntries(this.stats.daily),
        weekly: Object.fromEntries(this.stats.weekly),
        monthly: Object.fromEntries(this.stats.monthly),
        streaks: this.stats.streaks
      };
      
      await chrome.storage.local.set({ stats: serializedStats });
    }
  
    getDateKeys() {
      const now = new Date();
      const dayKey = now.toISOString().split('T')[0];
      const weekKey = `${now.getFullYear()}-W${getWeekNumber(now)}`;
      const monthKey = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
      
      return { dayKey, weekKey, monthKey };
    }
  
    updatePeriodStats(map, key) {
      const current = map.get(key) || {
        pomodoros: 0,
        totalFocusMinutes: 0,
        completedTasks: new Set(),
        breaks: 0
      };
      
      return current;
    }
  
    async recordCompletion(sessionData) {
      const { dayKey, weekKey, monthKey } = this.getDateKeys();
      
      // Update daily stats
      const dayStats = this.updatePeriodStats(this.stats.daily, dayKey);
      dayStats.pomodoros++;
      dayStats.totalFocusMinutes += sessionData.focusMinutes;
      dayStats.completedTasks.add(sessionData.task);
      this.stats.daily.set(dayKey, dayStats);
  
      // Update weekly/monthly similarly...
      const weekStats = this.updatePeriodStats(this.stats.weekly, weekKey);
      weekStats.pomodoros++;
      this.stats.weekly.set(weekKey, weekStats);
  
      const monthStats = this.updatePeriodStats(this.stats.monthly, monthKey);
      monthStats.pomodoros++;
      this.stats.monthly.set(monthKey, monthStats);
  
      // Update streaks
      this.updateStreaks(dayKey);
  
      await this.saveStats();
      return this.getStats();
    }
  
    updateStreaks(currentDay) {
      const { streaks } = this.stats;
      const lastDay = streaks.lastCompleted;
  
      if (!lastDay) {
        streaks.current = 1;
      } else {
        const dayDiff = getDaysDifference(lastDay, currentDay);
        if (dayDiff === 1) {
          streaks.current++;
        } else if (dayDiff > 1) {
          streaks.current = 1;
        }
      }
  
      streaks.longest = Math.max(streaks.longest, streaks.current);
      streaks.lastCompleted = currentDay;
    }
  
    getStats() {
      const { dayKey, weekKey, monthKey } = this.getDateKeys();
      
      return {
        today: this.stats.daily.get(dayKey) || createEmptyStats(),
        week: this.stats.weekly.get(weekKey) || createEmptyStats(),
        month: this.stats.monthly.get(monthKey) || createEmptyStats(),
        streaks: { ...this.stats.streaks }
      };
    }
  }
  
  function createEmptyStats() {
    return {
      pomodoros: 0,
      totalFocusMinutes: 0,
      completedTasks: new Set(),
      breaks: 0
    };
  }
  
  function getWeekNumber(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  }
  
  function getDaysDifference(dateA, dateB) {
    const a = new Date(dateA);
    const b = new Date(dateB);
    const diffTime = Math.abs(b - a);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  
  export const statsService = new StatsService();