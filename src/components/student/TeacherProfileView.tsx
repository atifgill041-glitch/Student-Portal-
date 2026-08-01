import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { UserCheck, MessageSquare, Mail, Award, GraduationCap, CheckCircle2, PhoneCall } from 'lucide-react';

export const TeacherProfileView: React.FC = () => {
  const { teachers, activeStudent } = useAcademy();

  if (!activeStudent) return null;

  const assignedTeacher = teachers.find((t) => t.id === activeStudent.assignedTeacherId) || teachers[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-serif text-emerald-950 dark:text-emerald-300 flex items-center space-x-2">
            <UserCheck className="w-6 h-6 text-emerald-600" />
            <span>Assigned Instructor Profile</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Your dedicated Qari & mentor at Faizan-e-Ilm Online Academy
          </p>
        </div>
      </div>

      {/* Main Teacher Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-emerald-100 dark:border-gray-700 shadow-md space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          
          <img
            src={assignedTeacher.photoUrl}
            alt={assignedTeacher.name}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-amber-400 shadow-lg"
          />

          <div className="space-y-2">
            <div className="inline-block bg-amber-100 text-amber-900 font-bold text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider">
              {assignedTeacher.title}
            </div>

            <h3 className="text-2xl font-bold font-serif text-gray-900 dark:text-gray-100">
              {assignedTeacher.name}
            </h3>

            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium flex items-center justify-center sm:justify-start space-x-1">
              <GraduationCap className="w-4 h-4" />
              <span>{assignedTeacher.qualification}</span>
            </p>

            <div className="flex flex-wrap gap-2 pt-2 justify-center sm:justify-start">
              {assignedTeacher.specialization.map((spec, i) => (
                <span
                  key={i}
                  className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold px-2.5 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800"
                >
                  ✓ {spec}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-b border-gray-100 dark:border-gray-700 py-4 text-center">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Teaching Experience</span>
            <span className="text-lg font-extrabold text-emerald-900 dark:text-emerald-300 font-mono block">
              {assignedTeacher.experienceYears}+ Years
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Active Students</span>
            <span className="text-lg font-extrabold text-emerald-900 dark:text-emerald-300 font-mono block">
              {assignedTeacher.totalStudents} Enrolled
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Student Evaluation Score</span>
            <span className="text-lg font-extrabold text-amber-500 block">
              ⭐ 4.95 / 5.0
            </span>
          </div>
        </div>

        {/* Contact Action Buttons (Direct WhatsApp & Email) */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={`https://wa.me/${assignedTeacher.whatsapp.replace('+', '')}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center space-x-2 shadow-md"
          >
            <PhoneCall className="w-4 h-4 text-amber-300" />
            <span>Contact via WhatsApp ({assignedTeacher.whatsapp})</span>
          </a>

          <a
            href={`mailto:${assignedTeacher.email}`}
            className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-800 dark:text-white rounded-2xl text-xs font-bold transition flex items-center justify-center space-x-2"
          >
            <Mail className="w-4 h-4 text-emerald-600" />
            <span>Send Email ({assignedTeacher.email})</span>
          </a>
        </div>

      </div>

    </div>
  );
};
