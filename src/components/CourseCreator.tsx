import React, { useState, useEffect } from 'react';
import { Save, Edit, RefreshCw, Trash2, Send, CheckSquare, Plus, Upload, BookOpen, Clock, Users, BookMarked, Settings, Info, Briefcase, FileUp } from 'lucide-react';

import { getGlobalCourses, setGlobalCourses, getGlobalPaths, getGlobalBatches, GlobalCourse, GlobalPath, GlobalBatch } from '../lib/db';

const CourseCreator: React.FC = () => {
  const [courseList, setCourseList] = useState<GlobalCourse[]>([]);
  const [availablePaths, setAvailablePaths] = useState<GlobalPath[]>([]);
  const [availableBatches, setAvailableBatches] = useState<GlobalBatch[]>([]);

  useEffect(() => {
    const loadData = () => {
      setCourseList(getGlobalCourses());
      setAvailablePaths(getGlobalPaths());
      setAvailableBatches(getGlobalBatches());
    };
    loadData();
    window.addEventListener('ilas-courses-changed', loadData);
    window.addEventListener('ilas-paths-changed', loadData);
    window.addEventListener('ilas-batches-changed', loadData);
    return () => {
      window.removeEventListener('ilas-courses-changed', loadData);
      window.removeEventListener('ilas-paths-changed', loadData);
      window.removeEventListener('ilas-batches-changed', loadData);
    };
  }, []);

  // Form State
  const [courseName, setCourseName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [displayPosition, setDisplayPosition] = useState(1);
  const [chapters, setChapters] = useState('');
  const [durationVal, setDurationVal] = useState('');
  const [durationType, setDurationType] = useState('Weeks');
  const [staff, setStaff] = useState('');
  const [fee, setFee] = useState('');
  const [selectedPathId, setSelectedPathId] = useState('');
  const [courseStructure, setCourseStructure] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<GlobalCourse | null>(null);

  const handleRowClick = (course: GlobalCourse) => {
    setSelectedCourse(course);
    setCourseName(course.name);
    setSubtitle(course.subtitle || '');
    setDisplayPosition(course.displayPosition || 1);
    setCourseStructure(course.courseStructure || '');
    setChapters(course.chapter);
    setDurationVal(course.duration.split(' ')[0]);
    setDurationType(course.duration.split(' ')[1] || 'Weeks');
    setStaff(course.staff);
    setFee(course.fee.replace('$', ''));
  };

  const handleReset = () => {
    setSelectedCourse(null);
    setCourseName('');
    setSubtitle('');
    setDisplayPosition(1);
    setCourseStructure('');
    setChapters('');
    setDurationVal('');
    setDurationType('Weeks');
    setStaff('');
    setFee('');
    setSelectedPathId('');
  };

  const handleDelete = () => {
    if (!selectedCourse) return;
    const confirm = window.confirm("Are you sure you want to delete this course?");
    if (confirm) {
      const updated = courseList.filter(c => c.id !== selectedCourse.id);
      setGlobalCourses(updated);
      handleReset();
    }
  };

  const handleSave = () => {
    if (!courseName) {
      alert("Please provide at least a Course Title.");
      return;
    }
    
    let methodString = "Custom";
    if (selectedPathId) {
      const p = availablePaths.find(path => path.id === selectedPathId);
      if (p) methodString = `${p.name} [${p.methods}]`;
    }

    const newCourse: GlobalCourse = {
      id: selectedCourse?.id || Math.random().toString(36).substr(2, 9),
      name: courseName,
      subtitle: subtitle,
      displayPosition: displayPosition,
      staff: staff,
      chapter: chapters,
      duration: `${durationVal} ${durationType}`,
      methods: methodString,
      materials: 'Pending Uploads',
      fee: `$${fee || '0'}`,
      students: '0',
      courseStructure: courseStructure
    };

    if (selectedCourse) {
      const updated = courseList.map(c => c.id === selectedCourse.id ? newCourse : c);
      setGlobalCourses(updated);
      alert("Course Updated.");
    } else {
      const updated = [...courseList, newCourse];
      setGlobalCourses(updated);
      alert("Course Created and Saved.");
    }
    handleReset();
  };

  return (
    <div className="flex-1 p-4 md:p-6 w-full flex flex-col gap-6 bg-slate-50 font-sans min-h-screen">
      
      {/* Header Tracking Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex justify-end gap-6 text-xs font-semibold text-slate-600 rounded-lg shadow-sm">
        <span>LOGIN ID: <span className="text-brand-700">ADM-001</span></span>
        <span>NAME: <span className="text-brand-700">JOHN DOE</span></span>
        <button className="text-brand-600 hover:underline flex items-center gap-1"><Clock className="w-3 h-3"/> ACTIVITY LOG</button>
      </div>

      <div className="w-full flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-brand-900 mb-2">Create / Edit Course</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Create / View Form (Left Section) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
            
            <div className="flex items-end gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600">COURSE TITLE</label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} className="w-full border border-slate-300 rounded p-2 pl-9 text-sm focus:ring-1 focus:ring-brand-500" placeholder="e.g. SAP Training" />
                </div>
              </div>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600">SUBTITLE</label>
                <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-brand-500" placeholder="e.g. Beginner Level Proficiency" />
              </div>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600">DISPLAY POSITION (INDEX)</label>
                <input type="number" value={displayPosition} onChange={(e) => setDisplayPosition(Number(e.target.value))} className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-brand-500" placeholder="e.g. 1" />
              </div>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600">CHAPTERS / MODUALS</label>
                <div className="relative">
                  <BookMarked className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="number" value={chapters} onChange={(e) => setChapters(e.target.value)} className="w-full border border-slate-300 rounded p-2 pl-9 text-sm focus:ring-1 focus:ring-brand-500" placeholder="e.g. 12" />
                </div>
              </div>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600">DURATION</label>
                <div className="flex gap-2">
                  <input type="number" value={durationVal} onChange={(e) => setDurationVal(e.target.value)} className="w-20 border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-brand-500" placeholder="12" />
                  <select value={durationType} onChange={(e) => setDurationType(e.target.value)} className="flex-1 border border-slate-300 rounded p-2 text-sm bg-slate-50 focus:ring-1 focus:ring-brand-500">
                    <option value="Weeks">Weeks</option>
                    <option value="Months">Months</option>
                    <option value="Hours">Hours</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-end gap-2 pt-2 border-t border-slate-100">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600">STAFF INFO</label>
                <div className="relative">
                  <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select value={staff} onChange={(e) => setStaff(e.target.value)} className="w-full border border-slate-300 rounded p-2 pl-9 text-sm bg-slate-50 focus:ring-1 focus:ring-brand-500">
                    <option value="">Select Staff</option>
                    <option value="Nadeem - ID 091">Nadeem - ID 091</option>
                    <option value="Jane - ID 092">Jane - ID 092</option>
                    <option value="AI Bot">AI Bot</option>
                  </select>
                </div>
              </div>
              <button className="bg-amber-100 text-amber-700 p-2 px-3 rounded text-xs font-bold hover:bg-amber-200 border border-amber-200 flex items-center gap-1">
                <Briefcase className="w-4 h-4" /> (ADD TASK)
              </button>
            </div>

            <div className="flex flex-col gap-1 pt-2 border-t border-slate-100">
              <label className="text-xs font-semibold text-slate-600">DYNAMIC COURSE STRUCTURE & DETAILS</label>
              <textarea 
                value={courseStructure} 
                onChange={(e) => setCourseStructure(e.target.value)}
                className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-brand-500 h-24 resize-none" 
                placeholder="Enter structure/modules line-by-line or descriptive details..."
              />
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-semibold text-slate-600">TEACHING METHOD (Linked to Paths & Batches)</label>
              
              <div className="space-y-2">
                 <select 
                   value={selectedPathId} 
                   onChange={(e) => setSelectedPathId(e.target.value)} 
                   className="w-full border border-brand-300 rounded p-2 text-sm bg-brand-50 focus:ring-1 focus:ring-brand-500"
                 >
                   <option value="">-- Select Pre-Configured Path Package --</option>
                   {availablePaths.map(path => (
                     <option key={path.id} value={path.id}>
                       {path.name} [{path.methods}]
                     </option>
                   ))}
                 </select>
              </div>
              <p className="text-[10px] text-slate-500 italic mt-1">*Select a path package to map the teaching method and timeslot.</p>
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
                  <input type="text" value={fee} onChange={(e) => setFee(e.target.value)} className="w-full border border-slate-300 rounded p-3 pl-8 font-bold text-lg text-brand-900 focus:ring-1 focus:ring-brand-500" placeholder="0.00" />
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
                <button onClick={handleReset} className="flex-1 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded hover:bg-slate-200 flex items-center justify-center gap-1"><Edit className="w-3 h-3"/> RESET</button>
                <button onClick={handleDelete} disabled={!selectedCourse} className="flex-1 py-2 bg-red-50 text-red-600 text-xs font-bold rounded hover:bg-red-100 border border-red-200 flex items-center justify-center gap-1 disabled:opacity-50"><Trash2 className="w-3 h-3"/> DELETE</button>
                <button onClick={handleSave} className="flex-1 py-2 bg-brand-50 text-brand-700 text-xs font-bold rounded hover:bg-brand-100 border border-brand-200 flex items-center justify-center gap-1"><RefreshCw className="w-3 h-3"/> UPDATE</button>
                <button onClick={handleSave} className="flex-1 py-2 bg-brand-600 text-white text-xs font-bold rounded hover:bg-brand-700 shadow flex items-center justify-center gap-1"><Save className="w-3 h-3"/> SAVE</button>
              </div>
            </div>

          </div>
        </div>

        {/* Course List Table (Bottom) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden mt-2">
          <h2 className="text-lg font-bold text-slate-800 mb-4">List of Courses (Click to View/Edit)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Course Name</th>
                  <th className="px-4 py-3">Staff</th>
                  <th className="px-4 py-3">Chapter</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Methods & Batch</th>
                  <th className="px-4 py-3">Materials</th>
                  <th className="px-4 py-3">Course Fee</th>
                  <th className="px-4 py-3 rounded-tr-lg">Students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courseList.map((item) => (
                  <tr key={item.id} onClick={() => handleRowClick(item)} className={`cursor-pointer hover:bg-slate-50 transition-colors ${selectedCourse?.id === item.id ? 'bg-brand-50 ring-1 ring-brand-200' : ''}`}>
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