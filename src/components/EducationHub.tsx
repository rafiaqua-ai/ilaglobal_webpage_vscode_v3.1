import { useState, useEffect } from 'react';
import { BookOpen, DollarSign, BrainCircuit, Upload, Plus, Trash2, Edit2 } from 'lucide-react';
import { getPendingStudentInquiries, approveStudentPaymentAndUnlock, Inquiry } from '../lib/db';

interface Course {
  id: number;
  title: string;
  modules: number;
}

export default function EducationHub() {
  const [activeTab, setActiveTab] = useState<'courses' | 'enrollment' | 'library' | 'delegation'>('courses');
  
  // 1. Fully Functional Course Management State
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ilas_edu_courses');
    return saved ? JSON.parse(saved) : [{ id: 1, title: 'German Language A1', modules: 6 }, { id: 2, title: 'IELTS Band 8.0 Masterclass', modules: 4 }];
  });
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseModules, setNewCourseModules] = useState(3);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

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
    const newEntry: Course = { id: Date.now(), title: newCourseTitle, modules: Number(newCourseModules) };
    setCourses([...courses, newEntry]);
    setNewCourseTitle('');
    alert('Course added successfully!');
  };

  const handleDeleteCourse = (id: number) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const handleUpdateCourse = (id: number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, title: editTitle } : c));
    setEditingId(null);
    setEditTitle('');
  };

  // Payment Approval Action
  const handleApprove = (id: string, name: string) => {
    const defaultLink = `https://ilas.global/classroom/join/${id}-${name.toLowerCase().replace(/\s+/g, '-')}`;
    approveStudentPaymentAndUnlock(id, defaultLink);
    alert(`Payment verified and access unlocked for ${name}!`);
    loadData();
  };

  // Delegation State
  const [taskTitle, setTaskTitle] = useState('');
  const [assignedStaff, setAssignedStaff] = useState('Staff 1');

  const handleDelegate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;
    alert(`Task "${taskTitle}" successfully delegated to ${assignedStaff}!`);
    setTaskTitle('');
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-black uppercase bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded">Execution Hub</span>
          <h2 className="text-xl font-black text-slate-900 mt-1">Education & Training Management Hub</h2>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex gap-2 border-b pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'courses', label: 'Manage Courses' },
          { id: 'enrollment', label: `Payment Approval (${pendingStudents.length})` },
          { id: 'library', label: 'AI Video Library' },
          { id: 'delegation', label: 'Task Delegation' }
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
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2"><BookOpen className="w-4 h-4 text-indigo-600" /> Curriculum & Course Builder</h3>
            </div>

            {/* Add Course Form */}
            <form onSubmit={handleAddCourse} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl grid sm:grid-cols-3 gap-3 items-end">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Course Title</label>
                <input type="text" value={newCourseTitle} onChange={(e) => setNewCourseTitle(e.target.value)} placeholder="e.g. German A2 Level" className="w-full p-2.5 bg-white border rounded-xl text-xs font-bold" required />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Modules Count</label>
                <input type="number" min="1" value={newCourseModules} onChange={(e) => setNewCourseModules(Number(e.target.value))} className="w-full p-2.5 bg-white border rounded-xl text-xs font-bold" />
              </div>
              <button type="submit" className="py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-xs">
                <Plus className="w-4 h-4" /> Add Course
              </button>
            </form>

            {/* Course List */}
            <div className="space-y-3">
              {courses.map(c => (
                <div key={c.id} className="p-4 border border-slate-200 rounded-2xl flex justify-between items-center text-xs bg-white shadow-xs">
                  {editingId === c.id ? (
                    <div className="flex gap-2 flex-1 mr-4">
                      <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="p-2 border rounded-xl flex-1 text-xs font-bold" />
                      <button onClick={() => handleUpdateCourse(c.id)} className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-xl">Save</button>
                      <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-slate-200 font-bold rounded-xl">Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <div className="font-black text-slate-900 text-sm">{c.title}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">{c.modules} Structured Learning Modules • Active Intake</div>
                    </div>
                  )}

                  {editingId !== c.id && (
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingId(c.id); setEditTitle(c.title); }} className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 cursor-pointer"><Edit2 className="w-4 h-4"/></button>
                      <button onClick={() => handleDeleteCourse(c.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-xl cursor-pointer"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  )}
                </div>
              ))}
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
                  <button onClick={() => handleApprove(student.id, student.name)} className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl cursor-pointer shadow-xs">
                    Approve & Unlock Access 🔓
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
                  <option>Teacher Lead - German Dept</option>
                  <option>Assistant Trainer - IELTS</option>
                  <option>Technical Coordinator - Software</option>
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

      </div>

      {/* FOOTER DOCS */}
      <div className="p-4 bg-slate-100 border border-slate-200 rounded-2xl text-xs text-slate-600">
        <p>💡 <strong>Page Guide:</strong> Use <strong>Manage Courses</strong> to add/edit curriculums, <strong>Payment Approval</strong> to unlock student accounts, and <strong>Task Delegation</strong> to assign operational duties to subordinates.</p>
      </div>
    </div>
  );
}