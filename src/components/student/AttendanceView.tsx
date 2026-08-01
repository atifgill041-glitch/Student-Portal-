import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { CalendarCheck, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

export const AttendanceView: React.FC = () => {
  const { attendance, activeStudent } = useAcademy();
  const [selectedMonth, setSelectedMonth] = useState('2026-08');

  if (!activeStudent) return null;

  const studentAtts = attendance.filter((a) => a.studentId === activeStudent.id);

  // Stats calculation
  const totalClasses = studentAtts.length;
  const presents = studentAtts.filter((a) => a.status === 'present').length;
  const lates = studentAtts.filter((a) => a.status === 'late').length;
  const absents = studentAtts.filter((a) => a.status === 'absent').length;

  const attendancePct = totalClasses > 0 ? Math.round(((presents + lates) / totalClasses) * 100) : 100;

  // Calendar dates generator for current month (August 2026)
  const daysInAugust = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-08-${dayNum.toString().padStart(2, '0')}`;
    const record = studentAtts.find((a) => a.date === dateStr);
    return { dayNum, dateStr, record };
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Stats */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-700 pb-4">
          <div>
            <h2 className="text-xl font-bold font-serif text-emerald-950 dark:text-emerald-300 flex items-center space-x-2">
              <CalendarCheck className="w-6 h-6 text-emerald-600" />
              <span>Attendance History & Log</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Monthly tracking for <span className="font-bold text-emerald-900 dark:text-emerald-300">{activeStudent.name}</span> ({activeStudent.registrationNumber})
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Select Month:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-emerald-900 dark:text-emerald-200"
            >
              <option value="2026-08">August 2026</option>
              <option value="2026-07">July 2026</option>
              <option value="2026-06">June 2026</option>
            </select>
          </div>
        </div>

        {/* Attendance Summary Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
              Monthly Attendance %
            </span>
            <span className="text-3xl font-black text-emerald-900 dark:text-emerald-200 font-mono">
              {attendancePct}%
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-gray-700/50 border border-emerald-100 dark:border-gray-700 text-center">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block flex items-center justify-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Present</span>
            </span>
            <span className="text-2xl font-bold text-emerald-950 dark:text-white font-mono mt-1 block">
              {presents} Days
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-gray-700/50 border border-amber-200 dark:border-gray-700 text-center">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider block flex items-center justify-center space-x-1">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Late</span>
            </span>
            <span className="text-2xl font-bold text-amber-950 dark:text-amber-200 font-mono mt-1 block">
              {lates} Days
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-gray-700/50 border border-rose-200 dark:border-gray-700 text-center">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider block flex items-center justify-center space-x-1">
              <XCircle className="w-4 h-4 text-rose-500" />
              <span>Absent</span>
            </span>
            <span className="text-2xl font-bold text-rose-950 dark:text-rose-200 font-mono mt-1 block">
              {absents} Days
            </span>
          </div>
        </div>

      </div>

      {/* Calendar Grid View */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 uppercase tracking-wider">
          📅 August 2026 Class Attendance Grid
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
          {daysInAugust.map((d) => {
            const st = d.record?.status;

            return (
              <div
                key={d.dayNum}
                className={`p-3 rounded-2xl border flex flex-col justify-between h-24 text-xs transition ${
                  st === 'present'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700'
                    : st === 'late'
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700'
                    : st === 'absent'
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700'
                    : 'bg-gray-50/50 dark:bg-gray-900/40 border-gray-100 dark:border-gray-800 text-gray-400'
                }`}
              >
                <div className="flex justify-between items-center font-bold font-mono">
                  <span>Aug {d.dayNum}</span>
                  {st === 'present' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {st === 'late' && <Clock className="w-4 h-4 text-amber-500" />}
                  {st === 'absent' && <XCircle className="w-4 h-4 text-rose-500" />}
                </div>

                <div className="text-[11px] font-bold">
                  {st === 'present' && <span className="text-emerald-800 dark:text-emerald-300">✅ Present</span>}
                  {st === 'late' && <span className="text-amber-800 dark:text-amber-300">⏰ Late</span>}
                  {st === 'absent' && <span className="text-rose-800 dark:text-rose-300">❌ Absent</span>}
                  {!st && <span className="text-gray-400 font-normal">No Class</span>}
                </div>

                {d.record?.note && (
                  <p className="text-[9px] text-gray-500 truncate italic" title={d.record.note}>
                    {d.record.note}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Attendance Log Table */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-xs overflow-hidden">
        <div className="p-4 bg-emerald-900 text-white font-bold text-sm">
          Detailed Class Attendance Log
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 text-gray-400 uppercase text-[10px] font-bold">
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Course / Teacher</th>
                <th className="p-3.5">Remarks / Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {studentAtts.map((att) => (
                <tr key={att.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/60">
                  <td className="p-3.5 font-mono font-bold text-gray-800 dark:text-gray-200">
                    {att.date}
                  </td>
                  <td className="p-3.5 font-bold">
                    {att.status === 'present' && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        ✅ Present
                      </span>
                    )}
                    {att.status === 'late' && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                        ⏰ Late
                      </span>
                    )}
                    {att.status === 'absent' && (
                      <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                        ❌ Absent
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-gray-700 dark:text-gray-300">
                    {activeStudent.primaryCourse} ({activeStudent.assignedTeacherName})
                  </td>
                  <td className="p-3.5 text-gray-500 italic">
                    {att.note || 'Class attended on schedule.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
