import { useState, useEffect } from 'react';
import { BookOpen, DollarSign, BrainCircuit, Upload, Plus, Trash2, Edit2, Users, UserPlus, Image as ImageIcon, Video, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { getPendingStudentInquiries, approveStudentPaymentAndUnlock, Inquiry, getStaffRegistry, saveStaffMember, StaffUser } from '../lib/db';

interface Course {
  id: number;
  title: string;
  modules: number;
  chaptersUploaded?: boolean;
  imagesUploaded?: boolean;
  videosUploaded?: boolean;
  status: 'Active' | 'Pending Edit Approval' | 'Pending Deletion';
}

export default function EducationHub() {
  const [activeTab, setActiveTab] = useState<'courses' | 'enrollment' | 'library' | 'delegation' | 'staff'>('courses');
  
  // 1. Fully Functional Course Management State
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ilas_edu_courses');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'German Language A1', modules: 6, chaptersUploaded: true, imagesUploaded: true, videosUploaded: true, status: 'Active' },
      { id: 2, title: 'IELTS Band 8.0 Masterclass', modules: 4, chaptersUploaded: true, imagesUploaded: false, videosUploaded: true, status: 'Active' }
    ];
  });
  
  // Manual Course Add State
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseModules, setNewCourseModules] = useState(3);
  const [hasChapters, setHasChapters] = useState(false);
  const [hasImages, setHasImages] = useState(false);
  const [hasVideos, setHasVideos] = useState(false);

  // Edit State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editModules, setEditModules] = useState(0);

  useEffect(() => {
    localStorage.setItem('ilas_edu_courses', JSON.stringify(courses));
  }, [courses]);

  // 2. Enrollment State
  const [pendingStudents, setPendingStudents] = useState<Inquiry[]>([]);
  
  const loadData = () => {
    setPendingStudents(getPendingStudentInquiries());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('ilas-inquiries-changed', loadData);
    return () => window.removeEventListener('ilas-inquiries-changed', loadData);
  }, []);

  // Course Actions
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;
    const newEntry: Course = { 
      id: Date.now(), 
      title: newCourseTitle, 
      modules: Number(newCourseModules),
      chaptersUploaded: hasChapters,
      imagesUploaded: hasImages,
      videosUploaded: hasVideos,
      status: 'Active'
    };
    setCourses([...courses, newEntry]);
    setNewCourseTitle('');
    setNewCourseModules(3);
    setHasChapters(false);
    setHasImages(false);
    setHasVideos(false);
    alert('Manual course structure added successfully and dynamically listed!');
  };

  const requestDeleteCourse = (id: number) => {
    if (confirm('Deletion requires Department Head sign-off. Request deletion approval?')) {
      setCourses(courses.map(c => c.id === id ? { ...c, status: 'Pending Deletion' } : c));
      alert('Deletion request sent to Department Head.');
    }
  };

  const handleUpdateCourseRequest = (id: number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, title: editTitle, modules: editModules, status: 'Pending Edit Approval' } : c));
    setEditingId(null);
    setEditTitle('');
    setEditModules(0);
    alert('Major edit request submitted to Department Head for compliance check.');
  };

  // Payment Approval Action
  const handleApprove = (id: string, name: string, path: string = '') => {
    // Post-Payment Routing & Profile Generation
    const isHumanTutor = path.toLowerCase().includes('live human');
    const isVideoLibrary = path.toLowerCase().includes('video');
    
    let dispatchMode = 'Inteli Coach AI';
    if (isHumanTutor) dispatchMode = 'Human Tutor Time-Table';
    else if (isVideoLibrary) dispatchMode = 'Video Library Access';

    const defaultLink = `https://ilas.global/classroom/join/${id}-${name.toLowerCase().replace(/\s+/g, '-')}?mode=${dispatchMode.replace(/\s+/g, '')}`;
    
    approveStudentPaymentAndUnlock(id, defaultLink);
    
    // Simulate Library & Progress Sync setup
    alert(`Payment verified for ${name}!\n\n` + 
          `1. Student Profile automatically generated.\n` +
          `2. Direct Link dispatched for mode: ${dispatchMode}\n` +
          `3. Local Material Library, auto-recordings, and evaluation tracking synced to profile.\n\n` +
          `Secure Access Link: ${defaultLink}`);
    
    loadData();
  };

  // Delegation State
  const [taskTitle, setTaskTitle] = useState('');
  const [assignedStaff, setAssignedStaff] = useState('Staff 1');

  // Staff Subordinate Management State
  const [staffList, setStaffList] = useState<StaffUser[]>([]);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const loadStaff = () => {
    const allStaff = getStaffRegistry();
    const deptStaff = allStaff.filter(s => s.department === 'Education' || s.department === 'Academic Counselor');
    setStaffList(deptStaff);
  };

  useEffect(() => {
    loadStaff();
    window.addEventListener('ilas-staff-changed', loadStaff);
    return () => window.removeEventListener('ilas-staff-changed', loadStaff);
  }, []);

  const handleAddSubordinate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email || !newStaff.phone || !newStaff.password) return;

    saveStaffMember({
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone,
      password: newStaff.password,
      department: 'Education' as any,
      joiningDate: new Date().toLocaleDateString(),
      status: 'Active'
    });

    setNewStaff({ name: '', email: '', phone: '', password: '' });
    setShowAddStaffModal(false);
    alert('Subordinate staff added successfully! They are now synced with HR central registry.');
  };

  const handleDelegate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;
    alert(`Task "${taskTitle}" successfully delegated to ${assignedStaff}!`);
    setTaskTitle('');
  };

  // Department Head Actions for Course Flow
  const approveCourseChange = (id: number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, status: 'Active' } : c));
    alert('Course change approved and verified.');
  };

  const approveCourseDeletion = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
    alert('Course permanently deleted.');
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-black uppercase bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded">Execution Hub</span>
          <h2 className="text-xl font-black text-slate-900 mt-1">Education & Training Management Hub</h2>
        </div>
        <button 
          onClick={() => setShowAddStaffModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all"
        >
          <UserPlus className="w-4 h-4" /> Add Subordinate
        </button>
      </div>
      
      {/* Navigation */}
      <div className="flex gap-2 border-b pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'courses', label: 'Manage Courses' },
          { id: 'enrollment', label: `Payment Approval (${pendingStudents.length})` },
          { id: 'library', label: 'AI Video Library' },
          { id: 'delegation', label: 'Task Delegation' },
          { id: 'staff', label: 'Department Staff' }
        ].map((tab) => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-black uppercase rounded-xl cursor-pointer whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm min-h-[400px]">
        
        {/* 1. COURSE MANAGEMENT */}
        {activeTab === 'courses' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" /> Dual Division Course Creation
              </h3>
            </div>

            {/* DUAL DIVISION LAYOUT */}
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Manual Course Section */}
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl">
                <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
                  Manual Course Creation
                </h4>
                <form onSubmit={handleAddCourse} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Course Title</label>
                      <input type="text" value={newCourseTitle} onChange={(e) => setNewCourseTitle(e.target.value)} placeholder="e.g. B2 Nursing German" className="w-full p-2.5 bg-white border rounded-xl text-xs font-bold" required />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Total Modules</label>
                      <input type="number" min="1" value={newCourseModules} onChange={(e) => setNewCourseModules(Number(e.target.value))} className="w-full p-2.5 bg-white border rounded-xl text-xs font-bold" required />
                    </div>
                  </div>

                  {/* Distinct Upload Boxes */}
                  <div className="grid sm:grid-cols-3 gap-3">
                    <label className={`p-3 border-2 border-dashed rounded-xl cursor-pointer text-center flex flex-col items-center gap-1 transition-colors ${hasChapters ? 'bg-indigo-50 border-indigo-300' : 'bg-white hover:bg-slate-50 border-slate-300'}`}>
                      <FileText className={`w-4 h-4 ${hasChapters ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-bold text-slate-700">{hasChapters ? 'Chapters Added' : 'Upload Chapters'}</span>
                      <input type="file" className="hidden" onChange={(e) => { if (e.target.files && e.target.files.length > 0) setHasChapters(true) }} />
                    </label>

                    <label className={`p-3 border-2 border-dashed rounded-xl cursor-pointer text-center flex flex-col items-center gap-1 transition-colors ${hasImages ? 'bg-indigo-50 border-indigo-300' : 'bg-white hover:bg-slate-50 border-slate-300'}`}>
                      <ImageIcon className={`w-4 h-4 ${hasImages ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-bold text-slate-700">{hasImages ? 'Images Added' : 'Upload Images'}</span>
                      <input type="file" className="hidden" onChange={(e) => { if (e.target.files && e.target.files.length > 0) setHasImages(true) }} />
                    </label>

                    <label className={`p-3 border-2 border-dashed rounded-xl cursor-pointer text-center flex flex-col items-center gap-1 transition-colors ${hasVideos ? 'bg-indigo-50 border-indigo-300' : 'bg-white hover:bg-slate-50 border-slate-300'}`}>
                      <Video className={`w-4 h-4 ${hasVideos ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-bold text-slate-700">{hasVideos ? 'Videos Added' : 'Upload Videos'}</span>
                      <input type="file" className="hidden" onChange={(e) => { if (e.target.files && e.target.files.length > 0) setHasVideos(true) }} />
                    </label>
                  </div>

                  <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all">
                    <Plus className="w-4 h-4" /> Create Manual Course
                  </button>
                </form>
              </div>

              {/* AI Synchronization / Auto Course Section */}
              <div className="p-6 bg-brand-50 border border-brand-200 rounded-3xl flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-black text-brand-900 text-xs uppercase tracking-wider mb-2 border-b border-brand-200 pb-2 flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4" /> Education Course Management AI
                  </h4>
                  <p className="text-[11px] text-brand-800 leading-relaxed font-medium mb-3">
                    Enter a course topic. Intelli-Coach AI will automatically generate module breakdowns, durations, and outlines. Approved drafts save directly to the AI Class Library.
                  </p>
                  <div className="flex gap-2 mb-4">
                    <input 
                      type="text" 
                      id="aiCourseTopic"
                      placeholder="e.g. Advanced Nursing German..." 
                      className="w-full p-2.5 bg-white border border-brand-200 rounded-xl text-xs font-bold focus:outline-none focus:border-brand-500" 
                    />
                    <button 
                      onClick={() => {
                        const topic = (document.getElementById('aiCourseTopic') as HTMLInputElement).value;
                        if(topic) {
                          alert(`AI is generating module breakdown for "${topic}"... \n\n[Draft Generated: 8 Modules, 32hrs. Ready for review.]`);
                        }
                      }} 
                      className="px-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-xs cursor-pointer shadow-md transition-all whitespace-nowrap"
                    >
                      Generate Draft
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-200">
                  <h4 className="font-black text-brand-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4" /> Education Strategy Fixing AI
                  </h4>
                  <p className="text-[11px] text-brand-800 leading-relaxed font-medium mb-3">
                    Generate 10 adaptive learning strategies tailored to different student speeds and backgrounds.
                  </p>
                  <button 
                    onClick={() => {
                      alert('Strategy Fixing AI has generated 10 adaptive learning strategies (from Beginner-Slow to Advanced-Fast). These are now available in the Student AI Class interface.');
                    }} 
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                  >
                    <BrainCircuit className="w-4 h-4" /> Generate 10 Adaptive Strategies
                  </button>
                </div>
              </div>

            </div>

            {/* DYNAMIC COURSE LIST DISPLAY */}
            <div className="space-y-4">
              <h4 className="font-black text-slate-900 text-sm border-b pb-2">Dynamic Live Course List & Department Approvals</h4>
              
              <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-4">Course Name & Assets</th>
                      <th className="p-4">Modules</th>
                      <th className="p-4">Status & Approvals</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(c => (
                      <tr key={c.id} className="border-b border-slate-100 last:border-0 hover:bg-white transition-colors">
                        <td className="p-4">
                          {editingId === c.id ? (
                            <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full p-2 border rounded-xl font-bold bg-white" />
                          ) : (
                            <div>
                              <div className="font-black text-slate-900 text-sm mb-1">{c.title}</div>
                              <div className="flex gap-2 text-[9px] font-bold">
                                {c.chaptersUploaded && <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">Chapters</span>}
                                {c.imagesUploaded && <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">Images</span>}
                                {c.videosUploaded && <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">Videos</span>}
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          {editingId === c.id ? (
                            <input type="number" value={editModules} onChange={(e) => setEditModules(Number(e.target.value))} className="w-16 p-2 border rounded-xl font-bold bg-white text-center" />
                          ) : (
                            <span className="font-bold text-slate-700">{c.modules} Modules</span>
                          )}
                        </td>
                        <td className="p-4">
                          {c.status === 'Active' ? (
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center w-fit gap-1"><CheckCircle2 className="w-3 h-3"/> Active</span>
                          ) : (
                            <div className="flex flex-col gap-1">
                              <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 font-bold text-[10px] flex items-center w-fit gap-1"><AlertTriangle className="w-3 h-3"/> {c.status}</span>
                              <div className="flex gap-1 mt-1">
                                {c.status === 'Pending Edit Approval' && <button onClick={() => approveCourseChange(c.id)} className="px-2 py-1 bg-emerald-600 text-white font-bold rounded text-[9px]">Approve Edit</button>}
                                {c.status === 'Pending Deletion' && <button onClick={() => approveCourseDeletion(c.id)} className="px-2 py-1 bg-red-600 text-white font-bold rounded text-[9px]">Approve Del</button>}
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          {editingId === c.id ? (
                            <div className="flex gap-2 justify-end">
                              <button onClick={() => handleUpdateCourseRequest(c.id)} className="px-3 py-1.5 bg-brand-600 text-white font-bold rounded-xl text-[10px] cursor-pointer">Submit Edit Request</button>
                              <button onClick={() => setEditingId(null)} className="px-3 py-1.5 bg-slate-200 font-bold rounded-xl text-[10px] cursor-pointer">Cancel</button>
                            </div>
                          ) : (
                            <div className="flex gap-2 justify-end">
                              <button onClick={() => { setEditingId(c.id); setEditTitle(c.title); setEditModules(c.modules); }} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 cursor-pointer transition-colors" title="Edit Course"><Edit2 className="w-4 h-4"/></button>
                              <button onClick={() => requestDeleteCourse(c.id)} disabled={c.status === 'Pending Deletion'} className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl cursor-pointer transition-colors disabled:opacity-50" title="Request Deletion"><Trash2 className="w-4 h-4"/></button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* 2. ENROLLMENT & PAYMENT APPROVAL */}
        {activeTab === 'enrollment' && (
          <div className="space-y-4">
            <h3 className="font-black text-slate-900 text-sm flex items-center gap-2"><DollarSign className="w-4 h-4 text-emerald-600" /> Student Payment Pipeline & Verification</h3>
            {pendingStudents.length === 0 ? (
              <div className="p-10 text-center bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-500 font-bold">
                🎉 No pending student payment approvals at the moment!
              </div>
            ) : (
              pendingStudents.map(student => (
                <div key={student.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center text-xs">
                  <div>
                    <div className="font-black text-slate-900 text-sm">{student.name} <span className="text-indigo-600 font-bold">({student.course})</span></div>
                    <div className="text-slate-500 mt-0.5">{student.email} • {student.phone} • <span className="font-bold">{student.price}</span></div>
                  </div>
                  <button onClick={() => handleApprove(student.id, student.name, student.path)} className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl cursor-pointer shadow-xs">
                    Approve & Route Student 🔓
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* 3. AI VIDEO LIBRARY */}
        {activeTab === 'library' && (
          <div className="space-y-6 text-center py-6">
            <div className="max-w-md mx-auto space-y-2">
              <BrainCircuit className="w-10 h-10 text-indigo-600 mx-auto" />
              <h4 className="font-black text-slate-900 text-sm">AI & Tutor Video Content Manager</h4>
              <p className="text-xs text-slate-500">Upload recorded class sessions and link timestamp segments for student AI interactive Q&A.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              <button onClick={() => alert('Video upload dialog opened.')} className="p-6 border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl text-center cursor-pointer transition-all bg-slate-50">
                <Upload className="mx-auto mb-2 text-indigo-600 w-6 h-6"/>
                <span className="text-xs font-bold text-slate-700 block">+ Upload Class Video</span>
              </button>
              <button onClick={() => alert('AI Knowledge base synchronized successfully!')} className="p-6 border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl text-center cursor-pointer transition-all bg-slate-50">
                <BrainCircuit className="mx-auto mb-2 text-indigo-600 w-6 h-6"/>
                <span className="text-xs font-bold text-slate-700 block">Sync AI Course Library</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. TASK DELEGATION */}
        {activeTab === 'delegation' && (
          <div className="space-y-4 max-w-xl">
            <h3 className="font-black text-slate-900 text-sm">Delegate Tasks to Teachers & Subordinates</h3>
            <form onSubmit={handleDelegate} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Assign To Staff</label>
                <select value={assignedStaff} onChange={(e) => setAssignedStaff(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold bg-slate-50">
                  {staffList.length > 0 ? (
                    staffList.map(s => <option key={s.id} value={s.name}>{s.name} ({s.id})</option>)
                  ) : (
                    <>
                      <option>Teacher Lead - German Dept</option>
                      <option>Assistant Trainer - IELTS</option>
                      <option>Technical Coordinator - Software</option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Task Details</label>
                <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="e.g. Upload Chapter 4 video notes" className="w-full p-2.5 border rounded-xl text-xs font-bold" required />
              </div>
              <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl text-xs cursor-pointer shadow-xs">
                Delegate Task 🎯
              </button>
            </form>
          </div>
        )}

        {/* 5. STAFF DIRECTORY */}
        {activeTab === 'staff' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2"><Users className="w-4 h-4 text-indigo-600" /> Departmental Staff Directory</h3>
            </div>
            {staffList.length === 0 ? (
              <div className="p-10 text-center bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-500 font-bold">
                No subordinate staff added yet. Click 'Add Subordinate' to onboard team members.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {staffList.map(staff => (
                  <div key={staff.id} className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-black text-slate-900">{staff.name}</div>
                        <div className="text-[10px] font-bold text-indigo-600 uppercase mt-0.5">{staff.department}</div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">{staff.status}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-2 space-y-1">
                      <div><span className="font-semibold text-slate-700">ID:</span> {staff.id}</div>
                      <div><span className="font-semibold text-slate-700">Email:</span> {staff.email}</div>
                      <div><span className="font-semibold text-slate-700">Phone:</span> {staff.phone}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* FOOTER DOCS */}
      <div className="p-4 bg-slate-100 border border-slate-200 rounded-2xl text-xs text-slate-600">
        <p>💡 <strong>Page Guide:</strong> Use <strong>Manage Courses</strong> to add/edit curriculums, <strong>Payment Approval</strong> to unlock student accounts, and <strong>Task Delegation</strong> to assign operational duties to subordinates.</p>
      </div>

      {/* ADD STAFF MODAL */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center gap-2 border-b pb-4">
              <UserPlus className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-black text-slate-900">Add Subordinate</h3>
            </div>
            <p className="text-xs text-slate-500">
              Create credentials for new departmental staff. This will automatically sync with HR central records.
            </p>
            <form onSubmit={handleAddSubordinate} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Full Name</label>
                <input type="text" required placeholder="Staff Name" value={newStaff.name} onChange={(e) => setNewStaff({...newStaff, name: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-semibold" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email / Username</label>
                <input type="email" required placeholder="staff@ilas.global" value={newStaff.email} onChange={(e) => setNewStaff({...newStaff, email: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-semibold" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Mobile Number</label>
                <input type="tel" required placeholder="+49..." value={newStaff.phone} onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-semibold" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Secure Password</label>
                <input type="password" required placeholder="Enter password for portal access" value={newStaff.password} onChange={(e) => setNewStaff({...newStaff, password: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-semibold" />
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl cursor-pointer transition-colors shadow-sm">
                  Create Staff Account
                </button>
              </div>
            </form>
            <button onClick={() => setShowAddStaffModal(false)} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs cursor-pointer transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
