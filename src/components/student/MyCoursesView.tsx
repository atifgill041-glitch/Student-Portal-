import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Course } from '../../types';
import { BookOpen, BookMarked, Sparkles, GraduationCap, Languages, CheckCircle2, ChevronRight, X, FileText } from 'lucide-react';

export const MyCoursesView: React.FC = () => {
  const { courses, activeStudent } = useAcademy();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courseIcons: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen className="w-6 h-6 text-emerald-600" />,
    BookMarked: <BookMarked className="w-6 h-6 text-emerald-600" />,
    Sparkles: <Sparkles className="w-6 h-6 text-amber-500" />,
    BookmarkCheck: <BookMarked className="w-6 h-6 text-purple-600" />,
    GraduationCap: <GraduationCap className="w-6 h-6 text-emerald-600" />,
    Languages: <Languages className="w-6 h-6 text-blue-600" />,
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-xs">
        <div>
          <h2 className="text-xl font-bold font-serif text-emerald-950 dark:text-emerald-300">
            Academy Course Curriculum
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Structured Islamic & Quranic studies designed for all age groups
          </p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
          Current Enrolled: <span className="font-extrabold text-amber-600">{activeStudent?.primaryCourse}</span>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => {
          const isEnrolled = activeStudent?.enrolledCourses.includes(c.id);
          const remaining = c.totalLessons - c.completedLessons;

          return (
            <div
              key={c.id}
              className={`bg-white dark:bg-gray-800 rounded-3xl p-6 border shadow-sm transition hover:shadow-md flex flex-col justify-between space-y-4 ${
                isEnrolled
                  ? 'border-emerald-300 dark:border-emerald-700 ring-2 ring-emerald-500/20'
                  : 'border-gray-100 dark:border-gray-700 opacity-90'
              }`}
            >
              <div className="space-y-3">
                
                {/* Icon & Enrolled Badge */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-gray-700 shadow-xs">
                    {courseIcons[c.iconName] || <BookOpen className="w-6 h-6 text-emerald-600" />}
                  </div>
                  {isEnrolled ? (
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Enrolled</span>
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      Available
                    </span>
                  )}
                </div>

                {/* Titles */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                    {c.title}
                  </h3>
                  {c.titleArabic && (
                    <p className="text-sm font-serif text-emerald-700 dark:text-emerald-400 font-bold mt-0.5">
                      {c.titleArabic}
                    </p>
                  )}
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500">Course Progress</span>
                    <span className="text-emerald-800 dark:text-emerald-300 font-mono font-bold">
                      {c.progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${c.progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-400 font-mono">
                    <span>Lessons Done: {c.completedLessons}</span>
                    <span>Remaining: {remaining}</span>
                  </div>
                </div>

              </div>

              {/* View Syllabus Modal Trigger */}
              <button
                onClick={() => setSelectedCourse(c)}
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-emerald-900 dark:text-emerald-200 text-xs font-bold rounded-2xl transition flex items-center justify-center space-x-1"
              >
                <span>View Full Syllabus ({c.totalLessons} Lessons)</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>
          );
        })}
      </div>

      {/* Syllabus Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 border border-emerald-200 dark:border-gray-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in duration-200">
            
            <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 p-6 text-white relative">
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 text-emerald-200 hover:text-white p-1 rounded-full bg-emerald-800/60"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-bold text-lg font-serif">{selectedCourse.title}</h3>
              {selectedCourse.titleArabic && (
                <p className="text-amber-300 font-serif text-sm">{selectedCourse.titleArabic}</p>
              )}
              <p className="text-xs text-emerald-200 mt-1">Detailed Course Breakdown & Modules</p>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="p-3.5 bg-emerald-50 dark:bg-gray-800 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200 font-medium">
                {selectedCourse.description}
              </div>

              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 flex items-center space-x-1">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Syllabus Topics ({selectedCourse.syllabus.length} Modules)</span>
              </h4>

              <div className="space-y-2">
                {selectedCourse.syllabus.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-xs flex items-center space-x-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-100 dark:border-gray-800 text-right">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-5 py-2 bg-emerald-800 text-white text-xs font-bold rounded-xl hover:bg-emerald-900"
              >
                Close Syllabus
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
