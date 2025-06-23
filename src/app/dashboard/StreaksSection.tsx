'use client';

// Mock data for demonstration - in a real app, this would come from a database
const mockStreakData = {
  currentStreak: 7,
  longestStreak: 23,
  lastMeditationDate: new Date().toISOString().split('T')[0]
};

export default function StreaksSection() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Current Streak */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Current Streak</h3>
            <div className="flex items-center">
              <span className="text-4xl font-bold text-emerald-600 mr-2">
                {mockStreakData.currentStreak}
              </span>
              <span className="text-slate-600">
                {mockStreakData.currentStreak === 1 ? 'day' : 'days'}
              </span>
            </div>
          </div>
          <div className="text-5xl">🔥</div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="flex space-x-1">
            {[...Array(Math.min(mockStreakData.currentStreak, 7))].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-emerald-500 rounded-full"
              />
            ))}
            {mockStreakData.currentStreak > 7 && (
              <span className="text-emerald-600 font-semibold ml-2">
                +{mockStreakData.currentStreak - 7}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Longest Streak */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Longest Streak</h3>
            <div className="flex items-center">
              <span className="text-4xl font-bold text-amber-600 mr-2">
                {mockStreakData.longestStreak}
              </span>
              <span className="text-slate-600">
                {mockStreakData.longestStreak === 1 ? 'day' : 'days'}
              </span>
            </div>
          </div>
          <div className="text-5xl">🏆</div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <div className="flex-1 bg-amber-100 rounded-full h-2">
              <div 
                className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((mockStreakData.currentStreak / mockStreakData.longestStreak) * 100, 100)}%` }}
              />
            </div>
            <span className="ml-3 text-sm text-slate-600">
              {Math.round((mockStreakData.currentStreak / mockStreakData.longestStreak) * 100)}%
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            Progress towards your record
          </p>
        </div>
      </div>
    </div>
  );
}