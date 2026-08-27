export interface FollowUpRecord {
  id: string;
  date: string;
  staffName: string;
  channel: 'Phone Call' | 'WhatsApp' | 'In-Person' | 'Email';
  notes: string;
  outcome: 'Interested - Callback' | 'Docs Pending' | 'Fee Paid' | 'Not Interested' | 'Appointment Booked';
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  type?: 'Walk-in' | 'Online' | 'Referral' | 'Phone';
  tokenNumber?: string;
  course: string;
  path: string;
  batch?: string;
  slot?: string;
  price: string;
  paymentStatus: 'Pending' | 'Contacted' | 'Partially Paid' | 'Paid' | 'Link Sent' | 'Refunded';
  amountPaid?: string;
  totalAmount?: string;
  classLink?: string;
  category: 'Education' | 'Study Abroad' | 'Visa' | 'Jobs' | 'Work While You Study' | 'General Front Office';
  timestamp: string;
  aiScore?: number;
  aiPath?: string;
  aiActionPlan?: string[];
  docStatus?: 'Approved' | 'Pending' | 'Consultation Scheduled' | 'Docs Requested';
  source?: string;
  department?: string;
  crmStatus?: 'New Lead' | 'In Progress' | 'Closed Won' | 'Closed Lost';
  pipelineStage?: 'Intake' | 'Assessment' | 'Documentation' | 'Processing' | 'Completed';
  assignedStaffId?: string;
  assignedStaffName?: string;
  intakeNotes?: string;
  visitorDetails?: {
    purpose?: string;
    accompaniedBy?: number;
    idProofVerified?: boolean;
    checkInTime?: string;
    receptionistName?: string;
  };
  followUpDate?: string;
  followUpStatus?: 'Due Today' | 'Overdue' | 'Scheduled' | 'Completed' | 'Pending';
  followUpHistory?: FollowUpRecord[];
  visaProcessingStage?: 'Not Applicable' | 'Profile Assessment' | 'APS Certificate' | 'Blocked Account' | 'Embassy Appointment' | 'Visa Approved' | 'Visa Rejected';
}

export interface VisitorLog {
  id: string;
  page: string;
  timeSpent: number;
  timestamp: string;
}

export interface EnterpriseTask {
  id: string;
  title: string;
  description: string;
  assignedToDept: string;
  status: 'Pending' | 'In Progress' | 'Success' | 'Negative';
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
  updatedAt: string;
}

export interface StaffUser {
  id: string;
  email: string;
  password: string;
  name: string;
  department: 'Super Admin' | 'General Manager' | 'Finance Officer' | 'HR Manager' | 'Marketing Exec' | 'Academic Counselor' | 'Education' | 'Visa';
  phone?: string;
  joiningDate?: string;
  status?: 'Active' | 'On Leave' | 'Terminated';
  resumeUrl?: string;
  hrApprovalStatus?: 'Pending HR Approval' | 'Verified' | 'Rejected';
  hrIssuedId?: string;
  temporaryAccessExpiry?: string;
}

export interface AttendanceLog {
  id: string;
  staffId: string;
  staffName: string;
  checkInTime: string;
  status: 'Present' | 'On Leave' | 'Late';
  date: string;
}

export interface ApprovalRequest {
  id: string;
  type: 'New Staff' | 'New Course' | 'Data Edit' | 'Deletion' | 'General';
  description: string;
  requestedBy: string;
  department: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface UpdateLog {
  id: string;
  action: string;
  details: string;
  user: string;
  department: string;
  timestamp: string;
  category: 'System' | 'Content' | 'Personnel' | 'Data';
}

// Education Hub Data Types
export const generateUniqueCode = (prefix: string, name: string): string => {
  const cleanPrefix = (prefix || 'ID').toUpperCase().trim();
  const slug = (name || 'ITEM')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .substring(0, 4) || 'GEN';
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `${cleanPrefix}-${slug}-${randomNum}`;
};

export interface GlobalPath {
  id: string;
  name: string;
  code?: string;
  methods: string;
  position?: number;
  starting: string;
  ending: string;
  remarks: string;
  linkedCourseId?: string;
  linkedCourseName?: string;
}

export interface GlobalBatch {
  id: string;
  name: string;
  code?: string;
  timings: string[];
  starting: string;
  remarks: string;
  linkedCourseId?: string;
  linkedCourseName?: string;
  linkedPathId?: string;
  linkedPathName?: string;
}

export interface CourseMaterialItem {
  id: string;
  title: string;
  type: 'chapters' | 'images' | 'video' | 'promo';
  fileUrl?: string;
  fileName?: string;
  size?: string;
  format?: string;
  description?: string;
}

export interface ClassScheduleSession {
  id: string;
  date: string; // YYYY-MM-DD
  courseId: string;
  courseName: string;
  batchId?: string;
  batchName: string;
  pathId?: string;
  pathName: string;
  instructor: string;
  timeSlot: string; // e.g. "09:00 - 11:00"
  startTime: string; // e.g. "09:00"
  endTime: string; // e.g. "11:00"
  status: 'Live' | 'Upcoming' | 'Completed' | 'Rescheduled';
  room: string; // e.g. "Virtual Studio 1 (Zoom HD)", "Smart Hall 204"
  enrolledStudents: number;
  attendedStudents?: number;
  topic?: string;
  meetingLink?: string;
}

export interface EnrolledStudent {
  id: string;
  name: string;
  email: string;
  status: 'Present' | 'In Class' | 'Invited' | 'Absent';
  joinedAt?: string;
  attendanceScore?: number;
}

export interface GlobalCategory {
  id: string;
  name: string;
  code?: string;
  subCategories: string[];
  description?: string;
  linkedCourseId?: string;
  linkedCourseName?: string;
}

export interface AICoursePayload {
  curriculumOverview?: string;
  sourceLibraries?: string[];
  strategiesApplied?: string[];
  aiTutorPersona?: string;
  generatedWhiteboardNotes?: string;
  sampleExercise?: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };
  customChapters?: {
    id: string;
    title: string;
    type: 'intro' | 'text' | 'video' | 'picture' | 'song';
    duration: string;
    status: 'Completed' | 'Ready' | 'AI Active';
    subtitles?: {
      id: string;
      title: string;
      timestamp: string;
      seconds: number;
      status: string;
      topic: string;
      notes: string;
      keyRules: string;
      practicePrompt: string;
    }[];
  }[];
}

export interface GlobalCourse {
  id: string;
  name: string;
  top_title?: string;
  subtitle: string;
  show_in_sub_nav?: boolean;
  displayPosition: number;
  viewType?: 'Main View' | 'Blocks View' | 'Both';
  staff: string;
  chapter: string;
  duration: string;
  methods: string;
  pathId?: string;
  pathName?: string;
  batchId?: string;
  batchName?: string;
  materials: string;
  materialItems?: CourseMaterialItem[];
  fee: string;
  students: string;
  courseStructure?: string; // stores dynamic structured details/modules
  category?: string;
  subCategory?: string;
  libraryType?: 'TUTOR' | 'AI';
  enrolledStudentsList?: EnrolledStudent[];
  aiPayload?: AICoursePayload;
}

// Initial Seed Data
const SEED_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-101',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98765 43210',
    type: 'Walk-in',
    tokenNumber: 'ILA-WALK-101',
    course: 'German Language A1–C2',
    path: 'Intelli-Coach AI Trainer™',
    price: '$199.00',
    amountPaid: '$199.00',
    totalAmount: '$199.00',
    paymentStatus: 'Paid',
    classLink: 'https://ilas.global/classroom/join/de-a1-sharma',
    category: 'Education',
    department: 'Education',
    source: 'Front-Desk Reception',
    crmStatus: 'Closed Won',
    pipelineStage: 'Processing',
    assignedStaffId: 'STAFF-003',
    assignedStaffName: 'Priya Sundaram (Senior Counselor)',
    intakeNotes: 'Candidate visited campus with parents. Enrolled on spot for German B1 intensive batch starting next Monday.',
    visitorDetails: {
      purpose: 'Course Enrollment & Demo',
      accompaniedBy: 2,
      idProofVerified: true,
      checkInTime: '09:30 AM',
      receptionistName: 'Meera Kapoor'
    },
    followUpDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    followUpStatus: 'Scheduled',
    followUpHistory: [
      {
        id: 'fl-1',
        date: new Date().toLocaleDateString(),
        staffName: 'Priya Sundaram',
        channel: 'In-Person',
        notes: 'Completed intake orientation, provided digital classroom link and study material kit.',
        outcome: 'Fee Paid'
      }
    ],
    visaProcessingStage: 'Not Applicable',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'inq-102',
    name: 'Rahul Varma',
    email: 'rahul.varma@techmail.com',
    phone: '+91 98112 34567',
    type: 'Walk-in',
    tokenNumber: 'ILA-WALK-102',
    course: 'German Opportunity Card (Chancenkarte)',
    path: 'Direct Embassy Fast-Track™',
    price: '$499.00',
    amountPaid: '$200.00',
    totalAmount: '$499.00',
    paymentStatus: 'Partially Paid',
    category: 'Visa',
    department: 'Visa',
    source: 'Walk-in Reception',
    crmStatus: 'In Progress',
    pipelineStage: 'Documentation',
    assignedStaffId: 'STAFF-004',
    assignedStaffName: 'Dr. Klaus Mueller (Visa Head)',
    intakeNotes: 'Walk-in candidate seeking Chancenkarte points evaluation. B1 German certificate available; needs APS document verification.',
    visitorDetails: {
      purpose: 'Visa & Points Verification',
      accompaniedBy: 0,
      idProofVerified: true,
      checkInTime: '10:15 AM',
      receptionistName: 'Meera Kapoor'
    },
    followUpDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday -> Overdue 3-day touchpoint
    followUpStatus: 'Overdue',
    followUpHistory: [
      {
        id: 'fl-2',
        date: new Date(Date.now() - 86400000 * 3).toLocaleDateString(),
        staffName: 'Dr. Klaus Mueller',
        channel: 'In-Person',
        notes: 'Initial profile points assessed at 75 points. Awaiting blocked account deposit confirmation.',
        outcome: 'Docs Pending'
      }
    ],
    visaProcessingStage: 'APS Certificate',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'inq-103',
    name: 'Kavita Patel',
    email: 'kavita.patel@globaledu.com',
    phone: '+91 97234 56789',
    type: 'Online',
    tokenNumber: 'ILA-WEB-301',
    course: 'TU Munich M.Sc. Informatics Track',
    path: 'Direct University Admissions',
    price: '$650.00',
    amountPaid: '$0.00',
    totalAmount: '$650.00',
    paymentStatus: 'Contacted',
    category: 'Study Abroad',
    department: 'Study Abroad',
    source: 'Website Study Abroad Portal',
    crmStatus: 'New Lead',
    pipelineStage: 'Assessment',
    aiScore: 94,
    aiPath: 'Public University Zero-Tuition Master Track',
    assignedStaffId: 'STAFF-005',
    assignedStaffName: 'Marcus Vance (Study Abroad Advisor)',
    intakeNotes: 'Submitted online assessment with 8.8 CGPA in Computer Science. Target Winter Intake 2026.',
    followUpDate: new Date().toISOString().split('T')[0], // Today -> Due Today
    followUpStatus: 'Due Today',
    visaProcessingStage: 'Profile Assessment',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'inq-104',
    name: 'Siddharth Rao',
    email: 'siddharth.rao@devops.io',
    phone: '+91 99401 23456',
    type: 'Walk-in',
    tokenNumber: 'ILA-WALK-103',
    course: 'Cloud & DevOps European Placement',
    path: 'Corporate Talent Match',
    price: '$750.00',
    amountPaid: '$750.00',
    totalAmount: '$750.00',
    paymentStatus: 'Paid',
    category: 'Jobs',
    department: 'Jobs',
    source: 'Bangalore Walk-in Center',
    crmStatus: 'In Progress',
    pipelineStage: 'Processing',
    assignedStaffId: 'STAFF-006',
    assignedStaffName: 'Anjali Nair (Placement Lead)',
    intakeNotes: '5 years AWS/Kubernetes experience. Needs Europass CV localization and direct German client mock interviews.',
    visitorDetails: {
      purpose: 'Technical Job Screening',
      accompaniedBy: 1,
      idProofVerified: true,
      checkInTime: '11:45 AM',
      receptionistName: 'Meera Kapoor'
    },
    followUpDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    followUpStatus: 'Scheduled',
    followUpHistory: [
      {
        id: 'fl-3',
        date: new Date().toLocaleDateString(),
        staffName: 'Anjali Nair',
        channel: 'Phone Call',
        notes: 'Sent CV template and booked first interview simulation with German hiring partner.',
        outcome: 'Appointment Booked'
      }
    ],
    visaProcessingStage: 'Not Applicable',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'inq-105',
    name: 'Deepak Menon',
    email: 'deepak.menon@healthcare.in',
    phone: '+91 94471 88990',
    type: 'Online',
    tokenNumber: 'ILA-WEB-302',
    course: 'Dual Ausbildung (Healthcare & Nursing)',
    path: 'Work While You Study Dual Track',
    price: '$350.00',
    amountPaid: '$0.00',
    totalAmount: '$350.00',
    paymentStatus: 'Pending',
    category: 'Work While You Study',
    department: 'Work While You Study',
    source: 'Website Hero Form',
    crmStatus: 'New Lead',
    pipelineStage: 'Intake',
    aiScore: 88,
    aiPath: 'German Hospital Dual Syndicate Track',
    assignedStaffId: 'STAFF-007',
    assignedStaffName: 'Stefan Wagner (Ausbildung Coordinator)',
    intakeNotes: 'Registered B.Sc Nursing candidate interested in €1,200/month stipend dual apprenticeship program in Munich.',
    followUpDate: new Date().toISOString().split('T')[0], // Today -> Due Today
    followUpStatus: 'Due Today',
    visaProcessingStage: 'Profile Assessment',
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString()
  }
];

const SEED_VISITOR_LOGS: VisitorLog[] = [
  { id: 'v1', page: 'Front Desk Reception', timeSpent: 340, timestamp: new Date(Date.now() - 10 * 60000).toLocaleString() },
  { id: 'v2', page: 'Visa Eligibility Calculator', timeSpent: 180, timestamp: new Date(Date.now() - 25 * 60000).toLocaleString() }
];

const SEED_TASKS: EnterpriseTask[] = [
  {
    id: 't1',
    title: 'German Hub Expansion Audit',
    description: 'Verify regional compliance and onboarding queues for Q3.',
    assignedToDept: 'Visa',
    status: 'In Progress',
    priority: 'High',
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString()
  }
];

const SEED_STAFF: StaffUser[] = [
  { id: 'STAFF-001', email: 'admin@ilas.global', password: '', name: 'Super Admin', department: 'Super Admin', phone: '+49 176 0000001', joiningDate: '2025-01-01', status: 'Active' },
  { id: 'STAFF-002', email: 'hr@ilas.global', password: '', name: 'HR Manager Lead', department: 'HR Manager', phone: '+49 176 0000002', joiningDate: '2025-06-15', status: 'Active' },
  { id: 'STAFF-003', email: 'priya.s@ilas.global', password: '', name: 'Priya Sundaram (Senior Counselor)', department: 'Academic Counselor', phone: '+91 98450 11223', joiningDate: '2025-03-10', status: 'Active' },
  { id: 'STAFF-004', email: 'klaus.m@ilas.global', password: '', name: 'Dr. Klaus Mueller (Visa Head)', department: 'Visa', phone: '+49 176 4433221', joiningDate: '2025-02-01', status: 'Active' },
  { id: 'STAFF-005', email: 'marcus.v@ilas.global', password: '', name: 'Marcus Vance (Study Abroad Advisor)', department: 'Education', phone: '+49 176 8899001', joiningDate: '2025-04-12', status: 'Active' },
  { id: 'STAFF-006', email: 'anjali.n@ilas.global', password: '', name: 'Anjali Nair (Placement Lead)', department: 'HR Manager', phone: '+91 98711 22334', joiningDate: '2025-05-20', status: 'Active' },
  { id: 'STAFF-007', email: 'stefan.w@ilas.global', password: '', name: 'Stefan Wagner (Ausbildung Coordinator)', department: 'Education', phone: '+49 176 5544332', joiningDate: '2025-07-01', status: 'Active' },
  { id: 'STAFF-008', email: 'meera.k@ilas.global', password: '', name: 'Meera Kapoor (Front Desk Officer)', department: 'Super Admin', phone: '+91 98100 99887', joiningDate: '2025-08-01', status: 'Active' }
];

const SEED_ATTENDANCE: AttendanceLog[] = [
  { id: 'ATT-1', staffId: 'STAFF-001', staffName: 'Super Admin', checkInTime: '09:00 AM', status: 'Present', date: new Date().toLocaleDateString() },
  { id: 'ATT-2', staffId: 'STAFF-008', staffName: 'Meera Kapoor (Front Desk Officer)', checkInTime: '08:45 AM', status: 'Present', date: new Date().toLocaleDateString() },
  { id: 'ATT-3', staffId: 'STAFF-003', staffName: 'Priya Sundaram', checkInTime: '09:10 AM', status: 'Present', date: new Date().toLocaleDateString() },
  { id: 'ATT-4', staffId: 'STAFF-004', staffName: 'Dr. Klaus Mueller', checkInTime: '09:15 AM', status: 'Present', date: new Date().toLocaleDateString() }
];

// DB Retrieval & Save Functions
export const getGlobalCategories = (): GlobalCategory[] => {
  const data = localStorage.getItem('ilas_categories');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to parse ilas_categories from localStorage, resetting to seed:', e);
    }
  }
  const seed: GlobalCategory[] = [
    {
      id: 'cat-1',
      name: 'Education & Languages',
      code: 'EDU-LANG',
      description: 'Foreign language certifications, CEFR tracks, and academic testing pathways.',
      subCategories: ['German Language (A1–C2)', 'IELTS / TOEFL / PTE', 'Medical German & FSP', 'French & Spanish']
    },
    {
      id: 'cat-2',
      name: 'Software & IT Training',
      code: 'TECH-SW',
      description: 'Modern full-stack engineering, cloud architecture, and DevOps tracks.',
      subCategories: ['Full-Stack Web Dev (React/Node)', 'Cloud DevOps & AWS', 'Python & AI Engineering', 'Cybersecurity']
    },
    {
      id: 'cat-3',
      name: 'Enterprise ERP & SAP',
      code: 'ERP-SAP',
      description: 'SAP S/4HANA functional modules, logistics, and financial workflows.',
      subCategories: ['SAP FICO (Financials)', 'SAP MM (Supply Chain)', 'SAP SD (Sales)', 'SAP S/4HANA Architecture']
    },
    {
      id: 'cat-4',
      name: 'Digital Marketing & Growth',
      code: 'MKT-GROWTH',
      description: 'Performance marketing, Meta & Google ads, and AI automation.',
      subCategories: ['Meta & Google Ads Strategy', 'AI Copywriting & SEO', 'Growth Automation & CRM', 'Viral Social Content']
    },
    {
      id: 'cat-5',
      name: 'Healthcare & Clinical Practice',
      code: 'MED-CARE',
      description: 'Medical terminology, nurse licensing, and German hospital clinical communications.',
      subCategories: ['Fachsprachprüfung (FSP)', 'Kenntnisprüfung (KP)', 'Clinical Nursing Standards', 'Doctor-Patient Intake']
    }
  ];
  localStorage.setItem('ilas_categories', JSON.stringify(seed));
  return seed;
};

export const setGlobalCategories = (categories: GlobalCategory[]) => {
  localStorage.setItem('ilas_categories', JSON.stringify(categories));
  window.dispatchEvent(new CustomEvent('ilas-categories-changed'));
};

export const getGlobalPaths = (): GlobalPath[] => {
  const data = localStorage.getItem('ilas_paths');
  if (data) {
    try {
      const parsed: GlobalPath[] = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.some(p => p.name.includes('Path 1 Test'))) {
        return parsed.sort((a, b) => (a.position || 99) - (b.position || 99));
      }
    } catch (e) {
      console.warn('Failed to parse ilas_paths from localStorage, resetting to seed:', e);
    }
  }
  const seed: GlobalPath[] = [
    // Paths for Course 1: German Language Test 1
    { id: 'p1-1', name: 'Path 1 Test - Intelli-Coach AI Adaptive Path', methods: 'AI + Adaptive Tutoring & Real-time Accent Coach', position: 1, starting: '2026-10-12', ending: '2026-12-12', remarks: '24/7 Intelligent Pacing', linkedCourseId: '1', linkedCourseName: 'German Language Test 1' },
    { id: 'p1-2', name: 'Path 2 Test - Interactive Video Labs & Workbooks', methods: 'Video Masterclass + Grammar Architecture Practice', position: 2, starting: '2026-10-15', ending: '2026-11-15', remarks: 'Self-paced with weekly assessments', linkedCourseId: '1', linkedCourseName: 'German Language Test 1' },
    { id: 'p1-3', name: 'Path 3 Test - Live Native Mentor Cohort', methods: 'Live Instructor 1-on-1 Dialogue & Mock Exam Simulation', position: 3, starting: '2026-10-20', ending: '2027-01-20', remarks: 'Weekend interactive cohorts', linkedCourseId: '1', linkedCourseName: 'German Language Test 1' },
    { id: 'p1-4', name: 'Path 4 Test - Clinical & Technical German Track', methods: 'Healthcare & Engineering Specialized Vocabulary', position: 4, starting: '2026-11-01', ending: '2027-02-01', remarks: 'Hospital / Industry Readiness', linkedCourseId: '1', linkedCourseName: 'German Language Test 1' },

    // Paths for Course 2: IELTS Test 2
    { id: 'p2-1', name: 'Path 1 Test - Band 8.5+ Strategy Masterclass', methods: 'Cambridge Official Framework + Timed Reading Drills', position: 1, starting: '2026-10-15', ending: '2026-11-30', remarks: 'High Band Target', linkedCourseId: '2', linkedCourseName: 'IELTS Test 2' },
    { id: 'p2-2', name: 'Path 2 Test - AI Essay & Writing Evaluation Clinic', methods: 'Automated Lexical & Grammar Scoring Engine', position: 2, starting: '2026-10-18', ending: '2026-11-20', remarks: 'Task 1 & Task 2 Mastery', linkedCourseId: '2', linkedCourseName: 'IELTS Test 2' },
    { id: 'p2-3', name: 'Path 3 Test - Live 1-on-1 Mock Speaking Panel', methods: 'Certified Cambridge Native Examiner Mock Sessions', position: 3, starting: '2026-10-25', ending: '2026-12-15', remarks: 'Speaking Confidence Booster', linkedCourseId: '2', linkedCourseName: 'IELTS Test 2' },
    { id: 'p2-4', name: 'Path 4 Test - FastTrack 30-Day Intensive Lab', methods: 'Daily Speed-Drills & High-Conversion Templates', position: 4, starting: '2026-11-01', ending: '2026-12-01', remarks: 'Fast Assessment', linkedCourseId: '2', linkedCourseName: 'IELTS Test 2' },

    // Paths for Course 3: Software Test 3
    { id: 'p3-1', name: 'Path 1 Test - Full-Stack React 19 & TypeScript', methods: 'Frontend Engineering & Enterprise Design Systems', position: 1, starting: '2026-10-20', ending: '2027-01-20', remarks: 'Modern Production Stack', linkedCourseId: '3', linkedCourseName: 'Software Test 3' },
    { id: 'p3-2', name: 'Path 2 Test - Node.js, Express & Cloud Microservices', methods: 'Backend Architecture, PostgreSQL & REST APIs', position: 2, starting: '2026-10-25', ending: '2027-02-10', remarks: 'Scalable Systems', linkedCourseId: '3', linkedCourseName: 'Software Test 3' },
    { id: 'p3-3', name: 'Path 3 Test - DevOps, Docker, CI/CD & Cloud Deploy', methods: 'Automated Pipelines & Cloud Infrastructure Lab', position: 3, starting: '2026-11-01', ending: '2027-02-28', remarks: 'Direct Job Deployment', linkedCourseId: '3', linkedCourseName: 'Software Test 3' },
    { id: 'p3-4', name: 'Path 4 Test - Enterprise AI Pair-Programming Lab', methods: 'AI Copilots, Refactoring & Code Quality Systems', position: 4, starting: '2026-11-15', ending: '2027-03-01', remarks: 'Cutting-Edge Tools', linkedCourseId: '3', linkedCourseName: 'Software Test 3' },

    // Paths for Course 4: SAP Course Test 4
    { id: 'p4-1', name: 'Path 1 Test - SAP FICO Financial Accounting Simulation', methods: 'General Ledger, Accounts Payable/Receivable & Asset Mgt', position: 1, starting: '2026-11-01', ending: '2027-01-15', remarks: 'Enterprise Hands-On Lab', linkedCourseId: '4', linkedCourseName: 'SAP Course Test 4' },
    { id: 'p4-2', name: 'Path 2 Test - SAP MM/SD Supply Chain Logistics', methods: 'Procurement, Inventory Management & Sales Order Workflows', position: 2, starting: '2026-11-05', ending: '2027-01-20', remarks: 'Supply Chain Operations', linkedCourseId: '4', linkedCourseName: 'SAP Course Test 4' },
    { id: 'p4-3', name: 'Path 3 Test - SAP S/4HANA Cloud Integration & Reporting', methods: 'Universal Journal & Real-Time Enterprise Analytics', position: 3, starting: '2026-11-10', ending: '2027-02-05', remarks: 'S/4HANA Migration Lab', linkedCourseId: '4', linkedCourseName: 'SAP Course Test 4' },
    { id: 'p4-4', name: 'Path 4 Test - Corporate Practical Certification Lab', methods: 'Live Enterprise Sandbox & Case-Study Audits', position: 4, starting: '2026-11-20', ending: '2027-02-15', remarks: 'Certified SAP Practice', linkedCourseId: '4', linkedCourseName: 'SAP Course Test 4' }
  ];
  localStorage.setItem('ilas_paths', JSON.stringify(seed));
  return seed.sort((a, b) => (a.position || 99) - (b.position || 99));
};

export const setGlobalPaths = (paths: GlobalPath[]) => {
  const sorted = [...paths].sort((a, b) => (a.position || 99) - (b.position || 99));
  localStorage.setItem('ilas_paths', JSON.stringify(sorted));
  window.dispatchEvent(new CustomEvent('ilas-paths-changed'));
};

export const getGlobalBatches = (): GlobalBatch[] => {
  const data = localStorage.getItem('ilas_batches');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to parse ilas_batches from localStorage, resetting to seed:', e);
    }
  }
  const seed: GlobalBatch[] = [
    { id: '1', name: 'Morning Batch A1', timings: ['09:00 - 11:00', '11:30 - 13:30'], starting: '2026-10-12', remarks: 'Fast Filling', linkedCourseId: '1', linkedCourseName: 'German Language Test 1', linkedPathId: 'p1-1', linkedPathName: 'Path 1 Test - Intelli-Coach AI Adaptive Path' },
    { id: '2', name: 'Evening Intensive Batch', timings: ['18:00 - 20:00'], starting: '2026-10-15', remarks: 'Open for Registration', linkedCourseId: '2', linkedCourseName: 'IELTS Test 2', linkedPathId: 'p2-1', linkedPathName: 'Path 1 Test - Band 8.5+ Strategy Masterclass' },
    { id: '3', name: 'Weekend Tech Bootcamp', timings: ['14:00 - 18:00 (Sat-Sun)'], starting: '2026-10-20', remarks: 'Available', linkedCourseId: '3', linkedCourseName: 'Software Test 3', linkedPathId: 'p3-1', linkedPathName: 'Path 1 Test - Full-Stack React 19 & TypeScript' },
    { id: '4', name: 'Weekday Corporate Slot', timings: ['10:00 - 12:00'], starting: '2026-11-01', remarks: 'Enterprise Direct', linkedCourseId: '4', linkedCourseName: 'SAP Course Test 4', linkedPathId: 'p4-1', linkedPathName: 'Path 1 Test - SAP FICO Financial Accounting Simulation' }
  ];
  localStorage.setItem('ilas_batches', JSON.stringify(seed));
  return seed;
};

export const setGlobalBatches = (batches: GlobalBatch[]) => {
  localStorage.setItem('ilas_batches', JSON.stringify(batches));
  window.dispatchEvent(new CustomEvent('ilas-batches-changed'));
};

export const getGlobalCourses = (): GlobalCourse[] => {
  const data = localStorage.getItem('ilas_courses');
  if (data) {
    try {
      const parsed: GlobalCourse[] = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.some(c => c.name === 'German Language Test 1')) {
        return parsed.sort((a, b) => (a.displayPosition || 99) - (b.displayPosition || 99));
      }
    } catch (e) {
      console.warn('Failed to parse ilas_courses from localStorage, resetting to seed:', e);
    }
  }
  const seed: GlobalCourse[] = [
    { 
      id: '1', 
      name: 'German Language Test 1', 
      top_title: 'German Language & Proficiency', 
      subtitle: 'Goethe & Telc Standard Certification Pathways with Clinical & Technical German', 
      show_in_sub_nav: true, 
      displayPosition: 1, 
      viewType: 'Main View',
      staff: 'Nadeem - ID 091 (Senior German Specialist)', 
      chapter: '24', 
      duration: '16 Weeks', 
      methods: 'Path 1 Test - Intelli-Coach AI Adaptive Path [AI + Adaptive Tutoring]', 
      pathId: 'p1-1', 
      pathName: 'Path 1 Test - Intelli-Coach AI Adaptive Path', 
      batchId: '1', 
      batchName: 'Morning Batch A1', 
      materials: 'Digital Library & Goethe Workbooks', 
      fee: '$199', 
      students: '180', 
      category: 'Education & Languages',
      subCategory: 'German Language (A1–C2)',
      libraryType: 'TUTOR',
      enrolledStudentsList: [
        { id: 's1', name: 'Ananya Sharma', email: 'ananya.sharma@gmail.com', status: 'In Class', joinedAt: '09:00 AM', attendanceScore: 98 },
        { id: 's2', name: 'Lukas Meyer', email: 'lukas.m@tum.de', status: 'Present', joinedAt: '09:05 AM', attendanceScore: 95 }
      ],
      courseStructure: 'Module 1: CEFR A1 Fundamentals, Phonetics & Survival Vocabulary\nModule 2: CEFR A2 Daily Conversational & Workplace Dialogues\nModule 3: CEFR B1 Complex Sentence Structure & Business German\nModule 4: CEFR B2 Professional, Clinical & Technical Certification Mastery\nModule 5: Official Goethe / Telc Mock Simulations & Live Oral Prep' 
    },
    { 
      id: '2', 
      name: 'IELTS Test 2', 
      top_title: 'English Language Mastery', 
      subtitle: 'Target Band 8.0+ Academic & General Strategies with AI Essay Evaluation', 
      show_in_sub_nav: true, 
      displayPosition: 2, 
      viewType: 'Main View',
      staff: 'AI Bot & Cambridge Certified Mentor', 
      chapter: '16', 
      duration: '8 Weeks', 
      methods: 'Path 1 Test - Band 8.5+ Strategy Masterclass [Cambridge Mock Labs]', 
      pathId: 'p2-1', 
      pathName: 'Path 1 Test - Band 8.5+ Strategy Masterclass', 
      batchId: '2', 
      batchName: 'Evening Intensive Batch', 
      materials: 'Cambridge Mock Portal & Audio Labs', 
      fee: '$149', 
      students: '240', 
      category: 'Education & Languages',
      subCategory: 'IELTS / TOEFL / PTE',
      libraryType: 'AI',
      enrolledStudentsList: [
        { id: 's5', name: 'Rahul Varma', email: 'rahul.varma@gmail.com', status: 'In Class', joinedAt: '18:00 PM', attendanceScore: 96 }
      ],
      courseStructure: 'Module 1: Speaking Mock Interviews & Band 8.5 Accent Tuning\nModule 2: Academic Writing Task 1 & 2 Strategies & AI Essay Feedback\nModule 3: Critical Reading, Skimming & Scanning Drills\nModule 4: Multi-Accent Audio Listening Precision & Cambridge Mocks' 
    },
    { 
      id: '3', 
      name: 'Software Test 3', 
      top_title: 'Full-Stack & Cloud Architecture', 
      subtitle: 'Modern React, Node, DevOps, Microservices & AI Pair Programming', 
      show_in_sub_nav: true, 
      displayPosition: 3, 
      viewType: 'Main View',
      staff: 'Jane - ID 092 (Lead Cloud Architect)', 
      chapter: '32', 
      duration: '24 Weeks', 
      methods: 'Path 1 Test - Full-Stack React 19 & TypeScript [Live Instructor + Labs]', 
      pathId: 'p3-1', 
      pathName: 'Path 1 Test - Full-Stack React 19 & TypeScript', 
      batchId: '3', 
      batchName: 'Weekend Tech Bootcamp', 
      materials: 'Cloud Sandbox & Repos', 
      fee: '$599', 
      students: '95', 
      category: 'Software & IT Training',
      subCategory: 'Full-Stack Web Dev (React/Node)',
      libraryType: 'TUTOR',
      enrolledStudentsList: [
        { id: 's8', name: 'Vikram Mehta', email: 'vikram.m@dev.io', status: 'In Class', joinedAt: '14:00 PM', attendanceScore: 100 }
      ],
      courseStructure: 'Phase 1: React 19, TypeScript & Tailwind CSS Design Systems\nPhase 2: Node.js, Express, Microservices & PostgreSQL Databases\nPhase 3: Docker Containers, CI/CD Automated Pipelines & Cloud Deployments\nPhase 4: Live International Production Capstone Project' 
    },
    { 
      id: '4', 
      name: 'SAP Course Test 4', 
      top_title: 'Enterprise Software Training', 
      subtitle: 'Financials (FICO), Supply Chain & Logistics (MM/SD) Workflows', 
      show_in_sub_nav: true, 
      displayPosition: 4, 
      viewType: 'Main View',
      staff: 'Nadeem - ID 091 (SAP Certified Lead)', 
      chapter: '18', 
      duration: '10 Weeks', 
      methods: 'Path 1 Test - SAP FICO Financial Accounting Simulation [Corporate Labs]', 
      pathId: 'p4-1', 
      pathName: 'Path 1 Test - SAP FICO Financial Accounting Simulation', 
      batchId: '4', 
      batchName: 'Weekday Corporate Slot', 
      materials: 'SAP Sandbox Access & ECC/S4HANA Guides', 
      fee: '$499', 
      students: '60', 
      category: 'Enterprise ERP & SAP',
      subCategory: 'SAP FICO (Financials)',
      libraryType: 'TUTOR',
      enrolledStudentsList: [
        { id: 's10', name: 'Manish Gupta', email: 'manish.g@corp.de', status: 'In Class', joinedAt: '10:00 AM', attendanceScore: 95 }
      ],
      courseStructure: 'Module 1: SAP S/4HANA Enterprise Architecture & Navigation\nModule 2: Financial Ledger, General Accounting & Invoicing Systems\nModule 3: Procurement, Materials Management (MM) & Vendor Workflows\nModule 4: Sales & Distribution (SD), Enterprise Audit & Regulatory Reporting' 
    },
    { 
      id: '5', 
      name: 'Social Media & Growth AI', 
      top_title: 'Growth Marketing & Campaign Operations', 
      subtitle: 'Meta Ads, Google Ads, Viral Content Strategy & AI Copywriting', 
      show_in_sub_nav: false, 
      displayPosition: 5, 
      viewType: 'Blocks View',
      staff: 'Jane - ID 092 (Growth Lead)', 
      chapter: '12', 
      duration: '6 Weeks', 
      methods: 'Online FastTrack Video + AI [Video + AI Labs]', 
      pathId: '2', 
      pathName: 'Online FastTrack Video + AI', 
      batchId: '2', 
      batchName: 'Evening Intensive Batch', 
      materials: 'Ad Spend Simulator & Campaign Templates', 
      fee: '$179', 
      students: '110', 
      category: 'Digital Marketing & Growth',
      subCategory: 'Meta & Google Ads Strategy',
      libraryType: 'AI',
      enrolledStudentsList: [
        { id: 's12', name: 'Arjun Rao', email: 'arjun.growth@agency.com', status: 'In Class', joinedAt: '18:00 PM', attendanceScore: 91 }
      ],
      courseStructure: 'Module 1: High-Conversion Landing Pages\nModule 2: Search Engine Optimization (SEO)\nModule 3: Meta & Google Ads Architecture\nModule 4: AI Automation & CRM Lead Loops' 
    },
    { 
      id: '6', 
      name: 'Medical Terminology & FSP', 
      top_title: 'Healthcare German & Clinical Practice', 
      subtitle: 'Fachsprachprüfung (FSP) Preparation for Doctors, Dentists & Nurses', 
      show_in_sub_nav: false, 
      displayPosition: 6, 
      viewType: 'Blocks View',
      staff: 'Dr. Klaus (Clinical Mentor)', 
      chapter: '14', 
      duration: '12 Weeks', 
      methods: 'Live Enterprise Cohort [Live Instructor + Mentoring]', 
      pathId: '3', 
      pathName: 'Live Enterprise Cohort', 
      batchId: '1', 
      batchName: 'Morning Batch A1', 
      materials: 'Clinical Case Files & Simulated Audio Dialogues', 
      fee: '$399', 
      students: '45', 
      category: 'Healthcare & Clinical Practice',
      subCategory: 'Fachsprachprüfung (FSP)',
      libraryType: 'TUTOR',
      enrolledStudentsList: [
        { id: 's13', name: 'Dr. Anjali Nair', email: 'dr.anjali@med.de', status: 'In Class', joinedAt: '09:00 AM', attendanceScore: 99 }
      ],
      courseStructure: 'Unit 1: Doctor-Patient Consultations\nUnit 2: Medical History (Anamnese) Intake\nUnit 3: Clinical Documentation (Arztbrief)\nUnit 4: Mock Examination Panels' 
    }
  ];
  localStorage.setItem('ilas_courses', JSON.stringify(seed));
  return seed.sort((a, b) => (a.displayPosition || 99) - (b.displayPosition || 99));
};

export const setGlobalCourses = (courses: GlobalCourse[]) => {
  const sorted = [...courses].sort((a, b) => (a.displayPosition || 99) - (b.displayPosition || 99));
  localStorage.setItem('ilas_courses', JSON.stringify(sorted));
  window.dispatchEvent(new CustomEvent('ilas-courses-changed'));
};

export const getGlobalApprovals = (): ApprovalRequest[] => {
  const data = localStorage.getItem('ilas_global_approvals');
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    console.warn('Failed to parse ilas_global_approvals, resetting:', e);
    return [];
  }
};

export const addGlobalApproval = (approval: Omit<ApprovalRequest, 'id' | 'status' | 'date'>) => {
  const approvals = getGlobalApprovals();
  const newApproval: ApprovalRequest = {
    ...approval,
    id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'Pending',
    date: new Date().toLocaleDateString()
  };
  const updated = [newApproval, ...approvals];
  localStorage.setItem('ilas_global_approvals', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-approvals-changed'));
  return newApproval;
};

export const updateGlobalApproval = (id: string, status: 'Approved' | 'Rejected') => {
  const approvals = getGlobalApprovals();
  const updated = approvals.map(a => a.id === id ? { ...a, status } : a);
  localStorage.setItem('ilas_global_approvals', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-approvals-changed'));
  return updated;
};

export const getGlobalUpdates = (): UpdateLog[] => {
  const data = localStorage.getItem('ilas_global_updates');
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    console.warn('Failed to parse ilas_global_updates, resetting:', e);
    return [];
  }
};

export const addGlobalUpdate = (update: Omit<UpdateLog, 'id' | 'timestamp'>) => {
  const updates = getGlobalUpdates();
  const newUpdate: UpdateLog = {
    ...update,
    id: `UPD-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toLocaleString()
  };
  const updated = [newUpdate, ...updates];
  localStorage.setItem('ilas_global_updates', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-updates-changed'));
  return newUpdate;
};

export const getInquiries = (): Inquiry[] => {
  const data = localStorage.getItem('ilas_inquiries');
  if (!data) {
    localStorage.setItem('ilas_inquiries', JSON.stringify(SEED_INQUIRIES));
    return SEED_INQUIRIES;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.warn('Failed to parse ilas_inquiries, resetting to seed:', e);
    localStorage.setItem('ilas_inquiries', JSON.stringify(SEED_INQUIRIES));
    return SEED_INQUIRIES;
  }
};

export const saveInquiry = (inquiry: Omit<Inquiry, 'id' | 'timestamp'>): Inquiry[] => {
  const inquiries = getInquiries();
  const newInquiry: Inquiry = {
    ...inquiry,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString()
  };
  const updated = [newInquiry, ...inquiries];
  localStorage.setItem('ilas_inquiries', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-inquiries-changed'));
  return updated;
};

export const updateInquiryStatus = (id: string, status: Inquiry['paymentStatus']): Inquiry[] => {
  const inquiries = getInquiries();
  const updated = inquiries.map(item => {
    if (item.id === id) {
      return { ...item, paymentStatus: status };
    }
    return item;
  });
  localStorage.setItem('ilas_inquiries', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-inquiries-changed'));
  return updated;
};

export const sendClassLink = (id: string, link: string): Inquiry[] => {
  const inquiries = getInquiries();
  const updated = inquiries.map(item => {
    if (item.id === id) {
      return { ...item, paymentStatus: 'Link Sent' as const, classLink: link };
    }
    return item;
  });
  localStorage.setItem('ilas_inquiries', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-inquiries-changed'));
  return updated;
};

export const getVisitorLogs = (): VisitorLog[] => {
  const data = localStorage.getItem('ilas_visitor_logs');
  if (!data) {
    localStorage.setItem('ilas_visitor_logs', JSON.stringify(SEED_VISITOR_LOGS));
    return SEED_VISITOR_LOGS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.warn('Failed to parse ilas_visitor_logs, resetting to seed:', e);
    localStorage.setItem('ilas_visitor_logs', JSON.stringify(SEED_VISITOR_LOGS));
    return SEED_VISITOR_LOGS;
  }
};

export const logVisitorActivity = (page: string, timeSpent: number): void => {
  const logs = getVisitorLogs();
  const newLog: VisitorLog = {
    id: Math.random().toString(36).substr(2, 9),
    page,
    timeSpent,
    timestamp: new Date().toLocaleString()
  };
  logs.unshift(newLog);
  localStorage.setItem('ilas_visitor_logs', JSON.stringify(logs.slice(0, 100)));
  window.dispatchEvent(new CustomEvent('ilas-visitor-logs-changed'));
};

export const getVisitorStats = () => {
  const logs = getVisitorLogs();
  const counts: Record<string, number> = {};
  let totalTime = 0;
  
  logs.forEach(log => {
    counts[log.page] = (counts[log.page] || 0) + 1;
    totalTime += log.timeSpent;
  });
  
  const topCourses = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  
  return {
    topCourses,
    totalTime,
    totalVisitors: logs.length
  };
};

export const getEnterpriseTasks = (): EnterpriseTask[] => {
  const data = localStorage.getItem('ilas_enterprise_tasks');
  if (!data) {
    localStorage.setItem('ilas_enterprise_tasks', JSON.stringify(SEED_TASKS));
    return SEED_TASKS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.warn('Failed to parse ilas_enterprise_tasks, resetting to seed:', e);
    localStorage.setItem('ilas_enterprise_tasks', JSON.stringify(SEED_TASKS));
    return SEED_TASKS;
  }
};

export const saveEnterpriseTask = (task: Omit<EnterpriseTask, 'id' | 'createdAt' | 'updatedAt'>): EnterpriseTask[] => {
  const tasks = getEnterpriseTasks();
  const newTask: EnterpriseTask = {
    ...task,
    id: 'TASK-' + Math.floor(1000 + Math.random() * 9000),
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString()
  };
  const updated = [newTask, ...tasks];
  localStorage.setItem('ilas_enterprise_tasks', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-tasks-changed'));
  return updated;
};

export const getStaffRegistry = (): StaffUser[] => {
  const data = localStorage.getItem('ilas_staff_registry');
  if (!data) {
    localStorage.setItem('ilas_staff_registry', JSON.stringify(SEED_STAFF));
    return SEED_STAFF;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.warn('Failed to parse ilas_staff_registry, resetting to seed:', e);
    localStorage.setItem('ilas_staff_registry', JSON.stringify(SEED_STAFF));
    return SEED_STAFF;
  }
};

export const saveStaffMember = (staff: Omit<StaffUser, 'id'>): StaffUser[] => {
  const registry = getStaffRegistry();
  const nextIdNum = registry.length + 1;
  const newStaff: StaffUser = {
    ...staff,
    id: `STAFF-${String(nextIdNum).padStart(3, '0')}`,
    status: 'Active',
    joiningDate: new Date().toLocaleDateString()
  };
  const updated = [...registry, newStaff];
  localStorage.setItem('ilas_staff_registry', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-staff-changed'));
  return updated;
};

export const getAttendanceLogs = (): AttendanceLog[] => {
  const data = localStorage.getItem('ilas_attendance_logs');
  if (!data) {
    localStorage.setItem('ilas_attendance_logs', JSON.stringify(SEED_ATTENDANCE));
    return SEED_ATTENDANCE;
  }
  return JSON.parse(data);
};

export const logStaffAttendance = (staffId: string, staffName: string, status: AttendanceLog['status']): AttendanceLog[] => {
  const logs = getAttendanceLogs();
  const newLog: AttendanceLog = {
    id: 'ATT-' + Math.floor(1000 + Math.random() * 9000),
    staffId,
    staffName,
    checkInTime: new Date().toLocaleTimeString(),
    status,
    date: new Date().toLocaleDateString()
  };
  const updated = [newLog, ...logs];
  localStorage.setItem('ilas_attendance_logs', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-attendance-changed'));
  return updated;
};

export const syncHRPayrollToFinance = (totalPayrollAmount: number, department: string) => {
  const ledgerData = localStorage.getItem('ilas_ledger');
  const ledger = ledgerData ? JSON.parse(ledgerData) : [];
  
  const newExpense = {
    id: 'EXP-' + Math.floor(1000 + Math.random() * 9000),
    type: 'expense',
    category: 'Payroll Sync',
    description: `Monthly Salary Sync: ${department}`,
    amount: totalPayrollAmount,
    date: new Date().toISOString().split('T')[0]
  };
  
  localStorage.setItem('ilas_ledger', JSON.stringify([newExpense, ...ledger]));
  window.dispatchEvent(new CustomEvent('ilas-ledger-changed'));
};

export const getPendingStudentInquiries = (): Inquiry[] => {
  const inquiries = getInquiries();
  return inquiries.filter(item => item.category === 'Education' && item.paymentStatus !== 'Paid');
};

export const approveStudentPaymentAndUnlock = (id: string, classLink: string): Inquiry[] => {
  const inquiries = getInquiries();
  const updated = inquiries.map(item => {
    if (item.id === id) {
      return { 
        ...item, 
        paymentStatus: 'Paid' as const, 
        classLink: classLink || 'https://ilas.global/classroom/join/default-session' 
      };
    }
    return item;
  });
  localStorage.setItem('ilas_inquiries', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-inquiries-changed'));
  return updated;
};

export const processAutomatedPayment = (inquiryId: string, transactionId: string, amount: string): Inquiry[] => {
  const inquiries = getInquiries();
  const updated = inquiries.map(item => {
    if (item.id === inquiryId) {
      return { 
        ...item, 
        paymentStatus: 'Paid' as const,
        classLink: `https://ilas.global/classroom/join/session-${transactionId}` 
      };
    }
    return item;
  });
  localStorage.setItem('ilas_inquiries', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-inquiries-changed'));
  
  syncEducationRevenueToFinance(amount, `Online Payment: ${transactionId}`);
  
  return updated;
};

export const syncEducationRevenueToFinance = (amount: string, description: string) => {
  const ledgerData = localStorage.getItem('ilas_ledger');
  const ledger = ledgerData ? JSON.parse(ledgerData) : [];
  
  const newRevenue = {
    id: 'REV-' + Math.floor(1000 + Math.random() * 9000),
    type: 'income',
    category: 'Education Revenue',
    description: description,
    amount: parseFloat(amount.replace(/[^0-9.-]+/g,"")) || 0,
    date: new Date().toISOString().split('T')[0]
  };
  
  localStorage.setItem('ilas_ledger', JSON.stringify([newRevenue, ...ledger]));
  window.dispatchEvent(new CustomEvent('ilas-ledger-changed'));
};

export const updateInquiry = (id: string, updates: Partial<Inquiry>): Inquiry[] => {
  const inquiries = getInquiries();
  const updated = inquiries.map(item => {
    if (item.id === id) {
      return { ...item, ...updates };
    }
    return item;
  });
  localStorage.setItem('ilas_inquiries', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-inquiries-changed'));
  return updated;
};

export const deleteInquiry = (id: string): Inquiry[] => {
  const inquiries = getInquiries();
  const updated = inquiries.filter(item => item.id !== id);
  localStorage.setItem('ilas_inquiries', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-inquiries-changed'));
  return updated;
};

export const assignStaffToInquiry = (inquiryId: string, staffId: string, staffName: string): Inquiry[] => {
  const inquiries = getInquiries();
  const updated = inquiries.map(item => {
    if (item.id === inquiryId) {
      return {
        ...item,
        assignedStaffId: staffId,
        assignedStaffName: staffName,
        crmStatus: item.crmStatus === 'New Lead' ? 'In Progress' : item.crmStatus
      };
    }
    return item;
  });
  localStorage.setItem('ilas_inquiries', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-inquiries-changed'));
  return updated;
};

export const addFollowUpRecord = (
  inquiryId: string, 
  record: { staffName: string; channel: FollowUpRecord['channel']; notes: string; outcome: FollowUpRecord['outcome']; nextFollowUpDate?: string }
): Inquiry[] => {
  const inquiries = getInquiries();
  const updated = inquiries.map(item => {
    if (item.id === inquiryId) {
      const history = item.followUpHistory || [];
      const newRecord: FollowUpRecord = {
        id: `FL-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toLocaleDateString(),
        staffName: record.staffName,
        channel: record.channel,
        notes: record.notes,
        outcome: record.outcome
      };
      
      const newStatus = record.outcome === 'Fee Paid' ? 'Completed' : 'Scheduled';
      
      return {
        ...item,
        followUpHistory: [newRecord, ...history],
        followUpDate: record.nextFollowUpDate || item.followUpDate,
        followUpStatus: newStatus as Inquiry['followUpStatus']
      };
    }
    return item;
  });
  localStorage.setItem('ilas_inquiries', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-inquiries-changed'));
  return updated;
};

export const updateInquiryVisaStage = (inquiryId: string, stage: Inquiry['visaProcessingStage']): Inquiry[] => {
  const inquiries = getInquiries();
  const updated = inquiries.map(item => {
    if (item.id === inquiryId) {
      return {
        ...item,
        visaProcessingStage: stage,
        pipelineStage: (stage === 'Visa Approved' ? 'Completed' : 'Processing') as Inquiry['pipelineStage']
      };
    }
    return item;
  });
  localStorage.setItem('ilas_inquiries', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-inquiries-changed'));
  return updated;
};

export const updateInquiryPayment = (inquiryId: string, paymentStatus: Inquiry['paymentStatus'], amountPaid?: string): Inquiry[] => {
  const inquiries = getInquiries();
  const updated = inquiries.map(item => {
    if (item.id === inquiryId) {
      return {
        ...item,
        paymentStatus,
        amountPaid: amountPaid !== undefined ? amountPaid : item.amountPaid,
        crmStatus: paymentStatus === 'Paid' ? 'Closed Won' : item.crmStatus
      };
    }
    return item;
  });
  localStorage.setItem('ilas_inquiries', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('ilas-inquiries-changed'));
  return updated;
};

export const getDailyWalkinStats = () => {
  const inquiries = getInquiries();
  const walkins = inquiries.filter(i => i.type === 'Walk-in');
  const paidWalkins = walkins.filter(i => i.paymentStatus === 'Paid' || i.paymentStatus === 'Partially Paid');
  const dueFollowups = inquiries.filter(i => i.followUpStatus === 'Due Today' || i.followUpStatus === 'Overdue');
  
  return {
    totalWalkins: walkins.length,
    convertedPaid: paidWalkins.length,
    dueFollowupsCount: dueFollowups.length,
    activeVisaCases: inquiries.filter(i => i.category === 'Visa' && i.visaProcessingStage && i.visaProcessingStage !== 'Not Applicable' && i.visaProcessingStage !== 'Visa Approved').length
  };
};