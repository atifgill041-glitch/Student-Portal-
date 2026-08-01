import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import {
  Sparkles,
  CalendarCheck,
  Video,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  UserCheck,
  Globe,
  Receipt,
  FileText
} from 'lucide-react';
import { DAILY_HADITH_LIST } from '../../data/initialData';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { activeStudent, courses, dailyPerformances, feeRecords, homeworks } = useAcademy();

  if (!activeStudent) return null;

  const studentDailyPerfs = dailyPerformances.filter((dp) => dp.studentId === activeStudent.id);
  const latestPerf = studentDailyPerfs[0];

  const pendingHomeworks = homeworks.filter(
    (h) => h.studentId === activeStudent.id && h.status === 'Pending'
  );

  const activeFee = feeRecords.find(
    (f) => f.studentId === activeStudent.id && f.month.includes('August 2026')
  );

  const currentHadith = DAILY_HADITH_LIST[0];

  return (
    <div className="space-y-6">
      
      {/* 1. Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-700/60">
        
        {/* Background Islamic Calligraphy / Pattern Accent */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none font-serif text-9xl font-bold p-4 select-none">
          القرآن
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-400/30 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>Assalamu Alaikum 👋 Ahlan wa Sahlan</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-white">
              Welcome back, <span className="text-amber-300">{activeStudent.name}</span>!
            </h1>

            <p className="text-xs sm:text-sm text-emerald-200/90 max-w-xl font-light">
              Registration No: <span className="font-mono font-bold text-white">{activeStudent.registrationNumber}</span> •
              Assigned Teacher: <span className="font-semibold text-amber-200">{activeStudent.assignedTeacherName}</span>
            </p>
          </div>

          {/* Join Live Class Card Banner */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center md:text-right space-y-2.5 min-w-[240px]">
            <div className="flex items-center justify-center md:justify-end space-x-2 text-xs font-bold text-amber-300">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>Next Class: Today @ {activeStudent.classTime}</span>
            </div>
            
            <a
              href={activeStudent.meetUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-emerald-950 font-extrabold py-3 px-4 rounded-xl shadow-lg transition transform active:scale-98"
            >
              <Video className="w-4.5 h-4.5 text-emerald-950" />
              <span>Join Live Google Meet</span>
            </a>
          </div>

        </div>
      </div>

      {/* 2. Key Summary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Attendance */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-emerald-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Attendance Rate</p>
            <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-300 mt-1 font-mono">
              {activeStudent.attendancePercentage}%
            </h3>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center space-x-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Excellent Standing</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 2: Course Progress */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-emerald-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Overall Progress</p>
            <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-300 mt-1 font-mono">
              {activeStudent.overallProgressPercentage}%
            </h3>
            <div className="w-24 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${activeStudent.overallProgressPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 3: Primary Course */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-emerald-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Enrolled Course</p>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-1 truncate max-w-[140px]">
              {activeStudent.primaryCourse}
            </h3>
            <p className="text-[11px] text-gray-500 mt-1 flex items-center space-x-1">
              <Globe className="w-3 h-3 text-emerald-600" />
              <span>{activeStudent.countryFlag} {activeStudent.country}</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 4: Fee Status */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-emerald-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">August Fee Status</p>
            <h3 className="text-lg font-extrabold mt-1">
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                  activeStudent.feeStatus === 'Paid'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 animate-pulse'
                }`}
              >
                {activeStudent.feeStatus === 'Paid' ? '✅ Fee Paid' : '⚠️ Fee Due'}
              </span>
            </h3>
            <p className="text-[11px] text-gray-500 mt-1 font-mono">
              Monthly: {activeStudent.currency}{activeStudent.monthlyFee}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
            <Receipt className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* 3. Main Content Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Current Lesson & Teacher Remarks */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Current Lesson Box */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
                    Current Quranic Lesson
                  </h3>
                  <p className="text-xs text-gray-400">Assigned by {activeStudent.assignedTeacherName}</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('courses')}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center space-x-1"
              >
                <span>All Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-gray-900/50 border border-emerald-100 dark:border-gray-700 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-0.5 rounded-full">
                Active Topic
              </span>
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100 font-serif leading-relaxed">
                {activeStudent.currentLesson}
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500 pt-2 font-mono">
                <span>Class Schedule: {activeStudent.classDays}</span>
                <span>•</span>
                <span>{activeStudent.classTime}</span>
              </div>
            </div>

            {/* Latest Daily Teacher Feedback */}
            {latestPerf && (
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-gray-900/50 border border-amber-200/60 dark:border-amber-800/40 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center space-x-1">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Teacher Remarks ({latestPerf.date})</span>
                  </span>
                  <div className="flex text-amber-400 text-xs">
                    {'⭐'.repeat(latestPerf.tajweedRating)}
                  </div>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 italic">
                  "{latestPerf.teacherRemarks}"
                </p>
              </div>
            )}

          </div>

          {/* Pending Homework Alert */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <span>Pending Homework Assignments</span>
              </h3>
              <button
                onClick={() => onNavigate('homework')}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                View All ({homeworks.filter((h) => h.studentId === activeStudent.id).length})
              </button>
            </div>

            {pendingHomeworks.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">No pending homework. All caught up!</p>
            ) : (
              <div className="space-y-3">
                {pendingHomeworks.map((hw) => (
                  <div
                    key={hw.id}
                    className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-700 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-bold text-xs text-gray-900 dark:text-gray-100">{hw.title}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">{hw.description}</p>
                      <span className="text-[10px] text-amber-600 font-mono mt-1 inline-block">
                        Due: {hw.dueDate}
                      </span>
                    </div>
                    <button
                      onClick={() => onNavigate('homework')}
                      className="px-3 py-1.5 bg-emerald-800 text-white text-xs font-bold rounded-xl hover:bg-emerald-900 transition"
                    >
                      Submit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Hadith & Quick Action Panel */}
        <div className="space-y-6">
          
          {/* Hadith Card */}
          <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 text-white p-6 rounded-3xl shadow-lg border border-emerald-700 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                ✨ Daily Islamic Inspiration
              </span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>

            <p className="text-right text-lg font-serif font-bold text-amber-100 leading-relaxed pt-2">
              "{currentHadith.arabic}"
            </p>

            <p className="text-xs text-emerald-100 italic leading-relaxed">
              "{currentHadith.translation}"
            </p>

            <p className="text-[10px] text-amber-300 font-mono text-right">
              — {currentHadith.reference}
            </p>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-sm space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400">
              Quick Navigation
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigate('attendance')}
                className="p-3 rounded-2xl bg-emerald-50 dark:bg-gray-700/50 hover:bg-emerald-100 text-emerald-900 dark:text-emerald-200 font-bold text-left transition flex items-center space-x-2"
              >
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
                <span>Attendance</span>
              </button>

              <button
                onClick={() => onNavigate('daily-performance')}
                className="p-3 rounded-2xl bg-emerald-50 dark:bg-gray-700/50 hover:bg-emerald-100 text-emerald-900 dark:text-emerald-200 font-bold text-left transition flex items-center space-x-2"
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>Daily Log</span>
              </button>

              <button
                onClick={() => onNavigate('fee-section')}
                className="p-3 rounded-2xl bg-emerald-50 dark:bg-gray-700/50 hover:bg-emerald-100 text-emerald-900 dark:text-emerald-200 font-bold text-left transition flex items-center space-x-2"
              >
                <Receipt className="w-4 h-4 text-emerald-600" />
                <span>Fee Section</span>
              </button>

              <button
                onClick={() => onNavigate('certificates')}
                className="p-3 rounded-2xl bg-emerald-50 dark:bg-gray-700/50 hover:bg-emerald-100 text-emerald-900 dark:text-emerald-200 font-bold text-left transition flex items-center space-x-2"
              >
                <Award className="w-4 h-4 text-purple-600" />
                <span>Certificates</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
