import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import {
  Moon,
  Sun,
  Bell,
  Clock,
  UserCheck,
  Shield,
  GraduationCap,
  Globe,
  ChevronDown,
  LogOut,
  Sparkles
} from 'lucide-react';
import { UserRole, Language } from '../../types';

interface NavbarProps {
  onOpenNotifications: () => void;
  onOpenPrayerTimes: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNotifications,
  onOpenPrayerTimes
}) => {
  const {
    role,
    setRole,
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    activeStudent,
    students,
    setActiveStudentId,
    notifications,
    logout
  } = useAcademy();

  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-30 bg-emerald-900 border-b border-emerald-800/60 shadow-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Crest */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 shadow-lg text-emerald-950 font-bold text-xl border-2 border-amber-200">
            <span>ف</span>
            <Sparkles className="w-3.5 h-3.5 absolute -top-1 -right-1 text-amber-200 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-wide text-white drop-shadow-sm font-serif">
                Faizan-e-Ilm
              </span>
              <span className="bg-amber-400/20 text-amber-300 text-xs px-2 py-0.5 rounded-full border border-amber-400/30 font-semibold tracking-wider uppercase hidden sm:inline-block">
                Online Academy
              </span>
            </div>
            <p className="text-xs text-emerald-200/90 font-light hidden md:block">
              الْأَكادِيمِيَّةُ الإِسْلَامِيَّةُ عَبْرَ الإِنْتَرْنِت • Learning & Excellence
            </p>
          </div>
        </div>

        {/* Quick Role & Student Selector Bar (Essential for smooth live preview & testing) */}
        <div className="hidden lg:flex items-center space-x-2 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-700/50">
          <span className="text-xs text-emerald-300 font-medium mr-1">Role:</span>
          
          <button
            id="role-btn-student"
            onClick={() => setRole('student')}
            className={`flex items-center space-x-1.5 text-xs px-2.5 py-1 rounded-lg transition-all font-medium ${
              role === 'student'
                ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm'
                : 'text-emerald-200 hover:bg-emerald-800/80'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student</span>
          </button>

          <button
            id="role-btn-teacher"
            onClick={() => setRole('teacher')}
            className={`flex items-center space-x-1.5 text-xs px-2.5 py-1 rounded-lg transition-all font-medium ${
              role === 'teacher'
                ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm'
                : 'text-emerald-200 hover:bg-emerald-800/80'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Teacher</span>
          </button>

          <button
            id="role-btn-admin"
            onClick={() => setRole('admin')}
            className={`flex items-center space-x-1.5 text-xs px-2.5 py-1 rounded-lg transition-all font-medium ${
              role === 'admin'
                ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm'
                : 'text-emerald-200 hover:bg-emerald-800/80'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          {/* Student Account Switcher */}
          {role === 'student' && (
            <div className="relative ml-2 pl-2 border-l border-emerald-700/60">
              <button
                id="student-switcher-btn"
                onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
                className="flex items-center space-x-1.5 text-xs text-amber-200 hover:text-white bg-emerald-800/60 px-2 py-1 rounded-lg border border-emerald-600/50"
              >
                <span>{activeStudent?.countryFlag}</span>
                <span className="max-w-[100px] truncate">{activeStudent?.name}</span>
                <ChevronDown className="w-3 h-3 text-emerald-300" />
              </button>

              {studentDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-1.5 z-50 text-gray-800 dark:text-gray-100">
                  <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                    Switch Student Account
                  </div>
                  {students.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => {
                        setActiveStudentId(st.id);
                        setStudentDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 dark:hover:bg-gray-700 transition ${
                        st.id === activeStudent?.id ? 'bg-emerald-100/70 font-bold text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <span>{st.countryFlag}</span>
                        <div className="truncate">
                          <p className="truncate font-medium">{st.name}</p>
                          <p className="text-[10px] text-gray-400">{st.registrationNumber}</p>
                        </div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                        {st.country}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Tools (Prayer Times, Notifications, Language, Dark Mode, Logout) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Prayer Times Button */}
          <button
            id="prayer-times-btn"
            onClick={onOpenPrayerTimes}
            className="flex items-center space-x-1.5 bg-emerald-800/80 hover:bg-emerald-700 text-amber-300 px-2.5 py-1.5 rounded-xl border border-emerald-600/50 text-xs transition-all font-medium"
            title="Islamic Prayer Times & Hijri Calendar"
          >
            <Clock className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span className="hidden sm:inline">Prayer Times</span>
          </button>

          {/* Notifications Bell */}
          <button
            id="notifications-btn"
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border border-emerald-600/50 transition"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-emerald-950 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Language Switcher */}
          <div className="relative group">
            <button
              id="language-switcher-btn"
              className="flex items-center space-x-1 p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border border-emerald-600/50 text-xs font-medium"
            >
              <Globe className="w-4 h-4 text-emerald-300" />
              <span className="uppercase">{language}</span>
            </button>
            <div className="absolute right-0 mt-1 hidden group-hover:block w-32 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 text-xs z-50">
              <button
                onClick={() => setLanguage('en')}
                className="w-full text-left px-3 py-1.5 hover:bg-emerald-50 dark:hover:bg-gray-700 font-medium"
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setLanguage('ur')}
                className="w-full text-left px-3 py-1.5 hover:bg-emerald-50 dark:hover:bg-gray-700 font-medium"
              >
                🇵🇰 اردو (Urdu)
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className="w-full text-left px-3 py-1.5 hover:bg-emerald-50 dark:hover:bg-gray-700 font-medium"
              >
                🇸🇦 العربية (Arabic)
              </button>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            id="darkmode-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border border-emerald-600/50 transition"
            title="Toggle Dark/Light Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-200" />}
          </button>

          {/* Logout Button */}
          <button
            id="logout-btn"
            onClick={logout}
            className="p-2 rounded-xl bg-red-800/60 hover:bg-red-700/80 text-red-100 border border-red-600/40 transition ml-1"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
