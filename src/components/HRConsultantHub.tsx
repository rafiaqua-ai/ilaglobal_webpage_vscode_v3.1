import { useState, useEffect } from 'react'
import { 
  Users, Briefcase, DollarSign, GraduationCap, Plane, TrendingUp, 
  HeartHandshake, Shield, Cpu, Plus, FileText, Printer, Calendar, UserCheck, Trash2, CheckCircle2, HelpCircle 
} from 'lucide-react'
import { 
  getStaffRegistry, saveStaffMember, getAttendanceLogs, logStaffAttendance, 
  StaffUser, AttendanceLog, syncHRPayrollToFinance 
} from '../lib/db'

interface HRTask {
  id: string
  title: string
  assignedTo: string
  department: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Pending' | 'In Progress' | 'Completed'
  dueDate: string
}

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  position: string
  stage: 'Application & Interview' | 'Document Verification' | 'ID Generated'
  status: 'Pending' | 'Approved' | 'Rejected'
}

export default function HRConsultantHub() {
  // Updated order: Hiring/Onboarding & Payroll brought to the front
  const [activePillar, setActivePillar] = useState<'onboarding' | 'payroll' | 'ld' | 'hrms' | 'reports' | 'tasks' | 'visa' | 'performance' | 'welfare' | 'discipline' | 'ai_tech'>('onboarding')
  
  const [staffList, setStaffList] = useState<StaffUser[]>([])
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>([])

  // Hiring & Onboarding Candidates State
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 'CAND-101', name: 'Ajmal', email: 'ajmal@ilas.global', phone: '+91 9876543210', position: 'Academic Counselor', stage: 'Document Verification', status: 'Pending' }
  ])
  const [candName, setCandName] = useState('')
  const [candEmail, setCandEmail] = useState('')
  const [candPhone, setCandPhone] = useState('')
  const [candPosition, setCandPosition] = useState('Academic Counselor')

  // New Staff Form State (HRMS)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newDept, setNewDept] = useState<'Education' | 'Visa' | 'Finance Officer' | 'HR Manager' | 'Marketing Exec' | 'Academic Counselor'>('Academic Counselor')
  const [newPhone, setNewPhone] = useState('')

  // Tasks State
  const [tasks, setTasks] = useState<HRTask[]>([
    { id: 'TASK-101', title: 'Verify August Attendance Logs', assignedTo: 'HR Manager Lead', department: 'HR Manager', priority: 'High', status: 'In Progress', dueDate: '2026-08-25' },
    { id: 'TASK-102', title: 'Prepare Ausbildung Stipend Payout Sheet', assignedTo: 'Finance Officer', department: 'Finance Officer', priority: 'Medium', status: 'Pending', dueDate: '2026-08-28' }
  ])
  const [taskTitle, setTaskTitle] = useState('')
  const [assignee, setAssignee] = useState('')
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium')
  const [dueDate, setDueDate] = useState('')

  // Help Modal State for "What is this page?"
  const [showHelpModal, setShowHelpModal] = useState(false)

  const loadData = () => {
    setStaffList(getStaffRegistry())
    setAttendanceLogs(getAttendanceLogs())
  }

  useEffect(() => {
    loadData()
    window.addEventListener('ilas-staff-changed', loadData)
    window.addEventListener('ilas-attendance-changed', loadData)
    return () => {
      window.removeEventListener('ilas-staff-changed', loadData)
      window.removeEventListener('ilas-attendance-changed', loadData)
    }
  }, [])

  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!candName.trim() || !candEmail.trim()) return
    const newCand: Candidate = {
      id: 'CAND-' + Math.floor(100 + Math.random() * 900),
      name: candName.trim(),
      email: candEmail.trim(),
      phone: candPhone.trim(),
      position: candPosition,
      stage: 'Application & Interview',
      status: 'Pending'
    }
    setCandidates([newCand, ...candidates])
    setCandName('')
    setCandEmail('')
    setCandPhone('')
    alert(`Candidate ${newCand.name} enrolled into Application & Interview stage!`)
  }

  const handleAdvanceStage = (id: string) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === id) {
        if (c.stage === 'Application & Interview') {
          return { ...c, stage: 'Document Verification' }
        } else if (c.stage === 'Document Verification') {
          // Automatically register staff member upon completing verification & generating ID
          saveStaffMember({
            name: c.name,
            email: c.email,
            password: '',
            department: c.position as any,
            phone: c.phone,
            status: 'Active',
            joiningDate: new Date().toLocaleDateString()
          })
          alert(`Verification passed! Corporate ID & Access generated for ${c.name}.`)
          return { ...c, stage: 'ID Generated', status: 'Approved' }
        }
      }
      return c
    }))
  }

  const handleAddInternalStaff = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim() || !newEmail.trim()) return
    saveStaffMember({ 
      name: newName.trim(), 
      email: newEmail.trim(), 
      password: newPassword, 
      department: newDept, 
      phone: newPhone.trim(), 
      status: 'Active', 
      joiningDate: new Date().toLocaleDateString() 
    })
    setNewName(''); setNewEmail(''); setNewPhone('')
    alert(`Staff ${newName} registered successfully!`)
  }

  const handleCheckIn = (staff: StaffUser) => {
    logStaffAttendance(staff.id, staff.name, 'Present')
    alert(`Attendance logged for ${staff.name}!`)
  }

  const handleRunPayrollSync = () => {
    const totalAmount = staffList.length * 45000
    syncHRPayrollToFinance(totalAmount, 'Internal Staff Payroll - August 2026')
    alert(`Payroll for ${staffList.length} staff processed & synced to Finance Hub!`)
  }

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!taskTitle.trim() || !assignee) return
    const selectedStaff = staffList.find(s => s.name === assignee)
    const newTask: HRTask = {
      id: 'TASK-' + Math.floor(100 + Math.random() * 900),
      title: taskTitle.trim(),
      assignedTo: assignee,
      department: selectedStaff?.department || 'General HR',
      priority,
      status: 'Pending',
      dueDate: dueDate || new Date().toISOString().split('T')[0]
    }
    setTasks([newTask, ...tasks])
    setTaskTitle('')
    setAssignee('')
    alert(`Task successfully assigned to ${assignee}!`)
  }

  const handleToggleStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus: HRTask['status'] = t.status === 'Pending' ? 'In Progress' : t.status === 'In Progress' ? 'Completed' : 'Pending'
        return { ...t, status: nextStatus }
      }
      return t
    }))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-6">
      
      {/* Top Pillar Switcher (Re-organized with Onboarding & Payroll at the front) */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
        {[
          { id: 'onboarding', label: '1. Hiring & Onboard', icon: Briefcase },
          { id: 'payroll', label: '2. Payroll & Finance', icon: DollarSign },
          { id: 'ld', label: '3. L&D Training', icon: GraduationCap },
          { id: 'hrms', label: '4. Internal HRM & Staff', icon: Users },
          { id: 'reports', label: '📊 HR & Audit Reports', icon: FileText },
          { id: 'tasks', label: '📋 Task Delegation', icon: UserCheck },
          { id: 'visa', label: '5. Global Mobility', icon: Plane },
          { id: 'performance', label: '6. Performance KPI', icon: TrendingUp },
          { id: 'welfare', label: '7. Welfare & Safety', icon: HeartHandshake },
          { id: 'discipline', label: '8. Discipline & Exit', icon: Shield },
          { id: 'ai_tech', label: '9. AI & HR Tech', icon: Cpu }
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button 
              key={tab.id} 
              onClick={() => setActivePillar(tab.id as any)} 
              className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activePillar === tab.id ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          )
        })}
      </div>

      {/* 1. HIRING & ONBOARDING (3 STAGES WORKFLOW) */}
      {activePillar === 'onboarding' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm">
                <Briefcase className="w-5 h-5 text-indigo-600" /> Internal Hiring & Onboarding Pipeline
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Stage 1: Application & Interview ➔ Stage 2: Document Verification ➔ Stage 3: Corporate ID Generation</p>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold">Secure Onboarding</span>
          </div>

          <form onSubmit={handleAddCandidate} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border text-xs">
            <input type="text" required placeholder="Candidate Full Name" value={candName} onChange={(e) => setCandName(e.target.value)} className="p-2.5 border rounded-xl bg-white outline-none font-medium" />
            <input type="email" required placeholder="Candidate Email" value={candEmail} onChange={(e) => setCandEmail(e.target.value)} className="p-2.5 border rounded-xl bg-white outline-none font-medium" />
            <input type="text" placeholder="Phone Number" value={candPhone} onChange={(e) => setCandPhone(e.target.value)} className="p-2.5 border rounded-xl bg-white outline-none font-medium" />
            <select value={candPosition} onChange={(e) => setCandPosition(e.target.value)} className="p-2.5 border rounded-xl bg-white outline-none font-bold">
              <option value="Academic Counselor">Academic Counselor</option>
              <option value="Education">Education</option>
              <option value="Visa">Visa Department</option>
              <option value="Finance Officer">Finance Officer</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Marketing Exec">Marketing Exec</option>
            </select>
            <div className="col-span-full flex justify-end">
              <button type="submit" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl cursor-pointer shadow-xs flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Enroll Candidate for Interview
              </button>
            </div>
          </form>

          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">Active Candidates & Onboarding List ({candidates.length})</h4>
            <div className="space-y-2">
              {candidates.map(cand => (
                <div key={cand.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs">
                  <div>
                    <div className="font-black text-slate-900 text-sm">{cand.name} <span className="text-[10px] text-slate-400 font-mono">({cand.id})</span></div>
                    <div className="text-slate-500 mt-0.5">{cand.email} • Position: <span className="font-bold text-indigo-600">{cand.position}</span></div>
                    <div className="mt-1">Current Stage: <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-bold">{cand.stage}</span></div>
                  </div>
                  <div className="flex items-center gap-2">
                    {cand.stage !== 'ID Generated' ? (
                      <button onClick={() => handleAdvanceStage(cand.id)} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl cursor-pointer">
                        {cand.stage === 'Application & Interview' ? 'Verify Documents ➔' : 'Generate Corporate ID 🛡️'}
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl font-black text-xs">
                        ✅ Onboarding Completed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. PAYROLL & FINANCE SYNC */}
      {activePillar === 'payroll' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-black text-slate-900 text-sm">Payroll & Finance Sync</h3>
          <p className="text-xs text-slate-500">Calculate internal staff payroll and push salary expenses directly into the Enterprise Finance Ledger.</p>
          <button onClick={handleRunPayrollSync} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-black text-xs cursor-pointer shadow-xs">
            Process Payroll & Sync to Finance 💳
          </button>
        </div>
      )}

      {/* 3. L&D TRAINING SYNC */}
      {activePillar === 'ld' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-black text-slate-900 text-sm">L&D Training & Staff Upskilling</h3>
          <p className="text-xs text-slate-500">Manage internal training modules, German language proficiency assessments, and employee certifications before full enrollment.</p>
        </div>
      )}

      {/* 4. INTERNAL HRM & STAFF */}
      {activePillar === 'hrms' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm">
              <Users className="w-5 h-5 text-indigo-600" /> Internal HRM & Staff Registry ({staffList.length})
            </h3>
          </div>

          <form onSubmit={handleAddInternalStaff} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border text-xs">
            <input type="text" required placeholder="Staff Full Name" value={newName} onChange={(e) => setNewName(e.target.value)} className="p-2.5 border rounded-xl bg-white outline-none" />
            <input type="email" required placeholder="Corporate Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="p-2.5 border rounded-xl bg-white outline-none" />
            <input type="text" placeholder="Phone Number" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className="p-2.5 border rounded-xl bg-white outline-none" />
            <select value={newDept} onChange={(e: any) => setNewDept(e.target.value)} className="p-2.5 border rounded-xl bg-white outline-none font-bold">
              <option value="Academic Counselor">Academic Counselor</option>
              <option value="Education">Education</option>
              <option value="Visa">Visa Department</option>
              <option value="Finance Officer">Finance Officer</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Marketing Exec">Marketing Exec</option>
            </select>
            <div className="col-span-full flex justify-end">
              <button type="submit" className="px-5 py-2.5 bg-indigo-600 text-white font-black rounded-xl cursor-pointer shadow-xs">Register Staff Member</button>
            </div>
          </form>

          <div className="space-y-2">
            {staffList.map(st => (
              <div key={st.id} className="p-3 bg-slate-50 border rounded-2xl flex justify-between items-center text-xs">
                <div>
                  <div className="font-black text-slate-900">{st.name} <span className="text-[10px] text-slate-400 font-mono">({st.id})</span></div>
                  <div className="text-slate-500">{st.email} • <span className="font-bold text-indigo-600">{st.department}</span></div>
                </div>
                <button onClick={() => handleCheckIn(st)} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl cursor-pointer">
                  Log Attendance 🕒
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. HR & AUDIT REPORTS */}
      {activePillar === 'reports' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm">
              <FileText className="w-5 h-5 text-indigo-600" /> HR & Audit Reports Center
            </h3>
            <button onClick={() => window.print()} className="px-3 py-2 bg-slate-900 text-white font-black text-xs rounded-xl flex items-center gap-1.5 cursor-pointer">
              <Printer className="w-3.5 h-3.5" /> Print Report
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs text-slate-700">Staff Registry Master List</h4>
            <div className="border rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 font-black">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Department</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {staffList.map(st => (
                    <tr key={st.id}>
                      <td className="p-3 font-mono">{st.id}</td>
                      <td className="p-3 font-bold">{st.name}</td>
                      <td className="p-3 text-slate-500">{st.email}</td>
                      <td className="p-3 uppercase font-semibold">{st.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="font-bold text-xs text-slate-700 pt-4">Attendance Audit Logs</h4>
            <div className="border rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 font-black">
                  <tr>
                    <th className="p-3">Log ID</th>
                    <th className="p-3">Staff Name</th>
                    <th className="p-3">Check-in Time</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {attendanceLogs.map(att => (
                    <tr key={att.id}>
                      <td className="p-3 font-mono">{att.id}</td>
                      <td className="p-3 font-bold">{att.staffName}</td>
                      <td className="p-3">{att.date} at {att.checkInTime}</td>
                      <td className="p-3 text-emerald-600 font-bold">{att.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. TASK DELEGATION */}
      {activePillar === 'tasks' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm">
                <UserCheck className="w-5 h-5 text-indigo-600" /> HR Head Task Delegation & Subordinate Management
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Assign, monitor, and delegate operational HR duties to your team members.</p>
            </div>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold">Team Command Center</span>
          </div>

          <form onSubmit={handleCreateTask} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border text-xs">
            <div className="col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Task Description / Objective</label>
              <input type="text" required placeholder="e.g., Audit German Language Batch Records" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-white outline-none font-medium" />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Assign to Subordinate</label>
              <select required value={assignee} onChange={(e) => setAssignee(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-white outline-none font-bold">
                <option value="">Select Staff Member</option>
                {staffList.map(st => (
                  <option key={st.id} value={st.name}>{st.name} ({st.department})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Priority Level</label>
              <select value={priority} onChange={(e: any) => setPriority(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-white outline-none font-bold">
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Deadline Date</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-white outline-none font-medium" />
            </div>

            <div className="col-span-2 lg:col-span-3 flex items-end">
              <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl cursor-pointer flex items-center justify-center gap-1 shadow-xs">
                <Plus className="w-4 h-4" /> Delegate Task to Subordinate
              </button>
            </div>
          </form>

          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">Active Team Assignments ({tasks.length})</h4>
            <div className="space-y-2">
              {tasks.map(t => (
                <div key={t.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs">
                  <div>
                    <div className="font-black text-slate-900 text-sm">{t.title}</div>
                    <div className="text-slate-500 mt-0.5">Assigned to: <span className="font-bold text-slate-800">{t.assignedTo}</span> ({t.department}) • Due: {t.dueDate}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg font-black text-[10px] ${t.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                      {t.priority}
                    </span>
                    <button onClick={() => handleToggleStatus(t.id)} className={`px-3 py-1 rounded-lg font-black text-[10px] cursor-pointer border ${t.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : t.status === 'In Progress' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-slate-200 text-slate-700 border-slate-300'}`}>
                      {t.status} 🔄
                    </button>
                    <button onClick={() => handleDeleteTask(t.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* OTHER PILLARS PLACEHOLDER */}
      {['visa', 'performance', 'welfare', 'discipline', 'ai_tech'].includes(activePillar) && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-2">
          <h3 className="font-black text-slate-900 uppercase text-xs tracking-wider">{activePillar} Management Module</h3>
          <p className="text-xs text-slate-500">Operational sub-modules for HR expansion and global mobility workflows.</p>
        </div>
      )}

      {/* FOOTER HELP LINK: "What is this page?" */}
      <div className="pt-4 border-t border-slate-200 flex justify-end">
        <button 
          onClick={() => setShowHelpModal(true)}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" /> What is this page? (HRM Guide)
        </button>
      </div>

      {/* HELP MODAL */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" /> About Internal HRM & HR Operations
            </h3>
            <p className="text-slate-600 leading-relaxed">
              <strong>Internal HRM & Staff Registry</strong> serves as the central command for managing all corporate personnel at ILA Global. This module handles everything from initial candidate applications and document verification to official corporate ID generation (STAFF-XXX), attendance tracking, payroll synchronization with the Finance Hub, and task delegation among subordinates.
            </p>
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-900 font-semibold">
              💡 Tip: Always complete the Hiring & Onboarding verification stages before generating formal access credentials for new team members.
            </div>
            <button 
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 bg-slate-900 text-white font-black rounded-xl cursor-pointer"
            >
              Got it, close guide
            </button>
          </div>
        </div>
      )}

    </div>
  )
}