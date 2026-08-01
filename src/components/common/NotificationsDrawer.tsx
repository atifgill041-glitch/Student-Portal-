import React from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { X, Bell, CheckCheck, Clock, Calendar, Receipt, Award } from 'lucide-react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const { notifications, markNotificationRead } = useAcademy();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'class_reminder':
        return <Clock className="w-4 h-4 text-emerald-600" />;
      case 'fee_reminder':
        return <Receipt className="w-4 h-4 text-amber-600" />;
      case 'test_schedule':
        return <Award className="w-4 h-4 text-blue-600" />;
      case 'holiday':
        return <Calendar className="w-4 h-4 text-purple-600" />;
      default:
        return <Bell className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl border-l border-emerald-100 dark:border-gray-800 flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 bg-emerald-900 text-white flex items-center justify-between shadow">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-base">Academy Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No new notifications</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                  n.isRead
                    ? 'bg-gray-50/70 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800 opacity-80'
                    : 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/70 shadow-sm'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-xs text-gray-900 dark:text-gray-100">
                        {n.title}
                      </h4>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
                      {n.message}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                      <span>{n.date}</span>
                      {n.isRead && (
                        <span className="flex items-center space-x-1 text-emerald-600">
                          <CheckCheck className="w-3 h-3" />
                          <span>Read</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition shadow"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
};
