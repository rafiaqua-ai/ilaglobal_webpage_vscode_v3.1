import React from 'react';
import { Save, Edit, RefreshCw, Trash2, Send, CheckSquare, Plus, Upload, BookOpen, Clock, Users, BookMarked, Settings, Info, Briefcase, FileUp } from 'lucide-react';

interface CourseItem {
  id: string;
  name: string;
  staff: string;
  chapter: string;
  duration: string;
  methods: string;
  materials: string;
  fee: string;
  students: string;
}

const CourseCreator: React.FC = () => {
  const navigationItems = [
    'HOD DB',
    'LIBRARY & CLASS ROOM',
    'WALKIN ENROLLING',
    'ONLINE ENQUIRY',
    'SERVICES & BATCHES',
    'COURSE CREATOR',
    'AI COURSE CREATOR',
    'Task Delegation',
    'STAFF & ATTENDANCE',
    'STUDENT ATTN',
    'EXAM REST'
  ];

  const courseList: CourseItem[] = [
    { id: '1', name: 'SAP Basics', staff: 'Nadeem - ID 091', chapter: '12', duration: '12 Weeks', methods: 'Live Class', materials: 'Uploaded', fee: '$500', students: '25' },
    { id: '2', name: 'German A1', staff: 'AI Bot', chapter: '15', duration: '8 Weeks', methods: 'Video+AI', materials: 'Pending', fee: '$200', students: '120' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* Master Navigation Header */}
      <header className="bg-brand-900 text-white shadow-md sticky top-0 z-50">
        <div className="flex overflow-x-auto no-scrollbar items-center px-4 py-3 gap-6 text-sm font-medium whitespace-nowrap">
          {navigationItems.map(item => (
            <button key={item} className={`hover:text-brand-300 transition-colors ${item === 'COURSE CREATOR' ? 'text-accent-400 border-b-2 border-accent-400' : ''}`}>
              {item}
            </button>
          ))}
        </div>
      </header>
      
      {/* Header Tracking Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex justify-end gap-6 text-xs font-semibold text-slate-600">
        <span>LOGIN ID: <span className="text-brand-700">ADM-001</span></span>
        <span>NAME: <span className="text-brand-700">JOHN DOE</span></span>
        <button className="text-brand-600 hover:underline flex items-center gap-1"><Clock className="w-3 h-3"/> ACTIVITY LOG</button>
      </div>

      <div className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-brand-900 mb-2">Create New Course</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Create / View Form (Left Section) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
            
            <div className="flex items-end gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600">COURSE TILE</label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" className="w-full border border-slate-300 rounded p-2 pl-9 text-sm focus:ring-1 focus:ring-brand-500" placeholder="e.g. SAP Training" />
                </div>
              </div>
              <button className="bg-brand-100 text-brand-700 p-2 rounded hover:bg-brand-200 border border-brand-200"><Plus className="w-5 h-5"/></button>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600">CHAPTERS / MODUALS</label>
                <div className="relative">
                  <BookMarked className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="number" className="w-full border border-slate-300 rounded p-2 pl-9 text-sm focus:ring-1 focus:ring-brand-500" placeholder="e.g. 12" />
                </div>
              </div>
              <button className="bg-brand-100 text-brand-700 p-2 rounded hover:bg-brand-200 border border-brand-200"><Plus className="w-5 h-5"/></button>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600">DURATION</label>
                <div className="flex gap-2">
                  <input type="number" className="w-20 border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-brand-500" placeholder="12" />
                  <select className="flex-1 border border-slate-300 rounded p-2 text-sm bg-slate-50 focus:ring-1 focus:ring-brand-500">
                    <option>Weeks</option>
                    <option>Months</option>
                    <option>Hours</option>
                  </select>
                </div>
              </div>
              <button className="bg-brand-100 text-brand-700 p-2 rounded hover:bg-brand-200 border border-brand-200"><Plus className="w-5 h-5"/></button>
            </div>

            <div className="flex items-end gap-2 pt-2 border-t border-slate-100">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600">STAFF INFO</label>
                <div className="relative">
                  <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select className="w-full border border-slate-300 rounded p-2 pl-9 text-sm bg-slate-50 focus:ring-1 focus:ring-brand-500">
                    <option>Select Staff</option>
                    <option>Nadeem - ID 091</option>
                    <option>Jane - ID 092</option>
                  </select>
                </div>
              </div>
              <button className="bg-amber-100 text-amber-700 p-2 px-3 rounded text-xs font-bold hover:bg-amber-200 border border-amber-200 flex items-center gap-1">
                <Briefcase className="w-4 h-4" /> (ADD TASK)
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-semibold text-slate-600">TEACHING METHOD (From Services & Batches)</label>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200 text-sm">
                  <span className="font-semibold w-1/3">Live Class</span>
                  <span className="text-slate-500 w-1/3">Batch Group 1</span>
                  <button className="text-xs text-brand-600 font-bold ml-auto flex items-center gap-1"><Plus className="w-3 h-3"/> ADD</button>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200 text-sm">
                  <span className="font-semibold w-1/3">Online Class</span>
                  <span className="text-slate-500 w-1/3">Batch Group 2</span>
                  <button className="text-xs text-brand-600 font-bold ml-auto flex items-center gap-1"><Plus className="w-3 h-3"/> ADD</button>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200 text-sm">
                  <span className="font-semibold w-1/3">Live Camp Class</span>
                  <span className="text-slate-500 w-1/3">Batch Group 1</span>
                  <button className="text-xs text-brand-600 font-bold ml-auto flex items-center gap-1"><Plus className="w-3 h-3"/> ADD</button>
                </div>
              </div>
              <button className="mt-2 text-xs text-brand-700 bg-brand-50 border border-brand-200 p-2 rounded flex items-center justify-center font-bold hover:bg-brand-100">
                ADD- SERVICE PACKAGE
              </button>
            </div>
            
          </div>

          {/* Upload & Pricing Section (Right Section) */}
          <div className="flex flex-col gap-6">
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Course Assets & Materials</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-brand-300">
                  <FileUp className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-xs font-bold text-slate-700">UPLOAD CHAPTERS</span>
                </div>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-brand-300">
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-xs font-bold text-slate-700">IMAGES</span>
                </div>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-brand-300">
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-xs font-bold text-slate-700">VIDEO</span>
                </div>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-brand-300 bg-brand-50/50">
                  <Upload className="w-8 h-8 text-brand-400 mb-2" />
                  <span className="text-xs font-bold text-brand-700">PROMO MATERIALS</span>
                  <span className="text-[10px] text-slate-500 mt-1">(Content Creation Link)</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2 flex justify-between items-center">
                COURSE FEE 
                <span className="text-xs font-normal text-slate-500 flex items-center gap-1"><Info className="w-3 h-3"/> RECOMENDATION</span>
              </h3>
              
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                  <input type="text" className="w-full border border-slate-300 rounded p-3 pl-8 font-bold text-lg text-brand-900 focus:ring-1 focus:ring-brand-500" placeholder="0.00" />
                </div>
                <div className="text-xs text-slate-500">
                  Market Avg: $450<br/>
                  <a href="#" className="text-brand-600 hover:underline">View Price References</a>
                </div>
              </div>
            </div>
            
            {/* Action Buttons & Integrations */}
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button className="col-span-2 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm flex items-center justify-center gap-2">
                <BookOpen className="w-5 h-5"/> ADD TO LIBRARY <span className="text-xs font-normal opacity-80">(Push to Class Room)</span>
              </button>
              <button className="py-2 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 flex items-center justify-center gap-1">
                <CheckSquare className="w-4 h-4"/> SEND FOR APPROVAL
              </button>
              <button className="py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 flex items-center justify-center gap-1">
                <Send className="w-4 h-4"/> SEND TO UPDATE
              </button>
              <div className="col-span-2 flex gap-2 justify-center mt-2">
                <button className="flex-1 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded hover:bg-slate-200 flex items-center justify-center gap-1"><Edit className="w-3 h-3"/> EDIT</button>
                <button className="flex-1 py-2 bg-red-50 text-red-600 text-xs font-bold rounded hover:bg-red-100 border border-red-200 flex items-center justify-center gap-1"><Trash2 className="w-3 h-3"/> DELETE</button>
                <button className="flex-1 py-2 bg-brand-50 text-brand-700 text-xs font-bold rounded hover:bg-brand-100 border border-brand-200 flex items-center justify-center gap-1"><RefreshCw className="w-3 h-3"/> UPDATE</button>
                <button className="flex-1 py-2 bg-brand-600 text-white text-xs font-bold rounded hover:bg-brand-700 shadow flex items-center justify-center gap-1"><Save className="w-3 h-3"/> SAVE</button>
              </div>
            </div>

          </div>
        </div>

        {/* Course List Table (Bottom) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden mt-2">
          <h2 className="text-lg font-bold text-slate-800 mb-4">List of Courses</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">List of Courses</th>
                  <th className="px-4 py-3">Staff</th>
                  <th className="px-4 py-3">Chapter</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Methods</th>
                  <th className="px-4 py-3">Materials</th>
                  <th className="px-4 py-3">Course Fee</th>
                  <th className="px-4 py-3 rounded-tr-lg">Number of Students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courseList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-brand-700">{item.name}</td>
                    <td className="px-4 py-3 text-slate-600">{item.staff}</td>
                    <td className="px-4 py-3 text-slate-600">{item.chapter}</td>
                    <td className="px-4 py-3 text-slate-600">{item.duration}</td>
                    <td className="px-4 py-3 text-slate-600">{item.methods}</td>
                    <td className="px-4 py-3 text-slate-600">{item.materials}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{item.fee}</td>
                    <td className="px-4 py-3 text-slate-500">{item.students}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseCreator;