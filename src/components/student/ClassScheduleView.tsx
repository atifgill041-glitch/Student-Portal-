import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { CalendarDays, Video, Clock, UserCheck, ExternalLink, Sparkles } from 'lucide-react';

export const ClassScheduleView: React.FC = () => {
  const { timetable, activeStudent } = useAcademy();

  if (!activeStudent) return null;

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const studentTimetable = timetable.filter((t) => t.studentId === activeStudent.id);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-emerald-950 dark:text-emerald-300 flex items-center space-x-2">
            <CalendarDays className="w-6 h-6 text-emerald-600" />
            <span>Weekly Class Timetable</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Live online classroom schedule for <span className="font-bold">{activeStudent.name}</span> ({activeStudent.timezone})
          </p>
        </div>

        <a
          href={activeStudent.meetUrl}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2.5 bg-gradient-to-r from-emerald-800 to-emerald-900 text-white text-xs font-bold rounded-2xl shadow transition flex items-center space-x-2"
        >
          <Video className="w-4 h-4 text-amber-300" />
          <span>Launch Live Classroom</span>
        </a>
      </div>

      {/* Weekly Days Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {days.map((day) => {
          const item = studentTimetable.find((t) => t.day === day);

          return (
            <div
              key={day}
              className={`rounded-3xl p-5 border transition flex flex-col justify-between space-y-3 ${
                item
                  ? 'bg-white dark:bg-gray-800 border-emerald-200 dark:border-gray-700 shadow-sm'
                  : 'bg-gray-50/60 dark:bg-gray-900/40 border-gray-100 dark:border-gray-800 opacity-70'
              }`}
            >
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2.5">
                <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 font-serif">
                  {day}
                </h3>
                {item ? (
                  <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Class Scheduled
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-400">Off Day</span>
                )}
              </div>

              {item ? (
                <div className="space-y-2">
                  <div className="p-3 bg-emerald-50/70 dark:bg-gray-900/60 rounded-2xl border border-emerald-100 dark:border-gray-700 space-y-1">
                    <p className="font-bold text-xs text-emerald-950 dark:text-emerald-200">
                      {item.courseName}
                    </p>
                    <p className="text-[11px] text-gray-500 flex items-center space-x-1">
                      <UserCheck className="w-3 h-3 text-emerald-600" />
                      <span>{item.teacherName}</span>
                    </p>
                    <p className="text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-300 flex items-center space-x-1 pt-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      <span>{item.startTime} - {item.endTime} ({activeStudent.timezone})</span>
                    </p>
                  </div>
                  
                  <a
                    href={item.meetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-1.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition shadow-xs"
                  >
                    <Video className="w-3.5 h-3.5 text-amber-300" />
                    <span>Join Class</span>
                    <ExternalLink className="w-3 h-3 text-emerald-300" />
                  </a>
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic py-4 text-center">No live class on {day}</p>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
