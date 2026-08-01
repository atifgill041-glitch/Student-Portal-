import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  Award,
  BookMarked,
  FileCheck2,
  Receipt,
  Bell,
  CalendarDays,
  Medal,
  UserCheck,
  User,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Video
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const { role, activeStudent, notifications } = useAcademy();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const studentMenuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'schedule', label: 'Class Schedule', icon: CalendarDays },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'daily-performance', label: 'Daily Performance', icon: Award },
    { id: 'homework', label: 'Homework', icon: BookMarked },
    { id: 'tests-results', label: 'Tests & Results', icon: FileCheck2 },
    { id: 'fee-section', label: 'Fee Section', icon: Receipt },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { id: 'certificates', label: 'Certificates', icon: Medal },
    { id: 'teacher-profile', label: 'Teacher Profile', icon: UserCheck },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  const adminMenuItems: MenuItem[] = [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: ShieldCheck },
    { id: 'admin-students', label: 'Manage Students', icon: User },
    { id: 'admin-attendance', label: 'Attendance & Progress', icon: CalendarCheck },
    { id: 'admin-homework', label: 'Homework & Tests', icon: BookMarked },
    { id: 'admin-fees', label: 'Fee Management', icon: Receipt },
    { id: 'admin-certificates', label: 'Issue Certificates', icon: Medal },
    { id: 'admin-notifs', label: 'Announcements', icon: Bell },
  ];

  const navItems = role === 'admin' ? adminMenuItems : studentMenuItems;

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-emerald-100 dark:border-gray-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 overflow-y-auto flex-1 space-y-6 scrollbar-thin scrollbar-thumb-emerald-200">
          
          {/* Active Profile Info Banner */}
          {role === 'student' && activeStudent && (
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 rounded-2xl p-3.5 text-white shadow-md border border-emerald-700/60">
              <div className="flex items-center space-x-3">
                <img
                  src={activeStudent.avatarUrl}
                  alt={activeStudent.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-400 shadow"
                />
                <div className="truncate">
                  <h4 className="font-bold text-sm truncate flex items-center space-x-1">
                    <span>{activeStudent.name}</span>
                  </h4>
                  <p className="text-[11px] text-emerald-200 font-mono">
                    {activeStudent.registrationNumber}
                  </p>
                  <p className="text-[10px] text-amber-300 font-semibold flex items-center space-x-1 mt-0.5">
                    <span>{activeStudent.countryFlag}</span>
                    <span>{activeStudent.primaryCourse}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {role === 'admin' && (
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-3.5 text-white shadow-md border border-amber-500/60">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-amber-900/60 border-2 border-amber-300 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-amber-200" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Academy Admin</h4>
                  <p className="text-xs text-amber-100 font-light">Management Access</p>
                </div>
              </div>
            </div>
          )}

          {/* Nav List */}
          <nav className="space-y-1">
            <p className="px-3 text-[11px] font-bold text-emerald-800/60 dark:text-emerald-400 uppercase tracking-wider mb-2">
              {role === 'admin' ? 'Administrative Tools' : 'Student Navigation'}
            </p>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => {
                    setCurrentView(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20 dark:bg-emerald-700'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 hover:text-emerald-800 dark:hover:text-emerald-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive
                          ? 'text-amber-300'
                          : 'text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-800'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && item.badge > 0 ? (
                    <span className="bg-amber-400 text-emerald-950 font-bold text-[10px] px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Quick Online Live Class Join Card */}
          {role === 'student' && activeStudent && (
            <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-emerald-50 dark:from-gray-800 dark:to-emerald-950/40 border border-amber-200/70 dark:border-emerald-800/40 text-left">
              <div className="flex items-center space-x-2 text-emerald-900 dark:text-emerald-300 font-bold text-xs mb-1">
                <Video className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                <span>Live Classroom</span>
              </div>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 mb-2">
                {activeStudent.primaryCourse} with {activeStudent.assignedTeacherName}
              </p>
              <a
                href={activeStudent.meetUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center space-x-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold py-2 px-3 rounded-xl shadow transition"
              >
                <span>Join Google Meet</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </a>
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-emerald-100 dark:border-gray-800 text-center text-[10px] text-gray-400 dark:text-gray-500">
          <p>© 2026 Faizan-e-Ilm Online Academy</p>
          <p className="text-emerald-700 dark:text-emerald-400 font-medium">Spreading Quranic Education Worldwide</p>
        </div>
      </aside>
    </>
  );
};
