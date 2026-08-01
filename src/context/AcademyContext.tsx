import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Language,
  Student,
  Teacher,
  Course,
  AttendanceRecord,
  DailyPerformance,
  Homework,
  TestResult,
  FeeRecord,
  NotificationItem,
  Certificate,
  TimetableItem,
  Announcement
} from '../types';

import {
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_COURSES,
  INITIAL_ATTENDANCE,
  INITIAL_DAILY_PERFORMANCE,
  INITIAL_HOMEWORK,
  INITIAL_TEST_RESULTS,
  INITIAL_FEE_RECORDS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CERTIFICATES,
  INITIAL_TIMETABLE,
  INITIAL_ANNOUNCEMENTS
} from '../data/initialData';

interface AcademyContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  isLoggedIn: boolean;
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
  activeStudent: Student | undefined;
  
  // Data State
  students: Student[];
  teachers: Teacher[];
  courses: Course[];
  attendance: AttendanceRecord[];
  dailyPerformances: DailyPerformance[];
  homeworks: Homework[];
  testResults: TestResult[];
  feeRecords: FeeRecord[];
  notifications: NotificationItem[];
  certificates: Certificate[];
  timetable: TimetableItem[];
  announcements: Announcement[];

  // Actions
  login: (role: UserRole, studentId?: string) => void;
  logout: () => void;
  markAttendance: (studentId: string, date: string, status: 'present' | 'absent' | 'late', note?: string) => void;
  addDailyPerformance: (perf: Omit<DailyPerformance, 'id'>) => void;
  addHomework: (hw: Omit<Homework, 'id'>) => void;
  updateHomeworkStatus: (id: string, status: 'Pending' | 'Submitted' | 'Reviewed', note?: string) => void;
  addStudent: (student: Omit<Student, 'id' | 'registrationNumber'>) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  markFeeAsPaid: (feeId: string, method?: string) => void;
  createFeeRecord: (fee: Omit<FeeRecord, 'id' | 'receiptNumber'>) => void;
  issueCertificate: (cert: Omit<Certificate, 'id' | 'certificateCode'>) => void;
  sendNotification: (notif: Omit<NotificationItem, 'id' | 'date' | 'isRead'>) => void;
  markNotificationRead: (id: string) => void;
  resetAllData: () => void;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'faizan_e_ilm_academy_data_v1';

export const AcademyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('student');
  const [language, setLanguage] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [activeStudentId, setActiveStudentId] = useState<string>('st-001');

  // Entities state
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [dailyPerformances, setDailyPerformances] = useState<DailyPerformance[]>(INITIAL_DAILY_PERFORMANCE);
  const [homeworks, setHomeworks] = useState<Homework[]>(INITIAL_HOMEWORK);
  const [testResults, setTestResults] = useState<TestResult[]>(INITIAL_TEST_RESULTS);
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>(INITIAL_FEE_RECORDS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [certificates, setCertificates] = useState<Certificate[]>(INITIAL_CERTIFICATES);
  const [timetable, setTimetable] = useState<TimetableItem[]>(INITIAL_TIMETABLE);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.students) setStudents(parsed.students);
        if (parsed.teachers) setTeachers(parsed.teachers);
        if (parsed.attendance) setAttendance(parsed.attendance);
        if (parsed.dailyPerformances) setDailyPerformances(parsed.dailyPerformances);
        if (parsed.homeworks) setHomeworks(parsed.homeworks);
        if (parsed.testResults) setTestResults(parsed.testResults);
        if (parsed.feeRecords) setFeeRecords(parsed.feeRecords);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.certificates) setCertificates(parsed.certificates);
        if (parsed.announcements) setAnnouncements(parsed.announcements);
      }
    } catch (e) {
      console.error('Failed to parse saved state from local storage', e);
    }
  }, []);

  // Save changes to local storage
  useEffect(() => {
    try {
      const stateToSave = {
        students,
        teachers,
        attendance,
        dailyPerformances,
        homeworks,
        testResults,
        feeRecords,
        notifications,
        certificates,
        announcements
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save state to local storage', e);
    }
  }, [
    students,
    teachers,
    attendance,
    dailyPerformances,
    homeworks,
    testResults,
    feeRecords,
    notifications,
    certificates,
    announcements
  ]);

  const activeStudent = students.find((s) => s.id === activeStudentId) || students[0];

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (!isLoggedIn) setIsLoggedIn(true);
  };

  const login = (newRole: UserRole, studentId?: string) => {
    setRoleState(newRole);
    if (studentId) {
      setActiveStudentId(studentId);
    }
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const markAttendance = (
    studentId: string,
    date: string,
    status: 'present' | 'absent' | 'late',
    note?: string
  ) => {
    setAttendance((prev) => {
      const existingIdx = prev.findIndex((a) => a.studentId === studentId && a.date === date);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = { ...updated[existingIdx], status, note };
        return updated;
      } else {
        return [
          {
            id: `att-${Date.now()}`,
            studentId,
            date,
            status,
            note
          },
          ...prev
        ];
      }
    });

    // Recalculate attendance percentage
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const studentAtts = attendance.filter((a) => a.studentId === studentId);
          const total = studentAtts.length + 1;
          const presents = studentAtts.filter((a) => a.status === 'present' || a.status === 'late').length + (status !== 'absent' ? 1 : 0);
          const pct = Math.round((presents / total) * 100);
          return { ...s, attendancePercentage: pct };
        }
        return s;
      })
    );
  };

  const addDailyPerformance = (perf: Omit<DailyPerformance, 'id'>) => {
    const newPerf: DailyPerformance = {
      ...perf,
      id: `dp-${Date.now()}`
    };
    setDailyPerformances((prev) => [newPerf, ...prev]);

    // Send notification to student
    sendNotification({
      studentId: perf.studentId,
      type: 'announcement',
      title: '🌟 New Teacher Performance Evaluation',
      message: `Your teacher posted new lesson evaluation for ${perf.date}: "${perf.lessonCovered}"`,
      priority: 'normal'
    });
  };

  const addHomework = (hw: Omit<Homework, 'id'>) => {
    const newHw: Homework = {
      ...hw,
      id: `hw-${Date.now()}`
    };
    setHomeworks((prev) => [newHw, ...prev]);

    sendNotification({
      studentId: hw.studentId,
      type: 'announcement',
      title: '📚 New Homework Assigned',
      message: `Task: ${hw.title}. Due Date: ${hw.dueDate}`,
      priority: 'high'
    });
  };

  const updateHomeworkStatus = (
    id: string,
    status: 'Pending' | 'Submitted' | 'Reviewed',
    note?: string
  ) => {
    setHomeworks((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          return {
            ...h,
            status,
            submissionNote: note || h.submissionNote
          };
        }
        return h;
      })
    );
  };

  const addStudent = (studentData: Omit<Student, 'id' | 'registrationNumber'>) => {
    const count = students.length + 105;
    const newId = `st-${Date.now()}`;
    const newReg = `FEI-2026-${count.toString().padStart(3, '0')}`;

    const newStudent: Student = {
      ...studentData,
      id: newId,
      registrationNumber: newReg,
    };

    setStudents((prev) => [...prev, newStudent]);

    // Generate starter fee record
    createFeeRecord({
      studentId: newId,
      studentName: newStudent.name,
      month: 'August 2026',
      amount: newStudent.monthlyFee,
      currency: newStudent.currency,
      status: 'Due',
      dueDate: '2026-08-10'
    });
  };

  const updateStudent = (id: string, data: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s))
    );
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const markFeeAsPaid = (feeId: string, method: string = 'Online Gateway / Direct') => {
    setFeeRecords((prev) =>
      prev.map((f) => {
        if (f.id === feeId) {
          const updated: FeeRecord = {
            ...f,
            status: 'Paid',
            paidDate: new Date().toISOString().split('T')[0],
            paymentMethod: method
          };
          // Also update student's fee status if it's their active fee
          setStudents((sList) =>
            sList.map((s) => (s.id === f.studentId ? { ...s, feeStatus: 'Paid' } : s))
          );
          return updated;
        }
        return f;
      })
    );
  };

  const createFeeRecord = (fee: Omit<FeeRecord, 'id' | 'receiptNumber'>) => {
    const newRecord: FeeRecord = {
      ...fee,
      id: `fee-${Date.now()}`,
      receiptNumber: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setFeeRecords((prev) => [newRecord, ...prev]);
  };

  const issueCertificate = (cert: Omit<Certificate, 'id' | 'certificateCode'>) => {
    const randomCode = `FEI-CERT-${Math.floor(10000 + Math.random() * 90000)}`;
    const newCert: Certificate = {
      ...cert,
      id: `cert-${Date.now()}`,
      certificateCode: randomCode,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${randomCode}-VERIFIED`
    };
    setCertificates((prev) => [newCert, ...prev]);

    sendNotification({
      studentId: cert.studentId,
      type: 'announcement',
      title: '🎓 Graduation Certificate Issued!',
      message: `Congratulations! Your official certificate for "${cert.courseName}" has been issued. View and download it in your portal.`,
      priority: 'high'
    });
  };

  const sendNotification = (notif: Omit<NotificationItem, 'id' | 'date' | 'isRead'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `n-${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      isRead: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const resetAllData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setStudents(INITIAL_STUDENTS);
    setTeachers(INITIAL_TEACHERS);
    setCourses(INITIAL_COURSES);
    setAttendance(INITIAL_ATTENDANCE);
    setDailyPerformances(INITIAL_DAILY_PERFORMANCE);
    setHomeworks(INITIAL_HOMEWORK);
    setTestResults(INITIAL_TEST_RESULTS);
    setFeeRecords(INITIAL_FEE_RECORDS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCertificates(INITIAL_CERTIFICATES);
    setTimetable(INITIAL_TIMETABLE);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setActiveStudentId('st-001');
    setRoleState('student');
  };

  return (
    <AcademyContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        darkMode,
        setDarkMode,
        isLoggedIn,
        activeStudentId,
        setActiveStudentId,
        activeStudent,
        students,
        teachers,
        courses,
        attendance,
        dailyPerformances,
        homeworks,
        testResults,
        feeRecords,
        notifications,
        certificates,
        timetable,
        announcements,
        login,
        logout,
        markAttendance,
        addDailyPerformance,
        addHomework,
        updateHomeworkStatus,
        addStudent,
        updateStudent,
        deleteStudent,
        markFeeAsPaid,
        createFeeRecord,
        issueCertificate,
        sendNotification,
        markNotificationRead,
        resetAllData
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};
