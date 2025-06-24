'use client';

import { useMemo } from 'react';

// Mock data for demonstration - in a real app, this would come from a database
const mockWeeklyData = [
  { day: 'Mon', minutes: 20, date: '2025-06-17' },
  { day: 'Tue', minutes: 15, date: '2025-06-18' },
  { day: 'Wed', minutes: 30, date: '2025-06-19' },
  { day: 'Thu', minutes: 25, date: '2025-06-20' },
  { day: 'Fri', minutes: 0, date: '2025-06-21' },
  { day: 'Sat', minutes: 35, date: '2025-06-22' },
  { day: 'Sun', minutes: 10, date: '2025-06-23' }
];

export default function WeeklyProgressGraph() {
  const { totalMinutes, maxMinutes, averageMinutes } = useMemo(() => {
    const total = mockWeeklyData.reduce((sum, day) => sum + day.minutes, 0);
    const max = Math.max(...mockWeeklyData.map(day => day.minutes));
    const avg = Math.round(total / mockWeeklyData.length);
    return { totalMinutes: total, maxMinutes: max, averageMinutes: avg };
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const getBarClassName = (minutes: number, isToday: boolean) => {
    if (minutes > 0) {
      return isToday
        ? 'bg-emerald-500 shadow-lg'
        : 'bg-emerald-400 hover:bg-emerald-500';
    }
    return 'bg-gray-200';
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-slate-700">This Week's Progress</h3>
        <div className="text-right">
          <p className="text-3xl font-bold text-emerald-600">{totalMinutes}</p>
          <p className="text-sm text-slate-600">total minutes</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-6">
        <div className="flex items-end justify-between h-48 gap-2">
          {mockWeeklyData.map((day, index) => {
            const heightPercentage = maxMinutes > 0 ? (day.minutes / maxMinutes) * 100 : 0;
            const isToday = day.date === today;

            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col justify-end h-40 mb-2">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 ${getBarClassName(day.minutes, isToday)}`}
                    style={{ height: `${heightPercentage}%` }}
                  />
                </div>
                <div className="text-center">
                  <p className={`text-sm font-medium ${isToday ? 'text-emerald-600' : 'text-slate-600'}`}>
                    {day.day}
                  </p>
                  <p className="text-xs text-slate-500">{day.minutes}m</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-600">{averageMinutes}min</p>
          <p className="text-sm text-slate-600">Avg per day</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-amber-600">{maxMinutes}min</p>
          <p className="text-sm text-slate-600">Best day</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-600">
            {mockWeeklyData.filter(day => day.minutes > 0).length}/7
          </p>
          <p className="text-sm text-slate-600">Days active</p>
        </div>
      </div>
    </div>
  );
}