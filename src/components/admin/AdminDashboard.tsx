import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import {
  ShieldCheck,
  UserPlus,
  Users,
  CalendarCheck,
  Receipt,
  Medal,
  Bell,
  Award,
  BookMarked,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  Plus,
  Sparkles,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Student } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    students,
    teachers,
    courses,
    feeRecords,
    attendance,
    addStudent,
    deleteStudent,
    markAttendance,
    addDailyPerformance,
    addHomework,
    markFeeAsPaid,
    issueCertificate,
    sendNotification
  } = useAcademy();

  const [adminTab, setAdminTab] = useState<
    'analytics' | 'students' | 'attendance' | 'evaluation' | 'homework' | 'fees' | 'certificates' | 'announcements'
  >('analytics');

  // New student modal form state
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    name: '',
    parentName: '',
    email: '',
    whatsapp: '',
    country: 'United States',
    countryFlag: '🇺🇸',
    timezone: 'EST (UTC-5)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    assignedTeacherId: 't-101',
    assignedTeacherName: 'Qari Abdul Basit',
    enrolledCourses: ['c-101'],
    primaryCourse: 'Madani Qaida',
    classTime: '06:00 PM EST',
    classDays: 'Mon - Fri',
    meetUrl: 'https://meet.google.com/fei-quran-live',
    attendancePercentage: 100,
    currentLesson: 'Madani Qaida Lesson 1',
    overallProgressPercentage: 0,
    feeStatus: 'Due' as 'Paid' | 'Due' | 'Overdue',
    monthlyFee: 60,
    currency: '$'
  });

  // Daily evaluation form state
  const [evalStudentId, setEvalStudentId] = useState('st-001');
  const [evalDate, setEvalDate] = useState(new Date().toISOString().split('T')[0]);
  const [evalLesson, setEvalLesson] = useState('Surah Al-Mulk Verses 1-12');
  const [evalTajweed, setEvalTajweed] = useState(5);
  const [evalMem, setEvalMem] = useState(4);
  const [evalFluency, setEvalFluency] = useState(5);
  const [evalHw, setEvalHw] = useState('Revise Surah Al-Mulk 5 times');
  const [evalRemarks, setEvalRemarks] = useState('Excellent performance & pronunciation.');
  const [evalSubmitted, setEvalSubmitted] = useState(false);

  // Homework form state
  const [hwStudentId, setHwStudentId] = useState('st-001');
  const [hwTitle, setHwTitle] = useState('');
  const [hwDesc, setHwDesc] = useState('');
  const [hwDueDate, setHwDueDate] = useState('2026-08-05');
  const [hwSubmitted, setHwSubmitted] = useState(false);

  // Announcement form state
  const [annTitle, setAnnTitle] = useState('');
  const [annMsg, setAnnMsg] = useState('');
  const [annSent, setAnnSent] = useState(false);

  // Stats Analytics data
  const totalRevenue = feeRecords
    .filter((f) => f.status === 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const revenueData = [
    { month: 'May', amount: 3200 },
    { month: 'Jun', amount: 4100 },
    { month: 'Jul', amount: 4800 },
    { month: 'Aug', amount: 5600 },
  ];

  const courseDistribution = [
    { name: 'Madani Qaida', value: 35 },
    { name: 'Nazra Quran', value: 25 },
    { name: 'Tajweed', value: 20 },
    { name: 'Hifz Quran', value: 12 },
    { name: 'Islamic Edu', value: 8 },
  ];

  const COLORS = ['#0B6E4F', '#D4AF37', '#3B82F6', '#8B5CF6', '#EC4899'];

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const teacherObj = teachers.find((t) => t.id === newStudentData.assignedTeacherId);
    addStudent({
      ...newStudentData,
      assignedTeacherName: teacherObj ? teacherObj.name : 'Qari Abdul Basit'
    });
    setShowAddStudentModal(false);
  };

  const handleEvaluationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDailyPerformance({
      studentId: evalStudentId,
      date: evalDate,
      lessonCovered: evalLesson,
      tajweedRating: evalTajweed,
      memorizationRating: evalMem,
      fluencyRating: evalFluency,
      homeworkAssigned: evalHw,
      teacherRemarks: evalRemarks
    });
    setEvalSubmitted(true);
    setTimeout(() => setEvalSubmitted(false), 2500);
  };

  const handleHomeworkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHomework({
      studentId: hwStudentId,
      courseId: 'c-101',
      title: hwTitle,
      description: hwDesc,
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: hwDueDate,
      status: 'Pending'
    });
    setHwSubmitted(true);
    setHwTitle('');
    setHwDesc('');
    setTimeout(() => setHwSubmitted(false), 2500);
  };

  const handleAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendNotification({
      type: 'announcement',
      title: `📢 ${annTitle}`,
      message: annMsg,
      priority: 'high'
    });
    setAnnSent(true);
    setAnnTitle('');
    setAnnMsg('');
    setTimeout(() => setAnnSent(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Admin Banner Header */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-amber-500/60">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 bg-amber-900/50 text-amber-200 text-xs px-3 py-1 rounded-full border border-amber-400/30 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Administrative Directorship Panel</span>
          </div>
          <h1 className="text-2xl font-serif font-bold tracking-wide">
            Faizan-e-Ilm Academy Operations Management
          </h1>
          <p className="text-xs text-amber-100">
            Full control over student admissions, teacher evaluations, fee collection & certificates
          </p>
        </div>

        <button
          onClick={() => setShowAddStudentModal(true)}
          className="px-5 py-3 bg-white hover:bg-amber-50 text-emerald-950 font-black text-xs rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 shrink-0"
        >
          <UserPlus className="w-4 h-4 text-emerald-800" />
          <span>+ Add New Student</span>
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex overflow-x-auto gap-2 bg-white dark:bg-gray-800 p-2 rounded-2xl border border-emerald-100 dark:border-gray-700 text-xs font-bold scrollbar-none">
        {[
          { id: 'analytics', label: '📊 Dashboard Analytics' },
          { id: 'students', label: '👥 Manage Students' },
          { id: 'attendance', label: '📅 Mark Attendance' },
          { id: 'evaluation', label: '⭐ Post Daily Evaluation' },
          { id: 'homework', label: '📚 Add Homework' },
          { id: 'fees', label: '💳 Fee Management' },
          { id: 'certificates', label: '🎓 Issue Certificates' },
          { id: 'announcements', label: '📢 Post Notices' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition ${
              adminTab === tab.id
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Analytics */}
      {adminTab === 'analytics' && (
        <div className="space-y-6">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Total Enrolled Students</p>
                <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-300 mt-1 font-mono">
                  {students.length} Students
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Total Qaris & Teachers</p>
                <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-300 mt-1 font-mono">
                  {teachers.length} Instructors
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Total Revenue Collected</p>
                <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-300 mt-1 font-mono">
                  ${totalRevenue + 17700}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Average Attendance Rate</p>
                <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-300 mt-1 font-mono">
                  94 font-mono
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Revenue Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                📈 Monthly Fee Collection Trend ($ USD)
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#0B6E4F" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Course Enrollment Breakdown */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                🥧 Course Enrollment Distribution (%)
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={courseDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {courseDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Tab 2: Manage Students */}
      {adminTab === 'students' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              Student Directory ({students.length} Active Records)
            </h3>
            <button
              onClick={() => setShowAddStudentModal(true)}
              className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-900"
            >
              + Register Student
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 uppercase text-[10px] font-bold text-gray-400">
                  <th className="p-3">Reg No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Parent</th>
                  <th className="p-3">Country</th>
                  <th className="p-3">Teacher</th>
                  <th className="p-3">Primary Course</th>
                  <th className="p-3">Fee Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/60">
                    <td className="p-3 font-mono font-bold text-emerald-900 dark:text-emerald-300">
                      {st.registrationNumber}
                    </td>
                    <td className="p-3 font-bold text-gray-900 dark:text-white">{st.name}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-300">{st.parentName}</td>
                    <td className="p-3">{st.countryFlag} {st.country}</td>
                    <td className="p-3 text-emerald-700 dark:text-emerald-400 font-medium">{st.assignedTeacherName}</td>
                    <td className="p-3">{st.primaryCourse}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          st.feeStatus === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {st.feeStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => deleteStudent(st.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                        title="Delete Student"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Mark Attendance */}
      {adminTab === 'attendance' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-emerald-100 dark:border-gray-700 p-6 shadow-sm space-y-4 max-w-2xl mx-auto">
          <h3 className="font-bold text-base text-gray-900 dark:text-white">
            Mark Daily Class Attendance
          </h3>
          
          <div className="space-y-4 text-xs">
            {students.map((st) => (
              <div
                key={st.id}
                className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">{st.name}</h4>
                  <p className="text-[11px] text-gray-500 font-mono">{st.registrationNumber} • {st.primaryCourse}</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => markAttendance(st.id, new Date().toISOString().split('T')[0], 'present')}
                    className="px-3 py-1.5 bg-emerald-800 text-white rounded-xl font-bold hover:bg-emerald-900"
                  >
                    ✅ Present
                  </button>
                  <button
                    onClick={() => markAttendance(st.id, new Date().toISOString().split('T')[0], 'late')}
                    className="px-3 py-1.5 bg-amber-500 text-emerald-950 rounded-xl font-bold hover:bg-amber-600"
                  >
                    ⏰ Late
                  </button>
                  <button
                    onClick={() => markAttendance(st.id, new Date().toISOString().split('T')[0], 'absent')}
                    className="px-3 py-1.5 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700"
                  >
                    ❌ Absent
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Post Daily Evaluation */}
      {adminTab === 'evaluation' && (
        <form
          onSubmit={handleEvaluationSubmit}
          className="bg-white dark:bg-gray-800 rounded-3xl border border-emerald-100 dark:border-gray-700 p-6 shadow-sm space-y-4 max-w-2xl mx-auto text-xs"
        >
          <h3 className="font-bold text-base text-gray-900 dark:text-white">
            Post Teacher Daily Evaluation
          </h3>

          {evalSubmitted && (
            <div className="p-3 bg-emerald-100 text-emerald-800 font-bold rounded-xl text-center">
              ✓ Daily Performance Log Published to Student Portal!
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Select Student</label>
              <select
                value={evalStudentId}
                onChange={(e) => setEvalStudentId(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.registrationNumber})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">Date</label>
              <input
                type="date"
                value={evalDate}
                onChange={(e) => setEvalDate(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Lesson Covered Today</label>
            <input
              type="text"
              required
              value={evalLesson}
              onChange={(e) => setEvalLesson(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold mb-1">Tajweed (1-5 ⭐)</label>
              <input
                type="number"
                min={1}
                max={5}
                value={evalTajweed}
                onChange={(e) => setEvalTajweed(parseInt(e.target.value))}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Memorization (1-5 ⭐)</label>
              <input
                type="number"
                min={1}
                max={5}
                value={evalMem}
                onChange={(e) => setEvalMem(parseInt(e.target.value))}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Fluency (1-5 ⭐)</label>
              <input
                type="number"
                min={1}
                max={5}
                value={evalFluency}
                onChange={(e) => setEvalFluency(parseInt(e.target.value))}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Homework Assigned</label>
            <input
              type="text"
              value={evalHw}
              onChange={(e) => setEvalHw(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Teacher Remarks</label>
            <textarea
              rows={2}
              value={evalRemarks}
              onChange={(e) => setEvalRemarks(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-800 text-white font-bold rounded-2xl hover:bg-emerald-900"
          >
            Publish Daily Evaluation
          </button>
        </form>
      )}

      {/* Tab 5: Add Homework */}
      {adminTab === 'homework' && (
        <form
          onSubmit={handleHomeworkSubmit}
          className="bg-white dark:bg-gray-800 rounded-3xl border border-emerald-100 dark:border-gray-700 p-6 shadow-sm space-y-4 max-w-2xl mx-auto text-xs"
        >
          <h3 className="font-bold text-base text-gray-900 dark:text-white">
            Add New Homework Task
          </h3>

          {hwSubmitted && (
            <div className="p-3 bg-emerald-100 text-emerald-800 font-bold rounded-xl text-center">
              ✓ Homework Assignment Sent to Student!
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Select Student</label>
              <select
                value={hwStudentId}
                onChange={(e) => setHwStudentId(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.registrationNumber})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">Due Date</label>
              <input
                type="date"
                value={hwDueDate}
                onChange={(e) => setHwDueDate(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Homework Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Surah Al-Mulk Verse 1-12 Practice"
              value={hwTitle}
              onChange={(e) => setHwTitle(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Instructions / Description</label>
            <textarea
              rows={3}
              required
              placeholder="Detailed instructions for student practice..."
              value={hwDesc}
              onChange={(e) => setHwDesc(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-800 text-white font-bold rounded-2xl hover:bg-emerald-900"
          >
            Assign Homework
          </button>
        </form>
      )}

      {/* Tab 6: Fee Management */}
      {adminTab === 'fees' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-emerald-100 dark:border-gray-700 p-6 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-base text-gray-900 dark:text-white">
            Fee Collection & Invoicing Overview
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 uppercase text-[10px] font-bold text-gray-400 border-b border-gray-100 dark:border-gray-800">
                  <th className="p-3">Receipt No</th>
                  <th className="p-3">Student</th>
                  <th className="p-3">Month</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {feeRecords.map((fee) => (
                  <tr key={fee.id}>
                    <td className="p-3 font-mono font-bold text-emerald-900 dark:text-emerald-300">{fee.receiptNumber}</td>
                    <td className="p-3 font-bold">{fee.studentName}</td>
                    <td className="p-3">{fee.month}</td>
                    <td className="p-3 font-mono font-bold">{fee.currency}{fee.amount}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          fee.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {fee.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {fee.status !== 'Paid' && (
                        <button
                          onClick={() => markFeeAsPaid(fee.id, 'Cash / Direct Admin')}
                          className="px-3 py-1 bg-emerald-800 text-white rounded-lg font-bold"
                        >
                          Mark Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 7: Issue Certificates */}
      {adminTab === 'certificates' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-emerald-100 dark:border-gray-700 p-6 shadow-sm space-y-4 max-w-xl mx-auto text-xs">
          <h3 className="font-bold text-base text-gray-900 dark:text-white">
            Issue Digital Verified Graduation Certificate
          </h3>

          <button
            onClick={() => {
              issueCertificate({
                studentId: 'st-001',
                studentName: 'Muhammad Abdullah',
                courseName: 'Tajweed & Quran Recitation Advanced Course',
                grade: 'Grade A+ (Top Honors)',
                completionDate: new Date().toISOString().split('T')[0],
                issueDate: new Date().toISOString().split('T')[0],
                teacherName: 'Qari Abdul Basit'
              });
            }}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black rounded-2xl shadow-md"
          >
            🎓 Issue Certificate to Demo Student (Muhammad Abdullah)
          </button>
        </div>
      )}

      {/* Tab 8: Post Announcements */}
      {adminTab === 'announcements' && (
        <form
          onSubmit={handleAnnouncementSubmit}
          className="bg-white dark:bg-gray-800 rounded-3xl border border-emerald-100 dark:border-gray-700 p-6 shadow-sm space-y-4 max-w-xl mx-auto text-xs"
        >
          <h3 className="font-bold text-base text-gray-900 dark:text-white">
            Send System Notice & WhatsApp Alert
          </h3>

          {annSent && (
            <div className="p-3 bg-emerald-100 text-emerald-800 font-bold rounded-xl text-center">
              ✓ Announcement Broadcasted to All Students & Parents!
            </div>
          )}

          <div>
            <label className="block font-bold mb-1">Notice Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Eid Holiday Schedule Announcement"
              value={annTitle}
              onChange={(e) => setAnnTitle(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Message Body</label>
            <textarea
              rows={3}
              required
              placeholder="Enter announcement text for portal..."
              value={annMsg}
              onChange={(e) => setAnnMsg(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-800 text-white font-bold rounded-2xl hover:bg-emerald-900"
          >
            Broadcast Announcement
          </button>
        </form>
      )}

      {/* Modal: Add Student */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 border border-emerald-200 dark:border-gray-800 w-full max-w-lg rounded-3xl shadow-2xl p-6 relative my-8 space-y-4">
            <h3 className="font-bold text-lg font-serif text-emerald-950 dark:text-emerald-300">
              Register New Student
            </h3>

            <form onSubmit={handleAddStudentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Student Name</label>
                <input
                  type="text"
                  required
                  value={newStudentData.name}
                  onChange={(e) => setNewStudentData({ ...newStudentData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Parent Name</label>
                <input
                  type="text"
                  required
                  value={newStudentData.parentName}
                  onChange={(e) => setNewStudentData({ ...newStudentData, parentName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newStudentData.email}
                    onChange={(e) => setNewStudentData({ ...newStudentData, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">WhatsApp</label>
                  <input
                    type="text"
                    required
                    value={newStudentData.whatsapp}
                    onChange={(e) => setNewStudentData({ ...newStudentData, whatsapp: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Course</label>
                  <select
                    value={newStudentData.primaryCourse}
                    onChange={(e) => setNewStudentData({ ...newStudentData, primaryCourse: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                  >
                    <option value="Madani Qaida">Madani Qaida</option>
                    <option value="Nazra Quran">Nazra Quran</option>
                    <option value="Tajweed-ul-Quran">Tajweed-ul-Quran</option>
                    <option value="Hifz Quran">Hifz Quran</option>
                    <option value="Islamic Education">Islamic Education</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Assigned Teacher</label>
                  <select
                    value={newStudentData.assignedTeacherId}
                    onChange={(e) => setNewStudentData({ ...newStudentData, assignedTeacherId: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                  >
                    {teachers.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 text-xs border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 text-white rounded-xl font-bold"
                >
                  Save & Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
