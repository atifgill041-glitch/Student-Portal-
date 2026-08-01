import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { FileCheck2, Award, Medal, CheckCircle2, ChevronRight } from 'lucide-react';

interface TestsResultsViewProps {
  onNavigate: (view: string) => void;
}

export const TestsResultsView: React.FC<TestsResultsViewProps> = ({ onNavigate }) => {
  const { testResults, activeStudent } = useAcademy();

  if (!activeStudent) return null;

  const studentTests = testResults.filter((t) => t.studentId === activeStudent.id);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-emerald-950 dark:text-emerald-300 flex items-center space-x-2">
            <FileCheck2 className="w-6 h-6 text-emerald-600" />
            <span>Examinations & Marksheets</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Weekly, Monthly, & Final Quranic Evaluation Results for <span className="font-bold">{activeStudent.name}</span>
          </p>
        </div>

        <button
          onClick={() => onNavigate('certificates')}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 text-xs font-bold rounded-2xl shadow transition flex items-center space-x-1.5"
        >
          <Medal className="w-4 h-4" />
          <span>View Issued Certificates</span>
        </button>
      </div>

      {/* Test Results Table & Cards */}
      <div className="space-y-4">
        {studentTests.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-8 text-center rounded-3xl text-gray-400">
            No exam results published yet.
          </div>
        ) : (
          studentTests.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-emerald-100 dark:border-gray-700 shadow-sm space-y-4 hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    {t.testType}
                  </span>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
                    {t.testName}
                  </h3>
                </div>
                <span className="text-xs font-mono text-gray-400">Date: {t.date}</span>
              </div>

              {/* Marks breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-emerald-50 dark:bg-gray-700/50 rounded-2xl border border-emerald-100 dark:border-gray-700">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Course</span>
                  <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200">{t.courseName}</span>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-gray-700/50 rounded-2xl border border-emerald-100 dark:border-gray-700">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Marks Obtained</span>
                  <span className="text-sm font-extrabold text-gray-900 dark:text-white font-mono">
                    {t.obtainedMarks} / {t.totalMarks}
                  </span>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-gray-700/50 rounded-2xl border border-emerald-100 dark:border-gray-700">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Percentage</span>
                  <span className="text-sm font-black text-emerald-800 dark:text-emerald-300 font-mono">
                    {t.percentage}%
                  </span>
                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800">
                  <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold uppercase block">Grade</span>
                  <span className="text-base font-black text-amber-600 dark:text-amber-400">
                    {t.grade}
                  </span>
                </div>
              </div>

              {/* Remarks */}
              <div className="p-3.5 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300 italic flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Examiner Remarks: "{t.remarks}"</span>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
