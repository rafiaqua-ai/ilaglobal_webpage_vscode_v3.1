import React, { useState } from 'react';
import { 
  CheckCircle2, Clock, BookOpen, Sparkles, Shield, 
  Bell, FileText, Video, Users, AlertCircle, Trash2, Edit3, Send 
} from 'lucide-react';

interface MasterHubProps {
  departmentName: string;
}

export default function MasterDepartmentHub({ departmentName }: MasterHubProps) {
  const [activeTab, setActiveTab] = useState<'approvals' | 'updates' | 'courses' | 'ai-library' | 'live-classes'>('approvals');
  
  // Pending Approvals State
  const [approvals, setApprovals] = useState([
    { id: 1, type: 'New Course', title: 'Advanced IELTS Preparation', submittedBy: 'Staff - John', status: 'Pending Head Approval' },
    { id: 2, type: 'Staff Registration', title: 'Education Assistant - Sarah', submittedBy: 'HR Suite', status: 'Pending Approval' }
  ]);

  // Course Library State
  const [courses, setCourses] = useState([
    { id: 1, title: 'IELTS Module 1', materialsUploaded: true, status: 'Active' }
  ]);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [materialUploaded, setMaterialUploaded] = useState(false);

  // Updates Log
  const [updates, setUpdates] = useState([
    { id: 1, message: 'New course structure updated in Education Hub', time: '10 mins ago' },
    { id: 2, message: 'Marketing Analyst department restructured as Main Department', time: '1 hour ago' }
  ]);

  const handleApprove = (id: number) => {
    setApprovals(approvals.filter(item => item.id !== id));
    setUpdates([{ id: Date.now(), message: `Approved request ID #${id}`, time: 'Just now' }, ...updates]);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!materialUploaded) {
      alert('Error: Material must be uploaded before creating a course!');
      return;
    }
    setCourses([...courses, { id: Date.now(), title: newCourseTitle, materialsUploaded: true, status: 'Pending Head Approval' }]);
    setNewCourseTitle('');
    setMaterialUploaded(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen p-6 space-y-6">
      {/* Header Navigation */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900">{departmentName} Management Hub</h1>
          <p className="text-xs text-slate-500">Master Control Center for Approvals, Libraries, and AI Workflows</p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={() => setActiveTab('approvals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'approvals' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            Approvals ({approvals.length})
          </button>
          <button 
            onClick={() => setActiveTab('updates')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'updates' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            Updates Feed
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'courses' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            Course Library
          </button>
          <button 
            onClick={() => setActiveTab('ai-library')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'ai-library' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            AI Course Library
          </button>
          <button 
            onClick={() => setActiveTab('live-classes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'live-classes' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            Inteli Coach AI & Live
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        
        {/* APPROVALS TAB */}
        {activeTab === 'approvals' && (
          <div className="space-y-4">
            <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm">
              <Shield className="w-5 h-5 text-amber-500" /> Pending Approvals & Requests Queue
            </h3>
            <p className="text-xs text-slate-500">Review and authorize new staff, course modules, data edits, or deletion requests.</p>
            
            <div className="space-y-3">
              {approvals.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No pending approvals found.</p>
              ) : (
                approvals.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-50 border rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-indigo-600 uppercase text-[10px] bg-indigo-50 px-2 py-0.5 rounded-md">{item.type}</span>
                      <h4 className="font-black text-slate-800 mt-1">{item.title}</h4>
                      <p className="text-[10px] text-slate-400">Submitted by: {item.submittedBy}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleApprove(item.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl cursor-pointer"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* UPDATES TAB */}
        {activeTab === 'updates' && (
          <div className="space-y-4">
            <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm">
              <Bell className="w-5 h-5 text-indigo-600" /> Departmental & Company Updates Feed
            </h3>
            <p className="text-xs text-slate-500">Real-time log of changes made across core operations, departments, and execution.</p>
            
            <div className="space-y-2">
              {updates.map((update) => (
                <div key={update.id} className="p-3 bg-slate-50 border rounded-xl flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{update.message}</span>
                  <span className="text-[10px] text-slate-400">{update.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COURSE LIBRARY TAB */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm">
              <BookOpen className="w-5 h-5 text-indigo-600" /> Course Library & Material Validation
            </h3>
            
            <form onSubmit={handleCreateCourse} className="p-4 bg-slate-50 border rounded-2xl space-y-3 text-xs">
              <h4 className="font-bold text-slate-700">Create New Course (Strict Material Validation)</h4>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Course Title</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g., Advanced Business English" 
                  value={newCourseTitle} 
                  onChange={(e) => setNewCourseTitle(e.target.value)} 
                  className="w-full p-2.5 border rounded-xl bg-white outline-none" 
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input 
                    type="checkbox" 
                    checked={materialUploaded} 
                    onChange={(e) => setMaterialUploaded(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600"
                  />
                  Confirm Real-Time Course Materials Uploaded (Mandatory)
                </label>
              </div>
              <button 
                type="submit" 
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl cursor-pointer"
              >
                Create & Request Head Approval
              </button>
            </form>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 text-xs uppercase">Existing Course Directory</h4>
              {courses.map((c) => (
                <div key={c.id} className="p-3 bg-white border rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{c.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-md text-[10px]">{c.status}</span>
                    <button className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600"><Edit3 className="w-3.5 h-3.5"/></button>
                    <button className="p-1.5 bg-rose-50 hover:bg-rose-100 rounded-lg text-rose-600"><Trash2 className="w-3.5 h-3.5"/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI LIBRARY TAB */}
        {activeTab === 'ai-library' && (
          <div className="space-y-4">
            <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm">
              <Sparkles className="w-5 h-5 text-indigo-600" /> AI Course Library & Waiting Queue
            </h3>
            <p className="text-xs text-slate-500">AI-generated course outlines awaiting Department Head approval before broadcasting to updates.</p>
            
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-xs space-y-2">
              <span className="font-bold text-indigo-900">Generated AI Module: Python for Beginners</span>
              <p className="text-slate-600">Modules: 10 | Duration: 20 Hours | Status: Ready for Head Approval</p>
              <button onClick={() => alert('AI Course Approved & Sent to Updates Menu!')} className="mt-2 px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl">
                Approve & Push to Updates
              </button>
            </div>
          </div>
        )}

        {/* LIVE CLASSES & INTELI COACH AI TAB */}
        {activeTab === 'live-classes' && (
          <div className="space-y-4">
            <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm">
              <Video className="w-5 h-5 text-indigo-600" /> Inteli Coach AI & Live Video Hub
            </h3>
            <p className="text-xs text-slate-500">AI Audio-Reading class interface configured with active learning strategies.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3 col-span-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold bg-indigo-600 px-2 py-0.5 rounded">Live AI Coach Screen</span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">● Active Session</span>
                </div>
                <div className="h-48 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
                  <p className="text-xs text-slate-400">Inteli Coach AI Audio & Strategy Interface Running...</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border rounded-2xl space-y-3">
                <h4 className="font-bold text-slate-800 text-xs uppercase">Strategy Selector</h4>
                <div className="space-y-2">
                  <button className="w-full text-left p-2.5 bg-white border rounded-xl text-xs font-bold text-indigo-600 shadow-sm">
                    Strategy 1 (Basic / Fast Pace)
                  </button>
                  <button className="w-full text-left p-2.5 bg-white border rounded-xl text-xs font-semibold text-slate-600">
                    Strategy 2 (Advanced / Deep Dive)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}