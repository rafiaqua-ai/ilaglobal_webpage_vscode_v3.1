import React, { useState } from 'react';
import { Save, Edit, RefreshCw, Trash2, Send, CheckSquare } from 'lucide-react';

type TabType = 'SERVICE' | 'BATCH';

interface ServiceItem {
  id: string;
  name: string;
  methods: string;
  staffs: string;
  starting: string;
  price: string;
  candidates: string;
  remarks: string;
}

interface BatchItem {
  id: string;
  name: string;
  timings: string;
  staffs: string;
  starting: string;
  price: string;
  candidates: string;
  remarks: string;
}

const ServicesAndBatches: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('SERVICE');

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

  const serviceList: ServiceItem[] = [
    { id: '1', name: 'Live Clas', methods: 'Live', staffs: 'John Doe', starting: '12-Oct', price: '$200', candidates: '15', remarks: 'Good' },
    { id: '2', name: 'Online Class', methods: 'Video+AI', staffs: 'AI Bot', starting: '15-Oct', price: '$150', candidates: '100', remarks: 'Auto' },
    { id: '3', name: 'Live Camp Class', methods: 'Camp', staffs: 'Jane Smith', starting: '20-Oct', price: '$300', candidates: '20', remarks: 'Weekend' },
  ];

  const batchList: BatchItem[] = [
    { id: '1', name: 'Morning Batch 1', timings: '10 AM - 12 PM', staffs: 'John Doe', starting: '12-Oct', price: '$200', candidates: '15', remarks: 'Full' },
    { id: '2', name: 'Weekend Batch', timings: '2 PM - 5 PM', staffs: 'Jane Smith', starting: '15-Oct', price: '$150', candidates: '20', remarks: 'Open' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* Master Navigation Header */}
      <header className="bg-brand-900 text-white shadow-md sticky top-0 z-50">
        <div className="flex overflow-x-auto no-scrollbar items-center px-4 py-3 gap-6 text-sm font-medium whitespace-nowrap">
          {navigationItems.map(item => (
            <button key={item} className={`hover:text-brand-300 transition-colors ${item === 'SERVICES & BATCHES' ? 'text-accent-400 border-b-2 border-accent-400' : ''}`}>
              {item}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        {/* Tabs */}
        <div className="flex gap-4 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('SERVICE')}
            className={`px-4 py-2 font-bold text-sm transition-colors ${activeTab === 'SERVICE' ? 'text-brand-700 border-b-2 border-brand-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Create New Service
          </button>
          <button 
            onClick={() => setActiveTab('BATCH')}
            className={`px-4 py-2 font-bold text-sm transition-colors ${activeTab === 'BATCH' ? 'text-brand-700 border-b-2 border-brand-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Create Batch
          </button>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-brand-900 mb-6 border-b border-slate-100 pb-2">
            {activeTab === 'SERVICE' ? 'Service Details' : 'Batch Details'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">
                {activeTab === 'SERVICE' ? 'Services Name' : 'New Batch Name'}
              </label>
              {activeTab === 'SERVICE' ? (
                <select className="border border-slate-300 rounded p-2 text-sm bg-slate-50">
                  <option>Live</option>
                  <option>InteliCoach</option>
                  <option>Video+AI</option>
                  <option>Camp</option>
                  <option>Sport Class</option>
                </select>
              ) : (
                <input type="text" className="border border-slate-300 rounded p-2 text-sm" placeholder="Batch Name" />
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">
                {activeTab === 'SERVICE' ? 'Training Method Name' : 'Timings'}
              </label>
              <input type="text" className="border border-slate-300 rounded p-2 text-sm" placeholder={activeTab === 'SERVICE' ? 'Method' : 'e.g., 10 AM - 12 PM'} />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">Detail</label>
              <input type="text" className="border border-slate-300 rounded p-2 text-sm" placeholder="Details..." />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">Select Staffs (Opt)</label>
              <select className="border border-slate-300 rounded p-2 text-sm bg-slate-50">
                <option>None (Allot AI)</option>
                <option>John Doe (Direct Delegation)</option>
                <option>Jane Smith</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">Select Course (Opt)</label>
              <select className="border border-slate-300 rounded p-2 text-sm bg-slate-50">
                <option>Select...</option>
                <option>SAP</option>
                <option>German Language</option>
              </select>
              <span className="text-[10px] text-brand-600 cursor-pointer hover:underline">Link to Course Creator</span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">Starting From</label>
              <input type="date" className="border border-slate-300 rounded p-2 text-sm" />
            </div>

            <div className="flex flex-col gap-1 lg:col-span-2">
              <label className="text-xs font-semibold text-slate-600">Remarks & Suggestion</label>
              <input type="text" className="border border-slate-300 rounded p-2 text-sm" placeholder="Remarks..." />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">Price</label>
              <input type="text" className="border border-slate-300 rounded p-2 text-sm" placeholder="$ 0.00" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-end pt-4 border-t border-slate-100">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded hover:bg-slate-200">
              <Edit className="w-4 h-4" /> EDIT
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded hover:bg-red-100 border border-red-200">
              <Trash2 className="w-4 h-4" /> DELETE(*)
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 text-sm font-bold rounded hover:bg-brand-100 border border-brand-200">
              <RefreshCw className="w-4 h-4" /> UPDATE
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-bold rounded hover:bg-brand-700 shadow">
              <Save className="w-4 h-4" /> SAVE
            </button>
          </div>
        </div>

        {/* List Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">
              List of {activeTab === 'SERVICE' ? 'Services' : 'Batch'}
            </h2>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700">
                <CheckSquare className="w-3 h-3" /> SEND APPROVAL
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700">
                <Send className="w-3 h-3" /> SEND UPDATE
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Name</th>
                  <th className="px-4 py-3">{activeTab === 'SERVICE' ? 'Methods' : 'Timings'}</th>
                  <th className="px-4 py-3">Staffs</th>
                  <th className="px-4 py-3">Starting</th>
                  <th className="px-4 py-3">Candidates</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3 rounded-tr-lg">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeTab === 'SERVICE' ? (
                  serviceList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-brand-700">{item.name}</td>
                      <td className="px-4 py-3 text-slate-600">{item.methods}</td>
                      <td className="px-4 py-3 text-slate-600">{item.staffs}</td>
                      <td className="px-4 py-3 text-slate-600">{item.starting}</td>
                      <td className="px-4 py-3 text-slate-600">{item.candidates}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{item.price}</td>
                      <td className="px-4 py-3 text-slate-500">{item.remarks}</td>
                    </tr>
                  ))
                ) : (
                  batchList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-brand-700">{item.name}</td>
                      <td className="px-4 py-3 text-slate-600">{item.timings}</td>
                      <td className="px-4 py-3 text-slate-600">{item.staffs}</td>
                      <td className="px-4 py-3 text-slate-600">{item.starting}</td>
                      <td className="px-4 py-3 text-slate-600">{item.candidates}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{item.price}</td>
                      <td className="px-4 py-3 text-slate-500">{item.remarks}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServicesAndBatches;