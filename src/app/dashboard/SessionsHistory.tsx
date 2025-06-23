'use client';

import { useState, useMemo } from 'react';

// Mock data for demonstration - in a real app, this would come from a database
const mockSessions = [
  { id: 1, date: '2025-06-23', duration: 10, type: 'Mindfulness', notes: 'Morning session before work' },
  { id: 2, date: '2025-06-22', duration: 35, type: 'Breathing', notes: 'Deep breathing exercises' },
  { id: 3, date: '2025-06-21', duration: 0, type: 'Missed', notes: 'Too busy with meetings' },
  { id: 4, date: '2025-06-20', duration: 25, type: 'Body Scan', notes: 'Full body relaxation' },
  { id: 5, date: '2025-06-19', duration: 30, type: 'Mindfulness', notes: 'Focused on breath awareness' },
  { id: 6, date: '2025-06-18', duration: 15, type: 'Walking', notes: 'Mindful walking meditation' },
  { id: 7, date: '2025-06-17', duration: 20, type: 'Loving Kindness', notes: 'Compassion meditation' },
  { id: 8, date: '2025-06-16', duration: 45, type: 'Mindfulness', notes: 'Extended weekend session' },
  { id: 9, date: '2025-06-15', duration: 12, type: 'Breathing', notes: 'Quick afternoon reset' },
  { id: 10, date: '2025-06-14', duration: 28, type: 'Body Scan', notes: 'Evening wind-down' },
  { id: 11, date: '2025-06-13', duration: 18, type: 'Mindfulness', notes: 'Lunch break meditation' },
  { id: 12, date: '2025-06-12', duration: 40, type: 'Breathing', notes: 'Long breathing session' },
  { id: 13, date: '2025-06-11', duration: 22, type: 'Walking', notes: 'Garden meditation' },
  { id: 14, date: '2025-06-10', duration: 15, type: 'Mindfulness', notes: 'Morning routine' },
  { id: 15, date: '2025-06-09', duration: 30, type: 'Body Scan', notes: 'Full body awareness' },
  { id: 16, date: '2025-06-08', duration: 8, type: 'Breathing', notes: 'Quick stress relief' },
  { id: 17, date: '2025-06-07', duration: 25, type: 'Loving Kindness', notes: 'Self-compassion practice' },
  { id: 18, date: '2025-06-06', duration: 35, type: 'Mindfulness', notes: 'Deep focus session' },
  { id: 19, date: '2025-06-05', duration: 20, type: 'Walking', notes: 'Nature meditation' },
  { id: 20, date: '2025-06-04', duration: 16, type: 'Breathing', notes: 'Anxiety management' },
  { id: 21, date: '2025-06-03', duration: 32, type: 'Body Scan', notes: 'Tension release' },
  { id: 22, date: '2025-06-02', duration: 24, type: 'Mindfulness', notes: 'Present moment awareness' },
  { id: 23, date: '2025-06-01', duration: 18, type: 'Breathing', notes: 'Centering practice' },
  { id: 24, date: '2025-05-31', duration: 42, type: 'Mindfulness', notes: 'Monthly reflection' },
  { id: 25, date: '2025-05-30', duration: 14, type: 'Walking', notes: 'Evening stroll meditation' }
];

export default function SessionsHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { paginatedSessions, totalPages, startIndex, endIndex } = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = mockSessions.slice(start, end);
    const total = Math.ceil(mockSessions.length / itemsPerPage);
    
    return {
      paginatedSessions: paginated,
      totalPages: total,
      startIndex: start + 1,
      endIndex: Math.min(end, mockSessions.length)
    };
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Mindfulness': 'bg-emerald-100 text-emerald-700',
      'Breathing': 'bg-blue-100 text-blue-700',
      'Body Scan': 'bg-purple-100 text-purple-700',
      'Walking': 'bg-green-100 text-green-700',
      'Loving Kindness': 'bg-pink-100 text-pink-700',
      'Missed': 'bg-gray-100 text-gray-600'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-slate-700">Meditation Sessions</h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className="px-3 py-1 border border-emerald-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
          <span className="text-sm text-slate-600">per page</span>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="overflow-hidden">
        <div className="space-y-3">
          {paginatedSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-center min-w-[80px]">
                  <p className="text-sm font-medium text-slate-700">
                    {formatDate(session.date)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(session.type)}`}>
                    {session.type}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-emerald-600">
                      {session.duration}
                    </span>
                    <span className="text-sm text-slate-600">min</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 max-w-md ml-4">
                <p className="text-sm text-slate-600 truncate">
                  {session.notes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100">
        <div className="text-sm text-slate-600">
          Showing {startIndex}-{endIndex} of {mockSessions.length} sessions
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm border border-emerald-200 rounded-lg text-slate-700 hover:bg-emerald-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex gap-1">
            {[...Array(Math.min(totalPages, 5))].map((_, index) => {
              const pageNum = currentPage <= 3 
                ? index + 1 
                : currentPage > totalPages - 2
                ? totalPages - 4 + index
                : currentPage - 2 + index;
                
              if (pageNum > totalPages || pageNum < 1) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm border border-emerald-200 rounded-lg text-slate-700 hover:bg-emerald-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}