'use client';

import { useState, useMemo } from 'react';

// Mock data for demonstration - in a real app, this would come from a database
const mockYearlyData = {
  2025: [
    { month: 'Jan', hours: 8.5, minutes: 510 },
    { month: 'Feb', hours: 12.2, minutes: 732 },
    { month: 'Mar', hours: 15.8, minutes: 948 },
    { month: 'Apr', hours: 18.3, minutes: 1098 },
    { month: 'May', hours: 22.1, minutes: 1326 },
    { month: 'Jun', hours: 19.7, minutes: 1182 },
    { month: 'Jul', hours: 0, minutes: 0 },
    { month: 'Aug', hours: 0, minutes: 0 },
    { month: 'Sep', hours: 0, minutes: 0 },
    { month: 'Oct', hours: 0, minutes: 0 },
    { month: 'Nov', hours: 0, minutes: 0 },
    { month: 'Dec', hours: 0, minutes: 0 }
  ],
  2024: [
    { month: 'Jan', hours: 5.2, minutes: 312 },
    { month: 'Feb', hours: 8.7, minutes: 522 },
    { month: 'Mar', hours: 12.1, minutes: 726 },
    { month: 'Apr', hours: 16.4, minutes: 984 },
    { month: 'May', hours: 20.8, minutes: 1248 },
    { month: 'Jun', hours: 25.3, minutes: 1518 },
    { month: 'Jul', hours: 28.9, minutes: 1734 },
    { month: 'Aug', hours: 24.6, minutes: 1476 },
    { month: 'Sep', hours: 21.2, minutes: 1272 },
    { month: 'Oct', hours: 18.7, minutes: 1122 },
    { month: 'Nov', hours: 15.3, minutes: 918 },
    { month: 'Dec', hours: 12.9, minutes: 774 }
  ],
  2023: [
    { month: 'Jan', hours: 3.1, minutes: 186 },
    { month: 'Feb', hours: 6.4, minutes: 384 },
    { month: 'Mar', hours: 9.8, minutes: 588 },
    { month: 'Apr', hours: 13.2, minutes: 792 },
    { month: 'May', hours: 16.7, minutes: 1002 },
    { month: 'Jun', hours: 20.1, minutes: 1206 },
    { month: 'Jul', hours: 23.5, minutes: 1410 },
    { month: 'Aug', hours: 26.8, minutes: 1608 },
    { month: 'Sep', hours: 24.3, minutes: 1458 },
    { month: 'Oct', hours: 21.7, minutes: 1302 },
    { month: 'Nov', hours: 18.9, minutes: 1134 },
    { month: 'Dec', hours: 16.2, minutes: 972 }
  ],
  2022: [
    { month: 'Jan', hours: 2.5, minutes: 150 },
    { month: 'Feb', hours: 4.8, minutes: 288 },
    { month: 'Mar', hours: 7.2, minutes: 432 },
    { month: 'Apr', hours: 9.6, minutes: 576 },
    { month: 'May', hours: 12.1, minutes: 726 },
    { month: 'Jun', hours: 14.5, minutes: 870 },
    { month: 'Jul', hours: 16.9, minutes: 1014 },
    { month: 'Aug', hours: 19.3, minutes: 1158 },
    { month: 'Sep', hours: 17.8, minutes: 1068 },
    { month: 'Oct', hours: 15.4, minutes: 924 },
    { month: 'Nov', hours: 13.1, minutes: 786 },
    { month: 'Dec', hours: 10.7, minutes: 642 }
  ],
  2021: [
    { month: 'Jan', hours: 1.2, minutes: 72 },
    { month: 'Feb', hours: 2.8, minutes: 168 },
    { month: 'Mar', hours: 4.5, minutes: 270 },
    { month: 'Apr', hours: 6.1, minutes: 366 },
    { month: 'May', hours: 7.8, minutes: 468 },
    { month: 'Jun', hours: 9.4, minutes: 564 },
    { month: 'Jul', hours: 11.1, minutes: 666 },
    { month: 'Aug', hours: 12.7, minutes: 762 },
    { month: 'Sep', hours: 14.3, minutes: 858 },
    { month: 'Oct', hours: 12.9, minutes: 774 },
    { month: 'Nov', hours: 10.5, minutes: 630 },
    { month: 'Dec', hours: 8.2, minutes: 492 }
  ]
};

export default function YearlyProgressGraph() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const availableYears = Object.keys(mockYearlyData)
    .map(Number)
    .sort((a, b) => b - a);

  const yearData = mockYearlyData[selectedYear as keyof typeof mockYearlyData] || [];

  const { totalHours, maxHours, averageHours, activeMonths } = useMemo(() => {
    const total = yearData.reduce((sum, month) => sum + month.hours, 0);
    const max = Math.max(...yearData.map(month => month.hours));
    const avg = total / 12;
    const active = yearData.filter(month => month.hours > 0).length;
    return {
      totalHours: Math.round(total * 10) / 10,
      maxHours: Math.round(max * 10) / 10,
      averageHours: Math.round(avg * 10) / 10,
      activeMonths: active
    };
  }, [yearData]);

  const currentMonth = new Date().getMonth();

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100">
      {/* Header with Year Navigation */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-slate-700">Yearly Progress</h3>
        <div className="flex items-center gap-4">
          <div className="text-right mr-4">
            <p className="text-3xl font-bold text-emerald-600">{totalHours}</p>
            <p className="text-sm text-slate-600">total hours</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedYear(prev => Math.max(prev - 1, Math.min(...availableYears)))}
              disabled={selectedYear <= Math.min(...availableYears)}
              className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ←
            </button>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-3 py-1 border border-emerald-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <button
              onClick={() => setSelectedYear(prev => Math.min(prev + 1, Math.max(...availableYears)))}
              disabled={selectedYear >= Math.max(...availableYears)}
              className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-6">
        <div className="flex items-end justify-between h-48 gap-1">
          {yearData.map((month, index) => {
            const heightPercentage = maxHours > 0 ? (month.hours / maxHours) * 100 : 0;
            const isCurrentMonth = selectedYear === currentYear && index === currentMonth;
            const isFutureMonth = selectedYear === currentYear && index > currentMonth;

            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col justify-end h-40 mb-2">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      month.hours > 0
                        ? isCurrentMonth
                          ? 'bg-emerald-500 shadow-lg'
                          : isFutureMonth
                          ? 'bg-gray-200'
                          : 'bg-emerald-400 hover:bg-emerald-500'
                        : 'bg-gray-200'
                    }`}
                    style={{ height: `${heightPercentage}%` }}
                  />
                </div>
                <div className="text-center">
                  <p className={`text-xs font-medium ${
                    isCurrentMonth ? 'text-emerald-600' :
                    isFutureMonth ? 'text-gray-400' : 'text-slate-600'
                  }`}>
                    {month.month}
                  </p>
                  <p className="text-xs text-slate-500">{month.hours}h</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 pt-6 border-t border-slate-100">
        <div className="text-center">
          <p className="text-xl font-bold text-emerald-600">{averageHours}h</p>
          <p className="text-sm text-slate-600">Avg per month</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-amber-600">{maxHours}h</p>
          <p className="text-sm text-slate-600">Best month</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-slate-600">{activeMonths}/12</p>
          <p className="text-sm text-slate-600">Months active</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-indigo-600">
            {Math.round((totalHours / (selectedYear === currentYear ? (currentMonth + 1) : 12)) * 365 / 24)}
          </p>
          <p className="text-sm text-slate-600">Days active</p>
        </div>
      </div>
    </div>
  );
}