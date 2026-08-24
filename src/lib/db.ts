export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  path: string;
  price: string;
  paymentStatus: 'Pending' | 'Contacted' | 'Paid' | 'Link Sent';
  classLink?: string;
  category: 'Education' | 'Study Abroad' | 'Visa' | 'Jobs';
  timestamp: string;
  aiScore?: number;
  aiPath?: string;
  aiActionPlan?: string[];
  docStatus?: 'Approved' | 'Pending' | 'Consultation Scheduled' | 'Docs Requested';
  source?: string;
  department?: string;
  crmStatus?: 'New Lead' | 'In Progress' | 'Closed Won' | 'Closed Lost';
  pipelineStage?: 'Intake' | 'Assessment' | 'Documentation' | 'Processing' | 'Completed';
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
export interface GlobalPath {
  id: string;
  name: string;
  methods: string;
  starting: string;
  ending: string;
  remarks: string;
  linkedCourseId?: string;
}

export interface GlobalBatch {
  id: string;
  name: string;
  timings: string[];
  starting: string;
  remarks: string;
  linkedPathId?: string;
}

export interface GlobalCourse {
  id: string;
  name: string;
  subtitle: string;
  displayPosition: number;
  staff: string;
  chapter: string;
  duration: string;
  methods: string;
  materials: string;
  fee: string;
  students: string;
  courseStructure?: string; // stores dynamic structured details/modules
}

// Initial Seed Data
const SEED_INQUIRIES: Inquiry[] = [
  {
    id: '1',
    name: 'Ananya Sharma',
    email: 'ananya@gmail.com',
    phone: '+91 98765 43210',
    course: 'German Language A1–C2',
    path: 'Intelli-Coach AI Trainer™',
    price: '$199.00',
    paymentStatus: 'Paid',
    classLink: 'https://ilas.global/classroom/join/de-a1-sharma',
    category: 'Education',
    timestamp: new Date(Date.now() - 3600000 * 2).toLocaleString()
  }
];

const SEED_VISITOR_LOGS: VisitorLog[] = [
  { id: 'v1', page: 'Home', timeSpent: 120, timestamp: new Date(Date.now() - 10 * 60000).toLocaleString() }
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
  { id: 'STAFF-002', email: 'hr@ilas.global', password: '', name: 'HR Manager Lead', department: 'HR Manager', phone: '+49 176 0000002', joiningDate: '2025-06-15', status: 'Active' }
];

const SEED_ATTENDANCE: AttendanceLog[] = [
  { id: 'ATT-1', staffId: 'STAFF-001', staffName: 'Super Admin', checkInTime: '09:00 AM', status: 'Present', date: new Date().toLocaleDateString() },
  { id: 'ATT-2', staffId: 'STAFF-002', staffName: 'HR Manager Lead', checkInTime: '09:15 AM', status: 'Present', date: new Date().toLocaleDateString() }
];

// DB Retrieval & Save Functions
export const getGlobalPaths = (): GlobalPath[] => {
  const data = localStorage.getItem('ilas_paths');
  if (data) return JSON.parse(data);
  const seed: GlobalPath[] = [
    { id: '1', name: 'Live Class Path', methods: 'Live', starting: '2026-10-12', ending: '2026-12-12', remarks: 'Standard Plan', linkedCourseId: '1' },
    { id: '2', name: 'Online FastTrack', methods: 'Video+AI', starting: '2026-10-15', ending: '2026-11-15', remarks: 'Self-paced', linkedCourseId: '2' },
  ];
  localStorage.setItem('ilas_paths', JSON.stringify(seed));
  return seed;
};

export const setGlobalPaths = (paths: GlobalPath[]) => {
  localStorage.setItem('ilas_paths', JSON.stringify(paths));
  window.dispatchEvent(new CustomEvent('ilas-paths-changed'));
};

export const getGlobalBatches = (): GlobalBatch[] => {
  const data = localStorage.getItem('ilas_batches');
  if (data) return JSON.parse(data);
  const seed = [
    { id: '1', name: 'Morning Batch 1', timings: ['09:00 - 11:00', '11:00 - 13:00'], starting: '2026-10-12', remarks: 'Full' },
    { id: '2', name: 'Weekend Batch', timings: ['14:00 - 17:00'], starting: '2026-10-15', remarks: 'Open' },
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
    const parsed: GlobalCourse[] = JSON.parse(data);
    return parsed.sort((a, b) => (a.displayPosition || 99) - (b.displayPosition || 99));
  }
  const seed: GlobalCourse[] = [
    { id: '1', name: 'SAP Basics', subtitle: 'Enterprise Software Training', displayPosition: 1, staff: 'Nadeem - ID 091', chapter: '12', duration: '12 Weeks', methods: 'Live Class Path (Morning Batch 1)', materials: 'Uploaded', fee: '$500', students: '25', courseStructure: 'Module 1: ERP Introduction\nModule 2: Ledger Setup\nModule 3: Integration' },
    { id: '2', name: 'German A1', subtitle: 'Beginner Level Proficiency', displayPosition: 2, staff: 'AI Bot', chapter: '15', duration: '8 Weeks', methods: 'Online FastTrack (Weekend Batch)', materials: 'Pending', fee: '$200', students: '120', courseStructure: 'Module 1: Alphabets & Phonetics\nModule 2: Conversational Basics\nModule 3: Simple Verbs' }
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
  return data ? JSON.parse(data) : [];
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
  return data ? JSON.parse(data) : [];
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
  return JSON.parse(data);
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
  return JSON.parse(data);
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
  return JSON.parse(data);
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
  return JSON.parse(data);
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