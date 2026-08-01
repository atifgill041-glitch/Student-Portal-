export type UserRole = 'student' | 'teacher' | 'admin';

export type Language = 'en' | 'ur' | 'ar';

export interface Student {
  id: string;
  registrationNumber: string;
  name: string;
  parentName: string;
  email: string;
  whatsapp: string;
  country: string;
  countryFlag: string;
  timezone: string;
  avatarUrl: string;
  assignedTeacherId: string;
  assignedTeacherName: string;
  enrolledCourses: string[]; // Course IDs
  primaryCourse: string;
  classTime: string;
  classDays: string; // e.g. "Mon - Fri"
  meetUrl: string;
  attendancePercentage: number;
  currentLesson: string;
  overallProgressPercentage: number;
  feeStatus: 'Paid' | 'Due' | 'Overdue';
  monthlyFee: number;
  currency: string;
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  photoUrl: string;
  qualification: string;
  experienceYears: number;
  whatsapp: string;
  email: string;
  specialization: string[];
  totalStudents: number;
}

export interface Course {
  id: string;
  title: string;
  titleArabic?: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
  iconName: string;
  syllabus: string[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  status: 'present' | 'absent' | 'late';
  note?: string;
}

export interface DailyPerformance {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  lessonCovered: string;
  tajweedRating: number; // 1 to 5
  memorizationRating: number; // 1 to 5
  fluencyRating: number; // 1 to 5
  homeworkAssigned: string;
  teacherRemarks: string;
}

export interface Homework {
  id: string;
  studentId: string;
  courseId: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Reviewed';
  teacherFeedback?: string;
  submissionNote?: string;
}

export interface TestResult {
  id: string;
  studentId: string;
  testType: 'Weekly Test' | 'Monthly Test' | 'Final Exam';
  testName: string;
  courseName: string;
  date: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'F';
  remarks: string;
}

export interface FeeRecord {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  month: string; // e.g. "August 2026"
  amount: number;
  currency: string;
  status: 'Paid' | 'Due' | 'Overdue';
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
}

export interface NotificationItem {
  id: string;
  studentId?: string; // empty means for all
  type: 'class_reminder' | 'holiday' | 'fee_reminder' | 'test_schedule' | 'announcement';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  priority?: 'low' | 'normal' | 'high';
}

export interface Certificate {
  id: string;
  certificateCode: string;
  studentId: string;
  studentName: string;
  courseName: string;
  grade: string;
  completionDate: string;
  issueDate: string;
  teacherName: string;
  qrCodeUrl?: string;
}

export interface TimetableItem {
  id: string;
  studentId: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string; // e.g. "17:00"
  endTime: string;   // e.g. "17:45"
  courseName: string;
  teacherName: string;
  meetUrl: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  postedDate: string;
  postedBy: string;
  targetAudience: 'All' | 'Students' | 'Teachers';
}
