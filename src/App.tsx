import React, { useState } from 'react';
import { AcademyProvider, useAcademy } from './context/AcademyContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LoginScreen } from './components/auth/LoginScreen';
import { DashboardView } from './components/student/DashboardView';
import { MyCoursesView } from './components/student/MyCoursesView';
import { AttendanceView } from './components/student/AttendanceView';
import { DailyPerformanceView } from './components/student/DailyPerformanceView';
import { HomeworkView } from './components/student/HomeworkView';
import { TestsResultsView } from './components/student/TestsResultsView';
import { FeeSectionView } from './components/student/FeeSectionView';
import { ClassScheduleView } from './components/student/ClassScheduleView';
import { CertificatesView } from './components/student/CertificatesView';
import { TeacherProfileView } from './components/student/TeacherProfileView';
import { ProfileView } from './components/student/ProfileView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PrayerTimesWidget } from './components/common/PrayerTimesWidget';
import { NotificationsDrawer } from './components/common/NotificationsDrawer';
import { Menu } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { isLoggedIn, role, darkMode } = useAcademy();
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [prayerTimesOpen, setPrayerTimesOpen] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  // Adjust default view if switching to admin role
  const activeView = role === 'admin' && !currentView.startsWith('admin-') ? 'admin-dashboard' : currentView;

  const renderView = () => {
    if (role === 'admin' || activeView.startsWith('admin-')) {
      return <AdminDashboard />;
    }

    switch (activeView) {
      case 'dashboard':
        return <DashboardView onNavigate={(view) => setCurrentView(view)} />;
      case 'courses':
        return <MyCoursesView />;
      case 'schedule':
        return <ClassScheduleView />;
      case 'attendance':
        return <AttendanceView />;
      case 'daily-performance':
        return <DailyPerformanceView />;
      case 'homework':
        return <HomeworkView />;
      case 'tests-results':
        return <TestsResultsView onNavigate={(view) => setCurrentView(view)} />;
      case 'fee-section':
        return <FeeSectionView />;
      case 'certificates':
        return <CertificatesView />;
      case 'teacher-profile':
        return <TeacherProfileView />;
      case 'profile':
        return <ProfileView />;
      case 'notifications':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-xl font-bold font-serif text-emerald-950 dark:text-emerald-300 mb-4">
              All Academy Notifications
            </h2>
            <NotificationsDrawer isOpen={true} onClose={() => setCurrentView('dashboard')} />
          </div>
        );
      default:
        return <DashboardView onNavigate={(view) => setCurrentView(view)} />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-950 text-gray-100' : 'bg-emerald-50/40 text-gray-800'} transition-colors font-sans antialiased`}>
      
      {/* Top Navbar */}
      <Navbar
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenPrayerTimes={() => setPrayerTimesOpen(true)}
      />

      <div className="flex max-w-7xl mx-auto">
        
        {/* Mobile Sidebar Toggle Button Bar */}
        <div className="lg:hidden fixed bottom-4 right-4 z-40">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-3.5 bg-emerald-800 text-white rounded-full shadow-2xl border-2 border-amber-400 flex items-center justify-center"
            title="Toggle Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar */}
        <Sidebar
          currentView={activeView}
          setCurrentView={(v) => setCurrentView(v)}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Main Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-5xl">
          {renderView()}
        </main>

      </div>

      {/* Global Modals / Drawers */}
      <PrayerTimesWidget
        isOpen={prayerTimesOpen}
        onClose={() => setPrayerTimesOpen(false)}
      />

      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <AcademyProvider>
      <MainLayout />
    </AcademyProvider>
  );
}
