import { useState, useEffect } from 'react';
import { Lock, UserPlus, Pin, Plus, Trash2, Calendar } from 'lucide-react';
import { StaffUser } from './PortalLogin';

interface StickyNote {
  id: string;
  text: string;
  color: string;
}

interface CorporateMeeting {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: string;
}

export default function SettingsHub() {
  const [profileName, setProfileName] = useState('Super Admin');
  const [profileEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwdFeedback, setPwdFeedback] = useState<string | null>(null);

  // Unlimited Staff Engine state
  const [registry, setRegistry] = useState<StaffUser[]>([]);
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffPassword, setNewStaffPassword] = useState('');
  const [newStaffDept, setNewStaffDept] = useState<'Super Admin' | 'General Manager' | 'Finance Officer' | 'HR Manager' | 'Marketing Exec' | 'Academic Counselor'>('Academic Counselor');
  const [staffFeedback, setStaffFeedback] = useState<string | null>(null);

  // Sticky Notes & Meeting state
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [noteInput, setNoteInput] = useState('');
  const [meetings, setMeetings] = useState<CorporateMeeting[]>([]);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');

  // Load registry
  useEffect(() => {
    const rStr = localStorage.getItem('ilas_staff_registry');
    const staffList = rStr ? JSON.parse(rStr) : [];
    setRegistry(staffList);

    // Load active profile details
    const activeName = localStorage.getItem('ilas_user_name');
    if (activeName) setProfileName(activeName);
    
    // Default Sticky Notes & Meetings
    setNotes([
      { id: '1', text: 'Prepare German Ausbildung visa documents checklist', color: 'bg-yellow-100' },
      { id: '2', text: 'Review stipends ledger on Finance panel', color: 'bg-blue-100' }
    ]);

    setMeetings([
      { id: '1', title: 'Daily Sync: Admissions & AI Funnels', date: '2026-08-19', time: '10:00 AM', attendees: 'Super Admin, Marketing Lead' },
      { id: '2', title: 'Consultants HR Review Session', date: '2026-08-20', time: '02:30 PM', attendees: 'HR Team, 14 Registered Consultants' }
    ]);
  }, []);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      setPwdFeedback('Please specify a new password.');
      return;
    }
    // Perform update in mock session and staff registry
    const rStr = localStorage.getItem('ilas_staff_registry');
    let staffList: StaffUser[] = rStr ? JSON.parse(rStr) : [];
    
    const activeEmail = profileEmail;
    staffList = staffList.map(user => {
      if (user.email.toLowerCase().trim() === activeEmail.toLowerCase().trim()) {
        return { ...user, name: profileName };
      }
      return user;
    });

    localStorage.setItem('ilas_staff_registry', JSON.stringify(staffList));
    localStorage.setItem('ilas_user_name', profileName);
    setPwdFeedback('Profile updated. For password changes, please use Supabase dashboard or forgot password flow.');
    setOldPassword('');
    setNewPassword('');
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffEmail || !newStaffName || !newStaffPassword) {
      setStaffFeedback('All fields are required.');
      return;
    }

    const nextIdNum = registry.length + 1;
    const newStaff: StaffUser = {
      id: `STAFF-${String(nextIdNum).padStart(3, '0')}`,
      email: newStaffEmail.trim(),
      name: newStaffName.trim(),
      department: newStaffDept
    };

    const updated = [...registry, newStaff];
    setRegistry(updated);
    localStorage.setItem('ilas_staff_registry', JSON.stringify(updated));
    setStaffFeedback(`Assigned ID ${newStaff.id} successfully to ${newStaff.name}!`);
    setNewStaffEmail('');
    setNewStaffName('');
    setNewStaffPassword('');
  };

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    const colors = ['bg-yellow-100', 'bg-blue-100', 'bg-emerald-100', 'bg-rose-100', 'bg-purple-100'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newNote: StickyNote = {
      id: Date.now().toString(),
      text: noteInput,
      color: randomColor
    };
    setNotes([...notes, newNote]);
    setNoteInput('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const handleAddMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingTitle || !meetingDate || !meetingTime) return;
    const newMeet: CorporateMeeting = {
      id: Date.now().toString(),
      title: meetingTitle,
      date: meetingDate,
      time: meetingTime,
      attendees: 'Super Admin & Assigned Staff Leads'
    };
    setMeetings([...meetings, newMeet]);
    setMeetingTitle('');
    setMeetingDate('');
    setMeetingTime('');
  };

  return (
    <div className="space-y-8">
      
      {/* Grid for Profile & Unlimited Staff Engine */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Profile & Security Management */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
            <Lock className="w-5 h-5 text-brand-600" />
            Security & Profile Management
          </h2>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            {pwdFeedback && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700">
                {pwdFeedback}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Profile Name</label>
              <input 
                type="text" 
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Corporate Email</label>
              <input 
                type="email" 
                disabled
                value={profileEmail}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium bg-slate-50 text-slate-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Password</label>
                <input 
                  type="password" 
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 chars"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-slate-800 transition-all"
            >
              Update Security Credentials
            </button>
          </form>
        </div>

        {/* Unlimited Staff Engine */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
            <UserPlus className="w-5 h-5 text-brand-600" />
            Unlimited Staff Engine & Directory
          </h2>
          <form onSubmit={handleCreateStaff} className="space-y-4">
            {staffFeedback && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-blue-700">
                {staffFeedback}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Staff Full Name</label>
                <input 
                  type="text" 
                  value={newStaffName}
                  onChange={(e) => setNewStaffName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Staff Password</label>
                <input 
                  type="password" 
                  value={newStaffPassword}
                  onChange={(e) => setNewStaffPassword(e.target.value)}
                  placeholder="Pass123"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Email</label>
                <input 
                  type="email" 
                  value={newStaffEmail}
                  onChange={(e) => setNewStaffEmail(e.target.value)}
                  placeholder="jane@ilas.global"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Department Scope</label>
                <select 
                  value={newStaffDept}
                  onChange={(e: any) => setNewStaffDept(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white outline-none"
                >
                  <option value="Super Admin">Super Admin / CEO</option>
                  <option value="General Manager">General Manager</option>
                  <option value="Finance Officer">Finance Officer</option>
                  <option value="HR Manager">HR Manager</option>
                  <option value="Marketing Exec">Marketing Exec</option>
                  <option value="Academic Counselor">Academic Counselor</option>
                </select>
              </div>
            </div>
            <button 
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-indigo-700 transition-all shadow-md"
            >
              Generate Corporate ID & Access
            </button>
          </form>
        </div>
      </div>

      {/* Sticky Notes Memo Board & Meeting Schedule Manager */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Sticky Notes Board */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 lg:col-span-2">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Pin className="w-5 h-5 text-amber-500" />
            Corporate Memo Board (Sticky Notes)
          </h2>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Post a daily operational reminder..."
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
            />
            <button 
              onClick={handleAddNote}
              className="px-4 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-slate-800"
            >
              <Plus className="w-4 h-4" /> Add Memo
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            {notes.map(note => (
              <div key={note.id} className={`p-4 rounded-2xl border border-slate-200 shadow-sm relative group ${note.color} transition-all`}>
                <button 
                  onClick={() => handleDeleteNote(note.id)}
                  className="absolute top-2 right-2 p-1 bg-white/60 hover:bg-white rounded text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <p className="text-xs font-semibold text-slate-800 leading-relaxed pr-6">{note.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meeting Planner */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Calendar className="w-5 h-5 text-brand-600" />
            Daily Corporate Agenda
          </h2>
          <form onSubmit={handleAddMeeting} className="space-y-3">
            <input 
              type="text" 
              placeholder="Meeting Subject..." 
              required
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-medium outline-none"
            />
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="date" 
                required
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              />
              <input 
                type="text" 
                placeholder="Time (e.g. 10:00 AM)" 
                required
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Add Corporate Agenda
            </button>
          </form>

          <div className="space-y-3 pt-2">
            {meetings.map(meet => (
              <div key={meet.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-1 text-xs">
                <div className="font-extrabold text-slate-900">{meet.title}</div>
                <div className="text-[10px] font-bold text-slate-400">{meet.date} at {meet.time}</div>
                <div className="text-[10px] text-slate-500 font-medium">Participants: {meet.attendees}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
