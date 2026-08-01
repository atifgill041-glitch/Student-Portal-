import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Award, BookOpen, Star, MessageSquare, CheckCircle2, UserCheck } from 'lucide-react';

export const DailyPerformanceView: React.FC = () => {
  const { dailyPerformances, activeStudent } = useAcademy();

  if (!activeStudent) return null;

  const performances = dailyPerformances.filter((dp) => dp.studentId === activeStudent.id);

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1 text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 dark:text-gray-700'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-emerald-950 dark:text-emerald-300 flex items-center space-x-2">
            <Award className="w-6 h-6 text-amber-500" />
            <span>Daily Class Evaluation & Performance</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Updated by teacher after every live session for <span className="font-bold">{activeStudent.name}</span>
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/40 px-3.5 py-2 rounded-2xl border border-amber-200 dark:border-amber-800 text-xs font-semibold text-amber-900 dark:text-amber-200 flex items-center space-x-2">
          <UserCheck className="w-4 h-4 text-amber-600" />
          <span>Assigned Teacher: {activeStudent.assignedTeacherName}</span>
        </div>
      </div>

      {/* Evaluation List */}
      <div className="space-y-4">
        {performances.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-8 text-center rounded-3xl text-gray-400">
            No evaluations posted yet.
          </div>
        ) : (
          performances.map((perf) => (
            <div
              key={perf.id}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-emerald-100 dark:border-gray-700 shadow-sm space-y-4 hover:shadow-md transition"
            >
              
              {/* Date & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-mono font-bold text-xs px-3 py-1 rounded-full">
                    🗓️ {perf.date}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">Session Evaluation</span>
                </div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  Course: {activeStudent.primaryCourse}
                </span>
              </div>

              {/* Lesson Covered */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-gray-900/60 border border-emerald-100 dark:border-gray-700 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center space-x-1">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Lesson Covered Today</span>
                </span>
                <p className="text-sm font-bold text-gray-900 dark:text-gray-100 font-serif">
                  {perf.lessonCovered}
                </p>
              </div>

              {/* Ratings Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 text-xs space-y-1">
                  <span className="text-gray-500 font-medium block">Tajweed Accuracy</span>
                  {renderStars(perf.tajweedRating)}
                </div>

                <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 text-xs space-y-1">
                  <span className="text-gray-500 font-medium block">Memorization / Sabaq</span>
                  {renderStars(perf.memorizationRating)}
                </div>

                <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 text-xs space-y-1">
                  <span className="text-gray-500 font-medium block">Recitation Fluency</span>
                  {renderStars(perf.fluencyRating)}
                </div>
              </div>

              {/* Remarks & Homework */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 space-y-1">
                  <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center space-x-1">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                    <span>Teacher Remarks</span>
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "{perf.teacherRemarks}"
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-1">
                  <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Homework Assigned</span>
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {perf.homeworkAssigned}
                  </p>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
