import {
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

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 't-101',
    name: 'Qari Abdul Basit',
    title: 'Senior Qari & Tajweed Specialist',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    qualification: 'Shahadat-ul-Aalamia & Qira’at Hafs (Dars-e-Nizami)',
    experienceYears: 10,
    whatsapp: '+923001234567',
    email: 'qari.abdulbasit@faizaneilm.org',
    specialization: ['Madani Qaida', 'Tajweed', 'Nazra Quran', 'Tafseer'],
    totalStudents: 34,
  },
  {
    id: 't-102',
    name: 'Alimah Aisha Siddiqua',
    title: 'Female Quran & Islamic Studies Teacher',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    qualification: 'Fazila (Dars-e-Nizami) & Hifz-ul-Quran',
    experienceYears: 8,
    whatsapp: '+923019876543',
    email: 'alimah.aisha@faizaneilm.org',
    specialization: ['Hifz Quran', 'Islamic Education', 'Translation Course'],
    totalStudents: 28,
  },
  {
    id: 't-103',
    name: 'Qari Tajammul Hussain',
    title: 'Hifz & Qiraat Expert',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    qualification: 'Hafiz-e-Quran & Qari Sub’a (7 Recitations)',
    experienceYears: 12,
    whatsapp: '+923025557788',
    email: 'qari.tajammul@faizaneilm.org',
    specialization: ['Hifz Quran', 'Nazra Quran', 'Tajweed'],
    totalStudents: 40,
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'st-001',
    registrationNumber: 'FEI-2026-089',
    name: 'Muhammad Abdullah',
    parentName: 'Tariq Mehmood',
    email: 'abdullah.student@gmail.com',
    whatsapp: '+14155552671',
    country: 'United States',
    countryFlag: '🇺🇸',
    timezone: 'EST (UTC-5)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    assignedTeacherId: 't-101',
    assignedTeacherName: 'Qari Abdul Basit',
    enrolledCourses: ['c-101', 'c-103', 'c-105'],
    primaryCourse: 'Tajweed-ul-Quran',
    classTime: '06:00 PM EST (Mon-Fri)',
    classDays: 'Mon - Fri',
    meetUrl: 'https://meet.google.com/fei-quran-live',
    attendancePercentage: 96,
    currentLesson: 'Surah Al-Mulk (Verses 1-12) & Makharij Rules',
    overallProgressPercentage: 78,
    feeStatus: 'Paid',
    monthlyFee: 60,
    currency: '$',
  },
  {
    id: 'st-002',
    registrationNumber: 'FEI-2026-104',
    name: 'Fatima Zahra',
    parentName: 'Usman Ali',
    email: 'fatima.zahra@gmail.com',
    whatsapp: '+447911123456',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    timezone: 'GMT (UTC+0)',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    assignedTeacherId: 't-102',
    assignedTeacherName: 'Alimah Aisha Siddiqua',
    enrolledCourses: ['c-104', 'c-106'],
    primaryCourse: 'Hifz Quran & Translation',
    classTime: '04:30 PM GMT (Mon-Sat)',
    classDays: 'Mon - Sat',
    meetUrl: 'https://meet.google.com/fei-hifz-live',
    attendancePercentage: 100,
    currentLesson: 'Juz 29 - Surah Al-Qalam Memorization',
    overallProgressPercentage: 88,
    feeStatus: 'Paid',
    monthlyFee: 75,
    currency: '£',
  },
  {
    id: 'st-003',
    registrationNumber: 'FEI-2026-210',
    name: 'Umar Farooq',
    parentName: 'Farooq Hassan',
    email: 'umar.farooq@gmail.com',
    whatsapp: '+971501234567',
    country: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    timezone: 'GST (UTC+4)',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    assignedTeacherId: 't-103',
    assignedTeacherName: 'Qari Tajammul Hussain',
    enrolledCourses: ['c-101', 'c-102'],
    primaryCourse: 'Madani Qaida & Nazra Quran',
    classTime: '07:30 PM GST (Mon-Fri)',
    classDays: 'Mon - Fri',
    meetUrl: 'https://meet.google.com/fei-qaida-live',
    attendancePercentage: 88,
    currentLesson: 'Madani Qaida Lesson 14: Noon Sakin & Tanween Rules',
    overallProgressPercentage: 62,
    feeStatus: 'Due',
    monthlyFee: 50,
    currency: '$',
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c-101',
    title: 'Madani Qaida',
    titleArabic: 'الـقاعِـدَة المَدَنِیَّۃ',
    description: 'Foundation course for beginners learning Arabic letters, pronunciation, and basic phonics.',
    totalLessons: 20,
    completedLessons: 14,
    progressPercentage: 70,
    iconName: 'BookOpen',
    syllabus: [
      'Lesson 1: Individual Letters (Huruf-e-Mufradat)',
      'Lesson 2: Compound Letters (Huruf-e-Murakkabat)',
      'Lesson 3: Abbreviated Letters (Huruf-e-Muqatta’at)',
      'Lesson 4: Short Vowels (Harakat: Fatha, Kasra, Damma)',
      'Lesson 5: Tanween (Double Vowels)',
      'Lesson 6: Maddah & Leen Letters',
      'Lesson 7: Sukoon / Jazm Rules',
      'Lesson 8: Tashdeed & Ghunnah Rules',
      'Lesson 9: Noon Sakin & Tanween (Idgham, Ikhfa, Izhar, Iqlab)',
      'Lesson 10: Final Practice & Test'
    ]
  },
  {
    id: 'c-102',
    title: 'Nazra Quran',
    titleArabic: 'نَاظِرَة القُرْآن الكَرِيم',
    description: 'Fluent reading of the Holy Quran with correct pronunciation and rhythm under teacher supervision.',
    totalLessons: 30,
    completedLessons: 21,
    progressPercentage: 70,
    iconName: 'BookMarked',
    syllabus: [
      'Juz 1 to 5: Fluency & Speed',
      'Juz 6 to 15: Phonetic accuracy & Stop Signs (Waqf)',
      'Juz 16 to 25: Recitation practice with proper Tajweed rules',
      'Juz 26 to 30: Complete recitation revision'
    ]
  },
  {
    id: 'c-103',
    title: 'Tajweed Course',
    titleArabic: 'عِلْم التَّجْوِيد',
    description: 'In-depth study of Makharij (points of articulation), Sifaat (characteristics), and Qira’at rules.',
    totalLessons: 24,
    completedLessons: 18,
    progressPercentage: 75,
    iconName: 'Sparkles',
    syllabus: [
      'Articulatory Organs (Makharij al-Huruf)',
      'Characteristics of Letters (Sifaat اللازمة والعارضة)',
      'Rules of Heavy and Light Letters (Tafkheem & Tarqeeq)',
      'Rules of Meem Sakin & Noon Sakin',
      'Types of Elongation (Madd Original & Secondary)',
      'Punctuation & Pausing Rules (Waqf & Ibtida)'
    ]
  },
  {
    id: 'c-104',
    title: 'Hifz Quran',
    titleArabic: 'حِفْظُ القُرْآن الكَرِيم',
    description: 'Structured Quranic memorization program with Sabaq, Sabqi, and Manzil daily system.',
    totalLessons: 30,
    completedLessons: 12,
    progressPercentage: 40,
    iconName: 'BookmarkCheck',
    syllabus: [
      'Sabaq: Daily new memorization assignment',
      'Sabqi: Revision of current Juz memorization',
      'Manzil: Long-term revision of previous Juzs',
      'Monthly Hifz evaluation tests'
    ]
  },
  {
    id: 'c-105',
    title: 'Islamic Education',
    titleArabic: 'التَّعْلِيم الإِسْلَامِي',
    description: 'Fundamental Islamic knowledge including Daily Masnoon Duas, Fardh Ain, Prayer rules, Seerah & Fiqh.',
    totalLessons: 16,
    completedLessons: 14,
    progressPercentage: 87,
    iconName: 'GraduationCap',
    syllabus: [
      'Daily Sunnah Duas & Azkar',
      'Salah (Namaz) Step-by-Step with Translation',
      'Wudu, Ghusl, and Purity (Taharah) Rules',
      '40 Short Hadiths with Practical Guidance',
      'Life of Prophet Muhammad (Peace Be Upon Him)',
      'Basic Islamic Ethics & Character Development'
    ]
  },
  {
    id: 'c-106',
    title: 'Translation Course',
    titleArabic: 'تَرْجَمَة وَتَفْسِير القُرْآن',
    description: 'Word-for-word translation and contextual summary (Tafseer) of selected Quranic Surahs.',
    totalLessons: 25,
    completedLessons: 15,
    progressPercentage: 60,
    iconName: 'Languages',
    syllabus: [
      'Word-by-word vocabulary of Juz Amma',
      'Grammatical breakdown of common Quranic words',
      'Historical context & Asbab al-Nuzul of key Surahs',
      'Practical lessons for daily life'
    ]
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att-1', studentId: 'st-001', date: '2026-08-01', status: 'present' },
  { id: 'att-2', studentId: 'st-001', date: '2026-07-31', status: 'present' },
  { id: 'att-3', studentId: 'st-001', date: '2026-07-30', status: 'late', note: 'Joined 10 mins late due to internet reconnection' },
  { id: 'att-4', studentId: 'st-001', date: '2026-07-29', status: 'present' },
  { id: 'att-5', studentId: 'st-001', date: '2026-07-28', status: 'present' },
  { id: 'att-6', studentId: 'st-001', date: '2026-07-25', status: 'absent', note: 'Informed leave - Doctor appointment' },
  { id: 'att-7', studentId: 'st-001', date: '2026-07-24', status: 'present' },
  { id: 'att-8', studentId: 'st-001', date: '2026-07-23', status: 'present' },
  { id: 'att-9', studentId: 'st-002', date: '2026-08-01', status: 'present' },
  { id: 'att-10', studentId: 'st-002', date: '2026-07-31', status: 'present' },
  { id: 'att-11', studentId: 'st-003', date: '2026-08-01', status: 'present' },
  { id: 'att-12', studentId: 'st-003', date: '2026-07-31', status: 'absent', note: 'Uninformed absence' },
];

export const INITIAL_DAILY_PERFORMANCE: DailyPerformance[] = [
  {
    id: 'dp-1',
    studentId: 'st-001',
    date: '2026-08-01',
    lessonCovered: 'Surah Al-Mulk Verses 1-8 recited with Makhraj focus.',
    tajweedRating: 5,
    memorizationRating: 4,
    fluencyRating: 5,
    homeworkAssigned: 'Revise Surah Al-Mulk Verses 1-12 & practice Madd Asli rules 5 times.',
    teacherRemarks: 'Excellent effort today! Pronunciation of Qaf (ق) and Khaf (ك) has significantly improved.'
  },
  {
    id: 'dp-2',
    studentId: 'st-001',
    date: '2026-07-31',
    lessonCovered: 'Rules of Ikhfa Shafawi & Idgham Mutamathilain in Meem Sakin.',
    tajweedRating: 4,
    memorizationRating: 4,
    fluencyRating: 4,
    homeworkAssigned: 'Mark 10 examples of Ikhfa Shafawi in Juz 29.',
    teacherRemarks: 'Good performance. Pay extra attention to Ghunnah duration.'
  },
  {
    id: 'dp-3',
    studentId: 'st-001',
    date: '2026-07-30',
    lessonCovered: 'Surah At-Tahreem Revision',
    tajweedRating: 4,
    memorizationRating: 5,
    fluencyRating: 4,
    homeworkAssigned: 'Prepare Surah Al-Mulk Verses 1-5 for next class.',
    teacherRemarks: 'Recitation was fluent despite arriving slightly late. Well done!'
  },
  {
    id: 'dp-4',
    studentId: 'st-002',
    date: '2026-08-01',
    lessonCovered: 'Surah Al-Haqqah 1-20 Memorization Sabaq',
    tajweedRating: 5,
    memorizationRating: 5,
    fluencyRating: 5,
    homeworkAssigned: 'Memorize remaining verses of Surah Al-Haqqah.',
    teacherRemarks: 'Mashallah, outstanding retention and flawless recitation.'
  }
];

export const INITIAL_HOMEWORK: Homework[] = [
  {
    id: 'hw-101',
    studentId: 'st-001',
    courseId: 'c-103',
    title: 'Makharij Practice Audio & Worksheet',
    description: 'Record audio reciting Surah Al-Fatiha focusing on throat letters (Halqi) and upload audio or write notes.',
    assignedDate: '2026-08-01',
    dueDate: '2026-08-03',
    status: 'Pending',
    teacherFeedback: ''
  },
  {
    id: 'hw-102',
    studentId: 'st-001',
    courseId: 'c-105',
    title: 'Dua After Wudu & Tashahhud Memorization',
    description: 'Memorize Arabic text and English translation of Dua after Wudu and reciting in next live class.',
    assignedDate: '2026-07-29',
    dueDate: '2026-07-31',
    status: 'Submitted',
    submissionNote: 'Memorized completely, recited during class on July 31st.',
    teacherFeedback: 'Verified in class! 10/10 perfect pronunciation.'
  },
  {
    id: 'hw-103',
    studentId: 'st-001',
    courseId: 'c-103',
    title: 'Noon Sakin Identification',
    description: 'Find 5 examples of Izhar and Iqlab in Surah Yaseen.',
    assignedDate: '2026-07-26',
    dueDate: '2026-07-28',
    status: 'Reviewed',
    submissionNote: 'Uploaded handwritten page scan.',
    teacherFeedback: 'All 5 examples correctly identified.'
  }
];

export const INITIAL_TEST_RESULTS: TestResult[] = [
  {
    id: 'tr-1',
    studentId: 'st-001',
    testType: 'Monthly Test',
    testName: 'July 2026 Tajweed & Recitation Assessment',
    courseName: 'Tajweed-ul-Quran',
    date: '2026-07-27',
    totalMarks: 100,
    obtainedMarks: 94,
    percentage: 94,
    grade: 'A+',
    remarks: 'Outstanding theoretical understanding of Makharij and practical recitation fluency.'
  },
  {
    id: 'tr-2',
    studentId: 'st-001',
    testType: 'Weekly Test',
    testName: 'Meem & Noon Sakin Rules Quiz',
    courseName: 'Tajweed-ul-Quran',
    date: '2026-07-20',
    totalMarks: 50,
    obtainedMarks: 46,
    percentage: 92,
    grade: 'A+',
    remarks: 'Very accurate identification of Iqlab and Ikhfa.'
  },
  {
    id: 'tr-3',
    studentId: 'st-001',
    testType: 'Final Exam',
    testName: 'Madani Qaida Completion Final Exam',
    courseName: 'Madani Qaida',
    date: '2026-06-15',
    totalMarks: 100,
    obtainedMarks: 98,
    percentage: 98,
    grade: 'A+',
    remarks: 'Completed Madani Qaida with top honors! Certificate issued.'
  }
];

export const INITIAL_FEE_RECORDS: FeeRecord[] = [
  {
    id: 'fee-101',
    receiptNumber: 'REC-2026-0801',
    studentId: 'st-001',
    studentName: 'Muhammad Abdullah',
    month: 'August 2026',
    amount: 60,
    currency: '$',
    status: 'Paid',
    dueDate: '2026-08-05',
    paidDate: '2026-08-01',
    paymentMethod: 'Credit Card / Stripe'
  },
  {
    id: 'fee-102',
    receiptNumber: 'REC-2026-0701',
    studentId: 'st-001',
    studentName: 'Muhammad Abdullah',
    month: 'July 2026',
    amount: 60,
    currency: '$',
    status: 'Paid',
    dueDate: '2026-07-05',
    paidDate: '2026-07-02',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'fee-103',
    receiptNumber: 'REC-2026-0802',
    studentId: 'st-003',
    studentName: 'Umar Farooq',
    month: 'August 2026',
    amount: 50,
    currency: '$',
    status: 'Due',
    dueDate: '2026-08-07',
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    studentId: 'st-001',
    type: 'class_reminder',
    title: '⏰ Class Reminder Today',
    message: 'Your Tajweed class with Qari Abdul Basit starts at 06:00 PM EST. Click Join Class on your schedule.',
    date: '2026-08-01 15:30',
    isRead: false,
    priority: 'high'
  },
  {
    id: 'n-2',
    studentId: 'st-001',
    type: 'fee_reminder',
    title: '✅ Fee Payment Confirmed',
    message: 'Thank you! Your fee of $60 for August 2026 has been successfully processed. Receipt REC-2026-0801 is available.',
    date: '2026-08-01 10:15',
    isRead: true,
    priority: 'normal'
  },
  {
    id: 'n-3',
    studentId: '',
    type: 'announcement',
    title: '🕌 Islamic New Year Holiday Announcement',
    message: 'The Academy will remain closed on 1st Muharram-ul-Haram for Islamic New Year. Makeup classes will be rescheduled.',
    date: '2026-07-30 09:00',
    isRead: false,
    priority: 'high'
  },
  {
    id: 'n-4',
    studentId: 'st-001',
    type: 'test_schedule',
    title: '📝 Upcoming Monthly Test',
    message: 'Monthly Tajweed Evaluation is scheduled for August 25th, 2026. Please revise Surah Al-Mulk and Surah Al-Qalam.',
    date: '2026-07-28 14:20',
    isRead: true,
    priority: 'normal'
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-101',
    certificateCode: 'FEI-CERT-98231',
    studentId: 'st-001',
    studentName: 'Muhammad Abdullah',
    courseName: 'Madani Qaida Primary Certification',
    grade: 'Grade A+ (Distinction)',
    completionDate: '2026-06-15',
    issueDate: '2026-06-18',
    teacherName: 'Qari Abdul Basit',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FEI-CERT-98231-VERIFIED'
  }
];

export const INITIAL_TIMETABLE: TimetableItem[] = [
  { id: 'tt-1', studentId: 'st-001', day: 'Monday', startTime: '18:00', endTime: '18:45', courseName: 'Tajweed-ul-Quran', teacherName: 'Qari Abdul Basit', meetUrl: 'https://meet.google.com/fei-quran-live' },
  { id: 'tt-2', studentId: 'st-001', day: 'Tuesday', startTime: '18:00', endTime: '18:45', courseName: 'Tajweed-ul-Quran', teacherName: 'Qari Abdul Basit', meetUrl: 'https://meet.google.com/fei-quran-live' },
  { id: 'tt-3', studentId: 'st-001', day: 'Wednesday', startTime: '18:00', endTime: '18:45', courseName: 'Islamic Education', teacherName: 'Qari Abdul Basit', meetUrl: 'https://meet.google.com/fei-quran-live' },
  { id: 'tt-4', studentId: 'st-001', day: 'Thursday', startTime: '18:00', endTime: '18:45', courseName: 'Tajweed-ul-Quran', teacherName: 'Qari Abdul Basit', meetUrl: 'https://meet.google.com/fei-quran-live' },
  { id: 'tt-5', studentId: 'st-001', day: 'Friday', startTime: '18:00', endTime: '18:45', courseName: 'Revision & Recitation', teacherName: 'Qari Abdul Basit', meetUrl: 'https://meet.google.com/fei-quran-live' },
  { id: 'tt-6', studentId: 'st-001', day: 'Saturday', startTime: '16:00', endTime: '16:45', courseName: 'Weekend Islamic Quiz', teacherName: 'Alimah Aisha Siddiqua', meetUrl: 'https://meet.google.com/fei-quran-live' },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: '🕌 Annual Tajweed Recitation Competition 2026',
    content: 'Registration is now open for our annual global Quran recitation contest. Exciting prizes and digital certificates will be awarded to top students.',
    postedDate: '2026-07-28',
    postedBy: 'Admin Directorship',
    targetAudience: 'All'
  },
  {
    id: 'ann-2',
    title: '📱 WhatsApp Class Reminders Active',
    content: 'Students & parents can now receive class notifications 15 minutes before every session via official WhatsApp bot.',
    postedDate: '2026-07-20',
    postedBy: 'IT Department',
    targetAudience: 'Students'
  }
];

export const DAILY_HADITH_LIST = [
  {
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    translation: "The best among you are those who learn the Quran and teach it.",
    reference: "Sahih Al-Bukhari 5027"
  },
  {
    arabic: "اقْرَءُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ",
    translation: "Read the Quran, for it will come on the Day of Resurrection as an intercessor for its companions.",
    reference: "Sahih Muslim 804"
  },
  {
    arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    translation: "Whoever travels a path in search of knowledge, Allah will make easy for him a path to Paradise.",
    reference: "Sahih Muslim 2699"
  }
];
