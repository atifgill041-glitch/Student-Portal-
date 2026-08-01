import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Homework } from '../../types';
import { BookMarked, Calendar, CheckCircle2, Clock, Upload, X, FileText, Send } from 'lucide-react';

export const HomeworkView: React.FC = () => {
  const { homeworks, activeStudent, updateHomeworkStatus } = useAcademy();
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!activeStudent) return null;

  const studentHomeworks = homeworks.filter((h) => h.studentId === activeStudent.id);

  const handleSubmitHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHomework) return;
    updateHomeworkStatus(selectedHomework.id, 'Submitted', submissionText || 'Audio / Recitation completed and submitted via portal.');
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setSelectedHomework(null);
      setSubmissionText('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-serif text-emerald-950 dark:text-emerald-300 flex items-center space-x-2">
            <BookMarked className="w-6 h-6 text-emerald-600" />
            <span>Homework Assignments</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Daily practice tasks & recitation submissions for <span className="font-bold">{activeStudent.name}</span>
          </p>
        </div>
      </div>

      {/* Homework List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {studentHomeworks.length === 0 ? (
          <div className="col-span-2 bg-white dark:bg-gray-800 p-8 text-center rounded-3xl text-gray-400">
            No homework assigned at this time.
          </div>
        ) : (
          studentHomeworks.map((hw) => (
            <div
              key={hw.id}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-emerald-100 dark:border-gray-700 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      hw.status === 'Submitted'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                        : hw.status === 'Reviewed'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 animate-pulse'
                    }`}
                  >
                    {hw.status === 'Submitted'
                      ? '✅ Submitted'
                      : hw.status === 'Reviewed'
                      ? '⭐ Reviewed'
                      : '⏳ Pending Submission'}
                  </span>

                  <span className="text-xs text-gray-400 font-mono flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Due: {hw.dueDate}</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
                    {hw.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                    {hw.description}
                  </p>
                </div>

                {hw.teacherFeedback && (
                  <div className="p-3 bg-emerald-50 dark:bg-gray-700/50 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200">
                    <span className="font-bold block">Teacher Feedback:</span>
                    <p className="italic">{hw.teacherFeedback}</p>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <span className="text-[11px] text-gray-400 font-mono">
                  Assigned: {hw.assignedDate}
                </span>

                {hw.status === 'Pending' ? (
                  <button
                    onClick={() => setSelectedHomework(hw)}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5 shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Submit Homework</span>
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    Task Completed
                  </span>
                )}
              </div>

            </div>
          ))
        )}
      </div>

      {/* Upload/Submit Homework Modal */}
      {selectedHomework && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 border border-emerald-200 dark:border-gray-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in duration-200">
            
            <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 p-6 text-white relative">
              <button
                onClick={() => setSelectedHomework(null)}
                className="absolute top-4 right-4 text-emerald-200 hover:text-white p-1 rounded-full bg-emerald-800/60"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-bold text-lg font-serif">Submit Homework Assignment</h3>
              <p className="text-xs text-amber-300 font-medium">{selectedHomework.title}</p>
            </div>

            <form onSubmit={handleSubmitHomework} className="p-6 space-y-4">
              
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-gray-800 text-xs text-emerald-950 dark:text-emerald-200">
                <p className="font-bold mb-1">Task Instructions:</p>
                <p>{selectedHomework.description}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Student Submission Note / Recitation Summary
                </label>
                <textarea
                  rows={3}
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Describe your completed recitation practice or paste audio recording link..."
                  className="w-full p-3 text-xs border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              {/* Upload file simulation */}
              <div className="border-2 border-dashed border-emerald-200 dark:border-gray-700 rounded-2xl p-4 text-center space-y-2 bg-emerald-50/40 dark:bg-gray-800/40">
                <Upload className="w-6 h-6 mx-auto text-emerald-600" />
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Attach Audio Note or Practice Image (Optional)
                </p>
                <p className="text-[10px] text-gray-400">Supports MP3, WAV, JPG, PNG up to 25MB</p>
              </div>

              {submittedSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl text-center flex items-center justify-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Homework Successfully Submitted!</span>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedHomework(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-500 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirm Submission</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
