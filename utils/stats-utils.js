// Date formatting utilities
export const formatDateKey = (date) => {
  return date.toISOString().split('T')[0];
};

export const formatMonthKey = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
};

export const getWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

export const getWeekKey = (date) => {
  return `${date.getFullYear()}-W${getWeekNumber(date)}`;
};

// Data aggregation utilities
export const getDateRangeData = (stats, range = 'week') => {
  const now = new Date();
  const data = [];
  
  switch (range) {
    case 'week':
      return getWeekData(stats, now);
    case 'month':
      return getMonthData(stats, now);
    case 'year':
      return getYearData(stats, now);
    default:
      return getWeekData(stats, now);
  }
};

const getWeekData = (stats, now) => {
  const data = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const key = formatDateKey(date);
    const dayStats = stats.daily.get(key) || createEmptyStats();
    
    data.push({
      date: new Date(date),
      label: date.toLocaleDateString('en-US', { weekday: 'short' }),
      pomodoros: dayStats.pomodoros,
      totalFocusMinutes: dayStats.totalFocusMinutes,
      completedTasks: dayStats.completedTasks?.size || 0
    });
  }
  
  return data;
};

const getMonthData = (stats, now) => {
  const data = [];
  
  for (let i = 4; i >= 0; i--) {
    const weekStats = {
      pomodoros: 0,
      totalFocusMinutes: 0,
      completedTasks: new Set(),
      label: `Week ${i + 1}`
    };
    
    for (let j = 6; j >= 0; j--) {
      const date = new Date(now);
      date.setDate(date.getDate() - (i * 7 + j));
      const key = formatDateKey(date);
      const dayStats = stats.daily.get(key) || createEmptyStats();
      
      weekStats.pomodoros += dayStats.pomodoros;
      weekStats.totalFocusMinutes += dayStats.totalFocusMinutes;
      dayStats.completedTasks?.forEach(task => weekStats.completedTasks.add(task));
    }
    
    data.push({
      ...weekStats,
      completedTasks: weekStats.completedTasks.size
    });
  }
  
  return data;
};

const getYearData = (stats, now) => {
  const data = [];
  const currentMonth = now.getMonth();
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), currentMonth - i, 1);
    const monthKey = formatMonthKey(date);
    const monthStats = stats.monthly.get(monthKey) || createEmptyStats();
    
    data.push({
      date: new Date(date),
      label: date.toLocaleDateString('en-US', { month: 'short' }),
      pomodoros: monthStats.pomodoros,
      totalFocusMinutes: monthStats.totalFocusMinutes,
      completedTasks: monthStats.completedTasks?.size || 0
    });
  }
  
  return data;
};

const createEmptyStats = () => ({
  pomodoros: 0,
  totalFocusMinutes: 0,
  completedTasks: new Set(),
  breaks: 0
});

// Helper functions for streak calculations
export const getDaysDifference = (dateA, dateB) => {
  const a = new Date(dateA);
  const b = new Date(dateB);
  a.setHours(0, 0, 0, 0);
  b.setHours(0, 0, 0, 0);
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
};

export const calculateStreak = (stats) => {
  const today = new Date();
  let streak = 0;
  let date = new Date(today);
  
  while (true) {
    const key = formatDateKey(date);
    const dayStats = stats.daily.get(key);
    
    if (!dayStats || dayStats.pomodoros === 0) {
      break;
    }
    
    streak++;
    date.setDate(date.getDate() - 1);
  }
  
  return streak;
}; 